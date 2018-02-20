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
   * Value to be displayed in the number field when the value of the targetProperty
   * in the manifest's property bag is empty or contains null value.
   */
  value?: number;
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
  onGetErrorMessage?: (value: string) => string | Promise<string>;
  /**
   * Text field will start to validate after users stop typing for `deferredValidationTime` milliseconds.
   * Default value is 200.
   */
  deferredValidationTime?: number;
  /**
   * Aria Label for number field, if any.
   */
  ariaLabel?: string;
  /**
   * placeholder text to be displayed in the number field.
   */
  placeholder?: string;
  /**
   * Whether the property pane number field is enabled or not.
   */
  disabled?: boolean;
  /**
   * Specifies the visible height of a text area(multiline text number field), in lines.
   *
   * This prop is used only when the multiline prop is set to true.
   */
  rows?: number;
  /**
   * Maximum number of characters that the PropertyPanenumber field can have.
   */
  maxValue?: number;
  /**
   * Minimum number of characters that the PropertyPanenumber field can have.
   */
  minValue?: number;
  /**
   * Callback for the onChanged event.
   */
  onChanged?: (newValue: any) => void;
}

/**
* Internal properties of PropertyFieldNumber custom field
*/
export interface IPropertyFieldNumberPropsInternal extends IPropertyPaneCustomFieldProps, IPropertyFieldNumberProps {
}
