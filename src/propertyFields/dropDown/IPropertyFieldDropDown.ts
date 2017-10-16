import { IWebPartContext, IPropertyPaneCustomFieldProps } from '@microsoft/sp-webpart-base';
import { IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';


/**
 * Public properties of the PropertyFieldDropDown custom field
 */
export interface IPropertyFieldDropDownProps {

  /**
   * Property field label displayed on top
   */
  label: string;
  /**
   * Context of the current web part
   */
  context: IWebPartContext;
  /**
   * Option list
   */
  options?: IDropdownOption[];
  /**
   * Loader for dynamac options
   */
  loader?: () => Promise<IDropdownOption[]>;
  /**
   * Initial selected list set of the control
   */
  selectedKey?: string | string[];
   /**
   * Specify if you want to have a single or mult list selector.
   */
  multiSelect?: boolean;
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
  key?: string;
  /**
   * Whether the property pane field is enabled or not.
   */
  disabled?: boolean;
  /**
   * The method is used to get the validation error message and determine whether the input value is valid or not.
   *
   *   When it returns string:
   *   - If valid, it returns empty string.
   *   - If invalid, it returns the error message string and the text field will
   *     show a red border and show an error message below the text field.
   *
   *   When it returns Promise<string>:
   *   - The resolved value is display as error message.
   *   - The rejected, the value is thrown away.
   *
   */
  onGetErrorMessage?: (value: string) => string | Promise<string>;
  /**
   * Custom Field will start to validate after users stop typing for `deferredValidationTime` milliseconds.
   * Default value is 200.
   */
  deferredValidationTime?: number;
}

/**
 * Private properties of the PropertyFieldDropDown custom field.
 * We separate public & private properties to include onRender & onDispose method waited
 * by the PropertyFieldCustom, witout asking to the developer to add it when he's using
 * the PropertyFieldDropDown.
 *
 */
export interface IPropertyFieldDropDownPropsInternal extends IPropertyFieldDropDownProps, IPropertyPaneCustomFieldProps {

  label: string;
  targetProperty: string;
  context: IWebPartContext;
  selectedKey?: string;
  selectedKeys?: string[];
  onPropertyChange(propertyPath: string, oldValue: any, newValue: any): void;
  properties: any;
  key: string;
  disabled?: boolean;
  onGetErrorMessage?: (value: string | string[]) => string | Promise<string>;
  deferredValidationTime?: number;
}
