import * as React from 'react';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { Async } from 'office-ui-fabric-react/lib/Utilities';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { IPropertyFieldListPickerHostProps, IPropertyFieldListPickerHostState, ISPList, ISPLists } from './IPropertyFieldListPickerHost';
import SPListPickerService from '../../services/SPListPickerService';
import FieldErrorMessage from '../errorMessage/FieldErrorMessage';
import * as telemetry from '../../common/telemetry';

// Empty list value, to be checked for single list selection
const EMPTY_LIST_KEY = 'NO_LIST_SELECTED';

/**
 * Renders the controls for PropertyFieldListPicker component
 */
export default class PropertyFieldListPickerHost extends React.Component<IPropertyFieldListPickerHostProps, IPropertyFieldListPickerHostState> {
  private options: IDropdownOption[] = [];
  private selectedKey: string;

  private latestValidateValue: string;
  private async: Async;
  private delayedValidate: (value: string) => void;

  /**
   * Constructor method
   */
  constructor(props: IPropertyFieldListPickerHostProps) {
    super(props);

    telemetry.track('PropertyFieldListPicker', {
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
    // Start retrieving the SharePoint lists
    this.loadLists();
  }

  public componentDidUpdate(prevProps: IPropertyFieldListPickerHostProps, prevState: IPropertyFieldListPickerHostState): void {
    if (this.props.baseTemplate !== prevProps.baseTemplate ||
        this.props.webAbsoluteUrl !== prevProps.webAbsoluteUrl) {
      this.loadLists();
    }
  }

  /**
   * Loads the list from SharePoint current web site, or target site if specified by webRelativeUrl
   */
  private loadLists(): void {
    const listService: SPListPickerService = new SPListPickerService(this.props, this.props.context);
    const listsToExclude: string[] = this.props.listsToExclude || [];
    this.options = [];
    listService.getLibs().then((response: ISPLists) => {
      // Start mapping the list that are selected
      response.value.forEach((list: ISPList) => {
        if (this.props.selectedList === list.Id) {
          this.selectedKey = list.Id;
        }

        // Make sure that the current list is NOT in the 'listsToExclude' array
        if (listsToExclude.indexOf(list.Title) === -1 && listsToExclude.indexOf(list.Id) === -1) {
          this.options.push({
            key: list.Id,
            text: list.Title
          });
        }
      });

      // Option to unselect the list
      this.options.unshift({
        key: EMPTY_LIST_KEY,
        text: ''
      });

      // Update the current component state
      this.setState({
        results: this.options,
        selectedKey: this.selectedKey
      });
    });
  }

  /**
   * Raises when a list has been selected
   */
  private onChanged(option: IDropdownOption, index?: number): void {
    const newValue: string = option.key as string;
    this.delayedValidate(newValue);
  }

  /**
   * Validates the new custom field value
   */
  private validate(value: string): void {
    if (this.props.onGetErrorMessage === null || this.props.onGetErrorMessage === undefined) {
      this.notifyAfterValidate(this.props.selectedList, value);
      return;
    }

    if (this.latestValidateValue === value) {
      return;
    }

    this.latestValidateValue = value;

    const errResult: string | PromiseLike<string> = this.props.onGetErrorMessage(value || '');
    if (typeof errResult !== 'undefined') {
      if (typeof errResult === 'string') {
        if (errResult === '') {
          this.notifyAfterValidate(this.props.selectedList, value);
        }
        this.setState({
          errorMessage: errResult
        });
      } else {
        errResult.then((errorMessage: string) => {
          if (!errorMessage) {
            this.notifyAfterValidate(this.props.selectedList, value);
          }
          this.setState({
            errorMessage: errorMessage
          });
        });
      }
    } else {
      this.notifyAfterValidate(this.props.selectedList, value);
    }
  }

  /**
   * Notifies the parent Web Part of a property value change
   */
  private notifyAfterValidate(oldValue: string, newValue: string) {
    // Check if the user wanted to unselect the list
    const propValue = newValue === EMPTY_LIST_KEY ? '' : newValue;

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
      this.props.properties[this.props.targetProperty] = propValue;
      // Trigger the default onPrpertyChange event
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
  public componentWillUnmount() {
    if (typeof this.async !== 'undefined') {
      this.async.dispose();
    }
  }

  /**
   * Renders the SPListpicker controls with Office UI Fabric
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
