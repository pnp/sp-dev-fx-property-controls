import { FluentProvider, IdPrefixProvider, Label, webLightTheme } from "@fluentui/react-components";
import * as React from "react";

import { IPalettePickerProps } from "./IPalettePickerProps";
import { IPalettePickerState } from "./IPalettePickerState";
import { SelectPalette } from "./SelectPalette";
import { IPalette } from "./IPalette";

export class PalettePicker extends React.Component<
  IPalettePickerProps, IPalettePickerState
> {
  constructor(props: IPalettePickerProps) {
    super(props);
    this.state = {
      selectedPalette: props.selectedPalette || "Palette 3",
    };
  }

  private onPaletteChange = (palette: IPalette): void => {
    this.setState({ selectedPalette: palette.name });
    this.props.onPropertyChange(this.props.targetProperty, palette.name);
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
