import { BaseComponentContext } from '@microsoft/sp-component-base';
import { IPropertyFieldSite } from '../propertyFields/sitePicker/IPropertyFieldSitePicker';

/**
 * Service interface definition
 */

export interface ISPSiteSearchService {
  /**
   * Search Site from a query
   */
  searchSites(ctx: BaseComponentContext, query: string): Promise<Array<IPropertyFieldSite>>;
}
