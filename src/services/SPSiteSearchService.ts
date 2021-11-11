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
    let rowLimit = 500;
    let totalRows = 0;
    const values: any[] = [];

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

      let searchResponse = await ctx.spHttpClient.post(requestUrl, SPHttpClient.configurations.v1, {
        body: JSON.stringify({ request: searchRequest }),
        headers: {
          'Accept': 'application/json;odata=nometadata',
          'Content-Type': 'application/json;charset=utf-8',
          'odata-version': '3.0'
        }
      });
      let sitesResponse = await searchResponse.json();
      let relevantResults = sitesResponse.PrimaryQueryResult.RelevantResults;

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
