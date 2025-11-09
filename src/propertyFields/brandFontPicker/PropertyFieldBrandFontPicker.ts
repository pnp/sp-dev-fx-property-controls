import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
  IPropertyPaneField,
  PropertyPaneFieldType
} from '@microsoft/sp-property-pane';
import { setPropertyValue } from '../../helpers/GeneralHelper';
import { debounce } from '../../common/util/Util';

import {
  IPropertyFieldBrandFontPickerProps,
  IPropertyFieldBrandFontPickerPropsInternal,
  IBrandFontToken
} from './IPropertyFieldBrandFontPicker';
import { IPropertyFieldBrandFontPickerHostProps } from './IPropertyFieldBrandFontPickerHost';
import PropertyFieldBrandFontPickerHost from './PropertyFieldBrandFontPickerHost';

/**
 * Represents a PropertyFieldBrandFontPicker object
 */
class PropertyFieldBrandFontPickerBuilder implements IPropertyPaneField<IPropertyFieldBrandFontPickerPropsInternal> {

  // Properties defined by IPropertyPaneField
  public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
  public targetProperty: string;
  public properties: IPropertyFieldBrandFontPickerPropsInternal;
  private elem: HTMLElement;
  private changeCB?: (targetProperty?: string, newValue?: any) => void; // eslint-disable-line @typescript-eslint/no-explicit-any
  private readonly _debounce: (fnc: any, timeout: number) => void = debounce(); // eslint-disable-line @typescript-eslint/no-explicit-any

  public constructor(_targetProperty: string, _properties: IPropertyFieldBrandFontPickerProps) {
    this.targetProperty = _targetProperty;
    this.properties = {
      key: _properties.key,
      label: _properties.label,
      targetProperty: _targetProperty,
      onPropertyChange: _properties.onPropertyChange,
      initialValue: _properties.initialValue,
      disabled: _properties.disabled,
      isHidden: _properties.isHidden,
      context: _properties.context,
      properties: _properties.properties,
      customFontTokens: _properties.customFontTokens,
      onFontTokensLoaded: _properties.onFontTokensLoaded,
      showPreview: _properties.showPreview,
      previewText: _properties.previewText,
      loadingErrorMessage: _properties.loadingErrorMessage,
      useSystemFallback: _properties.useSystemFallback,
      onRender: this.onRender.bind(this),
      onDispose: this.onDispose.bind(this)
    };
  }

  /**
   * Renders the BrandFontPicker field content
   */
  private onRender(elem: HTMLElement, ctx?: any, changeCallback?: (targetProperty?: string, newValue?: any) => void): void { // eslint-disable-line @typescript-eslint/no-explicit-any
    if (!this.elem) {
      this.elem = elem;
    }

    this.changeCB = changeCallback;
    const element: React.ReactElement<IPropertyFieldBrandFontPickerHostProps> = React.createElement(PropertyFieldBrandFontPickerHost, {
      label: this.properties.label,
      targetProperty: this.targetProperty,
      context: this.properties.context,
      initialValue: this.properties.initialValue,
      disabled: this.properties.disabled,
      onSelectionChanged: this.onSelectionChanged.bind(this),
      customFontTokens: this.properties.customFontTokens,
      onFontTokensLoaded: this.properties.onFontTokensLoaded,
      showPreview: this.properties.showPreview,
      previewText: this.properties.previewText,
      loadingErrorMessage: this.properties.loadingErrorMessage,
      useSystemFallback: this.properties.useSystemFallback
    });
    ReactDom.render(element, elem);
  }

  /**
   * Disposes the current object
   */
  private onDispose(elem: HTMLElement): void {
    ReactDom.unmountComponentAtNode(elem);
  }

  /**
   * Called when the font selection has been changed
   */
  private onSelectionChanged(option: IBrandFontToken): void {
    this._debounce(() => {
      setPropertyValue(this.properties.properties, this.targetProperty, option.value);
      this.properties.onPropertyChange(this.targetProperty, this.properties.initialValue, option.value);
      if (typeof this.changeCB !== 'undefined' && this.changeCB !== null) {
        this.changeCB(this.targetProperty, option.value);
      }
    }, 200);
  }
}

/**
 * Helper method to create a Brand Font Picker on the PropertyPane.
 * @param targetProperty - Target property the Brand Font Picker is associated to.
 * @param properties - Strongly typed Brand Font Picker properties.
 */
export function PropertyFieldBrandFontPicker(targetProperty: string, properties: IPropertyFieldBrandFontPickerProps): IPropertyPaneField<IPropertyFieldBrandFontPickerPropsInternal> {

  // Create an internal properties object from the given properties
  const newProperties: IPropertyFieldBrandFontPickerProps = {
    label: properties.label,
    onPropertyChange: properties.onPropertyChange,
    context: properties.context,
    initialValue: properties.initialValue,
    disabled: properties.disabled,
    isHidden: properties.isHidden,
    properties: properties.properties,
    customFontTokens: properties.customFontTokens,
    onFontTokensLoaded: properties.onFontTokensLoaded,
    showPreview: properties.showPreview !== false, // Default to true
    previewText: properties.previewText,
    loadingErrorMessage: properties.loadingErrorMessage,
    useSystemFallback: properties.useSystemFallback !== false, // Default to true
    key: properties.key
  };
  // Safely set the property
  setPropertyValue(newProperties.properties, targetProperty, newProperties.initialValue);

  // Create a new instance of the PropertyFieldBrandFontPickerBuilder
  return new PropertyFieldBrandFontPickerBuilder(targetProperty, newProperties);
}
