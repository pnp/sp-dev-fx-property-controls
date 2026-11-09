import { IRoleDefinitionInformationCollection } from "../propertyFields/roleDefinitionPicker";

export interface ISPRoleDefinitionPickerService {
  getRoleDefinitions(): Promise<IRoleDefinitionInformationCollection>;
}

