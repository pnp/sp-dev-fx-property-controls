import {
    IPropertyPaneCustomFieldProps,
    IPropertyPaneChoiceGroupProps
} from '@microsoft/sp-webpart-base';

import { IPropertyFieldHeaderCalloutProps } from '../../common/propertyFieldHeader/IPropertyFieldHeader';

export interface IPropertyFieldChoiceGroupWithCalloutPropsInternal
    extends IPropertyPaneCustomFieldProps, IPropertyPaneChoiceGroupProps, IPropertyFieldHeaderCalloutProps {
        key: string;
    }

/**
 * Public properties of PropertyFieldChoiceGroupWithCallout custom field
 */
export interface IPropertyFieldChoiceGroupWithCalloutProps extends IPropertyPaneChoiceGroupProps, IPropertyFieldHeaderCalloutProps {
    key: string;
}
