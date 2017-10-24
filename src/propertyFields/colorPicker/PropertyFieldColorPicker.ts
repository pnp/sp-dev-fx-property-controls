import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
  IPropertyPaneField,
  PropertyPaneFieldType
} from '@microsoft/sp-webpart-base';
import { 
	PropertyFieldColorPickerStyle,
	IPropertyFieldColorPickerProps,
	IPropertyFieldColorPickerPropsInternal
} from './IPropertyFieldColorPicker';
import { IPropertyFieldColorPickerHostProps } from './IPropertyFieldColorPickerHost';
import PropertyFieldColorPickerHost from './PropertyFieldColorPickerHost';

class PropertyFieldColorPickerBuilder implements IPropertyPaneField<IPropertyFieldColorPickerProps> {
	
	//Properties defined by IPropertyPaneField
	public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
	public targetProperty: string;
	public properties: IPropertyFieldColorPickerPropsInternal;
	private elem: HTMLElement;
	private color: string;
	private changeCB?: (targetProperty?: string, newValue?: any) => void;

	public constructor(_targetProperty: string, _properties: IPropertyFieldColorPickerProps) {
		this.targetProperty = _targetProperty;
		this.properties = {
			key: _properties.key,
			label: _properties.label,
			onPropertyChange: _properties.onPropertyChange,
			selectedColor: _properties.selectedColor,
			disabled: _properties.disabled,
			alphaSliderHidden: _properties.alphaSliderHidden,
			properties: _properties.properties,
			style: _properties.style,
			iconName: _properties.iconName,
			onRender: this.onRender.bind(this)
		};
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

		const element: React.ReactElement<IPropertyFieldColorPickerHostProps> = React.createElement(PropertyFieldColorPickerHost, {
			label: this.properties.label,
			alphaSliderHidden: this.properties.alphaSliderHidden,
			disabled: this.properties.disabled,
			selectedColor: this.properties.selectedColor || '#FFFFFF',
			style: this.properties.style || PropertyFieldColorPickerStyle.Inline,
			iconName: this.properties.iconName || 'Color',
			onColorChanged: this.onColorChanged.bind(this)
		});
		ReactDom.render(element, elem);
	}

	private onColorChanged(newColor: string): void {
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

export function PropertyFieldColorPicker(targetProperty: string, properties: IPropertyFieldColorPickerProps): IPropertyPaneField<IPropertyFieldColorPickerProps> {
	return new PropertyFieldColorPickerBuilder(targetProperty, properties);
}