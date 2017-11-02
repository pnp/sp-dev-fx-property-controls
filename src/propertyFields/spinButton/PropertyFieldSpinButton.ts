import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
  IPropertyPaneField,
  PropertyPaneFieldType
} from '@microsoft/sp-webpart-base';
import { 
	IPropertyFieldSpinButtonProps,
	IPropertyFieldSpinButtonPropsInternal
} from './IPropertyFieldSpinButton';
import { IPropertyFieldSpinButtonHostProps } from './IPropertyFieldSpinButtonHost';
import PropertyFieldSpinButtonHost from './PropertyFieldSpinButtonHost';

class PropertyFieldSpinButtonBuilder implements IPropertyPaneField<IPropertyFieldSpinButtonProps> {
	
	//Properties defined by IPropertyPaneField
	public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
	public targetProperty: string;
	public properties: IPropertyFieldSpinButtonPropsInternal;
	private elem: HTMLElement;
	private value: number;
	private changeCB?: (targetProperty?: string, newValue?: any) => void;

	public constructor(_targetProperty: string, _properties: IPropertyFieldSpinButtonProps) {
		this.targetProperty = _targetProperty;
		this.properties = {
			key: _properties.key,
			label: _properties.label,
			step: _properties.step,
			min: _properties.min,
			max: _properties.max,
			onPropertyChange: _properties.onPropertyChange,
			disabled: _properties.disabled,
			properties: _properties.properties,
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

		const element: React.ReactElement<IPropertyFieldSpinButtonHostProps> = React.createElement(PropertyFieldSpinButtonHost, {
			label: this.properties.label,
			disabled: this.properties.disabled,
			value: this.properties.value || this.properties.min || 0,
			step: this.properties.step,
			min: this.properties.min,
			max: this.properties.max,
			incrementIconName: this.properties.incrementIconName || 'ChevronUpSmall',
			decrementIconName: this.properties.decrementIconName || 'ChevronDownSmall',
			onValueChanged: this.onValueChanged.bind(this)
		});
		ReactDom.render(element, elem);
	}

	private onValueChanged(newValue: number): void {
		if (this.properties.onPropertyChange && newValue !== null) {
			this.properties.onPropertyChange(this.targetProperty, this.value, newValue);
			this.value = newValue;
			this.properties.properties[this.targetProperty] = newValue;
			if (typeof this.changeCB !== 'undefined' && this.changeCB !== null) {
				this.changeCB(this.targetProperty, newValue);
			}
		}
	}
}

export function PropertyFieldSpinButton(targetProperty: string, properties: IPropertyFieldSpinButtonProps): IPropertyPaneField<IPropertyFieldSpinButtonProps> {
	return new PropertyFieldSpinButtonBuilder(targetProperty, properties);
}