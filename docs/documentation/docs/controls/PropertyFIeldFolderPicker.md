# PropertyFieldFolderPicker control

This control allows you to explore and select a folder from the propery pane.
It also allows the user to create a new folder at the current level being explored.

Here is an example of the control:


**PropertyFieldFolderPicker example usage**

![PropertyFieldFolderPicker example](../assets/folderPicker.gif)

## How to use this control in your solutions

- Check that you installed the `@pnp/spfx-property-controls` dependency. Check out The [getting started](../../#getting-started) page for more information about installing the dependency.
- Import the following modules to your webpart:

```TypeScript
import { IFolder, IPropertyFieldFolderPickerProps , PropertyFieldFolderPicker } from "@pnp/spfx-property-controls/lib/PropertyFieldFolderPicker";
```

Create a new property for your web part, for example:

```TypeScript
export interface IPropertyControlsTestWebPartProps {
  folderPicker: IFolder;
}
```

- Add the folder picker property control to the `groupFields` of the web part property pane configuration:

```TypeScript
 PropertyFieldFolderPicker('folderPicker', {
    context: this.context,
    onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
    properties: this.properties,
    key: "folderPickerId",
    label: "Folder Picker",
    selectedFolder: this.properties.folderPicker,
    canCreateFolders: true,
    onSelect: ((folder: IFolder) => { console.log(folder); this.properties.folderPicker = folder; }),
    rootFolder: {
        Name: "Documents",
        ServerRelativeUrl: "/sites/testSiteCollection/Shared Documents"
    },
}),
```

## Implementation

The `PropertyFieldFolderPicker` control can be configured with the following properties:

| Property | Type | Required | Description |
| ---- | ---- | ---- | ---- |
| context | BaseComponentContext | yes | The context object of the SPFx loaded webpart. |
| label | string | yes | The label for the control. |
| rootFolder | IFolder | yes | The lowest level folder that can be explored. This can be the root folder of a library. |
| selectedFolder | IFolder | yes | Store the results of the folder picker. |
| defaultFolder | IFolder | no | The default folder to be selected or explored. |
| properties | any | yes | Parent web part properties, this object is used to update the property value.  |
| key | string | yes | A unique key that indicates the identity of this control. |
| onPropertyChange | function | yes | Defines a onPropertyChange function to raise when the data gets changed. |
| required | boolean | no | Is selection required. |
| disabled | boolean | no | Is the control disabled. |
| canCreateFolders | boolean | no | Allow current user to create folders on the target location. If enabled, you need to ensure that the user has the required permissions. |
| onSelect | (folder: IFolder): void | no | Callback function called after a folder is selected. |


interface `IFolder`

The value returned from the selected folder object.

| Value | Type | Description |
| ---- | ---- | ---- |
| Name | string | Name of the folder. |
| ServerRelativeUrl | string | Server relative URL of the folder. |

![](https://telemetry.sharepointpnp.com/sp-dev-fx-property-controls/wiki/PropertyFieldFolderPicker)
