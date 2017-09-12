/**
 * DISCLAIMER
 *
 * As there is not yet an OData end-point for managed metadata, this service makes use of the ProcessQuery end-points.
 * The service will get updated once the APIs are in place for managing managed metadata.
 */

import { SPHttpClient, SPHttpClientResponse, ISPHttpClientOptions } from '@microsoft/sp-http';
import { Environment, EnvironmentType } from '@microsoft/sp-core-library';
import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { IPropertyFieldTermPickerHostProps } from "./../propertyFields/termPicker/IPropertyFieldTermPickerHost";
import { ISPTermStores, ISPTermStore, ISPTermGroups, ISPTermGroup, ICheckedTerms, ICheckedTerm } from "./../propertyFields/termPicker/IPropertyFieldTermPicker";
import { ITermStore, ITerms, ITerm } from "./ISPTermStorePickerService";
import SPTermStoreMockHttpClient from './SPTermStorePickerMockService';

/**
 * @class
 * Service implementation to manage term stores in SharePoint
 */
export default class SPTermStorePickerService {
  private context: IWebPartContext;
  private props: IPropertyFieldTermPickerHostProps;
  private taxonomySession: string;
  private formDigest: string;
  private clientServiceUrl: string;

  /**
   * @function
   * Service constructor
   */
  constructor(_props: IPropertyFieldTermPickerHostProps, pageContext: IWebPartContext) {
    this.props = _props;
    this.context = pageContext;

    this.clientServiceUrl = this.context.pageContext.web.absoluteUrl + '/_vti_bin/client.svc/ProcessQuery';
  }

  /**
   * @function
   * Gets the collection of term stores in the current SharePoint env
   */
  public getTermStores(): Promise<ITermStore[]> {
    if (Environment.type === EnvironmentType.Local) {
      // If the running environment is local, load the data from the mock
      return this.getTermStoresFromMock();
    } else {
      // Retrieve the term store name, groups, and term sets
      const data = '<Request AddExpandoFieldTypeSuffix="true" SchemaVersion="15.0.0.0" LibraryVersion="16.0.0.0" ApplicationName=".NET Library" xmlns="http://schemas.microsoft.com/sharepoint/clientquery/2009"><Actions><ObjectPath Id="2" ObjectPathId="1" /><ObjectIdentityQuery Id="3" ObjectPathId="1" /><ObjectPath Id="5" ObjectPathId="4" /><ObjectIdentityQuery Id="6" ObjectPathId="4" /><Query Id="7" ObjectPathId="4"><Query SelectAllProperties="false"><Properties><Property Name="Id" ScalarProperty="true" /><Property Name="Name" ScalarProperty="true" /><Property Name="Groups"><Query SelectAllProperties="false"><Properties /></Query><ChildItemQuery SelectAllProperties="false"><Properties><Property Name="Name" ScalarProperty="true" /><Property Name="Id" ScalarProperty="true" /><Property Name="IsSystemGroup" ScalarProperty="true" /><Property Name="TermSets"><Query SelectAllProperties="false"><Properties /></Query><ChildItemQuery SelectAllProperties="false"><Properties><Property Name="Name" ScalarProperty="true" /><Property Name="Id" ScalarProperty="true" /><Property Name="Description" ScalarProperty="true" /><Property Name="Names" ScalarProperty="true" /></Properties></ChildItemQuery></Property></Properties></ChildItemQuery></Property></Properties></Query></Query></Actions><ObjectPaths><StaticMethod Id="1" Name="GetTaxonomySession" TypeId="{981cbc68-9edc-4f8d-872f-71146fcbb84f}" /><Method Id="4" ParentId="1" Name="GetDefaultSiteCollectionTermStore" /></ObjectPaths></Request>';

      let httpPostOptions = {
        headers: {
          'accept': 'application/json',
          'content-type': 'application/xml'
        },
        body: data
      };
      return this.context.spHttpClient.post(this.clientServiceUrl, SPHttpClient.configurations.v1, httpPostOptions).then((serviceResponse: SPHttpClientResponse) => {
        return serviceResponse.json().then((serviceJSONResponse: any) => {
          // Construct results
          const termStoreResult: ITermStore[] = serviceJSONResponse.filter(r => r["_ObjectType_"] === "SP.Taxonomy.TermStore");
          if (termStoreResult.length > 0) {
            // Check if system groups have to be excluded
            if (this.props.excludeSystemGroup) {
              let nonSystemTermGroups = termStoreResult.map(termstore => {
                // Filter out all systen groups
                termstore.Groups._Child_Items_ = termstore.Groups._Child_Items_.filter(group => !group.IsSystemGroup);
                return termstore;
              });
              return nonSystemTermGroups;
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
   * @function
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

      let httpPostOptions = {
        headers: {
          'accept': 'application/json',
          'content-type': 'application/xml'
        },
        body: data
      };

      return this.context.spHttpClient.post(this.clientServiceUrl, SPHttpClient.configurations.v1, httpPostOptions).then((serviceResponse: SPHttpClientResponse) => {
        return serviceResponse.json().then((serviceJSONResponse: any) => {
          // Retrieve the term collection results
          const termStoreResult: ITerms[] = serviceJSONResponse.filter(r => r["_ObjectType_"] === "SP.Taxonomy.TermCollection");
          if (termStoreResult.length > 0) {
            // Retrieve all terms
            let terms = termStoreResult[0]._Child_Items_;
            // Clean the term ID and specify the path depth
            terms = terms.map(term => {
              term.Id = this._cleanGuid(term.Id);
              term["PathDepth"] = term.PathOfTerm.split(';').length;
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
   * @function
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
   * @function
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
   * @function
   * Returns 3 fake SharePoint lists for the Mock mode
   */
  private getTermStoresFromMock(): Promise<ITermStore[]> {
    return SPTermStoreMockHttpClient.getTermStores(this.context.pageContext.web.absoluteUrl).then((data) => {
      return data;
    }) as Promise<ITermStore[]>;
  }

  /**
   * @function
   * Returns 3 fake SharePoint lists for the Mock mode
   */
  private getAllMockTerms(): Promise<ITerm[]> {
    return SPTermStoreMockHttpClient.getAllTerms().then((data) => {
      return data;
    }) as Promise<ITerm[]>;
  }
}
