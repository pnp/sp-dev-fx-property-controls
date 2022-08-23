import * as React from 'react';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { Async } from 'office-ui-fabric-react/lib/Utilities';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { IPropertyFieldColumnPickerHostProps, IPropertyFieldColumnPickerHostState } from './IPropertyFieldColumnPickerHost';
import { SPColumnPickerService } from '../../services/SPColumnPickerService';
import FieldErrorMessage from '../errorMessage/FieldErrorMessage';
import { ISPColumn } from './ISPColumn';
import { ISPColumns } from './ISPColumns';
import * as telemetry from '../../common/telemetry';
import { setPropertyValue } from '../../helpers/GeneralHelper';

// Empty column value
const EMPTY_COLUMN_KEY = 'NO_COLUMN_SELECTED';

/**
 * Renders the controls for PropertyFieldColumnPicker component
 */
export default class PropertyFieldColumnPickerHost extends React.Component<IPropertyFieldColumnPickerHostProps, IPropertyFieldColumnPickerHostState> {
  private options: IDropdownOption[] = [];
  private selectedKey: string;
  private latestValidateValue: string;
  private async: Async;
  private delayedValidate: (value: string) => void;

  /**
   * Constructor method
   */
  constructor(props: IPropertyFieldColumnPickerHostProps) {
    super(props);

    telemetry.track('PropertyFieldColumnPicker', {
      disabled: props.disabled
    });

    this.state = {
      results: this.options,
      errorMessage: ''
    };

    this.async = new Async(this);
    this.validate = this.validate.bind(this);
    this.onChanged = this.onChanged.bind(this);
    this.notifyAfterValidate = this.notifyAfterValidate.bind(this);
    this.delayedValidate = this.async.debounce(this.validate, this.props.deferredValidationTime);
  }

  public componentDidMount(): void {
    // Start retrieving the list columns
    this.loadColumns();
  }

  public componentDidUpdate(prevProps: IPropertyFieldColumnPickerHostProps, _prevState: IPropertyFieldColumnPickerHostState): void {
    if (this.props.listId !== prevProps.listId || this.props.webAbsoluteUrl !== prevProps.webAbsoluteUrl) {
      this.loadColumns();
    }
  }

  /**
   * Loads the columns from a SharePoint list
   */
  private loadColumns(): void {
    const { context, columnReturnProperty, selectedColumn, displayHiddenColumns } = this.props;
    const columnService: SPColumnPickerService = new SPColumnPickerService(this.props, context);
    const columnsToExclude: string[] = this.props.columnsToExclude || [];
    this.options = [];
    columnService.getColumns(displayHiddenColumns).then((response: ISPColumns) => {
      // Start mapping the Columns that are selected
      const value = response.value || [];
      value.forEach((column: ISPColumn) => {
        const colPropsToCheck = columnReturnProperty ? column[columnReturnProperty] : column.Id;
        if (selectedColumn === colPropsToCheck) {
          this.selectedKey = columnReturnProperty ? column[columnReturnProperty] : column.Id;
        }
        // Make sure that the current column is NOT in the 'columnsToExclude' array
        if (columnsToExclude.indexOf(column.Title) === -1 && columnsToExclude.indexOf(column.Id) === -1) {
          this.options.push({
            key: columnReturnProperty ? column[columnReturnProperty] : column.Id,
            text: column.Title
          });
        }
      });
      // Option to unselect the column
      this.options.unshift({
        key: EMPTY_COLUMN_KEY,
        text: ''
      });
      // Update the current component state
      this.setState({
        results: this.options,
        selectedKey: this.selectedKey
      });
    }).catch(() => { /* no-op; */ });
  }

  /**
   * Raises when a column has been selected
   */
  private onChanged(option: IDropdownOption, _index?: number): void {
    const newValue: string = option.key as string;
    this.delayedValidate(newValue);
  }

  /**
   * Validates the new custom field value
   */
  private validate(value: string): void {
    if (this.props.onGetErrorMessage === null || this.props.onGetErrorMessage === undefined) {
      this.notifyAfterValidate(this.props.selectedColumn, value);
      return;
    }

    if (this.latestValidateValue === value) {
      return;
    }

    this.latestValidateValue = value;

    const errResult: string | Promise<string> = this.props.onGetErrorMessage(value || '');
    if (typeof errResult !== 'undefined') {
      if (typeof errResult === 'string') {
        if (errResult === '') {
          this.notifyAfterValidate(this.props.selectedColumn, value);
        }
        this.setState({
          errorMessage: errResult
        });
      } else {
        errResult.then((errorMessage: string) => {
          if (!errorMessage) {
            this.notifyAfterValidate(this.props.selectedColumn, value);
          }
          this.setState({
            errorMessage: errorMessage
          });
        }).catch(() => { /* no-op; */ });
      }
    } else {
      this.notifyAfterValidate(this.props.selectedColumn, value);
    }
  }

  /**
   * Notifies the parent Web Part of a property value change
   */
  private notifyAfterValidate(oldValue: string, newValue: string): void {
    // Check if the user wanted to unselect the column
    const propValue = newValue === EMPTY_COLUMN_KEY ? '' : newValue;

    // Deselect all options
    this.options = this.state.results.map(option => {
      if (option.selected) {
        option.selected = false;
      }
      return option;
    });
    // Set the current selected key
    this.selectedKey = newValue;
    // Update the state
    this.setState({
      selectedKey: this.selectedKey,
      results: this.options
    });

    if (this.props.onPropertyChange && propValue !== null) {
      // Store the new property value
      setPropertyValue(this.props.properties, this.props.targetProperty, propValue);

      // Trigger the default onPropertyChange event
      this.props.onPropertyChange(this.props.targetProperty, oldValue, propValue);

      // Trigger the apply button
      if (typeof this.props.onChange !== 'undefined' && this.props.onChange !== null) {
        this.props.onChange(this.props.targetProperty, propValue);
      }
    }
  }

  /**
   * Called when the component will unmount
   */
  public componentWillUnmount(): void {
    if (typeof this.async !== 'undefined') {
      this.async.dispose();
    }
  }

  /**
   * Renders the SPColumnPicker controls with Office UI Fabric
   */
  public render(): JSX.Element {
    // Renders content
    return (
      <div>
        {this.props.label && <Label>{this.props.label}</Label>}
        <Dropdown
          disabled={this.props.disabled}
          label=''
          onChanged={this.onChanged}
          options={this.state.results}
          selectedKey={this.state.selectedKey}
        />

        <FieldErrorMessage errorMessage={this.state.errorMessage} />
      </div>
    );
  }
}
