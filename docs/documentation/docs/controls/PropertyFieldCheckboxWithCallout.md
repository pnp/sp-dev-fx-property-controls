# PropertyFieldCheckboxWithCallout control

This control generates a checkbox control with a callout.

**PropertyFieldCheckboxWithCallout rendering**

![Checkbox field with callout](../assets/checkboxfieldwithcallout.png)


**PropertyFieldCheckboxWithCallout callout opened**

![Checkbox field with callout opened](../assets/checkboxfieldwithcallout-open.png)

## How to use this control in your solutions

1. Check that you installed the `@pnp/spfx-property-controls` dependency. Check out The [getting started](../#getting-started) page for more information about installing the dependency.
2. Import the following modules to your component:

```TypeScript
import { CalloutTriggers } from '@pnp/spfx-property-controls/lib/Callout';
import { PropertyFieldCheckboxWithCallout } from '@pnp/spfx-property-controls/lib/PropertyFieldCheckboxWithCallout';
```

3. Create a new property for your web part, for example:

```TypeScript
export interface IPropertyControlsTestWebPartProps {
  checkboxWithCalloutValue: boolean;
}
```

4. Add the custom property control to the `groupFields` of the web part property pane configuration:

```TypeScript
PropertyFieldCheckboxWithCallout('checkboxWithCalloutValue', {
  calloutTrigger: CalloutTriggers.Click,
  key: 'checkboxWithCalloutFieldId',
  calloutContent: React.createElement('p', {}, 'Check the checkbox to accept Application Terms and Conditions'),
  calloutWidth: 200,
  text: 'Accept terms and conditions',
  checked: this.properties.checkboxWithCalloutValue
})
```

## Implementation

The `PropertyFieldCheckboxWithCallout` control uses the same implementation as the default `PropertyPaneCheckbox` and has the following additional properties:

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


![](https://telemetry.sharepointpnp.com/sp-dev-fx-property-controls/wiki/PropertyFieldCheckboxWithCallout)