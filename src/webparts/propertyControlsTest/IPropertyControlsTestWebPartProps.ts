import { IPropertyFieldGroupOrPerson } from '../../PropertyFieldPeoplePicker';
import { ICheckedTerms } from '../../PropertyFieldTermPicker';
import { IDateTimeFieldValue } from '../../PropertyFieldDateTimePicker';

export interface IPropertyControlsTestWebPartProps {

  people: IPropertyFieldGroupOrPerson[];
  singleList: string | string[];
  multiList: string | string[];
  terms: ICheckedTerms;
  datetime: IDateTimeFieldValue;
  fileUrl: string;
  color: string;
  spinValue: number;
  dropdownInfoHeaderKey: string;
  textInfoHeaderValue: string;
  toggleInfoHeaderValue: boolean;
}
