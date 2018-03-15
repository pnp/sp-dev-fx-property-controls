import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { IPropertyFieldNumberHostProps, IPropertyFieldNumberHostState } from './IPropertyFieldNumberHost';
import * as appInsights from '../../common/appInsights';
import { Async } from 'office-ui-fabric-react/lib/Utilities';
import * as strings from 'PropertyControlStrings';

export default class PropertyFieldNumberHost extends React.Component<IPropertyFieldNumberHostProps, IPropertyFieldNumberHostState> {
  private _async: Async;
  private _delayedChange: (value: string) => void;

  constructor(props: IPropertyFieldNumberHostProps) {
    super(props);

    appInsights.track('PropertyFieldNumber', {
      disabled: props.disabled
    });

    this.state = {
      value: this.props.value ? this.props.value.toString() : null
    };

    this._async = new Async(this);
    this._delayedChange = this._async.debounce(this._onChanged, this.props.deferredValidationTime ? this.props.deferredValidationTime : 200);
  }

  /**
   * Validate if field value is a number
   * @param value
   */
  private _validateNumber = (value: string): string | Promise<string> => {
    if (isNaN(Number(value))) {
      return `${strings.NotNumberValidationMessage} ${value}.`;
    }

    const nrValue = parseInt(value);
    // Check if number is lower or equal to minimum value
    if (this.props.minValue && nrValue < this.props.minValue) {
      return `${strings.MinimumNumberValidationMessage} ${this.props.minValue}`;
    }
    // Check if the number is greater than the maximum value
    if (this.props.maxValue && nrValue > this.props.maxValue) {
      return `${strings.MaximumNumberValidationMessage} ${this.props.maxValue}`;
    }

    if (this.props.onGetErrorMessage) {
      return this.props.onGetErrorMessage(nrValue);
    } else {
      return '';
    }
  }

  /**
   * On field change event handler
   */
  private _onChanged = (value: string): void => {
    // Update state
    this.setState({
      value
    });

    if (!isNaN(Number(value))) {
      const nrValue = parseInt(value);
      if ((!this.props.minValue || nrValue >= this.props.minValue) && (!this.props.maxValue || nrValue <= this.props.maxValue)) {
        // Trigger change for the web part
        this.props.onChanged(nrValue);
      }
    }
  }

  /**
   * Render field
   */
  public render(): JSX.Element {
    return (
      <div>
        <TextField label={this.props.label}
                   onChanged={this._delayedChange}
                   value={this.state.value}
                   description={this.props.description}
                   placeholder={this.props.placeholder}
                   errorMessage={this.props.errorMessage}
                   onGetErrorMessage={this._validateNumber}
                   deferredValidationTime={this.props.deferredValidationTime}
                   disabled={this.props.disabled} />
      </div>
    );
  }
}
