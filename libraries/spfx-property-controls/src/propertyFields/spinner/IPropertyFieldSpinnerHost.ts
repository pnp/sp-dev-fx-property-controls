import { ISpinnerStyles, SpinnerSize } from '@fluentui/react';

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
