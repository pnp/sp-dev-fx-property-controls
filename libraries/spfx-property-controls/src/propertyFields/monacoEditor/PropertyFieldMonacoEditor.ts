import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {
  IPropertyPaneField,
  PropertyPaneFieldType,
} from '@microsoft/sp-property-pane';

import {
  IPropertyFieldMonacoEditorProps,
  IPropertyFieldMonacoEditorPropsInternal,
} from './IPropertyFieldMonacoEditor';
import PropertyFieldMonacoEditorHost from './PropertyFieldMonacoEditorHost';

class PropertyFieldMonacoEditorBuilder implements IPropertyPaneField<IPropertyFieldMonacoEditorPropsInternal> {
  public targetProperty: string;
  public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
  public properties: IPropertyFieldMonacoEditorPropsInternal;


  private _onChangeCallback: (targetProperty?: string, newValue?: any) => void; // eslint-disable-line @typescript-eslint/no-explicit-any

  public constructor(_targetProperty: string, _properties: IPropertyFieldMonacoEditorPropsInternal) {
    this.targetProperty = _targetProperty;
    this.properties = _properties;
    this.properties.onRender = this._render.bind(this);
    this.properties.onDispose = this._dispose.bind(this);
  }

  private _render(elem: HTMLElement, context?: any, changeCallback?: (targetProperty?: string, newValue?: any) => void): void { // eslint-disable-line @typescript-eslint/no-explicit-any

    const props: IPropertyFieldMonacoEditorProps = <IPropertyFieldMonacoEditorProps>this.properties;
    const element = React.createElement(PropertyFieldMonacoEditorHost, {
      ...props,
      onPropertyChange:  this._onValueChanged.bind(this)
    });

    ReactDOM.render(element, elem);

    if (changeCallback) {
      this._onChangeCallback = changeCallback;
    }
  }

  private _dispose(elem: HTMLElement): void {
    ReactDOM.unmountComponentAtNode(elem);
  }

  private _onValueChanged (value:string, validationErrors?:string[]): void {
    if (this._onChangeCallback) {
      this._onChangeCallback(this.targetProperty, value);
      this.properties.onChange(value);
    }
  }
}

 export function PropertyFieldMonacoEditor(targetProperty: string, properties: IPropertyFieldMonacoEditorProps): IPropertyPaneField<IPropertyFieldMonacoEditorPropsInternal> {
  return new PropertyFieldMonacoEditorBuilder(targetProperty, {
    ...properties,
    onRender: null,
    onDispose: null
  });
}


