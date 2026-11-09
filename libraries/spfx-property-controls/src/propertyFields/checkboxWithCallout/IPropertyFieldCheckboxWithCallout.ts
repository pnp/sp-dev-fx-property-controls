import {
    IPropertyPaneCustomFieldProps,
    IPropertyPaneCheckboxProps
} from '@microsoft/sp-property-pane';

import { IPlaceholderWithCalloutProps } from '../../common/placeholderWithCallout/IPlaceholderWithCallout';

/**
 * Internal properties of PropertyFieldCheckboxWithCallout custom field
 */
export interface IPropertyFieldCheckboxWithCalloutPropsInternal extends IPropertyPaneCustomFieldProps, IPropertyPaneCheckboxProps, IPlaceholderWithCalloutProps {
}

/**
 * Public properties of PropertyFieldCheckboxWithCallout custom field
 */
export interface IPropertyFieldCheckboxWithCalloutProps extends IPropertyPaneCheckboxProps, IPlaceholderWithCalloutProps {
    key: string;
}