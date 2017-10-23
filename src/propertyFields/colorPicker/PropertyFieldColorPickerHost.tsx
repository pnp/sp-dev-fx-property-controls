import * as React from 'react';
import {
	IPropertyFieldColorPickerHostProps,
	IPropertyFieldColorPickerHostState
} from './IPropertyFieldColorPickerHost';

export default class PropertyFieldColorPickerHost extends React.Component<IPropertyFieldColorPickerHostProps, IPropertyFieldColorPickerHostState> {

	private selectedColor: React.ReactText;

	constructor(props: IPropertyFieldColorPickerHostProps, state: IPropertyFieldColorPickerHostState) {
		super(props);
		this.selectedColor = props.selectedColor;

		this.state = {
			errorMessage: undefined
		};
	}

	public componentDidMount(): void {

	}

	public render(): JSX.Element {
		return (
			<div>Wowee!</div>
		);
	}

}