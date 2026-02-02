import { Theme } from "@fluentui/react-components";
import { IPalette } from "./IPalette";

export interface IPalettePickerProps {
  label: string;
  selectedPalette: string;
  onPropertyChange: (propertyPath: string, newValue: string) => void;
  onSelectedPalette?: (palette: IPalette) => void;
  disabled?: boolean;
  targetProperty: string;
  theme?: Theme;
  palettes: IPalette[];
}
