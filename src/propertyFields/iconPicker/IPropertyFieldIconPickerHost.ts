import { IPropertyFieldIconPickerPropsInternal } from "./IPropertyFieldIconPicker";

export interface IPropertyFieldIconPickerHostProps extends IPropertyFieldIconPickerPropsInternal {
  onChange: (targetProperty?: string, newValue?: any) => void;
}

export interface IPropertyFieldIconPickerHostState {
  currentIcon: string;
  items: string[];
  isPanelOpen: boolean;
}
