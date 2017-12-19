import * as React from 'react';
import * as _ from 'lodash';
import { Toggle } from 'office-ui-fabric-react';

import PropertyFieldHeader from '../../common/propertyFieldHeader/PropertyFieldHeader';

import { IPropertyFieldToggleWithCalloutHostProps } from './IPropertyFieldToggleWithCalloutHost';
import * as appInsights from '../../common/appInsights';

export default class PropertyFieldToggleWithCalloutHost extends React.Component<IPropertyFieldToggleWithCalloutHostProps, null> {
  constructor(props: IPropertyFieldToggleWithCalloutHostProps) {
    super(props);

    appInsights.track('PropertyFieldToggleWithCallout', {
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
