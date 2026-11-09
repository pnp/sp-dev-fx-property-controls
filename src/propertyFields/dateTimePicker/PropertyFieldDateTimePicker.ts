import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
  IPropertyPaneField,
  PropertyPaneFieldType,
} from '@microsoft/sp-property-pane';
import { DayOfWeek } from '@fluentui/react/lib/DateTimeUtilities';
import { IPropertyFieldDateTimePickerHostProps } from './IPropertyFieldDateTimePickerHost';
import PropertyFieldDateTimePickerHost from './PropertyFieldDateTimePickerHost';
import { IDateTimeFieldValue, IPropertyFieldDateTimePickerPropsInternal, TimeConvention, IPropertyFieldDateTimePickerProps, DateConvention } from './IPropertyFieldDateTimePicker';

/**
 * Represents a PropertyFieldDateTimePicker object
 */
class PropertyFieldDateTimePickerBuilder implements IPropertyPaneField<IPropertyFieldDateTimePickerPropsInternal> {
  // Properties defined by IPropertyPaneField
  public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
  public targetProperty: string;
  public properties: IPropertyFieldDateTimePickerPropsInternal;

  // Custom properties
  private label: string;
  private disabled: boolean = false;
  private initialDate: IDateTimeFieldValue;
  private formatDate: (date: Date) => string;
  private dateConvention: DateConvention;
  private timeConvention: TimeConvention;
  private firstDayOfWeek: DayOfWeek;
  private onPropertyChange: (propertyPath: string, oldValue: any, newValue: any) => void; // eslint-disable-line @typescript-eslint/no-explicit-any
  private customProperties: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  private key: string;
  private onGetErrorMessage: (value: string) => string | Promise<string>;
  private deferredValidationTime: number = 200;
  private showLabels: boolean = true;

  /**
   * Constructor
   */
  public constructor(_targetProperty: string, _properties: IPropertyFieldDateTimePickerPropsInternal) {
    this.render = this.render.bind(this);
    this.targetProperty = _properties.targetProperty;
    this.properties = _properties;
    this.label = _properties.label;
    this.initialDate = _properties.initialDate;
    this.properties.onDispose = this.dispose;
    this.properties.onRender = this.render;
    this.onPropertyChange = _properties.onPropertyChange;
    this.formatDate = _properties.formatDate;
    this.customProperties = _properties.properties;
    this.key = _properties.key;
    this.onGetErrorMessage = _properties.onGetErrorMessage;

    if (_properties.deferredValidationTime) {
      this.deferredValidationTime = _properties.deferredValidationTime;
    }

    if (typeof _properties.disabled !== 'undefined') {
      this.disabled = _properties.disabled;
    }

    if (typeof _properties.dateConvention !== 'undefined') {
      this.dateConvention = _properties.dateConvention;
    } else {
      this.dateConvention = DateConvention.DateTime;
    }

    if (typeof _properties.timeConvention !== 'undefined') {
      this.timeConvention = _properties.timeConvention;
    } else {
      this.timeConvention = TimeConvention.Hours24;
    }

    if (typeof _properties.firstDayOfWeek !== 'undefined') {
      this.firstDayOfWeek = _properties.firstDayOfWeek;
    } else {
      this.firstDayOfWeek = DayOfWeek.Sunday;
    }

    this.showLabels = _properties.showLabels;
  }

  /**
   * Renders the DatePicker field content
   */
  private render(elem: HTMLElement, ctx?: any, changeCallback?: (targetProperty?: string, newValue?: any) => void): void { // eslint-disable-line @typescript-eslint/no-explicit-any
    // Construct the JSX properties
    const element: React.ReactElement<IPropertyFieldDateTimePickerHostProps> = React.createElement(PropertyFieldDateTimePickerHost, {
      label: this.label,
      disabled: this.disabled,
      initialDate: this.initialDate,
      targetProperty: this.targetProperty,
      formatDate: this.formatDate,
      dateConvention: this.dateConvention,
      timeConvention: this.timeConvention,
      firstDayOfWeek: this.firstDayOfWeek,
      onDispose: this.dispose,
      onRender: this.render,
      onPropertyChange: this.onPropertyChange,
      onChange: changeCallback,
      properties: this.customProperties,
      key: this.key,
      onGetErrorMessage: this.onGetErrorMessage,
      deferredValidationTime: this.deferredValidationTime,
      showLabels: this.showLabels
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
 * Helper method to create the customer field on the PropertyPane.
 * @param targetProperty - Target property the custom field is associated to.
 * @param properties - Strongly typed custom field properties.
 */
export function PropertyFieldDateTimePicker(targetProperty: string, properties: IPropertyFieldDateTimePickerProps): IPropertyPaneField<IPropertyFieldDateTimePickerPropsInternal> {
  // Calls the PropertyFieldDateTimePicker builder object
  // This object will simulate a PropertyFieldCustom to manage his rendering process
  return new PropertyFieldDateTimePickerBuilder(targetProperty, {
    ...properties,
    targetProperty: targetProperty,
    onDispose: null,
    onRender: null
  });
}
