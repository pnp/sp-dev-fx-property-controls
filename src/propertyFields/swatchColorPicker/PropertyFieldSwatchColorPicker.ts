import { IPropertyPaneField, PropertyPaneFieldType } from '@microsoft/sp-webpart-base';
import { getColorFromString, IColor } from 'office-ui-fabric-react/lib/utilities/color/colors';
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { setPropertyValue } from '../../helpers/GeneralHelper';

import {
    IPropertyFieldSwatchColorPickerProps,
    IPropertyFieldSwatchColorPickerPropsInternal,
    PropertyFieldSwatchColorPickerStyle,
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
	private valueAsObject;
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

		if(typeof _properties.selectedColor === 'undefined') {
			this.color = null;
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

		const element: React.ReactElement<IPropertyFieldSwatchColorPickerHostProps> = React.createElement(PropertyFieldSwatchColorPickerHost, {
			label: this.properties.label,
			disabled: this.properties.disabled,
			colors: (typeof this.properties.colors === 'undefined'  || this.properties.colors.length === 0) ? [{ color: '#FFFFFF' }] : this.properties.colors,
			showAsCircles: this.properties.showAsCircles,
			columnCount: typeof this.properties.columnCount === 'undefined' ? 6 : Math.min(Math.max(1,this.properties.columnCount),8),
			selectedColor: this.color,
			style: this.properties.style || PropertyFieldSwatchColorPickerStyle.Inline,
			iconName: this.properties.iconName || 'Color',
			onColorChanged: this.onColorChanged.bind(this)
		});
		ReactDom.render(element, elem);
	}

	private onColorChanged(id: string, newColor: string): void {
		if (this.properties.onPropertyChange && newColor !== null) {
			let newValue: string | IColor = (this.valueAsObject ? getColorFromString(newColor) : newColor);
			let oldValue: string | IColor = (this.valueAsObject ? getColorFromString(this.color) : this.color);
			this.color = newColor;
			this.properties.onPropertyChange(this.targetProperty, oldValue, newValue);
      setPropertyValue(this.properties.properties, this.targetProperty, newValue);
			if (typeof this.changeCB !== 'undefined' && this.changeCB !== null) {
				this.changeCB(this.targetProperty, newValue);
			}
		}
	}
}

export function PropertyFieldSwatchColorPicker(targetProperty: string, properties: IPropertyFieldSwatchColorPickerProps): IPropertyPaneField<IPropertyFieldSwatchColorPickerProps> {
	return new PropertyFieldSwatchColorPickerBuilder(targetProperty, properties);
}
