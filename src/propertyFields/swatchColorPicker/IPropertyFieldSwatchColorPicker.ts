import { IPropertyPaneCustomFieldProps } from '@microsoft/sp-property-pane';
import { IColor } from 'office-ui-fabric-react/lib/utilities/color/colors';

/**
 * Enum for specifying how the control should be shown
 */
export enum PropertyFieldSwatchColorPickerStyle {
	Full = 1,
	Inline
}

export interface IPropertyFieldSwatchColorOption {
	color: string;
	label?: string;
}

/**
 * Public properties of the PropertyFieldSwatchColorPicker custom field
 */
export interface IPropertyFieldSwatchColorPickerProps {

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
	selectedColor?: string | IColor;

	/**
	 * The color choices (color can be any CSS-Compatible string, labels are optional and will be shown as a tooltip on the swatch)
	 */
	colors: Array<IPropertyFieldSwatchColorOption>;

	/**
	 * When true, color cells are shown as circles. When false (default), color cells are shown as squares
	 */
	showAsCircles?: boolean;

	/**
	 * The number of cells to show per row (defaults to 6, minimum of 1 and maximum of 8)
	 */
	columnCount?: number;

	 /**
	 * Whether the property pane field is enabled or not.
	 */
	disabled?: boolean;

	/**
	 * An UNIQUE key indicates the identity of this control
	 */
	key: string;

	/**
	 * Parent Web Part properties
	 */
	properties: any;

	/**
	 * Determines how the control is displayed (defaults to inline)
	 */
	style?: PropertyFieldSwatchColorPickerStyle;

	/**
	 * The name of the UI Fabric Font Icon to use for Inline display (defaults to Color)
	 */
	iconName?: string;

	/**
	 * When true, the property is returned as an IColor object. When false (default), the property is returned as a CSS-compatible string
	 */
	valueAsObject?: boolean;
}

export interface IPropertyFieldSwatchColorPickerPropsInternal extends IPropertyFieldSwatchColorPickerProps, IPropertyPaneCustomFieldProps {
}