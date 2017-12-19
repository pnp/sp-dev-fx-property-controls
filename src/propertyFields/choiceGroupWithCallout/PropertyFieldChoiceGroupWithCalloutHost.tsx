import * as React from 'react';
import * as _ from 'lodash';
import { ChoiceGroup } from 'office-ui-fabric-react';

import PropertyFieldHeader from '../../common/propertyFieldHeader/PropertyFieldHeader';

import { IPropertyFieldChoiceGroupWithCalloutHostProps } from './IPropertyFieldChoiceGroupWithCalloutHost';
import * as appInsights from '../../common/appInsights';

export default class PropertyFieldToggleWithCalloutHost extends React.Component<IPropertyFieldChoiceGroupWithCalloutHostProps, null> {
    constructor(props: IPropertyFieldChoiceGroupWithCalloutHostProps) {
        super(props);

        appInsights.track('PropertyFieldToggleWithCallout', {
          disabled: props.disabled
        });
    }

    public render(): JSX.Element {
        return (
            <div>
                <PropertyFieldHeader {...this.props} />
                <ChoiceGroup {..._.omit(this.props, ['label'])} />
            </div>
        );
    }
}
