import * as React from 'react';

import PlaceholderWithCallout from '../../common/placeholderWithCallout/PlaceholderWithCallout';

import { IPropertyFieldLabelWithCalloutHostProps } from './IPropertyFieldLabelWithCalloutHost';
import * as telemetry from '../../common/telemetry';
import { Label } from '@fluentui/react/lib/components/Label';

/**
* Renders the control for PropertyFieldLabelWithCallout component
*/
export default class PropertyFieldLabelHost extends React.Component<IPropertyFieldLabelWithCalloutHostProps, null> {
  constructor(props: IPropertyFieldLabelWithCalloutHostProps) {
    super(props);

    telemetry.track('PropertyFieldLabel', {
      disabled: props.disabled
    });
  }

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
