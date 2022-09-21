import {
    IPropertyPaneCustomFieldProps,
  } from '@microsoft/sp-property-pane';
import { IconSelectorRenderOption } from '../../common/Types';
  
  export interface IPropertyFieldIconPickerProps {
    key: string;
    /**
     * call-back function when icon selection has been confirmed
     */
    onSave:(iconName: string) => void;
    /**
     * call-back function when icon has changed
     */
    onChanged?:(iconName: string) => void;
    /**
     * Specifies the label of the icon picker button
     */
    buttonLabel?: string;
    /**
     * Specifies if the picker button is disabled
     */
    disabled?: boolean;
    /**
     * Specifies a custom className for the picker button
     */
    buttonClassName?: string;
    /**
     * Specifies a custom className for the panel element
     */
    panelClassName?: string;
    /**
     * initially selected icon
     */
    currentIcon?: string;
     /**
     * Render option:  panel, dialog
     */
    renderOption?: IconSelectorRenderOption;
    /**
   * Defines a onPropertyChange function to raise when the selected value changed.
   * Normally this function must be always defined with the 'this.onPropertyChange'
   * method of the web part object.
   */
    onPropertyChange(propertyPath: string, oldValue: any, newValue: any): void; // eslint-disable-line @typescript-eslint/no-explicit-any
    /**
     * Parent Web Part properties
     */
    properties: any; // eslint-disable-line @typescript-eslint/no-explicit-any
    /**
     * Specifies the text describing the file picker
     */
    label?: string;
  }
  
  export interface IPropertyFieldIconPickerPropsInternal extends IPropertyFieldIconPickerProps , IPropertyPaneCustomFieldProps{
    targetProperty: string;
    onRender(elem: HTMLElement): void;
    onDispose(elem: HTMLElement): void;
  }
  