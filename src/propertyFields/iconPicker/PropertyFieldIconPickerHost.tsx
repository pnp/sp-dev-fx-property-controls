import * as React from 'react';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { IIconProps } from 'office-ui-fabric-react/lib/Icon';
import {
  IPropertyFieldIconPickerHostProps,
  IPropertyFieldIconPickerHostState
} from './IPropertyFieldIconPickerHost';
import * as telemetry from '../../common/telemetry';
import { DialogType } from 'office-ui-fabric-react/lib/Dialog';
import { PanelType } from 'office-ui-fabric-react/lib/Panel';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { setPropertyValue } from '../../helpers/GeneralHelper';
import { IconSelector } from '../../common/iconSelector/IconSelector';

export default class PropertyFieldIconPickerHost extends React.Component<IPropertyFieldIconPickerHostProps, IPropertyFieldIconPickerHostState> {
  constructor(props: IPropertyFieldIconPickerHostProps) {
    super(props);
    telemetry.track('PropertyFieldIconPicker', {
      disabled: props.disabled
    });

    this.state = {
      currentIcon: this.props.currentIcon || null,
      isPanelOpen: false
    };
  }

  public componentDidUpdate(prevProps: IPropertyFieldIconPickerHostProps, prevState: IPropertyFieldIconPickerHostState) {
    if (prevProps.currentIcon !== this.props.currentIcon) {
      this.setState({
        currentIcon: this.props.currentIcon
      });
    }
  }

  public render(): React.ReactElement<IPropertyFieldIconPickerHostProps> {
    const {
      buttonLabel,
      buttonClassName,
      disabled,
      panelClassName,
      label
    } = this.props;

    let renderOption = this.props.renderOption;

    const iconProps: IIconProps = { iconName: this.props.currentIcon };

    renderOption = renderOption === undefined ? 'panel' : renderOption;
    return <div>
      {label && label.length > 0 && <Label>{label}</Label>}
      <PrimaryButton
        text={buttonLabel}
        onClick={this.iconPickerOnClick}
        className={buttonClassName}
        disabled={disabled}
        iconProps={
          iconProps
        }
        data-automation-id={`icon-picker-open`}
      />
      <IconSelector
        renderOption={renderOption}
        currentIcon={this.state.currentIcon}
        panelClassName={panelClassName}
        panelType={PanelType.medium}
        dialogType={DialogType.normal}
        isOpen={this.state.isPanelOpen}
        onChange={this.iconOnClick}
        onDismiss={this.closePanel}
        onSave={this.confirmSelection}
      />
    </div>;
  }

  private closePanel = (): void => {
    this.setState({
      currentIcon: this.props.currentIcon,
      isPanelOpen: false
    });
  }

  private iconPickerOnClick = (): void => {
    this.setState({
      isPanelOpen: true
    });
  }

  private iconOnClick = (iconName: string): void => {
    if (this.props.onChanged) {
      if (typeof this.props.onChanged !== 'undefined' && this.props.onChanged !== null) {
        this.props.onChange(this.props.targetProperty, iconName);
      }
    }
    this.setState({
      currentIcon: iconName
    });
  }

  private confirmSelection = (): void => {
    if (this.props.onSave) {
      this.props.onSave(this.state.currentIcon);

      setPropertyValue(this.props.properties, this.props.targetProperty, this.state.currentIcon);
      this.props.onPropertyChange(this.props.targetProperty, this.props.currentIcon, this.state.currentIcon);

      if (typeof this.props.onChange !== 'undefined' && this.props.onChange !== null) {
        this.props.onChange(this.props.targetProperty, this.state.currentIcon);
      }
    }
    this.setState({
      isPanelOpen: false
    });
  }

}
