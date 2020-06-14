# PropertyFieldFilePicker control

File picker control allows to browse and select a file from various places.
Currently supported locations
- Recent files - tab allows to select a file from recently modified files based on the search results.
- Web search - tab uses Bing cognitive services to look for a file. (Only images)
- OneDrive - tab allows to select a file from the user's One Drive.
- Site document libraries - tab allows to select a file from the existing site document libraries.
- Upload - tab allows to upload a file from local drive.
- From a link - tab allows to paste a link to the document.

## Overview
The control supports all types of file, however it also allows to specify list of extensions for the files that are going to be looked displayed. Currently, only single file selection is supported. 
![File Picker overview](../assets/FilePickerOverview.png)


## Different display types
File picker support 3 types of views : List, Compact list and Tiles. In case Tiles view is selected, the control shows the thumbnail of the file.
![File Picker views](../assets/FilePickerViews.gif)


## Breadcrumb support
The control displays breadcrumb navigation that allows to easily switch folders or document libraries.
![File Picker breadcrumb](../assets/FilePickerBreadcrumb.gif)

## Paged data load
File picker doesn't load all the files that exist in the folder. Instead, it allows to specify how many results are loaded in a batch, and executes paged requests when new data is required.
![File Picker paged data load](../assets/FilePickerPaging.gif)

**PropertyFieldFilePicker example usage**

![PropertyFieldFilePicker example](../assets/filePicker.gif)

## How to use this control in your solutions

- Check that you installed the `@pnp/spfx-property-controls` dependency. Check out The [getting started](../../#getting-started) page for more information about installing the dependency.
- Import the following modules to your component:

```TypeScript
import { PropertyFieldFilePicker, IPropertyFieldFilePickerProps, IFilePickerResult } from "../../PropertyFieldFilePicker";
```

Create a new property for your web part, for example:

```TypeScript
import { IFilePickerResult } from "@pnp/spfx-property-controls/lib/PropertyFieldDateTimePicker";

export interface IPropertyControlsTestWebPartProps {
  filePickerResult: IFilePickerResult;
}
```

- Add the file picker property control to the `groupFields` of the web part property pane configuration:

```TypeScript
 PropertyFieldFilePicker('filePicker', {
    context: this.context,
    filePickerResult: this.properties.filePickerResult,
    onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
    properties: this.properties,
    onSave: (e: IFilePickerResult) => { console.log(e); this.properties.filePickerResult = e;  },
    onChanged: (e: IFilePickerResult) => { console.log(e); this.properties.filePickerResult = e; },
    key: "filePickerId",
    buttonLabel: "File Picker",
    label: "File Picker",                  
})
```

## Implementation

The `PropertyFieldFilePicker` control can be configured with the following properties:

| Property | Type | Required | Description |
| ---- | ---- | ---- | ---- |
| properties | any | yes | Parent web part properties, this object is used to update the property value.  |
| key | string | yes | A unique key that indicates the identity of this control. |
| context | WebPartContext | yes | Current webpart context. |
| onPropertyChange | function | yes | Defines a onPropertyChange function to raise when the data gets changed. |
| label | string | no | Specifies the text describing the file picker. |
| buttonLabel | string | no | Specifies the label of the file picker button. |
| buttonIcon | string | no | In case it is provided the file picker will be rendered as an action button. |
| onSave | (filePickerResult: IFilePickerResult) => void | yes | Handler when the file has been selected and picker has been closed. |
| onChange | (filePickerResult: IFilePickerResult) => void | no | Handler when the file selection has been changed. |
| accepts | string[] | no | Array of strings containing allowed files extensions. E.g. [".gif", ".jpg", ".jpeg", ".bmp", ".dib", ".tif", ".tiff", ".ico", ".png", ".jxr", ".svg"] |
| required | boolean | no | Sets the label to inform that the value is required. |
| bingAPIKey | string | no | Used to execute WebSearch. If not provided SearchTab will not be available. |
| disabled | boolean | no | Specifies if the picker button is disabled |
| itemsCountQueryLimit | number | no | Number of items to obtain when executing REST queries. Default 100. |
| hideRecentTab | boolean | no | Specifies if RecentTab should be hidden. |
| hideWebSearchTab | boolean | no | Specifies if WebSearchTab should be hidden. |
| hideOrganisationalAssetTab | boolean | no | Specifies if OrganisationalAssetTab should be hidden. |
| hideOneDriveTab | boolean | no | Specifies if OneDriveTab should be hidden. |
| hideSiteFilesTab | boolean | no | Specifies if SiteFilesTab should be hidden. |
| hideLocalUploadTab | boolean | no | Specifies if LocalUploadTab should be hidden. |
| hideLinkUploadTab | boolean | no | Specifies if LinkUploadTab should be hidden. |
| storeLastActiveTab | boolean | no | Specifies if last active tab will be stored after the Upload panel has been closed. Note: the value of selected tab is stored in the queryString hash. Default `true` |

interface `IFilePickerResult`

The value returned from the selected file object.

| Value | Type | Description |
| ---- | ---- | ---- |
| fileName | string | File name of the result with the extension. |
| fileNameWithoutExtension | string | File name of the result without the extension. |
| fileAbsoluteUrl | string | Absolute URL of the file. Null in case of file upload. |
| downloadFileContent | () => Promise<File> | Function allows to download file content. Returns File object. |


![](https://telemetry.sharepointpnp.com/sp-dev-fx-property-controls/wiki/PropertyFieldFilePicker)
