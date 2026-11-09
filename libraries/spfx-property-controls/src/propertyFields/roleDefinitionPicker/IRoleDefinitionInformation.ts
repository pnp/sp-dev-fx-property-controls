export interface IBasePermissions {
    Low: number;
    High: number;
}

export type RoleTypeKind = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface IRoleDefinitionInformation {
    Id?: number;
    Name?: string;
    Description?: string;
    Hidden?: boolean;
    Order?: number;
    RoleTypeKind?: RoleTypeKind;
    BasePermissions?: IBasePermissions;
}
