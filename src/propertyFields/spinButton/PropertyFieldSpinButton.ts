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
	private svalue: number;
	private changeCB?: (targetProperty?: string, newValue?: any) => void;

	public constructor(_targetProperty: string, _properties: IPropertyFieldSpinButtonProps) {
		this.targetProperty = _targetProperty;
		this.properties = {
			key: _properties.key,
			label: _properties.label,
			step: _properties.step || 1,
			min: _properties.min,
			max: _properties.max,
			onPropertyChange: _properties.onPropertyChange,
			disabled: _properties.disabled,
			properties: _properties.properties,
			incrementIconName: _properties.incrementIconName,
			decrementIconName: _properties.decrementIconName,
			suffix: _properties.suffix,
			decimalPlaces: _properties.decimalPlaces || 0,
			onRender: this.onRender.bind(this)
		};
		this.svalue = _properties.initialValue || this.properties.min || 0;
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
			value: this.formatValueString(this.svalue),
			incrementIconName: this.properties.incrementIconName || 'ChevronUpSmall',
			decrementIconName: this.properties.decrementIconName || 'ChevronDownSmall',
			onValidate: this.validate.bind(this),
			onIncrement: this.increment.bind(this),
			onDecrement: this.decrement.bind(this)
		});
		ReactDom.render(element, elem);
	}

	private validate(rawValue: string): string {
		let numValue: number = this.extractNumValue(rawValue);

		return this.validateNumber(numValue);
	}

	private validateNumber(numValue: number): string {
		//Check against max value
		if(this.properties.max && numValue > this.properties.max) {
			numValue = this.properties.max;
		}
		//Check against min value
		if(this.properties.min && numValue < this.properties.min) {
			numValue = this.properties.min;
		}
		//ensure matching rounding for decimals
		numValue = +numValue.toFixed(this.properties.decimalPlaces);
		//Check for change and notify
		if(numValue !== this.svalue) {
			this.onValueChanged(numValue);
		}
		return this.formatValueString(numValue);
	}

	private increment(rawValue: string): string {
		let numValue: number = this.extractNumValue(rawValue);

		numValue += this.properties.step;

		return this.validateNumber(numValue);
	}

	private decrement(rawValue: string): string {
		let numValue: number = this.extractNumValue(rawValue);
		
		numValue -= this.properties.step;
		
		return this.validateNumber(numValue);
	}

	private extractNumValue(rawValue: string): number {
		let numValue: number;
		let baseValue: string = this.removeSuffix(rawValue);
		
		if(isNaN(+baseValue)){
			if(this.properties.min) {
				numValue = Math.max(this.properties.min,0);
			}
			else
			{
				numValue = 0;
			}
		}
		else
		{
			numValue = +baseValue;
		}

		return numValue;
	}

	private hasSuffix(rawValue: string): boolean {
		if(!this.properties.suffix) {
			return false;
		}
		let subString: string = rawValue.substr(rawValue.length - this.properties.suffix.length);
		return subString === this.properties.suffix;
	}
	
	private removeSuffix(rawValue: string): string {
		if (!this.hasSuffix(rawValue)) {
			return rawValue;
		}

		return rawValue.substr(0, rawValue.length - this.properties.suffix.length);
	}

	private formatValueString(numValue: number): string {
		return this.addSuffix(numValue.toFixed(this.properties.decimalPlaces));
	}

	private addSuffix(stringValue: string): string {
		if(!this.properties.suffix){
			return stringValue;
		}

		return stringValue + this.properties.suffix;
	}

	private onValueChanged(newValue: number): void {
		if (this.properties.onPropertyChange && newValue !== null) {
			this.properties.onPropertyChange(this.targetProperty, this.svalue, newValue);
			this.svalue = newValue;
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