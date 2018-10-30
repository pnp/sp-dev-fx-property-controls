/**
 * PropertyFieldColorPickerHost properties interface
 */
export interface IPropertyEditorHostProps {
	webpart: any;
}

/**
 * PropertyFieldColorPickerHost state interface
 */
export interface IPropertyEditorHostState {
	errorMessage?: string;
	openPanel? : boolean;
	propertiesJson?: string;
}
