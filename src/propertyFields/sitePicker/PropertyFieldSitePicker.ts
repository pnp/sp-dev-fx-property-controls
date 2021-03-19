import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
  IPropertyPaneField,
  PropertyPaneFieldType
} from '@microsoft/sp-property-pane';
import { BaseComponentContext } from '@microsoft/sp-component-base';
import { IPropertyFieldSitePickerPropsInternal, IPropertyFieldSite, IPropertyFieldSitePickerProps } from './IPropertyFieldSitePicker';
import { IPropertyFieldSitePickerHostProps } from './IPropertyFieldSitePickerHost';
import PropertyFieldSitePickerHost from './PropertyFieldSitePickerHost';

/**
 * Represents a PropertyFieldSitePicker object
 */

class PropertyFieldSitePickerBuilder implements IPropertyPaneField<IPropertyFieldSitePickerPropsInternal> {

  // Properties defined by IPropertyPaneField
  public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
  public targetProperty: string;
  public properties: IPropertyFieldSitePickerPropsInternal;

  // Custom properties
  private label: string;
  private disabled: boolean = false;
  private context: BaseComponentContext;
  private initialSites: IPropertyFieldSite[];
  private multiSelect: boolean = false;
  private onPropertyChange: (propertyPath: string, oldValue: any, newValue: any) => void;
  private customProperties: any;
  private key: string;
  private onGetErrorMessage: (value: IPropertyFieldSite[]) => string | Promise<string>;
  private deferredValidationTime: number = 200;

  /**
   * Constructor method
   */
  public constructor(_targetProperty: string, _properties: IPropertyFieldSitePickerPropsInternal) {
    this.render = this.render.bind(this);
    this.label = _properties.label;
    this.targetProperty = _properties.targetProperty;
    this.properties = _properties;
    this.properties.onDispose = this.dispose;
    this.properties.onRender = this.render;
    this.onPropertyChange = _properties.onPropertyChange;
    this.context = _properties.context;
    this.initialSites = _properties.initialSites;
    this.customProperties = _properties.properties;
    this.key = _properties.key;
    this.onGetErrorMessage = _properties.onGetErrorMessage;

    if (typeof _properties.disabled !== 'undefined') {
      this.disabled = _properties.disabled;
    }

    if (_properties.deferredValidationTime) {
      this.deferredValidationTime = _properties.deferredValidationTime;
    }

    if (typeof _properties.multiSelect !== "undefined") {
      this.multiSelect = _properties.multiSelect;
    }
  }

  /**
   * Renders the PeoplePicker field content
   */
  private render(elem: HTMLElement, ctx?: any, changeCallback?: (targetProperty?: string, newValue?: any) => void): void {
    // Construct the JSX properties
    const element: React.ReactElement<IPropertyFieldSitePickerHostProps> = React.createElement(PropertyFieldSitePickerHost, {
      label: this.label,
      disabled: this.disabled,
      targetProperty: this.targetProperty,
      initialSites: this.initialSites,
      multiSelect: this.multiSelect,
      onDispose: this.dispose,
      onRender: this.render,
      onChange: changeCallback,
      onPropertyChange: this.onPropertyChange,
      context: this.context,
      properties: this.customProperties,
      key: this.key,
      onGetErrorMessage: this.onGetErrorMessage,
      deferredValidationTime: this.deferredValidationTime
    });

    // Calls the REACT content generator
    ReactDom.render(element, elem);
  }

  /**
  * Disposes the current object
  */
  private dispose(elem: HTMLElement): void { }
}

/**
 * Helper method to create a Site Picker on the PropertyPane.
 * @param targetProperty - Target property the site picker is associated to.
 * @param properties - Strongly typed site Picker properties.
 */
export function PropertyFieldSitePicker(targetProperty: string, properties: IPropertyFieldSitePickerProps): IPropertyPaneField<IPropertyFieldSitePickerPropsInternal> {
  // Calls the PropertyFieldSitePicker builder object
  // This object will simulate a PropertyFieldCustom to manage his rendering process
  return new PropertyFieldSitePickerBuilder(targetProperty, {
    ...properties,
    targetProperty: targetProperty,
    onDispose: null,
    onRender: null
  });
}
