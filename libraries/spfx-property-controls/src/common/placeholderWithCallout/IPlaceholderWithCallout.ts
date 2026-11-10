import * as React from 'react';
import { IPropertyFieldCalloutProps } from '../callout/Callout';

/**
 * PlaceholderWithCallout component props
 */
export interface IPlaceholderWithCalloutProps extends IPropertyFieldCalloutProps {
    /**
     * Content to render inside the placeholder
     */
    children?: React.ReactNode;
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