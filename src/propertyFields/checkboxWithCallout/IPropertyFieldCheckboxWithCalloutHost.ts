import { ICheckboxProps } from 'office-ui-fabric-react';

import { IPlaceholderWithCalloutProps } from '../../common/placeholderWithCallout/IPlaceholderWithCallout';

/**
 * PropertyFieldCheckboxWithCalloutHost properties interface
 */
export interface IPropertyFieldCheckboxWithCalloutHostProps extends ICheckboxProps, IPlaceholderWithCalloutProps {
    text?: string;
}
