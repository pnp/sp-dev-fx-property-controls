# Reusable property pane controls for the SharePoint Framework solutions ![semantic version](https://img.shields.io/npm/v/@pnp/spfx-property-controls.svg)

This repository provides developers with a set of reusable property pane controls that can be used in their SharePoint Framework (SPFx) solutions.

**ATTENTION:**

- *In order to migrate to `v2` it is advised to follow this guide: [Migrating from V1](./guides/migrate-from-v1).*

- *The controls project has a minimal dependency on SharePoint Framework version `1.3.0`. Be aware that the controls might not work in solutions you're building for on-premises. As for on-premises solutions, version `1.1.0` will get used.*

## Getting started

### Installation

To get started you have to install the following dependency to your project: `@pnp/spfx-property-controls`.

Enter the following command to install the dependency to your project:

```console
npm install @pnp/spfx-property-controls --save --save-exact
```

### Configuration

**NOTE:** *Since `v1.7.0`, the localized resource path will automatically be configured during the dependency installing.*

Once the package is installed, you will have to configure the resource file of the property controls to be used in your project. You can do this by opening the `config/config.json` and adding the following line to the `localizedResources` property:

```json
"PropertyControlStrings": "node_modules/@pnp/spfx-property-controls/lib/loc/{locale}.js"
```

## Telemetry

All controls gather telemetry to verify the usage. Only the name of the control and related data gets captured.

> More information about the service that we are using for this can be found here: [PnP Telemetry Proxy](https://github.com/pnp/telemetry-proxy-node).

Since version `1.17.0` it is possible to opt-out of the telemetry by adding the following code to your web part:

```typescript
import PnPTelemetry from "@pnp/telemetry-js";
...
const telemetry = PnPTelemetry.getInstance();
telemetry.optOut();
```

## Controls

The following controls are currently available:

- [PropertyFieldCodeEditor](./controls/PropertyFieldCodeEditor.md) (Property pane code editor)
- [PropertyFieldCollectionData](./controls/PropertyFieldCollectionData.md) (Property pane collection data editor)
- [PropertyFieldColorPicker](./controls/PropertyFieldColorPicker.md) (Property pane color picker)
- [PropertyFieldDateTimePicker](./controls/PropertyFieldDateTimePicker.md) (Property pane date and time selector)
- [PropertyFieldFilePicker](./controls/PropertyFieldFilePicker.md) (Property pane file picker)
- [PropertyFieldFolderPicker](./controls/PropertyFieldFolderPicker.md) (Property pane folder picker)
- [PropertyFieldListPicker](./controls/PropertyFieldListPicker.md) (Property pane list selector)
- [PropertyFieldMessage](./controls/PropertyFieldMessage.md) (Property pane message)
- [PropertyFieldMultiSelect](./controls/PropertyFieldMultiSelect.md) (Property pane multi select dropdown)
- [PropertyFieldNumber](./controls/PropertyFieldNumber.md) (Property pane number editor)
- [PropertyFieldOrder](./controls/PropertyFieldOrder.md) (Property pane ordered list editor)
- [PropertyFieldPassword](./controls/PropertyFieldPassword.md) (Property pane password editor)
- [PropertyFieldPeoplePicker](./controls/PropertyFieldPeoplePicker.md) (Property pane people / group selector)
- [PropertyFieldRoleDefinitionPicker](./controls/PropertyFieldRoleDefinitionPicker.md) (Property pane role definition picker)
- [PropertyFieldSearch](./controls/PropertyFieldSearch.md) (Property pane search box)
- [PropertyFieldSitePicker](./controls/PropertyFieldSitePicker.md) (Property pane site selector)
- [PropertyFieldSpinButton](./controls/PropertyFieldSpinButton.md) (Property pane spin button)
- [PropertyFieldSpinner](./controls/PropertyFieldSpinButton.md) (Property pane spinner)
- [PropertyFieldSwatchColorPicker](./controls/PropertyFieldSwatchColorPicker.md) (Property pane color selector)
- [PropertyFieldTermPicker](./controls/PropertyFieldTermPicker.md) (Property pane managed metadata term selector)
- [PropertyFieldEnterpriseTermPicker](./controls/PropertyFieldEnterpriseTermPicker.md) (Property pane managed metadata term selector for enterprise scenarios)
- [PropertyFieldViewPicker](./controls/PropertyFIeldViewPicker.md) (Property pane view selector)
- [PropertyPaneMarkdownContent](./controls/PropertyPaneMarkdownContent.md) (Property pane markdown content)
- [PropertyPanePropertyEditor](./controls/PropertyPanePropertyEditor.md) (Property pane control that allows raw editing, export and import of webpart properties)
- [PropertyPaneWebPartInformation](./controls/PropertyPaneWebPartInformation.md) (Property pane webpart information panel)

The following controls are extended controls that show a callout next to the label

- [PropertyFieldButtonWithCallout](./controls/PropertyFieldButtonWithCallout.md) (Property button field with callout)
- [PropertyFieldCheckboxWithCallout](./controls/PropertyFieldCheckboxWithCallout.md) (Property checkbox field with callout)
- [PropertyFieldChoiceGroupWithCallout](./controls/PropertyFieldChoiceGroupWithCallout.md) (Property choice group field with callout)
- [PropertyFieldDropdownWithCallout](./controls/PropertyFieldDropdownWithCallout.md) (Property dropdown field with callout)
- [PropertyFieldLabelWithCallout](./controls/PropertyFieldLabelWithCallout.md) (Property label field with callout)
- [PropertyFieldLinkWithCallout](./controls/PropertyFieldLinkWithCallout.md) (Property link field with callout)
- [PropertyFieldSliderWithCallout](./controls/PropertyFieldSliderWithCallout.md) (Property slider field with callout)
- [PropertyFieldTextWithCallout](./controls/PropertyFieldTextWithCallout.md) (Property text field with callout)
- [PropertyFieldToggleWithCallout](./controls/PropertyFieldToggleWithCallout.md) (Property toggle field with callout)

![Hidden Telemetry](https://telemetry.sharepointpnp.com/sp-dev-fx-property-controls/wiki)
