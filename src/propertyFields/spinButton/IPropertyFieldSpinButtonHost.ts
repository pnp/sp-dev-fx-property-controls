/**
 * PropertyFieldColorPickerHost properties interface
 */
export interface IPropertyFieldSpinButtonHostProps {
	label: string;
	disabled: boolean;
	value: number;
	step: number;
	min: number | undefined;
	max: number | undefined;
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