# PropertyFieldLinkWithCallout control

This control generates a link control with a callout.

**PropertyFieldLinkWithCallout rendering**

![Button field with callout](../assets/linkfieldwithcallout.png)


**PropertyFieldLinkWithCallout callout opened**

![Button field with callout opened](../assets/linkfieldwithcallout-open.png)

## How to use this control in your solutions

1. Check that you installed the `@pnp/spfx-property-controls` dependency. Check out The [getting started](../../#getting-started) page for more information about installing the dependency.
2. Import the following modules to your component:

```TypeScript
import { CalloutTriggers } from '@pnp/spfx-property-controls/lib/Callout';
import { PropertyFieldLinkWithCallout } from '@pnp/spfx-property-controls/lib/PropertyFieldLinkWithCallout';
```

3. Add the custom property control to the `groupFields` of the web part property pane configuration:

```TypeScript
PropertyFieldLinkWithCallout('fakeProp', {
  calloutTrigger: CalloutTriggers.Click,
  key: 'linkWithCalloutFieldId',
  calloutContent: React.createElement('p', {}, 'Click the link to open a new page with Application Terms & Conditions'),
  calloutWidth: 200,
  text: 'Terms & Conditions',
  href: 'https://github.com/pnp/sp-dev-fx-property-controls',
  target: '_blank'
})
```

## Implementation

The `PropertyFieldLinkWithCallout` control uses the same implementation as the default `PropertyPaneLink` and has the following additional properties:

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


![](https://telemetry.sharepointpnp.com/sp-dev-fx-property-controls/wiki/PropertyFieldLinkWithCallout)
