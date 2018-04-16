# PropertyFieldTermPicker control

This control generates a term picker that can be used in the property pane of your SharePoint Framework web parts.

> **Disclaimer**: This control makes use of the `ProcessQuery` API end-points to retrieve the managed metadata information. This will get changed once the APIs for managing managed metadata will become available.

**Empty term picker**

![Empty term picker](../assets/termpicker-empty.png)

**Selecting terms**

![Selecting terms](../assets/termpicker-group.png)

**Selected terms in the panel**

![Selected terms in the panel](../assets/termpicker-selected.png)

**Empty term picker**

![Selected terms in the input](../assets/termpicker-selected-terms.png)

**Term picker: Auto Complete**

![Selected terms in the input](../assets/termpicker-autocomplete.png)

**Limit the term set to a specific group or termset**

![Limit to a group or termset](../assets/termpicker-limit-to-group.png)

## How to use this control in your solutions

1. Check that you installed the `@pnp/spfx-property-controls` dependency. Check out The [getting started](../#getting-started) page for more information about installing the dependency.
2. Import the following modules to your component:

```TypeScript
import { PropertyFieldTermPicker } from '@pnp/spfx-property-controls/lib/PropertyFieldTermPicker';
```

3. Create a new property for your web part, for example:

```TypeScript
import { IPickerTerms } from "@pnp/spfx-property-controls/lib/PropertyFieldTermPicker";

export interface IPropertyControlsTestWebPartProps {
  terms: IPickerTerms;
}
```

4. Add the custom property control to the `groupFields` of the web part property pane configuration:

```TypeScript
PropertyFieldTermPicker('terms', {
  label: 'Select terms',
  panelTitle: 'Select terms',
  initialValues: this.properties.terms,
  allowMultipleSelections: true,
  excludeSystemGroup: false,
  onPropertyChange: this.onPropertyPaneFieldChanged,
  properties: this.properties,
  context: this.context,
  onGetErrorMessage: null,
  deferredValidationTime: 0,
  limitByGroupNameOrID: 'People',
  limitByTermsetNameOrID: 'Location',
  key: 'termSetsPickerFieldId'
})
```

## Implementation

The `PropertyFieldTermPicker` control can be configured with the following properties:

| Property | Type | Required | Description |
| ---- | ---- | ---- | ---- |
| label | string | yes | Property field label displayed on top. |
| panelTitle | string | yes | TermSet Picker Panel title. |
| disabled | boolean | no | Specify if the control needs to be disabled. |
| context | WebPartContext | yes | Context of the current web part. |
| initialValues | IPickerTerms | no | Defines the selected by default term sets. |
| allowMultipleSelections | boolean | no | Defines if the user can select only one or many term sets. Default value is false. |
| excludeSystemGroup | boolean | no | Indicator to define if the system Groups are exclude. Default is false. |
| limitByGroupNameOrID | string | no | Limit the term sets that can be used by the group name or ID. |
| limitByTermsetNameOrID | string | no | Limit the terms that can be picked by the Term Set name or ID. |
| hideTermStoreName | boolean | no | Specifies if you want to show or hide the term store name from the panel. |
| onPropertyChange | function | yes | Defines a onPropertyChange function to raise when the date gets changed. |
| properties | any | yes | Parent web part properties, this object is use to update the property value.  |
| key | string | yes | An unique key that indicates the identity of this control. |
| onGetErrorMessage | function | no | The method is used to get the validation error message and determine whether the input value is valid or not. See [this documentation](https://dev.office.com/sharepoint/docs/spfx/web-parts/guidance/validate-web-part-property-values) to learn how to use it. |
| deferredValidationTime | number | no | Control will start to validate after users stop typing for `deferredValidationTime` milliseconds. Default value is 200. |

Interface `IPickerTerms`

| Property | Type | Required | Description |
| ---- | ---- | ---- | ---- |
| key | string | yes | The ID of the term |
| name | string | yes | The name of the term |
| path | string | yes | The path of the term |
| termSet | string | yes | The Id of the parent term set of the term |
| termSetName | string | no | The Name of the parent term set of the term |


![](https://telemetry.sharepointpnp.com/sp-dev-fx-property-controls/wiki/PropertyFieldTermPicker)
