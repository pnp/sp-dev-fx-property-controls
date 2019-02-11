# PropertyPaneWebPartInformation control

This control allows you to specify a description, a 'read more' link, and an optional embedded video

**PropertyPaneWebPartInformation rendering**

![WebPart Information](../assets/webpartinformation.png)


## How to use this control in your solutions

1. Check that you installed the `@pnp/spfx-property-controls` dependency. Check out The [getting started](../#getting-started) page for more information about installing the dependency.
2. Import the following modules to your component: 

```TypeScript
import { PropertyPaneWebPartInformation } from '@pnp/spfx-property-controls/lib/PropertyPaneWebPartInformation';
```

3. Create a new property for your web part, for example:

```TypeScript
export interface IPropertyControlsTestWebPartProps {
  toggleInfoHeaderValue: boolean;
}
```

4. Add the custom property control to the `groupFields` of the web part property pane configuration:

```TypeScript
PropertyPaneWebPartInformation({
  description: `This is a <strong>demo webpart</strong>, used to demonstrate all the <a href="https://aka.ms/sppnp">PnP</a> property controls`,
  moreInfoLink: `https://sharepoint.github.io/sp-dev-fx-property-controls/`,
  videoProperties: {
    embedLink: `https://www.youtube.com/embed/d_9o3tQ90zo`,
    properties: { allowFullScreen: true}
  },
  key: 'webPartInfoId'
})    
```

## Implementation

The `PropertyPaneWebPartInformation` control has the following properties:

| Property | Type | Required | Description |
| ---- | ---- | ---- | ---- |
| description | string | yes | Description content - any HTML |
| moreInfoLink | string | no | A URL providing optional additional information |
| moreInfoLinkTarget | string | no | An optional target for the link. Defaults to '_blank' |
| videoProperties | IVideoEmbedProperties | no | A video properties object specifying an optionally embedded video |

Class `IVideoEmbedProperties`

| Property | Type | Required | Description |
| ---- | ---- | ---- | ---- |
| embedLink | string | yes | A link to an embeddable video. The video will be embedded in an iframe. See the example above for details |
| width | number | no | optional width of the iframe |
| height | number | no | optional height of the iframe |
| properties | object | no | additional properties to set on the iframe element |



![](https://telemetry.sharepointpnp.com/sp-dev-fx-property-controls/wiki/PropertyPaneWebPartInformation)
