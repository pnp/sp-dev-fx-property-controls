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
	showPreview: boolean;
	onColorChanged: (color: string) => void;
}

/**
 * PropertyFieldColorPickerHost state interface
 */
export interface IPropertyFieldColorPickerHostState {
	errorMessage?: string;
	inlinePickerShowing: boolean;
}