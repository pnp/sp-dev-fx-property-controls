import * as React from 'react';
import styles from '../PropertyFieldCollectionDataHost.module.scss';
import { ICollectionDataViewerProps, ICollectionDataViewerState } from '.';
import { CollectionDataItem } from '../collectionDataItem';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/components/Button';
import { Icon } from 'office-ui-fabric-react/lib/components/Icon';
import * as strings from 'PropertyControlStrings';
import { cloneDeep, sortBy } from '@microsoft/sp-lodash-subset';

export class CollectionDataViewer extends React.Component<ICollectionDataViewerProps, ICollectionDataViewerState> {
  private readonly SORT_IDX = "sortIdx";

  constructor(props: ICollectionDataViewerProps) {
    super(props);

    this.state = {
      crntItems: [],
      inCreationItem: null,
      validation: {}
    };
  }

  /**
   * componentDidMount lifecycle hook
   */
  public componentDidMount(): void {
    let crntItems = this.props.value ? sortBy(cloneDeep(this.props.value), this.SORT_IDX) : [];
    crntItems = crntItems.map((item, idx) => {
      if (!item[this.SORT_IDX]) {
        item[this.SORT_IDX] = idx + 1;
      }
      return item;
    });
    // Update the sort propety
    crntItems = this.updateSortProperty(crntItems);
    this.setState({
      crntItems: sortBy(crntItems, this.SORT_IDX)
    });
  }

  /**
   * Add a new item to the collection
   */
  private addItem = (item: any) => {
    this.setState((prevState: ICollectionDataViewerState): ICollectionDataViewerState => {
      let crntItems = [...prevState.crntItems, item];
      crntItems = this.updateSortProperty(crntItems);
      return {
        crntItems,
        inCreationItem: null
      };
    });
  }

  /**
   * Remove an item from the collection
   */
  private updateItem = (idx: number, item: any) => {
    this.setState((prevState: ICollectionDataViewerState): ICollectionDataViewerState => {
      const { crntItems } = prevState;
      // Update the item in the array
      crntItems[idx] = item;
      return { crntItems };
    });
  }

  /**
   * Remove an item from the collection
   */
  private deleteItem = (idx: number) => {
    this.setState((prevState: ICollectionDataViewerState): ICollectionDataViewerState => {
      let { crntItems } = prevState;
      crntItems.splice(idx, 1);

      // Update the sort propety
      crntItems = this.updateSortProperty(crntItems);

      return {
        crntItems: sortBy(crntItems, this.SORT_IDX)
      };
    });
  }

  /**
   * Validate every item
   */
  private validateItem = (idx: number, isValid: boolean) => {
    this.setState((prevState: ICollectionDataViewerState) => {
      const { validation } = prevState;
      validation[idx] = isValid;
      return {
        validation: prevState.validation
      };
    });
  }

  /**
   * Check if all items are valid
   */
  private allItemsValid() {
    const { validation } = this.state;
    if (validation) {
      const keys = Object.keys(validation);
      for (const key of keys) {
        if (!validation[key]) {
          return false;
        }
      }
    }
    return true;
  }

  /**
   * Currently in creation
   */
  private addInCreation = (item: any) => {
    this.setState({
      inCreationItem: item
    });
  }

  /**
   * Add the item and save the form
   */
  private addAndSave = () => {
    // Check if the item is not empty
    if (this.state.inCreationItem) {
      this.props.fOnSave([...this.state.crntItems, this.state.inCreationItem]);
    } else {
      this.onSave();
    }
  }

  /**
   * Move an item in the array
   *
   * @param crntItems
   * @param oldIdx
   * @param newIdx
   */
  private moveItemTo(crntItems: any[], oldIdx: number, newIdx: number): any[] {
    if (newIdx > -1 && newIdx < crntItems.length) {
      const removedElement = crntItems.splice(oldIdx, 1)[0];
      if (removedElement) {
        crntItems.splice(newIdx, 0, removedElement);
      }
    }
    return crntItems;
  }

  /**
   * Update the sort property
   *
   * @param crntItems
   */
  private updateSortProperty(crntItems: any[]): any[] {
    // Update the sort order
    return crntItems.map((item, itemIdx) => {
      item[this.SORT_IDX] = itemIdx + 1;
      return item;
    });
  }

  /**
   * Update the sort order
   */
  private updateSortOrder = (oldIdx: number, newIdx: number) => {
    this.setState((prevState: ICollectionDataViewerState) => {
      const { crntItems } = prevState;
      let newOrderedItems = cloneDeep(crntItems);
      newOrderedItems = this.moveItemTo(newOrderedItems, oldIdx, newIdx - 1);
      newOrderedItems = this.updateSortProperty(newOrderedItems);
      newOrderedItems = sortBy(newOrderedItems, this.SORT_IDX);

      return {
        crntItems: newOrderedItems
      };
    });
  }

  /**
   * Save the collection data
   */
  private onSave = () => {
    this.props.fOnSave(this.state.crntItems);
  }

  /**
   * Cancel
   */
  private onCancel = () => {
    this.props.fOnClose();
  }

  /**
   * Default React render
   */
  public render(): React.ReactElement<ICollectionDataViewerProps> {
    return (
      <div>
        <div className={styles.table}>
          <div className={`${styles.tableRow} ${styles.tableHead}`}>
            {
              this.props.enableSorting && (
                <span className={styles.tableCell}></span>
              )
            }
            {
              this.props.fields.map(f => (
                <span key={`dataviewer-${f.id}`} className={styles.tableCell}>{f.title} { f.required && <Icon className={styles.required} iconName="Asterisk" /> }</span>
              ))
            }
            <span className={styles.tableCell}></span>
            <span className={styles.tableCell}></span>
          </div>
          {
            (this.state.crntItems && this.state.crntItems.length > 0) && (
              this.state.crntItems.map((item, idx, allItems) => (
                <CollectionDataItem key={item.uniqueId}
                                    fields={this.props.fields}
                                    index={idx}
                                    item={item}
                                    totalItems={allItems.length}
                                    sortingEnabled={this.props.enableSorting}
                                    disableItemDeletion={this.props.disableItemDeletion}
                                    fUpdateItem={this.updateItem}
                                    fDeleteItem={this.deleteItem}
                                    fValidation={this.validateItem}
                                    fOnSorting={this.updateSortOrder} />
              ))
            )
          }
          <CollectionDataItem fields={this.props.fields}
                              index={null}
                              item={null}
                              sortingEnabled={this.props.enableSorting}
                              totalItems={null}
                              fAddItem={this.addItem}
                              fAddInCreation={this.addInCreation} />
        </div>

        {
          (!this.state.crntItems || this.state.crntItems.length === 0) && (
            <p className={styles.noCollectionData}>{strings.CollectionDataEmptyValue}</p>
          )
        }

        <div className={styles.panelActions}>
          { this.state.inCreationItem && <PrimaryButton text={strings.CollectionSaveAndAddButtonLabel} onClick={this.addAndSave} disabled={!this.allItemsValid()} /> }
          { !this.state.inCreationItem && <PrimaryButton text={strings.SaveButtonLabel} onClick={this.onSave} disabled={!this.allItemsValid()} /> }
          <DefaultButton text={strings.CancelButtonLabel} onClick={this.onCancel} />
        </div>
      </div>
    );
  }
}
