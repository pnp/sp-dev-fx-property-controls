import * as React from 'react';
import { IPropertyFieldSitePickerHostProps, ISitePickerState } from './IPropertyFieldSitePickerHost';
import SPSiteSearchService from '../../services/SPSiteSearchService';
import FieldErrorMessage from '../errorMessage/FieldErrorMessage';
import * as telemetry from '../../common/telemetry';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import * as strings from 'PropertyControlStrings';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import { IPropertyFieldSite } from './IPropertyFieldSitePicker';
import { PropertyFieldSitePickerListItem } from './PropertyFieldSitePickerListItem/PropertyFieldSitePickerListItem';
import styles from './PropertyFieldSitePickerHost.module.scss';
import { initializeIcons } from '@uifabric/icons';
import { Async } from '@uifabric/utilities/lib';

export default class PropertyFieldSitePickerHost extends React.Component<IPropertyFieldSitePickerHostProps, ISitePickerState> {
  private searchService: SPSiteSearchService;
  private async: Async;

  constructor(props: IPropertyFieldSitePickerHostProps) {
    super(props);
    initializeIcons();

    telemetry.track('PropertyFieldSitePicker', {
      disabled: props.disabled
    });

    this.state = {
      isLoading: false,
      selectedSites: props.initialSites || [],
      siteSearchResults: [],
      errorMessage: null
    };

    this.async = new Async(this);

    this.searchService = new SPSiteSearchService();
  }

  private onSearchFieldChange = async (newValue?: string): Promise<void> => {
    if (newValue && newValue.length > 2) {
      this.setState({ isLoading: true });
      try {
        const sites = await this.searchService.searchSites(this.props.context, newValue);
        this.setState({ siteSearchResults: sites });
      } catch (error) {
        this.setState({ errorMessage: error });
      } finally {
        this.setState({ isLoading: false });
      }
    } else {
      this.setState({ siteSearchResults: [] });
    }
  }

  private handleCheckboxChange = (site: IPropertyFieldSite, checked: boolean): void => {
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
          placeholder={strings.SitePickerSearchBoxPlaceholder}
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
                  siteSearchResults.map((site: IPropertyFieldSite): JSX.Element =>
                    <PropertyFieldSitePickerListItem
                      key={site.url}
                      checked={selectedSites.filter(s => s.url === site.url).length > 0}
                      handleCheckboxChange={this.handleCheckboxChange}
                      site={site}
                    />
                  )
                }
              </ul>
            }
            {
              siteSearchResults.length === 0 &&
              <Label>{strings.SitePickerNoResults}</Label>
            }
          </div>
        }
        {
          selectedSites && selectedSites.length > 0 &&
          <div>
            <Label className={styles.bold}>{selectedSites.length} {strings.SitePickerSitesChosen}</Label>
            <ul className={styles.siteList}>
              {
                selectedSites.map((site: IPropertyFieldSite): JSX.Element =>
                  <PropertyFieldSitePickerListItem
                    key={site.url}
                    checked={selectedSites.filter(s => s.url === site.url).length > 0}
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
