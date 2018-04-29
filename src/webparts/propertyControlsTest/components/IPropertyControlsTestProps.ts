import { WebPartContext } from '@microsoft/sp-webpart-base';
import { IColor } from 'office-ui-fabric-react/lib/utilities/color';

import { IDateTimeFieldValue } from '../../../PropertyFieldDateTimePicker';
import { IPropertyFieldGroupOrPerson } from '../../../PropertyFieldPeoplePicker';
import { IPickerTerms } from '../../../PropertyFieldTermPicker';

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
