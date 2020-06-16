import { IFilePickerResult } from "./filePickerControls/FilePicker.types";
import { IPropertyFieldFilePickerPropsInternal } from "./IPropertyFieldFilePicker";
/**
 * PropertyFieldFilePickerHost properties interface
 */
export interface IPropertyFieldFilePickerHostProps extends IPropertyFieldFilePickerPropsInternal {
	onChange: (targetProperty?: string, newValue?: any) => void;
}