import { Environment, EnvironmentType } from '@microsoft/sp-core-library';
import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { IPropertyFieldSitePlus } from '../IPropertyFieldSitePickerPlus';
import { sp, SearchQuery } from '@pnp/sp';

export default class SiteSearch {
  public async search(ctx: IWebPartContext, query: string): Promise<IPropertyFieldSitePlus[]> {
    const sites: IPropertyFieldSitePlus[] = [];
    const searchQuery: SearchQuery = <SearchQuery>{
      Querytext: `(NOT WebTemplate:SPSPERS) ContentClass:STS_Site (path:"${query}" OR SiteTitle:*${query}*)`,
      SelectProperties: ["SiteId", "SiteTitle", "SiteLogo", "Path"],
      TrimDuplicates: false
    };

    const searchResults = await sp.search(searchQuery);

    for (let i = 0; i < searchResults.PrimarySearchResults.length; i++) {
      const result = searchResults.PrimarySearchResults[i];
      sites.push({
        Title: result["SiteTitle"],
        Url: result.Path,
        IconUrl: result.SiteLogo,
        Selected: false
      });
    }
    return sites;
  }
}