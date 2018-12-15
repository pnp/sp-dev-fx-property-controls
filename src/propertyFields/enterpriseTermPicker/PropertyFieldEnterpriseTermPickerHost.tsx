import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';

import {
    IPropertyFieldEnterpriseTermPickerHostProps,
    IPropertyFieldEnterpriseTermPickerHostState
} from './IPropertyFieldEnterpriseTermPickerHost';

export default class PropertyFieldEnterpriseTermPickerHost extends React.Component<IPropertyFieldEnterpriseTermPickerHostProps, IPropertyFieldEnterpriseTermPickerHostState> {
    constructor(props: IPropertyFieldEnterpriseTermPickerHostProps) {
        super(props);
    }

    public render(): React.ReactElement<IPropertyFieldEnterpriseTermPickerHostProps> {
        return (
            <TextField label={this.props.label} value={this.props.value} onChanged={this._onValueChanged.bind(this)} />
        );
    }

    private _onValueChanged(newValue: string): void {
        if (this.props.onValueChanged) {
            this.props.onValueChanged(newValue);
        }
    }
}