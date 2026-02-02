import { Theme } from "@fluentui/react-components";
 

export interface IPalettePickerProps {
  label: string;
  selectedPalette: string;
  onPropertyChange: (propertyPath: string, newValue: string) => void;
  onSelectedPalette?: (palette: Record<string, string[]>) => void;
  disabled?: boolean;
  targetProperty: string;
  theme?: Theme;
  palettes: Record<string, string[]>;
}
