# PropertyFieldToggleWithCallout control

This control generates a toggle control with a callout.

**PropertyFieldToggleWithCallout rendering**

![Toggle field with callout](../assets/togglefieldwithcallout.png)


**PropertyFieldToggleWithCallout callout opened**

![Toggle field with callout opened](../assets/togglefieldwithcallout-open.png)

## How to use this control in your solutions

1. Check that you installed the `@pnp/spfx-property-controls` dependency. Check out The [getting started](../#getting-started) page for more information about installing the dependency.
2. Import the following modules to your component:

```TypeScript
import { CalloutTriggers } from '@pnp/spfx-property-controls/lib/PropertyFieldHeader';
import { PropertyFieldToggleWithCallout } from '@pnp/spfx-property-controls/lib/PropertyFieldToggleWithCallout';
```

3. Create a new property for your web part, for example:

```TypeScript
export interface IPropertyControlsTestWebPartProps {
  toggleInfoHeaderValue: boolean;
}
```

4. Add the custom property control to the `groupFields` of the web part property pane configuration:

```TypeScript
PropertyFieldToggleWithCallout('toggleInfoHeaderValue', {
  calloutTrigger: CalloutTriggers.Click,
  key: 'toggleInfoHeaderFieldId',
  label: 'Turn on the PnP feature',
  calloutContent: React.createElement('p', {}, 'With this control you can enable or disable the PnP features in your web part'),
  onText: 'ON',
  offText: 'OFF',
  checked: this.properties.toggleInfoHeaderValue
})
```

## Implementation

The `PropertyFieldToggleWithCallout` control uses the same implementation as the default `PropertyPaneToggle` and has the following additional properties:

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


![](https://telemetry.sharepointpnp.com/sp-dev-fx-property-controls/wiki/PropertyFieldToggleWithCallout)
