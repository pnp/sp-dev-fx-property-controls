import * as React from 'react';
import { IPropertyFieldGroupOrPerson, PrincipalType } from './IPropertyFieldPeoplePicker';
import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { SPHttpClient, ISPHttpClientOptions, SPHttpClientResponse } from '@microsoft/sp-http';
import { EnvironmentType, Environment } from '@microsoft/sp-core-library';
import { NormalPeoplePicker, IBasePickerSuggestionsProps } from 'office-ui-fabric-react/lib/Pickers';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { IPersonaProps, PersonaPresence, PersonaInitialsColor } from 'office-ui-fabric-react/lib/Persona';
import { Async } from 'office-ui-fabric-react/lib/Utilities';
import * as strings from 'PropertyControlStrings';
import { IPropertyFieldPeoplePickerHostProps, IPeoplePickerState } from './IPropertyFieldPeoplePickerHost';
import SPPeopleSearchService from '../../services/SPPeopleSearchService';
import FieldErrorMessage from '../errorMessage/FieldErrorMessage';

/**
 * Renders the controls for PropertyFieldPeoplePicker component
 */
export default class PropertyFieldPeoplePickerHost extends React.Component<IPropertyFieldPeoplePickerHostProps, IPeoplePickerState> {
  private searchService: SPPeopleSearchService;
  private intialPersonas: Array<IPersonaProps> = new Array<IPersonaProps>();
  private resultsPeople: Array<IPropertyFieldGroupOrPerson> = new Array<IPropertyFieldGroupOrPerson>();
  private resultsPersonas: Array<IPersonaProps> = new Array<IPersonaProps>();
  private selectedPeople: Array<IPropertyFieldGroupOrPerson> = new Array<IPropertyFieldGroupOrPerson>();
  private selectedPersonas: Array<IPersonaProps> = new Array<IPersonaProps>();
  private async: Async;
  private delayedValidate: (value: IPropertyFieldGroupOrPerson[]) => void;

  /**
   * Constructor method
   */
  constructor(props: IPropertyFieldPeoplePickerHostProps) {
    super(props);

    this.searchService = new SPPeopleSearchService(props.context);
    this.onSearchFieldChanged = this.onSearchFieldChanged.bind(this);
    this.onItemChanged = this.onItemChanged.bind(this);

    this.createInitialPersonas();

    this.state = {
      resultsPeople: this.resultsPeople,
      resultsPersonas: this.resultsPersonas,
      errorMessage: ''
    };

    this.async = new Async(this);
    this.validate = this.validate.bind(this);
    this.notifyAfterValidate = this.notifyAfterValidate.bind(this);
    this.delayedValidate = this.async.debounce(this.validate, this.props.deferredValidationTime);
  }

  /**
   * Renders the PeoplePicker controls with Office UI  Fabric
   */
  public render(): JSX.Element {
    const suggestionProps: IBasePickerSuggestionsProps = {
      suggestionsHeaderText: strings.PeoplePickerSuggestedContacts,
      noResultsFoundText: strings.PeoplePickerNoResults,
      loadingText: strings.PeoplePickerLoading,
    };
    // Check which text have to be shown
    if (this.props.principalType && this.props.principalType.length > 0) {
      let userType = this.props.principalType.indexOf(PrincipalType.Users) !== -1;
      let groupType = this.props.principalType.indexOf(PrincipalType.SharePoint) !== -1 || this.props.principalType.indexOf(PrincipalType.Security) !== -1;

      // Check if both user and group are present
      if (userType && groupType) {
        suggestionProps.suggestionsHeaderText = strings.PeoplePickerSuggestedCombined;
      }

      // If only group is active
      if (!userType && groupType) {
        suggestionProps.suggestionsHeaderText = strings.PeoplePickerSuggestedGroups;
      }
    }

    // Renders content
    return (
      <div>
        <Label>{this.props.label}</Label>
        <NormalPeoplePicker
          disabled={this.props.disabled}
          pickerSuggestionsProps={suggestionProps}
          onResolveSuggestions={this.onSearchFieldChanged}
          onChange={this.onItemChanged}
          defaultSelectedItems={this.intialPersonas} />

        <FieldErrorMessage errorMessage={this.state.errorMessage} />
      </div>
    );
  }

  /**
   * A search field change occured
   */
  private onSearchFieldChanged(searchText: string, currentSelected: IPersonaProps[]): Promise<IPersonaProps[]> | IPersonaProps[] {
    if (searchText.length > 2) {
      // Clear the suggestions list
      this.setState({ resultsPeople: this.resultsPeople, resultsPersonas: this.resultsPersonas });
      // Request the search service
      const result = this.searchService.searchPeople(searchText, this.props.principalType).then((response: IPropertyFieldGroupOrPerson[]) => {
        this.resultsPeople = [];
        this.resultsPersonas = [];
        // If allowDuplicate == false, so remove duplicates from results
        if (this.props.allowDuplicate === false) {
          response = this.removeDuplicates(response);
        }
        response.map((element: IPropertyFieldGroupOrPerson, index: number) => {
          // Fill the results Array
          this.resultsPeople.push(element);
          // Transform the response in IPersonaProps object
          this.resultsPersonas.push(this.getPersonaFromPeople(element, index));
        });
        // Refresh the component's state
        this.setState({ resultsPeople: this.resultsPeople, resultsPersonas: this.resultsPersonas });
        return this.resultsPersonas;
      });
      return result;
    }
    else {
      return [];
    }
  }

  /**
   * Remove the duplicates if property allowDuplicate equals false
   */
  private removeDuplicates(responsePeople: IPropertyFieldGroupOrPerson[]): IPropertyFieldGroupOrPerson[] {
    if (this.selectedPeople === null || this.selectedPeople.length === 0) {
      return responsePeople;
    }

    const res: IPropertyFieldGroupOrPerson[] = [];
    responsePeople.map((element: IPropertyFieldGroupOrPerson) => {
      let found: boolean = false;

      for (let i: number = 0; i < this.selectedPeople.length; i++) {
        const responseItem: IPropertyFieldGroupOrPerson = this.selectedPeople[i];
        if (responseItem.login == element.login) {
          found = true;
          break;
        }
      }

      if (found === false)
        res.push(element);
    });
    return res;
  }

  /**
   * Creates the collection of initial personas from initial IPropertyFieldGroupOrPerson collection
   */
  private createInitialPersonas(): void {
    if (this.props.initialData === null || typeof (this.props.initialData) !== typeof Array<IPropertyFieldGroupOrPerson>()) {
      return;
    }

    this.props.initialData.map((element: IPropertyFieldGroupOrPerson, index: number) => {
      const persona: IPersonaProps = this.getPersonaFromPeople(element, index);
      this.intialPersonas.push(persona);
      this.selectedPersonas.push(persona);
      this.selectedPeople.push(element);
    });
  }

  /**
   * Generates a IPersonaProps object from a IPropertyFieldGroupOrPerson object
   */
  private getPersonaFromPeople(element: IPropertyFieldGroupOrPerson, index: number): IPersonaProps {
    return {
      primaryText: element.fullName, secondaryText: element.jobTitle, imageUrl: element.imageUrl,
      imageInitials: element.initials, presence: PersonaPresence.none, initialsColor: this.getRandomInitialsColor(index)
    };
  }


  /**
   * Refreshes the web part properties
   */
  private refreshWebPartProperties(): void {
    this.delayedValidate(this.selectedPeople);
  }

  /**
  * Validates the new custom field value
  */
  private validate(value: IPropertyFieldGroupOrPerson[]): void {
    if (this.props.onGetErrorMessage === null || this.props.onGetErrorMessage === undefined) {
      this.notifyAfterValidate(this.props.initialData, value);
      return;
    }

    const result: string | PromiseLike<string> = this.props.onGetErrorMessage(value || []);
    if (typeof result === 'undefined') {
      if (typeof result === 'string') {
        if (result === '') {
          this.notifyAfterValidate(this.props.initialData, value);
          this.setState({
            errorMessage: result
          });
        }
      }
      else {
        result.then((errorMessage: string) => {
          if (errorMessage === undefined || errorMessage === '')
            this.notifyAfterValidate(this.props.initialData, value);
          this.setState({
            errorMessage: errorMessage
          });
        });
      }
    } else {
      this.notifyAfterValidate(this.props.initialData, value);
    }
  }

  /**
   * Notifies the parent Web Part of a property value change
   */
  private notifyAfterValidate(oldValue: IPropertyFieldGroupOrPerson[], newValue: IPropertyFieldGroupOrPerson[]) {
    if (this.props.onPropertyChange && newValue != null) {
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
   * Event raises when the user changed people from the PeoplePicker component
   */
  private onItemChanged(selectedItems: IPersonaProps[]): void {
    if (selectedItems.length > 0) {
      if (selectedItems.length > this.selectedPersonas.length) {
        const index: number = this.resultsPersonas.indexOf(selectedItems[selectedItems.length - 1]);
        if (index > -1) {
          const people: IPropertyFieldGroupOrPerson = this.resultsPeople[index];
          this.selectedPeople.push(people);
          this.selectedPersonas.push(this.resultsPersonas[index]);
          this.refreshWebPartProperties();
        }
      } else {
        this.selectedPersonas.map((person, index2) => {
          const selectedItemIndex: number = selectedItems.indexOf(person);
          if (selectedItemIndex === -1) {
            this.selectedPersonas.splice(index2, 1);
            this.selectedPeople.splice(index2, 1);
          }
        });
      }

    } else {
      this.selectedPersonas.splice(0, this.selectedPersonas.length);
      this.selectedPeople.splice(0, this.selectedPeople.length);
    }

    this.refreshWebPartProperties();
  }

  /**
   * Generate a PersonaInitialsColor from the item position in the collection
   */
  private getRandomInitialsColor(index: number): PersonaInitialsColor {
    const num: number = index % 13;
    switch (num) {
      case 0: return PersonaInitialsColor.blue;
      case 1: return PersonaInitialsColor.darkBlue;
      case 2: return PersonaInitialsColor.teal;
      case 3: return PersonaInitialsColor.lightGreen;
      case 4: return PersonaInitialsColor.green;
      case 5: return PersonaInitialsColor.darkGreen;
      case 6: return PersonaInitialsColor.lightPink;
      case 7: return PersonaInitialsColor.pink;
      case 8: return PersonaInitialsColor.magenta;
      case 9: return PersonaInitialsColor.purple;
      case 10: return PersonaInitialsColor.black;
      case 11: return PersonaInitialsColor.orange;
      case 12: return PersonaInitialsColor.red;
      case 13: return PersonaInitialsColor.darkRed;
      default: return PersonaInitialsColor.blue;
    }
  }
}
