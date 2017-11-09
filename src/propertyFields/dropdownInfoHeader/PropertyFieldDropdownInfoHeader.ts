import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
    IPropertyPaneField,
    PropertyPaneFieldType,
    IPropertyPaneDropdownOption
} from '@microsoft/sp-webpart-base';

import PropertyFieldDropdownHost from './PropertyFieldDropdownInfoHeaderHost';

import { IPropertyFieldDropdownInfoHeaderPropsInternal, IPropertyFieldDropdownInfoHeaderProps } from './IPropertyFieldDropdownInfoHeader';

class PropertyFieldDropdownInfoHeaderBuilder implements IPropertyPaneField<IPropertyFieldDropdownInfoHeaderPropsInternal> {
    public targetProperty: string;
    public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
    public properties: IPropertyFieldDropdownInfoHeaderPropsInternal;
    

    private _onChangeCallback: (targetProperty?: string, newValue?: any) => void;

    public constructor(_targetProperty: string, _properties: IPropertyFieldDropdownInfoHeaderPropsInternal) {
        this.targetProperty = _targetProperty;
        this.properties = _properties;

        this.properties.onRender = this._render.bind(this);
        this.properties.onDispose = this._dispose.bind(this);
    }

    private _render(elem: HTMLElement, context?: any, changeCallback?: (targetProperty?: string, newValue?: any) => void): void {

        const props: IPropertyFieldDropdownInfoHeaderProps = <IPropertyFieldDropdownInfoHeaderProps>this.properties;

        const element = React.createElement(PropertyFieldDropdownHost, {
            ...props,
            onChanged: this._onChanged.bind(this)
        });

        ReactDOM.render(element, elem);

        if (changeCallback) {
            this._onChangeCallback = changeCallback;
        }
    }

    private _dispose(elem: HTMLElement) {
        ReactDOM.unmountComponentAtNode(elem);
    }

    private _onChanged(item: IPropertyPaneDropdownOption): void {
        if (this._onChangeCallback) {
            this._onChangeCallback(this.targetProperty, item.key);
        }
    }
}

export function PropertyFieldDropdownInfoHeader(targetProperty: string, properties: IPropertyFieldDropdownInfoHeaderProps): IPropertyPaneField<IPropertyFieldDropdownInfoHeaderPropsInternal> {
    return new PropertyFieldDropdownInfoHeaderBuilder(targetProperty, {
        ...properties,
        onRender: null,
        onDispose: null
    });
}
