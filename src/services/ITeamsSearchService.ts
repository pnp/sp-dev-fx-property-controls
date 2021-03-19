import { BaseComponentContext } from '@microsoft/sp-component-base';
import { IPropertyFieldTeam} from '../propertyFields/teamPicker/IPropertyFieldTeamPicker';

/**
 * Service interface definition
 */

export interface ITeamsSearchService {
  /**
   * Search Site from a query
   */
  searchTeams(ctx: BaseComponentContext, query: string): Promise<Array<IPropertyFieldTeam>>;
}
