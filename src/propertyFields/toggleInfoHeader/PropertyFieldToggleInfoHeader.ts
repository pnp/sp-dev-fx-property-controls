import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
    IPropertyPaneField,
    PropertyPaneFieldType
} from '@microsoft/sp-webpart-base';

import PropertyFieldToggleInfoHeaderHost from './PropertyFieldToggleInfoHeaderHost';

import {IPropertyFieldToggleInfoHeaderPropsInternal, IPropertyFieldToggleInfoHeaderProps} from './IPropertyFieldToggleInfoHeader';

class PropertyFieldToggleInfoHeaderBuilder implements IPropertyPaneField<IPropertyFieldToggleInfoHeaderPropsInternal> {
    public targetProperty: string;
    public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
    public properties: IPropertyFieldToggleInfoHeaderPropsInternal;

    private _onChangeCallback: (targetProperty?: string, newValue?: any) => void;

    public constructor(_targetProperty: string, _properties: IPropertyFieldToggleInfoHeaderPropsInternal) {
        this.targetProperty = _targetProperty;
        this.properties = _properties;

        this.properties.onRender = this._render.bind(this);
        this.properties.onDispose = this._dispose.bind(this);
    }

    private _render(elem: HTMLElement, context?: any, changeCallback?: (targetProperty?: string, newValue?: any) => void): void {

        const props: IPropertyFieldToggleInfoHeaderProps = <IPropertyFieldToggleInfoHeaderProps>this.properties;

        const element = React.createElement(PropertyFieldToggleInfoHeaderHost, {
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

    private _onChanged(checked: boolean): void {
        if (this._onChangeCallback) {
            this._onChangeCallback(this.targetProperty, checked);
        }
    }
}

export function PropertyFieldToggleInfoHeader(targetProperty: string, properties: IPropertyFieldToggleInfoHeaderProps): IPropertyPaneField<IPropertyFieldToggleInfoHeaderPropsInternal> {
    return new PropertyFieldToggleInfoHeaderBuilder(targetProperty, {
        ...properties,
        onRender: null,
        onDispose: null
    });
}