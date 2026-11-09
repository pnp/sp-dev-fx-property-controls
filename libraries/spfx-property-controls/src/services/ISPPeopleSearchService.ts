import { PrincipalType } from '../PropertyFieldPeoplePicker';
import { IPropertyFieldGroupOrPerson } from './../propertyFields/peoplePicker/IPropertyFieldPeoplePicker';
import { BaseComponentContext } from '@microsoft/sp-component-base';

/**
 * Service interface definition
 */

export interface ISPPeopleSearchService {

  /**
   * Search People from a query
   */
  searchPeople(ctx: BaseComponentContext, query: string, principleType: PrincipalType[], siteUrl?: string): Promise<Array<IPropertyFieldGroupOrPerson>>;
}
