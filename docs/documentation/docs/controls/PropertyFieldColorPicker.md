# PropertyFieldColorPicker control

This control generates a color picker that you can use inside the property pane.

**PropertyFieldColorPicker**

![Color picker initial](../assets/colorpicker-initial.png)

**PropertyFieldColorPicker color selector**

![Color picker select color](../assets/colorpicker-selector.png)

## How to use this control in your solutions

1. Check that you installed the `@pnp/spfx-property-controls` dependency. Check out The [getting started](../../#getting-started) page for more information about installing the dependency.
2. Import the following modules to your component:

```TypeScript
import { PropertyFieldColorPicker, PropertyFieldColorPickerStyle } from '@pnp/spfx-property-controls/lib/PropertyFieldColorPicker';
```

3. Create a new property for your web part, for example:

```TypeScript
export interface IPropertyControlsTestWebPartProps {
  color: string;
}
```

4. Add the custom property control to the `groupFields` of the web part property pane configuration:

```TypeScript
PropertyFieldColorPicker('color', {
  label: 'Color',
  selectedColor: this.properties.color,
  onPropertyChange: this.onPropertyPaneFieldChanged,
  properties: this.properties,
  disabled: false,
  debounce: 1000,
  isHidden: false,
  alphaSliderHidden: false,
  style: PropertyFieldColorPickerStyle.Full,
  iconName: 'Precipitation',
  key: 'colorFieldId'
})
```

## Implementation

The `PropertyFieldColorPicker` control can be configured with the following properties:

| Property | Type | Required | Description |
| ---- | ---- | ---- | ---- |
| label | string | yes | Property field label displayed on top. |
| disabled | boolean | no | Specify if the control needs to be disabled. |
| debounce | number | no | Specify delay after which control value will be set. |
| isHidden | boolean | no | Specify if the control needs to be hidden. |
| selectedColor | string or IColor | no | The CSS-compatible string or an IColor object to describe the initial color |
| alphaSliderHidden | boolean | no | When true, the alpha slider control is hidden |
| showPreview | boolean | no | Whether to show color preview box. |
| style | PropertyFieldColorPickerStyle | no | Determines how the control is displayed (defaults to inline) |
| iconName | string | no | The name of the UI Fabric Font Icon to use for Inline display (defaults to Color) |
| valueAsObject | boolean | no | When true, the property is returned as an IColor object. When false (default), the property is returned as a CSS-compatible string |
| properties | any | yes | Parent web part properties, this object is use to update the property value.  |
| onPropertyChange | function | yes | Defines a onPropertyChange function to raise when the date gets changed. |
| key | string | yes | An unique key that indicates the identity of this control. |

Enum `PropertyFieldColorPickerStyle`

| Name | Description |
| ---- | ---- |
| Full | Display the full control in the property pane |
| Inline | Display the color picker inline |

## Value

By default, the Color Picker returns the value as a CSS-compatible string. This allows you the flexibility of simply assigning the value to an inline style as is and this is usually sufficient. However, this also limits the information directly available to you since the format could be a Hex code, an RGBA value, or even a named color and may not be suitable for advanced scenarios.

By setting the `valueAsObject` property to true, you will always receive a consistent IColor object that provides you detailed information about the chosen color. Here are the properties available in the IColor object:

| Property | Type | Description |
| ---- | ---- | ---- |
| str | string | CSS-compatible string (this is the same value that would normally be returned when `valueAsObject` is false) |
| hex | string | Hex value (does not reflect alpha) |
| r |  number | Red |
| g | number | Green |
| b | number | Blue |
| h | number | Hue |
| s | number | Saturation |
| v | number | Value |

![](https://telemetry.sharepointpnp.com/sp-dev-fx-property-controls/wiki/PropertyFieldColorPicker)
