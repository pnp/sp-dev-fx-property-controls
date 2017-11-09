import * as React from 'react';

import * as _ from 'lodash';

import { TextField } from 'office-ui-fabric-react';
import PropertyFieldHeader from '../../common/propertyFieldHeader/PropertyFieldHeader';

import {IPropertyFieldTextInfoHeaderHostProps} from './IPropertyFieldTextInfoHeaderHost';

export default class PropertyFieldTextInfoHeaderHost extends React.Component<IPropertyFieldTextInfoHeaderHostProps, null> {
    public render(): JSX.Element {
        return (
            <div>
                <PropertyFieldHeader {...this.props} />
                <TextField { ..._.omit(this.props, ['label']) } />
            </div>
        );
    }
}