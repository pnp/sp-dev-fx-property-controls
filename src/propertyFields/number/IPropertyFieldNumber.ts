import {
  IPropertyPaneCustomFieldProps,
} from '@microsoft/sp-webpart-base';

/**
* Public properties of PropertyFieldNumber custom field
*/
export interface IPropertyFieldNumberProps {
  key: string;
  /**
   * Label for the number field.
   */
  label?: string;
  /**
   * The number field input description.
   */
  description?: string;
  /**
   * Placeholder text to be displayed in the number field.
   */
  placeholder?: string;
  /**
   * Value to be displayed in the number field when the value of the targetProperty
   * in the manifest's property bag is empty or contains null value.
   */
  value?: number;
  /**
   * Maximum number that can be inserted.
   */
  maxValue?: number;
  /**
   * Minimum number that can be inserted.
   */
  minValue?: number;
  /**
   * If set, this will be displayed as an error message.
   *
   * When onGetErrorMessage returns empty string, if this property has a value set then this will
   * be displayed as the error message.
   *
   * So, make sure to set this only if you want to see an error message dispalyed for the text field.
   */
  errorMessage?: string;
  /**
   * The method is used to get the validation error message and determine whether the input value is valid or not.
   *
   *   When it returns string:
   *   - If valid, it returns empty string.
   *   - If invalid, it returns the error message string and an error message is displayed below the text field.
   *
   *   When it returns Promise<string>:
   *   - The resolved value is display as error message.
   *   - The rejected, the value is thrown away.
   *
   */
  onGetErrorMessage?: (value: number) => string | Promise<string>;
  /**
   * Number field will start to validate after users stop typing for `deferredValidationTime` milliseconds.
   * Default value is 200.
   */
  deferredValidationTime?: number;
  /**
   * Whether the property pane number field is enabled or not.
   */
  disabled?: boolean;
  /**
   * The aria label for the number field.
   */
  ariaLabel?: string;

  /**
   * Precision to round the value to.
   * If the precision is not defined the value is not rounded
   */
  precision?: number;
}

/**
* Internal properties of PropertyFieldNumber custom field
*/
export interface IPropertyFieldNumberPropsInternal extends IPropertyPaneCustomFieldProps, IPropertyFieldNumberProps {
}
