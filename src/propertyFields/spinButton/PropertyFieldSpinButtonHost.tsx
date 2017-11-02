import * as React from 'react';
//import { Label } from 'office-ui-fabric-react/lib/Label';
import { SpinButton } from 'office-ui-fabric-react/lib/SpinButton';
import { Position } from 'office-ui-fabric-react/lib/utilities/positioning';
import { IconButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
import {
	IPropertyFieldSpinButtonHostProps,
	IPropertyFieldSpinButtonHostState
} from './IPropertyFieldSpinButtonHost';
//import styles from './PropertyFieldSpinButtonHost.module.scss';
import * as strings from 'PropertyControlStrings';

export default class PropertyFieldSpinButtonHost extends React.Component<IPropertyFieldSpinButtonHostProps, IPropertyFieldSpinButtonHostState> {

	constructor(props: IPropertyFieldSpinButtonHostProps, state: IPropertyFieldSpinButtonHostState) {
		super(props);

		this.state = {
			errorMessage: undefined
		};

		//this.onTogglePicker = this.onTogglePicker.bind(this);
	}

	public render(): JSX.Element {
		return (
			<div>
				<SpinButton
					 label={this.props.label}
					 labelPosition={Position.top}
					 value={this.props.value}
					 onValidate={this.props.onValidate}
					 onIncrement={this.props.onIncrement}
					 onDecrement={this.props.onDecrement}
					 disabled={this.props.disabled}
					 incrementButtonIcon={{iconName: this.props.incrementIconName}}
					 decrementButtonIcon={{iconName: this.props.decrementIconName}} />
			</div>
		);
	}

}