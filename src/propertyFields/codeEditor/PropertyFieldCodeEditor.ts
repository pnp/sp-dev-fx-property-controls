import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
  IPropertyPaneField,
  PropertyPaneFieldType,
  IWebPartContext
} from '@microsoft/sp-webpart-base';
import PropertyFieldCodeEditorHost from './PropertyFieldCodeEditorHost';
import { IPropertyFieldCodeEditorHostProps } from './IPropertyFieldCodeEditorHost';
import { IPropertyFieldCodeEditorPropsInternal, IPropertyFieldCodeEditorProps, PropertyFieldCodeEditorLanguages } from './IPropertyFieldCodeEditor';

/**
 * Represents a PropertyFieldCodeEditor object
 */
class PropertyFieldCodeEditorBuilder implements IPropertyPaneField<IPropertyFieldCodeEditorPropsInternal> {
  // Properties defined by IPropertyPaneField
  public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
  public targetProperty: string;
  public properties: IPropertyFieldCodeEditorPropsInternal;

  // Custom properties label: string;
  private label: string;
  private context: IWebPartContext;
  
  private initialValue: string;
  private language:PropertyFieldCodeEditorLanguages;
  private panelTitle: string;

  public onPropertyChange(propertyPath: string, oldValue: any, newValue: any): void { }
  private customProperties: any;
  private key: string;
  private disabled: boolean = false;
  private deferredValidationTime: number = 200;

  /**
   * Constructor method
   */
  public constructor(_targetProperty: string, _properties: IPropertyFieldCodeEditorPropsInternal) {
    debugger;
    this.render = this.render.bind(this);
    this.targetProperty = _targetProperty;
    this.properties = _properties;
    this.properties.onDispose = this.dispose;
    this.properties.onRender = this.render;
    this.label = _properties.label;
    this.context = _properties.context;
    this.onPropertyChange = _properties.onPropertyChange;
    this.customProperties = _properties.properties;
    this.key = _properties.key;
    this.panelTitle = _properties.panelTitle;

    this.language=_properties.language;
    this.initialValue=_properties.initialValue;

    if (_properties.disabled === true) {
      this.disabled = _properties.disabled;
    }
    if (_properties.deferredValidationTime) {
      this.deferredValidationTime = _properties.deferredValidationTime;
    }
   
  }

  /**
   * Renders the SPListPicker field content
   */
  private render(elem: HTMLElement, ctx?: any, changeCallback?: (targetProperty?: string, newValue?: any) => void): void {
    // Construct the JSX properties
    const element: React.ReactElement<IPropertyFieldCodeEditorHostProps> = React.createElement(PropertyFieldCodeEditorHost, {
      label: this.label,
      targetProperty: this.targetProperty,
      panelTitle: this.panelTitle,
      language: this.language,
      initialValue: this.initialValue,
      context: this.context,
      onDispose: this.dispose,
      onRender: this.render,
      onChange: changeCallback,
      onPropertyChange: this.onPropertyChange,
      properties: this.customProperties,
      key: this.key,
      disabled: this.disabled,
      deferredValidationTime: this.deferredValidationTime
    });

    // Calls the REACT content generator
    ReactDom.render(element, elem);
  }

  /**
   * Disposes the current object
   */
  private dispose(elem: HTMLElement): void {

  }

}

/**
 * Helper method to create a SPList Picker on the PropertyPane.
 * @param targetProperty - Target property the SharePoint list picker is associated to.
 * @param properties - Strongly typed SPList Picker properties.
 */
export function PropertyFieldCodeEditor(targetProperty: string, properties: IPropertyFieldCodeEditorProps): IPropertyPaneField<IPropertyFieldCodeEditorPropsInternal> {
  // Calls the PropertyFieldCodeEditor builder object
  // This object will simulate a PropertyFieldCustom to manage his rendering process
  return new PropertyFieldCodeEditorBuilder(targetProperty, {
    ...properties,
    targetProperty: targetProperty,
    onRender: null,
    onDispose: null
  });
}
