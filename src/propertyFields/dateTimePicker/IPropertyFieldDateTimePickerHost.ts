import { IPropertyFieldDateTimePickerPropsInternal, TimeConvention } from './IPropertyFieldDateTimePicker';
import { IDropdownOption } from '@fluentui/react';

/**
 * PropertyFieldDateTimePickerHost properties interface
 */
export interface IPropertyFieldDateTimePickerHostProps extends IPropertyFieldDateTimePickerPropsInternal {

  onChange: (targetProperty?: string, newValue?: any) => void; // eslint-disable-line @typescript-eslint/no-explicit-any
}

/**
 * PropertyFieldDateTimePickerHost state interface
 */
export interface IPropertyFieldDateTimePickerHostState {

  day?: Date;
  hours?: number;
  minutes?: number;
  seconds?: number;
  errorMessage?: string;
}

/**
 * Time component properties interface
 */
export interface ITimeComponentProps {

  disabled?: boolean;
  value: number;
  onChange: (value?: IDropdownOption) => void;
}

/**
 * Hours component property interface
 */
export interface IHoursComponentProps extends ITimeComponentProps {

  timeConvention: TimeConvention;
}
