import * as React from 'react';
import { SpinButton } from '@fluentui/react/lib/SpinButton';
import { Position } from '@fluentui/react/lib/Positioning';
import {
	IPropertyFieldSpinButtonHostProps,
	IPropertyFieldSpinButtonHostState
} from './IPropertyFieldSpinButtonHost';
import * as telemetry from '../../common/telemetry';

export default class PropertyFieldSpinButtonHost extends React.Component<IPropertyFieldSpinButtonHostProps, IPropertyFieldSpinButtonHostState> {

	constructor(props: IPropertyFieldSpinButtonHostProps, state: IPropertyFieldSpinButtonHostState) {
		super(props);

		telemetry.track('PropertyFieldSpinButton', {
			disabled: props.disabled
		});

		this.state = {
			errorMessage: undefined
		};
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
					incrementButtonIcon={{ iconName: this.props.incrementIconName }}
					decrementButtonIcon={{ iconName: this.props.decrementIconName }} />
			</div>
		);
	}
}
