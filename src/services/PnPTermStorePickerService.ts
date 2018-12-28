import { ISPTermStorePickerService, IPnPTermStorePickerServiceProps, ITermStore, ITermSet, TermStorePickerServiceHelper, ITerm, IGroup, ITermSets } from "./ISPTermStorePickerService";
import { IWebPartContext } from "@microsoft/sp-webpart-base";
import {
    taxonomy,
    ITermStore as PnPTermStore,
    ITermStoreData,
    StringMatchOption,
    ITermSet as PnPTermSet,
    ITermSetData,
    ITermGroupData,
    ITermGroup as PnPTermGroup
} from "@pnp/sp-taxonomy";
import { IPickerTerm } from './../propertyFields/termPicker/IPropertyFieldTermPicker';
import { Environment, EnvironmentType } from "@microsoft/sp-core-library";
import SPTermStoreMockHttpClient from "./SPTermStorePickerMockService";

export default class PnPTermStorePickerService implements ISPTermStorePickerService {
    private _pnpTermStores: (ITermStoreData & PnPTermStore)[];

    constructor(private props: IPnPTermStorePickerServiceProps, private context: IWebPartContext) {
        taxonomy.setup({
            spfxContext: context
        });
    }

    public async getTermStores(): Promise<ITermStore[]> {
        if (Environment.type === EnvironmentType.Local) {
            // If the running environment is local, load the data from the mock
            return await SPTermStoreMockHttpClient.getTermStores(this.context.pageContext.web.absoluteUrl) as ITermStore[];
        }
        else {
            await this._ensureTermStores();

            const result: ITermStore[] = [];
            this._pnpTermStores.forEach(pnpTermStore => {
                const pnpTermStoreAny: any = pnpTermStore as any;
                result.push({
                    _ObjectType_: 'SP.Taxonomy.TermStore',
                    _ObjectIdentity_: pnpTermStoreAny._ObjectIdentity_,
                    Id: pnpTermStore.Id,
                    Name: pnpTermStore.Name,
                    Groups: null // TODO: process pnpTermStore.groups
                });
            });
        }
    }

    public async searchTermsByName(searchText: string): Promise<IPickerTerm[]> {
        if (Environment.type === EnvironmentType.Local) {
            // If the running environment is local, load the data from the mock
            return SPTermStoreMockHttpClient.searchTermsByName(searchText);
        } else {
            if (this.props.limitByTermsetNameOrID) {
                return this._searchTermsByTermSet(searchText);
            } else if (this.props.limitByGroupNameOrID) {
                return this._searchTermsByGroup(searchText);
            } else {
                return this._searchAllTerms(searchText);
            }
        }
    }

    public async getTermSets(): Promise<ITermSet[]> {
        if (!this._pnpTermStores) {
            this._pnpTermStores = await taxonomy.termStores.get();
        }

        return [];
    }

    public async getAllTerms(termSet: ITermSet): Promise<ITerm[]> {
        if (Environment.type === EnvironmentType.Local) {
            // If the running environment is local, load the data from the mock
            return SPTermStoreMockHttpClient.getAllTerms();
        }
        await this._ensureTermStores();
        const pnpTermStores = this._pnpTermStores;
        for (let i = 0, len = pnpTermStores.length; i < len; i++) {
            const pnpTermStore = pnpTermStores[i];
            const termsResult: any = await this._tryGetAllTerms(pnpTermStore, termSet).catch((error) => { }); // .catch part is needed to proceed if there was a rejected promise
            if (!termsResult) { // terms variable will be undefined if the Promise has been rejected. Otherwise it will contain an array
                continue;
            }

            const terms: ITerm[] = termsResult as ITerm[];
            return terms;
        }

    }

    public async getGroupTermSets(group: IGroup): Promise<ITermSets> {
        await this._ensureTermStores();
        const pnpTermStore = this._pnpTermStores.filter(ts => ts.Id === group.TermStore.Id)[0];

        const pnpGroup = await pnpTermStore.getTermGroupById(group.Id).usingCaching().get();
        const pnpTermSets = await pnpGroup.termSets.get();

        const result: ITermSets = {
            _ObjectType_: 'SP.Taxonomy.TermSetCollection',
            _Child_Items_: pnpTermSets.map(pnpTermSet => {
                return this._pnpTermSet2TermSet(pnpTermSet);
            })
        };

        return result;
    }

    private _tryGetAllTerms(pnpTermStore: ITermStoreData & PnPTermStore, termSet: ITermSet): Promise<ITerm[]> {
        return new Promise<ITerm[]>((resolve, reject) => {
            pnpTermStore.getTermSetById(termSet.Id).terms.get().then((pnpTerms) => {
                const terms = pnpTerms.map(pnpTerm => {
                    const term: ITerm = (pnpTerm as any) as ITerm;
                    term.Id = TermStorePickerServiceHelper.cleanGuid(term.Id);
                    term.PathDepth = term.PathOfTerm.split(';').length;
                    term.TermSet = termSet;
                });
            }, (error) => {
                reject(error);
            });
        });
    }

    private async _searchTermsByTermSet(searchText: string): Promise<IPickerTerm[]> {
        if (Environment.type === EnvironmentType.Local) {
            // If the running environment is local, load the data from the mock
            return SPTermStoreMockHttpClient.searchTermsByName(searchText);
        } else {
            await this._ensureTermStores();
            const termSetNameOrID = this.props.limitByTermsetNameOrID;
            const isGuid = TermStorePickerServiceHelper.isGuid(termSetNameOrID);
            let returnTerms: IPickerTerm[] = [];
            const pnpTermStores = this._pnpTermStores;

            //
            // iterating through term stores
            //
            for (let i = 0, len = pnpTermStores.length; i < len; i++) {
                const pnpTermStore = pnpTermStores[i];
                let pnpTermSets: (ITermSetData & PnPTermSet)[];

                //
                // getting term sets by filter
                //
                if (isGuid) {
                    pnpTermSets = [await pnpTermStore.usingCaching().getTermSetById(termSetNameOrID)];
                }
                else {
                    pnpTermSets = await pnpTermStore.getTermSetsByName(termSetNameOrID, pnpTermStore.DefaultLanguage).usingCaching().get();
                }

                // getting filtered terms from term sets
                returnTerms.push(...await this._searchTermsInTermSets(pnpTermSets, searchText));

            }

            return returnTerms;
        }
    }

    private async _searchTermsByGroup(searchText: string): Promise<IPickerTerm[]> {
        if (Environment.type === EnvironmentType.Local) {
            // If the running environment is local, load the data from the mock
            return SPTermStoreMockHttpClient.searchTermsByName(searchText);
        } else {
            this._ensureTermStores();
            const groupNameOrID = this.props.limitByGroupNameOrID;
            const isGuid = TermStorePickerServiceHelper.isGuid(groupNameOrID);
            let returnTerms: IPickerTerm[] = [];
            const pnpTermStores = this._pnpTermStores;

            //
            // iterating through term stores
            //
            for (let i = 0, len = pnpTermStores.length; i < len; i++) {
                const pnpTermStore = pnpTermStores[i];
                let pnpGroup: (ITermGroupData & PnPTermGroup);

                //
                // getting group by id or name
                //
                if (isGuid) {
                    pnpGroup = await pnpTermStore.getTermGroupById(groupNameOrID).usingCaching().get();
                }
                else {
                    // TODO: pnpTermStore.groups.getByName().get();
                    pnpGroup = null;
                }

                // getting term sets from term group
                const pnpTermSets = await pnpGroup.termSets.usingCaching().get();
                // getting filtered terms from term sets
                returnTerms.push(...await this._searchTermsInTermSets(pnpTermSets, searchText, pnpGroup.Id));
            }

            return returnTerms;
        }
    }

    private async _searchAllTerms(searchText: string): Promise<IPickerTerm[]> {
        if (Environment.type === EnvironmentType.Local) {
            // If the running environment is local, load the data from the mock
            return SPTermStoreMockHttpClient.searchTermsByName(searchText);
        }

        this._ensureTermStores();

        const pnpTermStores = this._pnpTermStores;
        const returnTerms: IPickerTerm[] = [];

        //
        // iterating through term stores
        //
        for (let i = 0, len = pnpTermStores.length; i < len; i++) {
            const pnpTermStore = pnpTermStores[i];

            // searching for terms that starts with provided string
            const pnpTerms = await pnpTermStore.getTerms({
                TermLabel: searchText,
                StringMatchOption: StringMatchOption.StartsWith,
                DefaultLabelOnly: true,
                TrimUnavailable: true,
                ResultCollectionSize: 10
            }).usingCaching().get();

            const batch = taxonomy.createBatch();

            //
            // processing each term to get termSet info and labels
            //
            pnpTerms.forEach(pnpTerm => {
                const pickerTerm: IPickerTerm = {
                    key: TermStorePickerServiceHelper.cleanGuid(pnpTerm.Id),
                    name: pnpTerm.Name,
                    path: pnpTerm.PathOfTerm,
                    termSet: '',
                    termGroup: ''
                };
                returnTerms.push(pickerTerm);

                pnpTerm.termSet.group.inBatch(batch).usingCaching().get().then(pnpTermGroup => {
                    pickerTerm.termGroup = pnpTermGroup.Id;
                });

                pnpTerm.termSet.inBatch(batch).usingCaching().get().then(pnpTermSet => {
                    pickerTerm.termSet = pnpTermSet.Id;
                    pickerTerm.termSetName = pnpTermSet.Name;
                });

                if (this.props.includeLabels) {
                    pnpTerm.labels.inBatch(batch).usingCaching().get().then(labels => {
                        pickerTerm.labels = labels.map(label => label.Value);
                    });
                }
            });

            await batch.execute();
        }

        return returnTerms;
    }

    private async _searchTermsInTermSets(pnpTermSets: (ITermSetData & PnPTermSet)[], searchText: string, termGroupId?: string): Promise<IPickerTerm[]> {
        const returnTerms: IPickerTerm[] = [];
        const termSetGroups: { [key: string]: string } = {};
        const termsBatch = taxonomy.createBatch();
        const labelsBatch = taxonomy.createBatch();

        for (let termSetIdx = 0, termSetLen = pnpTermSets.length; termSetIdx < termSetLen; termSetIdx++) {
            const pnpTermSet = pnpTermSets[termSetIdx];

            if (!termGroupId) { // if no group id provided we need to load it from store
                pnpTermSet.group.inBatch(termsBatch).usingCaching().get().then(pnpTermGroup => {
                    termSetGroups[pnpTermSet.Id] = pnpTermGroup.Id;

                    const loadedTerms = returnTerms.filter(t => t.termSet === pnpTermSet.Id);
                    loadedTerms.forEach(t => {
                        t.termGroup = pnpTermGroup.Id;
                    });
                });
            }

            // getting terms for term set in batch
            pnpTermSet.terms.inBatch(termsBatch).usingCaching().get().then(pnpTerms => {
                for (let termIdx = 0, termLen = pnpTerms.length; termIdx < termLen; termIdx++) {
                    const pnpTerm = pnpTerms[termIdx];
                    if (pnpTerm.Name.toLowerCase().indexOf(searchText) === 0) {
                        const pickerTerm: IPickerTerm = {
                            key: TermStorePickerServiceHelper.cleanGuid(pnpTerm.Id),
                            name: pnpTerm.Name,
                            path: pnpTerm.PathOfTerm,
                            termSet: pnpTermSet.Id,
                            termSetName: pnpTermSet.Name,
                            termGroup: termGroupId || termSetGroups[pnpTermSet.Id]
                        };
                        returnTerms.push(pickerTerm);

                        // getting labels for each term in a separate batch
                        if (this.props.includeLabels) {
                            pnpTerm.labels.inBatch(labelsBatch).usingCaching().get().then(pnpLabels => {
                                pickerTerm.labels = pnpLabels.map(l => l.Value);
                            });
                        }
                    }
                }
            });
        }

        //
        // executing batches
        //
        await termsBatch.execute();
        if (this.props.includeLabels) {
            await labelsBatch.execute();
        }

        return returnTerms;
    }

    private async _ensureTermStores(): Promise<void> {
        if (!this._pnpTermStores) {
            this._pnpTermStores = await taxonomy.termStores.usingCaching().get();
        }
    }

    private _pnpTermSet2TermSet(pnpTermSet: (ITermSetData & PnPTermSet)): ITermSet {
        const anyPnPTermSet: any = pnpTermSet as any; // we need this one to reference _ObjectType_ and _ObjectIdentity_
        return {
            _ObjectType_: anyPnPTermSet._ObjectType_,
            _ObjectIdentity_: anyPnPTermSet._ObjectIdentity_,
            Id: pnpTermSet.Id,
            Name: pnpTermSet.Name,
            Description: pnpTermSet.Description,
            Names: pnpTermSet.Names
        };
    }
}