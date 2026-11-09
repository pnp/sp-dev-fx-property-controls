import {
  IPropertyPaneCustomFieldProps,
} from '@microsoft/sp-property-pane';

export interface IPropertyFieldPasswordProps {
  key: string;
  value: string;
  label?: string;
  onChanged?: (newValue: any) => void; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export interface IPropertyFieldPasswordPropsInternal extends IPropertyFieldPasswordProps, IPropertyPaneCustomFieldProps { }
