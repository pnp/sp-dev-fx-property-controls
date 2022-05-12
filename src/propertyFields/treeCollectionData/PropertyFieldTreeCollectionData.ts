import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  IPropertyPaneField,
  PropertyPaneFieldType,
} from '@microsoft/sp-property-pane';

import { PropertyFieldTreeCollectionDataHost, IPropertyFieldTreeCollectionDataPropsInternal, IPropertyFieldTreeCollectionDataProps } from '.';

/**
 * Property Field Collection Data Builder Class
 */
class PropertyFieldTreeCollectionDataBuilder implements IPropertyPaneField<IPropertyFieldTreeCollectionDataPropsInternal> {
  public targetProperty: string;
  public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
  public properties: IPropertyFieldTreeCollectionDataPropsInternal;

  private _onChangeCallback: (targetProperty?: string, newValue?: any) => void;

  public constructor(_targetProperty: string, _properties: IPropertyFieldTreeCollectionDataPropsInternal) {
    this.targetProperty = _targetProperty;
    this.properties = _properties;

    this.properties.onRender = this.render.bind(this);
    this.properties.onDispose = this.dispose.bind(this);
  }

  private render(elem: HTMLElement, context?: any, changeCallback?: (targetProperty?: string, newValue?: any[]) => void): void {
    const props: IPropertyFieldTreeCollectionDataProps = <IPropertyFieldTreeCollectionDataProps>this.properties;

    const element = React.createElement(PropertyFieldTreeCollectionDataHost, {
      ...props,
      onChanged: this.onChanged.bind(this)
    });

    ReactDOM.render(element, elem);

    if (changeCallback) {
      this._onChangeCallback = changeCallback;
    }
  }

  /**
   * Dispose the property field
   */
  private dispose(elem: HTMLElement) {
    ReactDOM.unmountComponentAtNode(elem);
  }

  /**
   * On field change event handler
   * @param value
   */
  private onChanged(value: any[]): void {
    if (this._onChangeCallback) {
      this._onChangeCallback(this.targetProperty, value);
    }
  }
}

/**
 * Property field
 * @param targetProperty
 * @param properties
 */
export function PropertyFieldTreeCollectionData(targetProperty: string, properties: IPropertyFieldTreeCollectionDataProps): IPropertyPaneField<IPropertyFieldTreeCollectionDataPropsInternal> {
  return new PropertyFieldTreeCollectionDataBuilder(targetProperty, {
    ...properties,
    onRender: null,
    onDispose: null
  });
}
