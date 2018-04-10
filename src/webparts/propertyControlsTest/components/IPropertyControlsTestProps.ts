import { WebPartContext } from '@microsoft/sp-webpart-base';
import { IPickerTerms } from '../../../PropertyFieldTermPicker';
import { IDateTimeFieldValue } from '../../../PropertyFieldDateTimePicker';
import { IPropertyFieldGroupOrPerson } from '../../../PropertyFieldPeoplePicker';

export interface IPropertyControlsTestProps {

  context: WebPartContext;
  numberValue: number;
  multiSelect: string[];
  people: IPropertyFieldGroupOrPerson[];
  list: string | string[];
  multiList: string[];
  terms: IPickerTerms;
  datetime: IDateTimeFieldValue;
  color: string;
  spinValue: number;
  dropdownWithCalloutKey: string;
  sliderWithCalloutValue: number;
  choiceGroupWithCalloutValue: string;
  dropdownInfoHeaderKey: string;
  textInfoHeaderValue: string;
  toggleInfoHeaderValue: boolean;
  checkboxWithCalloutValue: boolean;
  htmlCode:string;
}
