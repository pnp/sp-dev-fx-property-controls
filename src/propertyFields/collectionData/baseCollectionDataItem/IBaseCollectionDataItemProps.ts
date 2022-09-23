import { ICustomCollectionField } from "../ICustomCollectionField";

export interface IBaseCollectionDataItemProps {
  fields: ICustomCollectionField[];
  index?: number;
  item?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  sortingEnabled?: boolean;
  totalItems?: number;
  disableItemDeletion?: boolean;

  fAddItem?: (item: any) => void; // eslint-disable-line @typescript-eslint/no-explicit-any
  fAddInCreation?: (item: any, isValid: boolean) => void; // eslint-disable-line @typescript-eslint/no-explicit-any
  fUpdateItem?: (idx: number, item: any) => void; // eslint-disable-line @typescript-eslint/no-explicit-any
  fDeleteItem?: (idx: number) => void;
  fValidation?: (idx: number, isValid: boolean) => void;
  fOnSorting?: (oldIdx: number, newIdx: number) => void;
}
