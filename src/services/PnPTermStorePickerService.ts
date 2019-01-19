import {
    ISPTermStorePickerService,
    IPnPTermStorePickerServiceProps,
    ITermStore,
    ITermSet,
    TermStorePickerServiceHelper,
    ITerm,
    IGroup,
    ITermSets
} from "./ISPTermStorePickerService";
import { IWebPartContext } from "@microsoft/sp-webpart-base";
import {
    taxonomy,
    ITermStore as PnPTermStore,
    ITermStoreData,
    StringMatchOption,
    ITermSet as PnPTermSet,
    ITermSetData,
    ITermGroupData,
    ITermGroup as PnPTermGroup,
    ITermData,
    ITerm as PnPTerm,
    Terms
} from "@pnp/sp-taxonomy";
import { IPickerTerm } from './../propertyFields/termPicker/IPropertyFieldTermPicker';
import { Environment, EnvironmentType } from "@microsoft/sp-core-library";
import SPTermStoreMockHttpClient from "./SPTermStorePickerMockService";

/**
 * Term Store Picker Service implementation that uses @pnp/sp-taxonomy to work with taxonomy service
 */
export default class PnPTermStorePickerService implements ISPTermStorePickerService {

    private readonly _termSetCollectionObjectType: string = 'SP.Taxonomy.TermSetCollection';
    private readonly _termGroupCollectionObjectType: string = 'SP.Taxonomy.TermGroupCollection';

    private _pnpTermStores: (ITermStoreData & PnPTermStore)[];
    private _pnpGroups: { [termStoreId: string]: (ITermGroupData & PnPTermGroup)[] } = {};

    constructor(private props: IPnPTermStorePickerServiceProps, private context: IWebPartContext) {
        taxonomy.setup({
            spfxContext: context
            //globalCacheDisable: true // uncomment this one for debugging with no cache
        });
    }

    /**
     * Gets term stores from the taxonomy service
     */
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
                    Groups: {
                        _ObjectType_: this._termGroupCollectionObjectType,
                        _Child_Items_: this._pnpGroups[pnpTermStore.Id].map(g => {
                            return this._pnpTermGroup2TermGroup(g, pnpTermStore);
                        })
                    }
                });
            });

            return result;
        }
    }

    /**
     * Searches terms by provided text
     * @param searchText text to search
     */
    public async searchTermsByName(searchText: string): Promise<IPickerTerm[]> {
        if (Environment.type === EnvironmentType.Local) {
            // If the running environment is local, load the data from the mock
            return SPTermStoreMockHttpClient.searchTermsByName(searchText);
        } else {
            if (this.props.limitByTermsetNameOrID) { // search in specific term(s)
                return this._searchTermsByTermSet(searchText);
            } else if (this.props.limitByGroupNameOrID) { // search in specific group
                return this._searchTermsByGroup(searchText);
            } else { // search everywhere
                return this._searchAllTerms(searchText);
            }
        }
    }

    /**
     * Gets term sets from the stores
     */
    public async getTermSets(): Promise<ITermSet[]> {
        let termSets: ITermSet[] = [];

        //
        // for local tests
        //
        if (Environment.type === EnvironmentType.Local) {
            const termStores = await SPTermStoreMockHttpClient.getTermStores(this.context.pageContext.web.absoluteUrl) as ITermStore[];
            if (termStores && termStores.length > 0) {
                // Get the first term store
                const ts = termStores[0];
                // Check if the term store contains groups
                if (ts.Groups && ts.Groups._Child_Items_) {
                    for (const group of ts.Groups._Child_Items_) {
                        // Check if the group contains term sets
                        if (group.TermSets && group.TermSets._Child_Items_) {
                            if (this.props.limitByTermsetNameOrID) {
                                for (const termSet of group.TermSets._Child_Items_) {
                                    // Check if the term set is found
                                    if (termSet.Name === this.props.limitByTermsetNameOrID || termSet.Id.indexOf(this.props.limitByTermsetNameOrID) !== -1) {
                                        termSets = [...termSets, termSet];
                                    }
                                }
                            } else {
                                termSets = [...termSets, ...group.TermSets._Child_Items_];
                            }
                        }
                    }
                }
            }
            return termSets;
        }

        await this._ensureTermStores();

        for (let i = 0, len = this._pnpTermStores.length; i < len; i++) {
            const pnpTermStore = this._pnpTermStores[i];

            if (this.props.limitByTermsetNameOrID) {
                let pnpTermSets = await this._getPnPTermSetsByNameOrId(pnpTermStore, this.props.limitByTermsetNameOrID);

                const groupsBatch = taxonomy.createBatch();

                for (let termSetIdx = 0, termSetLen = pnpTermSets.length; termSetIdx < termSetLen; termSetIdx++) {
                    const pnpTermSet = pnpTermSets[termSetIdx];
                    const termSet: ITermSet = this._pnpTermSet2TermSet(pnpTermSet, '');
                    termSets.push(termSet);
                    pnpTermSet.group.inBatch(groupsBatch).usingCaching().get().then(pnpTermGroup => {
                        termSet.Group = TermStorePickerServiceHelper.cleanGuid(pnpTermGroup.Id);
                    });
                }

                await groupsBatch.execute();
            }
            else {
                let pnpGroups: (ITermGroupData & PnPTermGroup)[];
                if (this.props.limitByGroupNameOrID) {
                    const pnpGroup = this._getPnPTermGroupsByNameOrId(pnpTermStore.Id, this.props.limitByGroupNameOrID);
                    pnpGroups = [];

                    if (pnpGroup) {
                        pnpGroups.push(pnpGroup);
                    }
                }
                else {
                    pnpGroups = this._pnpGroups[pnpTermStore.Id];
                }

                const batch = taxonomy.createBatch();

                pnpGroups.forEach(pnpGroup => {
                    pnpGroup.termSets.inBatch(batch).usingCaching().get().then(pnpTermSets => {
                        termSets = [...termSets, ...pnpTermSets.map(pnpTermSet => {
                            return this._pnpTermSet2TermSet(pnpTermSet, TermStorePickerServiceHelper.cleanGuid(pnpGroup.Id));
                        })];
                    });
                });

                await batch.execute();
            }
        }

        return termSets;
    }

    /**
     * Gets all terms from the specified term set
     * @param termSet Term Set to get terms from
     */
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

            const pnpTerms: (ITermData & PnPTerm)[] = termsResult as (ITermData & PnPTerm)[];
            const resultTerms: ITerm[] = [];
            const labelsBatch = taxonomy.createBatch();

            for (let termIdx = 0, termsLen = pnpTerms.length; termIdx < termsLen; termIdx++) {
                const pnpTerm = pnpTerms[termIdx];

                const term: ITerm = (pnpTerm as any) as ITerm;
                term.Id = TermStorePickerServiceHelper.cleanGuid(term.Id);
                term.PathDepth = term.PathOfTerm.split(';').length;
                term.TermSet = termSet;

                resultTerms.push(term);

                if (this.props.includeLabels) {
                    pnpTerm.labels.inBatch(labelsBatch).usingCaching().get().then(labels => {
                        term.Labels = labels.map(label => label.Value);
                    });
                }
            }

            if (this.props.includeLabels) {
                await labelsBatch.execute();
            }

            return resultTerms;
        }

    }

    /**
     * Get term sets from the specified group
     * @param group Term Group
     */
    public async getGroupTermSets(group: IGroup): Promise<ITermSets> {
        await this._ensureTermStores();
        const pnpTermStore = this._pnpTermStores.filter(ts => TermStorePickerServiceHelper.cleanGuid(ts.Id) === group.TermStore.Id)[0];

        const pnpGroups = this._pnpGroups[pnpTermStore.Id].filter(gr => TermStorePickerServiceHelper.cleanGuid(gr.Id) === group.Id); //await pnpTermStore.getTermGroupById(group.Id).usingCaching().get();
        if (!pnpGroups || !pnpGroups.length) {
            return {
                _ObjectType_: this._termSetCollectionObjectType,
                _Child_Items_: []
            };
        }
        const pnpGroup = pnpGroups[0];
        let pnpTermSets: (ITermSetData & PnPTermSet)[];
        if (this.props.limitByTermsetNameOrID) {
            const isGuid: boolean = TermStorePickerServiceHelper.isGuid(this.props.limitByTermsetNameOrID);
            if (isGuid) {
                pnpTermSets = [await pnpGroup.termSets.getById(this.props.limitByTermsetNameOrID).usingCaching().get()];
            }
            else {
                pnpTermSets = [await pnpGroup.termSets.getByName(this.props.limitByTermsetNameOrID).usingCaching().get()];
            }
        }
        else {
            pnpTermSets = await pnpGroup.termSets.usingCaching().get();
        }

        const result: ITermSets = {
            _ObjectType_: this._termSetCollectionObjectType,
            _Child_Items_: pnpTermSets.map(pnpTermSet => {
                return this._pnpTermSet2TermSet(pnpTermSet, TermStorePickerServiceHelper.cleanGuid(pnpGroup.Id));
            })
        };

        return result;
    }

    /**
     * Tries to get terms from the specified Term Set.
     * @param pnpTermStore Term Store to work with
     * @param termSet Term set to get terms from
     */
    private _tryGetAllTerms(pnpTermStore: ITermStoreData & PnPTermStore, termSet: ITermSet): Promise<(ITermData & PnPTerm)[]> {
        return new Promise<(ITermData & PnPTerm)[]>((resolve, reject) => {
            pnpTermStore.getTermSetById(termSet.Id).terms.usingCaching().get().then((pnpTerms) => {
                resolve(pnpTerms);
            }, (error) => {
                reject(error);
            });
        });
    }

    /**
     * Searches terms by provided text in the term sets specified by the this.props.limitByTermSetNameOrId
     * @param searchText text to search
     */
    private async _searchTermsByTermSet(searchText: string): Promise<IPickerTerm[]> {
        if (Environment.type === EnvironmentType.Local) {
            // If the running environment is local, load the data from the mock
            return SPTermStoreMockHttpClient.searchTermsByName(searchText);
        } else {
            await this._ensureTermStores();
            let returnTerms: IPickerTerm[] = [];
            const pnpTermStores = this._pnpTermStores;

            //
            // iterating through term stores
            //
            for (let i = 0, len = pnpTermStores.length; i < len; i++) {
                const pnpTermStore = pnpTermStores[i];
                const pnpTermSets = await this._getPnPTermSetsByNameOrId(pnpTermStore, this.props.limitByTermsetNameOrID);

                // getting filtered terms from term sets
                returnTerms.push(...await this._searchTermsInTermSets(pnpTermStore, pnpTermSets, searchText));

            }

            return returnTerms;
        }
    }

    /**
     * Searches terms by provided text in the term sets specified by the this.props.limitByGroupNameOrId
     * @param searchText text to search
     */
    private async _searchTermsByGroup(searchText: string): Promise<IPickerTerm[]> {
        if (Environment.type === EnvironmentType.Local) {
            // If the running environment is local, load the data from the mock
            return SPTermStoreMockHttpClient.searchTermsByName(searchText);
        } else {
            await this._ensureTermStores();
            const groupNameOrID = this.props.limitByGroupNameOrID;
            let returnTerms: IPickerTerm[] = [];
            const pnpTermStores = this._pnpTermStores;

            //
            // iterating through term stores
            //
            for (let i = 0, len = pnpTermStores.length; i < len; i++) {
                const pnpTermStore = pnpTermStores[i];
                const pnpGroup = this._getPnPTermGroupsByNameOrId(pnpTermStore.Id, groupNameOrID);

                if (!pnpGroup) {
                    continue;
                }
                // getting term sets from term group
                const pnpTermSets = await pnpGroup.termSets.usingCaching().get();
                // getting filtered terms from term sets
                returnTerms.push(...await this._searchTermsInTermSets(pnpTermStore, pnpTermSets, searchText, pnpGroup.Id));
            }

            return returnTerms;
        }
    }

    /**
     * Searches for terms in the term store
     * @param searchText text to search
     */
    private async _searchAllTerms(searchText: string): Promise<IPickerTerm[]> {
        if (Environment.type === EnvironmentType.Local) {
            // If the running environment is local, load the data from the mock
            return SPTermStoreMockHttpClient.searchTermsByName(searchText);
        }

        await this._ensureTermStores();

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
                ResultCollectionSize: 30
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
                     pickerTerm.termGroup = TermStorePickerServiceHelper.cleanGuid(pnpTermGroup.Id);
                 });
 
                 pnpTerm.termSet.inBatch(batch).usingCaching().get().then(pnpTermSet => {
                     pickerTerm.termSet = TermStorePickerServiceHelper.cleanGuid(pnpTermSet.Id);
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

    /**
     * Searches for terms by provided text in specified term sets
     * @param pnpTermStore Term Store
     * @param pnpTermSets term sets where the terms should be searched for
     * @param searchText text to search
     * @param termGroupId Id of the group that contains the term sets
     */
    private async _searchTermsInTermSets(pnpTermStore: ITermStoreData & PnPTermStore, pnpTermSets: (ITermSetData & PnPTermSet)[], searchText: string, termGroupId?: string): Promise<IPickerTerm[]> {
        const returnTerms: IPickerTerm[] = [];
        const termSetGroups: { [key: string]: string } = {};
        const termsBatch = taxonomy.createBatch();
        const labelsBatch = taxonomy.createBatch();
        const lowerCasedSearchText = searchText.toLowerCase();

        for (let termSetIdx = 0, termSetLen = pnpTermSets.length; termSetIdx < termSetLen; termSetIdx++) {
            const pnpTermSet = pnpTermSets[termSetIdx];
            const pnpTermSetGuid = TermStorePickerServiceHelper.cleanGuid(pnpTermSet.Id);

            if (!termGroupId) { // if no group id provided we need to load it from store
                pnpTermSet.group.inBatch(termsBatch).usingCaching().get().then(pnpTermGroup => {
                    termSetGroups[pnpTermSet.Id] = pnpTermGroup.Id;

                    const loadedTerms = returnTerms.filter(t => t.termSet === pnpTermSetGuid);
                    loadedTerms.forEach(t => {
                        t.termGroup = TermStorePickerServiceHelper.cleanGuid(pnpTermGroup.Id);
                    });
                });
            }

            // getting terms for term set in batch
            pnpTermSet.terms.inBatch(termsBatch).usingCaching().get().then(pnpTerms => {
                for (let termIdx = 0, termLen = pnpTerms.length; termIdx < termLen; termIdx++) {
                    const pnpTerm = pnpTerms[termIdx];
                    if (pnpTerm.Name.toLowerCase().indexOf(lowerCasedSearchText) === 0) {
                        const pickerTerm: IPickerTerm = {
                            key: TermStorePickerServiceHelper.cleanGuid(pnpTerm.Id),
                            name: pnpTerm.Name,
                            path: pnpTerm.PathOfTerm,
                            termSet: TermStorePickerServiceHelper.cleanGuid(pnpTermSetGuid),
                            termSetName: pnpTermSet.Name,
                            termGroup: termGroupId || TermStorePickerServiceHelper.cleanGuid(termSetGroups[pnpTermSet.Id])
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

    /**
     * Ensures (loads if needed) term stores and term groups from taxonomy service
     */
    private async _ensureTermStores(): Promise<void> {
        if (!this._pnpTermStores) {
            this._pnpTermStores = await taxonomy.termStores.usingCaching().get();

            // TODO: limit by group or termset
            for (let i = 0, len = this._pnpTermStores.length; i < len; i++) {
                const pnpTermStore = this._pnpTermStores[i];

                let pnpGroups: (ITermGroupData & PnPTermGroup)[];

                if (this.props.limitByGroupNameOrID) {
                    const group = await this._requestPnPTermGroupByNameOrId(pnpTermStore, this.props.limitByGroupNameOrID);
                    pnpGroups = [];
                    if (group) {
                        pnpGroups.push(group);
                    }
                }
                else if (this.props.limitByTermsetNameOrID) {
                    const pnpTermSets = await this._getPnPTermSetsByNameOrId(pnpTermStore, this.props.limitByTermsetNameOrID);
                    pnpGroups = [];
                    const groupsBatch = taxonomy.createBatch();
                    pnpTermSets.forEach(pnpTermSet => {
                        pnpTermSet.group.inBatch(groupsBatch).usingCaching().get().then(pnpGroup => {
                            if (!pnpGroups.filter(gr => gr.Id === pnpGroup.Id).length) {
                                pnpGroups.push(pnpGroup);
                            }
                        });
                    });

                    await groupsBatch.execute();
                }
                else {
                    pnpGroups = await pnpTermStore.groups.usingCaching().get();
                }

                this._pnpGroups[pnpTermStore.Id] = pnpGroups;
            }
        }
    }

    /**
     * Converts @pnp/sp-taxonomy Term Set instance into internal ITermSet object
     * @param pnpTermSet @pnp/sp-taxonomy Term Set instance
     * @param groupId Id of the group that contains the term set
     */
    private _pnpTermSet2TermSet(pnpTermSet: (ITermSetData & PnPTermSet), groupId: string): ITermSet {
        const anyPnPTermSet: any = pnpTermSet as any; // we need this one to reference _ObjectType_ and _ObjectIdentity_
        return {
            _ObjectType_: anyPnPTermSet._ObjectType_,
            _ObjectIdentity_: anyPnPTermSet._ObjectIdentity_,
            Id: TermStorePickerServiceHelper.cleanGuid(pnpTermSet.Id),
            Name: pnpTermSet.Name,
            Description: pnpTermSet.Description,
            Names: pnpTermSet.Names,
            Group: groupId
        };
    }

    /**
     * Converts @pnp/sp-taxonomy Term Group instance into internal IGroup object
     * @param pnpTermGroup @pnp/sp-taxonomy Term Group instance
     * @param pnpTermStore @pnp/sp-taxonumy term store to work with
     */
    private _pnpTermGroup2TermGroup(pnpTermGroup: (ITermGroupData & PnPTermGroup), pnpTermStore: (ITermStoreData & PnPTermStore)): IGroup {
        const anyPnPTermGroup: any = pnpTermGroup as any; // we need this one to reference _ObjectType_ and _ObjectIdentity_
        return {
            _ObjectType_: anyPnPTermGroup._ObjectType_,
            _ObjectIdentity_: anyPnPTermGroup._ObjectIdentity_,
            Id: TermStorePickerServiceHelper.cleanGuid(pnpTermGroup.Id),
            Name: pnpTermGroup.Name,
            IsSystemGroup: pnpTermGroup.IsSystemGroup,
            TermStore: {
                Id: TermStorePickerServiceHelper.cleanGuid(pnpTermStore.Id),
                Name: pnpTermStore.Name
            },
            TermSets: {
                _ObjectType_: this._termSetCollectionObjectType,
                _Child_Items_: null
            }
        };
    }

    /**
     * Gets term set(s) from taxonomy service by name or id
     * @param pnpTermStore @pnp/sp-taxonumy term store to work with
     * @param termSetNameOrID term set name or id
     */
    private async _getPnPTermSetsByNameOrId(pnpTermStore: (ITermStoreData & PnPTermStore), termSetNameOrID: string): Promise<(ITermSetData & PnPTermSet)[]> {
        let pnpTermSets: (ITermSetData & PnPTermSet)[];
        const isGuid = TermStorePickerServiceHelper.isGuid(termSetNameOrID);
        //
        // getting term sets by filter
        //
        if (isGuid) {
            pnpTermSets = [];
            const pnpTermSet = await pnpTermStore.getTermSetById(termSetNameOrID).usingCaching().get();
            if (pnpTermSet.Id) {
                pnpTermSets.push(pnpTermSet);
            }
        }
        else {
            pnpTermSets = await pnpTermStore.getTermSetsByName(termSetNameOrID, pnpTermStore.DefaultLanguage).usingCaching().get();
        }

        return pnpTermSets;
    }

    /**
     * Gets group from cached (previously loaded) list of groups by name or id
     * @param termStoreId term store id
     * @param groupNameOrID group name or id
     */
    private _getPnPTermGroupsByNameOrId(termStoreId: string, groupNameOrID: string): (ITermGroupData & PnPTermGroup) {
        const isGuid = TermStorePickerServiceHelper.isGuid(groupNameOrID);

        const pnpTermStoreGroups = this._pnpGroups[termStoreId];
        if (pnpTermStoreGroups) {
            const groups = pnpTermStoreGroups.filter(pnpGroup =>
                isGuid ? TermStorePickerServiceHelper.cleanGuid(pnpGroup.Id) === groupNameOrID
                    : pnpGroup.Name === groupNameOrID);
            if (groups && groups.length) {
                return groups[0];
            }
        }

        return null;
    }

    /**
     * Gets group from taxonomy service by name or id
     * @param pnpTermStore @pnp/sp-taxonomy term store to work with
     * @param groupNameOrID group name or id
     */
    private async _requestPnPTermGroupByNameOrId(pnpTermStore: (ITermStoreData & PnPTermStore), groupNameOrID: string): Promise<(ITermGroupData & PnPTermGroup)> {
        const isGuid = TermStorePickerServiceHelper.isGuid(groupNameOrID);

        let group: ITermGroupData & PnPTermGroup;
        if (isGuid) {
            group = await pnpTermStore.getTermGroupById(groupNameOrID).usingCaching().get();
        }
        else {
            group = await pnpTermStore.groups.getByName(groupNameOrID).usingCaching().get();
        }

        if (group.Id) {
            return group;
        }

        return null;
    }
}