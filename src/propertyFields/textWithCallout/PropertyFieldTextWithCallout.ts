import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
    IPropertyPaneField,
    PropertyPaneFieldType,
    IPropertyPaneCustomFieldProps,
    IPropertyPaneTextFieldProps
} from '@microsoft/sp-webpart-base';

import PropertyFieldTextWithCalloutHost from './PropertyFieldTextWithCalloutHost';

import { IPropertyFieldTextWithCalloutPropsInternal, IPropertyFieldTextWithCalloutProps } from './IPropertyFieldTextWithCallout';
import { IPropertyFieldTextWithCalloutHostProps } from '.';

class PropertyFieldTextWithCalloutBuilder implements IPropertyPaneField<IPropertyFieldTextWithCalloutPropsInternal> {
    public targetProperty: string;
    public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
    public properties: IPropertyFieldTextWithCalloutPropsInternal;

    private _onChangeCallback: (targetProperty?: string, newValue?: any) => void;

    public constructor(_targetProperty: string, _properties: IPropertyFieldTextWithCalloutPropsInternal) {
        this.targetProperty = _targetProperty;
        this.properties = _properties;

        this.properties.onRender = this._render.bind(this);
        this.properties.onDispose = this._dispose.bind(this);
    }

    private _render(elem: HTMLElement, context?: any, changeCallback?: (targetProperty?: string, newValue?: any) => void): void {

        const props: IPropertyFieldTextWithCalloutHostProps = <IPropertyFieldTextWithCalloutHostProps>this.properties;

        const element = React.createElement(PropertyFieldTextWithCalloutHost, {
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

export function PropertyFieldTextWithCallout(targetProperty: string, properties: IPropertyFieldTextWithCalloutProps): IPropertyPaneField<IPropertyFieldTextWithCalloutPropsInternal> {
    return new PropertyFieldTextWithCalloutBuilder(targetProperty, {
        ...properties,
        onRender: null,
        onDispose: null
    });
}
