import { IWebPartContext } from '@microsoft/sp-webpart-base';

/**
 * @interface
 * Selected terms
 */
export interface ICheckedTerm {
  name: string;
  id: string;
  path: string;
  termSet: string;
}

export interface ICheckedTerms extends Array<ICheckedTerm> { }

/**
 * @interface
 * Generic Term Object (abstract interface)
 */
export interface ISPTermObject {
  Name: string;
  Guid: string;
  Identity: string;
  leaf: boolean;
  children?: ISPTermObject[];
  collapsed?: boolean;
  type: string;
}

/**
 * @interface
 * Defines a SharePoint Term Store
 */
export interface ISPTermStore extends ISPTermObject {
  IsOnline: boolean;
  WorkingLanguage: string;
  DefaultLanguage: string;
  Languages: string[];
}

/**
 * @interface
 * Defines an array of Term Stores
 */
export interface ISPTermStores extends Array<ISPTermStore> {
}

/**
 * @interface
 * Defines a Term Store Group of term sets
 */
export interface ISPTermGroup extends ISPTermObject {
  IsSiteCollectionGroup: boolean;
  IsSystemGroup: boolean;
  CreatedDate: string;
  LastModifiedDate: string;
}

/**
 * @interface
 * Array of Term Groups
 */
export interface ISPTermGroups extends Array<ISPTermGroup> {
}


/**
 * @interface
 * Public properties of the PropertyFieldTermPicker custom field
 *
 */
export interface IPropertyFieldTermPickerProps {
  /**
   * @var
   * Property field label displayed on top
   */
  label: string;
  /**
   * @var
   * TermSet Picker Panel title
   */
  panelTitle: string;
  /**
   * @var
   * Defines if the user can select only one or many term sets. Default value is false.
   *
   */
  allowMultipleSelections?: boolean;
  /**
   * @var
   * Defines the selected by default term sets.
   */
  initialValues?: ICheckedTerms;
  /**
   * @var
   * Indicator to define if the system Groups are exclude. Default is false.
   */
  excludeSystemGroup?: boolean;
  /**
   * @var
   * Indicates if the offline term stores must be exclude. Default is false.
   */
  excludeOfflineTermStores?: boolean;
  /**
   * @var
   * WebPart's context
   */
  context: IWebPartContext;
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
  onGetErrorMessage?: (value: ICheckedTerms) => string | Promise<string>;
  /**
   * Custom Field will start to validate after users stop typing for `deferredValidationTime` milliseconds.
   * Default value is 200.
   */
  deferredValidationTime?: number;
}

/**
 * @interface
 * Private properties of the PropertyFieldTermPicker custom field.
 * We separate public & private properties to include onRender & onDispose method waited
 * by the PropertyFieldCustom, witout asking to the developer to add it when he's using
 * the PropertyFieldTermPicker.
 *
 */
export interface IPropertyFieldTermPickerPropsInternal extends IPropertyFieldTermPickerProps {
  label: string;
  targetProperty: string;
  panelTitle: string;
  allowMultipleSelections?: boolean;
  initialValues?: ICheckedTerms;
  excludeSystemGroup?: boolean;
  excludeOfflineTermStores?: boolean;
  context: IWebPartContext;
  onRender(elem: HTMLElement): void;
  onDispose(elem: HTMLElement): void;
  onPropertyChange(propertyPath: string, oldValue: any, newValue: any): void;
  render(): void;
  disableReactivePropertyChanges?: boolean;
  properties: any;
  key: string;
  disabled?: boolean;
  onGetErrorMessage?: (value: ICheckedTerms) => string | Promise<string>;
  deferredValidationTime?: number;
}
