import { Theme } from "@fluentui/react-components";
 

export interface IPropertyPanePalettePickerProps {
  label: string;
  selectedPalette: string;
  onPropertyChange: (propertyPath: string, newValue: string) => void;
  onSelectedPalette?: (palette: Record<string, string[]>) => void;
  disabled?: boolean;
  key?: string;
  theme?: Theme;
  palettes:  Record<string, string[]>;  
}
