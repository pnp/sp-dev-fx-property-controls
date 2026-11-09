/* eslint-disable @typescript-eslint/no-explicit-any */
import { IButtonStyles } from '@fluentui/react/lib/Button';
import { IIconProps } from '@fluentui/react/lib/Icon';
import { IPropertyPaneCustomFieldProps } from '@microsoft/sp-property-pane';

export interface IPropertyFieldButtonProps {
  key: string;
  disabled?: boolean;
  styles?: IButtonStyles;
  className?: string;
  isVisible: boolean;
  isPrimary?: boolean;
  text?:string;
  onClick: ( e: any ) => void;
  iconProps? : IIconProps;
}

export interface IPropertyFieldButtonPropsInternal extends IPropertyFieldButtonProps , IPropertyPaneCustomFieldProps{}
