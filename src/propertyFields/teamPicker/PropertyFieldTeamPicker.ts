import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
  WebPartContext
} from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneField,
  PropertyPaneFieldType
} from '@microsoft/sp-property-pane';
import { IPropertyFieldTeamPickerPropsInternal, IPropertyFieldTeam, IPropertyFieldTeamPickerProps } from './IPropertyFieldTeamPicker';
import { IPropertyFieldTeamPickerHostProps } from './IPropertyFieldTeamPickerHost';
import PropertyFieldTeamPickerHost from './PropertyFieldTeamPickerHost';

/**
 * Represents a PropertyFieldTeamPicker object
 */

class PropertyFieldTeamPickerBuilder implements IPropertyPaneField<IPropertyFieldTeamPickerPropsInternal> {

  // Properties defined by IPropertyPaneField
  public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
  public targetProperty: string;
  public properties: IPropertyFieldTeamPickerPropsInternal;

  // Custom properties
  private label: string;
  private disabled: boolean = false;
  private context: WebPartContext;
  private initialTeams: IPropertyFieldTeam[];
  private multiSelect: boolean = false;
  private onPropertyChange: (propertyPath: string, oldValue: any, newValue: any) => void;
  private customProperties: any;
  private key: string;
  private onGetErrorMessage: (value: IPropertyFieldTeam[]) => string | Promise<string>;
  private deferredValidationTime: number = 200;

  /**
   * Constructor method
   */
  public constructor(_targetProperty: string, _properties: IPropertyFieldTeamPickerPropsInternal) {
    this.render = this.render.bind(this);
    this.label = _properties.label;
    this.targetProperty = _properties.targetProperty;
    this.properties = _properties;
    this.properties.onDispose = this.dispose;
    this.properties.onRender = this.render;
    this.onPropertyChange = _properties.onPropertyChange;
    this.context = _properties.context;
    this.initialTeams = _properties.initialTeams;
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
    const element: React.ReactElement<IPropertyFieldTeamPickerHostProps> = React.createElement(PropertyFieldTeamPickerHost, {
      label: this.label,
      disabled: this.disabled,
      targetProperty: this.targetProperty,
      initialTeams: this.initialTeams,
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
export function PropertyFieldTeamPicker(targetProperty: string, properties: IPropertyFieldTeamPickerProps): IPropertyPaneField<IPropertyFieldTeamPickerPropsInternal> {
  // Calls the PropertyFieldTeamPicker builder object
  // This object will simulate a PropertyFieldCustom to manage his rendering process
  return new PropertyFieldTeamPickerBuilder(targetProperty, {
    ...properties,
    targetProperty: targetProperty,
    onDispose: null,
    onRender: null
  });
}
