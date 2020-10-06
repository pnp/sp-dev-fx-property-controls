import { IPropertyFieldTeamPickerPropsInternal, IPropertyFieldTeam} from './IPropertyFieldTeamPicker';

/**
 * PropertyFieldTeamPickerHost properties interface
 */
export interface IPropertyFieldTeamPickerHostProps extends IPropertyFieldTeamPickerPropsInternal {
  onChange: (targetProperty?: string, newValue?: any) => void;
}

export interface ITeamPickerState {
  siteSearchResults?: Array<IPropertyFieldTeam>;
  selectedSites?: Array<IPropertyFieldTeam>;
  isLoading: boolean;
  errorMessage?: string;
}