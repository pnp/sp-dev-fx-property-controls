/**
 * PropertyFieldColorPickerHost properties interface
 */
export interface IPropertyPanePropertyEditorHostProps {
	webpart: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

/**
 * PropertyFieldColorPickerHost state interface
 */
export interface IPropertyPanePropertyEditorHostState {
	errorMessage?: string;
	openPanel? : boolean;
	propertiesJson?: string;
}
