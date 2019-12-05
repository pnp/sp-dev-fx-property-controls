import * as React from 'react';

import PlaceholderWithCallout from '../../common/placeholderWithCallout/PlaceholderWithCallout';

import { IPropertyFieldLinkWithCalloutHostProps } from './IPropertyFieldLinkWithCalloutHost';
import * as telemetry from '../../common/telemetry';
import { Link } from 'office-ui-fabric-react/lib/components/Link';

/**
* Renders the control for PropertyFieldLinkWithCallout component
*/
export default class PropertyFieldLinkHost extends React.Component<IPropertyFieldLinkWithCalloutHostProps, null> {
  constructor(props: IPropertyFieldLinkWithCalloutHostProps) {
    super(props);

    telemetry.track('PropertyFieldLink', {
      disabled: props.disabled
    });
  }

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
