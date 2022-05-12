import * as React from 'react';
import styles from '../PropertyFieldTreeCollectionDataHost.module.scss';
import { ICollectionColorFieldProps } from '.';
import { Async } from 'office-ui-fabric-react/lib/Utilities';
import { Callout, DirectionalHint, Target } from 'office-ui-fabric-react/lib/Callout';
import { ColorPicker } from 'office-ui-fabric-react/lib/ColorPicker';
import { ICustomTreeCollectionField } from '..';

interface ICollectionColorFieldState {
  isCalloutVisible: boolean;
  color: string;
  errorMessage: string;
}

export class CollectionColorField extends React.Component<ICollectionColorFieldProps, ICollectionColorFieldState> {
  private async: Async;
  private delayedValidate: (field: ICustomTreeCollectionField, inputVal: string) => void;
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
   * componentWillMount lifecycle hook
   */
  public componentWillMount(): void {
    this.valueChange(this.props.field, this.props.item[this.props.field.id]);
  }

  private _onCalloutDismiss = () => {
    this.setState({
      isCalloutVisible: false
    });
  }

  private _onCalloutToggle = () => {
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
  private valueChange = async (field: ICustomTreeCollectionField, value: string) => {
    this.setState({
      color: value
    });
    await this.props.fOnValueChange(field.id, value);
    this.delayedValidate(field, value);
  }

  /**
   * Delayed field validation
   */
  private valueValidation = async (field: ICustomTreeCollectionField, value: string) => {
    const validation = await this.props.fValidation(field, value);
    // Update the error message
    this.setState({
      errorMessage: validation
    });
  }

  public render(): React.ReactElement<ICollectionColorFieldProps> {
    const { field } = this.props;

    return (
      <div className={`PropertyFieldTreeCollectionData__panel__color-field ${styles.colorField} ${this.state.errorMessage ? styles.invalidField : ""}`}>

        <div className={styles.colorIndicator}
          style={{ backgroundColor: this.state.color, cursor: this.props.disableEdit ? 'default' : 'hand' }}
          ref={this._colorElement}
          onClick={() => { if (!this.props.disableEdit) this._onCalloutToggle(); }}>
        </div>

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
