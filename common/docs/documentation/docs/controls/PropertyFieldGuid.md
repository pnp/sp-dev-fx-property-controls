# PropertyFieldGuid control

This control generates an input field for GUID. Incorrect GUID entered will result into an invalid input.

**PropertyFieldGuid example usage**

![PropertyFieldGuid example](../assets/PropertyFieldGuid.gif)

## How to use this control in your solutions

- Check that you installed the `@pnp/spfx-property-controls` dependency. Check out The [getting started](../../#getting-started) page for more information about installing the dependency.
- Import the following modules to your component:

```TypeScript
import { PropertyFieldGuid } from '@pnp/spfx-property-controls/lib/PropertyFieldGuid';
```

- Create a new property for your web part, for example:

```TypeScript
export interface IPropertyControlsTestWebPartProps {
  guid: string;
}
```

- Add the custom property control to the `groupFields` of the web part property pane configuration:

```TypeScript
PropertyFieldGuid('guid', {
  key: 'guid',
  label: "GUID",
  value: this.properties.guid
})
```

- You can also implement the property your own error message with the `errorMessage` property with the following syntax:

```TypeScript
PropertyFieldGuid('guid', {
  key: 'guid',
  label: "GUID",
  value: this.properties.guid,
  errorMessage: "Please enter a correct GUID"
})
```

## Implementation

The `PropertyFieldGuid` control can be configured with the following properties:

| Property | Type | Required | Description |
| ---- | ---- | ---- | ---- |
| key | string | yes | An unique key that indicates the identity of this control. |
| label | string | yes | Property field label displayed on top. |
| value | string | no | Value to be displayed in the Guid field. |
| errorMessage | string | no | If set, this will be displayed as an error message. |

![](https://telemetry.sharepointpnp.com/sp-dev-fx-property-controls/wiki/PropertyFieldGuid)
