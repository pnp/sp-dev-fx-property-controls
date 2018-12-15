import { IPropertyPaneCustomFieldProps } from '@microsoft/sp-webpart-base';

/**
 * Public properties of the PropertyFieldOrder custom field
 */
export interface IPropertyFieldEnterpriseTermPickerProps {
    /**
    * An UNIQUE key indicates the identity of this control
    */
    key: string;
    /**
	* Property field label displayed on top
	*/
    label: string;
    /**
    * Parent Web Part properties
    */
    properties: any;
	/**
	 * Defines an onPropertyChange function to raise when the items order changes.
	 * Normally this function must be defined with the 'this.onPropertyChange'
	 * method of the web part object.
	 */
    onPropertyChange(propertyPath: string, oldValue: any, newValue: any): void;

    /**
     * current value
     */
    value?: string;
}

export interface IPropertyFieldEnterpriseTermPickerPropsInternal extends IPropertyFieldEnterpriseTermPickerProps, IPropertyPaneCustomFieldProps {

}