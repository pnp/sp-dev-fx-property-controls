import { ISPLists } from '../propertyFields/listPicker/IPropertyFieldListPickerHost';

/**
 * @class
 * Defines a http client to request mock data to use the web part with the local workbench
 */
export default class SPListPickerMockHttpClient {
  /**
   * @var
   * Mock SharePoint result sample
   */
  private static _results: ISPLists = { value: [] };

  /**
   * @function
   * Mock search People method
   */
  public static getLists(restUrl: string, options?: any): Promise<ISPLists> {
    return new Promise<ISPLists>((resolve) => {
      resolve(SPListPickerMockHttpClient._results);
    });
  }
}
