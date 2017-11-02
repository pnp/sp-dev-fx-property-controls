import { IPropertyPaneCustomFieldProps } from '@microsoft/sp-webpart-base';

/**
 * Public properties of the PropertyFieldSpinButton custom field
 */
export interface IPropertyFieldSpinButtonProps {

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
	 * The number to use for the initial value (The minimum value is used by default)
	 */
	value?: number;

	/**
	 * The difference between the two adjacent values of the SpinButton (default is 1)
	 */
	step?: number;

	/**
	 * The minimum value (no minimum when unspecified)
	 */
	min?: number;

	/**
	 * The maximum value (no maximum when unspecified)
	 */
	max?: number;

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
	 * The name of the UI Fabric Font Icon to use for the increment button (defaults to ChevronUpSmall)
	 */
	incrementIconName?: string;

	/**
	 * The name of the UI Fabric Font Icon to use for the decrement button (defaults to ChevronDownSmall)
	 */
	decrementIconName?: string;
}

export interface IPropertyFieldSpinButtonPropsInternal extends IPropertyFieldSpinButtonProps, IPropertyPaneCustomFieldProps {
}