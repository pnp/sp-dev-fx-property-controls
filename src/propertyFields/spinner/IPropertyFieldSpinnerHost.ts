
import {
  IPropertyPaneCustomFieldProps,
} from '@microsoft/sp-webpart-base';

import { ISpinnerStyles, SpinnerSize } from 'office-ui-fabric-react';


export interface IPropertyFieldSpinnerHostProps {
  key: string;
  size: SpinnerSize;
  className?: string;
  styles?:ISpinnerStyles;
  isVisible: boolean;
  label?:string;
}

export interface IPropertyFieldSpinnerHostState {
 isVisible : boolean;
}
