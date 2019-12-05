import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
    IPropertyPaneField,
    PropertyPaneFieldType
} from '@microsoft/sp-webpart-base';
const omit: any = require('lodash/omit');

import PropertyFieldToggleWithCalloutHost from './PropertyFieldChoiceGroupWithCalloutHost';

import {IPropertyFieldChoiceGroupWithCalloutPropsInternal, IPropertyFieldChoiceGroupWithCalloutProps} from './IPropertyFieldChoiceGroupWithCallout';
import { IChoiceGroupOption } from 'office-ui-fabric-react/lib/components/ChoiceGroup';

class PropertyFieldChoiceGroupWithCalloutBuilder implements IPropertyPaneField<IPropertyFieldChoiceGroupWithCalloutPropsInternal> {
    public targetProperty: string;
    public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
    public properties: IPropertyFieldChoiceGroupWithCalloutPropsInternal;

    private _onChangeCallback: (targetProperty?: string, newValue?: any) => void;

    public constructor(_targetProperty: string, _properties: IPropertyFieldChoiceGroupWithCalloutPropsInternal) {
        this.targetProperty = _targetProperty;
        this.properties = _properties;

        this.properties.onRender = this._render.bind(this);
        this.properties.onDispose = this._dispose.bind(this);
    }

    private _render(elem: HTMLElement, context?: any, changeCallback?: (targetProperty?: string, newValue?: any) => void): void {
        // IPropertyPaneChoiceGroupOption should be manually converted to IChoiceGroupOption
        const options: IChoiceGroupOption[] = this.properties.options.map<IChoiceGroupOption>(o => {
            return {
                ...omit(o, ['key']),
                key: o.key.toString()
            };
        });
        const props: IPropertyFieldChoiceGroupWithCalloutProps = <IPropertyFieldChoiceGroupWithCalloutProps>omit(this.properties, ['options']);

        const element = React.createElement(PropertyFieldToggleWithCalloutHost, {
            ...props,
            options: options,
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

    private _onChanged(option: IChoiceGroupOption): void {
        if (this._onChangeCallback) {
            this._onChangeCallback(this.targetProperty, option.key);
        }
    }
}

export function PropertyFieldChoiceGroupWithCallout(targetProperty: string, properties: IPropertyFieldChoiceGroupWithCalloutProps): IPropertyPaneField<IPropertyFieldChoiceGroupWithCalloutPropsInternal> {
    return new PropertyFieldChoiceGroupWithCalloutBuilder(targetProperty, {
        ...properties,
        onRender: null,
        onDispose: null
    });
}
