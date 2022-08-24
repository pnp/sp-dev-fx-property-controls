import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  IPropertyPaneField,
  PropertyPaneFieldType,
} from '@microsoft/sp-property-pane';

import { PropertyFieldCollectionDataHost, IPropertyFieldCollectionDataPropsInternal, IPropertyFieldCollectionDataProps } from '.';

/**
 * Property Field Collection Data Builder Class
 */
class PropertyFieldCollectionDataBuilder implements IPropertyPaneField<IPropertyFieldCollectionDataPropsInternal> {
  public targetProperty: string;
  public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
  public properties: IPropertyFieldCollectionDataPropsInternal;

  private _onChangeCallback: (targetProperty?: string, newValue?: any) => void; // eslint-disable-line @typescript-eslint/no-explicit-any

  public constructor(_targetProperty: string, _properties: IPropertyFieldCollectionDataPropsInternal) {
    this.targetProperty = _targetProperty;
    this.properties = _properties;

    this.properties.onRender = this.render.bind(this);
    this.properties.onDispose = this.dispose.bind(this);
  }

  private render(elem: HTMLElement, context?: any, changeCallback?: (targetProperty?: string, newValue?: any[]) => void): void { // eslint-disable-line @typescript-eslint/no-explicit-any
    const props: IPropertyFieldCollectionDataProps = <IPropertyFieldCollectionDataProps>this.properties;

    const element = React.createElement(PropertyFieldCollectionDataHost, {
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
  private dispose(elem: HTMLElement): void {
    ReactDOM.unmountComponentAtNode(elem);
  }

  /**
   * On field change event handler
   * @param value
   */
  private onChanged(value: any[]): void { // eslint-disable-line @typescript-eslint/no-explicit-any
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
export function PropertyFieldCollectionData(targetProperty: string, properties: IPropertyFieldCollectionDataProps): IPropertyPaneField<IPropertyFieldCollectionDataPropsInternal> {
  return new PropertyFieldCollectionDataBuilder(targetProperty, {
    ...properties,
    onRender: null,
    onDispose: null
  });
}
