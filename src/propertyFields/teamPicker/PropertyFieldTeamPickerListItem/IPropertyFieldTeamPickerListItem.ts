import { IPropertyFieldTeam } from '../IPropertyFieldTeamPicker';

export interface IPropertyFieldTeamPickerListItemProps {
  team: IPropertyFieldTeam;
  checked: boolean;
  handleCheckboxChange(team: IPropertyFieldTeam, checked: boolean): void;
}
