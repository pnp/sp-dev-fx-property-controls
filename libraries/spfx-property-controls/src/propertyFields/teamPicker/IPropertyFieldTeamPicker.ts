import { BaseComponentContext } from '@microsoft/sp-component-base';

export interface IPropertyFieldTeam {
  /**
   * ID of the site
   */
  id?: string;
  /**
   * Title
   */
  title?: string;
  /**
  * Base URL
  */
  url?: string;
}

export interface IPropertyFieldTeamPickerProps {
  /**
   * Property field label
   */
  label: string;
  /**
   * An UNIQUE key indicates the identity of this control
   */
  key?: string;
  /**
   * Specify if the control needs to be disabled
   */
  disabled?: boolean;
  /**
   * Web Part context
   */
  context: BaseComponentContext;
  /**
   * Intial data to load in the 'Selected teams' area (optional)
   */
  initialTeams?: IPropertyFieldTeam[];
  /**
   * Define if you want to allow multi site selection. True by default.
   */
  multiSelect?: boolean;
  /**
   * Defines a onPropertyChange function to raise when the selected value changed.
   * Normally this function must be always defined with the 'this.onPropertyChange'
   * method of the web part object.
   */
  onPropertyChange(propertyPath: string, oldValue: any, newValue: any): void; // eslint-disable-line @typescript-eslint/no-explicit-any
  /**
   * Parent Web Part properties
   */
  properties: any; // eslint-disable-line @typescript-eslint/no-explicit-any
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
  onGetErrorMessage?: (value: IPropertyFieldTeam[]) => string | Promise<string>;
  /**
   * Custom Field will start to validate after users stop typing for `deferredValidationTime` milliseconds.
   * Default value is 200.
   */
  deferredValidationTime?: number;
}
/**
 * Private properties of the PropertyFielSitePicker custom field.
 * We separate public & private properties to include onRender & onDispose method waited
 * by the PropertyFieldCustom, witout asking to the developer to add it when he's using
 * the PropertyFieldTeamPicker.
 *
 */
export interface IPropertyFieldTeamPickerPropsInternal extends IPropertyFieldTeamPickerProps {
  targetProperty: string;
  onRender(elem: HTMLElement): void;
  onDispose(elem: HTMLElement): void;
}
