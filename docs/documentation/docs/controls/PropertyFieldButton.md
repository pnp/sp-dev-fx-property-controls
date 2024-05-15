# PropertyFieldButton control

This control generates a Button Control .

**PropertyFieldButton example usage**

![PropertyFieldButton example](../assets/propertyFieldButton.gif)

## How to use this control in your solutions

- Check that you installed the `@pnp/spfx-property-controls` dependency. Check out The [getting started](../../#getting-started) page for more information about installing the dependency.
- Import the following modules to your component:

```TypeScript
import { PropertyFieldButton} from '@pnp/spfx-property-controls/lib/PropertyFieldButton';
```

- Add the custom property control to the `groupFields` of the web part property pane configuration:

```TypeScript
 PropertyFieldButton("", {
      text={"Button"}
      key={"buttonID"}
      disabled={false}
      className={className}
      styles={styles}
      onClick={()=>{alert("Button Clicked")}}
      iconProps={iconProps}
      isPrimary={true}
      isVIsible={true}

  })
```

## Implementation

The `PropertyFieldButton` control can be configured with the following properties:

| Property  | Type           | Required | Description                                                |
| --------- | -------------- | -------- | ---------------------------------------------------------- |
| key       | string         | yes      | An unique key that indicates the identity of this control. |
| styles    | IButtonStyles  | no       | styles object                                              |
| classname | string         | no       | css ClassName                                              |
| isVisible | boolean        | yes      | Indicate if button is visible                              |
| text      | string         | no       | text of button                                             |
| isPrimary | boolean        | yes      | indicate Button is a primary button                        |
| iconProps | IIconProps     | no       | text of button                                             |
| disable   | boolean        | no       | Disable control                                            |
| onClick   | (e:any) =>void | yes      | Onclick function                                           |

![](https://telemetry.sharepointpnp.com/sp-dev-fx-property-controls/wiki/PropertyFieldButton)
