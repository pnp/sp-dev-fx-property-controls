import { ICustomTreeCollectionField } from ".";

export interface IBaseCollectionFieldProps {
    field: ICustomTreeCollectionField;
    item: any;
    disableEdit: boolean;
  
    fOnValueChange: (fieldId: string, value: any) => void | Promise<void>;
    fValidation: (field: ICustomTreeCollectionField, value: any) => Promise<string>;
  }