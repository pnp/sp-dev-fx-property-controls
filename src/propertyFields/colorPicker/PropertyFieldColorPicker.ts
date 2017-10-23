import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
  IPropertyPaneField,
  PropertyPaneFieldType
} from '@microsoft/sp-webpart-base';
import { 
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

	public constructor(_targetProperty: string, _properties: IPropertyFieldColorPickerProps) {
		this.targetProperty = _targetProperty;
		this.properties = {
			key: _properties.key,
			label: _properties.label,
			onPropertyChange: _properties.onPropertyChange,
			selectedColor: _properties.selectedColor,
			disabled: _properties.disabled,
			alphaSliderHidden: _properties.alphaSliderHidden,
			onRender: this.onRender.bind(this)
		};
	}

	public render(): void {
		if (!this.elem) {
			return;
		}

		this.onRender(this.elem);
	}

	private onRender(elem: HTMLElement): void {
		if (!this.elem) {
			this.elem = elem;
		}

		const element: React.ReactElement<IPropertyFieldColorPickerHostProps> = React.createElement(PropertyFieldColorPickerHost, {
			label: this.properties.label,
			alphaSliderHidden: this.properties.alphaSliderHidden,
			disabled: this.properties.disabled,
			selectedColor: this.properties.selectedColor,
			onColorChanged: this.onColorChanged.bind(this)
		});
		ReactDom.render(element, elem);
	}

	private onColorChanged(color: string): void {

	}
}

export function PropertyFieldColorPicker(targetProperty: string, properties: IPropertyFieldColorPickerProps): IPropertyPaneField<IPropertyFieldColorPickerProps> {
	return new PropertyFieldColorPickerBuilder(targetProperty, properties);
}