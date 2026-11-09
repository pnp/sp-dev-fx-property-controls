import { BaseComponentContext } from '@microsoft/sp-component-base';
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
  public async searchTeams(ctx: BaseComponentContext, query: string): Promise<IPropertyFieldTeam[]> {

    const msGraphClient = await ctx.msGraphClientFactory.getClient('3');
    const listOfTeamsResults: any = await msGraphClient // eslint-disable-line @typescript-eslint/no-explicit-any
      .api(`/me/joinedTeams?$filter=startswith(displayName,'${query}')&$select=id,displayName`)
      .version("v1.0")
      .get();

    const listOfTeams: any[] = listOfTeamsResults.value; // eslint-disable-line @typescript-eslint/no-explicit-any

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
