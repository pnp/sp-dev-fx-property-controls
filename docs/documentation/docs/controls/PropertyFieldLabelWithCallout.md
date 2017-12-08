# PropertyFieldLabelWithCallout control

This control generates a label control with a callout.

**PropertyFieldLabelWithCallout rendering**

![Button field with callout](../assets/labelfieldwithcallout.png)


**PropertyFieldLabelWithCallout callout opened**

![Button field with callout opened](../assets/labelfieldwithcallout-open.png)

## How to use this control in your solutions

1. Check that you installed the `@pnp/spfx-property-controls` dependency. Check out The [getting started](../getting-started) page for more information about installing the dependency.
2. Import the following modules to your component:

```TypeScript
import { CalloutTriggers } from '@pnp/spfx-property-controls/lib/Callout';
import { PropertyFieldLabelWithCallout } from '@pnp/spfx-property-controls/lib/PropertyFieldLabelWithCallout';
```

3. Add the custom property control to the `groupFields` of the web part property pane configuration:

```TypeScript
PropertyFieldLabelWithCallout('fakeProp', {
  calloutTrigger: CalloutTriggers.Click,
  key: 'LabelWithCalloutFieldId',
  calloutContent: 'Use dropdowns below to select list and list\'s field to work with',
  calloutWidth: 200,
  text: 'Select List and Field'
})
```

## Implementation

The `PropertyFieldLabelWithCallout` control uses the same implementation as the default `PropertyPaneLabel` and has the following additional properties:

| Property | Type | Required | Description |
| ---- | ---- | ---- | ---- |
| calloutContent | React.ReactNode | no | Callout content - any HTML |
| calloutWidth | number | no | Custom width for callout including borders. If value is 0, no width is applied. |
| calloutTrigger | CalloutTriggers | no | Event to show the callout |
| gapSpace | number | no | The gap between the callout and the target |

Enum `CalloutTriggers`

| Name | Description |
| ---- | ---- |
| Click | Shows the callout when you hover over the icon |
| Hover | Shows the callout when you click on the icon |


![](https://telemetry.sharepointpnp.com/sp-dev-fx-property-controls/wiki/PropertyFieldLabelWithCallout)