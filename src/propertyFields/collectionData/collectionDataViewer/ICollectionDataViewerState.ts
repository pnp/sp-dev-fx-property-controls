import { FieldValidator } from "..";

export interface ICollectionDataViewerState {
  crntItems: any[];
  inCreationItem?: any;
  inCreationItemValid?: boolean,
  validation?: FieldValidator;
}
