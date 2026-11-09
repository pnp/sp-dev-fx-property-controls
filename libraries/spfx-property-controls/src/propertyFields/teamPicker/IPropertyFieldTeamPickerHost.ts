import { IPropertyFieldTeamPickerPropsInternal, IPropertyFieldTeam} from './IPropertyFieldTeamPicker';

/**
 * PropertyFieldTeamPickerHost properties interface
 */
export interface IPropertyFieldTeamPickerHostProps extends IPropertyFieldTeamPickerPropsInternal {
  onChange: (targetProperty?: string, newValue?: any) => void; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export interface ITeamPickerState {
  teamSearchResults?: Array<IPropertyFieldTeam>;
  selectedTeams?: Array<IPropertyFieldTeam>;
  isLoading: boolean;
  errorMessage?: string;
}
