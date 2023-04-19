import { IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { ISelectableOption } from 'office-ui-fabric-react/lib/utilities/selectableOption/SelectableOption.types';
import { IRenderFunction } from 'office-ui-fabric-react/lib/Utilities';
import { CollectionIconFieldRenderMode } from './collectionIconField';


export interface ICustomDropdownOption extends Omit<IDropdownOption, 'key'>
{
  key: string | number | boolean;
}

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
  * Conditionally disable a field
  */
  disable?: (item: any) => boolean; // eslint-disable-line @typescript-eslint/no-explicit-any
  /**
   * Allows you to specify if a field is disabled for editing
   */
  disableEdit?: boolean;
  /**
   * Specify if the field is required.
   */
  required?: boolean;
  /**
   * Dropdown options. Only nescessary when dropdown type is used.
   * Options can be either a static array or a function that will calculate the values dynamically and can react to the current item.
   */
  options?: ICustomDropdownOption[] | ((fieldId: string, item: any) => ICustomDropdownOption[]); // eslint-disable-line @typescript-eslint/no-explicit-any
  /**
   * Dropdown custom options render method.
   */
  onRenderOption?: IRenderFunction<ISelectableOption>;
  /**
   * Input placeholder text.
   */
  placeholder?: string;
  /**
   * Default value for the field
   */
  defaultValue?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  /**
   * Field will start to validate after users stop typing for `deferredValidationTime` milliseconds. Default: 200ms.
   */
  deferredValidationTime?: number;
  /**
   * The method is used to get the validation error message and determine whether the input value is valid or not.
   *
   * When it returns string:
   * - If valid, it returns empty string.
   * - If invalid, the field will show a red border
   */
  onGetErrorMessage?: (value: any, index: number, currentItem: any) => string | Promise<string>; // eslint-disable-line @typescript-eslint/no-explicit-any

  /**
   * Custom field rendering support
   */
  onCustomRender?: (field: ICustomCollectionField, value: any, onUpdate: (fieldId: string, value: any) => void, item: any, rowUniqueId: string, onCustomFieldValidation: (fieldId: string, errorMessage: string) => void) => JSX.Element; // eslint-disable-line @typescript-eslint/no-explicit-any
  /**
   * Custom field visibility support
   */
  isVisible?: (field: ICustomCollectionField, items: any[]) => boolean; // eslint-disable-line @typescript-eslint/no-explicit-any

  /**
   * Icon field render mode
   */
  iconFieldRenderMode?: CollectionIconFieldRenderMode;
}

export enum CustomCollectionFieldType {
  string = 1,
  number,
  boolean,
  dropdown,
  fabricIcon,
  url,
  custom,
  color
}
