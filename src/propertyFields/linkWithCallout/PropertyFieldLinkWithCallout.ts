import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
    IPropertyPaneField,
    PropertyPaneFieldType
} from '@microsoft/sp-webpart-base';

import PropertyFieldLinkHost from './PropertyFieldLinkWithCalloutHost';

import { IPropertyFieldLinkWithCalloutPropsInternal, IPropertyFieldLinkWithCalloutProps } from './IPropertyFieldLinkWithCallout';
import omit from 'lodash/omit';

/**
 * Represents a PropertyFieldLinkWithCallout object
 */
class PropertyFieldLinkWithCalloutBuilder implements IPropertyPaneField<IPropertyFieldLinkWithCalloutPropsInternal> {
    public targetProperty: string;
    public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
    public properties: IPropertyFieldLinkWithCalloutPropsInternal;


    public constructor(_targetProperty: string, _properties: IPropertyFieldLinkWithCalloutPropsInternal) {
        this.targetProperty = _targetProperty;
        this.properties = _properties;

        this.properties.onRender = this._render.bind(this);
        this.properties.onDispose = this._dispose.bind(this);
    }

    private _render(elem: HTMLElement, context?: any, changeCallback?: (targetProperty?: string, newValue?: any) => void): void {

        const props: IPropertyFieldLinkWithCalloutProps = <IPropertyFieldLinkWithCalloutProps>omit(this.properties);

        const element = React.createElement(PropertyFieldLinkHost, {
            ...props
        });

        ReactDOM.render(element, elem);
    }

    private _dispose(elem: HTMLElement) {
        ReactDOM.unmountComponentAtNode(elem);
    }
}

/**
 * Helper method to create a Link with Callout component on the PropertyPane.
 * @param targetProperty - Target property the Link with Callout component is associated to.
 * @param properties - Strongly typed Link with Callout component properties.
 */
export function PropertyFieldLinkWithCallout(targetProperty: string, properties: IPropertyFieldLinkWithCalloutProps): IPropertyPaneField<IPropertyFieldLinkWithCalloutPropsInternal> {
    return new PropertyFieldLinkWithCalloutBuilder(targetProperty, {
        ...properties,
        onRender: null,
        onDispose: null
    });
}
