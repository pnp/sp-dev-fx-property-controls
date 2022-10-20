import { IColor } from 'office-ui-fabric-react/lib/utilities/color';

import { IDateTimeFieldValue } from '../../PropertyFieldDateTimePicker';
import { IFilePickerResult } from '../../PropertyFieldFilePicker';
import { IFolder } from '../../PropertyFieldFolderPicker';
import { IPropertyFieldGroupOrPerson } from '../../PropertyFieldPeoplePicker';
import {
  IRoleDefinitionInformation,
} from '../../PropertyFieldRoleDefinitionPicker';
import { IPropertyFieldList } from '../../propertyFields/listPicker';
import { IRuleTreeData } from '../../propertyFields/ruleTree/IRuleTreeData';
import { IPropertyFieldSite } from '../../propertyFields/sitePicker';
import { ICustomTreeItem, BaseCustomTreeItem } from '../../propertyFields/treeCollectionData/ICustomTreeItem';
import { IPropertyFieldTeam } from '../../PropertyFieldTeamPicker';
import { IPickerTerms } from '../../PropertyFieldTermPicker';

export interface IPropertyControlsTestWebPartProps {
  siteUrl: string;
  numberValue: number;
  multiSelect: string[];
  people: IPropertyFieldGroupOrPerson[];
  singleList: string | string[] | IPropertyFieldList | IPropertyFieldList[];
  multiList: string | string[] | IPropertyFieldList | IPropertyFieldList[];
  singleListFiltered: string;
  multiListFiltered: string[];
  view: string;
  column: string;
  multiColumn: string[];
  terms: IPickerTerms;
  datetime: IDateTimeFieldValue;
  fileUrl: string;
  isColorFieldVisible: boolean;
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
  ruleTreeData: BaseCustomTreeItem<IRuleTreeData>[];
  orderedItems: any[];
  swatchColor: string;
  enterpriseTerms: IPickerTerms;
  sites: IPropertyFieldSite[];
  password: string;
  searchLibrary: string;
  message: string;
  filePickerResult: IFilePickerResult;
  roleDefinitions: IRoleDefinitionInformation[];
  folderPicker: IFolder;
  guid: string;
  teams: IPropertyFieldTeam[];
  iconPicker: string;
  editableComboBox: string;
  monacoEditor: string;
}
