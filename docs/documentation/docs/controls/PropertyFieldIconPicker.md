# IconPicker control

Property pane icon picker control that allows to search and select an icon from office-ui-fabric-react icons.

## Overview
The control allows selecting an icon from the list of icons available in the office-ui-fabric-react library. Icon list is a static copy of available icons. Currently, only one icon selection is supported.
![Icon Picker overview](../assets/IconPickerOverview.png)


## Displayed in the panel
Icon picker always opens a new panel where you can pick an icon. The panel displays all the icons and maintains readability. Picker does not displays selected icon outside the panel.
![Icon Picker panel](../assets/IconPickerPanel.gif)


## How to use this control

- Check that you installed the `@pnp/spfx-property-controls` dependency. Check out the [getting started](../../#getting-started) page for more information about installing the dependency.
- Import the following module to your component:

```TypeScript
import { PropertyFieldIconPicker } from '@pnp/spfx-property-controls/lib/PropertyFieldIconPicker';
```

- Use the `PropertyFieldIconPicker` control in your code as follows:

```TypeScript
PropertyFieldIconPicker('iconPicker', {
                  currentIcon: this.properties.iconPicker,
                  key: "iconPickerId",
                  onSave: (icon: string) => { console.log(icon); this.properties.iconPicker = icon; },
                  onChanged:(icon: string) => { console.log(icon);  },
                  buttonLabel: "Icon",
                  renderOption: "panel",
                  properties: this.properties,
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  label: "Icon Picker"              
                }),
```

## Implementation

The PropertyFieldIconPicker component can be configured with the following properties:

| Property | Type | Required | Description |
| ---- | ---- | ---- | ---- |
| buttonLabel | string | no | Specifies the label of the icon picker button. |
| onSave | (iconName: string) => void | yes | Handler when the icon has been selected and picker has been closed. |
| onChanged | (iconName: string) => void | no | Handler when the icon selection has been changed. |
| disabled | boolean | no | Specifies if the picker button is disabled |
| buttonClassName | boolean | no | If provided, additional class name will be added to the picker button |
| panelClassName | boolean | no | If provided, additional class name will be added to the picker panel |
| currentIcon | string | no | Specifies default selected icon |
| renderOption | `dialog`, `panel` | no | Specifies how to render list of Icons, Values :  'Panel' or 'Dialog' default value 'Panel' |
| onPropertyChange | function | yes | Defines a `onPropertyChange` function to raise when the teams get changed. |
| properties | any | yes | Parent web part properties, this object is used to update the property value. |
| key | string | yes | An unique key that indicates the identity of this control. |
| label | string | no | A label to describe the icon picker control. |

![](https://telemetry.sharepointpnp.com/sp-dev-fx-property-controls/wiki/PropertyFieldIconPicker)
