import {
  IPropertyPaneCustomFieldProps,
} from '@microsoft/sp-property-pane';
import { MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';

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
