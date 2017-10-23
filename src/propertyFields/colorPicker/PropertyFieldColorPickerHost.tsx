import * as React from 'react';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { ColorPicker } from 'office-ui-fabric-react/lib/ColorPicker';
import { IconButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
import {
	IPropertyFieldColorPickerHostProps,
	IPropertyFieldColorPickerHostState
} from './IPropertyFieldColorPickerHost';
import styles from './PropertyFieldColorPickerHost.module.scss';
import { PropertyFieldColorPickerStyle } from './IPropertyFieldColorPicker';

export default class PropertyFieldColorPickerHost extends React.Component<IPropertyFieldColorPickerHostProps, IPropertyFieldColorPickerHostState> {

	constructor(props: IPropertyFieldColorPickerHostProps, state: IPropertyFieldColorPickerHostState) {
		super(props);

		this.state = {
			errorMessage: undefined,
			inlinePickerShowing: false
		};

		this.onTogglePicker = this.onTogglePicker.bind(this);
	}

	public render(): JSX.Element {
		return (
			<div>
				<Label>{this.props.label}</Label>
				{this.props.style === PropertyFieldColorPickerStyle.Inline &&
					<table className={styles.cpInlineTable}>
						<tbody>
							<tr>
								<td style={{width:"100%"}}>
									{this.state.inlinePickerShowing &&
										<div className="ms-slideDownIn20 ms-borderColor-neutralDark">
											<ColorPicker
												color={this.props.selectedColor}
												onColorChanged={this.props.onColorChanged}
												alphaSliderHidden={this.props.alphaSliderHidden} />
										</div>
									}
									{!this.state.inlinePickerShowing &&
										<div className="ms-slideUpIn20 ms-borderColor-neutralDark"
										 style={{backgroundColor:this.props.selectedColor, border:"1px solid"}}>&nbsp;</div>
									}
								</td>
								<td className={styles.cpInlineRow}>
									<IconButton
										title="Choose Color"
										disabled={this.props.disabled}
										iconProps={{ iconName: 'Color' }}
										onClick={this.onTogglePicker} />
								</td>
							</tr>
						</tbody>
					</table>
				}
				{this.props.style === PropertyFieldColorPickerStyle.Full &&
					<ColorPicker
						color={this.props.selectedColor}
						onColorChanged={this.props.onColorChanged}
						alphaSliderHidden={this.props.alphaSliderHidden} />
				}
			</div>
		);
	}

	private onTogglePicker(): void {
		this.setState({
			inlinePickerShowing: !this.state.inlinePickerShowing
		});
	}

}