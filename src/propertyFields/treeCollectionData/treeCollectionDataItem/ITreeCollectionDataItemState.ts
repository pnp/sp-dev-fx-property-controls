import { ErrorMsg } from ".";

export interface ITreeCollectionDataItemState {
  crntItem: any;
  errorMsgs?: ErrorMsg[];
  showCallout?: boolean;  
  isLoading:boolean;  
}
