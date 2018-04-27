import { ICustomCollectionField } from "..";

export interface ICollectionDataItemProps {
  fields: ICustomCollectionField[];
  index?: number;
  item?: any;

  fAddItem?: (item: any) => void;
  fAddInCreation?: (item: any) => void;
  fUpdateItem?: (idx: number, item: any) => void;
  fdeleteItem?: (idx: number) => void;
}
