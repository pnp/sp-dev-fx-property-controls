import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { IPropertyFieldTeam} from '../propertyFields/teamPicker/IPropertyFieldTeamPicker';

/**
 * Service interface definition
 */

export interface ITeamsSearchService {
  /**
   * Search Site from a query
   */
  searchTeams(ctx: IWebPartContext, query: string): Promise<Array<IPropertyFieldTeam>>;
}