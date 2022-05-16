import { ICustomCollectionField } from "../../collectionData";

export interface ITreeCollectionDataItemProps {
  fields: ICustomCollectionField[];
  index?: number;
  itemKey:string;
  itemData?: any;
  parentKey:string;
  enableSorting?: boolean;
  totalItems?: number;
  disableItemDeletion?: boolean;
  disableItemCreation?: boolean;  

  fAddItem?: (parent:string, item: any) => void;
  fUpdateItem?: (key: string, item: any) => void;
  fDeleteItem?: (key: string, parentKey: string) => void;
  fValidation?: (key:string, isValid: boolean) => void;
  fOnSorting?: (parentKey: string, oldIdx: number, newIdx: number) => void;
}
