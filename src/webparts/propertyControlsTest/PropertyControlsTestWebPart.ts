import * as React from 'react';
import * as ReactDom from 'react-dom';

import * as strings from 'PropertyControlsTestWebPartStrings';

import { PanelType } from '@fluentui/react';
import { DocumentBulletListRegular } from '@fluentui/react-icons';
import { DayOfWeek } from '@fluentui/react/lib/DateTimeUtilities';
import { MessageBarType } from '@fluentui/react/lib/MessageBar';
import { SpinnerSize } from '@fluentui/react/lib/Spinner';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneToggle,
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import { PropertyPaneHelpers } from '../../helpers';
import { PropertyFieldMonacoEditor } from '../../PropertyFiedMonacoEditor';
import { PropertyFieldButton } from '../../PropertyFieldButton';
import {
  PropertyFieldButtonWithCallout,
} from '../../PropertyFieldButtonWithCallout';
import {
  PropertyFieldCheckboxWithCallout,
} from '../../PropertyFieldCheckboxWithCallout';
import {
  PropertyFieldChoiceGroupWithCallout,
} from '../../PropertyFieldChoiceGroupWithCallout';
import {
  PropertyFieldCodeEditor,
  PropertyFieldCodeEditorLanguages,
} from '../../PropertyFieldCodeEditor';
import {
  CustomCollectionFieldType,
  PropertyFieldCollectionData,
} from '../../PropertyFieldCollectionData';
import { PropertyFieldColorPicker } from '../../PropertyFieldColorPicker';
import {
  PropertyFieldColumnPicker,
  PropertyFieldColumnPickerOrderBy,
} from '../../PropertyFieldColumnPicker';
import {
  PropertyFieldContentTypeOrderBy,
  PropertyFieldContentTypePicker,
} from '../../PropertyFieldContentTypePicker';
import {
  DateConvention,
  PropertyFieldDateTimePicker,
  TimeConvention,
} from '../../PropertyFieldDateTimePicker';
import {
  PropertyFieldDropdownWithCallout,
} from '../../PropertyFieldDropdownWithCallout';
import {
  PropertyFieldEditableComboBox,
} from '../../PropertyFieldEditableComboBox';
import {
  IFilePickerResult,
  PropertyFieldFilePicker,
} from '../../PropertyFieldFilePicker';
import {
  IFolder,
  PropertyFieldFolderPicker,
} from '../../PropertyFieldFolderPicker';
import { PropertyFieldGuid } from '../../PropertyFieldGuid';
import { CalloutTriggers } from '../../PropertyFieldHeader';
import {
  PropertyFieldLabelWithCallout,
} from '../../PropertyFieldLabelWithCallout';
import {
  PropertyFieldLinkWithCallout,
} from '../../PropertyFieldLinkWithCallout';
import {
  PropertyFieldListPicker,
  PropertyFieldListPickerOrderBy,
} from '../../PropertyFieldListPicker';
import { PropertyFieldMessage } from '../../PropertyFieldMessage';
import { PropertyFieldMultiSelect } from '../../PropertyFieldMultiSelect';
import { PropertyFieldNumber } from '../../PropertyFieldNumber';
import { PropertyFieldOrder } from '../../PropertyFieldOrder';
import { PropertyFieldPassword } from '../../PropertyFieldPassword';
import {
  PrincipalType,
  PropertyFieldPeoplePicker,
} from '../../PropertyFieldPeoplePicker';
import {
  PropertyFieldRoleDefinitionPicker,
} from '../../PropertyFieldRoleDefinitionPicker';
import {
  IColumnReturnProperty,
  IPropertyFieldRenderOption,
} from '../../propertyFields/columnPicker';
import FieldErrorMessage
  from '../../propertyFields/errorMessage/FieldErrorMessage';
import { PropertyFieldIconPicker } from '../../propertyFields/iconPicker';
import { ISPList } from '../../propertyFields/listPicker';
import {
  IPropertyFieldGroupOrPerson,
} from '../../propertyFields/peoplePicker/IPropertyFieldPeoplePicker';
import {
  PropertyPanePropertyEditor,
} from '../../propertyFields/propertyEditor/PropertyPanePropertyEditor';
import { PropertyFieldGrid } from '../../propertyFields/propertyFieldGrid';
import { IItem } from '../../propertyFields/propertyFieldGrid/grid/IItem';
import { PropertyFieldTeamPicker } from '../../propertyFields/teamPicker';
import {
  PropertyFieldEnterpriseTermPicker,
} from '../../propertyFields/termPicker/PropertyFieldEnterpriseTermPicker';
import {
  PropertyPaneWebPartInformation,
} from '../../propertyFields/webPartInformation';
import { PropertyFieldSearch } from '../../PropertyFieldSearch';
import { PropertyFieldSitePicker } from '../../PropertyFieldSitePicker';
import {
  PropertyFieldSliderWithCallout,
} from '../../PropertyFieldSliderWithCallout';
import { PropertyFieldSpinButton } from '../../PropertyFieldSpinButton';
import { PropertyFieldSpinner } from '../../PropertyFieldSpinner';
import {
  PropertyFieldSwatchColorPicker,
} from '../../PropertyFieldSwatchColorPicker';
import { PropertyFieldTermPicker } from '../../PropertyFieldTermPicker';
import {
  PropertyFieldTextWithCallout,
} from '../../PropertyFieldTextWithCallout';
import {
  PropertyFieldToggleWithCallout,
} from '../../PropertyFieldToggleWithCallout';
import {
  PropertyFieldViewPicker,
  PropertyFieldViewPickerOrderBy,
} from '../../PropertyFieldViewPicker';
import { PropertyPaneMarkdownContent } from '../../PropertyPaneMarkdownContent';
import {
  IPropertyControlsTestProps,
} from './components/IPropertyControlsTestProps';
import PropertyControlsTest from './components/PropertyControlsTest';
import {
  IPropertyControlsTestWebPartProps,
} from './IPropertyControlsTestWebPartProps';

/**
 * Web part that can be used to test out the various property controls
 */
export default class PropertyControlsTestWebPart extends BaseClientSideWebPart<IPropertyControlsTestWebPartProps> {
  private multiSelectProps = [];
 private showMessageButton = false;
 private gridItems:IItem[] = [
    {
      key: "1",  
      icon: React.createElement(DocumentBulletListRegular) ,
        title: "File 1",
        description: "This is the first document"
    },
    {
      key: "2",
      icon: React.createElement(DocumentBulletListRegular) ,
      title: "File 2",
      description: "This is the first document"
  },
  {
    key: "3",
    icon: React.createElement(DocumentBulletListRegular) ,
    title: "File 3",
    description: "This is the first document"
},  
{
  key: "4",
  icon: React.createElement(DocumentBulletListRegular) ,
  title: "File 4",
  description: "This is the first document"
}
 ];

 protected monacoChange = (newValue: string, validationErrors: string[]) => {
   console.log('teste',newValue);

  }

  protected onPropertyPaneFieldChanged(propertyPath: string, oldValue: any, newValue: any): void {
    console.log("PropertyPaneFieldChanged", propertyPath, oldValue, newValue);
  }

   

  public render(): void {
    this.properties.monacoEditor = "";
    const element: React.ReactElement<IPropertyControlsTestProps> = React.createElement(
      PropertyControlsTest,
      {
        context: this.context,
        numberValue: this.properties.numberValue || 0,
        multiSelect: this.properties.multiSelect || [],
        people: this.properties.people || [],
        list: this.properties.singleList as string || "",
        listFiltered: this.properties.singleListFiltered || "",
        singleListMultipleBaseTemplate: this.properties.singleListMultipleBaseTemplate || "",
        view: this.properties.view,
        column: this.properties.column,
        multiColumn: this.properties.multiColumn,
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
        sites: this.properties.sites || [],
        password: this.properties.password,
        searchLibrary: this.properties.searchLibrary,
        message: this.properties.message,
        filePickerResult: this.properties.filePickerResult,
        roleDefinitions: this.properties.roleDefinitions || [],
        folderPicker: this.properties.folderPicker,
        guid: this.properties.guid,
        iconPicker: this.properties.iconPicker,
        editableComboBox: this.properties.editableComboBox,
        monacoEditor:  this.properties.monacoEditor,
        contentType : this.properties.contentType,
        gridItems :this.properties.gridItems  || [],
      }
    );

    ReactDom.render(element, this.domElement);
  }

  private wait() {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
        return;
      }, 1000);
    });
  }

  /**
   * Load property pane resources
   */
  protected async loadPropertyPaneResources(): Promise<void> {
    PropertyPaneHelpers.setSpinner({
      spinnerProps: {
        size: SpinnerSize.large,
        styles: {
          circle: {
            height: 80,
            width: 80
          }
        }
      }
    });

    await this.wait();

    PropertyPaneHelpers.clearSpinner();
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

  private comboBoxOptionAdded(text: string) {
    console.log(`${text} was added to the combo box.  This is your chance to do something about it!`);
  }

  private _onChangedPassword(value: string) {
    console.log(value);
  }

  private _onChangedTextWithCallout(value: string) {
    console.log(value);
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
          displayGroupsAsAccordion: true,
          groups: [
            {
              groupName: strings.AboutGroupName,
              isCollapsed: false,
              groupFields: [
                PropertyPaneWebPartInformation({
                  description: `This is a <strong>demo webpart</strong>, used to demonstrate all the <a href="https://aka.ms/sppnp">PnP</a> property controls`,
                  moreInfoLink: `https://pnp.github.io/sp-dev-fx-property-controls/`,
                  videoProperties: {
                    embedLink: `https://www.youtube.com/embed/d_9o3tQ90zo`,
                    properties: { allowFullScreen: true }
                  },
                  key: 'webPartInfoId'
                })
              ]
            },
            {
              groupName: 'Inputs',
              isCollapsed: true,
              groupFields: [
                PropertyFieldSearch("searchLibrary", {
                  key: "search",
                  placeholder: 'Search libraries',
                  value: this.properties.searchLibrary,
                  onSearch: (newValue) => { console.log(newValue); },
                  styles: { root: { margin: 10 } }
                }),
                PropertyFieldMessage("message", {
                  key: "0",
                  text: "Something went wrong, try later...",
                  messageType:
                    MessageBarType.error,
                  isVisible: true
                }),
                PropertyFieldMessage("message", {
                  key: "0",
                  text: "Completed!",
                  messageType:
                    MessageBarType.success,
                  isVisible: true
                }),
                PropertyFieldMessage("message", {
                  key: "0",
                  text: "long teste linne ,long teste linne , long teste linne , long teste linne , long teste linne , long teste linne , long teste linne , long teste linne , long teste linne , long teste linne , long teste linne , long teste linne , long teste linne , long teste linne , ",
                  multiline: true,
                  messageType:
                    MessageBarType.info,
                  isVisible: true
                }),
                PropertyFieldSpinner("", {
                  key: "sp3",
                  size: SpinnerSize.small,
                  isVisible: true,
                }),

                PropertyFieldSpinner("", {
                  key: "sp1",
                  size: SpinnerSize.medium,
                  isVisible: true,
                  label: "loading libraries..."
                }),
                PropertyFieldSpinner("", {
                  key: "sp2",
                  size: SpinnerSize.large,
                  isVisible: true,
                  label: "loading libraries large ..."
                }),

                PropertyFieldPassword('password', {
                  key: 'password',
                  label: "Password",
                  value: this.properties.password,
                  onChanged: this._onChangedPassword
                }),
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
                  panelProps: {
                    type: PanelType.extraLarge,
                    layerProps: {eventBubblingEnabled: true}                                        
                  },
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
                      id: "Country",
                      title: "Favorite country",
                      type: CustomCollectionFieldType.dropdown,
                      options: [
                        {
                          key: "netherlands",
                          text: "Netherlands"
                        },
                        {
                          key: "finland",
                          text: "Finland"
                        },
                        {
                          key: "canada",
                          text: "Canada"
                        },
                        {
                          key: "germany",
                          text: "Germany"
                        }
                      ],
                      required: true,
                      placeholder: "Favorite country of the person",
                      defaultValue: "netherlands"
                    },
                    {
                      id: "City",
                      title: "Favorite city",
                      type: CustomCollectionFieldType.dropdown,
                      options: (fieldId, item) => {
                        let options = [];
                        if (item["Country"] === "netherlands") {
                          options.push({ key: "antwerp", text: "Antwerp" });
                        } else if (item["Country"] === "finland") {
                          options.push({ key: "helsinki", text: "Helsinki" });
                        } else if (item["Country"] === "canada") {
                          options.push({ key: "montreal", text: "Montreal" });
                        } else if (item["Country"] === "germany") {
                          options.push({ key: "paderborn", text: "Paderborn" });
                          options.push({ key: "berlin", text: "Berlin" });
                        }
                        return options;
                      },
                      required: true,
                      placeholder: "Favorite city of the person",
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
                      onGetErrorMessage: this.minLengthValidation,
                      disable: (item) => !item.Sign
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
                PropertyFieldCollectionData('columns2', {
                  key: 'columnsKey2',
                  label: 'Table columns',
                  panelHeader: 'Configure table columns',
                  manageBtnLabel: 'Manage columns',
                  value: [],
                  fields: [
                    {
                      id: "customFieldId",
                      title: "Custom Field",
                      type: CustomCollectionFieldType.custom,
                      onCustomRender: (field, value, onUpdate, item, itemId, onError) => {
                        return (
                          React.createElement("div", null,
                            React.createElement("input", { key: itemId, value: value, onChange: (event: React.FormEvent<HTMLInputElement>) => {
                                onError(field.id, "Value shouldn't be equal to error");
                            }}), " 🎉"
                          )
                        );
                      }
                    }
                  ],
                }),
                PropertyFieldNumber("numberValue", {
                  key: "numberValue",
                  label: "Number value only",
                  description: "Number field description",
                  placeholder: "Please insert a number",
                  value: this.properties.numberValue,
                  maxValue: 10,
                  minValue: 0,
                  disabled: false,
                  precision: 2
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
                PropertyFieldGuid('guid', {
                  key: 'guid',
                  label: "GUID",
                  value: this.properties.guid,
                  errorMessage: "Please enter a correct GUID."
                }),
                PropertyFieldEditableComboBox('editableComboBox', {
                  disabled: false,
                  key: 'editableComboBox',
                  label: 'Editable ComboBox',
                  maxFillInLength: 50,
                  options: [ {key: 'Apples', text: 'Apples'}, {key: 'Oranges', text: 'Oranges'}],
                  properties: this.properties,
                  selectedText: 'Oranges',
                  showTooltip: false,
                  tooltipText: 'This is what the tooltip would say if it shows. lol',
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  onOptionAdded: this.comboBoxOptionAdded
                }),

              ]
            },
            {
              groupName: 'Site, Teams, Lists, and Views',
              isCollapsed: true,
              groupFields: [
                PropertyPaneTextField("siteUrl", {
                  label: "Site URL"
                }),
                PropertyFieldListPicker('singleList', {
                  label: 'Select a list',
                  selectedList: this.properties.singleList,
                  includeHidden: false,
                  //baseTemplate: 109,
                  orderBy: PropertyFieldListPickerOrderBy.Title,
                  multiSelect: true,
                  disabled: false,
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  properties: this.properties,
                  context: this.context,
                  onGetErrorMessage: (value: string) => {
                    return value;
                  },
                  contentTypeId:"0x0100",
                  deferredValidationTime: 0,
                  key: 'listPickerFieldId',
                  webAbsoluteUrl: this.properties.siteUrl || this.context.pageContext.web.absoluteUrl,
                  listsToExclude: ["cdn"],
                }),
                PropertyFieldListPicker('singleListMultipleBaseTemplate', {
                  label: 'Select a list (Multiple base template)',
                  selectedList: this.properties.singleListMultipleBaseTemplate,
                  baseTemplate: [101, 106, 107],
                  orderBy: PropertyFieldListPickerOrderBy.Title,
                  disabled: false,
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  properties: this.properties,
                  context: this.context,
                  deferredValidationTime: 0,
                  key: 'singleListMultipleBaseTemplateId',
                  webAbsoluteUrl: this.properties.siteUrl || this.context.pageContext.web.absoluteUrl,
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
                  // onGetErrorMessage: (value: string) => {
                  //   return value;
                  // },
                  contentTypeId:"0x0120",
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

                PropertyFieldContentTypePicker('contentType', {
                  label: 'Select a Content Type',
                  context: this.context,
                  selectedContentType: this.properties.contentType,
                  //listId: "0da3b4b7-8ebd-4f15-87ee-afae5cacadad",//this.properties.singleListFiltered,//"03B3B5BC-8F37-4E9F-B9CF-0B13C5B5E8B8",
                  disabled: false,
                  //webAbsoluteUrl:"https://pm3q.sharepoint.com/sites/PnPDemo",
                  orderBy: PropertyFieldContentTypeOrderBy.Name,
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  properties: this.properties,
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  key: 'contentTypePickerFieldId'
                }),
                PropertyFieldViewPicker('view', {
                  label: 'Select a view',
                  context: this.context,
                  selectedView: this.properties.view,
                  listId: this.properties.singleListFiltered,
                  disabled: false,
                  orderBy: PropertyFieldViewPickerOrderBy.Title,
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  properties: this.properties,
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  key: 'viewPickerFieldId'
                }),
                PropertyFieldColumnPicker('column', {
                    label: 'Select a column',
                    context: this.context,
                    selectedColumn: this.properties.column,
                    listId: this.properties.singleListFiltered,
                    disabled: false,
                    orderBy: PropertyFieldColumnPickerOrderBy.Title,
                    onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                    properties: this.properties,
                    onGetErrorMessage: null,
                    deferredValidationTime: 0,
                    key: 'columnPickerFieldId',
                    displayHiddenColumns: false,
                    columnReturnProperty: IColumnReturnProperty["Internal Name"],
                    columnsToExclude: ['Compliance Asset Id'],
                  }),
                  PropertyFieldColumnPicker('multiColumn', {
                    label: 'Select columns',
                    context: this.context,
                    selectedColumn: this.properties.multiColumn,
                    listId: this.properties.singleListFiltered,
                    disabled: false,
                    orderBy: PropertyFieldColumnPickerOrderBy.Title,
                    onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                    properties: this.properties,
                    onGetErrorMessage: null,
                    deferredValidationTime: 0,
                    key: 'multiColumnPickerFieldId',
                    displayHiddenColumns: false,
                    columnReturnProperty: IColumnReturnProperty["Internal Name"],
                    columnsToExclude: ['Compliance Asset Id'],
                    multiSelect: true,
                    renderFieldAs: IPropertyFieldRenderOption["Multiselect Dropdown"]
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
                PropertyFieldSitePicker('sites', {
                  label: 'Select sites',
                  initialSites: this.properties.sites,
                  context: this.context,
                  deferredValidationTime: 500,
                  multiSelect: true,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  key: 'sitesFieldId',
                  trimDuplicates: true,
                  disabled: false
                }),
                PropertyFieldTeamPicker('teams', {
                  key: 'teamsPicker',
                  context: this.context,
                  label: 'Teams',
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  initialTeams: this.properties.teams,
                  multiSelect: true
                })
              ]
            },
            {
              isCollapsed: true,
              groupName: 'Colors',
              groupFields: [
                PropertyPaneToggle("isColorFieldVisible", {
                  label: "Color Field Visible",
                  checked: true
                }),
                PropertyFieldColorPicker('color', {
                  label: 'Color',
                  selectedColor: this.properties.color,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  debounce: 500,
                  showPreview: true,
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
               
              ]
            },
             
            {
              groupName: "Controls with callout",
              isCollapsed: true,
              groupFields: [
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
                  value: this.properties.textInfoHeaderValue,
                  onChanged: this._onChangedTextWithCallout
                }),
                PropertyFieldToggleWithCallout('toggleInfoHeaderValue', {
                  calloutTrigger: CalloutTriggers.Click,
                  key: 'toggleWithCalloutFieldId',
                  label: 'Select your super hero universe',
                  calloutContent: React.createElement('p', {}, 'Select one of two universes of super heroes: DC comics with Superman, Batman, Wonder Woman, etc.; or Marvel with X-Men, Spider-Man, Avengers, etc.'),
                  onText: 'Marvel',
                  offText: 'DC Comics',
                  checked: this.properties.toggleInfoHeaderValue,
                  disabled: true
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
                  href: 'https://github.com/pnp/sp-dev-fx-property-controls',
                  target: '_blank'
                }),
              ]
            },
            {
              groupName: 'People, Terms, Files, Role Definition',
              isCollapsed: true,
              groupFields: [
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
                  limitByTermsetNameOrID: 'Categories',
                  isTermSetSelectable: true,
                  key: 'termSetsPickerFieldId',
                  hideTermStoreName: true,
                  anchorId: "2dccbef4-5a49-4f7d-9fba-4c3417150e33"
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
                PropertyFieldFilePicker('filePicker', {
                  context: this.context,
                  filePickerResult: this.properties.filePickerResult,
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  properties: this.properties,
                  onSave: (e: IFilePickerResult) => { console.log(e); this.properties.filePickerResult = e; },
                  onChanged: (e: IFilePickerResult) => { console.log(e); this.properties.filePickerResult = e; },
                  key: "filePickerId",
                  buttonLabel: "File Picker",
                  label: "File Picker",
                  includePageLibraries: true
                }),
                PropertyFieldButton('fakeProperty', {
                  key: 'buttonFieldId',
                  text: 'Button' ,
                  onClick: () => { this.showMessageButton = !this.showMessageButton; this.context.propertyPane.refresh(); },
                  isVisible: true,
                  isPrimary: true,
                  disabled: true
                }),
                 PropertyFieldMessage("message", {
                  key: "0",
                  text: "Button clickd Completed!",
                  messageType:
                    MessageBarType.success,
                  isVisible: this.showMessageButton 
                 }), 
                 PropertyFieldGrid('gridItems', {
                  multiSelect: true,
                  items: this.gridItems,
                  label: 'Grid Items',
                  key: 'gridFieldId',
                  defaultSelectedItems: this.properties.gridItems,
                  maxHeight: 500,
                  column1Label: 'File',
                  column2Label: 'Location',
                  onSelected: (item: IItem[]) => {
                    console.log(item);
                 },
                   
                     
                 }),
                PropertyFieldIconPicker('iconPicker', {
                  currentIcon: this.properties.iconPicker,
                  key: "iconPickerId",
                  onSave: (icon: string) => { console.log(icon); this.properties.iconPicker = icon; },
                  buttonLabel: "Icon",
                  renderOption: "panel",
                  properties: this.properties,
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  label: "Icon Picker"
                }),
                PropertyFieldRoleDefinitionPicker('roleDefinitions', {
                  context: this.context,
                  label: "Role Definitions",
                  roleDefinitions: this.properties.roleDefinitions,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  key: "roleDefinitionPickerId",
                  multiSelect: false,
                  selectedRoleDefinition: ["Full Control"],
                  roleDefinitionsToExclude: ["System.LimitedView"],
                }),
                PropertyFieldFolderPicker('folderPicker', {
                  context: this.context,
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  properties: this.properties,
                  key: "folderPickerId",
                  label: "Folder Picker",
                  selectedFolder: this.properties.folderPicker,
                  canCreateFolders: true,
                  onSelect: ((folder: IFolder) => { console.log(folder); this.properties.folderPicker = folder; }),
                  rootFolder: {
                    Name: "Documents",
                    ServerRelativeUrl: "/Shared Documents"
                  },
                })
              ]
            },
            {
              groupName: "Editors",
              isCollapsed: true,
              groupFields: [
                PropertyFieldMonacoEditor('monacoEditor', {
                  key: 'monacoEditor',
                  value: this.properties.monacoEditor,
                  showMiniMap: true,
                  onChange: (newValue: string ) => {
                    console.log('teste',newValue);
                  } ,
                  language:"json",
                  showLineNumbers:true,
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
                PropertyPanePropertyEditor({
                  webpart: this,
                  key: 'propertyeditor'
                }),
                PropertyFieldCodeEditor('htmlCode', {
                  label: 'Edit HTML Code',
                  panelTitle: 'Edit HTML Code',
                  initialValue: this.properties.htmlCode,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  disabled: false,
                  key: 'codeEditorFieldId',
                  language: PropertyFieldCodeEditorLanguages.HTML,
                  panelWidth: '700px'
                  // options: {
                  //   wrap: true,
                  //   fontSize: 20,
                  // }
                }),
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
                      type: CustomCollectionFieldType.string,
                      onGetErrorMessage: (value, index, currentItem) => {
                        return value === 'Smith' && currentItem.City === 'antwerp' ? 'You cannot write Smith when City is Antwerp' : "";
                      }
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
                        },
                        {
                          key: false,
                          text: 'False City'
                        },
                        {
                          key: 0,
                          text: 'Zero City'
                        }
                      ],
                      required: true,
                      placeholder: "Favorite city of the person",
                      //defaultValue: "antwerp",
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
                      defaultValue: true,
                      onGetErrorMessage: (value, index, currentItem) => {
                        return value && currentItem.City === 'antwerp' ? 'You cannot check sign when City is Antwerp' : "";
                      }
                    },
                    {
                      id: "IconName",
                      title: "Icon Name",
                      type: CustomCollectionFieldType.fabricIcon,
                      placeholder: "Select icon",
                      //defaultValue: "website",
                      required: true,
                      onGetErrorMessage: this.minLengthValidation,
                      iconFieldRenderMode: 'picker'
                    },
                    {
                      id: "URL",
                      title: "URL",
                      type: CustomCollectionFieldType.url,
                      required: true,
                      placeholder: "Enter a URL"
                    },
                    {
                      id: "color",
                      title: "Color",
                      type: CustomCollectionFieldType.color,
                      defaultValue: "#ff0000",
                      onGetErrorMessage: (value, index, currentItem) => {
                        return value === '#ff0000' && currentItem.City === 'antwerp' ? 'You cannot set default color when City is Antwerp' : "";
                      }
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
                                onUpdate(field.id, event.currentTarget.value);
                                if (event.currentTarget.value === "error") {
                                  onError(field.id, "Value shouldn't be equal to error");
                                } else {
                                  onError(field.id, "");
                                }
                              }
                            }), " 🎉"
                          )
                        );
                      },
                      onGetErrorMessage: (value, index, currentItem) => {
                        return value === 'hello' && currentItem.City === 'antwerp' ? 'You cannot write hello when City is Antwerp' : "";
                      }
                    },
                    {
                      id: "customVisibility",
                      title: "Custom Visible Field",
                      type: CustomCollectionFieldType.boolean,
                      defaultValue: true,
                      isVisible: (field, items) => {
                        return items.filter(i => i.City === 'antwerp').length > 0;
                      }
                    }
                  ],
                  disabled: false
                }),
              ]
            },
            {
              groupName: "Content",
              isCollapsed: true,
              groupFields: [
                PropertyPaneMarkdownContent({
                  markdown: `
### This is Markdown

[Markdown](http://daringfireball.net/projects/markdown/) lets you write content in a really natural way.

  * You can have lists, like this one
  * Make things **bold** or *italic*
  * Embed snippets of \`code\`
  * Create [links](/)
  * ...

Also supports GitHub-flavored Markdown checklists:

- [x] Checklist item 1
- [x] Checklist item 2
- [ ] Checklist item 3

<small>Sample content borrowed with thanks from [markdown-to-jsx](https://probablyup.com/markdown-to-jsx/) ❤️</small>

<FieldErrorMessage errorMessage='This is a sample FieldErrorMessage React component rendered from Markdown'/>
`,
                  key: 'markdownSample',
                  options: {
                    overrides: {
                      h3: {
                        props: {
                          className: "ms-font-xl ms-fontColor-neutralDark",
                        },
                      },
                      FieldErrorMessage: FieldErrorMessage
                    }
                  }}),
              ]
            }
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
      return React.createElement('div', {}, `you haven't selected any house`);
    }
  }
}
