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
import { ISPTermStores, ISPTermStore, ISPTermGroups, ISPTermGroup, IPickerTerms, IPickerTerm } from './../propertyFields/termPicker/IPropertyFieldTermPicker';
import { ITermStore, ITerms, ITerm, IGroup, ITermSet, ISPTermStorePickerServiceProps } from './ISPTermStorePickerService';
import SPTermStoreMockHttpClient from './SPTermStorePickerMockService';
import TermSet from './../propertyFields/termPicker/TermSet';

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
  constructor(private props: ISPTermStorePickerServiceProps, private context: IWebPartContext) {
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
      const data = `<Request AddExpandoFieldTypeSuffix="true" SchemaVersion="15.0.0.0" LibraryVersion="16.0.0.0" ApplicationName=".NET Library" xmlns="http://schemas.microsoft.com/sharepoint/clientquery/2009"><Actions><ObjectPath Id="30" ObjectPathId="29" /><Query Id="31" ObjectPathId="29"><Query SelectAllProperties="false"><Properties /></Query><ChildItemQuery SelectAllProperties="false"><Properties><Property Name="Name" ScalarProperty="true" /><Property Name="Id" ScalarProperty="true" /><Property Name="Description" ScalarProperty="true" /><Property Name="IsDeprecated" ScalarProperty="true" /><Property Name="IsRoot" ScalarProperty="true" /><Property Name="PathOfTerm" ScalarProperty="true" /><Property Name="TermSet" SelectAll="true" /><Property Name="Parent" SelectAll="true"><Query SelectAllProperties="false"><Properties /></Query></Property><Property Name="TermSet"><Query SelectAllProperties="false"><Properties><Property Name="Id" ScalarProperty="true" /></Properties></Query></Property></Properties></ChildItemQuery></Query></Actions><ObjectPaths><Method Id="29" ParentId="18" Name="GetAllTerms" /><Identity Id="18" Name="${termsetId}"
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
  public searchTermsByName(searchText: string): Promise<IPickerTerm[]> {
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

  /**
     * Searches terms for the given term set
     * @param searchText
     * @param termsetId
     */
  private searchTermsByTermSet(searchText: string, termSet: string): Promise<IPickerTerm[]> {
    if (Environment.type === EnvironmentType.Local) {
      // If the running environment is local, load the data from the mock
      return SPTermStoreMockHttpClient.searchTermsByName(searchText);
    } else {
      return new Promise<IPickerTerm[]>(resolve => {
        this.getTermStores().then(termStore => {
          let TermSetId = termSet;
          if (!this.isGuid(termSet)) {
            TermSetId = this._cleanGuid(termStore[0].Groups._Child_Items_[0].TermSets._Child_Items_[0].Id);
          }
          let data = `<Request xmlns="http://schemas.microsoft.com/sharepoint/clientquery/2009" SchemaVersion="15.0.0.0" LibraryVersion="16.0.0.0" ApplicationName="Javascript Library"><Actions><ObjectPath Id="456" ObjectPathId="455" /><ObjectIdentityQuery Id="457" ObjectPathId="455" /><ObjectPath Id="459" ObjectPathId="458" /><ObjectIdentityQuery Id="460" ObjectPathId="458" /><ObjectPath Id="462" ObjectPathId="461" /><ObjectIdentityQuery Id="463" ObjectPathId="461" /><ObjectPath Id="465" ObjectPathId="464" /><SetProperty Id="466" ObjectPathId="464" Name="TermLabel"><Parameter Type="String">${searchText}</Parameter></SetProperty><SetProperty Id="467" ObjectPathId="464" Name="DefaultLabelOnly"><Parameter Type="Boolean">true</Parameter></SetProperty><SetProperty Id="468" ObjectPathId="464" Name="StringMatchOption"><Parameter Type="Number">0</Parameter></SetProperty><SetProperty Id="469" ObjectPathId="464" Name="ResultCollectionSize"><Parameter Type="Number">10</Parameter></SetProperty><SetProperty Id="470" ObjectPathId="464" Name="TrimUnavailable"><Parameter Type="Boolean">true</Parameter></SetProperty><ObjectPath Id="472" ObjectPathId="471" /><Query Id="473" ObjectPathId="471"><Query SelectAllProperties="false"><Properties /></Query><ChildItemQuery SelectAllProperties="false"><Properties><Property Name="IsRoot" SelectAll="true" /><Property Name="Id" SelectAll="true" /><Property Name="Name" SelectAll="true" /><Property Name="PathOfTerm" SelectAll="true" /><Property Name="TermSet" SelectAll="true" /></Properties></ChildItemQuery></Query></Actions><ObjectPaths><StaticMethod Id="455" Name="GetTaxonomySession" TypeId="{981cbc68-9edc-4f8d-872f-71146fcbb84f}" /><Method Id="458" ParentId="455" Name="GetDefaultKeywordsTermStore" /><Method Id="461" ParentId="458" Name="GetTermSet"><Parameters><Parameter Type="Guid">${TermSetId}</Parameter></Parameters></Method><Constructor Id="464" TypeId="{61a1d689-2744-4ea3-a88b-c95bee9803aa}" /><Method Id="471" ParentId="461" Name="GetTerms"><Parameters><Parameter ObjectPathId="464" /></Parameters></Method></ObjectPaths></Request>`;

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

                let returnTerms: IPickerTerm[] = [];
                terms.forEach(term => {
                  if (term.Name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1) {
                    returnTerms.push({
                      key: this._cleanGuid(term.Id),
                      name: term.Name,
                      path: term.PathOfTerm,
                      termSet: term.TermSet.Id,
                      termSetName: term.TermSet.Name

                    });
                  }
                });
                resolve(returnTerms);
              }
              return null;
            });
          });


        });


      });
    }
  }

  /**
   * Searches terms for a group
   * @param searchText
   */
  private searchTermsByGroup(searchText: string): Promise<IPickerTerm[]> {
    if (Environment.type === EnvironmentType.Local) {
      // If the running environment is local, load the data from the mock
      return SPTermStoreMockHttpClient.searchTermsByName(searchText);
    } else {
      return new Promise<IPickerTerm[]>(resolve => {
        this.getTermStores().then(termStore => {
          let termSetTerms: Array<Promise<ITerm[]>> = [];
          termStore[0].Groups._Child_Items_[0].TermSets._Child_Items_.forEach(ts => {
            termSetTerms.push(this.getAllTerms(ts._ObjectIdentity_));
          });

          Promise.all(termSetTerms).then(results => {
            let returnTerms: IPickerTerm[] = [];
            results.forEach(terms => {
              if (terms) {
                terms.forEach(term => {
                  if (term.Name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1) {
                    returnTerms.push({
                      key: this._cleanGuid(term.Id),
                      name: term.Name,
                      path: term.PathOfTerm,
                      termSet: term.TermSet.Id,
                      termSetName: term.TermSet.Name
                    });
                  }
                });
              }
            });
            resolve(returnTerms);
          });

        });
      });
    }

  }

  /**
   * Searches terms in termstore
   * @param searchText
   */
  private searchAllTerms(searchText: string): Promise<IPickerTerm[]> {
    if (Environment.type === EnvironmentType.Local) {
      // If the running environment is local, load the data from the mock
      return SPTermStoreMockHttpClient.searchTermsByName(searchText);
    } else {
      return new Promise<IPickerTerm[]>(resolve => {

        let data = `<Request xmlns="http://schemas.microsoft.com/sharepoint/clientquery/2009" SchemaVersion="15.0.0.0" LibraryVersion="16.0.0.0" ApplicationName="Javascript Library"><Actions><ObjectPath Id="775" ObjectPathId="774" /><ObjectIdentityQuery Id="776" ObjectPathId="774" /><ObjectPath Id="778" ObjectPathId="777" /><ObjectIdentityQuery Id="779" ObjectPathId="777" /><ObjectPath Id="781" ObjectPathId="780" /><SetProperty Id="782" ObjectPathId="780" Name="TermLabel"><Parameter Type="String">${searchText}</Parameter></SetProperty><SetProperty Id="783" ObjectPathId="780" Name="DefaultLabelOnly"><Parameter Type="Boolean">true</Parameter></SetProperty><SetProperty Id="784" ObjectPathId="780" Name="StringMatchOption"><Parameter Type="Number">0</Parameter></SetProperty><SetProperty Id="785" ObjectPathId="780" Name="ResultCollectionSize"><Parameter Type="Number">10</Parameter></SetProperty><SetProperty Id="786" ObjectPathId="780" Name="TrimUnavailable"><Parameter Type="Boolean">true</Parameter></SetProperty><ObjectPath Id="788" ObjectPathId="787" /><Query Id="789" ObjectPathId="787"><Query SelectAllProperties="false"><Properties /></Query><ChildItemQuery SelectAllProperties="false"><Properties><Property Name="IsRoot" SelectAll="true" /><Property Name="Id" SelectAll="true" /><Property Name="Name" SelectAll="true" /><Property Name="PathOfTerm" SelectAll="true" /><Property Name="TermSet" SelectAll="true" /></Properties></ChildItemQuery></Query></Actions><ObjectPaths><StaticMethod Id="774" Name="GetTaxonomySession" TypeId="{981cbc68-9edc-4f8d-872f-71146fcbb84f}" /><Method Id="777" ParentId="774" Name="GetDefaultKeywordsTermStore" /><Constructor Id="780" TypeId="{61a1d689-2744-4ea3-a88b-c95bee9803aa}" /><Method Id="787" ParentId="777" Name="GetTerms"><Parameters><Parameter ObjectPathId="780" /></Parameters></Method></ObjectPaths></Request>`;
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

              let returnTerms: IPickerTerm[] = [];
              terms.forEach(term => {
                if (term.Name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1) {
                  returnTerms.push({
                    key: this._cleanGuid(term.Id),
                    name: term.Name,
                    path: term.PathOfTerm,
                    termSet: term.TermSet.Id,
                    termSetName: term.TermSet.Name
                  });
                }
              });
              resolve(returnTerms);
            }
            return null;
          });
        });
      });
    }
  }


  private isGuid(strGuid: string): boolean {
    return /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(strGuid);
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
}
