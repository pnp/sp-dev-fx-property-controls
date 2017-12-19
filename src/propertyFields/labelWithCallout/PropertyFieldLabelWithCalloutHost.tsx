import * as React from 'react';
import { Label, ILabelProps } from 'office-ui-fabric-react';
import * as _ from 'lodash';

import PlaceholderWithCallout from '../../common/placeholderWithCallout/PlaceholderWithCallout';

import { IPropertyFieldLabelWithCalloutHostProps } from './IPropertyFieldLabelWithCalloutHost';
import * as appInsights from '../../common/appInsights';

/**
* Renders the control for PropertyFieldLabelWithCallout component
*/
export default class PropertyFieldLabelHost extends React.Component<IPropertyFieldLabelWithCalloutHostProps, null> {
  constructor(props: IPropertyFieldLabelWithCalloutHostProps) {
    super(props);

    appInsights.track('PropertyFieldLabel', {
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
