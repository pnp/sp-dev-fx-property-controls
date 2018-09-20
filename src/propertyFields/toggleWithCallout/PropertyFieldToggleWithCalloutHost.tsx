import * as React from 'react';
import * as _ from 'lodash';

import PropertyFieldHeader from '../../common/propertyFieldHeader/PropertyFieldHeader';

import { IPropertyFieldToggleWithCalloutHostProps } from './IPropertyFieldToggleWithCalloutHost';
import * as telemetry from '../../common/telemetry';
import { Toggle } from 'office-ui-fabric-react/lib/components/Toggle';

export default class PropertyFieldToggleWithCalloutHost extends React.Component<IPropertyFieldToggleWithCalloutHostProps, null> {
  constructor(props: IPropertyFieldToggleWithCalloutHostProps) {
    super(props);

    telemetry.track('PropertyFieldToggleWithCallout', {
      disabled: props.disabled
    });
  }

  public render(): JSX.Element {
    return (
      <div>
      <PropertyFieldHeader {...this.props} />
      <Toggle {..._.omit(this.props, ['label'])} />
      </div>
    );
  }
}
