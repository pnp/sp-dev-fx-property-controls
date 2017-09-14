import { PrincipalType } from "../PropertyFieldPeoplePicker";
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
  searchPeople(query: string, principleType: PrincipalType[]): Promise<Array<IPropertyFieldGroupOrPerson>>;
}
