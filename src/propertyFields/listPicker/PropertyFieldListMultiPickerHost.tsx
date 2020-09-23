import * as React from 'react';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { Spinner, SpinnerType } from 'office-ui-fabric-react/lib/Spinner';
import { Async } from 'office-ui-fabric-react/lib/Utilities';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { IPropertyFieldListMultiPickerHostProps, IPropertyFieldListMultiPickerHostState } from './IPropertyFieldListMultiPickerHost';
import { ISPLists, ISPList } from './IPropertyFieldListPickerHost';
import SPListPickerService from '../../services/SPListPickerService';
import FieldErrorMessage from '../errorMessage/FieldErrorMessage';
import * as telemetry from '../../common/telemetry';

/**
* Renders the controls for PropertyFieldSPListMultiplePicker component
*/
export default class PropertyFieldListMultiPickerHost extends React.Component<IPropertyFieldListMultiPickerHostProps, IPropertyFieldListMultiPickerHostState> {
  private options: IChoiceGroupOption[] = [];
  private loaded: boolean = false;
  private async: Async;
  private delayedValidate: (value: string[]) => void;

  /**
  * Constructor
  */
  constructor(props: IPropertyFieldListMultiPickerHostProps) {
    super(props);

    telemetry.track('PropertyFieldListMultiPicker', {
      disabled: props.disabled
    });

    this.onChanged = this.onChanged.bind(this);
    this.onSelectAllChanged = this.onSelectAllChanged.bind(this);
    this.state = {
      results: this.options,
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
    this.loadLists();
  }

  public componentDidUpdate(prevProps: IPropertyFieldListMultiPickerHostProps, prevState: IPropertyFieldListMultiPickerHostState): void {
    if (this.props.baseTemplate !== prevProps.baseTemplate ||
        this.props.webAbsoluteUrl !== prevProps.webAbsoluteUrl) {
      this.loadLists();
    }
  }

  /**
  * Loads the list from SharePoint current web site, or target site if specified by webRelativeUrl
  */
  private loadLists(): void {
    // Builds the SharePoint List service
    const listService: SPListPickerService = new SPListPickerService(this.props, this.props.context);
    const listsToExclude: string[] = this.props.listsToExclude || [];

    this.options = [];
    // Gets the libs
    listService.getLibs().then((response: ISPLists) => {
      response.value.forEach((list: ISPList) => {
        let isSelected: boolean = false;
        let indexInExisting: number = -1;
        // Defines if the current list must be selected by default
        if (this.props.selectedLists) {
          indexInExisting = this.props.selectedLists.indexOf(list.Id);
        }

        if (indexInExisting > -1) {
          isSelected = true;
          this.state.selectedKeys.push(list.Id);
        }

        // Add the option to the list if not inside the 'listsToExclude' array
        if (listsToExclude.indexOf(list.Title) === -1 && listsToExclude.indexOf(list.Id) === -1) {
          this.options.push({
            key: list.Id,
            text: list.Title,
            checked: isSelected
          });
        }
      });
      this.loaded = true;
      this.setState({
        results: this.options,
        selectedKeys: this.state.selectedKeys,
        loaded: true
      });
    });
  }

  /**
  * Raises when a list has been selected
  */
  private onChanged(element: React.FormEvent<HTMLElement>, isChecked: boolean): void {
    if (element) {
      const value: string = (element.currentTarget as any).value;
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
      let selectedKeys = new Array<string>();
      if (isChecked === true) {
        this.options.forEach((value: IChoiceGroupOption) => {
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
      this.notifyAfterValidate(this.props.selectedLists, value);
      return;
    }

    const errResult: string | PromiseLike<string> = this.props.onGetErrorMessage(value || []);
    if (typeof errResult !== 'undefined') {
      if (typeof errResult === 'string') {
        if (errResult === '') {
          this.notifyAfterValidate(this.props.selectedLists, value);
        }
        this.setState({
          errorMessage: errResult
        });
      } else {
        errResult.then((errorMessage: string) => {
          if (typeof errorMessage === 'undefined' || errorMessage === '') {
            this.notifyAfterValidate(this.props.selectedLists, value);
          }
          this.setState({
            errorMessage: errorMessage
          });
        });
      }
    } else {
      this.notifyAfterValidate(this.props.selectedLists, value);
    }
  }

  /**
  * Notifies the parent Web Part of a property value change
  */
  private notifyAfterValidate(oldValue: string[], newValue: string[]) {
    if (this.props.onPropertyChange && newValue !== null) {
      this.props.properties[this.props.targetProperty] = newValue;
      this.props.onPropertyChange(this.props.targetProperty, oldValue, newValue);
      // Trigger the apply button
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
  * Renders the SPListMultiplePicker controls with Office UI  Fabric
  */
  public render(): JSX.Element {
    if (this.loaded === false) {
      return (
        <div>
          <Label>{this.props.label}</Label>
          <Spinner type={SpinnerType.normal} />
        </div>
      );
    } else {
      const styleOfLabel: any = {
        color: this.props.disabled === true ? '#A6A6A6' : 'auto'
      };

      // Renders content
      return (
        <div>
          {
            (this.props.showSelectAll === false || this.props.selectAllInList === true) &&
            <Label>{this.props.label}</Label>
          }
          {
            this.props.showSelectAll === true &&
            <div style={{ marginBottom: '5px'}} className='ms-ChoiceField'>
              <Checkbox
                checked={this.state.selectedKeys.length === this.options.length}
                label={this.props.selectAllInList === true ? this.props.selectAllInListLabel : this.props.label}
                onChange={this.onSelectAllChanged}
                styles={{
                  checkbox: {
                    backgroundColor: (this.state.selectedKeys.length > 0 ? '#f4f4f4' : 'inherit'),
                    visibility: (this.props.selectAllInList === false ? 'hidden' : 'visible')
                  }
                }}
              />
            </div>
          }
          {
            this.options.map((item: IChoiceGroupOption, index: number) => {
              const uniqueKey = this.props.targetProperty + '-' + item.key;
              return (
                <div style={{ marginBottom: '5px' }} className='ms-ChoiceField' key={uniqueKey}>
                  <Checkbox
                    checked={this.state.selectedKeys.indexOf(item.key.toString())>=0}
                    disabled={this.props.disabled}
                    label={item.text}
                    onChange={this.onChanged}
                    inputProps={{ value: item.key }}
                  />
                </div>
              );
            })
          }

          <FieldErrorMessage errorMessage={this.state.errorMessage} />
        </div>
      );
    }
  }
}
