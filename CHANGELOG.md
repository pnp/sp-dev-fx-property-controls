# Releases

## 2.3.0

### New control(s)

- `PropertyFieldIconPicker`: new icon picker control [#319](https://github.com/pnp/sp-dev-fx-property-controls/pull/319)

### Enhancements

- `PropertyFieldTermPicker`: two properties: `areTermsSelectable` and `areTermsHidden` [#313](https://github.com/pnp/sp-dev-fx-property-controls/pull/313)
- `PropertyFieldListPicker`: ability to return Title and relative URL of the list [#281](https://github.com/pnp/sp-dev-fx-property-controls/issues/281)

### Fixes

- Documentation fix: spelling fix on `index.md` [#320](https://github.com/pnp/sp-dev-fx-property-controls/pull/320)

### Contributors

Special thanks to our contributors (in alphabetical order): [Corey Roth](https://github.com/coreyroth), [Gautam Sheth](https://github.com/gautamdsheth), [Konrad K.](https://github.com/wilecoyotegenius).

## 2.2.0

### New control(s)

- `PropertyFieldTeamPicker`: new Teams picker control [#303](https://github.com/pnp/sp-dev-fx-property-controls/pull/303)

### Contributors

Special thanks to our contributor: [João Mendes](https://github.com/joaojmendes).

## 2.1.1

### Fixes

- Localizations fix [#311](https://github.com/pnp/sp-dev-fx-property-controls/issues/311)

## 2.1.0

### Enhancements

- Auto-generated localizations
- `PropertyFieldNumber`: ability to set float values [#299](https://github.com/pnp/sp-dev-fx-property-controls/pull/299)
- `PropertyFieldGuid`: new GUID editor control [#300](https://github.com/pnp/sp-dev-fx-property-controls/pull/300)
- `FolderExplorerService`: support special characters if folder name [#305](https://github.com/pnp/sp-dev-fx-property-controls/pull/305)
- `FilePicker`: Stock Images support [#306](https://github.com/pnp/sp-dev-fx-property-controls/pull/306)

### Fixes

- Documentation: Fixed formatting of list of Controls [#298](https://github.com/pnp/sp-dev-fx-property-controls/pull/298)
- `PropertyFieldNumber`: gives "Maximum update depth exceeded" error [#282](https://github.com/pnp/sp-dev-fx-property-controls/issues/282)
- Documentation fix: `PropertyFieldCollectionData` - required custom field should call `onUpdate` before `onError` to correctly display required error message [#284](https://github.com/pnp/sp-dev-fx-property-controls/issues/284)
- `PropertyFieldNumber`: Improper handling of falsey minValue or maxValue [#150](https://github.com/pnp/sp-dev-fx-property-controls/issues/150)
- `PropertyFieldFilePicker`: Org Assets library is not displayed [#295](https://github.com/pnp/sp-dev-fx-property-controls/issues/295)

### Contributors

Special thanks to our contributors (in alphabetical order): [Anoop Tatti](https://github.com/anoopt), [Gautam Sheth](https://github.com/gautamdsheth), [Jim Love](https://github.com/jimmywim).

## 2.0.0

### New control(s)

- `Office UI Fabric` version 6 support

## 1.20.0

### New control(s)

- `PropertyFieldRoleDefinitionPicker`: new Role Definition Picker control [#268](https://github.com/pnp/sp-dev-fx-property-controls/pull/268)
- `PropertyFieldFolderPicker`: new Folder Picker control [#272](https://github.com/pnp/sp-dev-fx-property-controls/issues/272)
- `PropertyPaneMarkdownContent`: new Markdown Content control [#162](https://github.com/pnp/sp-dev-fx-property-controls/issues/162)

### Enhancements

- `PropertyFieldCollectionData`: Dynamic options [#260](https://github.com/pnp/sp-dev-fx-property-controls/issues/260)

### Fixes

- Documentation fix: Link to `PropertyFieldListPicker` control points to `PropertyFieldMessage` [#269](https://github.com/pnp/sp-dev-fx-property-controls/issues/269)
- Readme fix: fixed link to project guides [#271](https://github.com/pnp/sp-dev-fx-property-controls/pull/271)
- `PropertyFieldViewPicker`: Unable to load Views from another site [#263](https://github.com/pnp/sp-dev-fx-property-controls/issues/263)

### Contributors

Special thanks to our contributors (in alphabetical order): [Gautam Sheth](https://github.com/gautamdsheth), [Hugo Bernier](https://github.com/hugoabernier), [Lars Fernhomberg](https://github.com/lafe).

## 1.19.0

### New control(s)

- `PropertyFieldMessage`: new Message control [#248](https://github.com/pnp/sp-dev-fx-property-controls/pull/248)
- `PropertyFieldSearch`: new Search control [#248](https://github.com/pnp/sp-dev-fx-property-controls/pull/248)
- `PropertyFieldSpinner`: new Spinner control [#248](https://github.com/pnp/sp-dev-fx-property-controls/pull/248)
- `PropertyFieldFilePicker`: new File Picker control [#265](https://github.com/pnp/sp-dev-fx-property-controls/pull/265)

### Enhancements

- `PropertyFieldDateTimePicker`: Add ability to hide Date and show only Time field [#195](https://github.com/pnp/sp-dev-fx-property-controls/issues/195)
- `PropertyFieldCodeEditor`: Format code [#165](https://github.com/pnp/sp-dev-fx-property-controls/issues/165)

### Fixes

- Documentation fix for `PropertyFieldDateTimePicker`: The link for `OnGetErrorMessage` documentation is broken in this page
- Documentation: Added `PnPTelemetry` import example [#259](https://github.com/pnp/sp-dev-fx-property-controls/pull/259)
- `PropertyPanePropertyEditor`:Fix for dynamic data properties [#200](https://github.com/pnp/sp-dev-fx-property-controls/issues/200)
- `PropertyFieldPeoplePicker`: People Picker doesn't search for groups [#239](https://github.com/pnp/sp-dev-fx-property-controls/issues/239)
- Controls with callout: control's label should be disabled if the `disabled` prop is set to `true`

### Contributors

Special thanks to our contributors (in alphabetical order): [Lars Fernhomberg](https://github.com/lafe), [João Mendes](https://github.com/joaojmendes), [Nanddeep Nachan](https://github.com/nanddeepn), [Ram](https://github.com/RamPrasadMeenavalli), [Gautam Sheth](https://github.com/gautamdsheth).

## 1.18.0

### New control(s)

- `PropertyFieldViewPicker`: View picker control [#230](https://github.com/pnp/sp-dev-fx-property-controls/pull/230)
- `PropertyFieldPassword`: password editor control [#237](https://github.com/pnp/sp-dev-fx-property-controls/pull/237)

### Fixes

- `PropertyFieldSitePicker` documentation title fix [#229](https://github.com/pnp/sp-dev-fx-property-controls/pull/229)
- `PropertyFieldSitePicker`: doesn't work at root site [#231](https://github.com/pnp/sp-dev-fx-property-controls/issues/231)

### Contributors

Special thanks to our contributors (in alphabetical order): [Ari Gunawan](https://github.com/AriGunawan), [Gautam Sheth](https://github.com/gautamdsheth), [Hugo Bernier](https://github.com/hugoabernier), [João Mendes](https://github.com/joaojmendes).

## 1.17.0

### New control(s)

- `PropertyFieldSitePicker`: New control that allows the user to select one or multiple sites from the SharePoint Search API. Similar to the SitePicker in the official "News" Web Part [#208](https://github.com/pnp/sp-dev-fx-property-controls/pull/208), [#215](https://github.com/pnp/sp-dev-fx-property-controls/pull/215)
- `Telemetry`: Provide a way to opt-out for PnP Telemetry [#222](https://github.com/pnp/sp-dev-fx-property-controls/pull/222)
- `PropertyPaneHelpers`: Allows to show a spinner while loading resources

### Enhancements

- Add norwegian language file [#125](https://github.com/pnp/sp-dev-fx-property-controls/pull/125)
- `PropertyFieldSliderWithCallout`: debounce property added [#209](https://github.com/pnp/sp-dev-fx-property-controls/pull/209)
- Replace full lodash with only used functions. [#213](https://github.com/pnp/sp-dev-fx-property-controls/pull/213)

### Fixes

- Documentation update for `PropertyFieldCollectionData` [#196](https://github.com/pnp/sp-dev-fx-property-controls/issues/196)
- `PropertyFieldOrder`: When items is an empty array, component renders the text '0' [#152](https://github.com/pnp/sp-dev-fx-property-controls/issues/152)
- Documentation update for `PropertyFieldCodeEditor` [#194](https://github.com/pnp/sp-dev-fx-property-controls/pull/194)
- `PropertyFieldTermPicker`: Tags icon styling issue on IE11 [#193](https://github.com/pnp/sp-dev-fx-property-controls/issues/193)
- `PropertyPanePropertyEditor`: Unable to download json export [#210](https://github.com/pnp/sp-dev-fx-property-controls/issues/210)
- `PropertyFieldCollectionData`: Fix Data Grid Dragging Issues [#217](https://github.com/pnp/sp-dev-fx-property-controls/pull/217)

### Contributors

Special thanks to our contributors (in alphabetical order): [Antonio Monserrate](https://github.com/antoniomonserrate), [rocketboy1908](https://github.com/rocketboy1908), [Piotr Siatka](https://github.com/siata13), [Ben](https://github.com/benkenawell), [Niels Söth](https://github.com/nsoeth), [araver](https://github.com/araver).

## 1.16.0

### Enhancements

- `PropertyFieldCollectionData`: Add the ability for field validation to the custom fields [#187](https://github.com/pnp/sp-dev-fx-property-controls/issues/190)
- `PropertyFieldCollectionData`: Ability to provide custom labels for the save and cancel buttons [#187](https://github.com/pnp/sp-dev-fx-property-controls/issues/187)
- `PropertyFieldListPicker`: add ability to filter the control via OData [#184](https://github.com/pnp/sp-dev-fx-property-controls/issues/184)

### Fixes

- Documentation getting started links fixed [#191](https://github.com/pnp/sp-dev-fx-property-controls/issues/191)
- Fix for callout controls missing icon since SPFx `1.8.2` [#182](https://github.com/pnp/sp-dev-fx-property-controls/issues/182)

### Contributors

Special thanks to our contributors (in alphabetical order): [araver](https://github.com/araver), [Chad Eiserloh](https://github.com/c-eiser13).

## 1.15.0

### Enhancements

- `PropertyFieldCollectionData`: Add a property to be able to set a custom class on the collection data panel [#180](https://github.com/pnp/sp-dev-fx-property-controls/issues/180)
- `PropertyFieldListPicker`: Added `listsToExclude` property to the control [#176](https://github.com/pnp/sp-dev-fx-property-controls/issues/176)
- `PropertyFieldDateTimePicker`: Add ability to hide the date and time labels [#77](https://github.com/pnp/sp-dev-fx-property-controls/issues/77)

### Fixes

- Callout icons missing with SPFx `1.8.2` web part [#178](https://github.com/pnp/sp-dev-fx-property-controls/issues/178)
- `PropertyFieldTextWithCallout`: still persists property value when error occurred [#172](https://github.com/pnp/sp-dev-fx-property-controls/issues/172)
- `PropertyFieldNumber`: not handling changes correctly [#170](https://github.com/pnp/sp-dev-fx-property-controls/issues/170)
- `PropertyFieldChoiceGroupWithCallout`: iconProps not working [#154](https://github.com/pnp/sp-dev-fx-property-controls/issues/154)
- `PropertyFieldDropdownWithCallout`: Options of type `Divider` and `Header` are ignored [#145](https://github.com/pnp/sp-dev-fx-property-controls/issues/145)

### Contributors

Special thanks to our contributors (in alphabetical order): [Alex Terentiev](https://github.com/AJIXuMuK), [Ward Wilmsen](https://github.com/WardWilmsen).

## 1.14.1

### Fixes

- `TaxonomyPicker`: Terms are sorted incorrectly under the wrong parent [#153](https://github.com/pnp/sp-dev-fx-property-controls/issues/153)
- `EnterpriseTermPicker`: Terms are sorted incorrectly under the wrong parent [#156](https://github.com/pnp/sp-dev-fx-property-controls/issues/156)

## 1.14.0

### New control(s)

- `PropertyFieldEnterpriseTermPicker`: New control to load term sets by using `@pnp/pnpjs` [#70](https://github.com/pnp/sp-dev-fx-property-controls/issues/70) [#120](https://github.com/pnp/sp-dev-fx-property-controls/issues/120)

### Enhancements

- `PropertyFieldCollectionData`: Setting to specify if item `creation` is enabled/disabled [#130](https://github.com/pnp/sp-dev-fx-property-controls/issues/130)
- `PropertyFieldCollectionData`: Setting to specify if item `deletion` is enabled/disabled [#131](https://github.com/pnp/sp-dev-fx-property-controls/issues/131)
- `PropertyFieldCollectionData`: Implemented a property to specify if field `editing` is enabled/disabled [#132](https://github.com/pnp/sp-dev-fx-property-controls/issues/132)
- Added `Chinese` localization [#137](https://github.com/pnp/sp-dev-fx-property-controls/issues/137)
- `PropertyFieldColorPicker`: Added a `isHidden` property [#138](https://github.com/pnp/sp-dev-fx-property-controls/issues/138)
- `PropertyFieldCollectionData`: return the item in the custom renderer [#147](https://github.com/pnp/sp-dev-fx-property-controls/issues/147)
- Added `Russian` localization [#142](https://github.com/pnp/sp-dev-fx-property-controls/issues/142)

### Fixes

- `PropertyFieldTermPicker`: fix sort order with lowercased terms [#133](https://github.com/pnp/sp-dev-fx-property-controls/issues/133)
- `PropertyFieldCollectionData`: Bug with onCustomRender() [#135](https://github.com/pnp/sp-dev-fx-property-controls/issues/135)
- `PropertyFieldCollectionData`: Fixed bug with dropdown rendering in IE [#136](https://github.com/pnp/sp-dev-fx-property-controls/issues/136)
- `PropertyFieldNumber`: Min/max number check fix + localization label fixes [#141](https://github.com/pnp/sp-dev-fx-property-controls/pull/141)
- `PropertyFieldTermPicker`: Fix layout issues in IE11 [#143](https://github.com/pnp/sp-dev-fx-property-controls/pull/143)

### Contributors

Special thanks to our contributors (in alphabetical order): [Simon-Pierre Plante](https://github.com/spplante), [Yannick Plenevaux](https://github.com/ypcode), [Alex Terentiev](https://github.com/AJIXuMuK), [Roger Zhang](https://github.com/RogerZhang-CatapultSystems).

## 1.13.1

### Fixes

- `PropertyFieldCollectionData`: Fixed issue for loading the control in the local workbench [#128](https://github.com/pnp/sp-dev-fx-property-controls/issues/128)

## 1.13.0

### Enhancements

- Updated the `office-ui-fabric-react` to the same version as in SPFx 1.7.0 [#105](https://github.com/pnp/sp-dev-fx-property-controls/issues/105)
- `PropertyFieldPeoplePicker`: Ability to select only from a specific site [#9](https://github.com/pnp/sp-dev-fx-property-controls/issues/9)
- `PropertyFieldCollectionData`: Added support for custom field rendering [#122](https://github.com/pnp/sp-dev-fx-property-controls/issues/122)
- `PropertyFieldCollectionData`: Added the functionality to sort the items in the collection [#123](https://github.com/pnp/sp-dev-fx-property-controls/issues/123)

### Fixes

- `PropertyFieldDateTimePicker`: Fix for the hours dropdown not showing values [#112](https://github.com/pnp/sp-dev-fx-property-controls/issues/112)
- `PropertyFieldCollectionData`: Issue with debounce validation overriding the inserted values [#113](https://github.com/pnp/sp-dev-fx-property-controls/issues/113)
- `PropertyPaneWebPartInformation`: Remove redundant 'Description' label [#119](https://github.com/pnp/sp-dev-fx-property-controls/issues/119)
- `PropertyFieldCodeEditor`: Handle initial value after updating properties [#121](https://github.com/pnp/sp-dev-fx-property-controls/issues/121)

### Contributors

Special thanks to our contributor: [Erwin van Hunen](https://github.com/erwinvanhunen).

## 1.12.0

### New control(s)

- `PropertyPaneWebPartInformation`: New control to show more information about the current web part [#108](https://github.com/pnp/sp-dev-fx-property-controls/issues/108)
- `PropertyPanePropertyEditor`: New control that allows you to export/import property pane settings [#114](https://github.com/pnp/sp-dev-fx-property-controls/issues/114)

### Enhancements

- Dutch localization added [#82](https://github.com/pnp/sp-dev-fx-property-controls/issues/82)
- French localization added [#84](https://github.com/pnp/sp-dev-fx-property-controls/issues/84)
- `PropertyFieldCollectionData`: Allow the user to specify a deferred validation time for each field [#98](https://github.com/pnp/sp-dev-fx-property-controls/issues/98)
- `PropertyFieldCollectionData`: added a onRenderOption option to allow custom option rendering [#102](https://github.com/pnp/sp-dev-fx-property-controls/issues/102)
- `PropertyFieldNumber`: Introduced the aria label [#104](https://github.com/pnp/sp-dev-fx-property-controls/pull/104)
- Hide callout from the controls with callout if no message is provided [#107](https://github.com/pnp/sp-dev-fx-property-controls/issues/107)
- `PropertyFieldListPicker`: Add the ability to refresh target site while pane is open [#109](https://github.com/pnp/sp-dev-fx-controls-react/pull/109)

### Fixes

- `PropertyFieldCollectionData`: Fixed catastrophic backtracking regex issue for URL validation [#99](https://github.com/pnp/sp-dev-fx-property-controls/issues/99)

### Contributors

Special thanks to our contributors (in alphabetical order): [Paul Bullock](https://github.com/pkbullock), [Junle Li](https://github.com/lijunle), [PooLP](https://github.com/PooLP), [Erwin van Hunen](https://github.com/erwinvanhunen).

## 1.11.0

### Enhancements

- `PropertyFieldCollectionData`: Show error messages [#96](https://github.com/pnp/sp-dev-fx-property-controls/issues/96)

### Fixes

- Fixes based on SonarCloud analysis

## 1.10.0

### Enhancements

- `PropertyFieldPeoplePicker`: Security groups come back with EntityType of `FormsRole` rather then `SecGroup` [#93](https://github.com/pnp/sp-dev-fx-property-controls/issues/93)
- `PropertyFieldCollectionData`: Add the current row's information in the `onGetErrorMessage` callback [#92](https://github.com/pnp/sp-dev-fx-property-controls/issues/92)

### Fixes

- `PropertyFieldPeoplePicker`: No suggestions returned when using Security Groups, Multi-select and NO duplicates. [#90](https://github.com/pnp/sp-dev-fx-property-controls/issues/90)
- `PropertyFieldTermPicker`:  Terms which are set as unavailable for tagging are still selectable [#94](https://github.com/pnp/sp-dev-fx-property-controls/issues/94)

## 1.9.0

### Enhancements

- `PropertyFieldCollectionData`: Added custom validation for `string`, `number`, `icon`, and `URL` field types [#74](https://github.com/pnp/sp-dev-fx-property-controls/issues/74)
- `PropertyFieldCollectionData`: Add an option to specify a default value [#86](https://github.com/pnp/sp-dev-fx-property-controls/issues/86)
- `PropertyFieldCollectionData`: override placeholder for the inputs [#87](https://github.com/pnp/sp-dev-fx-property-controls/issues/87)
- `PropertyFieldCollectionData`: Hide save button when "Add and save" is shown [#88](https://github.com/pnp/sp-dev-fx-property-controls/issues/88)

### Fixes

- `PropertyFieldMultiSelect`: fixed an issue where the control didn't retain the preselected values when dropdown options were provided async [#85](https://github.com/pnp/sp-dev-fx-property-controls/issues/85)
- `PropertyFieldOrder`: fixed an issue where items where provided async [#81](https://github.com/pnp/sp-dev-fx-property-controls/issues/81)

## 1.8.0

### Enhancements

- New telemetry approach which allows you to use Application Insights instance [#79](https://github.com/pnp/sp-dev-fx-property-controls/issues/79)
- `PropertyFieldListPicker`: add optional property for target site [#21](https://github.com/pnp/sp-dev-fx-property-controls/issues/21)

### Contributors

Special thanks to our contributor: [Joel Rodrigues](https://github.com/joelfmrodrigues).

## 1.7.0

### Enhancements

- Add `npm postinstall` script to automatically add the localization config [#64](https://github.com/pnp/sp-dev-fx-property-controls/issues/64)
- Add a description to the `PropertyFieldCollectionData` panel [#67](https://github.com/pnp/sp-dev-fx-property-controls/issues/67)
- Added a font field type for the `PropertyFieldCollectionData` control [#66](https://github.com/pnp/sp-dev-fx-property-controls/issues/66)
- Added a URL field type for the `PropertyFieldCollectionData` control [#72](https://github.com/pnp/sp-dev-fx-property-controls/issues/72)
- Field validation implemented to enable/disable save buttons in `PropertyFieldCollectionData` control. Related to previous enhancement.
- Added properties to the `TaxonomyPicker` to specify which terms are disabled/not-selectable [#69](https://github.com/pnp/sp-dev-fx-property-controls/issues/69)

### Fixes

- `PropertyFieldPeoplePicker` validation error does not clear as expected [#68](https://github.com/pnp/sp-dev-fx-property-controls/issues/68)

## 1.6.0

### New control(s)

- `PropertyFieldCollectionData` was added [#58](https://github.com/pnp/sp-dev-fx-property-controls/issues/58)
- `PropertyFieldOrder` was added [#19](https://github.com/pnp/sp-dev-fx-property-controls/issues/19)
- `PropertyFieldSwatchColorPicker` was added [#55](https://github.com/pnp/sp-dev-fx-property-controls/issues/55)

### Enhancements

- Allow the term set to be selectable in the `PropertyFieldTermPicker` [#60](https://github.com/pnp/sp-dev-fx-property-controls/issues/60)

### Fixes

- Fix for `PropertyFieldColorPicker` Palette Icon alignment issue in IE11 [#56](https://github.com/pnp/sp-dev-fx-property-controls/issues/56)

## 1.5.1

### Enhancements

- Color Pickers optionally return Color Objects [#55](https://github.com/pnp/sp-dev-fx-property-controls/issues/55)

### Fixes

- Undefined web part context fixed in the `PropertyFieldPeoplePicker` [#47](https://github.com/pnp/sp-dev-fx-property-controls/issues/47)
- Taxonomy service fix for working with term set GUID [#48](https://github.com/pnp/sp-dev-fx-property-controls/issues/48)
- Added focus intercepting input for Full style [#52](https://github.com/pnp/sp-dev-fx-property-controls/issues/52)

## 1.5.0

### Enhancements

- `PropertyFieldListPicker` control extended with select all lists option [#8](https://github.com/pnp/sp-dev-fx-property-controls/issues/8)
- `PropertyFieldTermPicker` control extended with the ability to search terms by typing in the textbox [#11](https://github.com/pnp/sp-dev-fx-property-controls/issues/11) [#42](https://github.com/pnp/sp-dev-fx-property-controls/issues/42) [#44](https://github.com/pnp/sp-dev-fx-property-controls/issues/44) [#45](https://github.com/pnp/sp-dev-fx-property-controls/issues/45)
- `SPTermStorePickerService` has a new interface which contains only the required properties

## 1.4.2

### Enhancements

- Introduced the `onGetErrorMessage` property for the `PropertyFieldNumber` field control ([#36](https://github.com/pnp/sp-dev-fx-property-controls/issues/36))

## 1.4.1

### Enhancements

- Optimized telemetry so that it only pushes control data

### Fixes

- Fixes for issue [#30](https://github.com/pnp/sp-dev-fx-property-controls/issues/30)
- `PropertyFieldPeoplePicker` Validation does not work as expected [#33](https://github.com/pnp/sp-dev-fx-property-controls/issues/33)

## 1.4.0

### New control(s)

- `PropertyFieldMultiSelect` got added
- `PropertyFieldNumber` got added

### Enhancements

- `PropertyFieldTermPicker` new introduced property to specify to show or hide the term store name: `hideTermStoreName`.
- `PropertyFieldTermPicker` updated process when terms were unselected based on ID instead of path.

## 1.3.0

### New control(s)

- `PropertyFieldCodeEditor` got added

### Enhancements

- `PropertyFieldTermPicker` improved with save and cancel button
- `PropertyFieldTermPicker` improved with `onClick` event on input field

## 1.2.0

### Enhancements

- Added the option to the people picker to allow you to specify single or multi-selection

### Fixes

- People picker accidentally picked the wrong person
- Improved telemetry with some object checks

## 1.1.1

### Enhancements

- Removed operation name from telemetry

## 1.1.0

### New control(s)

- Added the `PropertyFieldButtonWithCallout` control
- Added the `PropertyFieldCheckboxWithCallout` control
- Added the `PropertyFieldChoiceGroupWithCallout` control
- Added the `PropertyFieldWithCallout` control
- Added the `PropertyLabelWithCallout` control
- Added the `PropertyLinkWithCallout` control
- Added the `PropertySliderWithCallout` control

### Enhancements

- Telemetry added
- Term picker control has now the option to scope on term set or group

## 1.0.0

### New control(s)

- Added the `PropertyFieldDropdownWithCallout` control
- Added the `PropertyFieldTextWithCallout` control
- Added the `PropertyFieldToggleWithCallout` control

## 1.0.0-beta.3

### Enhancements

- Added `firstDayOfWeek` option to the date picker control

## 1.0.0-beta.2

### New control(s)

- Initial release
