import { IColor } from 'office-ui-fabric-react/lib/utilities/color';

import { IDateTimeFieldValue } from '../../PropertyFieldDateTimePicker';
import { IPropertyFieldGroupOrPerson } from '../../PropertyFieldPeoplePicker';
import { IPickerTerms } from '../../PropertyFieldTermPicker';
import { IPropertyFieldSite } from '../../propertyFields/sitePicker';
import { IFilePickerResult } from '../../../lib/propertyFields/filePicker/filePickerControls';

export interface IPropertyControlsTestWebPartProps {
  siteUrl: string;
  numberValue: number;
  multiSelect: string[];
  people: IPropertyFieldGroupOrPerson[];
  singleList: string | string[];
  multiList: string | string[];
  singleListFiltered: string;
  multiListFiltered: string[];
  view: string;
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
}
