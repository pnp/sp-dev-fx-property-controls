import * as React from 'react';
import { Checkbox, ICheckboxProps } from 'office-ui-fabric-react';
import * as _ from 'lodash';

import PlaceholderWithCallout from '../../common/placeholderWithCallout/PlaceholderWithCallout';

import { IPropertyFieldCheckboxWithCalloutHostProps } from './IPropertyFieldCheckboxWithCalloutHost';

/**
 * Renders the control for PropertyFieldCheckboxWithCallout component
 */
export default class PropertyFieldCheckboxHost extends React.Component<IPropertyFieldCheckboxWithCalloutHostProps, null> {
    public render(): JSX.Element {
        return (
            <div>
                <PlaceholderWithCallout {...this.props}>
                    <Checkbox {...this.props} label={this.props.text} />
                </PlaceholderWithCallout>
            </div>
        );
    }
}
