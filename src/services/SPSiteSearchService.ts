import { SPHttpClient } from '@microsoft/sp-http';
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
  public async searchSites(ctx: BaseComponentContext, query: string, trimDuplicates: boolean, additionalQuery?: string | undefined): Promise<IPropertyFieldSite[]> {

    let rootUrl: string = ctx.pageContext.web.absoluteUrl;
    if (ctx.pageContext.web.serverRelativeUrl !== "/") {
      rootUrl = ctx.pageContext.web.absoluteUrl.replace(ctx.pageContext.web.serverRelativeUrl, '');
    }

    let queryText = `(contentclass:STS_Site contentclass:STS_Web Path:${rootUrl}* Title:${query}*)`;
    if (additionalQuery) {
      queryText += ` AND (${additionalQuery})`;
    }

    let startRow = 0;
    const rowLimit = 500;
    let totalRows = 0;
    const values: any[] = []; // eslint-disable-line @typescript-eslint/no-explicit-any

    const searchRequest = {
      QueryTemplate: queryText,
      RowLimit: rowLimit,
      TrimDuplicates: trimDuplicates,
      SelectProperties: ['SiteId', 'SiteID', 'WebId', 'DepartmentId', 'Title', 'Path'],
      StartRow: 0
    };

    const requestUrl = `${ctx.pageContext.web.absoluteUrl}/_api/search/postquery`;

    //
    // getting all sites
    //
    do {
      searchRequest.StartRow = startRow;

      const searchResponse = await ctx.spHttpClient.post(requestUrl, SPHttpClient.configurations.v1, {
        body: JSON.stringify({ request: searchRequest }),
        headers: {
          'Accept': 'application/json;odata=nometadata',
          'Content-Type': 'application/json;charset=utf-8',
          'odata-version': '3.0'
        }
      });
      const sitesResponse = await searchResponse.json();
      const relevantResults = sitesResponse.PrimaryQueryResult.RelevantResults;

      values.push(...relevantResults.Table.Rows);
      totalRows = relevantResults.TotalRows;
      startRow += rowLimit;

    } while (values.length < totalRows);

    // Do the call against the SP REST API search endpoint

    let res: IPropertyFieldSite[] = [];
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
          case 'DepartmentId':
            if (cell.Value) {
              if (cell.Value.indexOf('{') === 0) {
                site.hubSiteId = cell.Value.slice(1, -1);
              }
              else {
                site.hubSiteId = cell.Value;
              }
            }
            break;
        }
      });

      return site;
    });
    return res;
  }
}
