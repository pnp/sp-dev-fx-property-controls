import { ICustomCollectionField } from "..";

export interface ICollectionIconFieldProps {
  field: ICustomCollectionField;
  item: any;

  fOnValueChange: (fieldId: string, value: any) => void;
}
