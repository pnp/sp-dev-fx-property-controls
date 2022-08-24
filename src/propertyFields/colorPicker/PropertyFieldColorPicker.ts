import { IPropertyPaneField, PropertyPaneFieldType } from '@microsoft/sp-property-pane';
import { getColorFromString, IColor } from 'office-ui-fabric-react/lib/utilities/color';
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { setPropertyValue } from '../../helpers/GeneralHelper';
import { debounce } from '../../common/util/Util';

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
	private changeCB?: (targetProperty?: string, newValue?: any) => void; // eslint-disable-line @typescript-eslint/no-explicit-any
	private _debounce: (fnc: any, timeout: number) => void = debounce(); // eslint-disable-line @typescript-eslint/no-explicit-any

	public constructor(_targetProperty: string, _properties: IPropertyFieldColorPickerProps) {
		this.targetProperty = _targetProperty;
		this.properties = {
			key: _properties.key,
			label: _properties.label,
			onPropertyChange: _properties.onPropertyChange,
			selectedColor: _properties.selectedColor,
			disabled: _properties.disabled,
			debounce: _properties.debounce,
			isHidden: _properties.isHidden,
			alphaSliderHidden: _properties.alphaSliderHidden,
			showPreview: _properties.showPreview,
			properties: _properties.properties,
			style: _properties.style,
			iconName: _properties.iconName,
			onRender: this.onRender.bind(this)
		};

		if (typeof _properties.selectedColor === 'undefined') {
			this.color = '#ffffff';
		} else {
			if (typeof _properties.selectedColor === 'string') {
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

	private onRender(elem: HTMLElement, ctx?: any, changeCallback?: (targetProperty?: string, newValue?: any) => void): void { // eslint-disable-line @typescript-eslint/no-explicit-any
		if (!this.elem) {
			this.elem = elem;
		}
		this.changeCB = changeCallback;

		const element: React.ReactElement<IPropertyFieldColorPickerHostProps> = React.createElement(PropertyFieldColorPickerHost, {
			label: this.properties.label,
			alphaSliderHidden: this.properties.alphaSliderHidden,
			showPreview: this.properties.showPreview,
			disabled: this.properties.disabled,
			debounce: this.properties.debounce,
			isHidden: this.properties.isHidden,
			selectedColor: this.color,
			style: this.properties.style || PropertyFieldColorPickerStyle.Inline,
			iconName: this.properties.iconName || 'Color',
			onColorChanged: this.onColorChanged.bind(this)
		});
		ReactDom.render(element, elem);
	}

	private onColorChanged(newColor: string): void {
		if (this.properties.onPropertyChange && newColor !== null) {
			const newValue: string | IColor = (this.valueAsObject ? getColorFromString(newColor) : newColor);
			const oldValue: string | IColor = (this.valueAsObject ? getColorFromString(this.color) : this.color);
			this.color = newColor;
			if (this.properties.debounce) {
				this._debounce(() => {
					this.onColorChangedInternal(oldValue, newValue);
				}, this.properties.debounce)
			} else {
				this.onColorChangedInternal(oldValue, newValue);
			}
		}
	}
	private onColorChangedInternal(oldValue: string | IColor, newValue: string | IColor): void {
		this.properties.onPropertyChange(this.targetProperty, oldValue, newValue);
		setPropertyValue(this.properties.properties, this.targetProperty, newValue);
		if (typeof this.changeCB !== 'undefined' && this.changeCB !== null) {
			this.changeCB(this.targetProperty, newValue);
		}
	}
}

export function PropertyFieldColorPicker(targetProperty: string, properties: IPropertyFieldColorPickerProps): IPropertyPaneField<IPropertyFieldColorPickerProps> {
	return new PropertyFieldColorPickerBuilder(targetProperty, properties);
}
