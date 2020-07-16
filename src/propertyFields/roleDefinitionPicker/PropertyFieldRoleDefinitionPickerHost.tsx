import * as React from 'react';
import { Dropdown, IDropdownOption } from "office-ui-fabric-react/lib/Dropdown";
import { Async } from 'office-ui-fabric-react/lib/Utilities';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { IPropertyFieldRoleDefinitionPickerHostProps, IPropertyFieldRoleDefinitionPickerHostState } from './IPropertyFieldRoleDefinitionPickerHost';
import { SPRoleDefinitionPickerService } from '../../services/SPRoleDefinitionPickerService';
import FieldErrorMessage from '../errorMessage/FieldErrorMessage';
import { IRoleDefinitionInformation } from '.';
import { IRoleDefinitionInformationCollection } from './IRoleDefinitionInformationCollection';
import * as telemetry from '../../common/telemetry';

/**
 * Renders the controls for PropertyFieldRoleDefinitionPicker component
 */
export default class PropertyFieldRoleDefinitionPickerHost extends React.Component<IPropertyFieldRoleDefinitionPickerHostProps, IPropertyFieldRoleDefinitionPickerHostState> {

  private options: IDropdownOption[] = [];
  private selectedOptions: any[] = [];
  private async: Async;
  private resultsRoleDefinition: Array<IRoleDefinitionInformation> = new Array<IRoleDefinitionInformation>();

  /**
   * Constructor method
   */
  constructor(props: IPropertyFieldRoleDefinitionPickerHostProps) {
    super(props);

    telemetry.track('PropertyFieldRoleDefinitionPicker', {
      disabled: props.disabled
    });

    this.state = {
      results: this.options,
      errorMessage: '',
      loading: false
    };

    this.async = new Async(this);

    this.onChanged = this.onChanged.bind(this);

  }

  public componentDidMount(): void {
    // Start retrieving the list role definitions
    this.loadRoleDefinitions();
  }

  public componentDidUpdate(prevProps: IPropertyFieldRoleDefinitionPickerHostProps, _prevState: IPropertyFieldRoleDefinitionPickerHostState): void {
    if (this.props.webAbsoluteUrl !== prevProps.webAbsoluteUrl) {
      this.loadRoleDefinitions();
    }
  }

  /**
   * Loads the role definitions from a SharePoint web
   */
  private loadRoleDefinitions(): void {

    this.options = [];
    this.selectedOptions = [];

    const roleDefinitionService: SPRoleDefinitionPickerService = new SPRoleDefinitionPickerService(this.props, this.props.context);
    const roleDefinitionsToExclude: string[] = this.props.roleDefinitionsToExclude ? this.props.roleDefinitionsToExclude : [];
    let selectedRoleDefinitions: string[] = this.props.selectedRoleDefinition ? this.props.selectedRoleDefinition : [];

    if (this.props.roleDefinitions && this.props.roleDefinitions.length > 0) {
      this.props.roleDefinitions.forEach(i => {
        if (selectedRoleDefinitions.indexOf(i.Name) === -1) {
          selectedRoleDefinitions.push(i.Name);
        }
      });
    }

    roleDefinitionService.getRoleDefinitions().then((response: IRoleDefinitionInformationCollection) => {

      // Start mapping the roleDefinitions that are selected
      response.value.forEach((roleDefinition: IRoleDefinitionInformation) => {

        if (roleDefinitionsToExclude.indexOf(roleDefinition.Name) === -1) {
          this.options.push({
            key: roleDefinition.Id,
            text: roleDefinition.Name,
            selected: selectedRoleDefinitions.indexOf(roleDefinition.Name) >= 0 ? true : false
          });
          this.resultsRoleDefinition.push(roleDefinition);
        }
      });

      this.selectedOptions = this.options.filter(o => o.selected === true);
      let selectedRoleDefinitionInformation: IRoleDefinitionInformation[] = [];
      this.resultsRoleDefinition.forEach(value => {
        this.selectedOptions.forEach(i => {
          if (value.Id === i.key) {
            selectedRoleDefinitionInformation.push(value);
          }
        });
      });

      if(this.props.multiSelect === true){
        this.props.properties[this.props.targetProperty] = selectedRoleDefinitionInformation;
      }
      else{
        this.props.properties[this.props.targetProperty] = selectedRoleDefinitionInformation[0];
      }
      

      // Update the current component state
      this.setState({
        results: this.options,        
        roleDefinitionInformationResult: this.resultsRoleDefinition
      });
    }).catch(error => {
      this.setState({
        errorMessage: JSON.stringify(error),
        loading: false
      });
    });
  }

  /**
   * Raises when a role definition has been selected
   */
  private onChanged(option: IDropdownOption, _index?: number): void {

    let selectedRoleDefinitionInformation: IRoleDefinitionInformation[] = [];

    if(this.props.multiSelect){
      if (option && option.selected) {
        this.selectedOptions.push({
          key: option.key,
          text: option.text,
          selected: option.selected
        });
      } else {
        this.selectedOptions = this.selectedOptions.filter(o => o.key !== option.key);
      }
  
      this.state.roleDefinitionInformationResult.forEach(value => {
        this.selectedOptions.forEach(i => {
          if (value.Id === i.key) {
            selectedRoleDefinitionInformation.push(value);
          }
        });
      });
    }
    else{
      this.selectedOptions.push({
        key: option.key,
        text: option.text
      });

      this.selectedOptions = this.selectedOptions.filter(o => o.key === option.key);
      
      selectedRoleDefinitionInformation = this.state.roleDefinitionInformationResult.filter(i => i.Id === this.selectedOptions[0].key);

    }


    this.props.onPropertyChange(this.props.targetProperty, this.props.roleDefinitions, selectedRoleDefinitionInformation);

    if (typeof this.props.onChange !== 'undefined' && this.props.onChange !== null) {
      this.props.onChange(this.props.targetProperty, selectedRoleDefinitionInformation);
    }

    this.setState({
      results: this.options,      
    });

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
   * Renders the SPRoleDefinitionPicker controls with Office UI Fabric
   */
  public render(): JSX.Element {
    // Renders content
    let multiSelectAllowed = true;
    if(this.props.multiSelect !== undefined){
      multiSelectAllowed = this.props.multiSelect;
    }
    return (
      <div>
        {this.props.label && <Label>{this.props.label}</Label>}
        {multiSelectAllowed &&
          <Dropdown options={this.state.results}
            onChanged={this.onChanged}
            multiSelect={true}
            selectedKeys={this.selectedOptions.map(item => item.key) || []}
            key={this.props.key}
            disabled={this.props.disabled || false} />
        }
        {!multiSelectAllowed &&
          <Dropdown options={this.state.results}
            onChanged={this.onChanged}
            multiSelect={false}
            selectedKey={this.selectedOptions.map(item => item.key) || []}
            key={this.props.key}
            disabled={this.props.disabled || false} />
        }
        <FieldErrorMessage errorMessage={this.state.errorMessage} />
      </div>
    );
  }
}
