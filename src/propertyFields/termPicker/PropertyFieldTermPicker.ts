import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
  IPropertyPaneField,
  PropertyPaneFieldType
} from '@microsoft/sp-property-pane';
import { BaseComponentContext } from '@microsoft/sp-component-base';
import PropertyFieldTermPickerHost from './PropertyFieldTermPickerHost';
import { IPropertyFieldTermPickerHostProps } from './IPropertyFieldTermPickerHost';
import { IPropertyFieldTermPickerPropsInternal, IPropertyFieldTermPickerProps, IPickerTerms } from './IPropertyFieldTermPicker';
import { ISPTermStorePickerService } from '../../services/ISPTermStorePickerService';
import SPTermStorePickerService from '../../services/SPTermStorePickerService';

/**
 * Represents a PropertyFieldTermPicker object.
 * NOTE: INTERNAL USE ONLY
 * @internal
 */
export class PropertyFieldTermPickerBuilder implements IPropertyPaneField<IPropertyFieldTermPickerPropsInternal> {
  // Properties defined by IPropertyPaneField
  public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
  public targetProperty: string;
  public properties: IPropertyFieldTermPickerPropsInternal;

  // Custom properties label: string;
  private label: string;
  private context: BaseComponentContext;
  private allowMultipleSelections: boolean = false;
  private initialValues: IPickerTerms = [];
  private excludeSystemGroup: boolean = false;
  private limitByGroupNameOrID: string = null;
  private limitByTermsetNameOrID: string = null;
  private panelTitle: string;
  private hideTermStoreName: boolean;
  private isTermSetSelectable: boolean;
  private areTermsSelectable: boolean = true;
  private areTermsHidden: boolean;
  private disabledTermIds: string[];
  private termService: ISPTermStorePickerService;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public onPropertyChange(propertyPath: string, oldValue: any, newValue: any): void { /* no-op; */ }
  private customProperties: any; // eslint-disable-line @typescript-eslint/no-explicit-any
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
    this.isTermSetSelectable = _properties.isTermSetSelectable;
    this.areTermsHidden = _properties.areTermsHidden;
    this.disabledTermIds = _properties.disabledTermIds;
    this.termService = _properties.termService;

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
    if (typeof _properties.areTermsSelectable !== 'undefined') {
      this.areTermsSelectable =_properties.areTermsSelectable;
    }
  }

  /**
   * Renders the SPListPicker field content
   */
  private render(elem: HTMLElement, ctx?: any, changeCallback?: (targetProperty?: string, newValue?: any) => void): void { // eslint-disable-line @typescript-eslint/no-explicit-any
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
      isTermSetSelectable: this.isTermSetSelectable,
      areTermsSelectable: this.areTermsSelectable,
      areTermsHidden: this.areTermsHidden,
      disabledTermIds: this.disabledTermIds,
      context: this.context,
      onDispose: this.dispose,
      onRender: this.render,
      onChange: changeCallback,
      onPropertyChange: this.onPropertyChange,
      properties: this.customProperties,
      key: this.key,
      disabled: this.disabled,
      onGetErrorMessage: this.onGetErrorMessage,
      deferredValidationTime: this.deferredValidationTime,
      termService: this.termService
    });

    // Calls the REACT content generator
    ReactDom.render(element, elem);
  }

  /**
   * Disposes the current object
   */
  private dispose(elem: HTMLElement): void {
    // no-op;
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
    onDispose: null,
    termService: new SPTermStorePickerService(properties, properties.context)
  });
}
