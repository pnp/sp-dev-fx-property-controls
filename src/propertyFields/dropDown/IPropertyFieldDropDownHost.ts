import { IPropertyFieldDropDownPropsInternal } from './IPropertyFieldDropDown';
import { IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';

/**
 * PropertyFieldDropDownHost properties interface
 */
export interface IPropertyFieldDropDownHostProps extends IPropertyFieldDropDownPropsInternal {

  onChange: (targetProperty?: string, newValue?: any) => void;
}

/**
 * PropertyFieldDropDownHost state interface
 */
export interface IPropertyFieldDropDownHostState {

  options: IDropdownOption[];
  selectedKey?: string;
  selectedKeys?: string[];
  errorMessage?: string;
}

/**
 * Defines a collection of SharePoint lists
 */
export interface ISPLists {

  value: ISPList[];
}

/**
 * Defines a SharePoint list
 */
export interface ISPList {

  Title: string;
  Id: string;
  BaseTemplate: string;
}
