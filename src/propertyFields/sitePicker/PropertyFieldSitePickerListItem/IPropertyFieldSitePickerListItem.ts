import { IPropertyFieldSite } from '../IPropertyFieldSitePicker';

export interface IPropertyFieldSitePickerListItemProps {
  site: IPropertyFieldSite;
  checked: boolean;
  handleCheckboxChange(site: IPropertyFieldSite, checked: boolean): void;
}