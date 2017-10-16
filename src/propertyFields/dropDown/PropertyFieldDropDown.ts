import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
	IPropertyPaneField,
	PropertyPaneFieldType,
	IWebPartContext
} from '@microsoft/sp-webpart-base';
import PropertyFieldDropDownHost from './PropertyFieldDropDownHost';
import { IPropertyFieldDropDownHostProps } from './IPropertyFieldDropDownHost';
import { IPropertyFieldDropDownProps, IPropertyFieldDropDownPropsInternal } from './IPropertyFieldDropDown';

/**
 * Represents a PropertyFieldDropDown object
 */
class PropertyFieldDropDownBuilder implements IPropertyPaneField<IPropertyFieldDropDownPropsInternal> {

	//Properties defined by IPropertyPaneField
	public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
	public targetProperty: string;
	public properties: IPropertyFieldDropDownPropsInternal;

	//Custom properties label: string;
	private label: string;
	private context: IWebPartContext;
	private selectedList: string;
	private selectedLists: string[];
	private multiSelect: boolean;

	public onPropertyChange(propertyPath: string, oldValue: any, newValue: any): void { }
	private customProperties: any;
	private key: string;
	private disabled: boolean = false;
	private onGetErrorMessage: (value: string) => string | Promise<string>;
	private deferredValidationTime: number = 200;
	private renderWebPart: () => void;
	private disableReactivePropertyChanges: boolean = false;

	/**
	 * Constructor method
	 */
	public constructor(_targetProperty: string, _properties: IPropertyFieldDropDownPropsInternal) {
		this.render = this.render.bind(this);
		this.targetProperty = _targetProperty;
		this.properties = _properties;
		this.properties.onDispose = this.dispose;
		this.properties.onRender = this.render;
		this.label = _properties.label;
		this.context = _properties.context;
		this.selectedList = _properties.selectedList;
		this.selectedLists = _properties.selectedLists;
		this.multiSelect = _properties.multiSelect;
		this.onPropertyChange = _properties.onPropertyChange;
		this.customProperties = _properties.properties;
		this.key = _properties.key;
		this.onGetErrorMessage = _properties.onGetErrorMessage;

		if (_properties.disabled === true) {
			this.disabled = _properties.disabled;
		}
		if (_properties.deferredValidationTime) {
			this.deferredValidationTime = _properties.deferredValidationTime;
		}
	}

	/**
	 * Renders the SPDropDown field content
	 */
	private render(elem: HTMLElement, ctx?: any, changeCallback?: (targetProperty?: string, newValue?: any) => void): void {
		const componentProps = {
			label: this.label,
			targetProperty: this.targetProperty,
			context: this.context,
			multiSelect: this.multiSelect,
			onDispose: this.dispose,
			onRender: this.render,
			onChange: changeCallback,
			onPropertyChange: this.onPropertyChange,
			properties: this.customProperties,
			key: this.key,
			disabled: this.disabled,
			onGetErrorMessage: this.onGetErrorMessage,
			deferredValidationTime: this.deferredValidationTime
		};

		if (this.multiSelect) {
			// Multi selector
			componentProps['selectedLists'] = this.selectedLists;
		} else {
			// Single selector
			componentProps['selectedList'] = this.selectedList;
		}
		const element: React.ReactElement<IPropertyFieldDropDownHostProps> = React.createElement(PropertyFieldDropDownHost, componentProps);
		// Calls the REACT content generator
		ReactDom.render(element, elem);

	}

	/**
	 * Disposes the current object
	 */
	private dispose(elem: HTMLElement): void {

	}

}

/**
 * Helper method to create a SPList Picker on the PropertyPane.
 * @param targetProperty - Target property the SharePoint list picker is associated to.
 * @param properties - Strongly typed SPList Picker properties.
 */
export function PropertyFieldDropDown(targetProperty: string, properties: IPropertyFieldDropDownProps): IPropertyPaneField<IPropertyFieldDropDownPropsInternal> {

	//Create an internal properties object from the given properties
	const newProperties: IPropertyFieldDropDownPropsInternal = {
		label: properties.label,
		targetProperty: targetProperty,
		context: properties.context,
		selectedList: typeof properties.selectedList === 'string' ? properties.selectedList : null,
		selectedLists: typeof properties.selectedList !== 'string' ? properties.selectedList : null,
		multiSelect: properties.multiSelect || false,
		onPropertyChange: properties.onPropertyChange,
		properties: properties.properties,
		onDispose: null,
		onRender: null,
		key: properties.key,
		disabled: properties.disabled,
		onGetErrorMessage: properties.onGetErrorMessage,
		deferredValidationTime: properties.deferredValidationTime
	};
	//Calls the PropertyFieldDropDown builder object
	//This object will simulate a PropertyFieldCustom to manage his rendering process
	return new PropertyFieldDropDownBuilder(targetProperty, newProperties);
}
