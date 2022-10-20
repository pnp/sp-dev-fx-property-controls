import { IPropertyFieldTreeCollectionDataHostProps } from "..";

export interface ITreeCollectionDataViewerProps extends IPropertyFieldTreeCollectionDataHostProps {
  fOnSave: (items: object[]) => void;
  fOnClose: () => void;
}
