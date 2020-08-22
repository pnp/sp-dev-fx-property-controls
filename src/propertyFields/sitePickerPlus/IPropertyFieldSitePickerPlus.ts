import { IWebPartContext } from '@microsoft/sp-webpart-base';

/**
 * Defines a Site object for the PropertyFieldSitePickerPlus
 */
export interface IPropertyFieldSitePlus {
    Title: string;
    Url: string;
    IconUrl: string;
    Selected: boolean;
}

/**
 * Public properties of the PropertyFieldSitePickerPlus custom field
 */
export interface IPropertyFieldSitePickerPlusProps {

    /**
     * Property field label
     */
    label: string;
    /**
     * Specify if the control needs to be disabled
     */
    disabled?: boolean;
    /**
     * Web Part context
     */
    context: IWebPartContext;
    /**
     * Intial data to load in the site picker (optional)
     */
    initialData?: IPropertyFieldSitePlus[];
    /**
     * Defines a onPropertyChange function to raise when the selected value changed.
     * Normally this function must be always defined with the 'this.onPropertyChange'
     * method of the web part object.
     */
    onPropertyChange(propertyPath: string, newValue: any): void;
    /**
     * Parent Web Part properties
     */
    properties: any;
    /**
     * An UNIQUE key indicates the identity of this control
     */
    key?: string;
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
    onGetErrorMessage?: (value: IPropertyFieldSitePlus[]) => string | Promise<string>;
    /**
     * Custom Field will start to validate after users stop typing for `deferredValidationTime` milliseconds.
     * Default value is 200.
     */
    deferredValidationTime?: number;
}

/**
 * Private properties of the PropertyFieldSitePickerPlus custom field.
 * We separate public & private properties to include onRender & onDispose method waited
 * by the PropertyFieldCustom, witout asking to the developer to add it when he's using
 * the PropertyFieldSitePickerPlus.
 *
 */
export interface IPropertyFieldSitePickerPlusPropsInternal extends IPropertyFieldSitePickerPlusProps {
    selectedSites?: Array<IPropertyFieldSitePlus>;
    targetProperty: string;
    onRender(elem: HTMLElement): void;
    onDispose(elem: HTMLElement): void;
}