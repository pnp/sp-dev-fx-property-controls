import { ITreeItem } from "@pnp/spfx-controls-react/lib/TreeView";
import { FieldValidator } from "..";

export interface ITreeCollectionDataViewerState {
  crntItems: ITreeItem[];  
  validation?: FieldValidator;
}
