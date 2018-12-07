import { ISPHttpClientOptions, SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { Environment, EnvironmentType } from '@microsoft/sp-core-library';
import { PrincipalType, IPropertyFieldGroupOrPerson } from './../propertyFields/peoplePicker/IPropertyFieldPeoplePicker';
import { ISPPeopleSearchService } from './ISPPeopleSearchService';
import SPPeoplePickerMockHttpClient from './SPPeopleSearchMockService';
import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { IUsers } from './IUsers';

/**
 * Service implementation to search people in SharePoint
 */
export default class SPPeopleSearchService implements ISPPeopleSearchService {
  /**
   * Search people from the SharePoint People database
   */
  public searchPeople(ctx: IWebPartContext, query: string, principalType: PrincipalType[], siteUrl: string = null): Promise<IPropertyFieldGroupOrPerson[]> {
    if (Environment.type === EnvironmentType.Local) {
      // If the running environment is local, load the data from the mock
      return this.searchPeopleFromMock(ctx, query);
    } else {
      // Check the type of action to perform (gobal or local)
      if (siteUrl) {
        let userRequestUrl = `${siteUrl}/_api/web/siteusers`;
        // filter for principal Type
        let filterVal: string = `?$filter=(substringof('${query}', Title) or substringof('${query}', LoginName))`;
        if (principalType) {
          filterVal = `${filterVal} and (${principalType.map(type => `(PrincipalType eq ${type})`).join(" or ")})`;
        }
        // Filter for hidden values
        filterVal = `${filterVal} and (IsHiddenInUI eq false)`;
        userRequestUrl = `${userRequestUrl}${filterVal}`;

        return ctx.spHttpClient.get(userRequestUrl, SPHttpClient.configurations.v1, {
          headers: {
            'Accept': 'application/json;odata.metadata=none'
          }
        })
        .then(data => data.json())
        .then((usersData: IUsers) => {
          let res: IPropertyFieldGroupOrPerson[] = [];

          if (usersData && usersData.value && usersData.value.length > 0) {
            res = usersData.value.map(element => ({
              fullName: element.Title,
              id: element.Id.toString(),
              login: element.LoginName,
              email: element.Email,
              imageUrl: this.getUserPhotoUrl(element.Email, siteUrl),
              initials: this.getFullNameInitials(element.Title)
            } as IPropertyFieldGroupOrPerson));
          }
          return res;
        });
      } else {
        // If the running env is SharePoint, loads from the peoplepicker web service
        const userRequestUrl: string = `${ctx.pageContext.web.absoluteUrl}/_api/SP.UI.ApplicationPages.ClientPeoplePickerWebServiceInterface.clientPeoplePickerSearchUser`;
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
        let httpPostOptions: ISPHttpClientOptions = {
          headers: {
            'accept': 'application/json',
            'content-type': 'application/json'
          },
          body: JSON.stringify(data)
        };

        // Do the call against the People REST API endpoint
        return ctx.spHttpClient.post(userRequestUrl, SPHttpClient.configurations.v1, httpPostOptions).then((searchResponse: SPHttpClientResponse) => {
          return searchResponse.json().then((usersResponse: any) => {
            let res: IPropertyFieldGroupOrPerson[] = [];
            const values: any = JSON.parse(usersResponse.value);
            res = values.map(element => {
              switch (element.EntityType) {
                case 'User':
                  const groupOrPerson: IPropertyFieldGroupOrPerson = { fullName: element.DisplayText, login: element.Description };
                  groupOrPerson.email = element.EntityData.Email;
                  groupOrPerson.jobTitle = element.EntityData.Title;
                  groupOrPerson.initials = this.getFullNameInitials(groupOrPerson.fullName);
                  groupOrPerson.imageUrl = this.getUserPhotoUrl(groupOrPerson.email, ctx.pageContext.web.absoluteUrl);
                  return groupOrPerson;
                case 'SecGroup':
                  const group: IPropertyFieldGroupOrPerson = {
                    fullName: element.DisplayText,
                    login: element.ProviderName,
                    id: element.Key,
                    description: element.Description
                  };
                  return group;
                case 'FormsRole':
                  const formsRole: IPropertyFieldGroupOrPerson = {
                    fullName: element.DisplayText,
                    login: element.ProviderName,
                    id: element.Key,
                    description: element.Description
                  };
                  return formsRole;
                default:
                  const persona: IPropertyFieldGroupOrPerson = {
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
    }
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
      return `${siteUrl}/_layouts/15/userphoto.aspx?size=S&accountname=${userEmail}`;
    }
    return null;
  }


  /**
   * Returns fake people results for the Mock mode
   */
  private searchPeopleFromMock(ctx: IWebPartContext, query: string): Promise<Array<IPropertyFieldGroupOrPerson>> {
    return SPPeoplePickerMockHttpClient.searchPeople(ctx.pageContext.web.absoluteUrl).then(() => {
      const results: IPropertyFieldGroupOrPerson[] = [
        { fullName: 'Katie Jordan', initials: 'KJ', jobTitle: 'VIP Marketing', email: 'katiej@contoso.com', login: 'katiej@contoso.com' },
        { fullName: 'Gareth Fort', initials: 'GF', jobTitle: 'Sales Lead', email: 'garethf@contoso.com', login: 'garethf@contoso.com' },
        { fullName: 'Sara Davis', initials: 'SD', jobTitle: 'Assistant', email: 'sarad@contoso.com', login: 'sarad@contoso.com' },
        { fullName: 'John Doe', initials: 'JD', jobTitle: 'Developer', email: 'johnd@contoso.com', login: 'johnd@contoso.com' }
      ];
      return results;
    }) as Promise<Array<IPropertyFieldGroupOrPerson>>;
  }
}
