import { IPropertyPaneCustomFieldProps } from '@microsoft/sp-webpart-base';

/**
 * Public properties of the PropertyFieldSpinButton custom field
 */
export interface IPropertyPanePropertyEditorProps {

	/**
	 * This current webpart. Usually 'this'.
	 */
	webpart: any;

	/**
	 * An UNIQUE key indicates the identity of this control
	 */
	key: string;
}


export interface IPropertyPanePropertyEditorPropsInternal extends IPropertyPanePropertyEditorProps, IPropertyPaneCustomFieldProps {
}