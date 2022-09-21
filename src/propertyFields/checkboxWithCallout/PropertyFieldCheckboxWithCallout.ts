import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
    IPropertyPaneField,
    PropertyPaneFieldType
} from '@microsoft/sp-property-pane';

import PropertyFieldCheckboxHost from './PropertyFieldCheckboxWithCalloutHost';

import { IPropertyFieldCheckboxWithCalloutPropsInternal, IPropertyFieldCheckboxWithCalloutProps } from './IPropertyFieldCheckboxWithCallout';

/**
 * Represents a PropertyFieldCheckboxWithCallout object
 */
class PropertyFieldCheckboxWithCalloutBuilder implements IPropertyPaneField<IPropertyFieldCheckboxWithCalloutPropsInternal> {
    public targetProperty: string;
    public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
    public properties: IPropertyFieldCheckboxWithCalloutPropsInternal;


    private _onChangeCallback: (targetProperty?: string, newValue?: any) => void; // eslint-disable-line @typescript-eslint/no-explicit-any

    public constructor(_targetProperty: string, _properties: IPropertyFieldCheckboxWithCalloutPropsInternal) {
        this.targetProperty = _targetProperty;
        this.properties = _properties;

        this.properties.onRender = this._render.bind(this);
        this.properties.onDispose = this._dispose.bind(this);
    }

    private _render(elem: HTMLElement, context?: any, changeCallback?: (targetProperty?: string, newValue?: any) => void): void { // eslint-disable-line @typescript-eslint/no-explicit-any

        const props: IPropertyFieldCheckboxWithCalloutProps = <IPropertyFieldCheckboxWithCalloutProps>this.properties;

        const element = React.createElement(PropertyFieldCheckboxHost, {
            ...props,
            onChange: this._onChange.bind(this)
        });

        ReactDOM.render(element, elem);

        if (changeCallback) {
            this._onChangeCallback = changeCallback;
        }
    }

    private _dispose(elem: HTMLElement): void {
        ReactDOM.unmountComponentAtNode(elem);
    }

    private _onChange(e: React.FormEvent<HTMLElement>, value: boolean): void {
        if (this._onChangeCallback) {
            this._onChangeCallback(this.targetProperty, value);
        }
    }
}

/**
 * Helper method to create a Checkbox with Callout component on the PropertyPane.
 * @param targetProperty - Target property the Checkbox with Callout component is associated to.
 * @param properties - Strongly typed Checkbox with Callout component properties.
 */
export function PropertyFieldCheckboxWithCallout(targetProperty: string, properties: IPropertyFieldCheckboxWithCalloutProps): IPropertyPaneField<IPropertyFieldCheckboxWithCalloutPropsInternal> {
    return new PropertyFieldCheckboxWithCalloutBuilder(targetProperty, {
        ...properties,
        onRender: null,
        onDispose: null
    });
}
