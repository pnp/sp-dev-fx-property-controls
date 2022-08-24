import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
    IPropertyPaneField,
    PropertyPaneFieldType,
} from '@microsoft/sp-property-pane';

import PropertyFieldButtonHost from './PropertyFieldButtonWithCalloutHost';

import { IPropertyFieldButtonWithCalloutPropsInternal, IPropertyFieldButtonWithCalloutProps } from './IPropertyFieldButtonWithCallout';
import { ButtonType } from 'office-ui-fabric-react/lib/components/Button';

import omit from 'lodash/omit';

/**
 * Represents a PropertyFieldButtonWithCallout object
 */
class PropertyFieldButtonWithCalloutBuilder implements IPropertyPaneField<IPropertyFieldButtonWithCalloutPropsInternal> {
    public targetProperty: string;
    public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
    public properties: IPropertyFieldButtonWithCalloutPropsInternal;


    public constructor(_targetProperty: string, _properties: IPropertyFieldButtonWithCalloutPropsInternal) {
        this.targetProperty = _targetProperty;
        this.properties = _properties;

        this.properties.onRender = this._render.bind(this);
        this.properties.onDispose = this._dispose.bind(this);
    }

    private _render(elem: HTMLElement, context?: any, changeCallback?: (targetProperty?: string, newValue?: any) => void): void { // eslint-disable-line @typescript-eslint/no-explicit-any

        const props = this.properties as IPropertyFieldButtonWithCalloutProps;

        //
        // PropertyPaneButtonType is not assignable to ButtonType
        //
        const buttonTypeString: string = ButtonType[this.properties.buttonType];
        const buttonType: ButtonType = ButtonType[buttonTypeString];
        const element = React.createElement(PropertyFieldButtonHost, {
            ...omit(props, ['icon', 'buttonType']),
            buttonType: buttonType
        });

        ReactDOM.render(element, elem);
    }

    private _dispose(elem: HTMLElement): void {
        ReactDOM.unmountComponentAtNode(elem);
    }
}

/**
 * Helper method to create a Button with Callout component on the PropertyPane.
 * @param targetProperty - Target property the Button with Callout component is associated to.
 * @param properties - Strongly typed Button with Callout component properties.
 */
export function PropertyFieldButtonWithCallout(targetProperty: string, properties: IPropertyFieldButtonWithCalloutProps): IPropertyPaneField<IPropertyFieldButtonWithCalloutPropsInternal> {
    return new PropertyFieldButtonWithCalloutBuilder(targetProperty, {
        ...properties,
        onRender: null,
        onDispose: null
    });
}
