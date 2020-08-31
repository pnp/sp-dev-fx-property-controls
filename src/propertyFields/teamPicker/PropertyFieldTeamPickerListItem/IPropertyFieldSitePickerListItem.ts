import { IPropertyFieldTeam } from '../IPropertyFieldTeamPicker';

export interface IPropertyFieldTeamPickerListItemProps {
  site: IPropertyFieldTeam;
  checked: boolean;
  handleCheckboxChange(site: IPropertyFieldTeam, checked: boolean): void;
}