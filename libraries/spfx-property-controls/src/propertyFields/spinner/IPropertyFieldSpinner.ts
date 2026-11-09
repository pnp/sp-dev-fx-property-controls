import {
  IPropertyPaneCustomFieldProps,
} from '@microsoft/sp-property-pane';
import { SpinnerSize } from '@fluentui/react/lib/components/Spinner';




export interface IPropertyFieldSpinnerProps {
  key: string;
  size: SpinnerSize;
  className?: string;
  isVisible: boolean;
  label?:string;
}

export interface IPropertyFieldSpinnerPropsInternal extends IPropertyFieldSpinnerProps , IPropertyPaneCustomFieldProps{}
