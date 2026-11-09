import { IPropertyFieldCollectionDataHostProps } from '../IPropertyFieldCollectionDataHost';

export interface ICollectionDataViewerProps
  extends IPropertyFieldCollectionDataHostProps {
  fOnSave: (items: any[]) => void; // eslint-disable-line @typescript-eslint/no-explicit-any
  fOnClose: () => void;
}
