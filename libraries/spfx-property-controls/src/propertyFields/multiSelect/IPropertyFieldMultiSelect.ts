import {
  IPropertyPaneCustomFieldProps,
  IPropertyPaneDropdownProps
} from '@microsoft/sp-property-pane';

/**
* Public properties of PropertyFieldMultiSelect custom field
*/
export interface IPropertyFieldMultiSelectProps extends IPropertyPaneDropdownProps {
  key: string;
  selectedKeys?: string[] | number[];
}

/**
* Internal properties of PropertyFieldMultiSelect custom field
*/
export interface IPropertyFieldMultiSelectPropsInternal extends IPropertyPaneCustomFieldProps, IPropertyPaneDropdownProps, IPropertyFieldMultiSelectProps {
}
