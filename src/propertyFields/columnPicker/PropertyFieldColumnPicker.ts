import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
    IPropertyPaneField,
    PropertyPaneFieldType
} from '@microsoft/sp-property-pane';
import { BaseComponentContext } from '@microsoft/sp-component-base';
import PropertyFieldColumnPickerHost from './PropertyFieldColumnPickerHost';
import { IPropertyFieldColumnPickerHostProps } from './IPropertyFieldColumnPickerHost';
import { PropertyFieldColumnPickerOrderBy, IPropertyFieldColumnPickerProps, IPropertyFieldColumnPickerPropsInternal, IPropertyFieldRenderOption, IColumnReturnProperty } from './IPropertyFieldColumnPicker';
import { ISPColumn } from './ISPColumn';
import { IPropertyFieldColumnMultiPickerHostProps } from './IPropertyFieldColumnMultiPickerHost';
import PropertyFieldColumnMultiPickerHost from './PropertyFieldColumnMultiPickerHost';
import { IPropertyFieldColumnMultiPickerDropdownHostProps } from './IPropertyFieldColumnMultiPickerDropdownHost';
import PropertyFieldColumnMultiPickerDropdownHost from './PropertyFieldColumnMultiPickerDropdownHost';

/**
 * Represents a PropertyFieldColumnPicker object
 */
class PropertyFieldColumnPickerBuilder implements IPropertyPaneField<IPropertyFieldColumnPickerPropsInternal> {

    //Properties defined by IPropertyPaneField
    public properties: IPropertyFieldColumnPickerPropsInternal;
    public targetProperty: string;
    public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;

    //Custom properties label: string;
    private context: BaseComponentContext;
    private label: string;
    private listId?: string;
    private orderBy: PropertyFieldColumnPickerOrderBy;
    private selectedColumn: string;
    private selectedColumns: string[];
    private columnsToExclude: string[];
    private displayHiddenColumns: boolean = false;
    private columnReturnProperty: IColumnReturnProperty = IColumnReturnProperty.Id;
    private multiSelect: boolean = false;
    private renderFieldAs: IPropertyFieldRenderOption = IPropertyFieldRenderOption["Choice Group"];

    private customProperties: any; // eslint-disable-line @typescript-eslint/no-explicit-any
    private deferredValidationTime: number = 200;
    private disabled: boolean = false;
    private filter: string;
    private key: string;
    private webAbsoluteUrl?: string;
    private onGetErrorMessage: (value: string) => string | Promise<string>;
    private onColumnsRetrieved?: (columns: ISPColumn[]) => PromiseLike<ISPColumn[]> | ISPColumn[];
    public onPropertyChange(propertyPath: string, oldValue: any, newValue: any): void { /* no-op; */ } // eslint-disable-line @typescript-eslint/no-explicit-any
    private renderWebPart: () => void;

    /**
     * Constructor method
     */
    public constructor(_targetProperty: string, _properties: IPropertyFieldColumnPickerPropsInternal) {
        this.render = this.render.bind(this);
        this.targetProperty = _targetProperty;
        this.properties = _properties;
        this.properties.onDispose = this.dispose;
        this.properties.onRender = this.render;
        this.label = _properties.label;
        this.context = _properties.context;
        this.webAbsoluteUrl = _properties.webAbsoluteUrl;
        this.listId = _properties.listId;
        this.selectedColumn = _properties.selectedColumn;
        this.selectedColumns = _properties.selectedColumns;
        this.orderBy = _properties.orderBy;
        this.onPropertyChange = _properties.onPropertyChange;
        this.customProperties = _properties.properties;
        this.key = _properties.key;
        this.columnsToExclude = _properties.columnsToExclude;
        this.displayHiddenColumns = _properties.displayHiddenColumns;
        this.columnReturnProperty = _properties.columnReturnProperty;
        this.renderFieldAs = _properties.renderFieldAs;
        this.multiSelect = _properties.multiSelect;
        this.filter = _properties.filter;
        this.onGetErrorMessage = _properties.onGetErrorMessage;
        this.onColumnsRetrieved = _properties.onColumnsRetrieved;

        if (_properties.disabled === true) {
            this.disabled = _properties.disabled;
        }
        if (_properties.deferredValidationTime) {
            this.deferredValidationTime = _properties.deferredValidationTime;
        }
    }

    /**
     * Renders the SPColumnPicker field content
     */
    private render(elem: HTMLElement, ctx?: any, changeCallback?: (targetProperty?: string, newValue?: any) => void): void { // eslint-disable-line @typescript-eslint/no-explicit-any
        const componentProps: IPropertyFieldColumnPickerHostProps = {
            label: this.label,
            targetProperty: this.targetProperty,
            context: this.context,
            webAbsoluteUrl: this.webAbsoluteUrl,
            listId: this.listId,
            orderBy: this.orderBy,
            onDispose: this.dispose,
            onRender: this.render,
            onChange: changeCallback,
            onPropertyChange: this.onPropertyChange,
            properties: this.customProperties,
            key: this.key,
            disabled: this.disabled,
            onGetErrorMessage: this.onGetErrorMessage,
            deferredValidationTime: this.deferredValidationTime,
            columnsToExclude: this.columnsToExclude,
            displayHiddenColumns: this.displayHiddenColumns,
            columnReturnProperty: this.columnReturnProperty,
            renderFieldAs: this.renderFieldAs,
            multiSelect: this.multiSelect,
            filter: this.filter,
            onColumnsRetrieved: this.onColumnsRetrieved
        };
        // Check if the multi or single select component has to get loaded
        if (this.multiSelect) {
            // Multiple selector
            componentProps.selectedColumns = this.selectedColumns;
            if (this.renderFieldAs === IPropertyFieldRenderOption["Choice Group"]) {
                const element: React.ReactElement<IPropertyFieldColumnMultiPickerHostProps> = React.createElement(PropertyFieldColumnMultiPickerHost, componentProps);
                // Calls the REACT content generator
                ReactDom.render(element, elem);
            } else {
                const element: React.ReactElement<IPropertyFieldColumnMultiPickerDropdownHostProps> = React.createElement(PropertyFieldColumnMultiPickerDropdownHost, componentProps);
                // Calls the REACT content generator
                ReactDom.render(element, elem);
            }
        } else {
            // Single selector
            componentProps.selectedColumn = this.selectedColumn;
            const element: React.ReactElement<IPropertyFieldColumnPickerHostProps> = React.createElement(PropertyFieldColumnPickerHost, componentProps);
            // Calls the REACT content generator
            ReactDom.render(element, elem);
        }
    }

    /**
     * Disposes the current object
     */
    private dispose(_elem: HTMLElement): void {
        ReactDom.unmountComponentAtNode(_elem);
    }

}

/**
 * Helper method to create a SPColumn Picker on the PropertyPane.
 * @param targetProperty - Target property the SharePoint column picker is associated to.
 * @param properties - Strongly typed SPColumn Picker properties.
 */
export function PropertyFieldColumnPicker(targetProperty: string, properties: IPropertyFieldColumnPickerProps): IPropertyPaneField<IPropertyFieldColumnPickerPropsInternal> {

    //Create an internal properties object from the given properties
    const newProperties: IPropertyFieldColumnPickerPropsInternal = {
        label: properties.label,
        targetProperty: targetProperty,
        context: properties.context,
        listId: properties.listId,
        selectedColumn: typeof properties.selectedColumn === 'string' ? properties.selectedColumn : null,
        selectedColumns: Array.isArray(properties.selectedColumn) ? properties.selectedColumn : null,
        onPropertyChange: properties.onPropertyChange,
        properties: properties.properties,
        onDispose: null,
        onRender: null,
        key: properties.key,
        disabled: properties.disabled,
        columnsToExclude: properties.columnsToExclude,
        displayHiddenColumns: properties.displayHiddenColumns,
        columnReturnProperty: properties.columnReturnProperty,
        renderFieldAs: properties.renderFieldAs,
        multiSelect: properties.multiSelect,
        webAbsoluteUrl: properties.webAbsoluteUrl,
        filter: properties.filter,
        onGetErrorMessage: properties.onGetErrorMessage,
        deferredValidationTime: properties.deferredValidationTime,
        onColumnsRetrieved: properties.onColumnsRetrieved
    };
    //Calls the PropertyFieldColumnPicker builder object
    //This object will simulate a PropertyFieldCustom to manage his rendering process
    return new PropertyFieldColumnPickerBuilder(targetProperty, newProperties);
}
