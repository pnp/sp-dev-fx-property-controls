import { IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';

export interface ICustomCollectionField {
  id: string;
  title: string;
  type: CustomCollectionFieldType;
  required?: boolean;
  options?: IDropdownOption[];
}

export enum CustomCollectionFieldType {
  string = 1,
  number,
  boolean,
  dropdown
}
