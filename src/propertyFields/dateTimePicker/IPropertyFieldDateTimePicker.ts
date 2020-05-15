import { DayOfWeek } from 'office-ui-fabric-react/lib/utilities/dateValues/DateValues';
import { IPropertyPaneCustomFieldProps } from '@microsoft/sp-webpart-base';

/**
 * Date field value interface
 *
 */
export interface IDateTimeFieldValue {

  value: Date;
  displayValue: string;
}

/**
  * Time convention
  */
export enum TimeConvention {

  /**
   * The 12-hour clock is a time convention in which the 24 hours of the day are
   * divided into two periods: a.m. and p.m.
   */
  Hours12 = 1,
  /**
   * The 24-hour clock is the convention of time keeping in which the day runs from midnight to
   * midnight and is divided into 24 hours, indicated by the hours passed since midnight, from 0 to 23
   */
  Hours24
}

/**
  * Time convention
  */
export enum DateConvention {

  DateTime = 1,
  Date,
  Time
}

/**
 * Public properties of the PropertyFieldDateTimePicker custom field
 *
 */
export interface IPropertyFieldDateTimePickerProps {

  /**
   * Property field label displayed on top
   */
  label: string;
  /**
   * Specify if the control needs to be disabled
   */
  disabled?: boolean;
  /**
   * Initial date of the control
   */
  initialDate?: IDateTimeFieldValue;
  /**
   * Defines a formatDate function to display the date of the custom Field.
   * By defaut date.toDateString() is used.
   */
  formatDate?: (date: Date) => string;
  /**
   * Defines the date convention to use. The default is date and time.
   */
  dateConvention?: DateConvention;
  /**
   * Defines the time convention to use. The default value is the 24-hour clock convention.
   */
  timeConvention?: TimeConvention;
  /**
   * Specify the first day of the week for your locale.
   */
  firstDayOfWeek?: DayOfWeek;
  /**
   * Defines a onPropertyChange function to raise when the selected date changed.
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
  onGetErrorMessage?: (value: string) => string | Promise<string>;
  /**
   * Custom Field will start to validate after users stop typing for `deferredValidationTime` milliseconds.
   * Default value is 200.
   */
  deferredValidationTime?: number;

  /**
   * Specify if labels in front of date and time parts should be rendered. True by default
   */
  showLabels?: boolean;
}

/**
 * Private properties of the PropertyFieldDateTimePicker custom field.
 * We separate public & private properties to include onRender & onDispose method waited
 * by the PropertyFieldCustom, witout asking to the developer to add it when he's using
 * the PropertyFieldDateTimePicker.
 *
 */
export interface IPropertyFieldDateTimePickerPropsInternal extends IPropertyFieldDateTimePickerProps {

  targetProperty: string;
  onRender(elem: HTMLElement): void;
  onDispose(elem: HTMLElement): void;
}
