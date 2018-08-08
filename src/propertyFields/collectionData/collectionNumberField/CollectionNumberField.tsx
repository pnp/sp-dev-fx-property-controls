import * as React from 'react';
import styles from '../PropertyFieldCollectionDataHost.module.scss';
import { ICollectionNumberFieldProps, ICollectionNumberFieldState } from '.';
import { ICustomCollectionField } from '..';

export class CollectionNumberField extends React.Component<ICollectionNumberFieldProps, ICollectionNumberFieldState> {
  constructor(props: ICollectionNumberFieldProps) {
    super(props);

    this.state = {
      errorMessage: ''
    };
  }

  /**
   * componentWillMount lifecycle hook
   */
  public componentWillMount(): void {
    this.valueChange(this.props.field, this.props.item[this.props.field.id]);
  }

  /**
   * Value change event handler
   *
   * @param field
   * @param value
   */
  private valueChange = async (field: ICustomCollectionField, value: string | number) => {
    const inputVal = typeof value === "string" ? parseInt(value) : value;
    const validation = await this.props.fValidation(field, inputVal);
    // Update the error message
    this.setState({
      errorMessage: validation
    });
  }

  /**
   * Default React render method
   */
  public render(): React.ReactElement<ICollectionNumberFieldProps> {
    return (
      <div className={`${styles.numberField} ${this.state.errorMessage ? styles.invalidField : ""}`}>
        <input type="number"
               role="spinbutton"
               placeholder={this.props.field.placeholder || this.props.field.title}
               aria-valuemax="99999"
               aria-valuemin="-999999"
               aria-valuenow={this.props.item[this.props.field.id] || ''}
               aria-invalid={!!this.state.errorMessage}
               value={this.props.item[this.props.field.id] || ''}
               onChange={(ev) => this.valueChange(this.props.field, ev.target.value)} />
      </div>
    );
  }
}
