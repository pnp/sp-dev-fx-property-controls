import * as React from 'react';
import styles from '../PropertyFieldCollectionDataHost.module.scss';
import { ICollectionDataViewerProps, ICollectionDataViewerState } from '.';
import { CustomCollectionFieldType } from '..';
import { CollectionDataItem } from '../collectionDataItem';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/components/Button';
import { Icon } from 'office-ui-fabric-react/lib/components/Icon';
import * as strings from 'PropertyControlStrings';
import { cloneDeep } from '@microsoft/sp-lodash-subset';

export class CollectionDataViewer extends React.Component<ICollectionDataViewerProps, ICollectionDataViewerState> {
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
    this.setState({
      crntItems: this.props.value ? cloneDeep(this.props.value) : []
    });
  }

  /**
   * Add a new item to the collection
   */
  private addItem = (item: any) => {
    this.setState((prevState: ICollectionDataViewerState): ICollectionDataViewerState => ({
      crntItems: [...prevState.crntItems, item],
      inCreationItem: null
    }));
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
      const { crntItems } = prevState;
      crntItems.splice(idx, 1);
      return { crntItems };
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
              this.props.fields.map(f => (
                <span className={styles.tableCell}>{f.title} { f.required && <Icon className={styles.required} iconName="Asterisk" /> }</span>
              ))
            }
            <span className={styles.tableCell}></span>
          </div>
          {
            (this.state.crntItems && this.state.crntItems.length > 0) && (
              this.state.crntItems.map((item, idx) => (
                <CollectionDataItem key={idx}
                                    fields={this.props.fields}
                                    index={idx}
                                    item={item}
                                    fUpdateItem={this.updateItem}
                                    fDeleteItem={this.deleteItem}
                                    fValidation={this.validateItem} />
              ))
            )
          }
          <CollectionDataItem fields={this.props.fields}
                              index={null}
                              item={null}
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
