import * as React from 'react';
import { Dropdown, IDropdownProps } from 'office-ui-fabric-react';
import * as _ from 'lodash';

import PropertyFieldHeader from '../../common/propertyFieldHeader/PropertyFieldHeader';

import { IPropertyFieldDropdownInfoHeaderHostProps } from './IPropertyFieldDropdownInfoHeaderHost';

export default class PropertyFieldToggleHost extends React.Component<IPropertyFieldDropdownInfoHeaderHostProps, null> {
    public render(): JSX.Element {
        return (
            <div>
                <PropertyFieldHeader {...this.props} />
                <Dropdown {..._.omit(this.props, ['label'])} />
            </div>
        );
    }
}