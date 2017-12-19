import * as React from 'react';

import * as _ from 'lodash';

import { TextField } from 'office-ui-fabric-react';
import PropertyFieldHeader from '../../common/propertyFieldHeader/PropertyFieldHeader';

import {IPropertyFieldTextWithCalloutHostProps} from './IPropertyFieldTextWithCalloutHost';
import * as appInsights from '../../common/appInsights';

export default class PropertyFieldTextWithCalloutHost extends React.Component<IPropertyFieldTextWithCalloutHostProps, null> {
  constructor(props: IPropertyFieldTextWithCalloutHostProps) {
    super(props);

    appInsights.track('PropertyFieldTextWithCallout', {
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
