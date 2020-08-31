import { Environment, EnvironmentType } from '@microsoft/sp-core-library';
import SPPeoplePickerMockHttpClient from './SPPeopleSearchMockService';
import { WebPartContext, IWebPartContext } from "@microsoft/sp-webpart-base";
import { ITeamsSearchService } from './ITeamsSearchService';
import { IPropertyFieldTeam } from '../propertyFields/teamPicker/IPropertyFieldTeamPicker';
import { GraphHttpClient, HttpClientResponse } from '@microsoft/sp-http';
import { getCtxCallback } from '@pnp/common';
import { CheckboxVisibility } from 'office-ui-fabric-react/lib/DetailsList';
import { dateAdd, PnPClientStorage } from "@pnp/common";
/**
 * Service implementation to search sites in SharePoint
 */
export default class TeamsSearchService implements ITeamsSearchService {
  /**
   * Search sites from the SharePoint
   */
 private  storage = new PnPClientStorage();
  public async searchTeams(ctx: any, query: string): Promise<IPropertyFieldTeam[]> {
    if (Environment.type === EnvironmentType.Local) {
      // If the running environment is local, load the data from the mock
      return this.searchSitesFromMock(ctx, query);
    } else {

      const _msGraphClient = await ctx.msGraphClientFactory.getClient();
      const _listOfTeamsResults: any = await _msGraphClient
        .api(`/groups?$filter=startswith(displayName,'${query}') AND resourceProvisioningOptions/Any(x:x eq 'Team')`)
        .version("beta")
        .get();

      const _listOfTeams: any[] = _listOfTeamsResults.value;

      let _res: IPropertyFieldTeam[] = [];
      if (_listOfTeams && _listOfTeams.length > 0) {
        for (const _team of _listOfTeams) {
          const _webUrl = await this.getGroupUrl(ctx,_team.id);
          _res.push({ id: _team.id, title: _team.displayName, url: _webUrl});
        }
      }
      return _res;
    }
  }

  private async  getGroupUrl(ctx:any, groupId:string):Promise<string>{
    const cachedGroupUrl:string = this.storage.local.get(`${groupId}WebUrl`);
    if (!cachedGroupUrl){
      const _msGraphClient = await ctx.msGraphClientFactory.getClient();
      const _groupInfo: any = await _msGraphClient
      .api(`/groups/${groupId}/drive/root/webUrl`)
      .version("beta")
      .get();

      let _webUrl:string = _groupInfo.value;
      const _lastSlash = _webUrl.lastIndexOf('/');
       _webUrl = _webUrl.substring(0, _lastSlash);
       this.storage.local.put(`${groupId}WebUrl`, _webUrl, dateAdd(new Date(), "day", 5));
      return _webUrl;
    }else{
       return  cachedGroupUrl;
    }
  }

  /**
   * Returns fake sites results for the Mock mode
   */
  private searchSitesFromMock(ctx: IWebPartContext, query: string): Promise<Array<IPropertyFieldTeam>> {
    return SPPeoplePickerMockHttpClient.searchPeople(ctx.pageContext.web.absoluteUrl).then(() => {
      const results: IPropertyFieldTeam[] = [
        { title: 'Contoso Team', id: '611453e1-5b5d-45ec-94aa-a180a02df897', url: ctx.pageContext.web.absoluteUrl }
      ];
      return results;
    }) as Promise<Array<IPropertyFieldTeam>>;
  }
}
