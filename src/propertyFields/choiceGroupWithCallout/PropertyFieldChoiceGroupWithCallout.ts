import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
    IPropertyPaneField,
    PropertyPaneFieldType
} from '@microsoft/sp-property-pane';
import omit from 'lodash/omit';

import PropertyFieldToggleWithCalloutHost from './PropertyFieldChoiceGroupWithCalloutHost';

import {IPropertyFieldChoiceGroupWithCalloutPropsInternal, IPropertyFieldChoiceGroupWithCalloutProps} from './IPropertyFieldChoiceGroupWithCallout';
import { IChoiceGroupOption } from '@fluentui/react/lib/components/ChoiceGroup';

class PropertyFieldChoiceGroupWithCalloutBuilder implements IPropertyPaneField<IPropertyFieldChoiceGroupWithCalloutPropsInternal> {
    public targetProperty: string;
    public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
    public properties: IPropertyFieldChoiceGroupWithCalloutPropsInternal;

    private _onChangeCallback: (targetProperty?: string, newValue?: any) => void; // eslint-disable-line @typescript-eslint/no-explicit-any

    public constructor(_targetProperty: string, _properties: IPropertyFieldChoiceGroupWithCalloutPropsInternal) {
        this.targetProperty = _targetProperty;
        this.properties = _properties;

        this.properties.onRender = this._render.bind(this);
        this.properties.onDispose = this._dispose.bind(this);
    }

    private _render(elem: HTMLElement, context?: any, changeCallback?: (targetProperty?: string, newValue?: any) => void): void { // eslint-disable-line @typescript-eslint/no-explicit-any
        // IPropertyPaneChoiceGroupOption should be manually converted to IChoiceGroupOption
        const options: IChoiceGroupOption[] = this.properties.options.map<IChoiceGroupOption>(o => {
            return {
                ...omit(o, ['key', 'iconProps']),
                iconProps: o.iconProps && {
                  iconName: o.iconProps.officeFabricIconFontName
                },
                key: o.key.toString()
            };
        });
        const props = this.properties as IPropertyFieldChoiceGroupWithCalloutProps;

        const element = React.createElement(PropertyFieldToggleWithCalloutHost, {
            ...omit(props, ['options']),
            options: options,
            onChange: this._onChanged.bind(this)
        });

        ReactDOM.render(element, elem);

        if (changeCallback) {
            this._onChangeCallback = changeCallback;
        }
    }

    private _dispose(elem: HTMLElement): void {
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
