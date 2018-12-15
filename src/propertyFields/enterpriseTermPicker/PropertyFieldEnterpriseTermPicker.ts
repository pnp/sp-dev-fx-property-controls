import * as React from 'react';
import * as ReactDom from 'react-dom';
import { IPropertyPaneField, PropertyPaneFieldType } from '@microsoft/sp-webpart-base';
import { IPropertyFieldEnterpriseTermPickerProps, IPropertyFieldEnterpriseTermPickerPropsInternal } from './IPropertyFieldEnterpriseTermPicker';
import { IPropertyFieldEnterpriseTermPickerHostProps } from './IPropertyFieldEnterpriseTermPickerHost';
import PropertyFieldEnterpriseTermPickerHost from './PropertyFieldEnterpriseTermPickerHost';

class PropertyFieldEnterpriseTermPickerBuilder implements IPropertyPaneField<IPropertyFieldEnterpriseTermPickerProps> {
    //Properties defined by IPropertyPaneField
	public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
	public targetProperty: string;
	public properties: IPropertyFieldEnterpriseTermPickerPropsInternal;
    private elem: HTMLElement;
    private value: string;
    private changeCB?: (targetProperty?: string, newValue?: any) => void;
    
    public constructor(_targetProperty: string, _properties: IPropertyFieldEnterpriseTermPickerProps) {
		this.targetProperty = _targetProperty;
		this.properties = {
			key: _properties.key,
			label: _properties.label,
            onPropertyChange: _properties.onPropertyChange,
            value: _properties.value,
            onRender: this.onRender.bind(this),
            properties: _properties.properties
        };
        
        this.value = _properties.value;
        if (this.value === undefined) {
            this.value = '';
        }
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

        const element: React.ReactElement<IPropertyFieldEnterpriseTermPickerHostProps> = React.createElement(PropertyFieldEnterpriseTermPickerHost, {
			label: this.properties.label,
            value: this.value,
            onValueChanged: this._onValueChanged.bind(this)
		});
		ReactDom.render(element, elem);
    }

    private _onValueChanged(newValue: string): void {
        if (this.properties.onPropertyChange && newValue !== this.value) {
            this.properties.onPropertyChange(this.targetProperty, this.value, newValue);
            this.value = newValue;
            this.properties.properties[this.targetProperty] = newValue;
            if (typeof this.changeCB !== 'undefined' && this.changeCB !== null) {
				this.changeCB(this.targetProperty, newValue);
			}
        }
    }
}

export function PropertyFieldEnterpriseTermPicker(targetProperty: string, properties: IPropertyFieldEnterpriseTermPickerProps): IPropertyPaneField<IPropertyFieldEnterpriseTermPickerProps> {
	return new PropertyFieldEnterpriseTermPickerBuilder(targetProperty, properties);
}