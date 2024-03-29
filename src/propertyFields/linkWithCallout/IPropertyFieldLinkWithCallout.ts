import {
    IPropertyPaneCustomFieldProps,
    IPropertyPaneLinkProps
} from '@microsoft/sp-property-pane';

import { IPlaceholderWithCalloutProps } from '../../common/placeholderWithCallout/IPlaceholderWithCallout';

/**
 * Internal properties of PropertyFieldLinkWithCallout custom field
 */
export interface IPropertyFieldLinkWithCalloutPropsInternal extends IPropertyPaneCustomFieldProps, IPropertyPaneLinkProps, IPlaceholderWithCalloutProps {
}

/**
 * Public properties of PropertyFieldLinkWithCallout custom field
 */
export interface IPropertyFieldLinkWithCalloutProps extends IPropertyPaneLinkProps, IPlaceholderWithCalloutProps {
    key: string;
}