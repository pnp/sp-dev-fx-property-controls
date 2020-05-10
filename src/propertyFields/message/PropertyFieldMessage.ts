import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  IPropertyPaneField,
  PropertyPaneFieldType,
} from '@microsoft/sp-webpart-base';

import { IPropertyFieldMessageProps, IPropertyFieldMessagePropsInternal } from './IPropertyFieldMessage';
import PropertyFieldMessageHost from './PropertyFieldMessageHost';

class PropertyFieldMessageBuilder implements IPropertyPaneField<IPropertyFieldMessagePropsInternal> {
  public targetProperty: string;
  public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
  public properties: IPropertyFieldMessagePropsInternal;


  private _onChangeCallback: (targetProperty?: string, newValue?: any) => void;

  public constructor(_targetProperty: string, _properties: IPropertyFieldMessagePropsInternal) {
    this.targetProperty = _targetProperty;
    this.properties = _properties;

    this.properties.onRender = this._render.bind(this);
    this.properties.onDispose = this._dispose.bind(this);
  }

  private _render(elem: HTMLElement, context?: any, changeCallback?: (targetProperty?: string, newValue?: any) => void): void {

    const props: IPropertyFieldMessageProps = <IPropertyFieldMessageProps>this.properties;

    const element = React.createElement(PropertyFieldMessageHost, {
      ...props,
    });

    ReactDOM.render(element, elem);

    if (changeCallback) {
      this._onChangeCallback = changeCallback;
    }
  }

  private _dispose(elem: HTMLElement) {
    ReactDOM.unmountComponentAtNode(elem);
  }

  private _onChanged(value: string): void {
    if (this._onChangeCallback) {
      this._onChangeCallback(this.targetProperty, value);
    }
  }

}

export function PropertyFieldMessage(targetProperty: string, properties: IPropertyFieldMessageProps): IPropertyPaneField<IPropertyFieldMessagePropsInternal> {
  return new PropertyFieldMessageBuilder(targetProperty, {
    ...properties,
    onRender: null,
    onDispose: null
  });
}
