import { FluentProvider, IdPrefixProvider, Label, webLightTheme } from "@fluentui/react-components";
import * as React from "react";

import { IPalettePickerProps } from "./IPalettePickerProps";
import { IPalettePickerState } from "./IPalettePickerState";
import { SelectPalette } from "./SelectPalette";
 

export class PalettePicker extends React.Component<
  IPalettePickerProps, IPalettePickerState
> {
  constructor(props: IPalettePickerProps) {
    super(props);
    const availablePalettes = props.palettes || {};
    const firstPaletteKey = Object.keys(availablePalettes)[0] || "";
    this.state = {
      selectedPalette: props.selectedPalette || firstPaletteKey,
    };
  }

  private onPaletteChange = (palette: Record<string, string[]>): void => {
    this.setState({ selectedPalette: Object.keys(palette)[0] });
    this.props.onPropertyChange(this.props.targetProperty, Object.keys(palette)[0]);
    if (this.props.onSelectedPalette) {
      this.props.onSelectedPalette(palette);
    }
  };

  public render(): JSX.Element {
    return (
      <>
      <IdPrefixProvider value="color-selected-">
        <FluentProvider theme={this.props.theme || webLightTheme} applyStylesToPortals={true}>
        <Label>{this.props.label}</Label>
        <SelectPalette
          selectedPalette={this.state.selectedPalette}
          palettes={this.props.palettes}
          onPaletteChange={this.onPaletteChange} />
        </FluentProvider>
          </IdPrefixProvider>
      </>
    );
  }
}
