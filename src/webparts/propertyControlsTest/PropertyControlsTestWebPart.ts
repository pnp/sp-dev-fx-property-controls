import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
	BaseClientSideWebPart,
	IPropertyPaneConfiguration,
	PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { IDropdownOption, DropdownMenuItemType } from 'office-ui-fabric-react/lib/Dropdown';

import * as strings from 'PropertyControlsTestWebPartStrings';
import PropertyControlsTest from './components/PropertyControlsTest';
import { IPropertyControlsTestProps } from './components/IPropertyControlsTestProps';
import { IPropertyControlsTestWebPartProps } from './IPropertyControlsTestWebPartProps';
import { PropertyFieldPeoplePicker, PrincipalType } from '../../PropertyFieldPeoplePicker';
import { PropertyFieldListPicker, PropertyFieldListPickerOrderBy } from '../../PropertyFieldListPicker';
import { PropertyFieldTermPicker } from '../../PropertyFieldTermPicker';
import { PropertyFieldDateTimePicker, DateConvention, TimeConvention } from '../../PropertyFieldDateTimePicker';
import { PropertyFieldDropDown } from '../../PropertyFieldDropDown';

const options: IDropdownOption[] = [
	{ key: 1, text: "One" }, { key: 2, text: "Two" }, { key: 3, text: "Three" }, { key: 4, text: "Four" }
];
const optionsWithHeader:IDropdownOption[] = [
	{ key: 'Header', text: 'Actions', itemType: DropdownMenuItemType.Header },
	{ key: 'A', text: 'Option a' },
	{ key: 'B', text: 'Option b' },
	{ key: 'C', text: 'Option c' },
	{ key: 'D', text: 'Option d' },
	{ key: 'E', text: 'Option e' },
	{ key: 'divider_2', text: '-', itemType: DropdownMenuItemType.Divider },
	{ key: 'Header2', text: 'People', itemType: DropdownMenuItemType.Header },
	{ key: 'F', text: 'Option f' },
	{ key: 'G', text: 'Option g' },
	{ key: 'H', text: 'Option h' },
	{ key: 'I', text: 'Option i' },
	{ key: 'J', text: 'Option j' },
  ];
/**
 * Web part that can be used to test out the various property controls
 */
export default class PropertyControlsTestWebPart extends BaseClientSideWebPart<IPropertyControlsTestWebPartProps> {

	public render(): void {
		const element: React.ReactElement<IPropertyControlsTestProps> = React.createElement(
			PropertyControlsTest,
			{
				context: this.context,
				people: this.properties.people || [],
				list: this.properties.singleList as string,
				multiList: this.properties.multiList as string[] || [],
				terms: this.properties.terms || [],
				datetime: this.properties.datetime || { value: null, displayValue: null },
				singleValue: this.properties.singleValue as string,
				multiValue: this.properties.multiValue as string[] || []
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

	protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
		return {
			pages: [
				{
					header: {
						description: strings.PropertyPaneDescription
					},
					displayGroupsAsAccordion: true,
					groups: [
						{
							groupName: strings.BasicGroupName,
							groupFields: [
								PropertyFieldPeoplePicker('people', {
									label: 'PropertyFieldPeoplePicker',
									initialData: this.properties.people,
									allowDuplicate: true,
									principalType: [PrincipalType.Users, PrincipalType.SharePoint, PrincipalType.Security],
									// principalType: [IPrincipalType.SharePoint],
									onPropertyChange: this.onPropertyPaneFieldChanged,
									context: this.context,
									properties: this.properties,
									onGetErrorMessage: null,
									deferredValidationTime: 0,
									key: 'peopleFieldId'
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
									onGetErrorMessage: null,
									deferredValidationTime: 0,
									key: 'listPickerFieldId'
								}),
								PropertyFieldListPicker('multiList', {
									label: 'Select multiple lists',
									selectedList: this.properties.multiList,
									includeHidden: false,
									//baseTemplate: 109,
									orderBy: PropertyFieldListPickerOrderBy.Title,
									multiSelect: true,
									disabled: false,
									onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
									properties: this.properties,
									context: this.context,
									onGetErrorMessage: null,
									deferredValidationTime: 0,
									key: 'multiListPickerFieldId'
								}),
								PropertyFieldTermPicker('terms', {
									label: 'Select terms',
									panelTitle: 'Select terms',
									initialValues: this.properties.terms,
									allowMultipleSelections: true,
									excludeSystemGroup: false,
									onPropertyChange: this.onPropertyPaneFieldChanged,
									properties: this.properties,
									context: this.context,
									disabled: false,
									onGetErrorMessage: null,
									deferredValidationTime: 0,
									key: 'termSetsPickerFieldId'
								}),
								PropertyFieldDateTimePicker('datetime', {
									label: 'Select the date and time',
									disabled: true,
									initialDate: this.properties.datetime,
									// formatDate: this._formatDateIso,
									dateConvention: DateConvention.DateTime,
									timeConvention: TimeConvention.Hours12,
									onPropertyChange: this.onPropertyPaneFieldChanged,
									properties: this.properties,
									onGetErrorMessage: null,
									deferredValidationTime: 0,
									key: 'dateTimeFieldId'
								})
							]
						},
						{
							groupName: "DropDown",
							isCollapsed:true,
							groupFields: [
								PropertyFieldDropDown('singleValue', {
									label: 'Select a value',
									options: options,
									onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
									properties: this.properties,
									deferredValidationTime: 0,
									key: 'dropDownFieldId'
								}),
								PropertyFieldDropDown('multiValue', {
									label: 'Select multiple values',
									options: options,
									multiSelect: true,
									onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
									properties: this.properties,
									deferredValidationTime: 0,
									key: 'dropDownFieldId2'
								}),
								PropertyFieldDropDown('multiValueHeader', {
									label: 'Select multiple values',
									options: optionsWithHeader,
									multiSelect: true,
									onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
									properties: this.properties,
									deferredValidationTime: 0,
									key: 'dropDownFieldId3'
								})
							]
						}
					]
				}
			]
		};
	}
}
