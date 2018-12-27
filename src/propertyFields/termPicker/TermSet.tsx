import * as React from 'react';
import { Spinner, SpinnerType } from 'office-ui-fabric-react/lib/Spinner';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { ITermSetProps, ITermSetState } from './IPropertyFieldTermPickerHost';
import { ITerm, TermStorePickerServiceHelper } from '../../services/ISPTermStorePickerService';
import { EXPANDED_IMG, COLLAPSED_IMG, TERMSET_IMG } from './PropertyFieldTermPickerHost';
import Term from './Term';
import styles from './PropertyFieldTermPickerHost.module.scss';
import * as strings from 'PropertyControlStrings';
import SPTermStorePickerService from '../../services/SPTermStorePickerService';

/**
 * Term set component
 */
export default class TermSet extends React.Component<ITermSetProps, ITermSetState> {
  constructor(props: ITermSetProps) {
    super(props);

    this.state = {
      expanded: false,
      loaded: false,
      terms: []
    };

    // Check if the termset has to be automatically opened
    const selectedTermsInSet = this.props.activeNodes.filter(node => node.termSet === this.props.termset.Id);
    if (selectedTermsInSet.length > 0) {
      this._autoLoadTerms();
    }

    this._handleClick = this._handleClick.bind(this);
    this._loadTerms = this._loadTerms.bind(this);
  }

  /**
   * Autoload the terms of the term set
   */
  private _autoLoadTerms() {
    this.props.autoExpand();
    this._loadTerms(true);
  }

  /**
   * Handle the click event: collapse or expand
   */
  private _handleClick() {
    this.setState({
      expanded: !this.state.expanded
    });

    if (!this.state.expanded) {
      this._loadTerms();
    }
  }

  /**
   * Load the terms for the current term set
   */
  private async _loadTerms(autoExpand?: boolean) {
    // Check if there are already terms loaded
    if (!this.state.loaded) {
      // Receive all the terms for the current term set
      const terms: ITerm[] = await this.props.termsService.getAllTerms(this.props.termset);
      if (terms !== null) {
        this.setState({
          terms: terms,
          loaded: true,
          expanded: typeof autoExpand !== 'undefined' ? autoExpand : this.state.expanded
        });
      } else {
        this.setState({
          terms: [],
          loaded: true
        });
      }
    }
  }

  /**
   * The term set selection changed
   */
  private termSetSelectionChange = (ev: React.FormEvent<HTMLElement>, isChecked: boolean): void => {
    const { termset } = this.props;
    this.props.changedCallback({
      Id: TermStorePickerServiceHelper.cleanGuid(termset.Id),
      Name: termset.Name,
      PathOfTerm: "",
      _ObjectType_: termset._ObjectType_,
      _ObjectIdentity_: termset._ObjectIdentity_,
      Description: termset.Description,
      IsDeprecated: null,
      IsAvailableForTagging: null,
      IsRoot: null,
      TermSet: termset
    }, this.props.termGroup, isChecked);
  }

  public render(): JSX.Element {
    // Specify the inline styling to show or hide the termsets
    const styleProps: React.CSSProperties = {
      display: this.state.expanded ? 'block' : 'none'
    };

    let termElm: JSX.Element = <div />;
    // Check if the terms have been loaded
    if (this.state.expanded) {
      if (this.state.loaded) {
        if (this.state.terms.length > 0) {
          termElm = (
            <div style={styleProps}>
              {
                this.state.terms.map(term => {
                  let disabled = false;
                  if (this.props.disabledTermIds && this.props.disabledTermIds.length > 0) {
                    // Check if the current term ID exists in the disabled term IDs array
                    disabled = this.props.disabledTermIds.indexOf(term.Id) !== -1;
                  }

                  return <Term key={term.Id}
                               term={term}
                               termset={this.props.termset.Id}
                               termGroup={this.props.termGroup}
                               activeNodes={this.props.activeNodes}
                               changedCallback={this.props.changedCallback}
                               multiSelection={this.props.multiSelection}
                               disabled={disabled} />;
                })
              }
            </div>
          );
        } else {
          termElm = <div className={`${styles.listItem} ${styles.term}`}>{strings.TermPickerNoTerms}</div>;
        }
      } else {
        termElm = <Spinner type={SpinnerType.normal} />;
      }
    }

    return (
      <div>
        <div className={`${styles.listItem} ${styles.termset} ${this.props.isTermSetSelectable ? styles.termSetSelectable : ""}`} onClick={this._handleClick}>
          <img src={this.state.expanded ? EXPANDED_IMG : COLLAPSED_IMG} alt={strings.TermPickerExpandTitle} title={strings.TermPickerExpandTitle} />

          {
            // Show the termset selection box
            this.props.isTermSetSelectable &&
            <Checkbox className={styles.termSetSelector}
                      checked={this.props.activeNodes.filter(a => a.path === "" && a.termSet.indexOf(a.key) !== -1 && this.props.termset.Id.indexOf(a.key) !== -1).length >= 1}
                      onChange={this.termSetSelectionChange} />
          }

          <img src={TERMSET_IMG} alt={strings.TermPickerMenuTermSet} title={strings.TermPickerMenuTermSet} /> {this.props.termset.Name}
        </div>
        <div style={styleProps}>
          {termElm}
        </div>
      </div>
    );
  }
}
