import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  IPropertyPaneField,
  PropertyPaneFieldType,
} from '@microsoft/sp-property-pane';

import { IPropertyFieldGuidProps, IPropertyFieldGuidPropsInternal } from './IPropertyFieldGuid';
import PropertyFieldGuidHost from './PropertyFieldGuidHost';

class PropertyFieldGuidBuilder implements IPropertyPaneField<IPropertyFieldGuidPropsInternal> {
  public targetProperty: string;
  public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
  public properties: IPropertyFieldGuidPropsInternal;


  private _onChangeCallback: (targetProperty?: string, newValue?: any) => void; // eslint-disable-line @typescript-eslint/no-explicit-any

  public constructor(_targetProperty: string, _properties: IPropertyFieldGuidPropsInternal) {
    this.targetProperty = _targetProperty;
    this.properties = _properties;

    this.properties.onRender = this._render.bind(this);
    this.properties.onDispose = this._dispose.bind(this);
  }

  private _render(elem: HTMLElement, context?: any, changeCallback?: (targetProperty?: string, newValue?: any) => void): void { // eslint-disable-line @typescript-eslint/no-explicit-any

    const props: IPropertyFieldGuidProps = <IPropertyFieldGuidProps>this.properties;

    const element = React.createElement(PropertyFieldGuidHost, {
      ...props,
      onChanged: this._onChanged.bind(this)
    });

    ReactDOM.render(element, elem);

    if (changeCallback) {
      this._onChangeCallback = changeCallback;
    }
  }

  private _dispose(elem: HTMLElement): void {
    ReactDOM.unmountComponentAtNode(elem);
  }

  private _onChanged(value: string): void {
    if (this._onChangeCallback) {
      this._onChangeCallback(this.targetProperty, value);
    }
  }

}

export function PropertyFieldGuid(targetProperty: string, properties: IPropertyFieldGuidProps): IPropertyPaneField<IPropertyFieldGuidPropsInternal> {
  return new PropertyFieldGuidBuilder(targetProperty, {
    ...properties,
    onRender: null,
    onDispose: null
  });
}
