import { IPropertyPaneCustomFieldProps } from '@microsoft/sp-property-pane';
import { IRoleDefinitionInformation } from './IRoleDefinitionInformation';
import { BaseComponentContext } from '@microsoft/sp-component-base';

/**
 * Public properties of the PropertyFieldRoleDefinitionPicker custom field
 */
export interface IPropertyFieldRoleDefinitionPickerProps {
  /**
   * Context of the current web part
   */
  context: BaseComponentContext;

  /**
   * Whether the property pane field is enabled or not.
   */
  disabled?: boolean;

  /**
   * An UNIQUE key indicates the identity of this control
   */
  key?: string;

  /**
   * Property field label displayed on top
   */
  label?: string;

  /**
   * Data to load in the role definitions
   */
  roleDefinitions?: IRoleDefinitionInformation[];

  /**
   *
   */
  multiSelect?: boolean;
  /**
   * Parent Web Part properties
   */
  properties: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  /**
   * Initial selected role definition of the control
   */
  selectedRoleDefinition?: string[];

  /**
   * Defines role definitions which should be excluded from the role definition picker control
   */
  roleDefinitionsToExclude?: string[];

  /**
   * Absolute Web Url of target site (user requires permissions)
   */
  webAbsoluteUrl?: string;

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
  onGetErrorMessage?: (value: IRoleDefinitionInformation[]) => string | Promise<string>;
  /**
   * Defines a onPropertyChange function to raise when the selected value changed.
   * Normally this function must be always defined with the 'this.onPropertyChange'
   * method of the web part object.
   */
  onPropertyChange(propertyPath: string, oldValue: any, newValue: any): void; // eslint-disable-line @typescript-eslint/no-explicit-any
  /**
    * Callback that is called before the dropdown is populated
    */
  onRoleDefinitionsRetrieved?: (roleDefinitions: IRoleDefinitionInformation[]) => PromiseLike<IRoleDefinitionInformation[]> | IRoleDefinitionInformation[];
}

/**
 * Private properties of the PropertyFieldRoleDefinitionPicker custom field.
 * We separate public & private properties to include onRender & onDispose method waited
 * by the PropertyFieldCustom, without asking to the developer to add it when he's using
 * the PropertyFieldRoleDefinitionPicker.
 */
export interface IPropertyFieldRoleDefinitionPickerPropsInternal extends IPropertyFieldRoleDefinitionPickerProps, IPropertyPaneCustomFieldProps {
  context: BaseComponentContext;
  disabled?: boolean;
  key: string;
  label: string;
  properties: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  targetProperty: string;
  selectedRoleDefinition?: string[];
  roleDefinitionsToExclude?: string[];
  webAbsoluteUrl?: string;
  multiSelect?: boolean;
  roleDefinitions: IRoleDefinitionInformation[];
  onGetErrorMessage?: (value: IRoleDefinitionInformation[]) => string | Promise<string>;
  onPropertyChange(propertyPath: string, oldValue: any, newValue: any): void; // eslint-disable-line @typescript-eslint/no-explicit-any
  onRoleDefinitionsRetrieved?: (roleDefinitions: IRoleDefinitionInformation[]) => PromiseLike<IRoleDefinitionInformation[]> | IRoleDefinitionInformation[];
}
