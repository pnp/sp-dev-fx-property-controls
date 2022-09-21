import { IPropertyPaneCustomFieldProps } from '@microsoft/sp-property-pane';

/**
 * Public properties of the PropertyFieldSpinButton custom field
 */
export interface IPropertyPanePropertyEditorProps {

	/**
	 * This current webpart. Usually 'this'.
	 */
	webpart: any; // eslint-disable-line @typescript-eslint/no-explicit-any

	/**
	 * An UNIQUE key indicates the identity of this control
	 */
	key: string;
}


export interface IPropertyPanePropertyEditorPropsInternal extends IPropertyPanePropertyEditorProps, IPropertyPaneCustomFieldProps {
}