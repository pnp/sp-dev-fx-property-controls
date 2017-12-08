import * as React from 'react';
import { Link, ILinkProps } from 'office-ui-fabric-react';
import * as _ from 'lodash';

import PlaceholderWithCallout from '../../common/placeholderWithCallout/PlaceholderWithCallout';

import { IPropertyFieldLinkWithCalloutHostProps } from './IPropertyFieldLinkWithCalloutHost';

/**
 * Renders the control for PropertyFieldLinkWithCallout component
 */
export default class PropertyFieldLinkHost extends React.Component<IPropertyFieldLinkWithCalloutHostProps, null> {
    public render(): JSX.Element {
        return (
            <div>
                <PlaceholderWithCallout {...this.props}>
                    <Link {...this.props}>{this.props.text}</Link>
                </PlaceholderWithCallout>
            </div>
        );
    }
}
