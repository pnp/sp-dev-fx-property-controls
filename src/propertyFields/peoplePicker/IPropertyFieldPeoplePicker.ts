import { IWebPartContext, IPropertyPaneCustomFieldProps } from '@microsoft/sp-webpart-base';

/**
 * PrincipalType controls the type of entities that are returned in the results.
 * Choices are All - 15, Distribution List - 2 , Security Groups - 4, SharePoint Groups - 8, User - 1.
 * These values can be combined (example: 13 is security + SP groups + users)
 */
export enum PrincipalType {
  /**
   * Users
   */
  Users = 1,
  /**
   * Security Group
   */
  Security = 4,
  /**
   * SharePoint Group
   */
  SharePoint = 8
}

/**
 * Defines a People object for the PropertyFieldPeoplePicker
 */
export interface IPropertyFieldGroupOrPerson {

  /**
   * Group ID
   */
  id?: string;
  /**
   * Group Description
   */
  description?: string;
  /**
   * User's full name
   */
  fullName: string;
  /**
   * User's login
   */
  login: string;
  /**
   * User's email (optional)
   */
  email?: string;
  /**
   * User's job title (optional)
   */
  jobTitle?: string;
  /**
   * User's initials (optional)
   */
  initials?: string;
  /**
   * User's image url (optional)
   */
  imageUrl?: string;
}

/**
 * Public properties of the PropertyFieldPeoplePicker custom field
 */
export interface IPropertyFieldPeoplePickerProps {

  /**
   * Property field label
   */
  label: string;
  /**
   * Specify if the control needs to be disabled
   */
  disabled?: boolean;
  /**
   * Web Part context
   */
  context: IWebPartContext;
  /**
   * Intial data to load in the people picker (optional)
   */
  initialData?: IPropertyFieldGroupOrPerson[];
  /**
   * Defines if the People Picker allows to select duplicated users (optional)
   */
  allowDuplicate?: boolean;
  /**
   * Define which type of data you want to retrieve: User, SharePoint groups, Security groups
   */
  principalType?: PrincipalType[];
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
  onGetErrorMessage?: (value: IPropertyFieldGroupOrPerson[]) => string | Promise<string>;
  /**
   * Custom Field will start to validate after users stop typing for `deferredValidationTime` milliseconds.
   * Default value is 200.
   */
  deferredValidationTime?: number;
}

/**
 * Private properties of the PropertyFieldPeoplePicker custom field.
 * We separate public & private properties to include onRender & onDispose method waited
 * by the PropertyFieldCustom, witout asking to the developer to add it when he's using
 * the PropertyFieldPeoplePicker.
 *
 */
export interface IPropertyFieldPeoplePickerPropsInternal extends IPropertyPaneCustomFieldProps, IPropertyPaneCustomFieldProps {

  label: string;
  disabled: boolean;
  targetProperty: string;
  context: IWebPartContext;
  initialData?: IPropertyFieldGroupOrPerson[];
  allowDuplicate?: boolean;
  principalType?: PrincipalType[];
  onPropertyChange(propertyPath: string, oldValue: any, newValue: any): void;
  properties: any;
  onGetErrorMessage?: (value: IPropertyFieldGroupOrPerson[]) => string | Promise<string>;
  deferredValidationTime?: number;
}
