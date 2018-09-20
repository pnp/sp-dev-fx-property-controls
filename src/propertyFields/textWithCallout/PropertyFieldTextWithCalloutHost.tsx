import * as React from 'react';

import * as _ from 'lodash';

import PropertyFieldHeader from '../../common/propertyFieldHeader/PropertyFieldHeader';

import {IPropertyFieldTextWithCalloutHostProps} from './IPropertyFieldTextWithCalloutHost';
import * as telemetry from '../../common/telemetry';
import { TextField } from 'office-ui-fabric-react/lib/components/TextField';

export default class PropertyFieldTextWithCalloutHost extends React.Component<IPropertyFieldTextWithCalloutHostProps, null> {
  constructor(props: IPropertyFieldTextWithCalloutHostProps) {
    super(props);

    telemetry.track('PropertyFieldTextWithCallout', {
      disabled: props.disabled
    });
  }

  public render(): JSX.Element {
    return (
      <div>
        <PropertyFieldHeader {...this.props} />
        <TextField { ..._.omit(this.props, ['label']) } />
      </div>
    );
  }
}
