/**
 * PropertyFieldColorPickerHost properties interface
 */
export interface IPropertyFieldColorPickerHostProps {
	label: string;
	alphaSliderHidden: boolean;
	disabled: boolean;
	selectedColor: string;
	onColorChanged: (color: string) => void;
}

/**
 * PropertyFieldColorPickerHost state interface
 */
export interface IPropertyFieldColorPickerHostState {
	errorMessage?: string;
}