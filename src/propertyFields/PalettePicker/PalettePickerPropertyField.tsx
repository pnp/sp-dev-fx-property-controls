import * as React from "react";
import {
  IPropertyPaneField,
  PropertyPaneFieldType,
} from "@microsoft/sp-property-pane";
import * as ReactDOM from "react-dom";

import { IPalettePickerProps } from "./IPalettePickerProps";
import { PalettePicker } from "./PalettePicker";
import { IPropertyPanePalettePickerProps } from "./IPropertyPanePalettePickerProps";

export class PropertyPanePalettePicker implements IPropertyPaneField<IPropertyPanePalettePickerProps> {
  public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
  public targetProperty: string;
  public properties: IPropertyPanePalettePickerProps & {
    key?: string;
    onRender?: (elem: HTMLElement) => void;
    onDispose?: (elem: HTMLElement) => void;
  };

  constructor(
    targetProperty: string,
    properties: IPropertyPanePalettePickerProps,
  ) {
    this.targetProperty = targetProperty;
    this.properties = {
      key: properties.key,
      label: properties.label,
      selectedPalette: properties.selectedPalette,
      onPropertyChange: properties.onPropertyChange,
      onSelectedPalette: properties.onSelectedPalette,
      disabled: properties.disabled,
      palettes: properties.palettes,
      theme: properties.theme,
      onRender: this.onRender.bind(this),
      onDispose: this.onDispose.bind(this),
    };
  }

  private onRender(elem: HTMLElement): void {
    const element: React.ReactElement<IPalettePickerProps> =
      React.createElement(PalettePicker, {
        label: this.properties.label,
        selectedPalette: this.properties.selectedPalette,
        onPropertyChange: this.properties.onPropertyChange,
        onSelectedPalette: this.properties.onSelectedPalette,
        disabled: this.properties.disabled,
        targetProperty: this.targetProperty,
        palettes: this.properties.palettes,
        theme: this.properties.theme,
      });

    ReactDOM.render(element, elem);
  }

  private onDispose(elem: HTMLElement): void {
    ReactDOM.unmountComponentAtNode(elem);
  }
}

export function PropertyPanePalettePickerField(
  targetProperty: string,
  properties: IPropertyPanePalettePickerProps,
): IPropertyPaneField<IPropertyPanePalettePickerProps> {
  return new PropertyPanePalettePicker(targetProperty, properties);
}
