import {
  Environment,
  EnvironmentType
} from "@microsoft/sp-core-library";
import { IWebPartContext } from "@microsoft/sp-webpart-base";
import {
  dateAdd,
  PnPClientStorage
} from "@pnp/common";
import { batch, IGraphBatchRequestItem } from "../helpers/GraphHelper";

import {
  IPropertyFieldTeam
} from "../propertyFields/teamPicker/IPropertyFieldTeamPicker";
import { ITeamsSearchService } from "./ITeamsSearchService";

/**
 * Service implementation to search sites in SharePoint
 */
export default class TeamsSearchService implements ITeamsSearchService {
  /**
   * Search sites from the SharePoint
   */
  private storage = new PnPClientStorage();
  public async searchTeams(ctx: any, query: string): Promise<IPropertyFieldTeam[]> {
    if (Environment.type === EnvironmentType.Local) {
      // If the running environment is local, load the data from the mock
      return this.searchSitesFromMock(ctx, query);
    } else {

      const msGraphClient = await ctx.msGraphClientFactory.getClient();
      const listOfTeamsResults: any = await msGraphClient
        .api(`/me/joinedTeams?$filter=startswith(displayName,'${query}')&$select=id,displayName`)
        .version("v1.0")
        .get();

      const listOfTeams: any[] = listOfTeamsResults.value;

      const res: IPropertyFieldTeam[] = [];
      if (listOfTeams && listOfTeams.length > 0) {

        const batchRequests: IGraphBatchRequestItem[] = [];
        listOfTeams.forEach((t) => {
          batchRequests.push({
            id: t.id,
            method: 'GET',
            url: `/groups/${t.id}/drive/root?$select=webUrl`
          });
        });

        const batchResponses = await batch(batchRequests, 'v1.0', ctx);

        for (const team of listOfTeams) {
          const webUrl = batchResponses.filter(br => br.id === team.id)[0].body.webUrl;
          res.push({ id: team.id, title: team.displayName, url: webUrl });
        }
      }
      return res;
    }
  }

  /**
   * Returns fake sites results for the Mock mode
   */
  private async searchSitesFromMock(ctx: IWebPartContext, query: string): Promise<Array<IPropertyFieldTeam>> {
    return [
      { title: 'Contoso Team', id: '611453e1-5b5d-45ec-94aa-a180a02df897', url: ctx.pageContext.web.absoluteUrl }
    ];
  }
}
