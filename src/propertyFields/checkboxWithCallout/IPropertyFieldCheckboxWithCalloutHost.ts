import { IPlaceholderWithCalloutProps } from '../../common/placeholderWithCallout/IPlaceholderWithCallout';
import { ICheckboxProps } from '@fluentui/react/lib/Checkbox';

/**
 * PropertyFieldCheckboxWithCalloutHost properties interface
 */
export interface IPropertyFieldCheckboxWithCalloutHostProps extends ICheckboxProps, IPlaceholderWithCalloutProps {
    text?: string;
}
