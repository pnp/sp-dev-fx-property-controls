import * as React from 'react';

import PropertyFieldHeader from '../../common/propertyFieldHeader/PropertyFieldHeader';
import type { IPropertyFieldHeaderProps } from '../../common/propertyFieldHeader/IPropertyFieldHeader';

import { IPropertyFieldToggleWithCalloutHostProps } from './IPropertyFieldToggleWithCalloutHost';
import * as telemetry from '../../common/telemetry';
import { Toggle } from '@fluentui/react/lib/components/Toggle';

import omit from 'lodash/omit';

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
        <PropertyFieldHeader
          {...(this.props as IPropertyFieldHeaderProps)}
          label={this.props.label.toString()} />
        <Toggle {...omit(this.props, ['label'])} />
      </div>
    );
  }
}
