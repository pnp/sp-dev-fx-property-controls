import * as React from 'react';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import { Async } from 'office-ui-fabric-react/lib/Utilities';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { ISPColumn } from './ISPColumn';
import { ISPColumns } from './ISPColumns';
import { SPColumnPickerService } from '../../services/SPColumnPickerService';
import FieldErrorMessage from '../errorMessage/FieldErrorMessage';
import * as telemetry from '../../common/telemetry';
import { setPropertyValue } from '../../helpers/GeneralHelper';
import { IPropertyFieldColumnMultiPickerDropdownHostProps, IPropertyFieldColumnMultiPickerDropdownHostState } from './IPropertyFieldColumnMultiPickerDropdownHost';

/**
* Renders the controls for PropertyFieldSPColumnMultiplePicker component
*/
export default class PropertyFieldColumnMultiPickerDropdownHost extends React.Component<IPropertyFieldColumnMultiPickerDropdownHostProps, IPropertyFieldColumnMultiPickerDropdownHostState> {
    private loaded: boolean = false;
    private async: Async;
    private delayedValidate: (value: string[]) => void;

    /**
    * Constructor
    */
    constructor(props: IPropertyFieldColumnMultiPickerDropdownHostProps) {
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

    public componentDidMount() {
        this.loadColumns();
    }

    public componentDidUpdate(prevProps: IPropertyFieldColumnMultiPickerDropdownHostProps, prevState: IPropertyFieldColumnMultiPickerDropdownHostState): void {
        if (this.props.listId !== prevProps.listId ||
            this.props.webAbsoluteUrl !== prevProps.webAbsoluteUrl) {
            this.loadColumns();
        }
    }

    private loadColumns(): void {
        const { selectedColumns, columnReturnProperty, displayHiddenColumns } = this.props;
        const columnService: SPColumnPickerService = new SPColumnPickerService(this.props, this.props.context);
        const columnsToExclude: string[] = this.props.columnsToExclude || [];
        const options: IDropdownOption[] = [];
        const selectedKeys: string[] = [];
        let selectedColumnsKeys: string[] = [];
        if (selectedColumns && selectedColumns.length) {
            const firstItem = selectedColumns[0];
            if (typeof firstItem === 'string') {
                selectedColumnsKeys = selectedColumns as string[];
            }
            else {
                selectedColumnsKeys = (selectedColumns as string[]).map((o: any) => (columnReturnProperty ? o[columnReturnProperty] : o.Id));
            }
        }
        columnService.getColumns(displayHiddenColumns).then((response: ISPColumns) => {
            // Start mapping the Columns that are selected
            response.value.forEach((column: ISPColumn) => {
                let isSelected: boolean = false;
                let indexInExisting: number = -1;
                let colPropsToCheck = columnReturnProperty ? column[columnReturnProperty] : column.Id;
                // Defines if the current list must be selected by default
                if (selectedColumnsKeys) {
                    indexInExisting = selectedColumnsKeys.indexOf(colPropsToCheck);
                }
                if (indexInExisting > -1) {
                    isSelected = true;
                    selectedKeys.push(colPropsToCheck);
                }

                // Make sure that the current column is NOT in the 'columnsToExclude' array
                if (columnsToExclude.indexOf(column.Title) === -1 && columnsToExclude.indexOf(column.Id) === -1) {
                    options.push({
                        key: colPropsToCheck,
                        text: column.Title,
                        selected: isSelected
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
        });
    }
    /**
    * Raises when a column has been selected
    */
    private onChanged(element: React.FormEvent<HTMLElement>, option?: IDropdownOption, index?: number): void {
        if (element) {
            //const value: string = (element.currentTarget as any).;
            let selectedKeys = this.state.selectedKeys;
            // Check if the element is selected
            if (option.selected === false) {
                // Remove the unselected item
                selectedKeys = selectedKeys.filter(s => s !== option.key);
            } else {
                // Add the selected item and filter out the doubles
                selectedKeys.push(option.key.toString());
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
            let selectedKeys = new Array<string>();
            const {
                results
            } = this.state;
            if (isChecked === true) {
                results.forEach((value: IDropdownOption) => {
                    selectedKeys.push(value.key.toString());
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

        const errResult: string | PromiseLike<string> = this.props.onGetErrorMessage(value || []);
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
                });
            }
        } else {
            this.notifyAfterValidate(value);
        }
    }

    /**
    * Notifies the parent Web Part of a property value change
    */
    private notifyAfterValidate(newValue: string[]) {
        const {
            onPropertyChange,
            onChange,
            selectedColumn,
            targetProperty,
            properties
        } = this.props;

        const {
            loadedColumns
        } = this.state;

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
    public componentWillUnmount() {
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
            const styleOfLabel: any = {
                color: disabled === true ? '#A6A6A6' : 'auto'
            };

            // Renders content
            return (
                <div>
                    <Dropdown
                        multiSelect={true}
                        label={this.props.label}
                        disabled={disabled}
                        options={results}
                        defaultSelectedKeys={selectedKeys}
                        onChange={this.onChanged}
                        selectedKeys={selectedKeys}
                    />
                    <FieldErrorMessage errorMessage={errorMessage} />
                </div>
            );
        }
    }
}
