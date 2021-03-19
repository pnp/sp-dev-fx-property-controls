import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
  IPropertyPaneField,
  PropertyPaneFieldType
} from '@microsoft/sp-property-pane';
import { BaseComponentContext } from '@microsoft/sp-component-base';
import PropertyFieldFolderPickerHost from './PropertyFieldFolderPickerHost';
import { IPropertyFieldFolderPickerHostProps } from './IPropertyFieldFolderPickerHost';
import { IPropertyFieldFolderPickerProps, IPropertyFieldFolderPickerPropsInternal } from './IPropertyFieldFolderPicker';
import { IFolder } from '../../services/IFolderExplorerService';

/**
 * Represents a PropertyFieldFolderPickerPicker object
 */
class PropertyFieldFolderPickerBuilder implements IPropertyPaneField<IPropertyFieldFolderPickerPropsInternal> {

  //Properties defined by IPropertyPaneField
  public properties: IPropertyFieldFolderPickerPropsInternal;
  public targetProperty: string;
  public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;

  //Custom properties label: string;
  private context: BaseComponentContext;
  private label: string;

  private customProperties: any;
  private disabled: boolean = false;
  private key: string;

  private rootFolder: IFolder;
  private defaultFolder: IFolder;

  private required: boolean = false;
  private canCreateFolders: boolean = false;
  private selectedFolder: IFolder;

  private onPropertyChange: (propertyPath: string, oldValue: any, newValue: any) => void;
  private onSelect: (folder: IFolder) => void;


  /**
   * Constructor method
   */
  public constructor(_targetProperty: string, _properties: IPropertyFieldFolderPickerPropsInternal) {

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
    this.rootFolder = _properties.rootFolder;
    this.defaultFolder = _properties.defaultFolder;
    this.onSelect = _properties.onSelect;

    this.onPropertyChange = _properties.onPropertyChange;
    this.customProperties = _properties.properties;

    if(_properties.required === true){
        this.required = _properties.required;
    }

    if (_properties.disabled === true) {
      this.disabled = _properties.disabled;
    }

    if(_properties.canCreateFolders === true){
        this.canCreateFolders = _properties.canCreateFolders;
    }
  }

  /**
   * Renders the FolderPickerPicker field content
   */
  private render(elem: HTMLElement, ctx?: any, changeCallback?: (targetProperty?: string, newValue?: any) => void): void {

    const element: React.ReactElement<IPropertyFieldFolderPickerHostProps> = React.createElement(PropertyFieldFolderPickerHost, {
        label: this.label,
        targetProperty: this.targetProperty,
        context: this.context,
        rootFolder: this.rootFolder,
        defaultFolder: this.defaultFolder,
        onSelect: this.onSelect,
        required: this.required,
        canCreateFolders: this.canCreateFolders,
        onDispose: this.dispose,
        onRender: this.render,
        onChange: changeCallback,
        onPropertyChange: this.onPropertyChange,
        properties: this.customProperties,
        key: this.key,
        disabled: this.disabled,
        selectedFolder: this.selectedFolder
    });

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
export function PropertyFieldFolderPicker(targetProperty: string, properties: IPropertyFieldFolderPickerProps): IPropertyPaneField<IPropertyFieldFolderPickerPropsInternal> {

  //Create an internal properties object from the given properties
  const newProperties: IPropertyFieldFolderPickerPropsInternal = {
    label: properties.label,
    targetProperty: targetProperty,
    context: properties.context,
    onPropertyChange: properties.onPropertyChange,
    properties: properties.properties,
    onDispose: null,
    onRender: null,
    key: properties.key,
    disabled: properties.disabled,
    onSelect: properties.onSelect,
    rootFolder: properties.rootFolder,
    canCreateFolders: properties.canCreateFolders,
    defaultFolder: properties.defaultFolder,
    required: properties.required,
    selectedFolder: properties.selectedFolder
  };
  //Calls the PropertyFieldFolderPickerPicker builder object
  //This object will simulate a PropertyFieldCustom to manage his rendering process
  return new PropertyFieldFolderPickerBuilder(targetProperty, newProperties);
}
