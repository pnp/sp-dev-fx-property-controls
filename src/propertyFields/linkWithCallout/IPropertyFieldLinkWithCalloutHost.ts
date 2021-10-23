import { IPlaceholderWithCalloutProps } from '../../common/placeholderWithCallout/IPlaceholderWithCallout';
import { IPopupWindowProps } from '@microsoft/sp-property-pane';
import { ILinkProps } from 'office-ui-fabric-react/lib/components/Link';

/**
 * PropertyFieldLinkWithCalloutHost properties interface
 */
export interface IPropertyFieldLinkWithCalloutHostProps extends ILinkProps, IPlaceholderWithCalloutProps {
    text: string;
    popupWindowProps?: IPopupWindowProps; // this is not actually used, but included for types casting
}
