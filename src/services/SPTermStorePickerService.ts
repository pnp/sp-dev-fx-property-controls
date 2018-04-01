/**
 * DISCLAIMER
 *
 * As there is not yet an OData end-point for managed metadata, this service makes use of the ProcessQuery end-points.
 * The service will get updated once the APIs are in place for managing managed metadata.
 */

import { SPHttpClient, SPHttpClientResponse, ISPHttpClientOptions } from '@microsoft/sp-http';
import { Environment, EnvironmentType } from '@microsoft/sp-core-library';
import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { IPropertyFieldTermPickerHostProps } from './../propertyFields/termPicker/IPropertyFieldTermPickerHost';
import { ISPTermStores, ISPTermStore, ISPTermGroups, ISPTermGroup, ICheckedTerms, ICheckedTerm } from './../propertyFields/termPicker/IPropertyFieldTermPicker';
import { ITermStore, ITerms, ITerm, IGroup, ITermSet } from './ISPTermStorePickerService';
import SPTermStoreMockHttpClient from './SPTermStorePickerMockService';

/**
 * Service implementation to manage term stores in SharePoint
 */
export default class SPTermStorePickerService {
  private taxonomySession: string;
  private formDigest: string;
  private clientServiceUrl: string;

  /**
   * Service constructor
   */
  constructor(private props: IPropertyFieldTermPickerHostProps, private context: IWebPartContext) {
    this.clientServiceUrl = this.context.pageContext.web.absoluteUrl + '/_vti_bin/client.svc/ProcessQuery';
  }

  /**
   * Gets the collection of term stores in the current SharePoint env
   */
  public getTermStores(): Promise<ITermStore[]> {
    if (Environment.type === EnvironmentType.Local) {
      // If the running environment is local, load the data from the mock
      return this.getTermStoresFromMock();
    } else {
      // Retrieve the term store name, groups, and term sets
      const data = '<Request AddExpandoFieldTypeSuffix="true" SchemaVersion="15.0.0.0" LibraryVersion="16.0.0.0" ApplicationName=".NET Library" xmlns="http://schemas.microsoft.com/sharepoint/clientquery/2009"><Actions><ObjectPath Id="2" ObjectPathId="1" /><ObjectIdentityQuery Id="3" ObjectPathId="1" /><ObjectPath Id="5" ObjectPathId="4" /><ObjectIdentityQuery Id="6" ObjectPathId="4" /><Query Id="7" ObjectPathId="4"><Query SelectAllProperties="false"><Properties><Property Name="Id" ScalarProperty="true" /><Property Name="Name" ScalarProperty="true" /><Property Name="Groups"><Query SelectAllProperties="false"><Properties /></Query><ChildItemQuery SelectAllProperties="false"><Properties><Property Name="Name" ScalarProperty="true" /><Property Name="Id" ScalarProperty="true" /><Property Name="IsSystemGroup" ScalarProperty="true" /><Property Name="TermSets"><Query SelectAllProperties="false"><Properties /></Query><ChildItemQuery SelectAllProperties="false"><Properties><Property Name="Name" ScalarProperty="true" /><Property Name="Id" ScalarProperty="true" /><Property Name="Description" ScalarProperty="true" /><Property Name="Names" ScalarProperty="true" /></Properties></ChildItemQuery></Property></Properties></ChildItemQuery></Property></Properties></Query></Query></Actions><ObjectPaths><StaticMethod Id="1" Name="GetTaxonomySession" TypeId="{981cbc68-9edc-4f8d-872f-71146fcbb84f}" /><Method Id="4" ParentId="1" Name="GetDefaultSiteCollectionTermStore" /></ObjectPaths></Request>';

      const reqHeaders = new Headers();
      reqHeaders.append("accept", "application/json");
      reqHeaders.append("content-type", "application/xml");

      const httpPostOptions: ISPHttpClientOptions = {
        headers: reqHeaders,
        body: data
      };

      return this.context.spHttpClient.post(this.clientServiceUrl, SPHttpClient.configurations.v1, httpPostOptions).then((serviceResponse: SPHttpClientResponse) => {
        return serviceResponse.json().then((serviceJSONResponse: any) => {
          // Construct results
          let termStoreResult: ITermStore[] = serviceJSONResponse.filter(r => r['_ObjectType_'] === 'SP.Taxonomy.TermStore');
          // Check if term store was retrieved
          if (termStoreResult.length > 0) {
            // Check if the termstore needs to be filtered or limited
            if (this.props.limitByGroupNameOrID || this.props.limitByTermsetNameOrID || this.props.excludeSystemGroup) {
              return termStoreResult.map(termstore => {
                let termGroups = termstore.Groups._Child_Items_;
                // Check if the groups have to be limited to a specific group name or ID
                if (this.props.limitByGroupNameOrID) {
                  const groupNameOrId = this.props.limitByGroupNameOrID;
                  termGroups = termGroups.filter((group: IGroup) => group.Name === groupNameOrId || group.Id.toLowerCase() === groupNameOrId.toLowerCase());
                }

                // Check if the groups have to be limited to a specific term set
                if (this.props.limitByTermsetNameOrID) {
                  const termsetNameOrId = this.props.limitByTermsetNameOrID;
                  termGroups = termGroups.map((group: IGroup) => {
                    group.TermSets._Child_Items_ = group.TermSets._Child_Items_.filter((termSet: ITermSet) => termSet.Name === termsetNameOrId || termSet.Id.toLowerCase() === termsetNameOrId.toLowerCase());
                    return group;
                  });
                }

                // Filter out all systen groups
                if (this.props.excludeSystemGroup) {
                  termGroups = termGroups.filter(group => !group.IsSystemGroup);
                }

                // Filter out empty groups
                termGroups = termGroups.filter((group: IGroup) => group.TermSets._Child_Items_.length > 0);

                // Map the new groups
                termstore.Groups._Child_Items_ = termGroups;
                return termstore;
              });
            }

            // Return the term store results
            return termStoreResult;
          }
          return [];
        });
      });
    }
  }

  /**
   * Retrieve all terms for the given term set
   * @param termsetId
   */
  public async getAllTerms(termsetId: string): Promise<ITerm[]> {
    if (Environment.type === EnvironmentType.Local) {
      // If the running environment is local, load the data from the mock
      return this.getAllMockTerms();
    } else {
      // Request body to retrieve all terms for the given term set
      const data = `<Request AddExpandoFieldTypeSuffix="true" SchemaVersion="15.0.0.0" LibraryVersion="16.0.0.0" ApplicationName=".NET Library" xmlns="http://schemas.microsoft.com/sharepoint/clientquery/2009"><Actions><ObjectPath Id="30" ObjectPathId="29" /><Query Id="31" ObjectPathId="29"><Query SelectAllProperties="false"><Properties /></Query><ChildItemQuery SelectAllProperties="false"><Properties><Property Name="Name" ScalarProperty="true" /><Property Name="Id" ScalarProperty="true" /><Property Name="Description" ScalarProperty="true" /><Property Name="IsDeprecated" ScalarProperty="true" /><Property Name="IsRoot" ScalarProperty="true" /><Property Name="PathOfTerm" ScalarProperty="true" /><Property Name="Parent" SelectAll="true"><Query SelectAllProperties="false"><Properties /></Query></Property><Property Name="TermSet"><Query SelectAllProperties="false"><Properties><Property Name="Id" ScalarProperty="true" /></Properties></Query></Property></Properties></ChildItemQuery></Query></Actions><ObjectPaths><Method Id="29" ParentId="18" Name="GetAllTerms" /><Identity Id="18" Name="${termsetId}"
      /></ObjectPaths></Request>`;

      const reqHeaders = new Headers();
      reqHeaders.append("accept", "application/json");
      reqHeaders.append("content-type", "application/xml");

      const httpPostOptions: ISPHttpClientOptions = {
        headers: reqHeaders,
        body: data
      };

      return this.context.spHttpClient.post(this.clientServiceUrl, SPHttpClient.configurations.v1, httpPostOptions).then((serviceResponse: SPHttpClientResponse) => {
        return serviceResponse.json().then((serviceJSONResponse: any) => {
          // Retrieve the term collection results
          const termStoreResult: ITerms[] = serviceJSONResponse.filter(r => r['_ObjectType_'] === 'SP.Taxonomy.TermCollection');
          if (termStoreResult.length > 0) {
            // Retrieve all terms
            let terms = termStoreResult[0]._Child_Items_;
            // Clean the term ID and specify the path depth
            terms = terms.map(term => {
              term.Id = this._cleanGuid(term.Id);
              term['PathDepth'] = term.PathOfTerm.split(';').length;
              return term;
            });
            // Check if the term set was not empty
            if (terms.length > 0) {
              // Sort the terms by PathOfTerm
              terms = terms.sort(this._sortTerms);
              return terms;
            }
          }
          return null;
        });
      });
    }
  }

  /**
   * Retrieve all terms that starts with the searchText 
   * @param searchText
   */
  public searchTermsByName(searchText: string): Promise<ICheckedTerm[]> {
    if (Environment.type === EnvironmentType.Local) {
      // If the running environment is local, load the data from the mock
      return SPTermStoreMockHttpClient.searchTermsByName(searchText);
    } else {
      return new Promise((resolve, reject) => {
        this.loadTaxScripts()
          .then(() => {
            const ctx = SP.ClientContext.get_current();
            const session = SP.Taxonomy.TaxonomySession.getTaxonomySession(ctx);
            const store = session.getDefaultKeywordsTermStore();

            const labelMatch = new SP.Taxonomy.LabelMatchInformation(ctx);
            labelMatch.set_termLabel(searchText);
            labelMatch.set_stringMatchOption(SP.Taxonomy.StringMatchOption.startsWith);
            labelMatch.set_resultCollectionSize(10);
            labelMatch.set_trimUnavailable(true);

            const terms = store.getTerms(labelMatch);

            ctx.load(terms, 'Include(IsRoot, Id, Name, LocalCustomProperties)');
            ctx.executeQueryAsync(() => {

              let returnTerms: ICheckedTerm[] = [];

              const termEnumerator = terms.getEnumerator();

              while (termEnumerator.moveNext()) {

                const currentTerm = termEnumerator.get_current();
                console.log(currentTerm);
                if (currentTerm.get_isDeprecated() == false) {
                  returnTerms.push({
                    key: currentTerm.get_id().toString(),
                    name: currentTerm.get_name(),
                    path: "",
                    termSet: ""
                  });
                }
                console.log(currentTerm.get_name());
              }
              resolve(returnTerms);

            }, (sender, args) => {
              //fail
              console.log(args.get_message());
            });

          });
      });

    }
  }


  /**
   * Sort the terms by their path
   * @param a term 2
   * @param b term 2
   */
  private _sortTerms(a: ITerm, b: ITerm) {
    if (a.PathOfTerm < b.PathOfTerm) {
      return -1;
    }
    if (a.PathOfTerm > b.PathOfTerm) {
      return 1;
    }
    return 0;
  }

  /**
   * Clean the Guid from the Web Service response
   * @param guid
   */
  private _cleanGuid(guid: string): string {
    if (guid !== undefined) {
      return guid.replace('/Guid(', '').replace('/', '').replace(')', '');
    } else {
      return '';
    }
  }

  /**
   * Returns 3 fake SharePoint lists for the Mock mode
   */
  private getTermStoresFromMock(): Promise<ITermStore[]> {
    return SPTermStoreMockHttpClient.getTermStores(this.context.pageContext.web.absoluteUrl).then((data) => {
      return data;
    }) as Promise<ITermStore[]>;
  }

  /**
   * Returns 3 fake SharePoint lists for the Mock mode
   */
  private getAllMockTerms(): Promise<ITerm[]> {
    return SPTermStoreMockHttpClient.getAllTerms().then((data) => {
      return data;
    }) as Promise<ITerm[]>;
  }





  /**
  * Loads needed jsom javascript files needed to access the taxonomy api's
  */
  private loadTaxScripts(): Promise<void> {
    return new Promise<void>((resolve) => {
      let layoutsBase: string = this.context.pageContext.web.absoluteUrl;
      if (layoutsBase.lastIndexOf('/') === layoutsBase.length - 1)
        layoutsBase = layoutsBase.slice(0, -1);
      layoutsBase += '/_layouts/15/';

      this.loadScript(layoutsBase + 'init.js', 'Sod').then(() => {
        return this.loadScript(layoutsBase + 'sp.runtime.js', 'sp_runtime_initialize');
      }).then(() => {
        return this.loadScript(layoutsBase + 'sp.js', 'sp_initialize');
      }).then(() => {
        return this.loadScript(layoutsBase + 'sp.taxonomy.js', 'SP.Taxonomy');
      }).then(() => {
        resolve();
      });
    });
  }

  /**
   * inserts script into header of page
   */
  private loadScript(url: string, globalObjectName: string): Promise<void> {
    return new Promise<void>((resolve) => {
      let isLoaded = true;
      if (globalObjectName.indexOf('.') !== -1) {
        const props = globalObjectName.split('.');
        let currObj: any = window;
        for (let i = 0, len = props.length; i < len; i++) {
          if (!currObj[props[i]]) {
            isLoaded = false;
            break;
          }
          currObj = currObj[props[i]];
        }
      }
      else {
        isLoaded = !!window[globalObjectName];
      }
      if (isLoaded || document.head.querySelector('script[src="' + url + '"]')) {
        resolve();
        return;
      }
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = url;
      script.onload = () => {
        resolve();
      };
      document.head.appendChild(script);
    });
  }

}
