import {
    IPropertyPaneCustomFieldProps,
    IPropertyPaneToggleProps
} from '@microsoft/sp-property-pane';

import { IPropertyFieldHeaderCalloutProps } from '../../common/propertyFieldHeader/IPropertyFieldHeader';

export interface IPropertyFieldToggleWithCalloutPropsInternal
    extends IPropertyPaneCustomFieldProps, IPropertyPaneToggleProps, IPropertyFieldHeaderCalloutProps {
        key: string;
    }

/**
 * Public properties of PropertyFieldToggleWithCallout custom field
 */
export interface IPropertyFieldToggleWithCalloutProps extends IPropertyPaneToggleProps, IPropertyFieldHeaderCalloutProps {
    key: string;
}
