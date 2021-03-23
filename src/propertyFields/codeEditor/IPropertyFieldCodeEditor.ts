import { BaseComponentContext } from '@microsoft/sp-component-base';
import { AceOptions } from 'react-ace';


export enum PropertyFieldCodeEditorLanguages {
  "JSON" = "json",
  "JavaScript" = "javascript",
  "Sass" = "sass",
  "TypeScript" = "typescript",
  "Plain Text" = "plain_text",
  "HTML" = "html",
  "Handlebars" = "handlebars",
  "XML" = "xml",
  "css" = "sass"
}


/**
 * Public properties of the PropertyFieldCodeEditor custom field
 */
export interface IPropertyFieldCodeEditorProps {
  /**
   * Property field label displayed on top
   */
  label: string;
  /**
   * Title of the code editor panel
   */
  panelTitle: string;

  /**
   * Defines the initial code.
   */
  initialValue?: string;

  /**
   * Sets the language on the code editor
   */
  language?: PropertyFieldCodeEditorLanguages;

  /**
   * Defines a onPropertyChange function to raise when the selected value changed.
   * Normally this function must be always defined with the 'this.onPropertyChange'
   * method of the web part object.
   */
  onPropertyChange(propertyPath: string, oldValue: any, newValue: any): void;
  /**
   * Parent Web Part properties
   */
  properties: any;
  /**
   * An UNIQUE key indicates the identity of this control
   */
  key: string;
  /**
   * Whether the property pane field is enabled or not.
   */
  disabled?: boolean;
  /**
   * Custom Field will start to validate after users stop typing for `deferredValidationTime` milliseconds.
   * Default value is 200.
   */
  deferredValidationTime?: number;
  /**
   * Additional properties available to the Ace editor
   */
  options?: AceOptions;
}

/**
 * Private properties of the PropertyFieldCodeEditor custom field.
 * We separate public & private properties to include onRender & onDispose method waited
 * by the PropertyFieldCustom, witout asking to the developer to add it when he's using
 * the PropertyFieldCodeEditor.
 */
export interface IPropertyFieldCodeEditorPropsInternal extends IPropertyFieldCodeEditorProps {
  targetProperty: string;
  onRender(elem: HTMLElement): void;
  onDispose(elem: HTMLElement): void;
}
