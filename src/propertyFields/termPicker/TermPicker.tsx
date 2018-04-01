import * as React from 'react';
import { BasePicker, IBasePickerProps, IPickerItemProps } from 'office-ui-fabric-react/lib/Pickers';
import { ICheckedTerm } from './IPropertyFieldTermPicker';
import SPTermStorePickerService from './../../services/SPTermStorePickerService';
import styles from './PropertyFieldtermPickerHost.Module.scss'

//export type termPicker = BasePicker<ICheckedTerm, IBasePickerProps<ICheckedTerm>>;

export class TermBasePicker extends BasePicker<ICheckedTerm, IBasePickerProps<ICheckedTerm>>
{
}

export default class TermPicker extends React.Component<any, any> {

  constructor(props: any) {
    super(props);

    this.onRenderItem = this.onRenderItem.bind(this);
    this.onRenderSuggestionsItem = this.onRenderSuggestionsItem.bind(this);
    this.onFilterChanged = this.onFilterChanged.bind(this);
    this.onGetTextFromItem = this.onGetTextFromItem.bind(this);

  }

  protected onRenderItem(term: IPickerItemProps<ICheckedTerm>) {
    console.log("onRenderItem called");
    console.log(term);
    return (<span className={styles.selectedItem}>{term.item.name} </span>);

  }

  protected onRenderSuggestionsItem(term: ICheckedTerm, props) {
    console.log("onRenderSuggestionsItem called");
    console.log(term);
    return (<div className={styles.termSuggestion} title={term.path}>
      <div>{term.name}</div>
      <div className={styles.termSuggestionSubTitle}> in {term.termSet}</div>
    </div>);
  }

  private onFilterChanged(filterText: string, tagList: ICheckedTerm[]): Promise<ICheckedTerm[]> {
    // this.termsService = new SPTermStorePickerService(this.props, this.props.context);
    // let terms = this.termsService.searchTermsByName(filterText);
    // return terms;
    return new Promise<ICheckedTerm[]>((resolve) => {
      resolve([
        {
          key: "123",
          name: 'term1',
          path: "path",
          termSet: "123"
        },
        {
          key: "124",
          name: 'term2',
          path: "path",
          termSet: "123"
        },
        {
          key: "125",
          name: 'term3',
          path: "path",
          termSet: "123"
        }
      ]);
    });


  }

  private onGetTextFromItem(item: any): any {
    return item.name;
  }

  public render(): JSX.Element {
    return (<div><TermBasePicker

      onResolveSuggestions={this.onFilterChanged}
      onRenderSuggestionsItem={this.onRenderSuggestionsItem}
      getTextFromItem={this.onGetTextFromItem}
      onRenderItem={this.onRenderItem}
    
    // pickerSuggestionsProps={
    //   {
    //     suggestionsHeaderText: 'Suggested Tags',
    //     noResultsFoundText: 'No terms Found'
    //   }
    // }
    // itemLimit={2}
    // disabled={false}
    // inputProps={{
    //   onBlur: (ev: React.FocusEvent<HTMLInputElement>) => console.log('onBlur called'),
    //   onFocus: (ev: React.FocusEvent<HTMLInputElement>) => console.log('onFocus called'),
    //   'aria-label': 'Tag Picker'
    // }}
    /></div>);

  }


}
