import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
  IPropertyPaneField,
  PropertyPaneFieldType
} from '@microsoft/sp-webpart-base';
import { 
	PropertyFieldSwatchColorPickerStyle,
	IPropertyFieldSwatchColorPickerProps,
	IPropertyFieldSwatchColorPickerPropsInternal
} from './IPropertyFieldSwatchColorPicker';
import { IPropertyFieldSwatchColorPickerHostProps } from './IPropertyFieldSwatchColorPickerHost';
import PropertyFieldSwatchColorPickerHost from './PropertyFieldSwatchColorPickerHost';

class PropertyFieldSwatchColorPickerBuilder implements IPropertyPaneField<IPropertyFieldSwatchColorPickerProps> {
	
	//Properties defined by IPropertyPaneField
	public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
	public targetProperty: string;
	public properties: IPropertyFieldSwatchColorPickerPropsInternal;
	private elem: HTMLElement;
	private color: string;
	private changeCB?: (targetProperty?: string, newValue?: any) => void;

	public constructor(_targetProperty: string, _properties: IPropertyFieldSwatchColorPickerProps) {
		this.targetProperty = _targetProperty;
		this.properties = {
			key: _properties.key,
			label: _properties.label,
			onPropertyChange: _properties.onPropertyChange,
			selectedColor: _properties.selectedColor,
			colors: _properties.colors,
			showAsCircles: _properties.showAsCircles,
			columnCount: _properties.columnCount,
			disabled: _properties.disabled,
			properties: _properties.properties,
			style: _properties.style,
			iconName: _properties.iconName,
			onRender: this.onRender.bind(this)
		};
		this.color = _properties.selectedColor;
	}

	public render(): void {
		if (!this.elem) {
			return;
		}

		this.onRender(this.elem);
	}

	private onRender(elem: HTMLElement, ctx?: any, changeCallback?: (targetProperty?: string, newValue?: any) => void): void {
		if (!this.elem) {
			this.elem = elem;
		}
		this.changeCB = changeCallback;

		const element: React.ReactElement<IPropertyFieldSwatchColorPickerHostProps> = React.createElement(PropertyFieldSwatchColorPickerHost, {
			label: this.properties.label,
			disabled: this.properties.disabled,
			colors: (typeof this.properties.colors === 'undefined'  || this.properties.colors.length === 0) ? [{ color: '#FFFFFF' }] : this.properties.colors,
			showAsCircles: this.properties.showAsCircles,
			columnCount: typeof this.properties.columnCount === 'undefined' ? 6 : Math.min(Math.max(1,this.properties.columnCount),8),
			selectedColor: this.properties.selectedColor,
			style: this.properties.style || PropertyFieldSwatchColorPickerStyle.Inline,
			iconName: this.properties.iconName || 'Color',
			onColorChanged: this.onColorChanged.bind(this)
		});
		ReactDom.render(element, elem);
	}

	private onColorChanged(id: string, newColor: string): void {
		if (this.properties.onPropertyChange && newColor !== null) {
			this.properties.onPropertyChange(this.targetProperty, this.color, newColor);
			this.color = newColor;
			this.properties.properties[this.targetProperty] = newColor;
			if (typeof this.changeCB !== 'undefined' && this.changeCB !== null) {
				this.changeCB(this.targetProperty, newColor);
			}
		}
	}
}

export function PropertyFieldSwatchColorPicker(targetProperty: string, properties: IPropertyFieldSwatchColorPickerProps): IPropertyPaneField<IPropertyFieldSwatchColorPickerProps> {
	return new PropertyFieldSwatchColorPickerBuilder(targetProperty, properties);
}