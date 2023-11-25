import { IPlaceholderWithCalloutProps } from '../../common/placeholderWithCallout/IPlaceholderWithCallout';
import { ILabelProps } from '@fluentui/react/lib/components/Label';

/**
 * PropertyFieldLabelWithCalloutHost properties interface
 */
export interface IPropertyFieldLabelWithCalloutHostProps extends ILabelProps, IPlaceholderWithCalloutProps {
    text: string;
}
