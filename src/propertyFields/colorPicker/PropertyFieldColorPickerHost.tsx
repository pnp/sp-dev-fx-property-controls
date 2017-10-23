import * as React from 'react';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { ColorPicker } from 'office-ui-fabric-react/lib/ColorPicker';
import {
	IPropertyFieldColorPickerHostProps,
	IPropertyFieldColorPickerHostState
} from './IPropertyFieldColorPickerHost';

export default class PropertyFieldColorPickerHost extends React.Component<IPropertyFieldColorPickerHostProps, IPropertyFieldColorPickerHostState> {

	constructor(props: IPropertyFieldColorPickerHostProps, state: IPropertyFieldColorPickerHostState) {
		super(props);

		this.state = {
			errorMessage: undefined
		};
	}

	public componentDidMount(): void {

	}

	public render(): JSX.Element {
		return (
			<div>
				<Label>{this.props.label}</Label>
				<ColorPicker
					color={this.props.selectedColor}
					onColorChanged={this.props.onColorChanged}
					/>
			</div>
		);
	}

}