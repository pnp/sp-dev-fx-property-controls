# Reusable property pane controls for the SharePoint Framework solutions ![](https://img.shields.io/npm/v/@pnp/spfx-property-controls.svg)

This repository provides developers with a set of reusable property pane controls that can be used in their SharePoint Framework (SPFx) solutions.

## Getting started

### Installation

To get started you have to install the following dependency to your project: `@pnp/spfx-property-controls`.

Enter the following command to install the dependency to your project:

```
npm install @pnp/spfx-property-controls --save --save-exact
```

### Configuration

Once the package is installed, you will have to configure the resource file of the property controls to be used in your project. You can do this by opening the `config/config.json` and adding the following line to the `localizedResources` property:

```json
"PropertyControlStrings": "./node_modules/@pnp/spfx-property-controls/lib/loc/{locale}.js"
```

## Controls

The following controls are currently available:

- [PropertyFieldColorPicker](./controls/PropertyFieldColorPicker) (Property pane color picker)
- [PropertyFieldDateTimePicker](./controls/PropertyFieldDateTimePicker) (Property pane date and time selector)
- [PropertyFieldListPicker](./controls/PropertyFieldListPicker) (Property pane list selector)
- [PropertyFieldPeoplePicker](./controls/PropertyFieldPeoplePicker) (Property pane people / group selector)
- [PropertyFieldSpinButton](./controls/PropertyFieldSpinButton) (Property pane spin button)
- [PropertyFieldTermPicker](./controls/PropertyFieldTermPicker) (Property pane managed metadata term selector)
- [PropertyFieldMultiSelect](./controls/PropertyFieldMultiSelect) (Property pane field which allows multi-value selection)

The following controls are extended controls that show a callout next to the label

- [PropertyFieldButtonWithCallout](./controls/PropertyFieldButtonWithCallout) (Property button field with callout)
- [PropertyFieldCheckboxWithCallout](./controls/PropertyFieldCheckboxWithCallout) (Property checkbox field with callout)
- [PropertyFieldChoiceGroupWithCallout](./controls/PropertyFieldChoiceGroupWithCallout) (Property choice group field with callout)
- [PropertyFieldDropdownWithCallout](./controls/PropertyFieldDropdownWithCallout) (Property dropdown field with callout)
- [PropertyFieldLabelWithCallout](./controls/PropertyFieldLabelWithCallout) (Property checkbox field with callout)
- [PropertyFieldLinkWithCallout](./controls/PropertyFieldLinkWithCallout) (Property checkbox field with callout)
- [PropertyFieldSliderWithCallout](./controls/PropertyFieldSliderWithCallout) (Property slider field with callout)
- [PropertyFieldTextWithCallout](./controls/PropertyFieldTextWithCallout) (Property text field with callout)
- [PropertyFieldToggleWithCallout](./controls/PropertyFieldToggleWithCallout) (Property toggle field with callout)

![](https://telemetry.sharepointpnp.com/sp-dev-fx-property-controls/wiki)
