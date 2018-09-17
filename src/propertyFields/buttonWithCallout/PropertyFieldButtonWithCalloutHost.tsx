import * as React from 'react';
import { Button } from 'office-ui-fabric-react/lib/components/Button';
import * as _ from 'lodash';

import PlaceholderWithCallout from '../../common/placeholderWithCallout/PlaceholderWithCallout';

import { IPropertyFieldButtonWithCalloutHostProps } from './IPropertyFieldButtonWithCalloutHost';
import * as telemetry from '../../common/telemetry';


/**
 * Renders the control for PropertyFieldButtonWithCallout component
 */
export default class PropertyFieldButtonHost extends React.Component<IPropertyFieldButtonWithCalloutHostProps, null> {
    constructor(props: IPropertyFieldButtonWithCalloutHostProps) {
      super(props);

      telemetry.track('PropertyFieldButton', {
        disabled: props.disabled
      });
    }

    public render(): JSX.Element {
        return (
            <div>
                <PlaceholderWithCallout {...this.props}>
                    <Button {...this.props} />
                </PlaceholderWithCallout>
            </div>
        );
    }
}
