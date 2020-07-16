# PropertyPaneHelpers

These are helpers to interact with the property pane of the web part. Currently this helper allows you to show a spinner when the property pane is loading resources. This could be loading controls, fetching data, ... Normally you would get a white property pane until all data is loaded.

## How to use this control in your solutions

1. Check that you installed the `@pnp/spfx-property-controls` dependency. Check out The [getting started](../../#getting-started) page for more information about installing the dependency.
2. Import the following modules to your main web part TypeScript file:

```TypeScript
import { PropertyPaneHelpers } from '@pnp/spfx-property-controls/lib/helpers';
```

3. You can use the following example to add the spinner to your web part property pane:

```TypeScript
/**
 * Load property pane resources
 */
protected async loadPropertyPaneResources(): Promise<void> {
  PropertyPaneHelpers.setSpinner({
    bgColor: "white",
    spinnerProps: {
      getStyles: () => {
        return {
          circle: {
            height: 80,
            width: 80
          }
        };
      }
    }
  });

  // Write here the code you want to add to load your resources

  PropertyPaneHelpers.clearSpinner(200);
}
```

## Implementation

The `setSpinner` method allows you to set the following properties:

| Property | Type | Required | Description |
| ---- | ---- | ---- | ---- |
| bgColor | string | no | Spinner background color |
| className | string | no | Class name to style the spinner yourself. |
| spinnerProps | ISpinnerProps | no | Spinner properties from Office UI Fabric. |

![](https://telemetry.sharepointpnp.com/sp-dev-fx-property-controls/wiki/PropertyPaneHelpers)
