import { IPropertyFieldContentTypePickerPropsInternal } from './IPropertyFieldContentTypePicker';
import { IDropdownOption } from '@fluentui/react/lib/Dropdown';

/**
 * PropertyFieldContentTypePickerHost properties interface
 */
export interface IPropertyFieldContentTypePickerHostProps extends IPropertyFieldContentTypePickerPropsInternal {
  onChange: (targetProperty?: string, newValue?: any) => void; // eslint-disable-line @typescript-eslint/no-explicit-any
}

/**
 * PropertyFieldContentTypePickerHost state interface
 */
export interface IPropertyFieldContentTypePickerHostState {

  results: IDropdownOption[];
  selectedKey?: string;
  errorMessage?: string;
}
