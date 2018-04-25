import { PropertyFieldSwatchColorPickerStyle, IPropertyFieldSwatchColorOption } from './IPropertyFieldSwatchColorPicker';

/**
 * PropertyFieldSwatchColorPickerHost properties interface
 */
export interface IPropertyFieldSwatchColorPickerHostProps {
	label: string;
	disabled: boolean;
	selectedColor: string;
	colors: Array<IPropertyFieldSwatchColorOption>;
	showAsCircles: boolean;
	columnCount: number;
	style: PropertyFieldSwatchColorPickerStyle;
	iconName: string;
	onColorChanged: (id: string, color: string) => void;
}

/**
 * PropertyFieldSwatchColorPickerHost state interface
 */
export interface IPropertyFieldSwatchColorPickerHostState {
	errorMessage?: string;
	inlinePickerShowing: boolean;
}