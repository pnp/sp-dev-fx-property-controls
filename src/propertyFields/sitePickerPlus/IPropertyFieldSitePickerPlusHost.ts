import { IPropertyFieldSitePlus, IPropertyFieldSitePickerPlusPropsInternal } from './IPropertyFieldSitePickerPlus';
/**
 * PropertyFieldSitePickerPlusHost properties interface
 */
export interface IPropertyFieldSitePickerPlusHostProps extends IPropertyFieldSitePickerPlusPropsInternal {    
    onChange: (targetProperty?: string, newValue?: any) => void;
}

/**
 * Defines the state of the component
 */
export interface ISitePickerPlusState {    
    searching: boolean;
    selecting: boolean;
    searchResults?: Array<IPropertyFieldSitePlus>;
    selectedSites?: Array<IPropertyFieldSitePlus>;
    errorMessage?: string;
}