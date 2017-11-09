import * as React from 'react';
import * as _ from 'lodash';
import { Toggle } from 'office-ui-fabric-react';

import PropertyFieldHeader from '../../common/propertyFieldHeader/PropertyFieldHeader';

import { IPropertyFieldToggleInfoHeaderHostProps } from './IPropertyFieldToggleInfoHeaderHost';

export default class PropertyFieldToggleInfoHeaderHost extends React.Component<IPropertyFieldToggleInfoHeaderHostProps, null> {
    public render(): JSX.Element {
        return (
            <div>
                <PropertyFieldHeader {...this.props} />
                <Toggle {..._.omit(this.props, ['label'])} />
            </div>
        );
    }
}