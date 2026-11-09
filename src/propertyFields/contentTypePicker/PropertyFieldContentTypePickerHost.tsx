import * as React from 'react';
import { Dropdown, IDropdownOption } from '@fluentui/react/lib/Dropdown';
import { Async } from '@fluentui/react/lib/Utilities';
import { Label } from '@fluentui/react/lib/Label';
import { IPropertyFieldContentTypePickerHostProps, IPropertyFieldContentTypePickerHostState } from './IPropertyFieldContentTypePickerHost';
import { SPContentTypePickerService } from '../../services/SPContentTypePickerService';
import FieldErrorMessage from '../errorMessage/FieldErrorMessage';
import { ISPContentType } from '.';
import { ISPContentTypes } from './ISPContentTypes';
import * as telemetry from '../../common/telemetry';
import { setPropertyValue } from '../../helpers/GeneralHelper';

// Empty contentType value
const EMPTY_CONTENT_TYPE_KEY = 'NO_CONTENT_TYPE_SELECTED';

/**
 * Renders the controls for PropertyFieldContentTypePicker component
 */
export default class PropertyFieldContentTypePickerHost extends React.Component<IPropertyFieldContentTypePickerHostProps, IPropertyFieldContentTypePickerHostState> {
  private options: IDropdownOption[] = [];
  private selectedKey: string;
  private latestValidateValue: string;
  private async: Async;
  private delayedValidate: (value: string) => void;

  /**
   * Constructor method
   */
  constructor(props: IPropertyFieldContentTypePickerHostProps) {
    super(props);

    telemetry.track('PropertyFieldContentTypePicker', {
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
    // Start retrieving the content types
    this.loadContentTypes();
  }

  public componentDidUpdate(prevProps: IPropertyFieldContentTypePickerHostProps, _prevState: IPropertyFieldContentTypePickerHostState): void {
    if (this.props.listId !== prevProps.listId || this.props.webAbsoluteUrl !== prevProps.webAbsoluteUrl) {
      this.loadContentTypes();
    }
  }

  /**
   * Loads the loadContentTypes from a selected SharePoint list or SharePoint site
   */
  private loadContentTypes(): void {
    const contentTypeService: SPContentTypePickerService = new SPContentTypePickerService(this.props, this.props.context);
    const contentTypesToExclude: string[] = this.props.contentTypesToExclude || [];
    this.options = [];
    contentTypeService.getContentTypes().then((response: ISPContentTypes) => {
      console.log(response);
      // Start mapping the contentTypes that are selected
      response.value.forEach((contentType: ISPContentType) => {
        if (this.props.selectedContentType === contentType.Id.StringValue) {
          this.selectedKey = contentType.Id.StringValue;
        }

         // Make sure that the current contentType is NOT in the 'contentTypesToExclude' array
         if (contentTypesToExclude.indexOf(contentType.Name) === -1 && contentTypesToExclude.indexOf(contentType.Id.StringValue) === -1) {
          this.options.push({
            key: contentType.Id.StringValue,
            text: contentType.Name
          });
        }
      });

      // Option to unselect the contentType
      this.options.unshift({
        key: EMPTY_CONTENT_TYPE_KEY,
        text: ''
      });

      // Update the current component state
      this.setState({
        results: this.options,
        selectedKey: this.selectedKey
      });
    }).catch((error) => {
      console.error('Error loading content types:', error);
      // Handle the error appropriately, e.g., display an error message to the user
      this.setState({
        errorMessage: 'Error : List does not exist.\n\nThe page you selected contains a list that does not exist.  It may have been deleted by another user.'
      });
    });
  }


  /**
   * Raises when a contentType has been selected
   */

  private onChanged(element: React.FormEvent<HTMLElement>, option?: IDropdownOption, index?: number): void {
    const newValue: string = option.key as string;
    this.delayedValidate(newValue);
  }
  /**
   * Validates the new custom field value
   */
  private validate(value: string): void {
    if (this.props.onGetErrorMessage === null || this.props.onGetErrorMessage === undefined) {
      this.notifyAfterValidate(this.props.selectedContentType, value);
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
          this.notifyAfterValidate(this.props.selectedContentType, value);
        }
        this.setState({
          errorMessage: errResult
        });
      } else {
        errResult.then((errorMessage: string) => {
          if (!errorMessage) {
            this.notifyAfterValidate(this.props.selectedContentType, value);
          }
          this.setState({
            errorMessage: errorMessage
          });
        }).catch(() => { /* no-op; */ });
      }
    } else {
      this.notifyAfterValidate(this.props.selectedContentType, value);
    }
  }

  /**
   * Notifies the parent Web Part of a property value change
   */
  private notifyAfterValidate(oldValue: string, newValue: string): void {
    // Check if the user wanted to unselect the contentType
    const propValue = newValue === EMPTY_CONTENT_TYPE_KEY ? '' : newValue;

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
   * Renders the SPContentTypePicker controls with Office UI Fabric
   */
  public render(): JSX.Element {
    // Renders content
    return (
      <div>
        {this.props.label && <Label>{this.props.label}</Label>}
        <Dropdown
          disabled={this.props.disabled}
          label=''
          onChange={this.onChanged}
          options={this.state.results}
          selectedKey={this.state.selectedKey}
        />

        <FieldErrorMessage errorMessage={this.state.errorMessage} />
      </div>
    );
  }
}
