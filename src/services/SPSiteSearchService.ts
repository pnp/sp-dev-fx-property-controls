import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { Environment, EnvironmentType } from '@microsoft/sp-core-library';
import SPPeoplePickerMockHttpClient from './SPPeopleSearchMockService';
import { BaseComponentContext } from '@microsoft/sp-component-base';
import { ISPSiteSearchService } from './ISPSiteSearchService';
import { IPropertyFieldSite } from '../propertyFields/sitePicker/IPropertyFieldSitePicker';

/**
 * Service implementation to search sites in SharePoint
 */
export default class SPSiteSearchService implements ISPSiteSearchService {
  /**
   * Search sites from the SharePoint
   */
  public searchSites(ctx: BaseComponentContext, query: string): Promise<IPropertyFieldSite[]> {
    if (Environment.type === EnvironmentType.Local) {
      // If the running environment is local, load the data from the mock
      return this.searchSitesFromMock(ctx, query);
    } else {

      let rootUrl: string = ctx.pageContext.web.absoluteUrl;
      if (ctx.pageContext.web.serverRelativeUrl !== "/") {
        rootUrl = ctx.pageContext.web.absoluteUrl.replace(ctx.pageContext.web.serverRelativeUrl, '');
      }

      // If the running env is SharePoint, loads from the search
      const userRequestUrl: string = `${ctx.pageContext.web.absoluteUrl}/_api/search/query?querytext='contentclass:STS_Site contentclass:STS_Web Title:*${query}* Path:${rootUrl}*'&selectproperties='SiteId,SiteID,WebId,Title,Path'&rowlimit=5`;

      // Do the call against the SP REST API search endpoint
      return ctx.spHttpClient.get(userRequestUrl, SPHttpClient.configurations.v1).then((searchResponse: SPHttpClientResponse) => {
        return searchResponse.json().then((sitesResponse: any) => {
          let res: IPropertyFieldSite[] = [];
          const values: any = sitesResponse.PrimaryQueryResult.RelevantResults.Table.Rows;
          res = values.map(element => {
            const site: IPropertyFieldSite = {} as IPropertyFieldSite;
            element.Cells.forEach(cell => {
              switch (cell.Key) {
                case 'Title':
                  site.title = cell.Value;
                  break;
                case 'Path':
                  site.url = cell.Value;
                  break;
                case 'SiteId':
                case 'SiteID':
                  site.id = cell.Value;
                  break;
                case 'WebId':
                  site.webId = cell.Value;
                  break;
              }
            });

            return site;
          });
          return res;
        });
      });
    }
  }

  /**
   * Returns fake sites results for the Mock mode
   */
  private searchSitesFromMock(ctx: BaseComponentContext, query: string): Promise<Array<IPropertyFieldSite>> {
    return SPPeoplePickerMockHttpClient.searchPeople(ctx.pageContext.web.absoluteUrl).then(() => {
      const results: IPropertyFieldSite[] = [
        { title: 'Contoso Site', id: '611453e1-5b5d-45ec-94aa-a180a02df897', url: ctx.pageContext.web.absoluteUrl }
      ];
      return results;
    }) as Promise<Array<IPropertyFieldSite>>;
  }
}
