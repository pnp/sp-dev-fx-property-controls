import * as React from 'react';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { ColorPicker, IColorPickerStrings } from 'office-ui-fabric-react/lib/ColorPicker';
import { IconButton } from 'office-ui-fabric-react/lib/Button';
import {
	IPropertyFieldColorPickerHostProps,
	IPropertyFieldColorPickerHostState
} from './IPropertyFieldColorPickerHost';
import styles from './PropertyFieldColorPickerHost.module.scss';
import * as strings from 'PropertyControlStrings';
import { PropertyFieldColorPickerStyle } from './IPropertyFieldColorPicker';
import * as telemetry from '../../common/telemetry';

export default class PropertyFieldColorPickerHost extends React.Component<IPropertyFieldColorPickerHostProps, IPropertyFieldColorPickerHostState> {

	constructor(props: IPropertyFieldColorPickerHostProps, state: IPropertyFieldColorPickerHostState) {
		super(props);

		telemetry.track('PropertyFieldColorPicker', {
			disabled: props.disabled
		});

		this.state = {
			errorMessage: undefined,
			inlinePickerShowing: false
		};

		this.onTogglePicker = this.onTogglePicker.bind(this);
	}

	public render(): JSX.Element {
		return (
			<div className={`${styles.pfColorPicker} ${this.props.isHidden ? styles.hidden : ""}`}>
				{this.props.label && <Label>{this.props.label}</Label>}
				{this.props.style === PropertyFieldColorPickerStyle.Inline &&
					<table className={styles.cpInlineTable}>
						<tbody>
							<tr>
								<td style={{ width: "100%" }}>
									{this.state.inlinePickerShowing &&
										<div className="ms-slideDownIn20">
											<ColorPicker
												color={this.props.selectedColor}
												onChange={(e, color) => this.props.onColorChanged(color.str)}
												alphaSliderHidden={this.props.alphaSliderHidden}
												showPreview={this.props.showPreview}
												strings={strings.ColorPickerStrings as IColorPickerStrings}
											/>
										</div>
									}
									{!this.state.inlinePickerShowing &&
										<div className="ms-slideUpIn20 ms-borderColor-neutralDark"
											style={{ backgroundColor: this.props.selectedColor, border: "1px solid" }}>&nbsp;</div>
									}
								</td>
								<td className={styles.cpInlineRow}>
									<IconButton
										title={strings.ColorPickerButtonTitle}
										disabled={this.props.disabled}
										iconProps={{ iconName: this.props.iconName, ariaLabel: strings.ColorPickerButtonTitle }}
										onClick={this.onTogglePicker} />
								</td>
							</tr>
						</tbody>
					</table>
				}
				{this.props.style === PropertyFieldColorPickerStyle.Full && !this.props.disabled &&
					<div>
						<div style={{ width: 0, height: 0, overflow: 'hidden' }}>
							<input />
						</div>
						<ColorPicker
							color={this.props.selectedColor}
							onChange={(e, color) => this.props.onColorChanged(color.str)}
							alphaSliderHidden={this.props.alphaSliderHidden} />
					</div>
				}
				{this.props.style === PropertyFieldColorPickerStyle.Full && this.props.disabled &&
					<fieldset disabled={true} className={styles.disabledCP}>
						<ColorPicker
							color={this.props.selectedColor}
							alphaSliderHidden={this.props.alphaSliderHidden} />
					</fieldset>
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
