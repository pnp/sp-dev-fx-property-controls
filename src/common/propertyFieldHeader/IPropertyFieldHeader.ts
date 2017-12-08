import * as React from 'react';

/**
 * Enum to describe possible events to show callout
 */
export enum CalloutTriggers {
    // TODO: remove this enum and use ../callout/Callout module instead. Make this chage after merge of PR #7
    Click = 1,
    Hover
}

/**
 * Interface that discibes available settings of Header callout
 */
export interface IPropertyFieldHeaderCalloutProps {
    // TODO: remove this interface and use IPropertyFieldCalloutProps from ../callout/Callout module instead. Make this chage after merge of PR #7
    /**
     * Callout content - any HTML
    */
    calloutContent?: React.ReactNode;
    /**
     * Custom width for callout including borders. If value is 0, no width is applied.
     */
    calloutWidth?: number;
    /**
     * Event to show the callout
     */
    calloutTrigger?: CalloutTriggers;
    /**
     * The gap between the Callout and the target
     */
    gapSpace?: number;
}

/**
 * PropertyFieldHeader component props
 */
export interface IPropertyFieldHeaderProps extends IPropertyFieldHeaderCalloutProps {
    /**
     * The label to be shown in the header
     */
    label?: string;
}

/**
 * PropertyFieldHeader component state
 */
export interface IPropertyFieldHeaderState {
    /**
     * Flag if the callout is currently visible
     */
    isCalloutVisible?: boolean;
}
