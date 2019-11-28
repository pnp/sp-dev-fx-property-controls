import { IPropertyFieldGroupOrPerson } from './../../propertyFields/peoplePicker/IPropertyFieldPeoplePicker';
import { DayOfWeek } from 'office-ui-fabric-react/lib/utilities/dateValues/DateValues';
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneToggle
} from '@microsoft/sp-webpart-base';
import { PropertyFieldCodeEditor, PropertyFieldCodeEditorLanguages } from '../../PropertyFieldCodeEditor';
import * as strings from 'PropertyControlsTestWebPartStrings';
import PropertyControlsTest from './components/PropertyControlsTest';
import { IPropertyControlsTestProps } from './components/IPropertyControlsTestProps';
import { IPropertyControlsTestWebPartProps } from './IPropertyControlsTestWebPartProps';
import { CalloutTriggers } from '../../PropertyFieldHeader';
import { PropertyFieldPeoplePicker, PrincipalType } from '../../PropertyFieldPeoplePicker';
import { PropertyFieldListPicker, PropertyFieldListPickerOrderBy } from '../../PropertyFieldListPicker';
import { PropertyFieldTermPicker } from '../../PropertyFieldTermPicker';
import { PropertyFieldDateTimePicker, DateConvention, TimeConvention } from '../../PropertyFieldDateTimePicker';
import { PropertyFieldColorPicker, PropertyFieldColorPickerStyle } from '../../PropertyFieldColorPicker';
import { PropertyFieldSpinButton } from '../../PropertyFieldSpinButton';
import { PropertyFieldDropdownWithCallout } from '../../PropertyFieldDropdownWithCallout';
import { PropertyFieldTextWithCallout } from '../../PropertyFieldTextWithCallout';
import { PropertyFieldToggleWithCallout } from '../../PropertyFieldToggleWithCallout';
import { PropertyFieldSliderWithCallout } from '../../PropertyFieldSliderWithCallout';
import { PropertyFieldChoiceGroupWithCallout } from '../../PropertyFieldChoiceGroupWithCallout';
import { PropertyFieldButtonWithCallout } from '../../PropertyFieldButtonWithCallout';
import { PropertyFieldCheckboxWithCallout } from '../../PropertyFieldCheckboxWithCallout';
import { PropertyFieldLabelWithCallout } from '../../PropertyFieldLabelWithCallout';
import { PropertyFieldLinkWithCallout } from '../../PropertyFieldLinkWithCallout';
import { PropertyFieldMultiSelect } from '../../PropertyFieldMultiSelect';
import { PropertyFieldNumber } from '../../PropertyFieldNumber';
import { PropertyFieldCollectionData, CustomCollectionFieldType } from '../../PropertyFieldCollectionData';
import { PropertyFieldOrder } from '../../PropertyFieldOrder';
import { orderedItem } from './components/OrderedItem';
import { PropertyFieldSwatchColorPicker, PropertyFieldSwatchColorPickerStyle } from '../../PropertyFieldSwatchColorPicker';
import { PropertyPaneWebPartInformation } from '../../propertyFields/webPartInformation';
import { PropertyPanePropertyEditor } from '../../propertyFields/propertyEditor/PropertyPanePropertyEditor';
import { PropertyFieldEnterpriseTermPicker } from '../../propertyFields/termPicker/PropertyFieldEnterpriseTermPicker';
import { ISPList } from '../../propertyFields/listPicker';
import { PropertyFieldSitePicker } from '../../PropertyFieldSitePicker';

/**
 * Web part that can be used to test out the various property controls
 */
export default class PropertyControlsTestWebPart extends BaseClientSideWebPart<IPropertyControlsTestWebPartProps> {
  private multiSelectProps = [];

  public render(): void {
    const element: React.ReactElement<IPropertyControlsTestProps> = React.createElement(
      PropertyControlsTest,
      {
        context: this.context,
        numberValue: this.properties.numberValue || 0,
        multiSelect: this.properties.multiSelect || [],
        people: this.properties.people || [],
        list: this.properties.singleList as string || "",
        listFiltered: this.properties.singleListFiltered || "",
        multiList: this.properties.multiList as string[] || [],
        multiListFiltered: this.properties.multiListFiltered || [],
        terms: this.properties.terms || [],
        datetime: this.properties.datetime || { value: null, displayValue: null },
        color: this.properties.color,
        colorObj: this.properties.colorObj,
        spinValue: this.properties.spinValue,
        dropdownWithCalloutKey: this.properties.dropdownWithCalloutKey,
        sliderWithCalloutValue: this.properties.sliderWithCalloutValue,
        choiceGroupWithCalloutValue: this.properties.choiceGroupWithCalloutValue,
        dropdownInfoHeaderKey: this.properties.dropdownInfoHeaderKey,
        textInfoHeaderValue: this.properties.textInfoHeaderValue,
        toggleInfoHeaderValue: this.properties.toggleInfoHeaderValue,
        checkboxWithCalloutValue: this.properties.checkboxWithCalloutValue,
        htmlCode: this.properties.htmlCode,
        collectionData: this.properties.collectionData,
        orderedItems: this.properties.orderedItems,
        swatchColor: this.properties.swatchColor,
        enterpriseTerms: this.properties.enterpriseTerms || [],
        sites: this.properties.sites || []
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected get disableReactivePropertyChanges(): boolean {
    return true;
  }

  private minLengthValidation(value: string, index: number, item: any): Promise<string> {
    return new Promise(resolve => {
      setTimeout(() => {
        console.log(`Currently editing item nr: ${index === null ? "new item" : index}. It contains the following properties:`, item);
        value.length >= 3 ? resolve("") : resolve("Should at least contain 3 characters.");
      }, (Math.floor(Math.random() * 4) + 1) * 100); // Random number between 1 - 4
    });
  }

  private ageValidation(value: number) {
    console.log(value);
    return value >= 18 ? "" : "Person should be at least 18 years old";
  }

  protected onPropertyPaneConfigurationStart(): void {
    setTimeout(() => {
      this.multiSelectProps = [
        {
          key: "EN",
          text: "EN"
        },
        {
          key: "FR",
          text: "FR"
        },
        {
          key: "NL",
          text: "NL"
        }
      ];
      this.context.propertyPane.refresh();
    }, 2000);
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {

    const dropdownWithCalloutSelectedKey: string = this.properties.dropdownWithCalloutKey || 'gryffindor';
    const dropdownWithCalloutCallountContent: JSX.Element = this.getDropdownInfoHeaderCalloutContent();

    return {
      pages: [
        {
          header: {
            description: '', //strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.AboutGroupName,
              groupFields: [
                PropertyPaneWebPartInformation({
                  description: `This is a <strong>demo webpart</strong>, used to demonstrate all the <a href="https://aka.ms/sppnp">PnP</a> property controls`,
                  moreInfoLink: `https://sharepoint.github.io/sp-dev-fx-property-controls/`,
                  videoProperties: {
                    embedLink: `https://www.youtube.com/embed/d_9o3tQ90zo`,
                    properties: { allowFullScreen: true }
                  },
                  key: 'webPartInfoId'
                })
              ]
            },
            {
              groupName: '', //strings.BasicGroupName,
              groupFields: [
                PropertyFieldCollectionData("collectionData", {
                  key: "collectionData",
                  label: "Collection data",
                  panelHeader: "Collection data panel header",
                  manageBtnLabel: "Manage collection data",
                  saveBtnLabel: "Save button",
                  saveAndAddBtnLabel: "Save + Add button",
                  cancelBtnLabel: "Cancel button",
                  panelDescription: "This is the description which appears in the panel.",
                  value: this.properties.collectionData,
                  enableSorting: true,
                  disableItemDeletion: false,
                  disableItemCreation: false,
                  panelClassName: "MyAwesomePanelClassName",
                  tableClassName: "MyAwesomeTableClassName",
                  fields: [
                    {
                      id: "Title",
                      title: "Firstname",
                      type: CustomCollectionFieldType.string,
                      required: true,
                      placeholder: "Enter the firstname",
                      onGetErrorMessage: this.minLengthValidation,
                      deferredValidationTime: 500,
                      disableEdit: true
                    },
                    {
                      id: "Lastname",
                      title: "Lastname",
                      type: CustomCollectionFieldType.string
                    },
                    {
                      id: "Age",
                      title: "Age",
                      type: CustomCollectionFieldType.number,
                      required: true,
                      placeholder: "Enter the age",
                      onGetErrorMessage: this.ageValidation,
                      deferredValidationTime: 0
                    },
                    {
                      id: "City",
                      title: "Favorite city",
                      type: CustomCollectionFieldType.dropdown,
                      options: [
                        {
                          key: "antwerp",
                          text: "Antwerp"
                        },
                        {
                          key: "helsinki",
                          text: "Helsinki"
                        },
                        {
                          key: "montreal",
                          text: "Montreal"
                        }
                      ],
                      required: true,
                      placeholder: "Favorite city of the person",
                      defaultValue: "antwerp",
                      onRenderOption: (props, defaultRenderer) => {
                        if (props.text.toLowerCase() === "antwerp") {
                          return React.createElement("b", { className: "Testing" }, `${props.text.toUpperCase()} 🎉`);
                        } else {
                          return defaultRenderer(props);
                        }
                      }
                    },
                    {
                      id: "Sign",
                      title: "Signed",
                      type: CustomCollectionFieldType.boolean,
                      defaultValue: true
                    },
                    {
                      id: "IconName",
                      title: "Icon Name",
                      type: CustomCollectionFieldType.fabricIcon,
                      placeholder: "Enter the name of the icon",
                      defaultValue: "website",
                      onGetErrorMessage: this.minLengthValidation
                    },
                    {
                      id: "URL",
                      title: "URL",
                      type: CustomCollectionFieldType.url,
                      required: true,
                      placeholder: "Enter a URL"
                    },
                    {
                      id: "custom",
                      title: "Custom Field",
                      type: CustomCollectionFieldType.custom,
                      onCustomRender: (field, value, onUpdate, item, itemId, onError) => {
                        return (
                          React.createElement("div", null,
                            React.createElement("input", {
                              key: itemId, value: value, onChange: (event: React.FormEvent<HTMLInputElement>) => {
                                if (event.currentTarget.value === "error") {
                                  onError(field.id, "Value shouldn't be equal to error");
                                } else {
                                  onError(field.id, "");
                                }
                                onUpdate(field.id, event.currentTarget.value);
                              }
                            }), " 🎉"
                          )
                        );
                      }
                    }
                  ],
                  disabled: false
                }),
                PropertyFieldPeoplePicker('people', {
                  label: 'PropertyFieldPeoplePicker',
                  initialData: this.properties.people,
                  allowDuplicate: false,
                  // principalType: [PrincipalType.Security],
                  principalType: [PrincipalType.Users, PrincipalType.SharePoint, PrincipalType.Security],
                  // principalType: [PrincipalType.Users, PrincipalType.SharePoint, PrincipalType.Security],
                  // principalType: [IPrincipalType.SharePoint],
                  multiSelect: true,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  context: this.context,
                  properties: this.properties,
                  onGetErrorMessage: (value: IPropertyFieldGroupOrPerson[]) => {
                    const users = value.filter(u => u.fullName.toLowerCase().indexOf("elio") !== -1);
                    return users.length === 0 ? 'Please use a person with "Elio" in its name' : "";
                  },
                  deferredValidationTime: 0,
                  key: 'peopleFieldId',
                  targetSiteUrl: this.context.pageContext.site.absoluteUrl
                }),
                PropertyFieldTermPicker('terms', {
                  label: 'Select terms',
                  panelTitle: 'Select terms',
                  initialValues: this.properties.terms,
                  allowMultipleSelections: true,
                  excludeSystemGroup: false,
                  disabledTermIds: ["943fd9f0-3d7c-415c-9192-93c0e54573fb", "0e415292-cce5-44ac-87c7-ef99dd1f01f4"],
                  // disabledTermIds: ["943fd9f0-3d7c-415c-9192-93c0e54573fb", "73d18756-20af-41de-808c-2a1e21851e44", "0e415292-cce5-44ac-87c7-ef99dd1f01f4"],
                  // disabledTermIds: ["cd6f6d3c-672d-4244-9320-c1e64cc0626f", "0e415292-cce5-44ac-87c7-ef99dd1f01f4"],
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  properties: this.properties,
                  context: this.context,
                  disabled: false,
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  //limitByGroupNameOrID: 'Test',
                  limitByTermsetNameOrID: '7276c08b-58c1-4fcd-812e-f21299a06b85',
                  isTermSetSelectable: true,
                  key: 'termSetsPickerFieldId',
                  hideTermStoreName: true
                }),
                PropertyFieldNumber("numberValue", {
                  key: "numberValue",
                  label: "Number value only",
                  description: "Number field description",
                  placeholder: "Please insert a number",
                  value: this.properties.numberValue,
                  maxValue: 10,
                  minValue: 1,
                  disabled: false
                }),
                PropertyFieldMultiSelect('multiSelect', {
                  key: 'multiSelect',
                  label: "Multi select field",
                  options: this.multiSelectProps,
                  selectedKeys: this.properties.multiSelect
                }),
                // PropertyFieldOrder("asyncOrderItems", {
                //   key: "asyncOrderItems",
                //   label: "Async order items",
                //   items: this.properties.multiSelect,
                //   properties: this.properties,
                //   onPropertyChange: this.onPropertyPaneFieldChanged
                // }),
                PropertyFieldCodeEditor('htmlCode', {
                  label: 'Edit HTML Code',
                  panelTitle: 'Edit HTML Code',
                  initialValue: this.properties.htmlCode,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  disabled: false,
                  key: 'codeEditorFieldId',
                  language: PropertyFieldCodeEditorLanguages.HTML
                }),
                PropertyPaneTextField("siteUrl", {
                  label: "Site URL"
                }),
                PropertyFieldListPicker('singleList', {
                  label: 'Select a list',
                  selectedList: this.properties.singleList,
                  includeHidden: false,
                  //baseTemplate: 109,
                  orderBy: PropertyFieldListPickerOrderBy.Title,
                  // multiSelect: false,
                  disabled: false,
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  properties: this.properties,
                  context: this.context,
                  onGetErrorMessage: (value: string) => {
                    return value;
                  },
                  deferredValidationTime: 0,
                  key: 'listPickerFieldId',
                  webAbsoluteUrl: this.properties.siteUrl || this.context.pageContext.web.absoluteUrl,
                  listsToExclude: ["cdn"],
                }),
                PropertyFieldListPicker('singleListFiltered', {
                  label: 'Select a list (Filtered)',
                  selectedList: this.properties.singleListFiltered,
                  // includeHidden: false,
                  // baseTemplate: 101,
                  orderBy: PropertyFieldListPickerOrderBy.Title,
                  // multiSelect: false,
                  disabled: false,
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  properties: this.properties,
                  context: this.context,
                  onGetErrorMessage: (value: string) => {
                    return value;
                  },
                  deferredValidationTime: 0,
                  key: 'listPickerFieldId',
                  webAbsoluteUrl: this.properties.siteUrl || this.context.pageContext.web.absoluteUrl,
                  listsToExclude: ["cdn"],
                  filter: "ItemCount gt 0",
                  onListsRetrieved: (lists: ISPList[]) => {
                    console.log("Lists", lists);
                    return lists;
                  }
                }),
                PropertyFieldListPicker('multiList', {
                  label: 'Select multiple lists',
                  selectedList: this.properties.multiList,
                  includeHidden: false,
                  //baseTemplate: 109,
                  orderBy: PropertyFieldListPickerOrderBy.Title,
                  multiSelect: true,
                  showSelectAll: true,
                  selectAllInList: false,
                  selectAllInListLabel: 'Select all',
                  disabled: false,
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  properties: this.properties,
                  context: this.context,
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  key: 'multiListPickerFieldId',
                  webAbsoluteUrl: this.properties.siteUrl || this.context.pageContext.web.absoluteUrl,
                  listsToExclude: ["cdn"]
                }),
                PropertyFieldListPicker('multiListFiltered', {
                  label: 'Select multiple lists (Filtered)',
                  selectedList: this.properties.multiListFiltered,
                  includeHidden: false,
                  //baseTemplate: 109,
                  orderBy: PropertyFieldListPickerOrderBy.Title,
                  multiSelect: true,
                  showSelectAll: true,
                  selectAllInList: false,
                  selectAllInListLabel: 'Select all',
                  disabled: false,
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  properties: this.properties,
                  context: this.context,
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  key: 'multiListPickerFieldId',
                  webAbsoluteUrl: this.properties.siteUrl || this.context.pageContext.web.absoluteUrl,
                  filter: "ItemCount gt 0",
                  onListsRetrieved: (lists: ISPList[]) => {
                    console.log("Lists", lists);
                    return Promise.resolve(lists);
                  },
                  listsToExclude: ["cdn"]
                }),
                PropertyFieldDateTimePicker('datetime', {
                  label: 'Select the date and time',
                  disabled: false,
                  initialDate: this.properties.datetime,
                  // formatDate: this._formatDateIso,
                  dateConvention: DateConvention.DateTime,
                  timeConvention: TimeConvention.Hours12,
                  firstDayOfWeek: DayOfWeek.Monday,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  key: 'dateTimeFieldId',
                  showLabels: false
                }),
                PropertyPaneToggle("isColorFieldVisible", {
                  label: "Color Field Visible",
                  checked: true
                }),
                PropertyFieldColorPicker('color', {
                  label: 'Color',
                  selectedColor: this.properties.color,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  //disabled: true,
                  //alphaSliderHidden: true,
                  //style: PropertyFieldColorPickerStyle.Full,
                  //iconName: 'Precipitation',
                  isHidden: this.properties.isColorFieldVisible === false,
                  key: 'colorFieldId'
                }),
                PropertyFieldColorPicker('colorObj', {
                  label: 'Color Object',
                  selectedColor: this.properties.colorObj,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  valueAsObject: true,
                  key: 'colorFieldId'
                }),
                PropertyFieldSpinButton('spinValue', {
                  label: 'Spin Value',
                  initialValue: this.properties.spinValue,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  //disabled: true,
                  suffix: 'px',
                  min: 0,
                  max: 5,
                  step: 0.25,
                  decimalPlaces: 2,
                  //incrementIconName: 'CalculatorAddition',
                  //decrementIconName: 'CalculatorSubtract',
                  key: 'spinButtonFieldId'
                }),
                PropertyFieldDropdownWithCallout('dropdownWithCalloutKey', {
                  calloutTrigger: CalloutTriggers.Hover,
                  key: 'dropdownWithCalloutFieldId',
                  label: 'Select your house',
                  options: [{
                    key: 'gryffindor',
                    text: 'Gryffindor'
                  }, {
                    key: 'hufflepuff',
                    text: 'Hufflepuff'
                  }, {
                    key: 'ravenclaw',
                    text: 'Ravenclaw'
                  }, {
                    key: 'slytherin',
                    text: 'Slytherin'
                  }],
                  selectedKey: dropdownWithCalloutSelectedKey,
                  calloutContent: dropdownWithCalloutCallountContent
                }),
                PropertyFieldTextWithCallout('textInfoHeaderValue', {
                  calloutTrigger: CalloutTriggers.Hover,
                  key: 'textWithCalloutFieldId',
                  label: 'Describe your PnP passion with few words',
                  calloutContent: React.createElement('span', {}, 'You can describe your passion with such words as strong, cosmic, all-absorbing, etc.'),
                  calloutWidth: 150,
                  value: this.properties.textInfoHeaderValue
                }),
                PropertyFieldToggleWithCallout('toggleInfoHeaderValue', {
                  calloutTrigger: CalloutTriggers.Click,
                  key: 'toggleWithCalloutFieldId',
                  label: 'Select your super hero universe',
                  calloutContent: React.createElement('p', {}, 'Select one of two universes of super heroes: DC comics with Superman, Batman, Wonder Woman, etc.; or Marvel with X-Men, Spider-Man, Avengers, etc.'),
                  onText: 'Marvel',
                  offText: 'DC Comics',
                  checked: this.properties.toggleInfoHeaderValue
                }),
                PropertyFieldSliderWithCallout('sliderWithCalloutValue', {
                  calloutContent: React.createElement('div', {}, 'Enter value for the item'),
                  calloutTrigger: CalloutTriggers.Click,
                  calloutWidth: 200,
                  key: 'sliderWithCalloutFieldId',
                  label: 'Slide to select the value',
                  max: 100,
                  min: 0,
                  step: 1,
                  showValue: true,
                  value: this.properties.sliderWithCalloutValue
                }),
                PropertyFieldSliderWithCallout('sliderWithCalloutValue', {
                  calloutContent: React.createElement('div', {}, 'Enter value for the item'),
                  calloutTrigger: CalloutTriggers.Click,
                  calloutWidth: 200,
                  key: 'sliderWithCalloutFieldId',
                  label: 'Slide to select the value with debounce 1000',
                  max: 100,
                  min: 0,
                  step: 1,
                  showValue: true,
                  value: this.properties.sliderWithCalloutValue,
                  debounce: 1000
                }),
                PropertyFieldChoiceGroupWithCallout('choiceGroupWithCalloutValue', {
                  calloutContent: React.createElement('div', {}, 'Select preferrable mobile platform'),
                  calloutTrigger: CalloutTriggers.Hover,
                  key: 'choiceGroupWithCalloutFieldId',
                  label: 'Preferred mobile platform',
                  options: [{
                    key: 'iOS',
                    text: 'iOS',
                    checked: this.properties.choiceGroupWithCalloutValue === 'iOS',
                    iconProps: {
                      officeFabricIconFontName: 'CheckMark'
                    }
                  }, {
                    key: 'Android',
                    text: 'Android',
                    checked: this.properties.choiceGroupWithCalloutValue === 'Android',
                    iconProps: {
                      officeFabricIconFontName: 'CheckMark'
                    }
                  }, {
                    key: 'Other',
                    text: 'Other',
                    checked: this.properties.choiceGroupWithCalloutValue === 'Other',
                    iconProps: {
                      officeFabricIconFontName: 'CheckMark'
                    }
                  }]
                }),
                PropertyFieldButtonWithCallout('fakeProperty', {
                  calloutTrigger: CalloutTriggers.Click,
                  key: 'buttonWithCalloutFieldId',
                  calloutContent: React.createElement('p', {}, 'Tests connection to the database with the parameters listed above'),
                  calloutWidth: 150,
                  text: 'Test connection',
                  onClick: () => { alert('Code to test connection goes here'); }
                }),
                PropertyFieldCheckboxWithCallout('checkboxWithCalloutValue', {
                  calloutTrigger: CalloutTriggers.Click,
                  key: 'checkboxWithCalloutFieldId',
                  calloutContent: React.createElement('p', {}, 'Check the checkbox to accept Application Terms and Conditions'),
                  calloutWidth: 200,
                  text: 'Accept terms and conditions',
                  checked: this.properties.checkboxWithCalloutValue
                }),
                PropertyFieldLabelWithCallout('fakeProp', {
                  calloutTrigger: CalloutTriggers.Click,
                  key: 'LabelWithCalloutFieldId',
                  calloutContent: 'Use dropdowns below to select list and list\'s field to work with',
                  calloutWidth: 200,
                  text: 'Select List and Field'
                }),
                PropertyFieldLinkWithCallout('fakeProp', {
                  calloutTrigger: CalloutTriggers.Click,
                  key: 'linkWithCalloutFieldId',
                  calloutContent: React.createElement('p', {}, 'Click the link to open a new page with Application Terms & Conditions'),
                  calloutWidth: 200,
                  text: 'Terms & Conditions',
                  href: 'https://github.com/SharePoint/sp-dev-fx-property-controls',
                  target: '_blank'
                }),
                PropertyFieldOrder("orderedItems", {
                  key: "orderedItems",
                  label: "Ordered Items",
                  items: this.properties.orderedItems,
                  textProperty: "text",
                  //removeArrows: true,
                  //disableDragAndDrop: true,
                  //onRenderItem: orderedItem,
                  //maxHeight: 90,
                  //disabled: true,
                  properties: this.properties,
                  onPropertyChange: this.onPropertyPaneFieldChanged
                }),
                PropertyFieldSwatchColorPicker('swatchColor', {
                  label: 'Swatch Color',
                  selectedColor: this.properties.swatchColor,
                  colors: [
                    { color: '#ffb900', label: 'Yellow' },
                    { color: '#fff100', label: 'Light Yellow' },
                    { color: '#d83b01', label: 'Orange' },
                    { color: '#e81123', label: 'Red' },
                    { color: '#a80000', label: 'Dark Red' },
                    { color: '#5c005c', label: 'Dark Magenta' },
                    { color: '#e3008c', label: 'Light Magenta' },
                    { color: '#5c2d91', label: 'Purple' },
                    { color: '#0078d4', label: 'Blue' },
                    { color: '#00bcf2', label: 'Light Blue' },
                    { color: '#008272', label: 'Teal' },
                    { color: '#107c10', label: 'Green' },
                    { color: '#bad80a', label: 'Light Green' },
                    { color: '#eaeaea' },
                    { color: 'black', label: 'Black' },
                    { color: '#333333', label: 'Neutral' },
                    { color: 'rgba(102, 102, 102, 0.5)', label: 'Half Gray' }
                  ],
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  //disabled: true,
                  //style: PropertyFieldSwatchColorPickerStyle.Full,
                  //columnCount: 8,
                  //showAsCircles: true,
                  //iconName: 'FangBody',
                  key: 'swatchColorFieldId'
                }),
                PropertyFieldEnterpriseTermPicker('enterpriseTerms', {
                  label: 'Select enterprise terms',
                  panelTitle: 'Select enterprise terms',
                  initialValues: this.properties.enterpriseTerms,
                  allowMultipleSelections: true,
                  excludeSystemGroup: false,
                  disabledTermIds: ["98601196-66f3-470f-8555-6c4f3b46139c", "0e415292-cce5-44ac-87c7-ef99dd1f01f4"],
                  // disabledTermIds: ["943fd9f0-3d7c-415c-9192-93c0e54573fb", "73d18756-20af-41de-808c-2a1e21851e44", "0e415292-cce5-44ac-87c7-ef99dd1f01f4"],
                  // disabledTermIds: ["cd6f6d3c-672d-4244-9320-c1e64cc0626f", "0e415292-cce5-44ac-87c7-ef99dd1f01f4"],
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  properties: this.properties,
                  context: this.context,
                  disabled: false,
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  //limitByGroupNameOrID: 'ded538ee-6e07-4cf5-802a-3de4e1f2ea7a',
                  //limitByTermsetNameOrID: '77ca4514-a227-4155-a795-8c8af0ee57dd',
                  isTermSetSelectable: true,
                  key: 'enterpriseTermSetsPickerFieldId',
                  hideTermStoreName: true,
                  includeLabels: false
                }),
                PropertyFieldSitePicker('sites', {
                  label: 'Select sites',
                  initialSites: this.properties.sites,
                  context: this.context,
                  deferredValidationTime: 500,
                  multiSelect: true,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  key: 'sitesFieldId'
                })
              ]
            },
            {
              groupName: "Advanced",
              groupFields: [
                PropertyPanePropertyEditor({
                  webpart: this,
                  key: 'propertyeditor'
                })
              ]
            },
          ]
        }
      ]
    };
  }

  private getDropdownInfoHeaderCalloutContent(): JSX.Element {
    const selectedKey: string = this.properties.dropdownWithCalloutKey;

    if (selectedKey) {
      return React.createElement('div', {}, `you have selected ${selectedKey}`);
    }
    else {
      return React.createElement('div', {}, `you haven't selecte any house`);
    }
  }
}
