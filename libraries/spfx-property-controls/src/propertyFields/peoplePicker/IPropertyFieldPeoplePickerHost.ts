import { IPropertyFieldGroupOrPerson, IPropertyFieldPeoplePickerPropsInternal } from './IPropertyFieldPeoplePicker';
import { IPersonaProps } from '@fluentui/react/lib/components/Persona';

/**
 * PropertyFieldPeoplePickerHost properties interface
 */
export interface IPropertyFieldPeoplePickerHostProps extends IPropertyFieldPeoplePickerPropsInternal {
  onChange: (targetProperty?: string, newValue?: any) => void; // eslint-disable-line @typescript-eslint/no-explicit-any
}

/**
 * Defines the state of the component
 */
 export interface IPeoplePickerState {

  resultsPeople?: Array<IPropertyFieldGroupOrPerson>;
  resultsPersonas?: Array<IPersonaProps>;
  errorMessage?: string;
}
