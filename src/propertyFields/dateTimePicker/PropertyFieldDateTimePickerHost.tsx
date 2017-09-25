import * as React from 'react';
import { IPropertyFieldDateTimePickerPropsInternal, TimeConvention, DateConvention, IDateTimeFieldValue } from './IPropertyFieldDateTimePicker';
import { DatePicker, IDatePickerStrings } from 'office-ui-fabric-react/lib/DatePicker';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { Async } from 'office-ui-fabric-react/lib/Utilities';
import * as strings from 'PropertyControlStrings';
import { IPropertyFieldDateTimePickerHostProps, IPropertyFieldDateTimePickerHostState, ITimeComponentProps, IHoursComponentProps } from './IPropertyFieldDateTimePickerHost';
import FieldErrorMessage from '../errorMessage/FieldErrorMessage';
import styles from './PropertyFieldDateTimePickerHost.module.scss';
import HoursComponent from './HoursComponent';
import MinutesComponent from './MinutesComponent';
import SecondsComponent from './SecondsComponent';

/**
 * Defines the labels of the DatePicker control (as months, days, etc.)
 */
class DatePickerStrings implements IDatePickerStrings {
  /**
   * An array of strings for the full names of months.
   * The array is 0-based, so months[0] should be the full name of January.
   */
  public months: string[] = [
    strings.DatePickerMonthLongJanuary, strings.DatePickerMonthLongFebruary,
    strings.DatePickerMonthLongMarch, strings.DatePickerMonthLongApril,
    strings.DatePickerMonthLongMay, strings.DatePickerMonthLongJune, strings.DatePickerMonthLongJuly,
    strings.DatePickerMonthLongAugust, strings.DatePickerMonthLongSeptember, strings.DatePickerMonthLongOctober,
    strings.DatePickerMonthLongNovember, strings.DatePickerMonthLongDecember
  ];
  /**
   * An array of strings for the short names of months.
   * The array is 0-based, so shortMonths[0] should be the short name of January.
   */
  public shortMonths: string[] = [
    strings.DatePickerMonthShortJanuary, strings.DatePickerMonthShortFebruary,
    strings.DatePickerMonthShortMarch, strings.DatePickerMonthShortApril,
    strings.DatePickerMonthShortMay, strings.DatePickerMonthShortJune, strings.DatePickerMonthShortJuly,
    strings.DatePickerMonthShortAugust, strings.DatePickerMonthShortSeptember, strings.DatePickerMonthShortOctober,
    strings.DatePickerMonthShortNovember, strings.DatePickerMonthShortDecember
  ];
  /**
   * An array of strings for the full names of days of the week.
   * The array is 0-based, so days[0] should be the full name of Sunday.
   */
  public days: string[] = [
    strings.DatePickerDayLongSunday, strings.DatePickerDayLongMonday, strings.DatePickerDayLongTuesday,
    strings.DatePickerDayLongWednesday, strings.DatePickerDayLongThursday, strings.DatePickerDayLongFriday,
    strings.DatePickerDayLongSaturday
  ];
  /**
   * An array of strings for the initials of the days of the week.
   * The array is 0-based, so days[0] should be the initial of Sunday.
   */
  public shortDays: string[] = [
    strings.DatePickerDayShortSunday, strings.DatePickerDayShortMonday, strings.DatePickerDayShortTuesday,
    strings.DatePickerDayShortWednesday, strings.DatePickerDayShortThursday, strings.DatePickerDayShortFriday,
    strings.DatePickerDayShortSaturday
  ];
  /**
   * String to render for button to direct the user to today's date.
   */
  public goToToday: string = strings.DatepickerGoToToday;
  /**
   * Error message to render for TextField if isRequired validation fails.
   */
  public isRequiredErrorMessage: string = '';
  /**
   * Error message to render for TextField if input date string parsing fails.
   */
  public invalidInputErrorMessage: string = '';
}

/**
 * Renders the controls for PropertyFieldDateTimePicker component
 */
export default class PropertyFieldDateTimePickerHost extends React.Component<IPropertyFieldDateTimePickerHostProps, IPropertyFieldDateTimePickerHostState> {
  private _latestValidateValue: string;
  private async: Async;
  private delayedValidate: (value: IDateTimeFieldValue) => void;

  private _crntDate: Date;
  private _crntHours: number;
  private _crntMinutes: number;
  private _crntSeconds: number;

  /**
   * Constructor
   */
  constructor(props: IPropertyFieldDateTimePickerHostProps) {
    super(props);
    // Bind the current object to the external called onSelectDate method
    this._onSelectDate = this._onSelectDate.bind(this);
    this._dropdownHoursChanged = this._dropdownHoursChanged.bind(this);
    this._dropdownMinutesChanged = this._dropdownMinutesChanged.bind(this);
    this._dropdownSecondsChanged = this._dropdownSecondsChanged.bind(this);

    // Initiate the current date values
    this._crntDate = this._getDateValue();

    // Intiate the time values (only when date and time convention is active)
    this._crntHours = this.props.dateConvention === DateConvention.DateTime && this._getDateValue() !== null ? this._getDateValue().getHours() : 0;
    this._crntMinutes = this.props.dateConvention === DateConvention.DateTime && this._getDateValue() !== null ? this._getDateValue().getMinutes() : 0;
    this._crntSeconds = this.props.dateConvention === DateConvention.DateTime && this._getDateValue() !== null ? this._getDateValue().getSeconds() : 0;

    // Set the current state
    this.state = {
      day: this._crntDate,
      hours: this._crntHours,
      minutes: this._crntMinutes,
      seconds: this._crntSeconds,
      errorMessage: ''
    };

    this.async = new Async(this);
    this.validate = this.validate.bind(this);
    this.notifyAfterValidate = this.notifyAfterValidate.bind(this);
    this.delayedValidate = this.async.debounce(this.validate, this.props.deferredValidationTime);
  }

  /**
   * Function to retrieve the initial date
   */
  private _getDateValue() {
    if (typeof this.props.initialDate !== 'undefined' && this.props.initialDate !== null) {
      if (typeof this.props.initialDate.value !== 'undefined' && this.props.initialDate.value !== null) {
        return new Date(this.props.initialDate.value);
      }
    }
    return null;
  }

  /**
   * Function called when the DatePicker Office UI Fabric component selected date changed
   */
  private _onSelectDate(date: Date): void {
    if (date === null) {
      return;
    }
    this._crntDate = date;
    this._saveDate();
  }

  /**
   * Function called when hours value have been changed
   * @param element Hours dropdown value
   */
  private _dropdownHoursChanged(element?: IDropdownOption): void {
    this._crntHours = parseInt(element.key.toString());
    this._saveDate();
  }

  /**
   * Function called when minutes value have been changed
   * @param element Minutes dropdown value
   */
  private _dropdownMinutesChanged(element?: IDropdownOption): void {
    this._crntMinutes = parseInt(element.key.toString());
    this._saveDate();
  }

  /**
   * Function called when seconds value have been changed
   * @param element Seconds dropdown value
   */
  private _dropdownSecondsChanged(element?: IDropdownOption): void {
    this._crntSeconds = parseInt(element.key.toString());
    this._saveDate();
  }

  /**
   * Save the new date
   */
  private _saveDate(): void {
    // Check if the current date object exists
    if (this._crntDate === null) {
      return;
    }

    // Set the current date state for the component
    this.setState({
      day: this._crntDate,
      hours: this._crntHours,
      minutes: this._crntMinutes,
      seconds: this._crntSeconds
    });

    // Create the final date object
    const finalDate = new Date(this._crntDate.toISOString());
    finalDate.setHours(this._crntHours);
    finalDate.setMinutes(this._crntMinutes);
    finalDate.setSeconds(this._crntSeconds);

    if (finalDate !== null) {
      let finalDateAsString: string = '';
      if (this.props.formatDate) {
        finalDateAsString = this.props.formatDate(finalDate);
      } else {
        finalDateAsString = finalDate.toString();
      }
      this.delayedValidate({
        value: finalDate,
        displayValue: finalDateAsString
      });
    }
  }

  /**
   * Validates the new custom field value
   */
  private validate(dateVal: IDateTimeFieldValue): void {
    if (typeof this.props.onGetErrorMessage === 'undefined' || this.props.onGetErrorMessage === null) {
      this.notifyAfterValidate(this.props.initialDate, dateVal);
      return;
    }

    if (this._latestValidateValue === dateVal.displayValue) {
      return;
    }
    this._latestValidateValue = dateVal.displayValue;

    const result: string | PromiseLike<string> = this.props.onGetErrorMessage(dateVal.displayValue || '');
    if (typeof result !== 'undefined') {
      if (typeof result === 'string') {
        if (result === '') {
          this.notifyAfterValidate(this.props.initialDate, dateVal);
        }

        this.setState({
          errorMessage: result
        });
      } else {
        result.then((errorMessage: string) => {
          if (typeof errorMessage === 'undefined' || errorMessage === '') {
            this.notifyAfterValidate(this.props.initialDate, dateVal);
          }

          this.setState({
            errorMessage: errorMessage
          });
        });
      }
    }
    else {
      this.notifyAfterValidate(this.props.initialDate, dateVal);
    }
  }

  /**
   * Notifies the parent Web Part of a property value change
   */
  private notifyAfterValidate(oldValue: IDateTimeFieldValue, newValue: IDateTimeFieldValue) {
    if (this.props.onPropertyChange && newValue !== null) {
      this.props.properties[this.props.targetProperty] = newValue;
      this.props.onPropertyChange(this.props.targetProperty, oldValue, newValue);
      //  Trigger the apply button
      if (typeof this.props.onChange !== 'undefined' && this.props.onChange !== null) {
        this.props.onChange(this.props.targetProperty, newValue);
      }
    }
  }

  /**
   * Called when the component will unmount
   */
  public componentWillUnmount() {
    this.async.dispose();
  }

  /**
   * Renders the control
   */
  public render(): JSX.Element {
    // Defines the DatePicker control labels
    const dateStrings: DatePickerStrings = new DatePickerStrings();

    // Check if the time element needs to be rendered
    let timeElm: JSX.Element = <tr />;
    if (this.props.dateConvention === DateConvention.DateTime) {
      timeElm = (<tr>
        <td className={styles.labelCell}>
          <Label className={styles.fieldLabel}>{strings.DateTimePickerTime}</Label>
        </td>
        <td>
          <table cellPadding='0' cellSpacing='0'>
            <tbody>
              <tr>
                <td>
                  <HoursComponent
                    disabled={this.props.disabled}
                    timeConvention={this.props.timeConvention}
                    value={this.state.hours}
                    onChange={this._dropdownHoursChanged} />
                </td>
                <td className={styles.seperator}><Label>:</Label></td>
                <td>
                  <MinutesComponent
                    disabled={this.props.disabled}
                    value={this.state.minutes}
                    onChange={this._dropdownMinutesChanged} />
                </td>
                <td className={styles.seperator}><Label>:</Label></td>
                <td>
                  <SecondsComponent
                    disabled={this.props.disabled}
                    value={this.state.seconds}
                    onChange={this._dropdownSecondsChanged} />
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>);
    }

    // Renders content
    return (
      <div className={styles.propertyFieldDateTimePicker}>
        <Label>{this.props.label}</Label>
        <table cellPadding='0' cellSpacing='0'>
          <tbody>
            <tr>
              <td className={styles.labelCell}>
                <Label className={styles.fieldLabel}>{strings.DateTimePickerDate}</Label>
              </td>
              <td>
                <DatePicker disabled={this.props.disabled} value={this.state.day} strings={dateStrings}
                  isMonthPickerVisible={true} onSelectDate={this._onSelectDate} allowTextInput={false} />
              </td>
            </tr>

            {timeElm}
          </tbody>
        </table>


        <FieldErrorMessage errorMessage={this.state.errorMessage} />
      </div >
    );
  }
}
