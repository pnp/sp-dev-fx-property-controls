import { ICustomCollectionField } from ".";

export interface IBaseCollectionFieldProps {
    field: ICustomCollectionField;
    item: any;
    disableEdit: boolean;
  
    fOnValueChange: (fieldId: string, value: any) => Promise<void> | void;
    fValidation: (field: ICustomCollectionField, value: any) => Promise<string>;
  }