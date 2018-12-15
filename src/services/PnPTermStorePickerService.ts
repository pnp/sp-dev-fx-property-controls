import { ISPTermStorePickerService, IPnPTermStorePickerServiceProps, ITermStore, ITermSet } from "./ISPTermStorePickerService";
import { IWebPartContext } from "@microsoft/sp-webpart-base";
import { taxonomy, ITermStore as PnPTermStore, ITermStoreData, StringMatchOption } from "@pnp/sp-taxonomy";
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

    /**
   * Cleans the Guid from the Web Service response
   * @param guid
   */
    public cleanGuid(guid: string): string {
        if (guid !== undefined) {
            return guid.replace('/Guid(', '').replace('/', '').replace(')', '');
        } else {
            return '';
        }
    }

    public async searchTermsByName(searchText: string): Promise<IPickerTerm[]> {
        if (Environment.type === EnvironmentType.Local) {
            // If the running environment is local, load the data from the mock
            return SPTermStoreMockHttpClient.searchTermsByName(searchText);
        } else {
            if (this.props.limitByTermsetNameOrID) {
                return this.searchTermsByTermSet(searchText, this.props.limitByTermsetNameOrID);
            } else if (this.props.limitByGroupNameOrID) {
                return this.searchTermsByGroup(searchText);
            } else {
                return this.searchAllTerms(searchText);
            }
        }
    }

    public async getTermSets(): Promise<ITermSet[]> {
        if (!this._pnpTermStores) {
            this._pnpTermStores = await taxonomy.termStores.get();
        }

        this._pnpTermStores[0].
    }

    private async searchAllTerms(searchText: string): Promise<IPickerTerm[]> {
        if (Environment.type === EnvironmentType.Local) {
            // If the running environment is local, load the data from the mock
            return SPTermStoreMockHttpClient.searchTermsByName(searchText);
          }

        if (!this._pnpTermStores) {
            this._pnpTermStores = await taxonomy.termStores.get();
        }

        let returnTerms: IPickerTerm[] = [];

        for (let i = 0, len = this._pnpTermStores.length; i < len; i++) {
            const pnpTermStore = this._pnpTermStores[i];
            const pnpTerms = await pnpTermStore.getTerms({
                TermLabel: searchText,
                StringMatchOption: StringMatchOption.StartsWith,
                DefaultLabelOnly: true,
                TrimUnavailable: true,
                ResultCollectionSize: 10
            }).get();

            const batch = taxonomy.createBatch();

            pnpTerms.forEach(term => {
                const pickerTerm: IPickerTerm = {
                    key: term.Id,
                    name: term.Name,
                    path: term.PathOfTerm,
                    termSet: ''
                };
                returnTerms.push(pickerTerm);

                term.termSet.inBatch(batch).get().then(termSet => {
                    pickerTerm.termSet = termSet.Id,
                    pickerTerm.termSetName = termSet.Name
                });

                term.labels.inBatch(batch).get().then(labels => {
                    pickerTerm.labels = labels.map(label => label.Value);
                });
            });

            await batch.execute();
        }

        return returnTerms;
    }
}