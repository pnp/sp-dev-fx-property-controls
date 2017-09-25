import * as React from 'react';
import { Spinner, SpinnerType } from 'office-ui-fabric-react/lib/Spinner';
import { ITermSetProps, ITermSetState } from './IPropertyFieldTermPickerHost';
import { ITerm } from '../../services/ISPTermStorePickerService';
import { EXPANDED_IMG, COLLAPSED_IMG, TERMSET_IMG } from './PropertyFieldTermPickerHost';
import Term from './Term';

import styles from './PropertyFieldTermPickerHost.module.scss';

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
      const terms: ITerm[] = await this.props.termsService.getAllTerms(this.props.termset._ObjectIdentity_);
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
                  return <Term key={term.Id} term={term} termset={this.props.termset.Id} activeNodes={this.props.activeNodes} changedCallback={this.props.changedCallback} multiSelection={this.props.multiSelection} />;
                })
              }
            </div>
          );
        } else {
          termElm = <div className={`${styles.listItem} ${styles.term}`}>Term set does not contain any terms</div>;
        }
      } else {
        termElm = <Spinner type={SpinnerType.normal} />;
      }
    }

    return (
      <div>
        <div className={`${styles.listItem} ${styles.termset}`} onClick={this._handleClick}>
          <img src={this.state.expanded ? EXPANDED_IMG : COLLAPSED_IMG} alt='Expand This Term Set' title='Expand This Term Set' />
          <img src={TERMSET_IMG} title='Menu for Term Set' alt='Menu for Term Set' /> {this.props.termset.Name}
        </div>
        <div style={styleProps}>
          {termElm}
        </div>
      </div>
    );
  }
}
