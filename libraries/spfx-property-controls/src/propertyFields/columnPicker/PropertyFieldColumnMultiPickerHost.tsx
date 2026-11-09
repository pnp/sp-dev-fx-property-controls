import * as React from 'react';
import { Label } from '@fluentui/react/lib/Label';
import { IChoiceGroupOption } from '@fluentui/react/lib/ChoiceGroup';
import { Spinner, SpinnerSize } from '@fluentui/react/lib/Spinner';
import { Async } from '@fluentui/react/lib/Utilities';
import { Checkbox } from '@fluentui/react/lib/Checkbox';
import { IPropertyFieldColumnMultiPickerHostProps, IPropertyFieldColumnMultiPickerHostState } from './IPropertyFieldColumnMultiPickerHost';
import { ISPColumn } from './ISPColumn';
import { ISPColumns } from './ISPColumns';
import { SPColumnPickerService } from '../../services/SPColumnPickerService';
import FieldErrorMessage from '../errorMessage/FieldErrorMessage';
import * as telemetry from '../../common/telemetry';
import { setPropertyValue } from '../../helpers/GeneralHelper';

/**
* Renders the controls for PropertyFieldSPColumnMultiplePicker component
*/
export default class PropertyFieldColumnMultiPickerHost extends React.Component<IPropertyFieldColumnMultiPickerHostProps, IPropertyFieldColumnMultiPickerHostState> {
  private loaded: boolean = false;
  private async: Async;
  private delayedValidate: (value: string[]) => void;

  /**
  * Constructor
  */
  constructor(props: IPropertyFieldColumnMultiPickerHostProps) {
    super(props);

    telemetry.track('PropertyFieldColumnMultiPicker', {
      disabled: props.disabled
    });

    this.onChanged = this.onChanged.bind(this);
    this.onSelectAllChanged = this.onSelectAllChanged.bind(this);
    this.state = {
      loadedColumns: {
        value: []
      },
      results: [],
      selectedKeys: [],
      loaded: this.loaded,
      errorMessage: ''
    };

    this.async = new Async(this);
    this.validate = this.validate.bind(this);
    this.notifyAfterValidate = this.notifyAfterValidate.bind(this);
    this.delayedValidate = this.async.debounce(this.validate, this.props.deferredValidationTime);
  }

  public componentDidMount(): void {
    this.loadColumns();
  }

  public componentDidUpdate(prevProps: IPropertyFieldColumnMultiPickerHostProps, prevState: IPropertyFieldColumnMultiPickerHostState): void {
    if (this.props.listId !== prevProps.listId ||
      this.props.webAbsoluteUrl !== prevProps.webAbsoluteUrl) {
      this.loadColumns();
    }
  }

  private loadColumns(): void {
    const { selectedColumns, columnReturnProperty, displayHiddenColumns } = this.props;
    const columnService: SPColumnPickerService = new SPColumnPickerService(this.props, this.props.context);
    const columnsToExclude: string[] = this.props.columnsToExclude || [];
    const options: IChoiceGroupOption[] = [];
    const selectedKeys: string[] = [];
    let selectedColumnsKeys: string[] = [];
    if (selectedColumns && selectedColumns.length) {
      const firstItem = selectedColumns[0];
      if (typeof firstItem === 'string') {
        selectedColumnsKeys = selectedColumns as string[];
      }
      else { // TODO: (Alex Terentiev) I believe this code should be removed as the type of selectedColumns is defined as string[]. Or change the type in properties interface
        selectedColumnsKeys = (selectedColumns as any[]).map(o => (columnReturnProperty ? o[columnReturnProperty] : o.Id)); // eslint-disable-line @typescript-eslint/no-explicit-any
      }
    }
    columnService.getColumns(displayHiddenColumns).then((response: ISPColumns) => {
      // Start mapping the Columns that are selected
      response.value.forEach((column: ISPColumn) => {
        let indexInExisting: number = -1;
        const colPropsToCheck = columnReturnProperty ? column[columnReturnProperty] : column.Id;
        // Defines if the current list must be selected by default
        if (selectedColumnsKeys) {
          indexInExisting = selectedColumnsKeys.indexOf(colPropsToCheck);
        }

        if (indexInExisting > -1) {
          selectedKeys.push(colPropsToCheck);
        }

        // Make sure that the current column is NOT in the 'columnsToExclude' array
        if (columnsToExclude.indexOf(column.Title) === -1 && columnsToExclude.indexOf(column.Id) === -1) {
          options.push({
            key: colPropsToCheck,
            text: column.Title
          });
        }
      });
      this.loaded = true;
      this.setState({
        loadedColumns: response,
        results: options,
        selectedKeys: selectedKeys,
        loaded: true
      });
    }).catch(() => { /* no-op; */ });
  }
  /**
  * Raises when a column has been selected
  */
  private onChanged(element: React.FormEvent<HTMLElement>, isChecked: boolean): void {
    if (element) {
      const value: string = (element.currentTarget as any).value; // eslint-disable-line @typescript-eslint/no-explicit-any
      let selectedKeys = this.state.selectedKeys;
      // Check if the element is selected
      if (isChecked === false) {
        // Remove the unselected item
        selectedKeys = selectedKeys.filter(s => s !== value);
      } else {
        // Add the selected item and filter out the doubles
        selectedKeys.push(value);
        selectedKeys = selectedKeys.filter((item, pos, self) => {
          return self.indexOf(item) === pos;
        });
      }
      // Update the state and validate
      this.setState({
        selectedKeys: selectedKeys
      });
      this.delayedValidate(selectedKeys);
    }
  }

  /**
   * Raises when the select all checkbox is changed
   */
  private onSelectAllChanged(element: React.FormEvent<HTMLElement>, isChecked: boolean): void {
    if (element) {
      const selectedKeys = new Array<string>();
      const {
        results
      } = this.state;
      if (isChecked === true) {
        results.forEach((value: IChoiceGroupOption) => {
          selectedKeys.push(value.key);
        });
      }
      this.setState({
        selectedKeys: selectedKeys
      });
      this.delayedValidate(selectedKeys);
    }
  }

  /**
  * Validates the new custom field value
  */
  private validate(value: string[]): void {
    if (this.props.onGetErrorMessage === null || typeof this.props.onGetErrorMessage === 'undefined') {
      this.notifyAfterValidate(value);
      return;
    }

    const errResult: string | Promise<string> = this.props.onGetErrorMessage(value || []);
    if (typeof errResult !== 'undefined') {
      if (typeof errResult === 'string') {
        if (errResult === '') {
          this.notifyAfterValidate(value);
        }
        this.setState({
          errorMessage: errResult
        });
      } else {
        errResult.then((errorMessage: string) => {
          if (typeof errorMessage === 'undefined' || errorMessage === '') {
            this.notifyAfterValidate(value);
          }
          this.setState({
            errorMessage: errorMessage
          });
        }).catch(() => { /* no-op; */ });
      }
    } else {
      this.notifyAfterValidate(value);
    }
  }

  /**
  * Notifies the parent Web Part of a property value change
  */
  private notifyAfterValidate(newValue: string[]): void {
    const {
      onPropertyChange,
      onChange,
      selectedColumn,
      targetProperty,
      properties
    } = this.props;

    let propValue: string[] | ISPColumn | undefined;

    if (!newValue || !newValue.length) {
      propValue = [];
    }
    else {
      propValue = [...newValue];
    }

    if (onPropertyChange && newValue !== null) {
      setPropertyValue(properties, targetProperty, propValue);
      onPropertyChange(targetProperty, selectedColumn, propValue);
      // Trigger the apply button
      if (typeof onChange !== 'undefined' && onChange !== null) {
        onChange(targetProperty, propValue);
      }
    }
  }

  /**
  * Called when the component will unmount
  */
  public componentWillUnmount(): void {
    this.async.dispose();
  }

  /**
  * Renders the SPColumnMultiplePicker controls with Office UI  Fabric
  */
  public render(): JSX.Element {

    const {
      selectedKeys,
      results,
      errorMessage
    } = this.state;

    const {
      label,
      disabled,
      targetProperty
    } = this.props;

    if (this.loaded === false) {
      return (
        <div>
          <Label>{label}</Label>
          <Spinner size={SpinnerSize.medium} />
        </div>
      );
    } else {
      // Renders content
      return (
        <div>
          {this.props.label && <Label>{this.props.label}</Label>}
          {results && results.length > 0 ? (
            <>
              {
                results.map((item: IChoiceGroupOption, index: number) => {
                  const uniqueKey = targetProperty + '-' + item.key;
                  return (
                    <div style={{ marginBottom: '5px' }} className='ms-ChoiceField' key={uniqueKey}>
                      <Checkbox
                        checked={selectedKeys.indexOf(item.key.toString()) >= 0}
                        disabled={disabled}
                        label={item.text}
                        onChange={this.onChanged}
                        inputProps={{ value: item.key }}
                      />
                    </div>
                  );
                })
              }
            </>
          ) : (
            <FieldErrorMessage errorMessage={"List ID not provided!"} />
          )
          }
          <FieldErrorMessage errorMessage={errorMessage} />
        </div>
      );
    }
  }
}
