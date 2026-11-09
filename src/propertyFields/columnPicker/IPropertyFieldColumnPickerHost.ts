import { IPropertyFieldColumnPickerPropsInternal } from './IPropertyFieldColumnPicker';
import { IDropdownOption } from '@fluentui/react/lib/Dropdown';

/**
 * PropertyFieldColumnPickerHost properties interface
 */
export interface IPropertyFieldColumnPickerHostProps extends IPropertyFieldColumnPickerPropsInternal {
  onChange: (targetProperty?: string, newValue?: any) => void; // eslint-disable-line @typescript-eslint/no-explicit-any
}

/**
 * PropertyFieldColumnPickerHost state interface
 */
export interface IPropertyFieldColumnPickerHostState {
  results: IDropdownOption[];
  selectedKey?: string;
  errorMessage?: string;
}
