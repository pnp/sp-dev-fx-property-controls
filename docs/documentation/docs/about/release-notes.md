# Releases

## 1.9.0

**Enhancements**

- `PropertyFieldCollectionData`: Added custom validation for `string`, `number`, `icon`, and `URL` field types [#74](https://github.com/SharePoint/sp-dev-fx-property-controls/issues/74)
- `PropertyFieldCollectionData`: Add an option to specify a default value [#86](https://github.com/SharePoint/sp-dev-fx-property-controls/issues/86)
- `PropertyFieldCollectionData`: override placeholder for the inputs [#87](https://github.com/SharePoint/sp-dev-fx-property-controls/issues/87)
- `PropertyFieldCollectionData`: Hide save button when "Add and save" is shown [#88](https://github.com/SharePoint/sp-dev-fx-property-controls/issues/88)

**Fixes**

- `PropertyFieldMultiSelect`: fixed an issue where the control didn't retain the preselected values when dropdown options were provided async [#85](https://github.com/SharePoint/sp-dev-fx-property-controls/issues/85)
- `PropertyFieldOrder`: fixed an issue where items where provided async [#81](https://github.com/SharePoint/sp-dev-fx-property-controls/issues/81)

## 1.8.0

**Enhancements**

- New telemetry approach which allows you to use Application Insights instance [#79](https://github.com/SharePoint/sp-dev-fx-property-controls/issues/79)
- `PropertyFieldListPicker` add optional property for target site [#21](https://github.com/SharePoint/sp-dev-fx-property-controls/issues/21)

## 1.7.0

**Enhancements**

- Add `npm postinstall` script to automatically add the localization config [#64](https://github.com/SharePoint/sp-dev-fx-property-controls/issues/64)
- Add a description to the `PropertyFieldCollectionData` panel [#67](https://github.com/SharePoint/sp-dev-fx-property-controls/issues/67)
- Added a font field type for the `PropertyFieldCollectionData` control [#66](https://github.com/SharePoint/sp-dev-fx-property-controls/issues/66)
- Added a URL field type for the `PropertyFieldCollectionData` control [#72](https://github.com/SharePoint/sp-dev-fx-property-controls/issues/72)
- Field validation implemented to enable/disable save buttons in `PropertyFieldCollectionData` control. Related to previous enhancement.
- Added properties to the `TaxonomyPicker` to specify which terms are disabled/not-selectable [#69](https://github.com/SharePoint/sp-dev-fx-property-controls/issues/69)

**Fixes**

- `PropertyFieldPeoplePicker` validation error does not clear as expected [#68](https://github.com/SharePoint/sp-dev-fx-property-controls/issues/68)

## 1.6.0

**New control(s)**

- `PropertyFieldCollectionData` was added [#58](https://github.com/SharePoint/sp-dev-fx-property-controls/issues/58)
- `PropertyFieldOrder` was added [#19](https://github.com/SharePoint/sp-dev-fx-property-controls/issues/19)
- `PropertyFieldSwatchColorPicker` was added [#55](https://github.com/SharePoint/sp-dev-fx-property-controls/issues/55)

**Enhancements**

- Allow the term set to be selectable in the `PropertyFieldTermPicker` [#60](https://github.com/SharePoint/sp-dev-fx-property-controls/issues/60)

**Fixes**

- Fix for `PropertyFieldColorPicker` Palette Icon alignment issue in IE11 [#56](https://github.com/SharePoint/sp-dev-fx-property-controls/issues/56)

## 1.5.1

**Enhancements**

- Color Pickers optionally return Color Objects [#55](https://github.com/SharePoint/sp-dev-fx-property-controls/issues/55)

**Fixes**

- Undefined web part context fixed in the `PropertyFieldPeoplePicker` [#47](https://github.com/SharePoint/sp-dev-fx-property-controls/issues/47)
- Taxonomy service fix for working with term set GUID [#48](https://github.com/SharePoint/sp-dev-fx-property-controls/issues/48)
- Added focus intercepting input for Full style [#52](https://github.com/SharePoint/sp-dev-fx-property-controls/issues/52)

## 1.5.0

**Enhancements**

- `PropertyFieldListPicker` control extended with select all lists option [#8](https://github.com/SharePoint/sp-dev-fx-property-controls/issues/8)
- `PropertyFieldTermPicker` control extended with the ability to search terms by typing in the textbox [#11](https://github.com/SharePoint/sp-dev-fx-property-controls/issues/11) [#42](https://github.com/SharePoint/sp-dev-fx-property-controls/issues/42) [#44](https://github.com/SharePoint/sp-dev-fx-property-controls/issues/44) [#45](https://github.com/SharePoint/sp-dev-fx-property-controls/issues/45)
- `SPTermStorePickerService` has a new interface which contains only the required properties

## 1.4.2

**Enhancements**

- Introduced the `onGetErrorMessage` property for the `PropertyFieldNumber` field control ([#36](https://github.com/SharePoint/sp-dev-fx-property-controls/issues/36))

## 1.4.1

**Enhancements**

- Optimized telemetry so that it only pushes control data

**Fixes**

- Fixes for issue [#30](https://github.com/SharePoint/sp-dev-fx-property-controls/issues/30)
- `PropertyFieldPeoplePicker` Validation does not work as expected [#33](https://github.com/SharePoint/sp-dev-fx-property-controls/issues/33)

## 1.4.0

**New control(s)**

- `PropertyFieldMultiSelect` got added
- `PropertyFieldNumber` got added

**Enhancements**

- `PropertyFieldTermPicker` new introduced property to specify to show or hide the term store name: `hideTermStoreName`.
- `PropertyFieldTermPicker` updated process when terms were unselected based on ID instead of path.

## 1.3.0

**New control(s)**

- `PropertyFieldCodeEditor` got added

**Enhancements**

- `PropertyFieldTermPicker` improved with save and cancel button
- `PropertyFieldTermPicker` improved with `onClick` event on input field

## 1.2.0

**Enhancements**

- Added the option to the people picker to allow you to specify single or multi-selection

**Fixes**

- People picker accidentally picked the wrong person
- Improved telemetry with some object checks

## 1.1.1

**Enhancements**

- Removed operation name from telemetry

## 1.1.0

**New control(s)**

- Added the `PropertyFieldButtonWithCallout` control
- Added the `PropertyFieldCheckboxWithCallout` control
- Added the `PropertyFieldChoiceGroupWithCallout` control
- Added the `PropertyFieldWithCallout` control
- Added the `PropertyLabelWithCallout` control
- Added the `PropertyLinkWithCallout` control
- Added the `PropertySliderWithCallout` control

**Enhancements**

- Telemetry added
- Term picker control has now the option to scope on term set or group

## 1.0.0

**New control(s)**

- Added the `PropertyFieldDropdownWithCallout` control
- Added the `PropertyFieldTextWithCallout` control
- Added the `PropertyFieldToggleWithCallout` control

## 1.0.0-beta.3

**Enhancements**

- Added `firstDayOfWeek` option to the date picker control

## 1.0.0-beta.2

**New control(s)**

- Initial release
