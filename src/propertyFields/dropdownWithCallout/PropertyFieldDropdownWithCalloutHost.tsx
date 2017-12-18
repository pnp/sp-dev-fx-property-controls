import * as React from 'react';
import { Dropdown, IDropdownProps } from 'office-ui-fabric-react';
import * as _ from 'lodash';

import PropertyFieldHeader from '../../common/propertyFieldHeader/PropertyFieldHeader';

import { IPropertyFieldDropdownWithCalloutHostProps } from './IPropertyFieldDropdownWithCalloutHost';
import * as appInsights from '../../common/appInsights';

export default class PropertyFieldDropdownHost extends React.Component<IPropertyFieldDropdownWithCalloutHostProps, null> {
    constructor(props: IPropertyFieldDropdownWithCalloutHostProps) {
      super(props);

      appInsights.track('PropertyFieldDropdown');
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
