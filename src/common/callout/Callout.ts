import * as React from 'react';

/**
 * Enum to describe possible events to show callout
 */
export enum CalloutTriggers {
    Click = 1,
    Hover
}

/**
 * Interface that discibes available settings of callout
 */
export interface IPropertyFieldCalloutProps {
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