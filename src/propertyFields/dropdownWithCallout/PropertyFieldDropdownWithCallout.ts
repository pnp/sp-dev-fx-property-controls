import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
    IPropertyPaneField,
    PropertyPaneFieldType,
    IPropertyPaneDropdownOption
} from '@microsoft/sp-property-pane';

import PropertyFieldDropdownHost from './PropertyFieldDropdownWithCalloutHost';
import omit from 'lodash/omit';
import { IPropertyFieldDropdownWithCalloutPropsInternal, IPropertyFieldDropdownWithCalloutProps } from './IPropertyFieldDropdownWithCallout';
import { IDropdownOption } from 'office-ui-fabric-react/lib/components/Dropdown';

class PropertyFieldDropdownWithCalloutBuilder implements IPropertyPaneField<IPropertyFieldDropdownWithCalloutPropsInternal> {
    public targetProperty: string;
    public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
    public properties: IPropertyFieldDropdownWithCalloutPropsInternal;


    private _onChangeCallback: (targetProperty?: string, newValue?: any) => void;

    public constructor(_targetProperty: string, _properties: IPropertyFieldDropdownWithCalloutPropsInternal) {
        this.targetProperty = _targetProperty;
        this.properties = _properties;

        this.properties.onRender = this._render.bind(this);
        this.properties.onDispose = this._dispose.bind(this);
    }

    private _render(elem: HTMLElement, context?: any, changeCallback?: (targetProperty?: string, newValue?: any) => void): void {

        const props: IPropertyFieldDropdownWithCalloutProps = <IPropertyFieldDropdownWithCalloutProps>this.properties;

        const element = React.createElement(PropertyFieldDropdownHost, {
            ...omit(props, ['options', 'ariaPositionInSet', 'ariaSetSize']),
            options: props.options as IDropdownOption[] || [],
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

export function PropertyFieldDropdownWithCallout(targetProperty: string, properties: IPropertyFieldDropdownWithCalloutProps): IPropertyPaneField<IPropertyFieldDropdownWithCalloutPropsInternal> {
    return new PropertyFieldDropdownWithCalloutBuilder(targetProperty, {
        ...properties,
        onRender: null,
        onDispose: null
    });
}
