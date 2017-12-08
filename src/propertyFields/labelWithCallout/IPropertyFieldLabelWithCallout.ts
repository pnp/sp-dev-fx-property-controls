import {
    IPropertyPaneCustomFieldProps,
    IPropertyPaneLabelProps
} from '@microsoft/sp-webpart-base';

import { IPlaceholderWithCalloutProps } from '../../common/placeholderWithCallout/IPlaceholderWithCallout';

/**
 * Internal properties of PropertyFieldLabelWithCallout custom field
 */
export interface IPropertyFieldLabelWithCalloutPropsInternal extends IPropertyPaneCustomFieldProps, IPropertyPaneLabelProps, IPlaceholderWithCalloutProps {
}

/**
 * Public properties of PropertyFieldButtonWithCallout custom field
 */
export interface IPropertyFieldLabelWithCalloutProps extends IPropertyPaneLabelProps, IPlaceholderWithCalloutProps {
    key: string;
}