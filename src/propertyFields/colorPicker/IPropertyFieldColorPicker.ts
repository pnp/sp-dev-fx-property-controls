import { IPropertyPaneCustomFieldProps } from '@microsoft/sp-webpart-base';

/**
 * Public properties of the PropertyFieldColorPicker custom field
 */
export interface IPropertyFieldColorPickerProps {

	/**
	* Property field label displayed on top
	*/
	label: string;

	/**
	 * Defines an onPropertyChange function to raise when the selected value changes.
	 * Normally this function must be defined with the 'this.onPropertyChange'
	 * method of the web part object.
	 */
	onPropertyChange(propertyPath: string, oldValue: any, newValue: any): void;

	/**
	 * The CSS-compatible string to describe the initial color
	 */
	selectedColor?: string;

	/**
	 * When true, the alpha slider control is hidden
	 */
	alphaSliderHidden?: boolean;

	 /**
	 * Whether the property pane field is enabled or not.
	 */
	disabled?: boolean;

	/**
	 * An UNIQUE key indicates the identity of this control
	 */
	key: string;
}

export interface IPropertyFieldColorPickerPropsInternal extends IPropertyFieldColorPickerProps, IPropertyPaneCustomFieldProps {
}