import {
    IPropertyPaneCustomFieldProps,
    IPropertyPaneSliderProps
} from '@microsoft/sp-webpart-base';

import { IPropertyFieldHeaderCalloutProps } from '../../common/propertyFieldHeader/IPropertyFieldHeader';

export interface IPropertyFieldSliderWithCalloutPropsInternal
    extends IPropertyPaneCustomFieldProps, IPropertyPaneSliderProps, IPropertyFieldHeaderCalloutProps {
        key: string;
        debounce?: number;
    }

/**
 * Public properties of PropertyFieldSliderWithCallout custom field
 */
export interface IPropertyFieldSliderWithCalloutProps extends IPropertyPaneSliderProps, IPropertyFieldHeaderCalloutProps {
    key: string;
    debounce?: number;
}
