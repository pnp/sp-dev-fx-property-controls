import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
  IPropertyPaneField,
  PropertyPaneFieldType
} from '@microsoft/sp-property-pane';
import { BaseComponentContext } from '@microsoft/sp-component-base';
import PropertyFieldContentTypePickerHost from './PropertyFieldContentTypePickerHost';
import { IPropertyFieldContentTypePickerHostProps } from './IPropertyFieldContentTypePickerHost';
import { PropertyFieldContentTypeOrderBy, IPropertyFieldContentTypePickerProps, IPropertyFieldContentTypePickerPropsInternal } from './IPropertyFieldContentTypePicker';
import { ISPContentType } from '.';

/**
 * Represents a PropertyFieldContentTypePicker object
 */
class PropertyFieldContentTypePickerBuilder implements IPropertyPaneField<IPropertyFieldContentTypePickerPropsInternal> {

  //Properties defined by IPropertyPaneField
  public properties: IPropertyFieldContentTypePickerPropsInternal;
  public targetProperty: string;
  public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;

  //Custom properties label: string;
  private context: BaseComponentContext;
  private label: string;
  private listId?: string;
  private selectedContentType: string;
  private orderBy: PropertyFieldContentTypeOrderBy;
  private contentTypesToExclude: string[];

  private customProperties: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  private deferredValidationTime: number = 200;
  private disabled: boolean = false;
  private disableReactivePropertyChanges: boolean = false;
  private filter: string;
  private key: string;
  private webAbsoluteUrl?: string;
  private onGetErrorMessage: (value: string) => string | Promise<string>;
  private onContentTypesRetrieved?: (contentTypes: ISPContentType[]) => PromiseLike<ISPContentType[]> | ISPContentType[];
  public onPropertyChange(propertyPath: string, oldValue: any, newValue: any): void { /* no-op; */ } // eslint-disable-line @typescript-eslint/no-explicit-any
  private renderWebPart: () => void;

  /**
   * Constructor method
   */
  public constructor(_targetProperty: string, _properties: IPropertyFieldContentTypePickerPropsInternal) {
    this.render = this.render.bind(this);
    this.targetProperty = _targetProperty;
    this.properties = _properties;
    this.properties.onDispose = this.dispose;
    this.properties.onRender = this.render;
    this.label = _properties.label;
    this.context = _properties.context;
    this.webAbsoluteUrl = _properties.webAbsoluteUrl;
    this.listId = _properties.listId;
    this.selectedContentType = _properties.selectedContentType;
    this.onPropertyChange = _properties.onPropertyChange;
    this.customProperties = _properties.properties;
    this.key = _properties.key;
    this.orderBy = _properties.orderBy;
    this.contentTypesToExclude = _properties.contentTypesToExclude;
    this.filter = _properties.filter;
    this.onGetErrorMessage = _properties.onGetErrorMessage;
    this.onContentTypesRetrieved = _properties.onContentTypesRetrieved;

    if (_properties.disabled === true) {
      this.disabled = _properties.disabled;
    }
    if (_properties.deferredValidationTime) {
      this.deferredValidationTime = _properties.deferredValidationTime;
    }
  }

  /**
   * Renders the SPContentTypePicker field content
   */
  private render(elem: HTMLElement, ctx?: any, changeCallback?: (targetProperty?: string, newValue?: any) => void): void { // eslint-disable-line @typescript-eslint/no-explicit-any
    const componentProps: IPropertyFieldContentTypePickerHostProps = {
      label: this.label,
      targetProperty: this.targetProperty,
      context: this.context,
      webAbsoluteUrl: this.webAbsoluteUrl,
      listId: this.listId,
      orderBy: this.orderBy,
      onDispose: this.dispose,
      onRender: this.render,
      onChange: changeCallback,
      onPropertyChange: this.onPropertyChange,
      properties: this.customProperties,
      key: this.key,
      disabled: this.disabled,
      onGetErrorMessage: this.onGetErrorMessage,
      deferredValidationTime: this.deferredValidationTime,
      contentTypesToExclude: this.contentTypesToExclude,
      filter: this.filter,
      onContentTypesRetrieved: this.onContentTypesRetrieved
    };

      // Single selector
      componentProps.selectedContentType = this.selectedContentType;
      const element: React.ReactElement<IPropertyFieldContentTypePickerHostProps> = React.createElement(PropertyFieldContentTypePickerHost, componentProps);
      // Calls the REACT content generator
      ReactDom.render(element, elem);
  }

  /**
   * Disposes the current object
   */
  private dispose(_elem: HTMLElement): void {
    // no-op;
  }

}

/**
 * Helper method to create a SPContentType Picker on the PropertyPane.
 * @param targetProperty - Target property the SharePoint ContentType picker is associated to.
 * @param properties - Strongly typed SPContentType Picker properties.
 */
export function PropertyFieldContentTypePicker(targetProperty: string, properties: IPropertyFieldContentTypePickerProps): IPropertyPaneField<IPropertyFieldContentTypePickerPropsInternal> {

  //Create an internal properties object from the given properties
  const newProperties: IPropertyFieldContentTypePickerPropsInternal = {
    label: properties.label,
    targetProperty: targetProperty,
    context: properties.context,
    listId: properties.listId,
    selectedContentType: typeof properties.selectedContentType === 'string' ? properties.selectedContentType : null,
    onPropertyChange: properties.onPropertyChange,
    properties: properties.properties,
    onDispose: null,
    onRender: null,
    key: properties.key,
    disabled: properties.disabled,
    contentTypesToExclude: properties.contentTypesToExclude,
    webAbsoluteUrl: properties.webAbsoluteUrl,
    filter: properties.filter,
    onGetErrorMessage: properties.onGetErrorMessage,
    deferredValidationTime: properties.deferredValidationTime,
    onContentTypesRetrieved: properties.onContentTypesRetrieved
  };
  //Calls the PropertyFieldContentTypePicker builder object
  //This object will simulate a PropertyFieldCustom to manage his rendering process
  return new PropertyFieldContentTypePickerBuilder(targetProperty, newProperties);
}
