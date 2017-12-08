import { ILabelProps } from 'office-ui-fabric-react';

import { IPlaceholderWithCalloutProps } from '../../common/placeholderWithCallout/IPlaceholderWithCallout';

/**
 * PropertyFieldLabelWithCalloutHost properties interface
 */
export interface IPropertyFieldLabelWithCalloutHostProps extends ILabelProps, IPlaceholderWithCalloutProps {
    text: string;
}
