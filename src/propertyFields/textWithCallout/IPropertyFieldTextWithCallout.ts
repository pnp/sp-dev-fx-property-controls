import {
    IPropertyPaneCustomFieldProps,
    IPropertyPaneTextFieldProps
} from '@microsoft/sp-webpart-base';

import { IPropertyFieldHeaderCalloutProps } from '../../common/propertyFieldHeader/IPropertyFieldHeader';

export interface IPropertyFieldTextWithCalloutPropsInternal
    extends IPropertyPaneCustomFieldProps, IPropertyPaneTextFieldProps, IPropertyFieldHeaderCalloutProps {}

/**
 * Public properties of PropertyFieldTextWithCallout custom field
 */
export interface IPropertyFieldTextWithCalloutProps extends IPropertyPaneTextFieldProps, IPropertyFieldHeaderCalloutProps {
    key: string;
}
