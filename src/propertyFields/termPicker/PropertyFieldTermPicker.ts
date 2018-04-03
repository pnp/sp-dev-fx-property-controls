import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
  IPropertyPaneField,
  PropertyPaneFieldType,
  IWebPartContext
} from '@microsoft/sp-webpart-base';
import PropertyFieldTermPickerHost from './PropertyFieldTermPickerHost';
import { IPropertyFieldTermPickerHostProps } from './IPropertyFieldTermPickerHost';
import { IPropertyFieldTermPickerPropsInternal, IPropertyFieldTermPickerProps, IPickerTerms } from './IPropertyFieldTermPicker';

/**
 * Represents a PropertyFieldTermPicker object
 */
class PropertyFieldTermPickerBuilder implements IPropertyPaneField<IPropertyFieldTermPickerPropsInternal> {
  // Properties defined by IPropertyPaneField
  public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
  public targetProperty: string;
  public properties: IPropertyFieldTermPickerPropsInternal;

  // Custom properties label: string;
  private label: string;
  private context: IWebPartContext;
  private allowMultipleSelections: boolean = false;
  private initialValues: IPickerTerms = [];
  private excludeSystemGroup: boolean = false;
  private limitByGroupNameOrID: string = null;
  private limitByTermsetNameOrID: string = null;
  private panelTitle: string;
  private hideTermStoreName: boolean;

  public onPropertyChange(propertyPath: string, oldValue: any, newValue: any): void { }
  private customProperties: any;
  private key: string;
  private disabled: boolean = false;
  private onGetErrorMessage: (value: IPickerTerms) => string | Promise<string>;
  private deferredValidationTime: number = 200;

  /**
   * Constructor method
   */
  public constructor(_targetProperty: string, _properties: IPropertyFieldTermPickerPropsInternal) {
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
    this.onGetErrorMessage = _properties.onGetErrorMessage;
    this.panelTitle = _properties.panelTitle;
    this.limitByGroupNameOrID = _properties.limitByGroupNameOrID;
    this.limitByTermsetNameOrID = _properties.limitByTermsetNameOrID;
    this.hideTermStoreName = _properties.hideTermStoreName;

    if (_properties.disabled === true) {
      this.disabled = _properties.disabled;
    }
    if (_properties.deferredValidationTime) {
      this.deferredValidationTime = _properties.deferredValidationTime;
    }
    if (typeof _properties.allowMultipleSelections !== 'undefined') {
      this.allowMultipleSelections = _properties.allowMultipleSelections;
    }
    if (typeof _properties.initialValues !== 'undefined') {
      this.initialValues = _properties.initialValues;
    }
    if (typeof _properties.excludeSystemGroup !== 'undefined') {
      this.excludeSystemGroup = _properties.excludeSystemGroup;
    }
  }

  /**
   * Renders the SPListPicker field content
   */
  private render(elem: HTMLElement, ctx?: any, changeCallback?: (targetProperty?: string, newValue?: any) => void): void {
    // Construct the JSX properties
    const element: React.ReactElement<IPropertyFieldTermPickerHostProps> = React.createElement(PropertyFieldTermPickerHost, {
      label: this.label,
      targetProperty: this.targetProperty,
      panelTitle: this.panelTitle,
      allowMultipleSelections: this.allowMultipleSelections,
      initialValues: this.initialValues,
      excludeSystemGroup: this.excludeSystemGroup,
      limitByGroupNameOrID: this.limitByGroupNameOrID,
      limitByTermsetNameOrID: this.limitByTermsetNameOrID,
      hideTermStoreName: this.hideTermStoreName,
      context: this.context,
      onDispose: this.dispose,
      onRender: this.render,
      onChange: changeCallback,
      onPropertyChange: this.onPropertyChange,
      properties: this.customProperties,
      key: this.key,
      disabled: this.disabled,
      onGetErrorMessage: this.onGetErrorMessage,
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
export function PropertyFieldTermPicker(targetProperty: string, properties: IPropertyFieldTermPickerProps): IPropertyPaneField<IPropertyFieldTermPickerPropsInternal> {
  // Calls the PropertyFieldTermPicker builder object
  // This object will simulate a PropertyFieldCustom to manage his rendering process
  return new PropertyFieldTermPickerBuilder(targetProperty, {
    ...properties,
    targetProperty: targetProperty,
    onRender: null,
    onDispose: null
  });
}
