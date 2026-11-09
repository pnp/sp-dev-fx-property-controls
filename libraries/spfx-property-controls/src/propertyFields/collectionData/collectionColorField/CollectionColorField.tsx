import * as React from 'react';
import styles from '../PropertyFieldCollectionDataHost.module.scss';
import { ICollectionColorFieldProps } from './ICollectionColorFieldProps';
import { Callout, DirectionalHint, ColorPicker, Async } from '@fluentui/react';
import { ICustomCollectionField } from '../ICustomCollectionField';

interface ICollectionColorFieldState {
  isCalloutVisible: boolean;
  color: string;
  errorMessage: string;
}

export class CollectionColorField extends React.Component<ICollectionColorFieldProps, ICollectionColorFieldState> {
  private async: Async;
  private delayedValidate: (field: ICustomCollectionField, inputVal: string) => void;
  private _colorElement = React.createRef<HTMLDivElement>();

  public constructor(props: ICollectionColorFieldProps, state: ICollectionColorFieldState) {
    super(props, state);
    const { field, item } = this.props;

    this.state = {
      isCalloutVisible: false,
      color: item[field.id] ? item[field.id] : "#0000ff",
      errorMessage: ''
    };

    this.async = new Async(this);
    this.delayedValidate = this.async.debounce(this.valueValidation, (this.props.field.deferredValidationTime || this.props.field.deferredValidationTime >= 0) ? this.props.field.deferredValidationTime : 200);
  }

  /**
   * UNSAFE_componentWillMount lifecycle hook
   */
  public UNSAFE_componentWillMount(): void {
    this.valueChange(this.props.field, this.props.item[this.props.field.id]).then(() => { /* no-op; */ }).catch(() => { /* no-op; */ });
  }
  
  /**
   * componentWillUnmount lifecycle hook
   */
  public componentWillUnmount(): void {
    this.async.dispose();
  }

  private _onCalloutDismiss = (): void => {
    this.setState({
      isCalloutVisible: false
    });
  }

  private _onCalloutToggle = (): void => {
    this.setState({
      isCalloutVisible: !this.state.isCalloutVisible
    });
  }

   /**
   * Value change event handler
   *
   * @param field
   * @param value
   */
  private valueChange = async (field: ICustomCollectionField, value: string): Promise<void> => {
    this.setState({
      color: value
    });
    await this.props.fOnValueChange(field.id, value);
    this.delayedValidate(field, value);
  }

  /**
   * Delayed field validation
   */
  private valueValidation = async (field: ICustomCollectionField, value: string): Promise<void> => {
    const validation = await this.props.fValidation(field, value);
    // Update the error message
    this.setState({
      errorMessage: validation
    });
  }

  public render(): React.ReactElement<ICollectionColorFieldProps> {
    return (
      <div className={`PropertyFieldCollectionData__panel__color-field ${styles.colorField} ${this.state.errorMessage ? styles.invalidField : ""}`}>

        <div className={styles.colorIndicator}
          style={{ backgroundColor: this.state.color, cursor: this.props.disableEdit ? 'default' : 'hand' }}
          ref={this._colorElement}
          onClick={() => { if (!this.props.disableEdit) this._onCalloutToggle(); }} />

        <Callout
          gapSpace={0}
          target={this._colorElement.current}
          onDismiss={this._onCalloutDismiss}
          setInitialFocus={true}
          hidden={!this.state.isCalloutVisible}
          directionalHint={DirectionalHint.rightCenter}>

          <ColorPicker
            color={this.state.color}
            alphaSliderHidden={true}
            onChange={async (ev, color) => await this.valueChange(this.props.field, color.str)}
          />

        </Callout>
      </div>
    );
  }
}
