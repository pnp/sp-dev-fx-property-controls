import * as React from 'react';
import * as _ from 'lodash';
import { Slider } from 'office-ui-fabric-react';

import PropertyFieldHeader from '../../common/propertyFieldHeader/PropertyFieldHeader';

import { IPropertyFieldSliderWithCalloutHostProps } from './IPropertyFieldSliderWithCalloutHost';
import * as appInsights from '../../common/appInsights';

export default class PropertyFieldSliderWithCalloutHost extends React.Component<IPropertyFieldSliderWithCalloutHostProps, null> {
  constructor(props: IPropertyFieldSliderWithCalloutHostProps) {
    super(props);

    appInsights.track('PropertyFieldSliderWithCallout', {
      disabled: props.disabled
    });
  }

  public render(): JSX.Element {
    return (
      <div>
        <PropertyFieldHeader {...this.props} />
        <Slider {..._.omit(this.props, ['label'])} />
      </div>
    );
  }
}
