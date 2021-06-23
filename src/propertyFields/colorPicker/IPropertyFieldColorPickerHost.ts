import { PropertyFieldColorPickerStyle } from './IPropertyFieldColorPicker';

/**
 * PropertyFieldColorPickerHost properties interface
 */
export interface IPropertyFieldColorPickerHostProps {
	label: string;
	alphaSliderHidden: boolean;
	disabled: boolean;
	debounce: number;
	isHidden: boolean;
	selectedColor: string;
	style: PropertyFieldColorPickerStyle;
	iconName: string;
	onColorChanged: (color: string) => void;
}

/**
 * PropertyFieldColorPickerHost state interface
 */
export interface IPropertyFieldColorPickerHostState {
	errorMessage?: string;
	inlinePickerShowing: boolean;
}