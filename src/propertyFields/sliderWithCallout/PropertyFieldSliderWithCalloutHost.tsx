import * as React from 'react';

import PropertyFieldHeader from '../../common/propertyFieldHeader/PropertyFieldHeader';

import { IPropertyFieldSliderWithCalloutHostProps } from './IPropertyFieldSliderWithCalloutHost';
import * as telemetry from '../../common/telemetry';
import { Slider } from '@fluentui/react/lib/components/Slider';

import omit from 'lodash/omit';

export default class PropertyFieldSliderWithCalloutHost extends React.Component<IPropertyFieldSliderWithCalloutHostProps, null> {
  constructor(props: IPropertyFieldSliderWithCalloutHostProps) {
    super(props);

    telemetry.track('PropertyFieldSliderWithCallout', {
      disabled: props.disabled
    });
  }

  public render(): JSX.Element {
    const props = this.props;
    return (
      <div>
        <PropertyFieldHeader
          label={props.label}
          calloutContent={props.calloutContent}
          calloutTrigger={props.calloutTrigger}
          calloutWidth={props.calloutWidth}
          gapSpace={props.gapSpace} />
        <Slider
          {...omit(props, ['label'])}
          />
      </div>
    );
  }
}
