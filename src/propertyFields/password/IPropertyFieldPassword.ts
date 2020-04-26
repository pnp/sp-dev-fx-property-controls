import {
  IPropertyPaneCustomFieldProps,
} from '@microsoft/sp-webpart-base';

export interface IPropertyFieldPasswordProps {
  key: string;
  value: string;
  label?: string;
  onChanged?: (newValue: any) => void;
}

export interface IPropertyFieldPasswordPropsInternal extends IPropertyFieldPasswordProps , IPropertyPaneCustomFieldProps{}
