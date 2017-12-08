import * as React from 'react';
import * as _ from 'lodash';
import { Slider } from 'office-ui-fabric-react';

import PropertyFieldHeader from '../../common/propertyFieldHeader/PropertyFieldHeader';

import { IPropertyFieldSliderWithCalloutHostProps } from './IPropertyFieldSliderWithCalloutHost';

export default class PropertyFieldToggleWithCalloutHost extends React.Component<IPropertyFieldSliderWithCalloutHostProps, null> {
    public render(): JSX.Element {
        return (
            <div>
                <PropertyFieldHeader {...this.props} />
                <Slider {..._.omit(this.props, ['label'])} />
            </div>
        );
    }
}
