import { IPrincipalType } from "../PropertyFieldPeoplePicker";
import { IPropertyFieldGroupOrPerson } from './../propertyFields/peoplePicker/IPropertyFieldPeoplePicker';

/**
 * @interface
 * Service interface definition
 */

export interface ISPPeopleSearchService {
  /**
   * @function
   * Search People from a query
   */
  searchPeople(query: string, principleType: IPrincipalType[]): Promise<Array<IPropertyFieldGroupOrPerson>>;
}
