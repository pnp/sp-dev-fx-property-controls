import * as React from "react";

import { Label } from "@fluentui/react/lib/Label";
import { SearchBox } from "@fluentui/react/lib/SearchBox";
import {
  Spinner,
  SpinnerSize
} from "@fluentui/react/lib/Spinner";
import * as strings from "PropertyControlStrings";

import { initializeIcons } from "@uifabric/icons";
import { Async } from "@fluentui/react/lib/Utilities";

import * as telemetry from "../../common/telemetry";
import TeamsSearchService from "../../services/TeamsSearchService";
import FieldErrorMessage from "../errorMessage/FieldErrorMessage";
import { IPropertyFieldTeam } from "./IPropertyFieldTeamPicker";
import {
  IPropertyFieldTeamPickerHostProps,
  ITeamPickerState
} from "./IPropertyFieldTeamPickerHost";
import styles from "./PropertyFieldTeamPickerHost.module.scss";
import {
  PropertyFieldTeamPickerListItem
} from "./PropertyFieldTeamPickerListItem/PropertyFieldTeamPickerListItem";

export default class PropertyFieldTeamPickerHost extends React.Component<IPropertyFieldTeamPickerHostProps, ITeamPickerState> {
  private teamsService: TeamsSearchService;
  private async: Async;

  constructor(props: IPropertyFieldTeamPickerHostProps) {
    super(props);
    initializeIcons();

    telemetry.track('PropertyFieldTeamPicker', {
      disabled: props.disabled
    });

    this.state = {
      isLoading: false,
      selectedTeams: props.initialTeams || [],
      teamSearchResults: [],
      errorMessage: null
    };

    this.async = new Async(this);

    this.teamsService = new TeamsSearchService();
  }

  private onSearchFieldChange = async (newValue?: string): Promise<void> => {
    if (newValue && newValue.length > 2) {
      this.setState({ isLoading: true });
      try {
        const teams = await this.teamsService.searchTeams(this.props.context, newValue);
        this.setState({ teamSearchResults: teams });
      } catch (error) {
        this.setState({ errorMessage: error.message });
      } finally {
        this.setState({ isLoading: false });
      }
    } else {
      this.setState({ teamSearchResults: [] });
    }
  }

  private handleCheckboxChange = (team: IPropertyFieldTeam, checked: boolean): void => {
    let selectedTeams = [...this.state.selectedTeams];
    if (checked) {
      if (this.props.multiSelect) {
        selectedTeams.push(team);
      } else {
        selectedTeams = [team];
      }
    } else {
      if (this.props.multiSelect) {
        selectedTeams.splice(selectedTeams.indexOf(team), 1);
      } else {
        selectedTeams = [];
      }
    }

    this.props.onPropertyChange(this.props.targetProperty, this.state.selectedTeams, selectedTeams);
    // Trigger the apply button
    if (typeof this.props.onChange !== 'undefined' && this.props.onChange !== null) {
      this.props.onChange(this.props.targetProperty, selectedTeams);
    }

    this.setState({ selectedTeams });
  }

  /**
   * componentWillUnmount lifecycle hook
   */
  public componentWillUnmount(): void {
    this.async.dispose();
  }

  public render(): JSX.Element {
    const { isLoading, teamSearchResults, selectedTeams } = this.state;

    return (
      <div>
        {this.props.label && <Label>{this.props.label}</Label>}
        <SearchBox
          placeholder={strings.TeamPickerSearchBoxPlaceholder}
          onChanged={this.async.debounce(this.onSearchFieldChange, this.props.deferredValidationTime)}
        />
        {
          isLoading &&
          <Spinner size={SpinnerSize.medium} />
        }
        {
          !isLoading && teamSearchResults &&
          <div>
            {
              teamSearchResults.length > 0 &&
              <ul className={styles.siteList}>
                {
                  teamSearchResults.map((team: IPropertyFieldTeam): JSX.Element =>
                    <PropertyFieldTeamPickerListItem
                      key={team.id}
                      checked={selectedTeams.filter(s => s.id === team.id).length > 0}
                      handleCheckboxChange={this.handleCheckboxChange}
                      team={team}
                    />
                  )
                }
              </ul>
            }
            {
              teamSearchResults.length === 0 &&
              <Label>{strings.TeamPickerNoResults}</Label>
            }
          </div>
        }
        {
          selectedTeams && selectedTeams.length > 0 &&
          <div>
            <Label className={styles.bold}>{selectedTeams.length} {strings.TeamPickerSitesChosen}</Label>
            <ul className={styles.siteList}>
              {
                selectedTeams.map((team: IPropertyFieldTeam): JSX.Element =>
                  <PropertyFieldTeamPickerListItem
                    key={team.id}
                    checked={selectedTeams.filter(s => s.id === team.id).length > 0}
                    handleCheckboxChange={this.handleCheckboxChange}
                    team={team}
                  />
                )
              }
            </ul>
          </div>
        }

        <FieldErrorMessage errorMessage={this.state.errorMessage} />
      </div>
    );
  }
}
