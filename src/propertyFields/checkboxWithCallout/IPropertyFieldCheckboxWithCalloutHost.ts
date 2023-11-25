import { IPlaceholderWithCalloutProps } from '../../common/placeholderWithCallout/IPlaceholderWithCallout';
import { ICheckboxProps } from '@fluentui/react/lib/components/Checkbox';

/**
 * PropertyFieldCheckboxWithCalloutHost properties interface
 */
export interface IPropertyFieldCheckboxWithCalloutHostProps extends ICheckboxProps, IPlaceholderWithCalloutProps {
    text?: string;
}
