import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
  IPropertyPaneField,
  PropertyPaneFieldType,
  IWebPartContext
} from '@microsoft/sp-webpart-base';
import PropertyFieldRoleDefinitionPickerHost from './PropertyFieldRoleDefinitionPickerHost';
import { IPropertyFieldRoleDefinitionPickerHostProps } from './IPropertyFieldRoleDefinitionPickerHost';
import { IPropertyFieldRoleDefinitionPickerProps, IPropertyFieldRoleDefinitionPickerPropsInternal } from './IPropertyFieldRoleDefinitionPicker';
import { IRoleDefinitionInformation } from '.';

/**
 * Represents a PropertyFieldRoleDefinitionPicker object
 */
class PropertyFieldRoleDefinitionPickerBuilder implements IPropertyPaneField<IPropertyFieldRoleDefinitionPickerPropsInternal> {

  //Properties defined by IPropertyPaneField
  public properties: IPropertyFieldRoleDefinitionPickerPropsInternal;
  public targetProperty: string;
  public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;

  //Custom properties label: string;
  private context: IWebPartContext;
  private label: string;  
  private selectedRoleDefinition: string[];
  private roleDefinitionsToExclude: string[];
  private roleDefinitions: IRoleDefinitionInformation[];  
  private customProperties: any;  
  private disabled: boolean = false;
  private multiSelect: boolean = false;
  private key: string;
  private webAbsoluteUrl?: string;
  private onGetErrorMessage: (value: IRoleDefinitionInformation[]) => string | Promise<string>;
  private onRoleDefinitionsRetrieved?: (roleDefinitions: IRoleDefinitionInformation[]) => PromiseLike<IRoleDefinitionInformation[]> | IRoleDefinitionInformation[];
  
  private onPropertyChange: (propertyPath: string, oldValue: any, newValue: any) => void;


  /**
   * Constructor method
   */
  public constructor(_targetProperty: string, _properties: IPropertyFieldRoleDefinitionPickerPropsInternal) {

    this.render = this.render.bind(this);
    this.targetProperty = _targetProperty;
    this.properties = _properties;
    this.properties.onDispose = this.dispose;
    this.properties.onRender = this.render;
    this.label = _properties.label;
    this.context = _properties.context;
    this.webAbsoluteUrl = _properties.webAbsoluteUrl;
    this.roleDefinitions = _properties.roleDefinitions;    
    this.selectedRoleDefinition = _properties.selectedRoleDefinition;
    
    this.onPropertyChange = _properties.onPropertyChange;
    this.customProperties = _properties.properties;
    this.key = _properties.key;
    this.roleDefinitionsToExclude = _properties.roleDefinitionsToExclude;
    
    this.onGetErrorMessage = _properties.onGetErrorMessage;    
    this.onRoleDefinitionsRetrieved = _properties.onRoleDefinitionsRetrieved;
    if (_properties.disabled === true) {
      this.disabled = _properties.disabled;
    }

    if (typeof _properties.multiSelect !== "undefined") {
      this.multiSelect = _properties.multiSelect;
    }
  }

  /**
   * Renders the RoleDefinitionPicker field content
   */
  private render(elem: HTMLElement, ctx?: any, changeCallback?: (targetProperty?: string, newValue?: any) => void): void {
    const componentProps = {
      label: this.label,
      targetProperty: this.targetProperty,
      context: this.context,
      webAbsoluteUrl: this.webAbsoluteUrl,
      roleDefinitions: this.roleDefinitions,
      onDispose: this.dispose,
      onRender: this.render,
      onChange: changeCallback,
      onPropertyChange: this.onPropertyChange,
      properties: this.customProperties,
      key: this.key,
      disabled: this.disabled,
      multiSelect: this.multiSelect,
      onGetErrorMessage: this.onGetErrorMessage,      
      roleDefinitionsToExclude: this.roleDefinitionsToExclude,
      selectedRoleDefinition: this.selectedRoleDefinition,
      onRoleDefinitionsRetrieved: this.onRoleDefinitionsRetrieved           
    };      
      
      const element: React.ReactElement<IPropertyFieldRoleDefinitionPickerHostProps> = React.createElement(PropertyFieldRoleDefinitionPickerHost, componentProps);
      // Calls the REACT content generator
      ReactDom.render(element, elem);
  }

  /**
   * Disposes the current object
   */
  private dispose(_elem: HTMLElement): void {

  }

}

/**
 * Helper method to create a Role Definitions Picker on the PropertyPane.
 * @param targetProperty - Target property the SharePoint role definition picker is associated to.
 * @param properties - Strongly typed Role Definition Picker properties.
 */
export function PropertyFieldRoleDefinitionPicker(targetProperty: string, properties: IPropertyFieldRoleDefinitionPickerProps): IPropertyPaneField<IPropertyFieldRoleDefinitionPickerPropsInternal> {

  //Create an internal properties object from the given properties
  const newProperties: IPropertyFieldRoleDefinitionPickerPropsInternal = {
    label: properties.label,
    targetProperty: targetProperty,
    context: properties.context,    
    selectedRoleDefinition: properties.selectedRoleDefinition,
    onPropertyChange: properties.onPropertyChange,
    properties: properties.properties,
    onDispose: null,
    onRender: null,
    key: properties.key,
    roleDefinitions: properties.roleDefinitions,
    disabled: properties.disabled,
    roleDefinitionsToExclude: properties.roleDefinitionsToExclude, 
    multiSelect: properties.multiSelect,
    webAbsoluteUrl: properties.webAbsoluteUrl,   
    onGetErrorMessage: properties.onGetErrorMessage,
    onRoleDefinitionsRetrieved: properties.onRoleDefinitionsRetrieved    
  };
  //Calls the PropertyFieldRoleDefinitionPicker builder object
  //This object will simulate a PropertyFieldCustom to manage his rendering process
  return new PropertyFieldRoleDefinitionPickerBuilder(targetProperty, newProperties);
}
