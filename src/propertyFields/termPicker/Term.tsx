import * as React from 'react';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { ITermProps, ITermState } from './IPropertyFieldTermPickerHost';

import styles from './PropertyFieldTermPickerHost.module.scss';
import * as strings from 'PropertyControlStrings';
import { TERM_IMG } from './PropertyFieldTermPickerHost';


/**
 * Term component
 * Renders a selectable term
 */
export default class Term extends React.Component<ITermProps, ITermState> {
  constructor(props: ITermProps) {
    super(props);

    // Check if current term is selected
    const active = this.props.activeNodes.filter(item => item.key === this.props.term.Id);

    this.state = {
      selected: active.length > 0
    };

    this._handleChange = this._handleChange.bind(this);
  }

  /**
   * Handle the checkbox change trigger
   */
  private _handleChange(ev: React.FormEvent<HTMLElement>, isChecked: boolean): void {
    this.setState({
      selected: isChecked
    });
    this.props.changedCallback(this.props.term, this.props.termGroup, isChecked);
  }

  /**
   * Lifecycle event hook when component retrieves new properties
   * @param nextProps
   */
  public UNSAFE_componentWillReceiveProps(nextProps: ITermProps): void {
    // If multi-selection is turned off, only a single term can be selected
    if (!this.props.multiSelection) {
      const active = nextProps.activeNodes.filter(item => item.key === this.props.term.Id);
      this.setState({
        selected: active.length > 0
      });
    }
  }

  /**
   * Get the right class name for the term
   */
  private getClassName(): string {
    if (this.props.term.IsDeprecated) {
      return styles.termDisabled;
    }

    if (!this.props.term.IsAvailableForTagging) {
      return styles.termNoTagging;
    }

    return styles.termEnabled;
  }


  public render(): JSX.Element {
    const styleProps: React.CSSProperties = {
      marginLeft: `${(this.props.term.PathDepth * 30)}px`
    };

    return (
      <div className={`${styles.listItem} ${styles.term}`} style={styleProps}>
        {
          this.props.isTermSelectable ?
          <Checkbox
            checked={this.state.selected}
            disabled={this.props.term.IsDeprecated || !this.props.term.IsAvailableForTagging || this.props.disabled}
            className={this.getClassName()}
            label={this.props.term.Name}
            onChange={this._handleChange} /> :
          (<div>
            <img src={TERM_IMG} alt={strings.TermPickerMenuTerm} title={strings.TermPickerMenuTerm} /> {this.props.term.Name}
          </div>)
        }
      </div>
    );
  }
}
