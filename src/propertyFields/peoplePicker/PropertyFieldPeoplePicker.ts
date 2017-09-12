import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
  IPropertyPaneField,
  PropertyPaneFieldType
} from '@microsoft/sp-webpart-base';
import PropertyFieldPeoplePickerHost from './PropertyFieldPeoplePickerHost';
import { IPropertyFieldPeoplePickerHostProps } from './IPropertyFieldPeoplePickerHost';
import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { IPropertyFieldGroupOrPerson, IPropertyFieldPeoplePickerProps, IPropertyFieldPeoplePickerPropsInternal, IPrincipalType } from './IPropertyFieldPeoplePicker';

class PropertyFieldPeoplePickerBuilder implements IPropertyPaneField<IPropertyFieldPeoplePickerPropsInternal> {

  // Properties defined by IPropertyPaneField
  public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
  public targetProperty: string;
  public properties: IPropertyFieldPeoplePickerPropsInternal;

  // Custom properties
  private label: string;
  private context: IWebPartContext;
  private initialData: IPropertyFieldGroupOrPerson[];
  private allowDuplicate: boolean = true;
  private principalType: IPrincipalType[] = [];
  private onPropertyChange: (propertyPath: string, oldValue: any, newValue: any) => void;
  private customProperties: any;
  private key: string;
  private onGetErrorMessage: (value: IPropertyFieldGroupOrPerson[]) => string | Promise<string>;
  private deferredValidationTime: number = 200;
  private renderWebPart: () => void;
  private disableReactivePropertyChanges: boolean = false;

  /**
   * @function
   * Constructor
   */
  public constructor(_targetProperty: string, _properties: IPropertyFieldPeoplePickerPropsInternal) {
    this.render = this.render.bind(this);
    this.label = _properties.label;
    this.targetProperty = _properties.targetProperty;
    this.properties = _properties;
    this.properties.onDispose = this.dispose;
    this.properties.onRender = this.render;
    this.onPropertyChange = _properties.onPropertyChange;
    this.context = _properties.context;
    this.initialData = _properties.initialData;
    this.allowDuplicate = _properties.allowDuplicate;
    this.principalType = _properties.principalType;
    this.customProperties = _properties.properties;
    this.key = _properties.key;
    this.onGetErrorMessage = _properties.onGetErrorMessage;
    this.renderWebPart = _properties.render;

    if (typeof _properties.deferredValidationTime !== "undefined") {
      this.deferredValidationTime = _properties.deferredValidationTime;
    }

    if (typeof _properties.disableReactivePropertyChanges !== "undefined" && _properties.disableReactivePropertyChanges !== null) {
      this.disableReactivePropertyChanges = _properties.disableReactivePropertyChanges;
    }
  }

  /**
   * @function
   * Renders the PeoplePicker field content
   */
  private render(elem: HTMLElement, ctx?: any, changeCallback?: (targetProperty?: string, newValue?: any) => void): void {
    // Construct the JSX properties
    const element: React.ReactElement<IPropertyFieldPeoplePickerHostProps> = React.createElement(PropertyFieldPeoplePickerHost, {
      label: this.label,
      targetProperty: this.targetProperty,
      initialData: this.initialData,
      allowDuplicate: this.allowDuplicate,
      principalType: this.principalType,
      onDispose: this.dispose,
      onRender: this.render,
      onChange: changeCallback,
      onPropertyChange: this.onPropertyChange,
      context: this.context,
      properties: this.customProperties,
      key: this.key,
      onGetErrorMessage: this.onGetErrorMessage,
      deferredValidationTime: this.deferredValidationTime,
      render: this.renderWebPart,
      disableReactivePropertyChanges: this.disableReactivePropertyChanges
    });

    // Calls the REACT content generator
    ReactDom.render(element, elem);
  }

  /**
   * @function
   * Disposes the current object
   */
  private dispose(elem: HTMLElement): void { }
}

/**
 * @function
 * Helper method to create a People Picker on the PropertyPane.
 * @param targetProperty - Target property the people picker is associated to.
 * @param properties - Strongly typed people Picker properties.
 */
export function PropertyFieldPeoplePicker(targetProperty: string, properties: IPropertyFieldPeoplePickerProps): IPropertyPaneField<IPropertyFieldPeoplePickerPropsInternal> {

  // Create an internal properties object from the given properties
  var newProperties: IPropertyFieldPeoplePickerPropsInternal = {
    label: properties.label,
    targetProperty: targetProperty,
    onPropertyChange: properties.onPropertyChange,
    context: properties.context,
    initialData: properties.initialData,
    allowDuplicate: properties.allowDuplicate,
    principalType: properties.principalType,
    properties: properties.properties,
    onDispose: null,
    onRender: null,
    key: properties.key,
    onGetErrorMessage: properties.onGetErrorMessage,
    deferredValidationTime: properties.deferredValidationTime,
    render: properties.render,
    disableReactivePropertyChanges: properties.disableReactivePropertyChanges
  };
  // Calls the PropertyFieldPeoplePicker builder object
  // This object will simulate a PropertyFieldCustom to manage his rendering process
  return new PropertyFieldPeoplePickerBuilder(targetProperty, newProperties);
}
