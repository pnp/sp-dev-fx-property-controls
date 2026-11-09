import { IColor } from '@fluentui/react';
import { BaseComponentContext } from '@microsoft/sp-component-base';

import { IDateTimeFieldValue } from '@pnp/spfx-property-controls/lib/PropertyFieldDateTimePicker';
import { IFilePickerResult } from '@pnp/spfx-property-controls/lib/PropertyFieldFilePicker';
import { IFolder } from '@pnp/spfx-property-controls/lib/PropertyFieldFolderPicker';
import {
  IPropertyFieldGroupOrPerson,
} from '@pnp/spfx-property-controls/lib/PropertyFieldPeoplePicker';
import {
  IRoleDefinitionInformation,
} from '@pnp/spfx-property-controls/lib/PropertyFieldRoleDefinitionPicker';
import { IPropertyFieldSite } from '@pnp/spfx-property-controls/lib/propertyFields/sitePicker';
import { IPickerTerms } from '@pnp/spfx-property-controls/lib/PropertyFieldTermPicker';

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
  brandFont: string;
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
  selectedPalette: string;
  selectedPaletteColors: string[];
}
