import { ISPContentTypes } from "../propertyFields/contentTypePicker";

export interface ISPContentTypePickerService {
  getContentTypes(): Promise<ISPContentTypes>;
}

