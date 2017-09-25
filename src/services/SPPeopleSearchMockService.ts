import { IPropertyFieldGroupOrPerson } from '../PropertyFieldPeoplePicker';

/**
 * Defines a http client to request mock data to use the web part with the local workbench
 */
export default class SPPeoplePickerMockHttpClient {

  /**
   * Mock SharePoint result sample
   */
  private static _results: IPropertyFieldGroupOrPerson[] = [];

  /**
   * Mock search People method
   */
  public static searchPeople(restUrl: string, options?: any): Promise<IPropertyFieldGroupOrPerson[]> {
    return new Promise<IPropertyFieldGroupOrPerson[]>((resolve) => {
      resolve(SPPeoplePickerMockHttpClient._results);
    });
  }
}
