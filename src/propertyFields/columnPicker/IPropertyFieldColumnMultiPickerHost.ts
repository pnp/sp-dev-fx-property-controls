import { IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { ISPColumns } from '.';
import { IPropertyFieldColumnPickerPropsInternal } from './IPropertyFieldColumnPicker';

/**
 * PropertyFieldColumnPickerHost properties interface
 */
export interface IPropertyFieldColumnMultiPickerHostProps extends IPropertyFieldColumnPickerPropsInternal {
    onChange: (targetProperty?: string, newValue?: any) => void;
}

/**
 * PropertyFieldSPColumnMultiplePickerHost state interface
 */
export interface IPropertyFieldColumnMultiPickerHostState {
    loadedColumns: ISPColumns;
    results: IChoiceGroupOption[];
    selectedKeys: string[];
    loaded: boolean;
    errorMessage?: string;
}
