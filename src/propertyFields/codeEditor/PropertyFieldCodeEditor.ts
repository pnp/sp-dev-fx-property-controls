import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
  PropertyPaneFieldType,
  IPropertyPaneField
} from '@microsoft/sp-property-pane';
import { BaseComponentContext } from '@microsoft/sp-component-base';
import PropertyFieldCodeEditorHost from './PropertyFieldCodeEditorHost';
import { IPropertyFieldCodeEditorHostProps } from './IPropertyFieldCodeEditorHost';
import { IPropertyFieldCodeEditorPropsInternal, IPropertyFieldCodeEditorProps, PropertyFieldCodeEditorLanguages } from './IPropertyFieldCodeEditor';
import { AceOptions } from 'react-ace';

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
  private context: BaseComponentContext;

  private initialValue: string;
  private language:PropertyFieldCodeEditorLanguages;
  private panelTitle: string;

  public onPropertyChange(propertyPath: string, oldValue: any, newValue: any): void { /* no-op; */ } // eslint-disable-line @typescript-eslint/no-explicit-any
  private customProperties: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  private key: string;
  private disabled: boolean = false;
  private deferredValidationTime: number = 200;
  private options: AceOptions;
  private panelWidth: string | undefined;

  /**
   * Constructor method
   */
  public constructor(_targetProperty: string, _properties: IPropertyFieldCodeEditorPropsInternal) {

    this.render = this.render.bind(this);
    this.targetProperty = _targetProperty;
    this.properties = _properties;
    this.properties.onDispose = this.dispose;
    this.properties.onRender = this.render;
    this.label = _properties.label;
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
    if (_properties.options) {
      this.options = _properties.options;
    }

    this.panelWidth = _properties.panelWidth;

  }

  /**
   * Renders the SPListPicker field content
   */
  private render(elem: HTMLElement, ctx?: any, changeCallback?: (targetProperty?: string, newValue?: any) => void): void { // eslint-disable-line @typescript-eslint/no-explicit-any
    // Construct the JSX properties
    const element: React.ReactElement<IPropertyFieldCodeEditorHostProps> = React.createElement(PropertyFieldCodeEditorHost, {
      label: this.label,
      targetProperty: this.targetProperty,
      panelTitle: this.panelTitle,
      language: this.language,
      initialValue: this.initialValue,
      onDispose: this.dispose,
      onRender: this.render,
      onChange: changeCallback,
      onPropertyChange: this.onPropertyChange,
      properties: this.customProperties,
      key: this.key,
      disabled: this.disabled,
      deferredValidationTime: this.deferredValidationTime,
      options: this.options,
      panelWidth: this.panelWidth
    });

    // Calls the REACT content generator
    ReactDom.render(element, elem);
  }

  /**
   * Disposes the current object
   */
  private dispose(elem: HTMLElement): void {
    ReactDom.unmountComponentAtNode(elem);
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
