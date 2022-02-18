import {
  IPropertyPaneCustomFieldProps,
} from '@microsoft/sp-property-pane';

export interface IPropertyFieldGuidProps {
  key: string;
  value?: string;
  label?: string;
  errorMessage?: string;
  onChanged?: (newValue: any) => void;
}

export interface IPropertyFieldGuidPropsInternal extends IPropertyFieldGuidProps , IPropertyPaneCustomFieldProps{}
