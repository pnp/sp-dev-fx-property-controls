import {
    IPropertyPaneCustomFieldProps,
    IPropertyPaneTextFieldProps
} from '@microsoft/sp-webpart-base';

import { IPropertyFieldHeaderCalloutProps } from '../../common/propertyFieldHeader/IPropertyFieldHeader';

export interface IPropertyFieldTextInfoHeaderPropsInternal 
    extends IPropertyPaneCustomFieldProps, IPropertyPaneTextFieldProps, IPropertyFieldHeaderCalloutProps {}

/**
 * Public properties of PropertyFieldTextInfoHeader custom field
 */
export interface IPropertyFieldTextInfoHeaderProps extends IPropertyPaneTextFieldProps, IPropertyFieldHeaderCalloutProps {
    key: string;
}