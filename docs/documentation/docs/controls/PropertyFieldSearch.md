# PropertyFieldPassword control

This control generates an input field for Search. 

**PropertyFieldSearch example usage**

![PropertyFieldSearch example](../assets/Search1.png)

![PropertyFieldSearch example](../assets/Search2.png)

## How to use this control in your solutions

- Check that you installed the `@pnp/spfx-property-controls` dependency. Check out The [getting started](../../#getting-started) page for more information about installing the dependency.
- Import the following modules to your component:

```TypeScript
import { PropertyFieldSearch } from '@pnp/spfx-property-controls/lib/PropertyFieldSearch';
```

- Create a new property for your web part, for example:

```TypeScript
export interface IPropertyControlsTestWebPartProps {
  searchValue: string;
}
```

- Add the custom property control to the `groupFields` of the web part property pane configuration:

```TypeScript
PropertyFieldSearch("searchValue", {
      key: "search",
      placeholder: 'Search libraries',
      value: this.properties.searchValue,
      onSearch: this._onSearch,
      styles: { root: { margin: 10 } }
    }),
```



## Implementation

The `PropertyFieldSeasrch` control can be configured with the following properties:

| Property | Type | Required | Description |
| ---- | ---- | ---- | ---- |
| key | string | yes | An unique key that indicates the identity of this control. |
| PlaceHolder | string | no | Property field PlaceHolder displayed on input. |
| value | number | no | Value to be displayed in field. |
| underlined | boolean | no | Indicate if control is render as underline|
| styles | ISearchBoxStyles | no | Styles to apply |
| className | string | no | Class Name |
| onSearch | (value: string) => void | no | If set, this method is used to get the the input value when user press enter key|
| onChange | (value: string) => void | no | If set, this method is used to get the the input value when it changed|
| onClear | (ev: any) => void | no | If set, this method is fired when user click the clear (cross) on the input field|
| onEscape | (ev: any) => void | no | If set, this method is fired when user press the escape key |


![](https://telemetry.sharepointpnp.com/sp-dev-fx-property-controls/wiki/PropertyFieldSearch)
