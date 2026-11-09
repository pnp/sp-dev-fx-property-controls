import { IPropertyFieldFilePickerPropsInternal } from "./IPropertyFieldFilePicker";
/**
 * PropertyFieldFilePickerHost properties interface
 */
export interface IPropertyFieldFilePickerHostProps extends IPropertyFieldFilePickerPropsInternal {
	onChange: (targetProperty?: string, newValue?: any) => void; // eslint-disable-line @typescript-eslint/no-explicit-any
}