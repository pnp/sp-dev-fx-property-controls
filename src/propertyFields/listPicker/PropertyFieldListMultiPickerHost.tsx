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

/**
* @class
* Renders the controls for PropertyFieldSPListMultiplePicker component
*/
export default class PropertyFieldListMultiPickerHost extends React.Component<IPropertyFieldListMultiPickerHostProps, IPropertyFieldListMultiPickerHostState> {
  private options: IChoiceGroupOption[] = [];
  private loaded: boolean = false;
  private async: Async;
  private delayedValidate: (value: string[]) => void;

  /**
  * @function
  * Constructor
  */
  constructor(props: IPropertyFieldListMultiPickerHostProps) {
    super(props);

    this.onChanged = this.onChanged.bind(this);
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

    this.loadLists();
  }

  /**
  * @function
  * Loads the list from SharePoint current web site
  */
  private loadLists(): void {
    // Builds the SharePoint List service
    var listService: SPListPickerService = new SPListPickerService(this.props, this.props.context);
    // Gets the libs
    listService.getLibs().then((response: ISPLists) => {
      response.value.map((list: ISPList) => {
        var isSelected: boolean = false;
        var indexInExisting: number = -1;
        // Defines if the current list must be selected by default
        if (this.props.selectedLists) {
          indexInExisting = this.props.selectedLists.indexOf(list.Id);
        }

        if (indexInExisting > -1) {
          isSelected = true;
          this.state.selectedKeys.push(list.Id);
        }
        // Add the option to the list
        this.options.push({
          key: list.Id,
          text: list.Title,
          checked: isSelected
        });
      });
      this.loaded = true;
      this.setState({ results: this.options, selectedKeys: this.state.selectedKeys, loaded: true });
    });
  }

  /**
  * @function
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
          return self.indexOf(item) == pos;
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
  * @function
  * Validates the new custom field value
  */
  private validate(value: string[]): void {
    if (this.props.onGetErrorMessage === null || typeof this.props.onGetErrorMessage === "undefined") {
      this.notifyAfterValidate(this.props.selectedLists, value);
      return;
    }

    var result: string | PromiseLike<string> = this.props.onGetErrorMessage(value || []);
    if (typeof result !== "undefined") {
      if (typeof result === 'string') {
        if (result === '') {
          this.notifyAfterValidate(this.props.selectedLists, value);
        }
        this.setState({
          errorMessage: result
        });
      } else {
        result.then((errorMessage: string) => {
          if (typeof errorMessage === "undefined" || errorMessage === '') {
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
  * @function
  * Notifies the parent Web Part of a property value change
  */
  private notifyAfterValidate(oldValue: string[], newValue: string[]) {
    if (this.props.onPropertyChange && newValue !== null) {
      this.props.properties[this.props.targetProperty] = newValue;
      this.props.onPropertyChange(this.props.targetProperty, oldValue, newValue);
      // Trigger the apply button
      if (typeof this.props.onChange !== "undefined" && this.props.onChange !== null) {
        this.props.onChange(this.props.targetProperty, newValue);
      }
    }
  }

  /**
  * @function
  * Called when the component will unmount
  */
  public componentWillUnmount() {
    this.async.dispose();
  }

  /**
  * @function
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
      var styleOfLabel: any = {
        color: this.props.disabled === true ? '#A6A6A6' : 'auto'
      };

      // Renders content
      return (
        <div>
          <Label>{this.props.label}</Label>
          {
            this.options.map((item: IChoiceGroupOption, index: number) => {
              var uniqueKey = this.props.targetProperty + '-' + item.key;
              return (
                <div className="ms-ChoiceField" key={this.props.key + '-multiplelistpicker-' + index}>
                  <Checkbox
                    defaultChecked={item.checked}
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
