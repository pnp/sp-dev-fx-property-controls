import { SPHttpClientResponse } from "@microsoft/sp-http";
import { SPHttpClient } from "@microsoft/sp-http";
import { Environment, EnvironmentType } from "@microsoft/sp-core-library";
import { BaseComponentContext } from "@microsoft/sp-component-base";
import {
  ISPLists,
  IPropertyFieldListPickerHostProps,
  ISPList,
} from "../propertyFields/listPicker/IPropertyFieldListPickerHost";
import { PropertyFieldListPickerOrderBy } from "../propertyFields/listPicker/IPropertyFieldListPicker";
import SPListPickerMockHttpClient from "./SPListPickerMockService";

import filter from "lodash";
/**
 * Service implementation to get list & list items from current SharePoint site
 */
export default class SPListPickerService {
  private context: BaseComponentContext;
  private props: IPropertyFieldListPickerHostProps;

  /**
   * Service constructor
   */
  constructor(
    _props: IPropertyFieldListPickerHostProps,
    pageContext: BaseComponentContext
  ) {
    this.props = _props;
    this.context = pageContext;
  }

  /**
   * Gets the collection of libs in the current SharePoint site, or target site if specified by webRelativeUrl
   */
  public async getLibs(): Promise<ISPLists> {
  
    if (Environment.type === EnvironmentType.Local) {
      // If the running environment is local, load the data from the mock
      return this.getLibsFromMock();
    } else {
      // use the web relative url if provided, otherwise default to current SharePoint site
      const webAbsoluteUrl = this.props.webAbsoluteUrl
        ? this.props.webAbsoluteUrl
        : this.context.pageContext.web.absoluteUrl;
      // If the running environment is SharePoint, request the lists REST service
      let queryUrl: string;
      if (this.props.contentTypeId) {
        queryUrl = `${webAbsoluteUrl}/_api/lists?$select=Title,id,BaseTemplate,RootFolder/ServerRelativeUrl,ContentTypes/StringId&$expand=RootFolder&$expand=ContentTypes`;
      } else {
        queryUrl = `${webAbsoluteUrl}/_api/lists?$select=Title,id,BaseTemplate,RootFolder/ServerRelativeUrl&$expand=RootFolder`;
      }
      // Check if the orderBy property is provided
      if (this.props.orderBy !== null) {
        queryUrl += "&$orderby=";
        switch (this.props.orderBy) {
          case PropertyFieldListPickerOrderBy.Id:
            queryUrl += "Id";
            break;
          case PropertyFieldListPickerOrderBy.Title:
            queryUrl += "Title";
            break;
        }
      }

      // Adds an OData Filter to the list
      if (this.props.filter) {
        queryUrl += `&$filter=${encodeURIComponent(this.props.filter)}`;
      }
      // Check if the list have get filtered based on the list base template type
      else if (this.props.baseTemplate !== null && this.props.baseTemplate) {
        queryUrl += "&$filter=BaseTemplate%20eq%20";
        queryUrl += this.props.baseTemplate;
        // Check if you also want to exclude hidden list in the list
        if (this.props.includeHidden === false) {
          queryUrl += "%20and%20Hidden%20eq%20false";
        }
      } else {
        if (this.props.includeHidden === false) {
          queryUrl += "&$filter=Hidden%20eq%20false";
        }
      }
      let response = await this.context.spHttpClient.get(
        queryUrl,
        SPHttpClient.configurations.v1
      );

      let lists = (await response.json()) as ISPLists;
      //remove unwanted contenttypes
     
   
      if (this.props.contentTypeId) {
        debugger;
        const testct=this.props.contentTypeId.toUpperCase();
        lists.value = lists.value.filter((l) => {
          for (let ct of l.ContentTypes) {
           const ctid:String=ct.StringId.toUpperCase();
            if (ctid.substring(0,testct.length)===testct) {
              return true;
            }
          }
          return false;
        });
      }

      // Check if onListsRetrieved callback is defined
      if (this.props.onListsRetrieved) {
        //Call onListsRetrieved
        let lr = this.props.onListsRetrieved(lists.value);
        let output: ISPList[];

        //Conditional checking to see of PromiseLike object or array
        if (lr instanceof Array) {
          output = lr;
        } else {
          output = await lr;
        }

        lists = {
          value: output,
        };
      }
      return lists;
    }
  }

  /**
   * Returns 3 fake SharePoint lists for the Mock mode
   */
  private getLibsFromMock(): Promise<ISPLists> {
    return SPListPickerMockHttpClient.getLists(
      this.context.pageContext.web.absoluteUrl
    ).then(() => {
      const listData: ISPLists = {
        value: [
          {
            Title: "Mock List One",
            Id: "6770c83b-29e8-494b-87b6-468a2066bcc6",
            BaseTemplate: "109",
            RootFolder: { ServerRelativeUrl: "/sites/test/MockListOne" },
          ContentTypes:[{StringId:"0x0100"}]
          },
          {
            Title: "Mock List Two",
            Id: "2ece98f2-cc5e-48ff-8145-badf5009754c",
            BaseTemplate: "109",
            RootFolder: { ServerRelativeUrl: "/sites/test/MockListTwo" },
            ContentTypes:[{StringId:"0x0120"}]
          },
          {
            Title: "Mock List Three",
            Id: "bd5dbd33-0e8d-4e12-b289-b276e5ef79c2",
            BaseTemplate: "109",
            RootFolder: { ServerRelativeUrl: "/sites/test/MockListThree" },
            ContentTypes:[{StringId:"0x0100"}]
          },
        ],
      };
      return listData;
    }) as Promise<ISPLists>;
  }
}
