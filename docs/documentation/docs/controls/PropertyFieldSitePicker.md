# PropertyFieldSitePicker control

This control generates a site picker that can be used in the property pane of your SharePoint Framework web parts.

**Searching for sites**

![Site picker](../assets/sitepicker.png)

**Selected sites**

![Site picker](../assets/sitepicker-selected.png)

## How to use this control in your solutions

1. Check that you installed the `@pnp/spfx-property-controls` dependency. Check out The [getting started](../../#getting-started) page for more information about installing the dependency.
2. Import the following modules to your component:

```TypeScript
import { PropertyFieldSitePicker } from '@pnp/spfx-property-controls/lib/PropertyFieldSitePicker';
```

3. Create a new property for your web part, for example:

```TypeScript
import { IPropertyFieldSite } from "@pnp/spfx-property-controls/lib/PropertyFieldSitePicker";

export interface IPropertyControlsTestWebPartProps {
  sites: IPropertyFieldSite[];
}
```

4. Add the custom property control to the `groupFields` of the web part property pane configuration:

```TypeScript
PropertyFieldSitePicker('sites', {
  label: 'Select sites',
  initialSites: this.properties.sites,
  context: this.context,
  deferredValidationTime: 500,
  multiSelect: true,
  onPropertyChange: this.onPropertyPaneFieldChanged,
  properties: this.properties,
  key: 'sitesFieldId'
})
```

## Implementation

The `PropertyFieldSitePicker` control can be configured with the following properties:

| Property | Type | Required | Description |
| ---- | ---- | ---- | ---- |
| label | string | yes | Property field label displayed on top. |
| disabled | boolean | no | Specify if the control needs to be disabled. |
| context | WebPartContext | yes | Context of the current web part. |
| initialSites | IPropertyFieldSite[] | no | Intial sites to load in the site picker (optional). |
| multiSelect | boolean | no | Define if you want to allow multiple sites selection. (optional, false by default). |
| onPropertyChange | function | yes | Defines a `onPropertyChange` function to raise when the sites get changed. |
| properties | any | yes | Parent web part properties, this object is use to update the property value. |
| key | string | yes | An unique key that indicates the identity of this control. |
| onGetErrorMessage | function | no | The method is used to get the validation error message and determine whether the input value is valid or not. See [this documentation](https://dev.office.com/sharepoint/docs/spfx/web-parts/guidance/validate-web-part-property-values) to learn how to use it. |
| deferredValidationTime | number | no | Control will start to validate after users stop typing for `deferredValidationTime` milliseconds. Default value is 200. |

Interface `IPropertyFieldSite`

| Property | Type | Required | Description |
| ---- | ---- | ---- | ---- |
| id | string | no | The ID of the site |
| title | string | no | Site's display name |
| url | string | no | URL to the site |

![](https://telemetry.sharepointpnp.com/sp-dev-fx-property-controls/wiki/PropertyFieldSitePicker)
