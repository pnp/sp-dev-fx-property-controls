import { IPropertyFieldIconPickerPropsInternal } from "./IPropertyFieldIconPicker";

export interface IPropertyFieldIconPickerHostProps extends IPropertyFieldIconPickerPropsInternal {
  onChange: (targetProperty?: string, newValue?: any) => void; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export interface IPropertyFieldIconPickerHostState {
  currentIcon: string;
  isPanelOpen: boolean;
}
