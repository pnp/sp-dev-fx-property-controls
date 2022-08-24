import { SPHttpClient } from '@microsoft/sp-http';
import { BaseComponentContext } from '@microsoft/sp-component-base';
import { IRoleDefinitionInformation, IPropertyFieldRoleDefinitionPickerHostProps } from '../propertyFields/roleDefinitionPicker';
import { ISPRoleDefinitionPickerService } from './ISPRoleDefinitionPickerService';
import { IRoleDefinitionInformationCollection } from '../propertyFields/roleDefinitionPicker';

/**
 * Service implementation to get list & list items from current SharePoint site
 */
export class SPRoleDefinitionPickerService implements ISPRoleDefinitionPickerService {
  private context: BaseComponentContext;
  private props: IPropertyFieldRoleDefinitionPickerHostProps;

  /**
   * Service constructor
   */
  constructor(_props: IPropertyFieldRoleDefinitionPickerHostProps, pageContext: BaseComponentContext) {
    this.props = _props;
    this.context = pageContext;
  }

  /**
   * Gets the collection of view for a selected list
   */
  public async getRoleDefinitions(): Promise<IRoleDefinitionInformationCollection> {

    const webAbsoluteUrl = this.props.webAbsoluteUrl ? this.props.webAbsoluteUrl : this.context.pageContext.web.absoluteUrl;

    // If the running environment is SharePoint, request the lists REST service
    const queryUrl: string = `${webAbsoluteUrl}/_api/web/RoleDefinitions`;

    const response = await this.context.spHttpClient.get(queryUrl, SPHttpClient.configurations.v1, {
      headers: [
        ['accept', 'application/json;odata=nometadata'],
        ['odata-version', '']
      ]
    });

    const roleDefinitions = (await response.json()) as IRoleDefinitionInformationCollection;

    // Check if onViewsRetrieved callback is defined
    if (this.props.onRoleDefinitionsRetrieved) {
      //Call onViewsRetrieved
      const lr = this.props.onRoleDefinitionsRetrieved(roleDefinitions.value);
      let output: IRoleDefinitionInformation[];

      //Conditional checking to see of PromiseLike object or array
      if (lr instanceof Array) {
        output = lr;
      } else {
        output = await lr;
      }

      roleDefinitions.value = output;
    }

    return roleDefinitions;
  }

  /**
   * Returns an empty view for when a list isn't selected
   */
  private getEmptyViews(): Promise<IRoleDefinitionInformationCollection> {
    return new Promise<IRoleDefinitionInformationCollection>((resolve) => {
      const roleDefinitionData: IRoleDefinitionInformationCollection = {
        value: []
      };

      resolve(roleDefinitionData);
    });
  }
}
