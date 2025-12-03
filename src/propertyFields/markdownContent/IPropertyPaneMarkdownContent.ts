import {
  IPropertyPaneCustomFieldProps
} from '@microsoft/sp-property-pane';
import { MarkdownToJSX } from 'markdown-to-jsx';


export interface IPropertyPaneMarkdownContentProps {
  /**
   * Property field label displayed on top
   */
  label?: string;

  /**
   * Optional CSS style to apply to markdown
   */
  className?: string;

  /**
   * An UNIQUE key indicates the identity of this control
   */
  key: string;

  /**
   * The markdown text you wish to display
   */
  markdown: string;

  /**
   * Allows you to override the markdown behavior,
   * such as overriding CSS styles and elements for
   * markdown elements.
   */
  options?: MarkdownToJSX.Options;
}

export interface IPropertyPaneMarkdownContentPropsInternal extends IPropertyPaneMarkdownContentProps, IPropertyPaneCustomFieldProps {
}

