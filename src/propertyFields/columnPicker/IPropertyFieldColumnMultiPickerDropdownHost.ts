import { IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { ISPColumns } from '.';
import { IPropertyFieldColumnPickerPropsInternal } from './IPropertyFieldColumnPicker';

/**
 * PropertyFieldColumnPickerHost properties interface
 */
export interface IPropertyFieldColumnMultiPickerDropdownHostProps extends IPropertyFieldColumnPickerPropsInternal {
    onChange: (targetProperty?: string, newValue?: any) => void;
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
