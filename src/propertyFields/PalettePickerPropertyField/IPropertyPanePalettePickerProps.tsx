import { Theme } from "@fluentui/react-components";
import { IPalette } from "./IPalette";

export interface IPropertyPanePalettePickerProps {
  label: string;
  selectedPalette: string;
  onPropertyChange: (propertyPath: string, newValue: string) => void;
  onSelectedPalette?: (palette: IPalette) => void;
  disabled?: boolean;
  key?: string;
  theme?: Theme;
  palettes:  IPalette[];  
}
