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
import { PropertyPaneHelpers } from '../../helpers';
import { SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import { PropertyFieldPassword } from '../../PropertyFieldPassword';
import { PropertyFieldViewPickerOrderBy, PropertyFieldViewPicker, ISPView } from '../../PropertyFieldViewPicker';
import { PropertyFieldMessage } from '../../PropertyFieldMessage';
import { MessageBarType } from 'office-ui-fabric-react/lib-es2015/MessageBar';
import { PropertyFieldSearch } from '../../PropertyFieldSearch';
import { PropertyFieldSpinner } from '../../PropertyFieldSpinner';
import { PropertyFieldFilePicker, IPropertyFieldFilePickerProps, IFilePickerResult } from "../../PropertyFieldFilePicker";

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
        view: this.properties.view,
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
        filePickerResult: this.properties.filePickerResult
      }
    );

    ReactDom.render(element, this.domElement);
  }

  private wait() {
    return new Promise((resolve) => {
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
        getStyles: () => {
          return {
            circle: {
              height: 80,
              width: 80
            }
          };
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


  private _onChangedPassword(value: string) {
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
                // PropertyPaneWebPartInformation({
                //   description: `This is a <strong>demo webpart</strong>, used to demonstrate all the <a href="https://aka.ms/sppnp">PnP</a> property controls`,
                //   moreInfoLink: `https://pnp.github.io/sp-dev-fx-property-controls/`,
                //   videoProperties: {
                //     embedLink: `https://www.youtube.com/embed/d_9o3tQ90zo`,
                //     properties: { allowFullScreen: true }
                //   },
                //   key: 'webPartInfoId'
                // }),
                PropertyFieldFilePicker('filePicker', {
                  context: this.context,
                  filePickerResult: this.properties.filePickerResult,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  onSave: (e: IFilePickerResult) => { console.log(e); this.properties.filePickerResult = e; },
                  onChanged: (e: IFilePickerResult) => { console.log(e); this.properties.filePickerResult = e; },
                  key: "filePicker",
                  buttonLabel: "File Picker",
                  label: "File Picker"
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
