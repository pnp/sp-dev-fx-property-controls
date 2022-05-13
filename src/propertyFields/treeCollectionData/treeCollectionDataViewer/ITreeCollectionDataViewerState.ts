import { ITreeItem } from "@pnp/spfx-controls-react/lib/TreeView";
import { FieldValidator } from "../../collectionData/FieldValidator";

export interface ITreeCollectionDataViewerState {
  crntItems: ITreeItem[];  
  validation?: FieldValidator;
  isLoading:boolean;
}
