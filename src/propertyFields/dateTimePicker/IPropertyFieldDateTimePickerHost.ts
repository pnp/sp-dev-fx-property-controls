import { IPropertyFieldDateTimePickerPropsInternal, TimeConvention } from './IPropertyFieldDateTimePicker';
import { IDropdownOption } from 'office-ui-fabric-react/lib/components/Dropdown';

/**
 * PropertyFieldDateTimePickerHost properties interface
 */
export interface IPropertyFieldDateTimePickerHostProps extends IPropertyFieldDateTimePickerPropsInternal {

  onChange: (targetProperty?: string, newValue?: any) => void;
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
