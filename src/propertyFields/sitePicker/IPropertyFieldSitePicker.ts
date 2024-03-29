import { BaseComponentContext } from '@microsoft/sp-component-base';

export interface IPropertyFieldSite {
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

  /**
   * ID of the web
   */
  webId?: string;
  /**
   * ID of the hub site
   */
   hubSiteId?: string;
}

export interface IPropertyFieldSitePickerProps {
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
   * Intial data to load in the 'Selected sites' area (optional)
   */
  initialSites: IPropertyFieldSite[];
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
  onGetErrorMessage?: (value: IPropertyFieldSite[]) => string | Promise<string>;
  /**
   * Custom Field will start to validate after users stop typing for `deferredValidationTime` milliseconds.
   * Default value is 200.
   */
  deferredValidationTime?: number;

  /**
   * Specifies if the duplicates should be trimmed. false by default.
   * Applicable if mode is set to site or web.
   */
   trimDuplicates?: boolean;

   /**
    * If provided will be added to the search query as AND part.
    * Applicable if mode is set to site or web.
    */
   additionalQuery?: string;
}
/**
 * Private properties of the PropertyFielSitePicker custom field.
 * We separate public & private properties to include onRender & onDispose method waited
 * by the PropertyFieldCustom, witout asking to the developer to add it when he's using
 * the PropertyFieldSitePicker.
 *
 */
export interface IPropertyFieldSitePickerPropsInternal extends IPropertyFieldSitePickerProps {
  targetProperty: string;
  onRender(elem: HTMLElement): void;
  onDispose(elem: HTMLElement): void;
}
