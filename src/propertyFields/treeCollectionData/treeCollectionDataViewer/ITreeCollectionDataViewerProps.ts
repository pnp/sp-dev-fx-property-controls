import { IPropertyFieldTreeCollectionDataHostProps } from "..";

export interface ITreeCollectionDataViewerProps extends IPropertyFieldTreeCollectionDataHostProps {
  fOnSave: (items: any[]) => void;
  fOnClose: () => void;  
}
