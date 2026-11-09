import { IColor } from '@fluentui/react';

import { IDateTimeFieldValue } from '@pnp/spfx-property-controls/lib/PropertyFieldDateTimePicker';
import { IFilePickerResult } from '@pnp/spfx-property-controls/lib/PropertyFieldFilePicker';
import { IFolder } from '@pnp/spfx-property-controls/lib/PropertyFieldFolderPicker';
import { IPropertyFieldGroupOrPerson } from '@pnp/spfx-property-controls/lib/PropertyFieldPeoplePicker';
import {
  IRoleDefinitionInformation,
} from '@pnp/spfx-property-controls/lib/PropertyFieldRoleDefinitionPicker';
import { IPropertyFieldList } from '@pnp/spfx-property-controls/lib/propertyFields/listPicker';
import { IItem } from '@pnp/spfx-property-controls/lib/propertyFields/propertyFieldGrid/grid/IItem';
import { IPropertyFieldSite } from '@pnp/spfx-property-controls/lib/propertyFields/sitePicker';
import { IPropertyFieldTeam } from '@pnp/spfx-property-controls/lib/PropertyFieldTeamPicker';
import { IPickerTerms } from '@pnp/spfx-property-controls/lib/PropertyFieldTermPicker';

export interface IPropertyControlsTestWebPartProps {
  siteUrl: string;
  numberValue: number;
  multiSelect: string[];
  people: IPropertyFieldGroupOrPerson[];
  singleList: string | string[] | IPropertyFieldList | IPropertyFieldList[];
  multiList: string | string[] | IPropertyFieldList | IPropertyFieldList[];
  singleListFiltered: string;
  singleListMultipleBaseTemplate: string;
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
  monacoEditor:string;
  brandFont: string;
  contentType:string;
  gridItems: IItem[];
  selectedPalette: string;
  selectedPaletteColors: string[];
}
