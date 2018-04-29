import { IColor } from 'office-ui-fabric-react/lib/utilities/color';

import { IDateTimeFieldValue } from '../../PropertyFieldDateTimePicker';
import { IPropertyFieldGroupOrPerson } from '../../PropertyFieldPeoplePicker';
import { IPickerTerms } from '../../PropertyFieldTermPicker';

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
  colorObj: IColor;
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
