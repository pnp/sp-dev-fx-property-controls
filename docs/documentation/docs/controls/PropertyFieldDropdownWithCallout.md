# PropertyFieldDropDownWithCallout control

This control generates a dropdown control with a callout.

**PropertyFieldDropDownWithCallout rendering**

![Dropdown with callout](../assets/dropdownwithcallout.png)


**PropertyFieldDropDownWithCallout callout opened**

![Dropdown with callout opened](../assets/dropdownwithcallout-open.png)

## How to use this control in your solutions

1. Check that you installed the `@pnp/spfx-property-controls` dependency. Check out The [getting started](../../#getting-started) page for more information about installing the dependency.
2. Import the following modules to your component:

```TypeScript
import { CalloutTriggers } from '@pnp/spfx-property-controls/lib/PropertyFieldHeader';
import { PropertyFieldDropdownWithCallout } from '@pnp/spfx-property-controls/lib/PropertyFieldDropdownWithCallout';
```

3. Create a new property for your web part, for example:

```TypeScript
export interface IPropertyControlsTestWebPartProps {
  dropdownInfoHeaderKey: string;
}
```

4. Add the custom property control to the `groupFields` of the web part property pane configuration:

```TypeScript
PropertyFieldDropdownWithCallout('dropdownInfoHeaderKey', {
  calloutTrigger: CalloutTriggers.Hover,
  key: 'dropdownInfoHeaderFieldId',
  label: 'Select the version',
  options: [{
    key: 'v1.0.0',
    text: 'v1.0.0'
  }, {
    key: 'v1.0.1',
    text: 'v1.0.1'
  }, {
    key: 'v1.0.2',
    text: 'v1.0.2'
  }, {
    key: 'v2.0.0',
    text: 'v2.0.0'
  }],
  selectedKey: this.properties.dropdownInfoHeaderKey,
  calloutContent: dropdownInfoHeaderCallountContent
})
```

5. Implement the `calloutContent` function as follows:

```TypeScript
private getDropdownInfoHeaderCalloutContent(): JSX.Element {
  const selectedKey: string = this.properties.dropdownInfoHeaderKey;

  if (selectedKey) {
    return React.createElement('div', {}, `you have selected ${selectedKey}`);
  } else {
    return React.createElement('div', {}, `you haven't selected any version`);
  }
}
```

## Implementation

The `PropertyFieldDropDownWithCallout` control uses the same implementation as the default `PropertyPaneDropdown` and has the following additional properties:

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


![](https://telemetry.sharepointpnp.com/sp-dev-fx-property-controls/wiki/PropertyFieldDropDownWithCallout)
