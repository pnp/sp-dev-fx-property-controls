import * as React from 'react';
import { BasePicker, IBasePickerProps, IPickerItemProps } from 'office-ui-fabric-react/lib/Pickers';
import { IPickerTerm, IPickerTerms } from './IPropertyFieldTermPicker';
import styles from './PropertyFieldTermPickerHost.module.scss';
import { IPropertyFieldTermPickerHostProps } from './IPropertyFieldTermPickerHost';
import { BaseComponentContext } from '@microsoft/sp-component-base';
import * as strings from 'PropertyControlStrings';
import { ISPTermStorePickerService, TermStorePickerServiceHelper } from '../../services/ISPTermStorePickerService';

export class TermBasePicker extends BasePicker<IPickerTerm, IBasePickerProps<IPickerTerm>>
{

}

export interface ITermPickerState {
  terms: IPickerTerms;
}

export interface ITermPickerProps {
  termPickerHostProps: IPropertyFieldTermPickerHostProps;
  context: BaseComponentContext;
  disabled: boolean;
  value: IPickerTerms;
  allowMultipleSelections: boolean;
  areTermsSelectable: boolean;
  areTermsHidden: boolean;
  isTermSetSelectable: boolean;
  disabledTermIds: string[];
  onChanged: (items: IPickerTerm[]) => void;
  termsService: ISPTermStorePickerService;
  resolveDelay?: number;
}

export default class TermPicker extends React.Component<ITermPickerProps, ITermPickerState> {

  /**
   * Constructor method
   */
  constructor(props: any) {
    super(props);
    this.onRenderItem = this.onRenderItem.bind(this);
    this.onRenderSuggestionsItem = this.onRenderSuggestionsItem.bind(this);
    this.onFilterChanged = this.onFilterChanged.bind(this);
    this.onGetTextFromItem = this.onGetTextFromItem.bind(this);

    this.state = {
      terms: this.props.value
    };

  }

  /**
   * componentWillReceiveProps method
   */
  public componentWillReceiveProps(nextProps: ITermPickerProps) {
    // check to see if props is different to avoid re-rendering
    let newKeys = nextProps.value.map(a => a.key);
    let currentKeys = this.state.terms.map(a => a.key);
    newKeys.sort();
    currentKeys.sort();
    if (newKeys.join(',') !== currentKeys.join(',')) {
      this.setState({ terms: nextProps.value });
    }
  }

  /**
   * Renders the item in the picker
   */
  protected onRenderItem(term: IPickerItemProps<IPickerTerm>) {
    return (
      <div className={styles.pickedTermRoot}
           key={term.index}
           data-selection-index={term.index}
           data-is-focusable={!term.disabled && true}>
        <span className={styles.pickedTermText}>{term.item.name}</span>
        {!term.disabled &&
          <span className={styles.pickedTermCloseIcon}
            onClick={term.onRemoveItem}>
            <i className="ms-Icon ms-Icon--Cancel" aria-hidden="true"></i>
          </span>
        }
      </div>
    );
  }

  /**
   * Renders the suggestions in the picker
   */
  protected onRenderSuggestionsItem(term: IPickerTerm, props) {
    let termParent = term.termSetName;
    let termTitle = `${term.name} [${term.termSetName}]`;
    if (term.path.indexOf(";") !== -1) {
      let splitPath = term.path.split(";");
      termParent = splitPath[splitPath.length - 2];
      splitPath.pop();
      termTitle = `${term.name} [${term.termSetName}:${splitPath.join(':')}]`;
    }
    return (<div className={styles.termSuggestion} title={termTitle}>
      <div>{term.name}</div>
      {
        // Check if term or term set is fetched
        term.termSet.indexOf(term.key) !== -1 ? (
          <div className={styles.termSuggestionSubTitle}>{strings.TermPickerTermSetLabel}</div>
        ) : (
          <div className={styles.termSuggestionSubTitle}> {strings.TermPickerInLabel} {termParent}</div>
        )
      }
    </div>);
  }

  /**
   * When Filter Changes a new search for suggestions
   */
  private async onFilterChanged(filterText: string, tagList: IPickerTerm[]): Promise<IPickerTerm[]> {
    const { context, termPickerHostProps, allowMultipleSelections, isTermSetSelectable, disabledTermIds } = this.props;
    // Only allow to select other tags if multi-selection is enabled
    if (filterText !== "" && (allowMultipleSelections || tagList.length === 0)) {
      let { termsService } = this.props;
      let terms = await termsService.searchTermsByName(filterText);
      // Check if the termset can be selected
      if (isTermSetSelectable) {
        // Retrieve the current termset
        const termSets = await termsService.getTermSets();
        // Check if termset was retrieved and if it contains the filter value
        if (termSets && termSets.length > 0) {
          for (const termSet of termSets) {
            if (termSet.Name.toLowerCase().indexOf(filterText.toLowerCase()) === 0) {
              // Add the termset to the suggestion list
              terms.push({
                key: TermStorePickerServiceHelper.cleanGuid(termSet.Id),
                name: termSet.Name,
                path: "",
                termSet: termSet.Id,
                termGroup: termSet.Group
              });
            }
          }
        }
      }
      // Filter out the terms which are already set
      const filteredTerms = [];
      for (const term of terms) {
        let canBePicked = true;
        // Check if the term is in the disabled list
        if (disabledTermIds && disabledTermIds.length > 0) {
          if (disabledTermIds.indexOf(term.key) !== -1) {
            canBePicked = false;
          }
        }
        // Check if the term can be used
        if (canBePicked) {
          // Only retrieve the terms which are not yet tagged
          if (tagList.filter(tag => tag.key === term.key).length === 0) {
            filteredTerms.push(term);
          }
        }
      }
      return filteredTerms;
    } else {
      return Promise.resolve([]);
    }
  }


  /**
   * gets the text from an item
   */
  private onGetTextFromItem(item: any): any {
    return item.name;
  }

    /**
   * Render method
   */
  public render(): JSX.Element {
    return (
      <div>
        <TermBasePicker
          disabled={this.props.disabled}
          onResolveSuggestions={this.onFilterChanged}
          onRenderSuggestionsItem={this.onRenderSuggestionsItem}
          getTextFromItem={this.onGetTextFromItem}
          onRenderItem={this.onRenderItem}
          defaultSelectedItems={this.props.value}
          selectedItems={this.state.terms}
          itemLimit={!this.props.allowMultipleSelections ? 1 : undefined}
          onChange={this.props.onChanged}
          resolveDelay={this.props.resolveDelay}
          className={styles.termBasePicker}
        />
      </div>
    );

  }
}
