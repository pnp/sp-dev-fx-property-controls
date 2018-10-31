/**
 * PropertyFieldColorPickerHost properties interface
 */
export interface IPropertyPanePropertyEditorHostProps {
	webpart: any;
}

/**
 * PropertyFieldColorPickerHost state interface
 */
export interface IPropertyPanePropertyEditorHostState {
	errorMessage?: string;
	openPanel? : boolean;
	propertiesJson?: string;
}
