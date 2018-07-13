import * as React from 'react';
import { Dropdown, IDropdownProps } from 'office-ui-fabric-react';
import * as _ from 'lodash';

import PropertyFieldHeader from '../../common/propertyFieldHeader/PropertyFieldHeader';

import { IPropertyFieldDropdownWithCalloutHostProps } from './IPropertyFieldDropdownWithCalloutHost';
import * as telemetry from '../../common/telemetry';

export default class PropertyFieldDropdownHost extends React.Component<IPropertyFieldDropdownWithCalloutHostProps, null> {
    constructor(props: IPropertyFieldDropdownWithCalloutHostProps) {
      super(props);

      telemetry.track('PropertyFieldDropdown', {
        disabled: props.disabled
      });
    }

    public render(): JSX.Element {
        return (
            <div>
                <PropertyFieldHeader {...this.props} />
                <Dropdown {..._.omit(this.props, ['label'])} />
            </div>
        );
    }
}
