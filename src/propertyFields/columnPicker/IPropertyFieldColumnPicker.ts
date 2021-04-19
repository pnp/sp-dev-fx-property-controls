import { BaseComponentContext } from '@microsoft/sp-component-base';
import { IPropertyPaneCustomFieldProps } from '@microsoft/sp-property-pane';
import { ISPColumn } from './ISPColumn';


/**
 * Enum for specifying how the Columns should be sorted
 */
export enum PropertyFieldColumnPickerOrderBy {
    Id = 1,
    Title
}
/**
 * Enum for choosing the column property value to be returned.
 */
export enum IColumnReturnProperty {
    Id,
    Title = "Title",
    "Internal Name" = "InternalName"
}
/**
 * Enum for choosing the render option for multiselect
 */
export enum IPropertyFieldRenderOption {
    "Choice Group",
    "Multiselect Dropdown"
}

/**
 * Public properties of the PropertyFieldColumnPicker custom field
 */
export interface IPropertyFieldColumnPickerProps {
    /**
     * Context of the current web part
     */
    context: BaseComponentContext;

    /**
     * Custom Field will start to validate after users stop typing for `deferredValidationTime` milliseconds.
     * Default value is 200.
     */
    deferredValidationTime?: number;

    /**
     * Whether the property pane field is enabled or not.
     */
    disabled?: boolean;

    /**
     * Filter Columns from Odata query
     */
    filter?: string;

    /**
     * An UNIQUE key indicates the identity of this control
     */
    key?: string;

    /**
     * Property field label displayed on top
     */
    label: string;
    /**
     * The List Id of the list where you want to get the Columns
     */
    listId?: string;

    /**
     * Specify the property on which you want to order the retrieve set of Columns.
     */
    orderBy?: PropertyFieldColumnPickerOrderBy;

    /**
     * Parent Web Part properties
     */
    properties: any;

    /**
     * Initial selected Column of the control
     */
    selectedColumn?: string | string[];

    /**
     * Defines Column titles which should be excluded from the Column picker control
     */
    columnsToExclude?: string[];

    /**
     * Specify if you want to display hidden columns. Default is 'false'
     */
    displayHiddenColumns?: boolean;

    /**
     * Specify if you want to return different Column property value other than 'Id'. Choose either Id | Title | InternalName.
     */
    columnReturnProperty?: IColumnReturnProperty;
    /**
     * 
     */
    renderFieldAs?: IPropertyFieldRenderOption;
    /**
     * Specify if you want to have a single or mult column selector.
     */
    multiSelect?: boolean;
    /**
     * Absolute Web Url of target site (user requires permissions)
     */
    webAbsoluteUrl?: string;

    /**
     * The method is used to get the validation error message and determine whether the input value is valid or not.
     *
     *   When it returns string:
     *   - If valid, it returns empty string.
     *   - If invalid, it returns the error message string and the text field will
     *     show a red border and show an error message below the text field.
     *
     *   When it returns Promise<string>:
     *   - The resolved value is display as error message.
     *   - The rejected, the value is thrown away.
     *
     */
    onGetErrorMessage?: (value: string) => string | Promise<string>;
    /**
     * Defines a onPropertyChange function to raise when the selected value changed.
     * Normally this function must be always defined with the 'this.onPropertyChange'
     * method of the web part object.
     */
    onPropertyChange(propertyPath: string, oldValue: any, newValue: any): void;
    /**
      * Callback that is called before the dropdown is populated
      */
    onColumnsRetrieved?: (columns: ISPColumn[]) => PromiseLike<ISPColumn[]> | ISPColumn[];
}

/**
 * Private properties of the PropertyFieldColumnPicker custom field.
 * We separate public & private properties to include onRender & onDispose method waited
 * by the PropertyFieldCustom, without asking to the developer to add it when he's using
 * the PropertyFieldColumnPicker.
 */
export interface IPropertyFieldColumnPickerPropsInternal extends IPropertyFieldColumnPickerProps, IPropertyPaneCustomFieldProps {
    context: BaseComponentContext;
    deferredValidationTime?: number;
    disabled?: boolean;
    filter?: string;
    key: string;
    label: string;
    listId?: string;
    orderBy?: PropertyFieldColumnPickerOrderBy;
    properties: any;
    selectedColumn?: string;
    selectedColumns?: string[];
    targetProperty: string;
    columnsToExclude?: string[];
    displayHiddenColumns?: boolean;
    columnReturnProperty?: IColumnReturnProperty;
    renderFieldAs?: IPropertyFieldRenderOption;
    multiSelect?: boolean;
    webAbsoluteUrl?: string;
    onGetErrorMessage?: (value: string | string[]) => string | Promise<string>;
    onPropertyChange(propertyPath: string, oldValue: any, newValue: any): void;
    onColumnsRetrieved?: (columns: ISPColumn[]) => PromiseLike<ISPColumn[]> | ISPColumn[];
}
