import { ISPViews } from "../propertyFields/viewPicker";

export interface ISPViewPickerService {
  getViews(): Promise<ISPViews>;
}

