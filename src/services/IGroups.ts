export interface IGroups {
    '@odata.context': string;
    value: IGroup[];
}

export interface IGroup {
    '@odata.type': string;
    '@odata.id': string;
    '@odata.editLink': string;
    Id: number;
    IsHiddenInUI: boolean;
    LoginName: string;
    Title: string;
    PrincipalType: number;
    Description: string;
    AllowMembersEditMembership: Boolean;
    AllowRequestToJoinLeave: Boolean;
    AutoAcceptRequestToJoinLeave: Boolean;
    OnlyAllowMembersViewMembership: Boolean;
    OwnerTitle: string;
    RequestToJoinLeaveEmailSetting: string;
}
  