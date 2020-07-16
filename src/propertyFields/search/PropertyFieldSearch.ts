import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  IPropertyPaneField,
  PropertyPaneFieldType,
} from '@microsoft/sp-webpart-base';

import { IPropertyFieldSearchProps, IPropertyFieldSearchPropsInternal } from './IPropertyFieldSearch';
import PropertyFieldSearchHost from './PropertyFieldSearchHost';

class PropertyFieldSearchBuilder implements IPropertyPaneField<IPropertyFieldSearchPropsInternal> {
  public targetProperty: string;
  public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
  public properties: IPropertyFieldSearchPropsInternal;


  private _onChangeCallback: (targetProperty?: string, newValue?: any) => void;

  public constructor(_targetProperty: string, _properties: IPropertyFieldSearchPropsInternal) {
    this.targetProperty = _targetProperty;
    this.properties = _properties;

    this.properties.onRender = this._render.bind(this);
    this.properties.onDispose = this._dispose.bind(this);
  }

  private _render(elem: HTMLElement, context?: any, changeCallback?: (targetProperty?: string, newValue?: any) => void): void {

    const props: IPropertyFieldSearchProps = <IPropertyFieldSearchProps>this.properties;

    const element = React.createElement(PropertyFieldSearchHost, {
      ...props,
      onChange: this._onChanged.bind(this)
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

export function PropertyFieldSearch(targetProperty: string, properties: IPropertyFieldSearchProps): IPropertyPaneField<IPropertyFieldSearchPropsInternal> {
  return new PropertyFieldSearchBuilder(targetProperty, {
    ...properties,
    onChange: properties.onChange,
    onClear: properties.onClear,
    onEscape: properties.onEscape,
    onSearch: properties.onSearch,
    onRender: null,
    onDispose: null
  });
}
