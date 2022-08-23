import { FieldValidator } from "../FieldValidator";

export interface ICollectionDataViewerState {
  crntItems: any[]; // eslint-disable-line @typescript-eslint/no-explicit-any
  inCreationItem?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  inCreationItemValid?: boolean;
  validation?: FieldValidator;
}
