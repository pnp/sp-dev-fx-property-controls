import { ErrorMsg } from ".";

export interface IRuleTreeNodeState {
  crntItem: any;
  errorMsgs?: ErrorMsg[];
  showCallout?: boolean;
  disableAdd?: boolean;
}
