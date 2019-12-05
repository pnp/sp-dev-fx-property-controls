import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
    IPropertyPaneField,
    PropertyPaneFieldType
} from '@microsoft/sp-webpart-base';

import PropertyFieldLabelHost from './PropertyFieldLabelWithCalloutHost';

import { IPropertyFieldLabelWithCalloutPropsInternal, IPropertyFieldLabelWithCalloutProps } from './IPropertyFieldLabelWithCallout';

/**
 * Represents a PropertyFieldLabelWithCallout object
 */
class PropertyFieldLabelWithCalloutBuilder implements IPropertyPaneField<IPropertyFieldLabelWithCalloutPropsInternal> {
    public targetProperty: string;
    public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
    public properties: IPropertyFieldLabelWithCalloutPropsInternal;


    public constructor(_targetProperty: string, _properties: IPropertyFieldLabelWithCalloutPropsInternal) {
        this.targetProperty = _targetProperty;
        this.properties = _properties;

        this.properties.onRender = this._render.bind(this);
        this.properties.onDispose = this._dispose.bind(this);
    }

    private _render(elem: HTMLElement, context?: any, changeCallback?: (targetProperty?: string, newValue?: any) => void): void {

        const props: IPropertyFieldLabelWithCalloutProps = <IPropertyFieldLabelWithCalloutProps>this.properties;

        const element = React.createElement(PropertyFieldLabelHost, {
            ...props
        });

        ReactDOM.render(element, elem);
    }

    private _dispose(elem: HTMLElement) {
        ReactDOM.unmountComponentAtNode(elem);
    }
}

/**
 * Helper method to create a Label with Callout component on the PropertyPane.
 * @param targetProperty - Target property the Label with Callout component is associated to.
 * @param properties - Strongly typed Label with Callout component properties.
 */
export function PropertyFieldLabelWithCallout(targetProperty: string, properties: IPropertyFieldLabelWithCalloutProps): IPropertyPaneField<IPropertyFieldLabelWithCalloutPropsInternal> {
    return new PropertyFieldLabelWithCalloutBuilder(targetProperty, {
        ...properties,
        onRender: null,
        onDispose: null
    });
}
