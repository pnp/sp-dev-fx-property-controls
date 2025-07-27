# Reusable property pane controls for the SharePoint Framework solutions ![](https://img.shields.io/npm/v/@pnp/spfx-property-controls.svg)

This repository provides developers with a set of reusable property pane controls that can be used in their SharePoint Framework (SPFx) solutions.

!!! attention
    In order to migrate to `v2` and `v3` from `v1` it is advised to follow this guide: [Migrating from V1](./guides/migrate-from-v1).

## Library Versions
Currently there are 3 active versions of the controls. Please, reference the table below to see what version to use in your project.

| Version | SPFx minimal dependency | Fluent UI (Office UI Fabric React) version | SharePoint Version | Comments |
| ------- | ----------------------- | ------------------------------------------ | ------------------ | -------- |
| `v3` | `1.13.*` | `7.174.1` | Online | The most current, actively maintained version of the library. |
| `v2` | `1.11.0` | `6.214.0` | Online | The version deprecated and not actively maintained.<br>We strongly recommend to update to SPFx `1.13.*` and `v3` of Controls. |
| `v1` | `1.3.0` | `5.131.0` | On-Prem | The version is maintained for SharePoint On-Prem 2016 and 2019 implementations. Be aware that the controls might not work in solutions you're building for on-premises. As for on-premises solutions version `1.1.0` will get used. |

!!! attention
    If you are using `v3` of the Controls with SPFx `1.12.1` you will need to cast web part context to `any` to pass it to the controls.

## Getting started

### Installation

To get started you have to install the following dependency to your project: `@pnp/spfx-property-controls`.

Enter the following command to install the dependency to your project:

```
npm install @pnp/spfx-property-controls --save --save-exact
```

### Configuration

!!! note
    Since `v1.7.0` the localized resource path will automatically be configured during the dependency installing.

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

- [PropertyFieldButton](./controls/PropertyFieldButton) (Property pane Button)
- [PropertyFieldBrandFontPicker](./controls/PropertyFieldBrandFontPicker) (Property pane Brand Center font selector)
- [PropertyFieldCodeEditor](./controls/PropertyFieldCodeEditor) (Property pane code editor)
- [PropertyFieldCollectionData](./controls/PropertyFieldCollectionData) (Property pane collection data editor)
- [PropertyFieldColorPicker](./controls/PropertyFieldColorPicker) (Property pane color picker)
- [PropertyFieldColumnPicker](./controls/PropertyFieldColumnPicker) (Property pane list column picker)
- [PropertyFieldDateTimePicker](./controls/PropertyFieldDateTimePicker) (Property pane date and time selector)
- [PropertyFieldFilePicker](./controls/PropertyFieldFilePicker) (Property pane file picker)
- [PropertyFieldFolderPicker](./controls/PropertyFieldFolderPicker) (Property pane folder picker)
- [PropertyFieldGrid](./controls/PropertyFieldGrid) (Property pane Grid control)
- [PropertyFieldGuid](./controls/PropertyFieldGuid) (Property pane GUID editor)
- [PropertyFieldIconPicker](./controls/PropertyFieldIconPicker) (Property pane icon picker)
- [PropertyFieldListPicker](./controls/PropertyFieldListPicker) (Property pane list selector)
- [PropertyFieldMessage](./controls/PropertyFieldMessage) (Property pane message)
- [PropertyFieldMonacoEditor](./controls/PropertyFieldMonacoEditor) (Property pane Monaco Editor)
- [PropertyFieldMultiSelect](./controls/PropertyFieldMultiSelect) (Property pane multi select dropdown)
- [PropertyFieldNumber](./controls/PropertyFieldNumber) (Property pane number editor)
- [PropertyFieldOrder](./controls/PropertyFieldOrder) (Property pane ordered list editor)
- [PropertyFieldPassword](./controls/PropertyFieldPassword) (Property pane password editor)
- [PropertyFieldPeoplePicker](./controls/PropertyFieldPeoplePicker) (Property pane people / group selector)
- [PropertyFieldRoleDefinitionPicker](./controls/PropertyFieldRoleDefinitionPicker) (Property pane role definition picker)
- [PropertyFieldSearch](./controls/PropertyFieldSearch) (Property pane search box)
- [PropertyFieldSitePicker](./controls/PropertyFieldSitePicker) (Property pane site selector)
- [PropertyFieldSpinButton](./controls/PropertyFieldSpinButton) (Property pane spin button)
- [PropertyFieldSpinner](./controls/PropertyFieldSpinButton) (Property pane spinner)
- [PropertyFieldSwatchColorPicker](./controls/PropertyFieldSwatchColorPicker) (Property pane color selector)
- [PropertyFieldTeamPicker](./controls/PropertyFieldTeamPicker) (Property pane team selector)
- [PropertyFieldTermPicker](./controls/PropertyFieldTermPicker) (Property pane managed metadata term selector)
- [PropertyFieldEnterpriseTermPicker](./controls/PropertyFieldEnterpriseTermPicker) (Property pane managed metadata term selector for enterprise scenarios)
- [PropertyFieldViewPicker](./controls/PropertyFIeldViewPicker) (Property pane view selector)
- [PropertyPaneMarkdownContent](./controls/PropertyPaneMarkdownContent) (Property pane markdown content)
- [PropertyPanePropertyEditor](./controls/PropertyPanePropertyEditor) (Property pane control that allows raw editing, export and import of webpart properties)
- [PropertyPaneWebPartInformation](./controls/PropertyPaneWebPartInformation) (Property pane webpart information panel)

The following controls are extended controls that show a callout next to the label

- [PropertyFieldButtonWithCallout](./controls/PropertyFieldButtonWithCallout) (Property button field with callout)
- [PropertyFieldCheckboxWithCallout](./controls/PropertyFieldCheckboxWithCallout) (Property checkbox field with callout)
- [PropertyFieldChoiceGroupWithCallout](./controls/PropertyFieldChoiceGroupWithCallout) (Property choice group field with callout)
- [PropertyFieldDropdownWithCallout](./controls/PropertyFieldDropdownWithCallout) (Property dropdown field with callout)
- [PropertyFieldLabelWithCallout](./controls/PropertyFieldLabelWithCallout) (Property label field with callout)
- [PropertyFieldLinkWithCallout](./controls/PropertyFieldLinkWithCallout) (Property link field with callout)
- [PropertyFieldSliderWithCallout](./controls/PropertyFieldSliderWithCallout) (Property slider field with callout)
- [PropertyFieldTextWithCallout](./controls/PropertyFieldTextWithCallout) (Property text field with callout)
- [PropertyFieldToggleWithCallout](./controls/PropertyFieldToggleWithCallout) (Property toggle field with callout)

![](https://telemetry.sharepointpnp.com/sp-dev-fx-property-controls/wiki)
