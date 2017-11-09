import {
    IPropertyPaneCustomFieldProps,
    IPropertyPaneToggleProps
} from '@microsoft/sp-webpart-base';

import { IPropertyFieldHeaderCalloutProps } from '../../common/propertyFieldHeader/IPropertyFieldHeader';

export interface IPropertyFieldToggleInfoHeaderPropsInternal 
    extends IPropertyPaneCustomFieldProps, IPropertyPaneToggleProps, IPropertyFieldHeaderCalloutProps {
        key: string;
    }

/**
 * Public properties of PropertyFieldToggleInfoHeader custom field
 */
export interface IPropertyFieldToggleInfoHeaderProps extends IPropertyPaneToggleProps, IPropertyFieldHeaderCalloutProps {
    key: string;
}