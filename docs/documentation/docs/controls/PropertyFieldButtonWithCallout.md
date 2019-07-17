# PropertyFieldButtonWithCallout control

This control generates a button control with a callout.

**PropertyFieldButtonWithCallout rendering**

![Button field with callout](../assets/buttonfieldwithcallout.png)


**PropertyFieldButtonWithCallout callout opened**

![Button field with callout opened](../assets/buttonfieldwithcallout-open.png)

## How to use this control in your solutions

1. Check that you installed the `@pnp/spfx-property-controls` dependency. Check out The [getting started](../../#getting-started) page for more information about installing the dependency.
2. Import the following modules to your component:

```TypeScript
import { CalloutTriggers } from '@pnp/spfx-property-controls/lib/Callout';
import { PropertyFieldButtonWithCallout } from '@pnp/spfx-property-controls/lib/PropertyFieldButtonWithCallout';
```

3. Add the custom property control to the `groupFields` of the web part property pane configuration:

```TypeScript
PropertyFieldButtonWithCallout('fakeProperty', {
  calloutTrigger: CalloutTriggers.Click,
  key: 'buttonWithCalloutFieldId',
  calloutContent: React.createElement('p', {}, 'Tests connection to the database with the parameters listed above'),
  calloutWidth: 150,
  text: 'Test connection',
  onClick: () => { /* Code to test db connection */ }
})
```

## Implementation

The `PropertyFieldButtonWithCallout` control uses the same implementation as the default `PropertyPaneButton` and has the following additional properties:

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


![](https://telemetry.sharepointpnp.com/sp-dev-fx-property-controls/wiki/PropertyFieldButtonWithCallout)
