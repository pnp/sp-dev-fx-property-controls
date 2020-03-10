# PropertyFieldSliderWithCallout control

This control generates a slider control with a callout.

**PropertyFieldSliderWithCallout rendering**

![Choice Group field with callout](../assets/sliderfieldwithcallout.png)


**PropertyFieldSliderWithCallout callout opened**

![Choice field with callout opened](../assets/sliderfieldwithcallout-open.png)

## How to use this control in your solutions

1. Check that you installed the `@pnp/spfx-property-controls` dependency. Check out The [getting started](../../#getting-started) page for more information about installing the dependency.
2. Import the following modules to your component:

```TypeScript
import { CalloutTriggers } from '@pnp/spfx-property-controls/lib/PropertyFieldHeader';
import { PropertyFieldSliderWithCallout } from '@pnp/spfx-property-controls/lib/PropertyFieldSliderWithCallout';
```

3. Create a new property for your web part, for example:

```TypeScript
export interface IPropertyControlsTestWebPartProps {
  sliderWithCalloutValue: number;
}
```

4. Add the custom property control to the `groupFields` of the web part property pane configuration:

```TypeScript
PropertyFieldSliderWithCallout('sliderWithCalloutValue', {
  calloutContent: React.createElement('div', {}, 'Select background image opacity'),
  calloutTrigger: CalloutTriggers.Click,
  calloutWidth: 200,
  key: 'sliderWithCalloutFieldId',
  label: 'Opacity',
  max: 100,
  min: 0,
  step: 1,
  showValue: true,
  value: this.properties.sliderWithCalloutValue,
  debounce: 1000
})
```

## Implementation

The `PropertyFieldSliderWithCallout` control uses the same implementation as the default `PropertyPaneSlider` and has the following additional properties:

| Property | Type | Required | Description |
| ---- | ---- | ---- | ---- |
| calloutContent | React.ReactNode | no | Callout content - any HTML |
| calloutWidth | number | no | Custom width for callout including borders. If value is 0, no width is applied. |
| calloutTrigger | CalloutTriggers | no | Event to show the callout |
| gapSpace | number | no | The gap between the callout and the target |
| debounce | number | no | Time specified in miliseconds after which the onChanged handler is going to be called. |

Enum `CalloutTriggers`

| Name | Description |
| ---- | ---- |
| Click | Shows the callout when you hover over the icon |
| Hover | Shows the callout when you click on the icon |


![](https://telemetry.sharepointpnp.com/sp-dev-fx-property-controls/wiki/PropertyFieldSliderWithCallout)
