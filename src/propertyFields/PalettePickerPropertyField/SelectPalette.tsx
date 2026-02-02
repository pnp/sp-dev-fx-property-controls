import * as React from "react";

import {
  Dropdown,
  OptionGroup,
  Option,
  FluentProvider,
  Tooltip,
  Theme,
} from "@fluentui/react-components";
import { usePalettePickerStyles } from "./usePalettePickerStyles";
import { IdPrefixProvider } from "@fluentui/react-components";

import { IPalette } from "./IPalette";

export interface ISelectPaletteProps {
  selectedPalette: string;
  onPaletteChange: (palette: IPalette) => void;
  palettes: IPalette[];
  theme?: Theme;
}

export const SelectPalette: React.FunctionComponent<ISelectPaletteProps> = (
  props: React.PropsWithChildren<ISelectPaletteProps>,
) => {
  const { selectedPalette, onPaletteChange, theme, palettes = [] } = props;
  const [selected, setSelected] = React.useState<string>(selectedPalette);
  const { styles } = usePalettePickerStyles();

  React.useEffect(() => {
    setSelected(selectedPalette);
  }, [selectedPalette]);
  return (
    <IdPrefixProvider value="select-palette-">
      <FluentProvider theme={theme} applyStylesToPortals={true}>
        <div className={styles.palettePickerContainer}>
          <Dropdown
            style={{ width: "100%" }}
            aria-label="Select a palette"
            title="Select a palette"
            value={selected}
            defaultSelectedOptions={
              selected ? [selected] : [Object.keys(palettes ?? {})?.[0]]
            }
            onOptionSelect={(e, data) => {
              if (data.optionValue) {
                setSelected(data.optionValue);
                const selectedPaletteItem: IPalette = {
                  name: data.optionValue,
                  colors: ((palettes ?? {}) as Record<string, string[]>)[data.optionValue] ?? []
                };
                onPaletteChange(selectedPaletteItem);
              }
            }}
          >
            {Object.keys(palettes ?? {}).map((paletteName) => (
              <OptionGroup key={paletteName} label={paletteName}>
                {/* get the colors for the palette */}

                <Option text={paletteName} value={paletteName}>
                  <div className={styles.optionsContainer}>
                    {((palettes ?? {}) as Record<string, string[]>)[
                      paletteName
                    ]?.map((color, index) => (
                      <Tooltip
                        content={color}
                        key={index}
                        relationship={"label"}
                      >
                        <div
                          key={index}
                          className={styles.color}
                          style={{
                            backgroundColor: color,
                          }}
                        />
                      </Tooltip>
                    ))}
                  </div>
                </Option>
              </OptionGroup>
            ))}
          </Dropdown>
        </div>
      </FluentProvider>
    </IdPrefixProvider>
  );
};
