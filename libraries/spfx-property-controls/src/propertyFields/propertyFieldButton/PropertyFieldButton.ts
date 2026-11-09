import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {
  IPropertyPaneField,
  PropertyPaneFieldType,
} from '@microsoft/sp-property-pane';

import {
  IPropertyFieldButtonProps,
  IPropertyFieldButtonPropsInternal,
} from './IPropertyFieldButtonProps';
import PropertyFieldButtonControl from './PropertyFieldButtonControl';

class PropertyFieldButtonBuilder implements IPropertyPaneField<IPropertyFieldButtonPropsInternal> {
  public targetProperty: string;
  public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
  public properties: IPropertyFieldButtonPropsInternal;


  private _onChangeCallback: (targetProperty?: string, newValue?: any) => void; // eslint-disable-line @typescript-eslint/no-explicit-any

  public constructor(_targetProperty: string, _properties: IPropertyFieldButtonPropsInternal) {
    this.targetProperty = _targetProperty;
    this.properties = _properties;

    this.properties.onRender = this._render.bind(this);
    this.properties.onDispose = this._dispose.bind(this);
  }

  private _render(elem: HTMLElement, context?: any, changeCallback?: (targetProperty?: string, newValue?: any) => void): void { // eslint-disable-line @typescript-eslint/no-explicit-any

    const props: IPropertyFieldButtonProps = <IPropertyFieldButtonProps>this.properties;

    const element = React.createElement(PropertyFieldButtonControl, {
      ...props
     
    });

    ReactDOM.render(element, elem);

    if (changeCallback) {
      this._onChangeCallback = changeCallback;
    }
  }

  private _dispose(elem: HTMLElement): void {
    ReactDOM.unmountComponentAtNode(elem);
  }

  private _onChange(value: string): void {
    if (this._onChangeCallback) {
      this._onChangeCallback(this.targetProperty, value);
    }
  }

}

export function PropertyFieldButton(targetProperty: string, properties: IPropertyFieldButtonProps): IPropertyPaneField<IPropertyFieldButtonPropsInternal> {
  return new PropertyFieldButtonBuilder(targetProperty, {
    ...properties,
    onRender: null,
    onDispose: null
  });
}
