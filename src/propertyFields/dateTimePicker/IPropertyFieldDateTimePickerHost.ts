import { ITimeComponentProps } from './IPropertyFieldDateTimePickerHost';
import { IPropertyFieldDateTimePickerPropsInternal, TimeConvention } from './IPropertyFieldDateTimePicker';
import { IDropdownOption } from "office-ui-fabric-react/lib/components/Dropdown";

/**
 * @interface
 * PropertyFieldDateTimePickerHost properties interface
 *
 */
export interface IPropertyFieldDateTimePickerHostProps extends IPropertyFieldDateTimePickerPropsInternal {
  onChange: (targetProperty?: string, newValue?: any) => void;
}

export interface IPropertyFieldDateTimePickerHostState {
  day?: Date;
  hours?: number;
  minutes?: number;
  seconds?: number;
  errorMessage?: string;
}

export interface ITimeComponentProps {
  value: number;
  onChange: (value?: IDropdownOption) => void;
}

export interface IHoursComponentProps extends ITimeComponentProps {
  timeConvention: TimeConvention;
}
