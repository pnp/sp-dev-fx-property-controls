import { ErrorMsg } from ".";

export interface ITreeCollectionDataItemState {

  crntItem: object;
  errorMsgs?: ErrorMsg[];
  showCallout?: boolean;
  isLoading: boolean;
}
