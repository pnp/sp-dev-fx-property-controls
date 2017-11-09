import {
    IPropertyPaneCustomFieldProps,
    IPropertyPaneDropdownProps
} from '@microsoft/sp-webpart-base';

import { IPropertyFieldHeaderCalloutProps } from '../../common/propertyFieldHeader/IPropertyFieldHeader';

/**
 * Internal properties of PropertyFieldDropdownInfoHeader custom field
 */
export interface IPropertyFieldDropdownInfoHeaderPropsInternal extends IPropertyPaneCustomFieldProps, IPropertyPaneDropdownProps, IPropertyFieldHeaderCalloutProps {
}

/**
 * Public properties of PropertyFieldDropdownInfoHeader custom field
 */
export interface IPropertyFieldDropdownInfoHeaderProps extends IPropertyPaneDropdownProps, IPropertyFieldHeaderCalloutProps {
    key: string;
}