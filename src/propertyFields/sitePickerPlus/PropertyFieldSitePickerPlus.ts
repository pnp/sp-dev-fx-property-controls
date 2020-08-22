import * as React from 'react';
import * as ReactDom from 'react-dom';
import { IPropertyPaneField, PropertyPaneFieldType } from '@microsoft/sp-webpart-base';
import PropertyFieldSitePickerPlusHost from './PropertyFieldSitePickerPlusHost';
import { IPropertyFieldSitePickerPlusHostProps } from './IPropertyFieldSitePickerPlusHost';
import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { IPropertyFieldSitePlus, IPropertyFieldSitePickerPlusProps, IPropertyFieldSitePickerPlusPropsInternal } from './IPropertyFieldSitePickerPlus';

/**
 * Represents a PropertyFieldSitePickerPlus object
 */
class PropertyFieldSitePickerPlusBuilder implements IPropertyPaneField<IPropertyFieldSitePickerPlusPropsInternal> {

  // Properties defined by IPropertyPaneField
  public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
  public targetProperty: string;
  public properties: IPropertyFieldSitePickerPlusPropsInternal;

  // Custom properties
  private label: string;
  private disabled: boolean = false;
  private context: IWebPartContext;
  private initialData: IPropertyFieldSitePlus[];
  private selectedSites: Array<IPropertyFieldSitePlus>; 
  private onPropertyChange: (propertyPath: string, newValue: any) => void;
  private customProperties: any;
  private key: string;
  private onGetErrorMessage: (value: IPropertyFieldSitePlus[]) => string | Promise<string>;
  private deferredValidationTime: number = 200;

  /**
   * Constructor method
   */
  public constructor(_targetProperty: string, _properties: IPropertyFieldSitePickerPlusPropsInternal) {
    this.render = this.render.bind(this);
    this.label = _properties.label;
    this.targetProperty = _properties.targetProperty;
    this.properties = _properties;
    this.properties.onDispose = this.dispose;
    this.properties.onRender = this.render;
    this.onPropertyChange = _properties.onPropertyChange;
    this.context = _properties.context;
    this.initialData = _properties.initialData;    
    this.customProperties = _properties.properties;
    this.selectedSites = this.customProperties.sites;
    this.key = _properties.key;
    this.onGetErrorMessage = _properties.onGetErrorMessage;
    
    if(_properties.key === undefined){
        _properties.key = new Date().toString();
    }
    if(this.selectedSites === undefined){
      this.selectedSites = new Array<IPropertyFieldSitePlus>();
    }
    if (typeof _properties.disabled !== 'undefined') {
      this.disabled = _properties.disabled;
    }
    if (_properties.deferredValidationTime) {
      this.deferredValidationTime = _properties.deferredValidationTime;
    }
  }

  /**
   * Renders the SitePickerPlus field content
   */
  private render(elem: HTMLElement, ctx?: any, changeCallback?: (targetProperty?: string, newValue?: any) => void): void {
    // Construct the JSX properties
    const element: React.ReactElement<IPropertyFieldSitePickerPlusHostProps> = React.createElement(PropertyFieldSitePickerPlusHost, {
      label: this.label,
      disabled: this.disabled,
      targetProperty: this.targetProperty,
      initialData: this.initialData,
      selectedSites: this.selectedSites,
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
export function PropertyFieldSitePickerPlus(targetProperty: string, properties: IPropertyFieldSitePickerPlusProps): IPropertyPaneField<IPropertyFieldSitePickerPlusPropsInternal> {
  // Calls the PropertyFieldSitePickerPlus builder object
  // This object will simulate a PropertyFieldCustom to manage his rendering process
  return new PropertyFieldSitePickerPlusBuilder(targetProperty, {
    ...properties,
    targetProperty: targetProperty,
    onDispose: null,
    onRender: null
  });
}