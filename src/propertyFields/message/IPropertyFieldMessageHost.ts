
import {
  IPropertyPaneCustomFieldProps,
} from '@microsoft/sp-webpart-base';


import { MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';

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
