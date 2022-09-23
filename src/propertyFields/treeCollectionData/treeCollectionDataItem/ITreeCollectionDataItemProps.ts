import { ICustomCollectionField } from "../../collectionData";
import { BaseCustomTreeItem } from "../ICustomTreeItem";

export interface ITreeCollectionDataItemProps {
  fields: ICustomCollectionField[];
  index?: number;
  level: number;
  itemKey: string;
  itemData?: BaseCustomTreeItem<object>[];
  parentKey: string;
  enableSorting?: boolean;
  totalItems?: number;
  disableItemDeletion?: boolean;
  disableItemCreation?: boolean;

  fAddItem?: (parent: string) => void;
  fUpdateItem?: (key: string, item: object) => void;
  fDeleteItem?: (key: string, parentKey: string) => void;
  fValidation?: (key: string, isValid: boolean) => void;
  fOnSorting?: (parentKey: string, oldIdx: number, newIdx: number) => void;
}
