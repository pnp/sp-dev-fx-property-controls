import { ICustomCollectionField } from './ICustomCollectionField';

export interface IBaseCollectionFieldProps {
  field: ICustomCollectionField;
  item: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  disableEdit: boolean;

  fOnValueChange: (fieldId: string, value: any) => void | Promise<void>; // eslint-disable-line @typescript-eslint/no-explicit-any
  fValidation: (field: ICustomCollectionField, value: any) => Promise<string>; // eslint-disable-line @typescript-eslint/no-explicit-any
}
