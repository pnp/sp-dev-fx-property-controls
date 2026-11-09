import { ISPColumns } from "../propertyFields/columnPicker";

export interface ISPColumnPickerService {
  getColumns(): Promise<ISPColumns>;
}

