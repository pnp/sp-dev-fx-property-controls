import { ICustomCollectionField } from "../../collectionData";

export interface ITreeCollectionDataItemProps {
  fields: ICustomCollectionField[];
  index?: number;
  itemKey:string;
  itemData?: any;
  parentKey:string;
  sortingEnabled?: boolean;
  totalItems?: number;
  disableItemDeletion?: boolean;

  fAddItem?: (parent:string, item: any) => void;
  //fAddInCreation?: (item: ITreeItem, isValid: boolean) => void;
  fUpdateItem?: (key: string, item: any) => void;
  fDeleteItem?: (key: string, parentKey: string) => void;
  fValidation?: (key:string, isValid: boolean) => void;
  fOnSorting?: (parentKey: string, oldIdx: number, newIdx: number) => void;
}
