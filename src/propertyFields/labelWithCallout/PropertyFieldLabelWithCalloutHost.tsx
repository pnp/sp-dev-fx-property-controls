import * as React from 'react';
import { Label, ILabelProps } from 'office-ui-fabric-react';
import * as _ from 'lodash';

import PlaceholderWithCallout from '../../common/placeholderWithCallout/PlaceholderWithCallout';

import { IPropertyFieldLabelWithCalloutHostProps } from './IPropertyFieldLabelWithCalloutHost';

/**
 * Renders the control for PropertyFieldLabelWithCallout component
 */
export default class PropertyFieldLabelHost extends React.Component<IPropertyFieldLabelWithCalloutHostProps, null> {
    public render(): JSX.Element {
        return (
            <div>
                <PlaceholderWithCallout {...this.props}>
                    <Label {...this.props}>{this.props.text}</Label>
                </PlaceholderWithCallout>
            </div>
        );
    }
}
