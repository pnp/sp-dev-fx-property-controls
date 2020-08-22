import * as React from 'react';
import { SharedColors } from '@uifabric/fluent-theme/lib/fluent/FluentColors';
import { Async } from 'office-ui-fabric-react/lib/Utilities';
import { Checkbox, Spinner, SearchBox, ICheckboxProps, Stack } from 'office-ui-fabric-react';
import { Accordion } from '@uifabric/experiments/lib/Accordion';
import { IPropertyFieldSitePlus } from './IPropertyFieldSitePickerPlus';
import { IPropertyFieldSitePickerPlusHostProps, ISitePickerPlusState } from './IPropertyFieldSitePickerPlusHost';
import styles from './styles.module.scss';
import SiteSearch from './services/siteSearch.service';

/**
 * Renders the controls for PropertyFieldSitePickerPlus component
 */
export default class PropertyFieldSitePickerPlusHost extends React.Component<IPropertyFieldSitePickerPlusHostProps, ISitePickerPlusState> {
  private searchService: SiteSearch;
  private searchResults: Array<IPropertyFieldSitePlus> = new Array<IPropertyFieldSitePlus>();
  private async: Async;
  private delayedValidate: (value: IPropertyFieldSitePlus[]) => void;

  /**
   * Constructor method
   */
  constructor(props: IPropertyFieldSitePickerPlusHostProps) {
    super(props);

    this.searchService = new SiteSearch();
    this.onSearchFieldChanged = this.onSearchFieldChanged.bind(this);
    this.onItemChanged = this.onItemChanged.bind(this);
    this.state = {      
      searching: false,
      selecting: false,
      searchResults: this.searchResults,
      selectedSites: this.props.selectedSites,
      errorMessage: undefined
    };

    this.async = new Async(this);
    this.validate = this.validate.bind(this);
    this.notifyAfterValidate = this.notifyAfterValidate.bind(this);
    this.delayedValidate = this.async.debounce(this.validate, this.props.deferredValidationTime);    
  }

  /**
   * Called when the component will unmount
   */
  public componentWillUnmount() {
    this.async.dispose();
  }

  public render(): JSX.Element {
    const { selectedSites } = this.state;
    const renderLabelWithIcon = (props:ICheckboxProps, defaultRender:any):JSX.Element => {
      const imageUrl = props["data-site-logo-url"];
      const siteUrl = props["data-site-url"];

      const logo = imageUrl === null 
        ? <div className={`${styles.bannerImage} ${styles.acronym}`} aria-hidden="true" role="presentation" style={{ backgroundColor: this.getAcronymBGColor(props.label) }} title={siteUrl}>{this.getAcronym(props.label)}</div>
        : <img className={`${styles.bannerImage} ${styles.image}`} aria-hidden="true" role="presentation" title={siteUrl} src={imageUrl}/>;
        
      return (
        <div style={{ marginLeft: 10, display: "flex", alignItems: "center", cursor: "pointer", overflow: "hidden" }}>  
          { logo }        
          <div title={siteUrl} className={styles.logoText}>{ props.label }</div>
        </div>
      );
    };
    
    let components: JSX.Element;            
    if(this.state.searching){
      components = <Spinner />;
    }
    else if(this.state.selecting){
      components = this.searchResults.length === 0 
      ? <div>No sites match your search. Try a different search word.</div> 
      : ( 
          <Stack gap={10} style={{paddingLeft: 25, marginTop:15 }}>        
            {
              this.searchResults.map((site, index) => {
                return (
                  <Stack.Item>
                    <Checkbox id={`${index}`} label={site.Title} onChange={this.onItemChanged.bind(this, site)} defaultChecked={ site.Selected } data-site-url={site.Url} data-site-logo-url={site.IconUrl} onRenderLabel={renderLabelWithIcon}/>
                  </Stack.Item>
                );
              })
            }
          </Stack>
        );
    }
    else if(this.state.errorMessage !== undefined){
      components = <div className={'ms-TextField-errorMessage ms-u-slideDownIn20'}>Error while loading sites: {this.state.errorMessage}</div>;  
    }
    else{
      components = (
        <Accordion>      
          <Accordion.Item title={ { text: `${selectedSites.length} site${ selectedSites.length !== 1 ? 's':'' } selected`, styles:{ text:{fontWeight:"bold", fontSize:14} }}} styles={ { root:{ paddingTop:6, paddingBottom:6 }, body:{ fontWeight:"bold !important"} } } >
            <Stack gap={10} style={{paddingLeft: 25 }}>
              {
                selectedSites.map((site) => {
                  return <Stack.Item><Checkbox label={site.Title} onChange={this.onItemChanged.bind(this, site)} defaultChecked data-site-logo-url={site.IconUrl} data-site-url={site.Url} onRenderLabel={renderLabelWithIcon}/></Stack.Item>;
                })
              }
            </Stack>
          </Accordion.Item>
        </Accordion>
      );
    }
                                
    return (
      <div>
        <SearchBox placeholder="Enter a site name" onChanged={this.async.debounce(this.onSearchFieldChanged, 500)} onClear={this.onSearchFieldCleared.bind(this)} styles={{ root:{ marginTop:10 }} } />
        <div>
          {components}
        </div>
      </div>
    );
  }

  private getAcronym(name:string):string{
    const words:string[] = name.split(/[\W_]/gm).filter((s) => { return s ? true : false; });
    let acronym = "";
    switch(words.length){
      case 0:
        acronym = "NA";
        break;  
      case 1:
        acronym = `${words[0][0]}${words[0][1]}`.toUpperCase();
        break;
      default:
        acronym = `${words[0][0]}${words[1][0]}`.toUpperCase();
        break;
    }
    return acronym;
  }

  private getAcronymBGColor(text: string): string {
    const colors = [SharedColors.pinkRed10, SharedColors.red20, SharedColors.red10, SharedColors.orange20, SharedColors.orangeYellow20, SharedColors.green10, SharedColors.green20, SharedColors.cyan20, SharedColors.cyan30, SharedColors.cyanBlue10, SharedColors.cyanBlue20, SharedColors.blue10, SharedColors.blueMagenta30, SharedColors.blueMagenta20, SharedColors.magenta10, SharedColors.magenta20, SharedColors.magentaPink10, SharedColors.orange30];
    let code = 0; 
    for(let i = 0; i < text.length; i++){
      code += text.charCodeAt(0);
    }
    return colors[code % colors.length];
  }
  /**
   * A search field change occured
   */
  private onSearchFieldChanged(searchText: string): Promise<IPropertyFieldSitePlus[]> | IPropertyFieldSitePlus[] {
    if (searchText.length > 2) {
      // Clear the suggestions list
      this.setState({ searchResults: this.searchResults, searching: true });

      // Request the search service
      const result = this.searchService.search(this.props.context, searchText).then((response: IPropertyFieldSitePlus[]) => {
        this.searchResults = [];

        response.forEach((element: IPropertyFieldSitePlus, index: number) => {
          if(this._findSelectedIndex(element) > -1){
            element.Selected = true;
          }
          this.searchResults.push(element);
        });
        // Refresh the component's state
        this.setState({ searchResults: this.searchResults, searching: false, selecting: true });
        return this.searchResults;
      });
      return result;
    } else {
      return [];
    }
  }

  private onSearchFieldCleared(ev): void{    
    this.setState({ selecting: false });
    this.refreshWebPartProperties();
  }

  /**
   * Event raises when the user changed site from the SitePickerPlus component
   */
  private onItemChanged(site: IPropertyFieldSitePlus, element: any, checked:boolean): void {
    let { selectedSites } = this.state;
    site.Selected = checked;
    if (site.Selected) {      
      selectedSites.push(site);            
    }
    else {
      selectedSites = selectedSites.filter((i) => { return i.Url !== site.Url; });      
    } 
    this.setState({ selectedSites: selectedSites});
    this.props.onPropertyChange(this.props.targetProperty, selectedSites);    
  }
  
  /**
   * Refreshes the web part properties
   */
  private refreshWebPartProperties(): void {
    this.delayedValidate(this.state.selectedSites);
  }

  /**
  * Validates the new custom field value
  */
  private validate(value: IPropertyFieldSitePlus[]): void {
    if (this.props.onGetErrorMessage === null || this.props.onGetErrorMessage === undefined) {
      this.notifyAfterValidate(this.props.initialData, value);
      return;
    }

    const errResult: string | PromiseLike<string> = this.props.onGetErrorMessage(value || []);
    if (errResult) {
      if (typeof errResult === 'string') {
        if (errResult === '') {
          this.notifyAfterValidate(this.props.initialData, value);
        }
        this.setState({
          errorMessage: errResult
        });
      } else {
        errResult.then((errorMessage: string) => {
          if (!errorMessage) {
            this.notifyAfterValidate(this.props.initialData, value);
          }
          this.setState({
            errorMessage: errorMessage
          });
        });
      }
    } else {
      this.notifyAfterValidate(this.props.initialData, value);
      this.setState({
        errorMessage: null
      });
    }
  }

  /**
   * Notifies the parent Web Part of a property value change
   */
  private notifyAfterValidate(oldValue: IPropertyFieldSitePlus[], newValue: IPropertyFieldSitePlus[]) {
    if (this.props.onPropertyChange && newValue) {
      this.props.properties[this.props.targetProperty] = newValue;
      this.props.onPropertyChange(this.props.targetProperty, newValue);
      // Trigger the apply button
      if (typeof this.props.onChange !== 'undefined' && this.props.onChange !== null) {
        this.props.onChange(this.props.targetProperty, newValue);
      }
    }
  }

  /**
   * Find the index of the selected person
   * @param selectedItem
   */
  private _findSelectedIndex(selectedItem: IPropertyFieldSitePlus): number {
    const selectedSites = this.state.selectedSites;
    for (let i = 0; i < selectedSites.length; i++) {
      const crntSite = selectedSites[i];
      if (crntSite.Title === selectedItem.Title && crntSite.Url === selectedItem.Url) {
        return i;
      }
    }
    return -1;
  }
}