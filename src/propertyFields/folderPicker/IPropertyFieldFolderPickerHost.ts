import { IPropertyFieldFolderPickerPropsInternal } from "./IPropertyFieldFolderPicker";
/**
 * PropertyFieldFolderPickerHost properties interface
 */
export interface IPropertyFieldFolderPickerHostProps extends IPropertyFieldFolderPickerPropsInternal {
	onChange: (targetProperty?: string, newValue?: any) => void;
}