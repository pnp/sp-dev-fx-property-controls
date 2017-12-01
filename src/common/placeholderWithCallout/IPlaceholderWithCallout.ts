import { IPropertyFieldCalloutProps } from '../callout/Callout';

/**
 * PlaceholderWithCallout component props
 */
export interface IPlaceholderWithCalloutProps extends IPropertyFieldCalloutProps {

}

/**
 * PlaceholderWithCallout component state
 */
export interface IPlaceholderWithCalloutState {
    /**
     * Flag if the callout is currently visible
     */
    isCalloutVisible?: boolean;
}