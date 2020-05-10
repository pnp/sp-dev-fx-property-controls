import {
  IPropertyPaneCustomFieldProps,
} from '@microsoft/sp-webpart-base';
import { MessageBarType } from 'office-ui-fabric-react/lib-es2015/MessageBar';


export enum MessageType {
  info = 0,
  error = 1,
  success = 4,
  warning = 5,
}

export interface IPropertyFieldMessageProps {
  key: string;
  text: string;
  messageType: MessageBarType;
  truncate?: boolean;
  multiline?: boolean;
  className?: string;
  isVisible: boolean;
}

export interface IPropertyFieldMessagePropsInternal extends IPropertyFieldMessageProps , IPropertyPaneCustomFieldProps{}
