# Releases

## 3.13.0

### Enhancements

- `PropertyFieldCollectionData`: add `panelProps` property to collection data [#546](https://github.com/pnp/sp-dev-fx-property-controls/pull/546)
- SharePoint Framework v1.17.1 support

### Fixes

- Italian localization updated [#549](https://github.com/pnp/sp-dev-fx-property-controls/pull/549)
- Fixed multiple typos [#550](https://github.com/pnp/sp-dev-fx-property-controls/pull/550)
- Swedish localization updated [#553](https://github.com/pnp/sp-dev-fx-property-controls/pull/553)
- `PropertyPanePropertyEditor`: crash when property undefined/null [#552](https://github.com/pnp/sp-dev-fx-property-controls/pull/552)

### Contributors

Special thanks to our contributors (in alphabetical order): [Chad Eiserloh](https://github.com/c-eiser13), [Gitwey](https://github.com/Gitwey), [Jake Stanger](https://github.com/JakeStanger), [Luca3082](https://github.com/Luca3082), [Valeras Narbutas](https://github.com/ValerasNarbutas).

## 3.12.0

### Enhancements

- `PropertyFieldFilePicker`: Site Tab - Adding scrolling for many libraries [#525](https://github.com/pnp/sp-dev-fx-property-controls/issues/525)
- `SPListPickerService`: add ContentTypes/Name to the query [#521](https://github.com/pnp/sp-dev-fx-property-controls/pull/521)
- Czech localization added [#527](https://github.com/pnp/sp-dev-fx-property-controls/issues/527)

### Fixes

- Documentations fix for `PropertyPaneHelpers` [#536](https://github.com/pnp/sp-dev-fx-property-controls/pull/536)
- `ColorPicker`: localization for Fluent UI `ColorPicker` [#535](https://github.com/pnp/sp-dev-fx-property-controls/issues/535)

### Contributors

Special thanks to our contributors (in alphabetical order): [Brian Krainer Jacobsen](https://github.com/krainer), [Chad Eiserloh](https://github.com/c-eiser13), [krishna-vijas](https://github.com/krishna-vijas), [Martin Zamazal](https://github.com/MartinZamazal).

## 3.11.0

### Enhancements

- SharePoint Framework v1.16.0 support

### Fixes

- `TermPicker`: missed documentation for `anchorId` property [#496](https://github.com/pnp/sp-dev-fx-property-controls/pull/496)
- `FilePicker`: Operations not working for 100+ Items [#497](https://github.com/pnp/sp-dev-fx-property-controls/issues/497)
- `FilePicker`: File Sorting not working on file size properly [#501](https://github.com/pnp/sp-dev-fx-property-controls/issues/501)
- `PropertyFieldMessage`: documentation typos fix [#504](https://github.com/pnp/sp-dev-fx-property-controls/pull/504)
- `FilePicker`: Sorting on Large Libraries / Folders Must do Server-Side Sorting [#503](https://github.com/pnp/sp-dev-fx-property-controls/issues/503)

### Contributors

Special thanks to our contributors (in alphabetical order): [Chad Eiserloh](https://github.com/c-eiser13), [Chandani Prajapati](https://github.com/chandaniprajapati), [Hilton Giesenow](https://github.com/HiltonGiesenow).

## 3.10.0

### Enhancements

- Arabic locale is missing [#461](https://github.com/pnp/sp-dev-fx-property-controls/issues/461)
- `PropertyFieldTermPicker`:  anchorId support [#491](https://github.com/pnp/sp-dev-fx-property-controls/issues/491)

### Fixes

- `FilePicker`: Fixed an internal typo in the codebase [#474](https://github.com/pnp/sp-dev-fx-property-controls/pull/474)
- `ListPicker`: documentation updates [#490](https://github.com/pnp/sp-dev-fx-property-controls/pull/490)
- `PropertyFieldCollectionData`: Adding new translation for Field Issues label [#486](https://github.com/pnp/sp-dev-fx-property-controls/pull/486)
- `FilePicker`: Page Type icons not appearing in the Site Pages library view [#475](https://github.com/pnp/sp-dev-fx-property-controls/issues/475)
- `FilePicker`: Tiles are Missing for Site Pages [#478](https://github.com/pnp/sp-dev-fx-property-controls/issues/478)
- `FilePicker`: Sorting Does Not Work [#487](https://github.com/pnp/sp-dev-fx-property-controls/issues/487)

### Contributors

Special thanks to our contributors (in alphabetical order): [Chad Eiserloh](https://github.com/c-eiser13), [JeanNetryValere](https://github.com/JeanNetryValere), [Hilton Giesenow](https://github.com/HiltonGiesenow), [nviolero](https://github.com/nviolero), [Paul Schaeflein](https://github.com/pschaeflein).

## 3.9.0

### Enhancements

- SharePoint Framework v1.15.2 support

## 3.8.0

### New control(s)

- Localizations for en-gb [#454](https://github.com/pnp/sp-dev-fx-property-controls/pull/454)

### Enhancements

- `PropertyFieldSitePicker`: Site Picker search for any input string [#386](https://github.com/pnp/sp-dev-fx-property-controls/pull/386)
- `fast-serve`: bump support to 1.14.0 [#386](https://github.com/pnp/sp-dev-fx-property-controls/pull/386)
- `PropertyFieldCollectionData`: allow to conditionally disable specific field in the item [#464](https://github.com/pnp/sp-dev-fx-property-controls/issues/464)

### Fixes

- `PropertyFieldListPicker`: Remove debugger [#455](https://github.com/pnp/sp-dev-fx-property-controls/pull/455)
- `PropertyFieldCollectionData`: Add button is invisible on a root site [#462](https://github.com/pnp/sp-dev-fx-property-controls/pull/462)
- `PropertyFieldCollectionData`: `fieldValidation` for custom fields did not get called if no `onGetErrorMessage` had been defined [#446](https://github.com/pnp/sp-dev-fx-property-controls/issues/446)

### Contributors

Special thanks to our contributors (in alphabetical order): [Gautam Sheth](https://github.com/gautamdsheth), [Jasey Waegebaert](https://github.com/Jwaegebaert), [IRRDC](https://github.com/IRRDC), [Markus Langer](https://github.com/MarkusLanger), [Milan Holemans](https://github.com/milanholemans), [Peter Cox](https://github.com/PeterWCox).

## 3.7.0

### Enhancements

- `PropertyFieldListPicker`: ability to provide content type id [#441](https://github.com/pnp/sp-dev-fx-property-controls/pull/441)
- `PropertyFieldColorPicker`: provide preview of the current selected color [#447](https://github.com/pnp/sp-dev-fx-property-controls/issues/447)

### Contributors

Special thanks to our contributors (in alphabetical order): [Milan Holemans](https://github.com/milanholemans), [Russell gove](https://github.com/russgove).

## 3.6.0

### New control(s)

- `PropertyFieldMonacoEditor`: new control - Monaco editor [#439](https://github.com/pnp/sp-dev-fx-property-controls/pull/439)

### Enhancements

- SharePoint Framework v1.14.0 support
- Improved documentation

### Fixes

- `PropertyFieldCollectionData`: Add button is disabled when it should not be [#436](https://github.com/pnp/sp-dev-fx-property-controls/issues/436)

### Contributors

Special thanks to our contributors (in alphabetical order): [Chad Eiserloh](https://github.com/c-eiser13), [GuidoZam](https://github.com/GuidoZam), [João Mendes](https://github.com/joaojmendes).

## 3.5.0

### Fixes

- Multiple controls: Update imports to support controls in ACEs [#431](https://github.com/pnp/sp-dev-fx-property-controls/issues/431)

## 3.4.0

### Enhancements

- `PropertyFieldFilePicker`: ability to set default tab [#412](https://github.com/pnp/sp-dev-fx-property-controls/issues/412)
- `PropertyFieldCollectionData`: ability to use `IconPicker` for icon field [#423](https://github.com/pnp/sp-dev-fx-property-controls/pull/423)
- `PropertyFieldFilePicker`: Added a feature to allow external links / Added a feature to show the Site Pages in the Site tab [#421](https://github.com/pnp/sp-dev-fx-property-controls/pull/421)

### Fixes

- `PropertyFieldSearch`: documentation fix [#417](https://github.com/pnp/sp-dev-fx-property-controls/pull/417)
- `FilePicker`: cannot find library by its name in multilingual sites [#389](https://github.com/pnp/sp-dev-fx-property-controls/issues/389)
- `PropertyFieldDateTimePicker`: `formatDate` property doesn't apply to the textbox value in the property pane [#388](https://github.com/pnp/sp-dev-fx-property-controls/issues/388)
- `PropertyFieldCollectionData`: number input shows placeholder instead of 0 [#379](https://github.com/pnp/sp-dev-fx-property-controls/issues/379)
- `PropertyFieldChoiceGroupWithCallout`: iconProps not working [#424](https://github.com/pnp/sp-dev-fx-property-controls/issues/424)

### Contributors

Special thanks to our contributors (in alphabetical order): [19ahmed99](https://github.com/19ahmed99), [Christian Frizell](https://github.com/chrisfriz), [GuidoZam](https://github.com/GuidoZam).

## 3.3.0

### Enhancements

- SharePoint Framework v1.13.* support
- `PropertyPanePropertyEditor`: Add translations for property editor control button and header [#399](https://github.com/pnp/sp-dev-fx-property-controls/pull/399)
- `PropertyFieldCollectionData`: Adds conditional column visibility [#394](https://github.com/pnp/sp-dev-fx-property-controls/pull/394)
- Include `mystrings.d.ts` in definition output [#393](https://github.com/pnp/sp-dev-fx-property-controls/pull/393)
- `PropertyFieldCollectionData`: `onGetErrorMessage` support for boolean, custom and color fields. [#395](https://github.com/pnp/sp-dev-fx-property-controls/pull/395)
- `PropertyFieldCodeEditor`: Added `panelWidth` property [#404](https://github.com/pnp/sp-dev-fx-property-controls/issues/404)
- `PropertyFieldCollectionData`: Allow falsey keys as dropdown options [#397](https://github.com/pnp/sp-dev-fx-property-controls/pull/397)
- `PropertyFieldFilePicker`: Add a handler to close a filepicker [#401](https://github.com/pnp/sp-dev-fx-property-controls/issues/401)

### Fixes

- `PropertyPanePropertyEditor`: Minor fix to allow PropertyEditor control to update properties when their current value is blank [#384](https://github.com/pnp/sp-dev-fx-property-controls/pull/384)
- `PropertyFieldSitePicker`: Some sites do not show up in Property Field Site Picker control [#402](https://github.com/pnp/sp-dev-fx-property-controls/issues/402)
- `PropertyFieldOrder`: Not working with array of objects [#396](https://github.com/pnp/sp-dev-fx-property-controls/issues/396)

### Contributors

Special thanks to our contributors (in alphabetical order): [ellinge](https://github.com/ellinge), [M365Bass](https://github.com/M365Bass), [Patrik Hellgren](https://github.com/patrikhellgren).

## 3.2.0

### Enhancements

- `PropertyFieldColorPicker`: Add debounce property to color picker control [#352](https://github.com/pnp/sp-dev-fx-property-controls/issues/352)
- `fast-serve`: Add fast-serve support [#370](https://github.com/pnp/sp-dev-fx-property-controls/pull/370/files)

### Fixes

- `PropertyFieldFilePicker`: Stock images url is getting a 404 server error [#364](https://github.com/pnp/sp-dev-fx-property-controls/issues/364)
- `PropertyFieldColumnPicker`: Filter not working properly [#356](https://github.com/pnp/sp-dev-fx-property-controls/issues/356)
- `PropertyFieldTextWithCallout`: Fix TextWithCallout read-only in SPFx 1.12.1 [#372](https://github.com/pnp/sp-dev-fx-property-controls/pull/372)
- `PropertyFieldFilePicker`: React crash on large folders [#371](https://github.com/pnp/sp-dev-fx-property-controls/pull/371)
- `PropertyFieldFilePicker`: documentation formatting fix [#368](https://github.com/pnp/sp-dev-fx-property-controls/pull/368)
- `PropertyFieldCollectionData`: PropertyFieldCollectionData is not setting sortIdx on resulting collection when using Add and Save [#369](https://github.com/pnp/sp-dev-fx-property-controls/issues/369)

### Contributors

Special thanks to our contributors (in alphabetical order): [Ari Gunawan](https://github.com/AriGunawan), [Chrisrb05](https://github.com/Chrisrb05), [Gautam Sheth](https://github.com/gautamdsheth), [Konrad K.](https://github.com/wilecoyotegenius), [Mark Bice](https://github.com/mbice), [Sergei Sergeev](https://github.com/s-KaiNet).

## 3.1.0

### Enhancements

- SharePoint Framework v1.12.1 support
- `PropertyFieldColumnPicker`: Multiselect dropdown option [#354](https://github.com/pnp/sp-dev-fx-property-controls/pull/354)

### Fixes

- `PropertyFieldSitePicker`: Site Picker doesn't return sites with title starting from the typed string [#355](https://github.com/pnp/sp-dev-fx-property-controls/issues/355)

### Contributors

Special thanks to our contributor: [Sudharsan Kesavanarayanan](https://github.com/sudharsank).

## 3.0.0

### Enhancements

- SharePoint Framework v1.12 support (Breaking change)
- FLuent UI v7 support

## 2.7.0

### Enhancements

- `PropertyFieldColorPicker`: Add debounce property to color picker control [#352](https://github.com/pnp/sp-dev-fx-property-controls/issues/352)

### Fixes

- `PropertyFieldFilePicker`: Stock images url is getting a 404 server error [#364](https://github.com/pnp/sp-dev-fx-property-controls/issues/364)
- `PropertyFieldColumnPicker`: Filter not working properly [#356](https://github.com/pnp/sp-dev-fx-property-controls/issues/356)
- `PropertyFieldFilePicker`: React crash on large folders [#371](https://github.com/pnp/sp-dev-fx-property-controls/pull/371)
- `PropertyFieldCollectionData`: PropertyFieldCollectionData is not setting sortIdx on resulting collection when using Add and Save [#369](https://github.com/pnp/sp-dev-fx-property-controls/issues/369)

### Contributors

Special thanks to our contributors (in alphabetical order): [Chrisrb05](https://github.com/Chrisrb05), [Konrad K.](https://github.com/wilecoyotegenius), [Mark Bice](https://github.com/mbice).

## 2.6.0

### Fixes

- `PropertyFieldSitePicker`: Site Picker doesn't return sites with title starting from the typed string [#355](https://github.com/pnp/sp-dev-fx-property-controls/issues/355)

## 2.5.0

### New control(s)

- `PropertyFieldEditableComboBox`: new editable combobox control based on Fluent ComboBox. [#339](https://github.com/pnp/sp-dev-fx-property-controls/pull/339)
- `PropertyFieldColumnPicker`: new column picker control [#343](https://github.com/pnp/sp-dev-fx-property-controls/pull/343)

### Fixes

- `PropertyFieldNumber`: The property field number is loosing decimal value on futher edits of the properties. [#344](https://github.com/pnp/sp-dev-fx-property-controls/issues/344)
- `PropertyFieldCollectionData`: validation error persists after item deletion [#341](https://github.com/pnp/sp-dev-fx-property-controls/issues/341)
- `FolderPicker`: Correct FolderPicker link alignment

### Contributors

Special thanks to our contributors (in alphabetical order): [Mike Homol](https://github.com/mhomol), [Sudharsan Kesavanarayanan](https://github.com/sudharsank), [Victor Pollet](https://github.com/TheThor59).

## 2.4.0

### Enhancements

- `PropertyFieldCodeEditor`: Added an `options` property to the CodeEditor. Allows setting of any of the Ace Editor options outlined [here](https://github.com/ajaxorg/ace/wiki/Configuring-Ace) [#322](https://github.com/pnp/sp-dev-fx-property-controls/pull/322)
- `PropertyFieldCollectionData`: Support for a Color Picker control [#326](https://github.com/pnp/sp-dev-fx-property-controls/issues/326)
- Support for nested web part properties (example: `targetProperty`: 'a.b.c') in all controls
- `PropertyFieldSitePicker`: display site URL [#330](https://github.com/pnp/sp-dev-fx-property-controls/issues/330)
- `PropertyPanePropertyEditor`: Support of dynamic properties (`DynamicData`) [#331](https://github.com/pnp/sp-dev-fx-property-controls/issues/331)

### Fixes

- Documentation fix for `PropertyFIeldPassword`: `value` is of type `string`, not `number`. [#324](https://github.com/pnp/sp-dev-fx-property-controls/pull/324)
- `PropertyFieldCollectionData`: Dropdown validation not working as expected [#321](https://github.com/pnp/sp-dev-fx-property-controls/issues/321)
- `PropertyFieldPeoplePicker`: targetProperty is not updated properly when using nested/complex attributes [#221](https://github.com/pnp/sp-dev-fx-property-controls/issues/221)
- `PropertyFieldSitePicker`: if a single subsite is selected all others are selected as well [#329](https://github.com/pnp/sp-dev-fx-property-controls/issues/329)

### Contributors

Special thanks to our contributors (in alphabetical order): [Corey Roth](https://github.com/coreyroth), [kflogdev](https://github.com/kflogdev).

## 2.3.0

### New control(s)

- `PropertyFieldIconPicker`: new icon picker control [#319](https://github.com/pnp/sp-dev-fx-property-controls/pull/319)

### Enhancements

- `PropertyFieldTermPicker`: two properties: `areTermsSelectable` and `areTermsHidden` [#313](https://github.com/pnp/sp-dev-fx-property-controls/pull/313)
- `PropertyFieldListPicker`: ability to return Title and relative URL of the list [#281](https://github.com/pnp/sp-dev-fx-property-controls/issues/281)

### Fixes

- Documentation fix: spelling fix on `index.md` [#320](https://github.com/pnp/sp-dev-fx-property-controls/pull/320)

### Contributors

Special thanks to our contributors (in alphabetical order): [Corey Roth](https://github.com/coreyroth), [Gautam Sheth](https://github.com/gautamdsheth), [Jonathan Cardy](https://github.com/johnnycardy), [Konrad K.](https://github.com/wilecoyotegenius).

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
