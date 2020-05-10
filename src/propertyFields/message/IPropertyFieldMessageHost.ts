
import {
  IPropertyPaneCustomFieldProps,
} from '@microsoft/sp-webpart-base';

import {MessageType} from './IPropertyFieldMessage';
import { MessageBarType } from 'office-ui-fabric-react/lib-es2015/MessageBar';

export interface IPropertyFieldMessageHostProps {
  key: string;
  text: string;
  messageType: MessageBarType;
  truncate?: boolean;
  multiline?: boolean;
  className?: string;
  isVisible: boolean;
}

export interface IPropertyFieldMessageHostState {
  text: string;

}
