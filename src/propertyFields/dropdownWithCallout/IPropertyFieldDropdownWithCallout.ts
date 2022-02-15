import {
    IPropertyPaneCustomFieldProps,
    IPropertyPaneDropdownProps
} from '@microsoft/sp-property-pane';

import { IPropertyFieldHeaderCalloutProps } from '../../common/propertyFieldHeader/IPropertyFieldHeader';

/**
 * Internal properties of PropertyFieldDropdownWithCallout custom field
 */
export interface IPropertyFieldDropdownWithCalloutPropsInternal extends IPropertyPaneCustomFieldProps, IPropertyPaneDropdownProps, IPropertyFieldHeaderCalloutProps {
}

/**
 * Public properties of PropertyFieldDropdownWithCallout custom field
 */
export interface IPropertyFieldDropdownWithCalloutProps extends IPropertyPaneDropdownProps, IPropertyFieldHeaderCalloutProps {
    key: string;
}
