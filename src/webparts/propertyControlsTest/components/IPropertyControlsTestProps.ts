import { IColor } from '@fluentui/react/lib/Color';
import { BaseComponentContext } from '@microsoft/sp-component-base';

import { IDateTimeFieldValue } from '../../../PropertyFieldDateTimePicker';
import { IFilePickerResult } from '../../../PropertyFieldFilePicker';
import { IFolder } from '../../../PropertyFieldFolderPicker';
import {
  IPropertyFieldGroupOrPerson,
} from '../../../PropertyFieldPeoplePicker';
import {
  IRoleDefinitionInformation,
} from '../../../PropertyFieldRoleDefinitionPicker';
import { IPropertyFieldSite } from '../../../propertyFields/sitePicker';
import { IPickerTerms } from '../../../PropertyFieldTermPicker';

export interface IPropertyControlsTestProps {
  gridItems: any[];
  password:string;
  context: BaseComponentContext;
  numberValue: number;
  multiSelect: string[];
  people: IPropertyFieldGroupOrPerson[];
  list: string | string[];
  listFiltered: string;
  singleListMultipleBaseTemplate: string;
  multiList: string[];
  multiListFiltered: string[];
  view: string;
  column: string;
  multiColumn: string[];
  terms: IPickerTerms;
  datetime: IDateTimeFieldValue;
  color: string;
  colorObj: IColor;
  spinValue: number;
  dropdownWithCalloutKey: string;
  sliderWithCalloutValue: number;
  choiceGroupWithCalloutValue: string;
  dropdownInfoHeaderKey: string;
  textInfoHeaderValue: string;
  toggleInfoHeaderValue: boolean;
  checkboxWithCalloutValue: boolean;
  htmlCode: string;
  collectionData: any[];
  orderedItems: any[];
  swatchColor: string;
  enterpriseTerms: IPickerTerms;
  sites: IPropertyFieldSite[];
  searchLibrary: string;
  message:string;
  filePickerResult: IFilePickerResult;
  roleDefinitions: IRoleDefinitionInformation[];
  folderPicker: IFolder;
  guid: string;
  iconPicker: string;
  editableComboBox: string;
  monacoEditor:string;
  contentType: string;
}
