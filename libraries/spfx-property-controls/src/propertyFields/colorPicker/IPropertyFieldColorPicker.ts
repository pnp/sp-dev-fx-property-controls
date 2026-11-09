import { IPropertyPaneCustomFieldProps } from '@microsoft/sp-property-pane';
import { IColor } from '@fluentui/react';

/**
 * Enum for specifying how the control should be shown
 */
export enum PropertyFieldColorPickerStyle {
	Full = 1,
	Inline
}

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
	onPropertyChange(propertyPath: string, oldValue: any, newValue: any): void; // eslint-disable-line @typescript-eslint/no-explicit-any

	/**
	 * The CSS-compatible string to describe the initial color
	 */
	selectedColor?: string | IColor;

	/**
	 * When true, the alpha slider control is hidden
	 */
	alphaSliderHidden?: boolean;

	/**
	 * Whether to show color preview box. 
	 */
	showPreview?: boolean;

	/**
	* Whether the property pane field is enabled or not.
	*/
	disabled?: boolean;

	/**
	 * Time after which the control is updated
	 */
	debounce?: number;

	/**
	* Whether the property pane field is hidden or not.
	*/
	isHidden?: boolean;

	/**
	 * An UNIQUE key indicates the identity of this control
	 */
	key: string;

	/**
	 * Parent Web Part properties
	 */
	properties: any; // eslint-disable-line @typescript-eslint/no-explicit-any

	/**
	 * Determines how the control is displayed (defaults to inline)
	 */
	style?: PropertyFieldColorPickerStyle;

	/**
	 * The name of the UI Fabric Font Icon to use for Inline display (defaults to Color)
	 */
	iconName?: string;

	/**
	 * When true, the property is returned as an IColor object. When false (default), the property is returned as a CSS-compatible string
	 */
	valueAsObject?: boolean;
}

export interface IPropertyFieldColorPickerPropsInternal extends IPropertyFieldColorPickerProps, IPropertyPaneCustomFieldProps {
}
