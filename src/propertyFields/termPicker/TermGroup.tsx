import * as React from 'react';
import { ITermGroupProps, ITermGroupState } from './IPropertyFieldTermPickerHost';
import { GROUP_IMG, EXPANDED_IMG, COLLAPSED_IMG } from './PropertyFieldTermPickerHost';
import TermSet from './TermSet';

import styles from './PropertyFieldTermPickerHost.module.scss';
import * as strings from 'PropertyControlStrings';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';

/**
 * Term group component
 */
export default class TermGroup extends React.Component<ITermGroupProps, ITermGroupState> {
  constructor(props: ITermGroupProps) {
    super(props);

    this.state = {
      expanded: false,
      loaded: !!(props.group.TermSets && props.group.TermSets._Child_Items_)
    };

    // Check if the term group has to be automatically opened
    const selectedTermsInGroup = this.props.activeNodes.filter(node => node.termGroup === this.props.group.Id);
    if (selectedTermsInGroup.length > 0) {
      this._loadTermSets(true).then(() => { /* no-op; */ }).catch(() => { /* no-op; */ });
    }

    this._handleClick = this._handleClick.bind(this);
    this._autoExpand = this._autoExpand.bind(this);
  }

  /**
   * Handle the click event: collapse or expand
   */
  private _handleClick(): void {
    const isExpanded: boolean = this.state.expanded; // current state

    this.setState({
      expanded: !isExpanded
    });

    if (!isExpanded) {
      this._loadTermSets().then(() => { /* no-op; */ }).catch(() => { /* no-op; */ });
    }
  }

  /**
   * Function to auto expand the termset
   */
  private _autoExpand(): void {
    this.setState({
      expanded: true
    });
  }

  private async _loadTermSets(autoExpand?: boolean): Promise<void> {
    if (this.state.loaded) {
      return;
    }

    const termSets = await this.props.termsService.getGroupTermSets(this.props.group);

    //
    // NOTE: the next line is kinda incorrect from React perspective as we're modifying props.
    // But it is done to avoid redux usage or reimplementing the whole logic
    // 
    this.props.group.TermSets = termSets;
    this.setState({
      loaded: true,
      expanded: typeof autoExpand !== 'undefined' ? autoExpand : this.state.expanded
    });
  }

  public render(): JSX.Element {
    // Specify the inline styling to show or hide the termsets
    const styleProps: React.CSSProperties = {
      display: this.state.expanded ? 'block' : 'none'
    };

    return (
      <div>
        <div className={`${styles.listItem}`} onClick={this._handleClick}>
          <img src={this.state.expanded ? EXPANDED_IMG : COLLAPSED_IMG} alt={strings.TermPickerExpandNode} title={strings.TermPickerExpandNode} />
          <img src={GROUP_IMG} title={strings.TermPickerMenuGroup} alt={strings.TermPickerMenuGroup} /> {this.props.group.Name}
        </div>
        <div style={styleProps}>
          {
            this.state.loaded ? this.props.group.TermSets._Child_Items_.map(termset => {
              return <TermSet key={termset.Id}
                termset={termset}
                termGroup={this.props.group.Id}
                termstore={this.props.termstore}
                termsService={this.props.termsService}
                autoExpand={this._autoExpand}
                activeNodes={this.props.activeNodes}
                changedCallback={this.props.changedCallback}
                multiSelection={this.props.multiSelection}
                isTermSetSelectable={this.props.isTermSetSelectable}
                areTermsSelectable={this.props.areTermsSelectable}
                areTermsHidden={this.props.areTermsHidden}
                disabledTermIds={this.props.disabledTermIds} />;
            }) : <Spinner size={SpinnerSize.medium} />
          }
        </div>
      </div>
    );
  }
}
