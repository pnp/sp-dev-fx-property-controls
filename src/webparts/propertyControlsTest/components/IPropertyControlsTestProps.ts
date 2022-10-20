import { IColor } from 'office-ui-fabric-react/lib/utilities/color';

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
import { ICustomTreeItem, BaseCustomTreeItem } from '../../../propertyFields/treeCollectionData/ICustomTreeItem';

export interface IPropertyControlsTestProps {
  password: string;
  context: BaseComponentContext;
  numberValue: number;
  multiSelect: string[];
  people: IPropertyFieldGroupOrPerson[];
  list: string | string[];
  listFiltered: string;
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
  treeCollectionData: BaseCustomTreeItem<object>[];
  ruleTreeData: any[];
  orderedItems: any[];
  swatchColor: string;
  enterpriseTerms: IPickerTerms;
  sites: IPropertyFieldSite[];
  searchLibrary: string;
  message: string;
  filePickerResult: IFilePickerResult;
  roleDefinitions: IRoleDefinitionInformation[];
  folderPicker: IFolder;
  guid: string;
  iconPicker: string;
  editableComboBox: string;
  monacoEditor: string;
}
