import { IPropertyPaneCustomFieldProps, BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

/**
 * Public properties of the PropertyFieldSpinButton custom field
 */
export interface IPropertyEditorProps {

	/**
	 * This current webpart. Usually 'this'.
	 */
	webpart: any;

	/**
	 * An UNIQUE key indicates the identity of this control
	 */
	key: string;
}


export interface IPropertyEditorPropsInternal extends IPropertyEditorProps, IPropertyPaneCustomFieldProps {
}