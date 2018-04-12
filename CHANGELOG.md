# Releases

## 1.5.0

**Enhancements**

- `PropertyFieldListPicker` control extended with select all lists option [#8](https://github.com/SharePoint/sp-dev-fx-property-controls/issues/8)
- `PropertyFieldTermPicker` control extended with the ability to search terms by typing in the textbox [#11](https://github.com/SharePoint/sp-dev-fx-property-controls/issues/11) [#42](https://github.com/SharePoint/sp-dev-fx-property-controls/issues/42) [#44](https://github.com/SharePoint/sp-dev-fx-property-controls/issues/44) [#45](https://github.com/SharePoint/sp-dev-fx-property-controls/issues/45)
- `SPTermStorePickerService` has a new interface which contains only the required properties 

## 1.4.2

**Enhancements**

- Introduced the `onGetErrorMessage` property for the `PropertyFieldNumber` field control ([#36 - PropertyFieldNumber control suggestion](https://github.com/SharePoint/sp-dev-fx-property-controls/issues/36))

## 1.4.1

**Enhancements**

- Optimized telemetry so that it only pushes control data

**Fixes**

- Fixes for issue [#30 - Check if Label is null and if so don't render it.](https://github.com/SharePoint/sp-dev-fx-property-controls/issues/30)
- Fix for issue [#33 - `PropertyFieldPeoplePicker` Validation does not work as expected.](https://github.com/SharePoint/sp-dev-fx-property-controls/issues/33)

## 1.4.0

**New controls**

- `PropertyFieldMultiSelect` got added
- `PropertyFieldNumber` got added

**Enhancements**

- `PropertyFieldTermPicker` new introduced property to specify to show or hide the term store name: `hideTermStoreName`.
- `PropertyFieldTermPicker` updated process when terms were unselected based on ID instead of path.

## 1.3.0

**New controls**

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

- Removed operation name from telemetry

## 1.1.0

**Improvements**
- Telemetry added
- Term picker control has now the option to scope on term set or group

**New controls**
- Added the `PropertyFieldButtonWithCallout` control
- Added the `PropertyFieldCheckboxWithCallout` control
- Added the `PropertyFieldChoiceGroupWithCallout` control
- Added the `PropertyFieldWithCallout` control
- Added the `PropertyLabelWithCallout` control
- Added the `PropertyLinkWithCallout` control
- Added the `PropertySliderWithCallout` control

## 1.0.0
- Added the `PropertyFieldDropdownWithCallout` control
- Added the `PropertyFieldTextWithCallout` control
- Added the `PropertyFieldToggleWithCallout` control

## Beta 1.0.0-beta.4

**New Controls**
- Added the `PropertyFieldColorPicker` control
- Added the `PropertyFieldSpinButton` control

## Beta 1.0.0-beta.3

**Improvement**
- Added `firstDayOfWeek` option to the date picker control

## Beta 1.0.0-beta.2
- Initial release
