import { IDropdownOption } from '@fluentui/react/lib/Dropdown';
import { ISPColumns } from './ISPColumns';
import { IPropertyFieldColumnPickerPropsInternal } from './IPropertyFieldColumnPicker';

/**
 * PropertyFieldColumnPickerHost properties interface
 */
export interface IPropertyFieldColumnMultiPickerDropdownHostProps extends IPropertyFieldColumnPickerPropsInternal {
    onChange: (targetProperty?: string, newValue?: any) => void; // eslint-disable-line @typescript-eslint/no-explicit-any
}

/**
 * PropertyFieldSPColumnMultiplePickerHost state interface
 */
export interface IPropertyFieldColumnMultiPickerDropdownHostState {
    loadedColumns: ISPColumns;
    results: IDropdownOption[];
    selectedKeys: string[];
    loaded: boolean;
    errorMessage?: string;
}
