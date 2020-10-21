import { IDropdownOption } from 'office-ui-fabric-react/lib/components/Dropdown';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  IPropertyPaneField,
  PropertyPaneFieldType,
  IPropertyPaneDropdownOption
} from '@microsoft/sp-property-pane';

import PropertyFieldNumberHost from './PropertyFieldNumberHost';

import { IPropertyFieldNumberPropsInternal, IPropertyFieldNumberProps } from './IPropertyFieldNumber';

class PropertyFieldNumberBuilder implements IPropertyPaneField<IPropertyFieldNumberPropsInternal> {
  public targetProperty: string;
  public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
  public properties: IPropertyFieldNumberPropsInternal;


  private _onChangeCallback: (targetProperty?: string, newValue?: any) => void;

  public constructor(_targetProperty: string, _properties: IPropertyFieldNumberPropsInternal) {
    this.targetProperty = _targetProperty;
    this.properties = _properties;

    this.properties.onRender = this._render.bind(this);
    this.properties.onDispose = this._dispose.bind(this);
  }

  private _render(elem: HTMLElement, context?: any, changeCallback?: (targetProperty?: string, newValue?: any) => void): void {

    const props: IPropertyFieldNumberProps = <IPropertyFieldNumberProps>this.properties;

    const element = React.createElement(PropertyFieldNumberHost, {
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

  private _onChanged(value: number | undefined): void {
    if (this._onChangeCallback) {
      this._onChangeCallback(this.targetProperty, value);
    }
  }
}

export function PropertyFieldNumber(targetProperty: string, properties: IPropertyFieldNumberProps): IPropertyPaneField<IPropertyFieldNumberPropsInternal> {
  return new PropertyFieldNumberBuilder(targetProperty, {
    ...properties,
    onRender: null,
    onDispose: null
  });
}
