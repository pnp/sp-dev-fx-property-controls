import { IPropertyPaneCustomFieldProps } from '@microsoft/sp-property-pane';
import { BaseComponentContext } from '@microsoft/sp-component-base';
import { ISPContentType } from './ISPContentType';


/**
 * Enum for specifying how the ContentTypes should be sorted
 */
export enum PropertyFieldContentTypeOrderBy {
  Id = 1,
  Name
}

/**
 * Public properties of the PropertyFieldContentTypePicker custom field
 */
export interface IPropertyFieldContentTypePickerProps {
  /**
   * Context of the current web part
   */
  context: BaseComponentContext;

  /**
   * Custom Field will start to validate after users stop typing for `deferredValidationTime` milliseconds.
   * Default value is 200.
   */
  deferredValidationTime?: number;

  /**
   * Whether the property pane field is enabled or not.
   */
  disabled?: boolean;

  /**
   * Filter ContentTypes from Odata query
   */
  filter?: string;

  /**
   * An UNIQUE key indicates the identity of this control
   */
  key?: string;

  /**
   * Property field label displayed on top
   */
  label: string;
  /**
   * The List Id of the list where you want to get the ContentTypes
   */
  listId?: string;

  /**
   * Specify the property on which you want to order the retrieve set of ContentTypes.
   */
  orderBy?: PropertyFieldContentTypeOrderBy;

  /**
   * Parent Web Part properties
   */
  properties: any; // eslint-disable-line @typescript-eslint/no-explicit-any

  /**
   * Initial selected ContentType of the control
   */
  selectedContentType?: string | string[];

  /**
   * Defines ContentType titles which should be excluded from the ContentType picker control
   */
  contentTypesToExclude?: string[];

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
  onGetErrorMessage?: (value: string) => string | Promise<string>;
  /**
   * Defines a onPropertyChange function to raise when the selected value changed.
   * Normally this function must be always defined with the 'this.onPropertyChange'
   * method of the web part object.
   */
  onPropertyChange(propertyPath: string, oldValue: any, newValue: any): void; // eslint-disable-line @typescript-eslint/no-explicit-any
  /**
    * Callback that is called before the dropdown is populated
    */
  onContentTypesRetrieved?: (contentTypes: ISPContentType[]) => PromiseLike<ISPContentType[]> | ISPContentType[];
}

/**
 * Private properties of the PropertyFieldContentTypePicker custom field.
 * We separate public & private properties to include onRender & onDispose method waited
 * by the PropertyFieldCustom, without asking to the developer to add it when he's using
 * the PropertyFieldContentTypePicker.
 */
export interface IPropertyFieldContentTypePickerPropsInternal extends IPropertyFieldContentTypePickerProps, IPropertyPaneCustomFieldProps {
  context: BaseComponentContext;
  deferredValidationTime?: number;
  disabled?: boolean;
  filter?: string;
  orderBy?: PropertyFieldContentTypeOrderBy;
  key: string;
  label: string;
  listId?: string;
  properties: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  selectedContentType?: string;
  targetProperty: string;
  contentTypesToExclude?: string[];
  webAbsoluteUrl?: string;
  onGetErrorMessage?: (value: string | string[]) => string | Promise<string>;
  onPropertyChange(propertyPath: string, oldValue: any, newValue: any): void; // eslint-disable-line @typescript-eslint/no-explicit-any
  onContentTypesRetrieved?: (contentTypes: ISPContentType[]) => PromiseLike<ISPContentType[]> | ISPContentType[];
}
