import {
  IPropertyPaneCustomFieldProps,
} from '@microsoft/sp-property-pane';

export interface IPropertyFieldGuidProps {
  key: string;
  value?: string;
  label?: string;
  errorMessage?: string;
  onChanged?: (newValue: any) => void; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export interface IPropertyFieldGuidPropsInternal extends IPropertyFieldGuidProps , IPropertyPaneCustomFieldProps{}
