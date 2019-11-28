import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { IPropertyFieldSite } from '../propertyFields/sitePicker/IPropertyFieldSitePicker';

/**
 * Service interface definition
 */

export interface ISPSiteSearchService {
  /**
   * Search Site from a query
   */
  searchSites(ctx: IWebPartContext, query: string): Promise<Array<IPropertyFieldSite>>;
}