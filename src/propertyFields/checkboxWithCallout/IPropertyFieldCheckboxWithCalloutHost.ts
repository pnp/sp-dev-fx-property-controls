import { IPlaceholderWithCalloutProps } from '../../common/placeholderWithCallout/IPlaceholderWithCallout';
import { ICheckboxProps } from 'office-ui-fabric-react/lib/components/Checkbox';

/**
 * PropertyFieldCheckboxWithCalloutHost properties interface
 */
export interface IPropertyFieldCheckboxWithCalloutHostProps extends ICheckboxProps, IPlaceholderWithCalloutProps {
    text?: string;
}
