import { IPropertyFieldRoleDefinitionPickerPropsInternal } from './IPropertyFieldRoleDefinitionPicker';
import { IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { IRoleDefinitionInformation } from './IRoleDefinitionInformation';

/**
 * PropertyFieldRoleDefinitionPickerHost properties interface
 */
export interface IPropertyFieldRoleDefinitionPickerHostProps extends IPropertyFieldRoleDefinitionPickerPropsInternal {
  onChange: (targetProperty?: string, newValue?: any) => void;
}

/**
 * PropertyFieldRoleDefinitionPickerHost state interface
 */
export interface IPropertyFieldRoleDefinitionPickerHostState {

  results: IDropdownOption[];  
  errorMessage?: string;
  roleDefinitionInformationResult?: IRoleDefinitionInformation[];
  loading: boolean;
}
