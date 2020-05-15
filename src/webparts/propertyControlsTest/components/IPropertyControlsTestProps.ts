import { WebPartContext } from '@microsoft/sp-webpart-base';
import { IColor } from 'office-ui-fabric-react/lib/utilities/color';

import { IDateTimeFieldValue } from '../../../PropertyFieldDateTimePicker';
import { IPropertyFieldGroupOrPerson } from '../../../PropertyFieldPeoplePicker';
import { IPickerTerms } from '../../../PropertyFieldTermPicker';
import { IPropertyFieldSite } from '../../../propertyFields/sitePicker';

export interface IPropertyControlsTestProps {
  password:string;
  context: WebPartContext;
  numberValue: number;
  multiSelect: string[];
  people: IPropertyFieldGroupOrPerson[];
  list: string | string[];
  listFiltered: string;
  multiList: string[];
  multiListFiltered: string[];
  view: string;
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
}
