
import { MessageBarType } from '@fluentui/react/lib/MessageBar';

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
