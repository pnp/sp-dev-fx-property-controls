import {
    IPropertyPaneCustomFieldProps,
    IPropertyPaneTextFieldProps
} from '@microsoft/sp-property-pane';

import { IPropertyFieldHeaderCalloutProps } from '../../common/propertyFieldHeader/IPropertyFieldHeader';

export interface IPropertyFieldTextWithCalloutPropsInternal
    extends IPropertyPaneCustomFieldProps, IPropertyPaneTextFieldProps, IPropertyFieldHeaderCalloutProps {
        onChanged?: (newValue: any) => void; // eslint-disable-line @typescript-eslint/no-explicit-any
    }

/**
 * Public properties of PropertyFieldTextWithCallout custom field
 */
export interface IPropertyFieldTextWithCalloutProps extends IPropertyPaneTextFieldProps, IPropertyFieldHeaderCalloutProps {
    key: string;
    onChanged?: (newValue: any) => void; // eslint-disable-line @typescript-eslint/no-explicit-any
}
