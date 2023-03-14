# PropertyFieldRoleDefinitionPicker control

Role Definition picker control allows to select role definitions of a specific web via the property pane.


## Overview
The control allows a you to pick role definitions from a dropdown control. It supports role definition selection using the dropdown control of Office fabric UI with multi-select enabled. 
![Role Definition Picker overview](../assets/roleDef1.png)


**PropertyFieldRoleDefinitionPicker example usage**

![PropertyFieldFilePicker example](../assets/roleDefPicker1.gif)

## How to use this control in your solutions

- Check that you installed the `@pnp/spfx-property-controls` dependency. Check out The [getting started](../../#getting-started) page for more information about installing the dependency.
- Import the following modules to your webpart:

```TypeScript
import { IBasePermissions, IPropertyFieldRoleDefinitionPickerProps , PropertyFieldRoleDefinitionPicker, RoleTypeKind , IRoleDefinitionInformation  } from "@pnp/spfx-property-controls/lib/PropertyFieldRoleDefinitionPicker";
```

Create a new property for your web part, for example:

```TypeScript
export interface IPropertyControlsTestWebPartProps {
  roleDefinitions: IRoleDefinitionInformation[];
}
```

- Add the role definition picker property control to the `groupFields` of the web part property pane configuration:

```TypeScript
 PropertyFieldRoleDefinitionPicker('roleDefinitions', {
    context: this.context,
    label: "Role Definitions",
    roleDefinitions: this.properties.roleDefinitions,
    onPropertyChange: this.onPropertyPaneFieldChanged,
    properties: this.properties,
    key: "roleDefinitionPickerId",
    selectedRoleDefinition:["Full Control"],
    roleDefinitionsToExclude: ["System.LimitedView"],
})
```

## Implementation

The `PropertyFieldRoleDefinitionPicker` control can be configured with the following properties:

| Property | Type | Required | Description |
| ---- | ---- | ---- | ---- |
| properties | any | yes | Parent web part properties, this object is used to update the property value.  |
| key | string | yes | A unique key that indicates the identity of this control. |
| context | BaseComponentContext | yes | Current webpart context. |
| onPropertyChange | function | yes | Defines a onPropertyChange function to raise when the data gets changed. |
| label | string | no | Specifies the text describing the role definition picker. |
| webAbsoluteUrl | string | no | Absolute Web Url of target site (user requires permissions) |
| required | boolean | no | Sets the label to inform that the value is required. |
| disabled | boolean | no | Specifies if the picker button is disabled |
| roleDefinitions | IRoleDefinitionInformation[] | yes | The value of selected role definitions
| multiSelect | boolean | no | Specify if you want to have a single or multi-select role definition picker. By default this is set to `true` (multi-select role picker). |
| selectedRoleDefinition | string[] | no | Pre-selected role definitions for the picker control
| roleDefinitionsToExclude | string[] | no | Role definitions to be excluded from the picker control
| onRoleDefinitionsRetrieved | `(roleDefinitions: IRoleDefinitionInformation[]) => PromiseLike<IRoleDefinitionInformation[]> | IRoleDefinitionInformation[]` | no | Callback that is called before the dropdown is populated. |
| onGetErrorMessage | function | no | The method is used to get the validation error message and determine whether the input value is valid or not. See [this documentation](https://dev.office.com/sharepoint/docs/spfx/web-parts/guidance/validate-web-part-property-values) to learn how to use it. |


interface `IRoleDefinitionInformation`

The value returned from the selected role definition.

| Value | Type | Description |
| ---- | ---- | ---- |
| Id | number | Id of the role definition. |
| Name | string | Name of the selected role definition. |
| Description | string | Description of selected role definition. |
| Hidden | boolean | Whether selected role definition is hidden or not. |
| Order | number | Order of selected role definition. |
| RoleTypeKind | RoleTypeKind | RoleTypeKind of selected role definition. |
| BasePermissions | IBasePermissions | BasePermissions of selected role definition. |

interface `IBasePermissions`

| Value | Type |
| ---- | ---- |
| Low | number | 
| High | number |

type `RoleTypeKind`

| Value | Type |
| ---- | ---- |
| RoleTypeKind | `0 | 1 | 2 | 3 | 4 | 5 | 6 | 7` |

![](https://telemetry.sharepointpnp.com/sp-dev-fx-property-controls/wiki/PropertyFieldRoleDefinitionPicker)
