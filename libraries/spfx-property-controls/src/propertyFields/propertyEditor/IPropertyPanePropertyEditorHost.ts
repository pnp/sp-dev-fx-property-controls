/**
 * PropertyFieldColorPickerHost properties interface
 */
export interface IPropertyPanePropertyEditorHostProps {
	webpart: any; // eslint-disable-line @typescript-eslint/no-explicit-any

        /**
         * Callback invoked after importing web part properties.
         */
        onPropertiesImported?: (
                importedProperties: Record<string, any> // eslint-disable-line @typescript-eslint/no-explicit-any
        ) => void | Promise<void>;
}

/**
 * PropertyFieldColorPickerHost state interface
 */
export interface IPropertyPanePropertyEditorHostState {
	errorMessage?: string;
	openPanel? : boolean;
	propertiesJson?: string;
}
