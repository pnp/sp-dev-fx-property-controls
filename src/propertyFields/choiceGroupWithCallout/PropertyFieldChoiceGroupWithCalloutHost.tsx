import * as React from 'react';
const omit: any = require('lodash.omit');

import PropertyFieldHeader from '../../common/propertyFieldHeader/PropertyFieldHeader';

import { IPropertyFieldChoiceGroupWithCalloutHostProps } from './IPropertyFieldChoiceGroupWithCalloutHost';
import * as telemetry from '../../common/telemetry';
import { ChoiceGroup, IChoiceGroupProps } from 'office-ui-fabric-react/lib/components/ChoiceGroup';

export default class PropertyFieldToggleWithCalloutHost extends React.Component<IPropertyFieldChoiceGroupWithCalloutHostProps, null> {
    constructor(props: IPropertyFieldChoiceGroupWithCalloutHostProps) {
        super(props);

        telemetry.track('PropertyFieldToggleWithCallout', {
            disabled: props.disabled
        });
    }

    public render(): JSX.Element {
        const choiceGroupProps: IChoiceGroupProps = omit(this.props, ['label']);
        choiceGroupProps.options.forEach(option => {
            if (option.iconProps) {
                const iconPropsAny: any = option.iconProps as any;
                option.iconProps.iconName = iconPropsAny.officeFabricIconFontName;
            }
        });
        return (
            <div>
                <PropertyFieldHeader {...this.props} />
                <ChoiceGroup {...omit(this.props, ['label'])} />
            </div>
        );
    }
}
