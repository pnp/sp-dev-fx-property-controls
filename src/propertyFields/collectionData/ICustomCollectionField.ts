import { IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';

export interface ICustomCollectionField {
  /**
   * ID of the field.
   */
  id: string;
  /**
   * Title of the field. This will be used for the label in the table.
   */
  title: string;
  /**
   * Specifies the type of field to render.
   */
  type: CustomCollectionFieldType;
  /**
   * Specify if the field is required.
   */
  required?: boolean;
  /**
   * Dropdown options. Only nescessary when dropdown type is used.
   */
  options?: IDropdownOption[];
  /**
   * Input placeholder text.
   */
  placeholder?: string;
  /**
   * Default value for the field
   */
  defaultValue?: any;
}

export enum CustomCollectionFieldType {
  string = 1,
  number,
  boolean,
  dropdown,
  fabricIcon,
  url
}
