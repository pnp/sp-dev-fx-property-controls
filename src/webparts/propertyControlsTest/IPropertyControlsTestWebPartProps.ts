import { IPropertyFieldGroupOrPerson } from '../../PropertyFieldPeoplePicker';
import { IPickerTerms } from '../../PropertyFieldTermPicker';
import { IDateTimeFieldValue } from '../../PropertyFieldDateTimePicker';

export interface IPropertyControlsTestWebPartProps {
  numberValue: number;
  multiSelect: string[];
  people: IPropertyFieldGroupOrPerson[];
  singleList: string | string[];
  multiList: string | string[];
  terms: IPickerTerms;
  datetime: IDateTimeFieldValue;
  fileUrl: string;
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
