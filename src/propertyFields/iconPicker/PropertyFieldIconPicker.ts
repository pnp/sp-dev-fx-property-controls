import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  IPropertyPaneField,
  PropertyPaneFieldType,
} from '@microsoft/sp-property-pane';

import { IPropertyFieldIconPickerProps, IPropertyFieldIconPickerPropsInternal } from './IPropertyFieldIconPicker';
import PropertyFieldIconPickerHost from './PropertyFieldIconPickerHost';

class PropertyFieldIconPickerBuilder implements IPropertyPaneField<IPropertyFieldIconPickerPropsInternal> {
  public targetProperty: string;
  public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
  public properties: IPropertyFieldIconPickerPropsInternal;
  private key: string;
  private customProperties: any;
  private onSave: (icon: string) => void;
  private onChanged?: (icon: string) => void;
  private buttonLabel: string;
  private disabled: boolean = false;
  private buttonClassName: string;
  private panelClassName: string;
  private currentIcon: string;
  private renderOption: any;
  private label: string;

  private _onChangeCallback: (targetProperty?: string, newValue?: any) => void;

  public constructor(_targetProperty: string, _properties: IPropertyFieldIconPickerPropsInternal) {
    this.targetProperty = _targetProperty;
    this.properties = _properties;
    this.onPropertyChange = _properties.onPropertyChange;
    this.customProperties = _properties.properties;
    this.key = _properties.key;
    this.onSave = _properties.onSave;
    this.onChanged = _properties.onChanged;
    this.buttonClassName = _properties.buttonClassName;
    this.buttonLabel = _properties.buttonLabel;
    this.disabled = _properties.disabled;
    this.panelClassName = _properties.panelClassName;
    this.currentIcon = _properties.currentIcon;
    this.renderOption = _properties.renderOption;
    this.label = _properties.label;

    this.properties.onRender = this._render.bind(this);
    this.properties.onDispose = this._dispose.bind(this);
    if (_properties.disabled === true) {
      this.disabled = _properties.disabled;
    }
  }

  private _render(elem: HTMLElement, context?: any, changeCallback?: (targetProperty?: string, newValue?: any) => void): void {

    const element = React.createElement(PropertyFieldIconPickerHost, {
      key: this.key,
      buttonLabel: this.buttonLabel,
      buttonClassName: this.buttonClassName,
      disabled: this.disabled,
      panelClassName: this.panelClassName,
      currentIcon: this.currentIcon,
      renderOption: this.renderOption,
      properties: this.customProperties,
      label: this.label,
      onSave: this.onSave,      
      onChanged: this.onChanged,
      targetProperty: this.targetProperty,
      onChange: changeCallback,
      onPropertyChange: this.onPropertyChange,
      onRender: this._render,
      onDispose: this._dispose
    });

    ReactDOM.render(element, elem);
  }

  private _dispose(elem: HTMLElement) {
    ReactDOM.unmountComponentAtNode(elem);
  }

  public onPropertyChange(propertyPath: string, oldValue: any, newValue: any): void {    
  }

}

export function PropertyFieldIconPicker(targetProperty: string, properties: IPropertyFieldIconPickerProps): IPropertyPaneField<IPropertyFieldIconPickerPropsInternal> {
  return new PropertyFieldIconPickerBuilder(targetProperty, {
    ...properties,
    targetProperty: targetProperty,
    onRender: null,
    onDispose: null
  });
}
