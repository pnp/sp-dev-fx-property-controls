import { IPropertyPaneField, PropertyPaneFieldType } from '@microsoft/sp-webpart-base';
import { getColorFromString, IColor } from 'office-ui-fabric-react/lib/utilities/color';
import * as React from 'react';
import * as ReactDom from 'react-dom';

import {
    IPropertyFieldColorPickerProps,
    IPropertyFieldColorPickerPropsInternal,
    PropertyFieldColorPickerStyle,
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
	private valueAsObject: boolean;
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

		if(typeof _properties.selectedColor === 'undefined') {
			this.color = '#ffffff';
		} else {
			if(typeof _properties.selectedColor === 'string') {
				this.color = _properties.selectedColor;
			} else {
				this.color = _properties.selectedColor.str;
			}
		}

		this.valueAsObject = _properties.valueAsObject;
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
			selectedColor: this.color,
			style: this.properties.style || PropertyFieldColorPickerStyle.Inline,
			iconName: this.properties.iconName || 'Color',
			onColorChanged: this.onColorChanged.bind(this)
		});
		ReactDom.render(element, elem);
	}

	private onColorChanged(newColor: string): void {
		if (this.properties.onPropertyChange && newColor !== null) {
			let newValue: string | IColor = (this.valueAsObject ? getColorFromString(newColor) : newColor);
			let oldValue: string | IColor = (this.valueAsObject ? getColorFromString(this.color) : this.color);
			this.color = newColor;
			this.properties.onPropertyChange(this.targetProperty, oldValue, newValue);
			this.properties.properties[this.targetProperty] = newValue;
			if (typeof this.changeCB !== 'undefined' && this.changeCB !== null) {
				this.changeCB(this.targetProperty, newValue);
			}
		}
	}

}

export function PropertyFieldColorPicker(targetProperty: string, properties: IPropertyFieldColorPickerProps): IPropertyPaneField<IPropertyFieldColorPickerProps> {
	return new PropertyFieldColorPickerBuilder(targetProperty, properties);
}
