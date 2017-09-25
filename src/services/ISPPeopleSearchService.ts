import { PrincipalType } from '../PropertyFieldPeoplePicker';
import { IPropertyFieldGroupOrPerson } from './../propertyFields/peoplePicker/IPropertyFieldPeoplePicker';

/**
 * Service interface definition
 */

export interface ISPPeopleSearchService {

  /**
   * Search People from a query
   */
  searchPeople(query: string, principleType: PrincipalType[]): Promise<Array<IPropertyFieldGroupOrPerson>>;
}
