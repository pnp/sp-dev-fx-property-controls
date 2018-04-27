import { IPropertyFieldCollectionDataHostProps } from "..";

export interface ICollectionDataViewerProps extends IPropertyFieldCollectionDataHostProps {
  fOnSave: (items: any[]) => void;
  fOnClose: () => void;
}
