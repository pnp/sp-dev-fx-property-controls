import {
    IPropertyPaneCustomFieldProps,
    IPropertyPaneButtonProps
} from '@microsoft/sp-webpart-base';

import { IPlaceholderWithCalloutProps } from '../../common/placeholderWithCallout/IPlaceholderWithCallout';

/**
 * Internal properties of PropertyFieldButtonWithCallout custom field
 */
export interface IPropertyFieldButtonWithCalloutPropsInternal extends IPropertyPaneCustomFieldProps, IPropertyPaneButtonProps, IPlaceholderWithCalloutProps {
}

/**
 * Public properties of PropertyFieldButtonWithCallout custom field
 */
export interface IPropertyFieldButtonWithCalloutProps extends IPropertyPaneButtonProps, IPlaceholderWithCalloutProps {
    key: string;
}