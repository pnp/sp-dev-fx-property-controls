import { ICustomCollectionField } from "..";

export interface ICollectionColorFieldProps {
  field: ICustomCollectionField;
  item: any;
  disableEdit: boolean;
  fOnValueChange: (fieldId: string, value: string) => void;
}
