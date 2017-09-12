import { IWebPartContext, IPropertyPaneCustomFieldProps } from '@microsoft/sp-webpart-base';

// PrincipalType controls the type of entities that are returned in the results.
// Choices are All - 15, Distribution List - 2 , Security Groups - 4, SharePoint Groups - 8, User - 1.
// These values can be combined (example: 13 is security + SP groups + users)
export enum IPrincipalType {
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
 * @interface
 * Defines a People object for the PropertyFieldPeoplePicker
 *
 */
export interface IPropertyFieldGroupOrPerson {
  /**
   * @var
   * Group ID
   */
  id?: string;
  /**
   * @var
   * Group Description
   */
  description?: string;
  /**
   * @var
   * User's full name
   */
  fullName: string;
  /**
   * @var
   * User's login
   */
  login: string;
  /**
   * @var
   * User's email (optional)
   */
  email?: string;
  /**
   * @var
   * User's job title (optional)
   */
  jobTitle?: string;
  /**
   * @var
   * User's initials (optional)
   */
  initials?: string;
  /**
   * @var
   * User's image url (optional)
   */
  imageUrl?: string;
}

/**
 * @interface
 * Public properties of the PropertyFieldPeoplePicker custom field
 *
 */
export interface IPropertyFieldPeoplePickerProps {
  /**
   * @var
   * Property field label
   */
  label: string;
  /**
   * @var
   * Web Part context
   */
  context: IWebPartContext;
  /**
   * @var
   * Intial data to load in the people picker (optional)
   */
  initialData?: IPropertyFieldGroupOrPerson[];
  /**
   * @var
   * Defines if the People Picker allows to select duplicated users (optional)
   */
  allowDuplicate?: boolean;
  /**
   * @var
   * Define which type of data you want to retrieve: User, SharePoint groups, Security groups
   */
  principalType?: IPrincipalType[];
  /**
   * @function
   * Defines a onPropertyChange function to raise when the selected value changed.
   * Normally this function must be always defined with the 'this.onPropertyChange'
   * method of the web part object.
   */
  onPropertyChange(propertyPath: string, oldValue: any, newValue: any): void;
  /**
   * @function
   * This API is called to render the web part.
   * Normally this function must be always defined with the 'this.render.bind(this)'
   * method of the web part object.
   */
  render(): void;
  /**
   * This property is used to indicate the web part's PropertyPane interaction mode: Reactive or NonReactive.
   * The default behaviour is Reactive.
   */
  disableReactivePropertyChanges?: boolean;
  /**
   * @var
   * Parent Web Part properties
   */
  properties: any;
  /**
   * @var
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
 * @interface
 * Private properties of the PropertyFieldPeoplePicker custom field.
 * We separate public & private properties to include onRender & onDispose method waited
 * by the PropertyFieldCustom, witout asking to the developer to add it when he's using
 * the PropertyFieldPeoplePicker.
 *
 */
export interface IPropertyFieldPeoplePickerPropsInternal extends IPropertyPaneCustomFieldProps, IPropertyPaneCustomFieldProps {
  label: string;
  targetProperty: string;
  context: IWebPartContext;
  initialData?: IPropertyFieldGroupOrPerson[];
  allowDuplicate?: boolean;
  principalType?: IPrincipalType[];
  onPropertyChange(propertyPath: string, oldValue: any, newValue: any): void;
  render(): void;
  disableReactivePropertyChanges?: boolean;
  properties: any;
  onGetErrorMessage?: (value: IPropertyFieldGroupOrPerson[]) => string | Promise<string>;
  deferredValidationTime?: number;
}
