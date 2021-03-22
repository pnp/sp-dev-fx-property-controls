import * as React from "react";
import { IRenderFunction, getId } from 'office-ui-fabric-react/lib/Utilities';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Icon, IIconProps } from 'office-ui-fabric-react/lib/Icon';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import {
  IPropertyFieldIconPickerHostProps,
  IPropertyFieldIconPickerHostState
} from "./IPropertyFieldIconPickerHost";
import * as strings from 'PropertyControlStrings';
import { FluentIconsService } from '../../services/FluentIconsService';
import * as telemetry from '../../common/telemetry';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
import { Panel, PanelType, IPanelProps } from 'office-ui-fabric-react/lib/Panel';
import debounce from 'lodash/debounce';
import styles from './IconPicker.module.scss';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { setPropertyValue } from "../../helpers/GeneralHelper";
initializeIcons();

export default class PropertyFieldIconPickerHost extends React.Component<IPropertyFieldIconPickerHostProps,IPropertyFieldIconPickerHostState> {

  private radioIdBase: string = getId("radio");

  private readonly _fluentIconsService: FluentIconsService;


  constructor(props: IPropertyFieldIconPickerHostProps) {
    super(props);
    telemetry.track('PropertyFieldIconPicker', {
      disabled: props.disabled
    });

    this._fluentIconsService = new FluentIconsService();
    this.state = {
        currentIcon: this.props.currentIcon || null,
        isPanelOpen: false,
        items: this._fluentIconsService.getAll()
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
      {

        renderOption === 'panel' ?
          <Panel
            isOpen={this.state.isPanelOpen}
            onDismiss={this.closePanel}
            type={PanelType.medium}
            data-automation-id={`icon-picker-panel`}
            closeButtonAriaLabel={strings.CloseButton}
            className={panelClassName}
            onRenderNavigation={this.renderPanelNav}
            onRenderFooterContent={this.renderPanelFooter}
          >
            {this.renderPanelContent()}
          </Panel>
          :
          <Dialog
            hidden={!this.state.isPanelOpen}
            onDismiss={this.closePanel}
            isBlocking={true}
            containerClassName={styles.dialog}

            dialogContentProps={{
              type: DialogType.normal,
              title: strings.SelectIcon,
              showCloseButton: true,
              className: panelClassName
            }}
          >
            <SearchBox className={styles.searchBox}
              onAbort={this.onAbort}
              data-automation-id={`icon-picker-search`}
              onSearch={debounce(this.onChange, 300)}
              onChange={debounce((e, value) => this.onChange(value), 300)} />
            <div className={styles.dialogIconsContainer}>
              {this.renderPanelContent()}
            </div>

            <DialogFooter>
              <div className={styles.dialogFooter}>
                <Icon iconName={this.state.currentIcon} className={styles.dialogSelectedIcons} />
                <PrimaryButton className={styles.save} text={strings.SaveButtonLabel} onClick={this.confirmSelection} disabled={!this.state.currentIcon} data-automation-id={`icon-picker-save`} />
                <DefaultButton text={strings.CancelButtonLabel} onClick={this.closePanel} className={styles.btnCancel} data-automation-id={`icon-picker-close`} />
              </div>
            </DialogFooter>
          </Dialog>

      }
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
      isPanelOpen: true,
      items: this._fluentIconsService.getAll() //IconNames.Icons
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

  private onAbort = (): void => {
    this.setState({
      items: this._fluentIconsService.getAll() //IconNames.Icons
    });
  }

  private onChange = (newValue?: string): void => {
    let items: string[];
    if (newValue && newValue.trim().length > 2) {
      items = this._fluentIconsService.search(newValue); /*IconNames.Icons.filter(item => {
        return item.toLocaleLowerCase().indexOf(newValue.toLocaleLowerCase()) !== -1;
      });*/
    } else {
      items =  this._fluentIconsService.getAll();//IconNames.Icons;
    }
    this.setState({
      items: items
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

  private renderPanelNav: IRenderFunction<IPanelProps> = (props: IPanelProps, defaultRender: IRenderFunction<IPanelProps>) => {
    return <div className={styles.navArea}>
      <h2 className={styles.headTitle}>{strings.SelectIcon}</h2>
      <SearchBox className={styles.searchBox}
        onAbort={this.onAbort}
        data-automation-id={`icon-picker-search`}
        onSearch={debounce(this.onChange, 300)}
        onChange={debounce((e, value) => this.onChange(value), 300)} />
      <div className={styles.closeBtnContainer}>{defaultRender!(props)}</div>
    </div>;
  }

  private renderPanelContent = () => {
    return <div>
      {this.renderIcons()}
    </div>;
  }

  private renderPanelFooter: IRenderFunction<IPanelProps> = () => {
    return <div className={styles.footer} data-automation-id={`icon-picker-footer`}>
      <PrimaryButton text={strings.SaveButtonLabel} onClick={this.confirmSelection} disabled={!this.state.currentIcon} className={styles.btnSave} data-automation-id={`icon-picker-save`} />
      <div className={`${styles.selectionDisplay} ${!this.state.currentIcon ? 'noSelection' : ''}`}>
        <span className={styles.selectionLabel}>{strings.SelectedLabel}:</span>
        <Icon iconName={this.state.currentIcon} className={styles.selectionIcon} />
      </div>
      <DefaultButton text={strings.CancelButtonLabel} onClick={this.closePanel} className={styles.btnCancel} data-automation-id={`icon-picker-close`} />
    </div>;
  }

  private renderIcons = (): React.ReactElement<IPropertyFieldIconPickerHostProps> => {
    return (<ul className={styles.iconList}>
      {this.state.items.map(this.renderIcon)}
    </ul>);
  }

  private renderIcon = (item: string): JSX.Element => {
    const radioId: string = `${this.radioIdBase}-${item}`;
    return <li className={styles.iconItem}>
      <input type="radio" name={this.radioIdBase} id={radioId} className={styles.iconRadio}
        data-automation-id={`icon-picker-${item}`}
        checked={item == this.state.currentIcon}
        onChange={() => this.iconOnClick(item)} />
      <label className={styles.iconLabel} htmlFor={radioId} title={item}>
        <Icon iconName={item} className={styles.iconGlyph} />
        <span className={styles.iconName}>{item}</span>
      </label>
    </li>;
  }

}
