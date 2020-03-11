import { ISPHttpClientOptions, SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { Environment, EnvironmentType } from '@microsoft/sp-core-library';
import { PrincipalType, IPropertyFieldGroupOrPerson } from './../propertyFields/peoplePicker/IPropertyFieldPeoplePicker';
import { ISPPeopleSearchService } from './ISPPeopleSearchService';
import SPPeoplePickerMockHttpClient from './SPPeopleSearchMockService';
import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { IUsers } from './IUsers';
import { IGroups } from './IGroups';

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
      // Check the type of action to perform (global or local)
      if (siteUrl) {
        let result: Promise<IPropertyFieldGroupOrPerson[]>;
        const apiUrlPart = "/_api/web/";
        
        // filter for principal Type
        let filterVal: string = "";
        if (principalType) {
          filterVal = `?$filter=(${principalType.map(type => `(PrincipalType eq ${type})`).join(" or ")})`;
        }

        // Filter for hidden values
        filterVal = filterVal ? `${filterVal} and (IsHiddenInUI eq false)` : `?$filter=(IsHiddenInUI eq false)`;

        // Get the SharePoint groups if principal type is specified
        if(principalType.indexOf(PrincipalType.SharePoint) > -1) {
          const sharePointRequestUrl = `${siteUrl}${apiUrlPart}sitegroups`;

          result = this.getSharePointGroups(sharePointRequestUrl, ctx, query);
        }
        
        // Get the users or security groups if specified
        if(principalType.indexOf(PrincipalType.Users) > -1 || principalType.indexOf(PrincipalType.Security) > -1) {
          const userRequestUrl = `${siteUrl}${apiUrlPart}siteusers`;

          if(result) {
            result = result.then((oldResults) => this.getSiteUsers(userRequestUrl, ctx, query, siteUrl)
            .then((results) => {
              if(oldResults) {
                return oldResults.concat(results);
              }

              return results;
            }));
          }
          else {
            result = this.getSiteUsers(userRequestUrl, ctx, query, siteUrl);
          }
        }
        
        return result;
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
                  const user: IPropertyFieldGroupOrPerson = { fullName: element.DisplayText, login: element.Description };
                  user.email = element.EntityData.Email;
                  user.jobTitle = element.EntityData.Title;
                  user.initials = this.getFullNameInitials(user.fullName);
                  user.imageUrl = this.getUserPhotoUrl(user.email, ctx.pageContext.web.absoluteUrl);
                  return user;
                case 'SecGroup':
                  const securityGroup: IPropertyFieldGroupOrPerson = {
                    fullName: element.DisplayText,
                    login: element.ProviderName,
                    id: element.Key,
                    description: element.Description
                  };
                  securityGroup.email = element.EntityData.Email;
                  securityGroup.initials = this.getFullNameInitials(securityGroup.fullName);
                  return securityGroup;
                case 'FormsRole':
                  const formsRole: IPropertyFieldGroupOrPerson = {
                    fullName: element.DisplayText,
                    login: element.ProviderName,
                    id: element.Key,
                    description: element.Description
                  };
                  formsRole.initials = this.getFullNameInitials(formsRole.fullName);
                  return formsRole;
                case 'SPGroup':
                  const spGroupRole: IPropertyFieldGroupOrPerson = {
                    fullName: element.DisplayText,
                    login: element.EntityData.AccountName,
                    id: element.EntityData.SPGroupID,
                    description: element.Description
                  };
                  spGroupRole.initials = this.getFullNameInitials(spGroupRole.fullName);
                  return spGroupRole;
                default:
                  const persona: IPropertyFieldGroupOrPerson = {
                    fullName: element.DisplayText,
                    login: element.ProviderName,
                    id: element.Key,
                    description: element.Description
                  };
                  persona.initials = this.getFullNameInitials(persona.fullName);
                  return persona;
              }
            });
            return res;
          });
        });
      }
    }
  }

  private getSiteUsers(userRequestUrl: string, ctx: IWebPartContext, query: string, siteUrl: string = null): Promise<IPropertyFieldGroupOrPerson[]> {
    userRequestUrl = `${userRequestUrl}?$filter=substringof(%27${query}%27,Title)%20or%20substringof(%27${query}%27,LoginName)`;
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
  }

  private getSharePointGroups(requestUrl: string, ctx: IWebPartContext, query: string): Promise<IPropertyFieldGroupOrPerson[]> {
    requestUrl = `${requestUrl}?$filter=substringof(%27${query}%27,Title)`;
    return ctx.spHttpClient.get(requestUrl, SPHttpClient.configurations.v1, {
      headers: {
        'Accept': 'application/json;odata.metadata=none'
      }
    })
    .then(data => data.json())
    .then((sharePointData: IGroups) => {
      if(sharePointData && sharePointData.value && sharePointData.value.length > 0) {
        let res: IPropertyFieldGroupOrPerson[] = [];

        res = sharePointData.value.map(element => ({
          fullName: element.Title,
          id: element.Id.toString(),
          login: element.LoginName,
          initials: this.getFullNameInitials(element.Title)
        } as IPropertyFieldGroupOrPerson));

        return res;
      }
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