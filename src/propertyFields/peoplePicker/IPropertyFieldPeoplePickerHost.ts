import { IPropertyFieldGroupOrPerson, IPropertyFieldPeoplePickerPropsInternal } from './IPropertyFieldPeoplePicker';
import { IPersonaProps } from 'office-ui-fabric-react/lib/components/Persona';

/**
 * PropertyFieldPeoplePickerHost properties interface
 */
export interface IPropertyFieldPeoplePickerHostProps extends IPropertyFieldPeoplePickerPropsInternal {

  onChange: (targetProperty?: string, newValue?: any) => void;
}

/**
 * Defines the state of the component
 */
 export interface IPeoplePickerState {

  resultsPeople?: Array<IPropertyFieldGroupOrPerson>;
  resultsPersonas?: Array<IPersonaProps>;
  errorMessage?: string;
}
