/**
 * PropertyFieldColorPickerHost properties interface
 */
export interface IPropertyFieldSpinButtonHostProps {
	label: string;
	disabled: boolean;
	value: string;
	incrementIconName: string;
	decrementIconName: string;
	onValidate: (value: string) => string;
	onIncrement: (value: string) => string;
	onDecrement: (value: string) => string;
	onValueChanged: (value: number) => void;
}

/**
 * PropertyFieldColorPickerHost state interface
 */
export interface IPropertyFieldSpinButtonHostState {
	errorMessage?: string;
}