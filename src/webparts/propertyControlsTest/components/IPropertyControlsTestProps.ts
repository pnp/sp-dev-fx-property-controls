import { WebPartContext } from '@microsoft/sp-webpart-base';
import { ICheckedTerms } from '../../../PropertyFieldTermPicker';
import { IDateTimeFieldValue } from '../../../PropertyFieldDateTimePicker';
import { IPropertyFieldGroupOrPerson } from '../../../PropertyFieldPeoplePicker';

export interface IPropertyControlsTestProps {

  context: WebPartContext;
  people: IPropertyFieldGroupOrPerson[];
  list: string | string[];
  multiList: string[];
  terms: ICheckedTerms;
  datetime: IDateTimeFieldValue;
  singleValue: string;
  multiValue: string[];
  multiValueHeader: string[];
}
