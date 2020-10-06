import * as React from 'react';
import { IPropertyFieldTeamPickerHostProps, ITeamPickerState } from './IPropertyFieldTeamPickerHost';
import TeamsSearchService from '../../services/TeamsSearchService';
import FieldErrorMessage from '../errorMessage/FieldErrorMessage';
import * as telemetry from '../../common/telemetry';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import * as strings from 'PropertyControlStrings';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import { IPropertyFieldTeam } from './IPropertyFieldTeamPicker';
import { PropertyFieldTeamPickerListItem } from './PropertyFieldTeamPickerListItem/PropertyFieldSitePickerListItem';
import styles from './PropertyFieldTeamPickerHost.module.scss';
import { initializeIcons } from '@uifabric/icons';
import { Async } from '@uifabric/utilities/lib';

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
      selectedSites: props.initialSites || [],
      siteSearchResults: [],
      errorMessage: null
    };

    this.async = new Async(this);

    this.teamsService = new TeamsSearchService();
  }

  private onSearchFieldChange = async (newValue?: string): Promise<void> => {
    if (newValue && newValue.length > 2) {
      this.setState({ isLoading: true });
      try {
        const sites = await this.teamsService.searchTeams(this.props.context, newValue);
        this.setState({ siteSearchResults: sites });
      } catch (error) {
        this.setState({ errorMessage: error.message });
      } finally {
        this.setState({ isLoading: false });
      }
    } else {
      this.setState({ siteSearchResults: [] });
    }
  }

  private handleCheckboxChange = (site: IPropertyFieldTeam, checked: boolean): void => {
    let selectedSites = [...this.state.selectedSites];
    if (checked) {
      if (this.props.multiSelect) {
        selectedSites.push(site);
      } else {
        selectedSites = [site];
      }
    } else {
      if (this.props.multiSelect) {
        selectedSites.splice(selectedSites.indexOf(site), 1);
      } else {
        selectedSites = [];
      }
    }

    this.props.onPropertyChange(this.props.targetProperty, this.state.selectedSites, selectedSites);
    // Trigger the apply button
    if (typeof this.props.onChange !== 'undefined' && this.props.onChange !== null) {
      this.props.onChange(this.props.targetProperty, selectedSites);
    }

    this.setState({ selectedSites });
  }

  public render(): JSX.Element {
    const { isLoading, siteSearchResults, selectedSites } = this.state;

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
          !isLoading && siteSearchResults &&
          <div>
            {
              siteSearchResults.length > 0 &&
              <ul className={styles.siteList}>
                {
                  siteSearchResults.map((site: IPropertyFieldTeam): JSX.Element =>
                    <PropertyFieldTeamPickerListItem
                      key={site.id}
                      checked={selectedSites.filter(s => s.id === site.id).length > 0}
                      handleCheckboxChange={this.handleCheckboxChange}
                      site={site}
                    />
                  )
                }
              </ul>
            }
            {
              siteSearchResults.length === 0 &&
              <Label>{strings.TeamPickerNoResults}</Label>
            }
          </div>
        }
        {
          selectedSites && selectedSites.length > 0 &&
          <div>
            <Label className={styles.bold}>{selectedSites.length} {strings.TeamPickerSitesChosen}</Label>
            <ul className={styles.siteList}>
              {
                selectedSites.map((site: IPropertyFieldTeam): JSX.Element =>
                  <PropertyFieldTeamPickerListItem
                    key={site.id}
                    checked={selectedSites.filter(s => s.id === site.id).length > 0}
                    handleCheckboxChange={this.handleCheckboxChange}
                    site={site}
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
