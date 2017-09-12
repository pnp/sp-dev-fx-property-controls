import { IPropertyFieldListPickerPropsInternal } from './IPropertyFieldListPicker';
import { IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';

/**
 * @interface
 * PropertyFieldListPickerHost properties interface
 *
 */
export interface IPropertyFieldListPickerHostProps extends IPropertyFieldListPickerPropsInternal {
  onChange: (targetProperty?: string, newValue?: any) => void;
}

/**
 * @interface
 * PropertyFieldListPickerHost state interface
 *
 */
export interface IPropertyFieldFontPickerHostState {
  results: IDropdownOption[];
  selectedKey: string;
  errorMessage?: string;
}

/**
 * @interface
 * Defines a collection of SharePoint lists
 */
export interface ISPLists {
  value: ISPList[];
}

/**
 * @interface
 * Defines a SharePoint list
 */
export interface ISPList {
  Title: string;
  Id: string;
  BaseTemplate: string;
}
