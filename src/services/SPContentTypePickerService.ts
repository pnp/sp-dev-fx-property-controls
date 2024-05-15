import { SPHttpClient } from '@microsoft/sp-http';
import { BaseComponentContext } from '@microsoft/sp-component-base';
import { ISPContentType, IPropertyFieldContentTypePickerHostProps, PropertyFieldContentTypeOrderBy } from '../propertyFields/contentTypePicker';
import { ISPContentTypePickerService } from './ISPContentTypePickerService';
import { ISPContentTypes } from '../propertyFields/contentTypePicker';

/**
 * Service implementation to get Content Types from SharePoint site or selected SharePoint List
 */
export class SPContentTypePickerService implements ISPContentTypePickerService {
  private context: BaseComponentContext;
  private props: IPropertyFieldContentTypePickerHostProps;

  /**
   * Service constructor
   */
  constructor(_props: IPropertyFieldContentTypePickerHostProps, pageContext: BaseComponentContext) {
    this.props = _props;
    this.context = pageContext;
  }

  /**
   * Gets the collection of ContentTypes from SharePoint site or selected SharePoint List
   */
  public async getContentTypes(): Promise<ISPContentTypes> {
    if (this.context.pageContext.web.absoluteUrl === undefined || this.context.pageContext.web.absoluteUrl === "") {
      return this.getEmptycontentTypes();
    }

    const webAbsoluteUrl = this.props.webAbsoluteUrl ? this.props.webAbsoluteUrl : this.context.pageContext.web.absoluteUrl;

    // If the listId is selected, then get the contentTypes from the list or get the contentTypes from site level
    let queryUrl: string = this.props.listId ? `${webAbsoluteUrl}/_api/lists(guid'${this.props.listId}')/ContentTypes?$select=Name,Id` : `${webAbsoluteUrl}/_api/web/ContentTypes?$select=Name,Id`;

    // Check if the orderBy property is provided
    if (this.props.orderBy !== null || this.props.orderBy !== undefined){
      queryUrl += '&$orderby=';
      switch (this.props.orderBy) {
        case PropertyFieldContentTypeOrderBy.Id:
          queryUrl += 'Id';
          break;
        case PropertyFieldContentTypeOrderBy.Name:
          queryUrl += 'Name';
          break;
      }

      // Adds an OData Filter to the list
      if (this.props.filter) {
        queryUrl += `&$filter=${encodeURIComponent(this.props.filter)}`;
      }

      const response = await this.context.spHttpClient.get(queryUrl, SPHttpClient.configurations.v1);
      const views = (await response.json()) as ISPContentTypes;

      // Check if onContentTypesRetrieved callback is defined
      if (this.props.onContentTypesRetrieved) {
        //Call onContentTypesRetrieved
        const lr = this.props.onContentTypesRetrieved(views.value);
        let output: ISPContentType[];

        //Conditional checking to see of PromiseLike object or array
        if (lr instanceof Array) {
          output = lr;
        } else {
          output = await lr;
        }

        views.value = output;
      }

      return views;
    }
  }

  /**
   * Returns an empty contentType for when no selection is done
   */
  private getEmptycontentTypes(): Promise<ISPContentTypes> {
    return new Promise<ISPContentTypes>((resolve) => {
      const listData: ISPContentTypes = {
        value: [
        ]
      };

      resolve(listData);
    });
  }
}
