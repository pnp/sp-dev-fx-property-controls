import * as React from 'react';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import { Async } from 'office-ui-fabric-react/lib/Utilities';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { IPropertyFieldListMultiPickerHostProps, IPropertyFieldListMultiPickerHostState } from './IPropertyFieldListMultiPickerHost';
import { ISPList } from './IPropertyFieldListPickerHost';
import SPListPickerService from '../../services/SPListPickerService';
import FieldErrorMessage from '../errorMessage/FieldErrorMessage';
import * as telemetry from '../../common/telemetry';
import { IPropertyFieldList } from './IPropertyFieldListPicker';
import { setPropertyValue } from '../../helpers/GeneralHelper';

/**
* Renders the controls for PropertyFieldSPListMultiplePicker component
*/
export default class PropertyFieldListMultiPickerHost extends React.Component<IPropertyFieldListMultiPickerHostProps, IPropertyFieldListMultiPickerHostState> {
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
      loadedLists: {
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
    this.loadLists().then(() => { /* no-op; */ }).catch(() => { /* no-op; */ });
  }

  public componentDidUpdate(prevProps: IPropertyFieldListMultiPickerHostProps, prevState: IPropertyFieldListMultiPickerHostState): void {
    if (this.props.baseTemplate !== prevProps.baseTemplate ||
      this.props.webAbsoluteUrl !== prevProps.webAbsoluteUrl) {
      this.loadLists().then(() => { /* no-op; */ }).catch(() => { /* no-op; */ });
    }
  }

  /**
  * Loads the list from SharePoint current web site, or target site if specified by webRelativeUrl
  */
  private async loadLists(): Promise<void> {

    const {
      context,
      selectedLists
    } = this.props;

    // Builds the SharePoint List service
    const listService: SPListPickerService = new SPListPickerService(this.props, context);
    const listsToExclude: string[] = this.props.listsToExclude || [];
    let selectedListsKeys: string[] = [];
    if (selectedLists && selectedLists.length) {
      const firstItem = selectedLists[0];

      if (typeof firstItem === 'string') {
        selectedListsKeys = selectedLists as string[];

      }
      else {
        selectedListsKeys = (selectedLists as IPropertyFieldList[]).map(sl => sl.id);
      }
    }

    const options: IChoiceGroupOption[] = [];
    const selectedKeys: string[] = [];
    // Gets the libs
    const response = await listService.getLibs();
    response.value.forEach((list: ISPList) => {
      let isSelected: boolean = false;
      let indexInExisting: number = -1;
      // Defines if the current list must be selected by default
      if (selectedListsKeys) {
        indexInExisting = selectedListsKeys.indexOf(list.Id);
      }

      if (indexInExisting > -1) {
        isSelected = true;
        selectedKeys.push(list.Id);
      }

      // Add the option to the list if not inside the 'listsToExclude' array
      if (listsToExclude.indexOf(list.Title) === -1 && listsToExclude.indexOf(list.Id) === -1) {
        options.push({
          key: list.Id,
          text: list.Title,
          checked: isSelected
        });
      }
    });
    this.loaded = true;
    this.setState({
      loadedLists: response,
      results: options,
      selectedKeys: selectedKeys,
      loaded: true
    });
  }

  /**
  * Raises when a list has been selected
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
      selectedLists,
      targetProperty,
      properties,
      includeListTitleAndUrl
    } = this.props;

    const {
      loadedLists
    } = this.state;

    let propValue: string[] | IPropertyFieldList[] | undefined;

    if (!newValue || !newValue.length) {
      propValue = [];
    }
    else {
      if (includeListTitleAndUrl) {
        propValue = loadedLists.value.filter(l => newValue.indexOf(l.Id) !== -1).map(l => {
          return {
            id: l.Id,
            title: l.Title,
            url: l.RootFolder.ServerRelativeUrl
          };
        });
      }
      else {
        propValue = [...newValue];
      }
    }

    if (onPropertyChange && newValue !== null) {
      setPropertyValue(properties, targetProperty, propValue);
      onPropertyChange(targetProperty, selectedLists, propValue);
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
  * Renders the SPListMultiplePicker controls with Office UI  Fabric
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
      showSelectAll,
      selectAllInList,
      selectAllInListLabel,
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
          {
            (showSelectAll === false || selectAllInList === true) &&
            <Label>{label}</Label>
          }
          {
            showSelectAll === true &&
            <div style={{ marginBottom: '5px' }} className='ms-ChoiceField'>
              <Checkbox
                checked={selectedKeys.length === results.length}
                label={selectAllInList === true ? selectAllInListLabel : label}
                onChange={this.onSelectAllChanged}
                styles={{
                  checkbox: {
                    backgroundColor: (selectedKeys.length > 0 ? '#f4f4f4' : 'inherit'),
                    visibility: (selectAllInList === false ? 'hidden' : 'visible')
                  }
                }}
              />
            </div>
          }
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

          <FieldErrorMessage errorMessage={errorMessage} />
        </div>
      );
    }
  }
}
