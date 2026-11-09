/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {
  IPropertyPaneField,
  PropertyPaneFieldType,
} from '@microsoft/sp-property-pane';

import { IItem } from './grid/IItem';
import {
  IPropertyFieldGridProps,
  IPropertyFieldGridPropsInternal,
} from './IPropertyFieldGridProps';
import PropertyFieldGridControl from './PropertyFieldGridControl';

class PropertyFieldGridBuilder implements IPropertyPaneField<IPropertyFieldGridPropsInternal> {
  public targetProperty: any;
  public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
  public properties: IPropertyFieldGridPropsInternal;
  private _onChangeCallback: (targetProperty?: string, newValue?: any) => void;


  public constructor(targetProperty: string, properties: IPropertyFieldGridPropsInternal) {
    this.targetProperty = targetProperty;
    this.properties = properties;
    this.properties.onRender = this.render.bind(this);
    this.properties.onDispose = this._dispose.bind(this);
  }

  private render(
    elem: HTMLElement,
    context?: any,
    changeCallback?: (targetProperty?: string, newValue?:any) => void
  ): void {
    // eslint-disable-line @typescript-eslint/no-explicit-any

    const props: IPropertyFieldGridProps = <IPropertyFieldGridProps>this.properties;

    const element = React.createElement(PropertyFieldGridControl, {
      ...props,
      onSelected: this.onSeleted.bind(this),
    });

    if (changeCallback) {
      this._onChangeCallback = changeCallback;
    }

    ReactDOM.render(element, elem);
  }

  private onSeleted(items: IItem[]): void {
    this.properties.onSelected(items);

    if (this._onChangeCallback) {
      this._onChangeCallback(this.targetProperty, items);
    }
    this.targetProperty = items;
  }

  private _dispose(elem: HTMLElement): void {
    ReactDOM.unmountComponentAtNode(elem);
  }
}

export function PropertyFieldGrid(
  targetProperty: string,
  properties: IPropertyFieldGridProps
): IPropertyPaneField<IPropertyFieldGridPropsInternal> {
  return new PropertyFieldGridBuilder(targetProperty, {
    ...properties,
    onRender: null,
    onDispose: null,
  });
}
