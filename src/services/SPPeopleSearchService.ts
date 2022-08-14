import { ISPHttpClientOptions, SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { PrincipalType, IPropertyFieldGroupOrPerson } from './../propertyFields/peoplePicker/IPropertyFieldPeoplePicker';
import { ISPPeopleSearchService } from './ISPPeopleSearchService';
import { BaseComponentContext } from '@microsoft/sp-component-base';

/**
 * Service implementation to search people in SharePoint
 */
export default class SPPeopleSearchService implements ISPPeopleSearchService {
  /**
   * Search people from the SharePoint People database
   */
  public searchPeople(ctx: BaseComponentContext, query: string, principalType: PrincipalType[], siteUrl: string = null): Promise<IPropertyFieldGroupOrPerson[]> {
    // If the running env is SharePoint, loads from the peoplepicker web service
    const userRequestUrl: string = `${siteUrl ? siteUrl : ctx.pageContext.web.absoluteUrl}/_api/SP.UI.ApplicationPages.ClientPeoplePickerWebServiceInterface.clientPeoplePickerSearchUser`;
    const data = {
      'queryParams': {
        'AllowEmailAddresses': true,
        'AllowMultipleEntities': false,
        'AllUrlZones': false,
        'MaximumEntitySuggestions': 20,
        'PrincipalSource': 15,
        // PrincipalType controls the type of entities that are returned in the results.
        // Choices are All - 15, Distribution List - 2 , Security Groups - 4, SharePoint Groups - 8, User - 1.
        // These values can be combined (example: 13 is security + SP groups + users)
        'PrincipalType': !!principalType && principalType.length > 0 ? principalType.reduce((a, b) => a + b, 0) : 1,
        'QueryString': query
      }
    };

    const httpPostOptions: ISPHttpClientOptions = {
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json'
      },
      body: JSON.stringify(data)
    };

    // Do the call against the People REST API endpoint
    return ctx.spHttpClient.post(userRequestUrl, SPHttpClient.configurations.v1, httpPostOptions).then((searchResponse: SPHttpClientResponse) => {
      return searchResponse.json().then((usersResponse: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
        let res: IPropertyFieldGroupOrPerson[] = [];
        let values: any = JSON.parse(usersResponse.value); // eslint-disable-line @typescript-eslint/no-explicit-any

        // Filter out "UNVALIDATED_EMAIL_ADDRESS"
        values = values.filter(v => !(v.EntityData && v.EntityData.PrincipalType && v.EntityData.PrincipalType === "UNVALIDATED_EMAIL_ADDRESS"));
        // Filter out NULL keys
        values = values.filter(v => v.Key !== null);
        res = values.map(element => {
          let email: string | undefined;
          let groupOrPerson: IPropertyFieldGroupOrPerson | undefined;
          let group: IPropertyFieldGroupOrPerson | undefined;
          let formsRole: IPropertyFieldGroupOrPerson | undefined;
          let persona: IPropertyFieldGroupOrPerson | undefined;
          switch (element.EntityType) {
            case 'User':
              email = element.EntityData.Email !== null ? element.EntityData.Email : element.Description;
              groupOrPerson = { fullName: element.DisplayText, login: element.Description };
              groupOrPerson.id = element.Key;
              groupOrPerson.email = email;
              groupOrPerson.jobTitle = element.EntityData.Title;
              groupOrPerson.initials = this.getFullNameInitials(groupOrPerson.fullName);
              groupOrPerson.imageUrl = this.getUserPhotoUrl(groupOrPerson.email, siteUrl ? siteUrl : ctx.pageContext.web.absoluteUrl);
              return groupOrPerson;
            case 'SecGroup':
              group = {
                fullName: element.DisplayText,
                login: element.ProviderName,
                id: element.Key,
                description: element.Description,
              };
              return group;
            case 'FormsRole':
              formsRole = {
                fullName: element.DisplayText,
                login: element.ProviderName,
                id: element.Key,
                description: element.Description
              };
              return formsRole;
            default:
              persona = {
                fullName: element.DisplayText,
                login: element.EntityData.AccountName,
                id: element.EntityData.SPGroupID,
                description: element.Description
              };
              return persona;
          }
        });
        return res;
      });
    });
  }

  /**
   * Generates Initials from a full name
   */
  private getFullNameInitials(fullName: string): string {
    if (fullName === null) {
      return fullName;
    }

    const words: string[] = fullName.split(' ');
    if (words.length === 0) {
      return '';
    } else if (words.length === 1) {
      return words[0].charAt(0);
    } else {
      return (words[0].charAt(0) + words[1].charAt(0));
    }
  }

  /**
   * Gets the user photo url
   */
  private getUserPhotoUrl(userEmail: string, siteUrl: string): string {
    if (userEmail) {
      return `${siteUrl}/_layouts/15/userphoto.aspx?size=S&accountname=${encodeURIComponent(userEmail)}`;
    }
    return null;
  }
}
