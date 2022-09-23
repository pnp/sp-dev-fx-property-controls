import { ErrorMsg } from "../collectionDataItem";

export interface IBaseCollectionDataItemState {
  crntItem: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  errorMsgs?: ErrorMsg[];
  showCallout?: boolean;
  disableAdd?: boolean;
}
