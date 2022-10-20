import * as React from 'react';
import styles from '../PropertyFieldTreeCollectionDataHost.module.scss';
import { ITreeCollectionDataViewerProps, ITreeCollectionDataViewerState } from '.';
import { TreeCollectionDataItem } from '../treeCollectionDataItem';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/components/Button';
import * as strings from 'PropertyControlStrings';
import { cloneDeep } from '@microsoft/sp-lodash-subset';
//import { TreeView, ITreeItem } from "@pnp/spfx-controlsreact/lib/TreeView";

import { getGUID } from '@pnp/common';
import { ICustomTreeChildItems, BaseCustomTreeItem } from '../ICustomTreeItem';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { Link } from 'office-ui-fabric-react/lib/components/Link';
import { ITreeItem } from '@pnp/spfx-controls-react/lib/controls/treeView/ITreeItem';

export class TreeCollectionDataViewer<T extends ICustomTreeChildItems<T>> extends React.Component<ITreeCollectionDataViewerProps, ITreeCollectionDataViewerState> {
  private readonly SORT_IDX = "sortIdx";
  private _treeView = null;

  constructor(props: ITreeCollectionDataViewerProps) {
    super(props);

    this.state = {
      crntItems: [],
      validation: {},
      isLoading: true
    };
  }

  private initItemKeys = (item: BaseCustomTreeItem<T>, key: string, parentKey: string, level: number, sortIdx: number): ITreeItem => {
    const treeItem: ITreeItem = {
      key: key,
      label: '',
      data: {
        value: item,
        parent: parentKey,
        level: level,
        sortIdx: sortIdx
      },
    };

    if (item.children) {
      treeItem.children = item.children?.map((childItem, childIndex) => this.initItemKeys(childItem, getGUID(), key, level + 1, childIndex + 1))
    }

    return treeItem;
  }

  /**
   * componentDidMount lifecycle hook
   */
  public async componentDidMount(): Promise<void> {

    const { TreeView } = await import(
      /* webpackChunkName: 'pnp-spfx-controls-treeview' */
      '@pnp/spfx-controls-react/lib/TreeView'
    );
    this._treeView = TreeView;


    this.setState({
      crntItems: this.props.value ?
        cloneDeep(this.props.value).map((rootItem: BaseCustomTreeItem<T>, index) => this.initItemKeys(rootItem, getGUID(), null, 0, index + 1))
        : []
      , isLoading: false
    });
  }

  /**
  * Creates an empty item with a unique id
  */
  private fillEmptyItemDataDefaults(item: ITreeItem, parentItem?: ITreeItem): ITreeItem {
    let fields;

    if (typeof (this.props.fields) === 'function') {
      fields = this.props.fields(cloneDeep(item), cloneDeep(this.state.crntItems), parentItem ? cloneDeep(parentItem) : null);
    }
    else {
      fields = this.props.fields;
    }

    for (const field of fields) {
      // Assign default value or null to the emptyItem
      item.data.value[field.id] = field.defaultValue || null;
    }
    return item;
  }

  private findNode = (tree: ITreeItem[], key: string): ITreeItem => {
    for (let i = 0; i < tree.length; i++) {
      const stack = [tree[i]];
      while (stack.length) {
        const node = stack.pop();
        if (node.key === key) return node;
        if (node.children) {
          stack.push(...node.children);
        }
      }
    }
    return null;
  }

  private addNewItem = async (parentKey: string): Promise<void> => {

    this.setState((prevState: ITreeCollectionDataViewerState): ITreeCollectionDataViewerState => {
      const { crntItems } = prevState;

      if (parentKey) {
        const treeItem = this.findNode(crntItems, parentKey);
        if (!treeItem.children) {
          treeItem.children = [];
        }
        const nItem: ITreeItem = {
          key: getGUID(),
          label: `${treeItem.children?.length ?? 0}`,
          data: { parent: parentKey, level: treeItem.data.level + 1, value: {}, sortIdx: treeItem.children.length + 1 }
        };
        this.fillEmptyItemDataDefaults(nItem, treeItem);
        treeItem.children.push(nItem);
      } else {
        const nItem: ITreeItem = {
          key: getGUID(),
          label: '',
          data: { parent: null, level: 0, value: {}, sortIdx: crntItems.length + 1 }
        };
        this.fillEmptyItemDataDefaults(nItem);
        crntItems.push(nItem);
      }

      if (this.props.onChanged) {
        this.props.onChanged(crntItems);
      }
      return { crntItems, isLoading: false };
    });
  }

  private removeItem = async (key: string, parentKey: string): Promise<void> => {


    this.setState((prevState: ITreeCollectionDataViewerState): ITreeCollectionDataViewerState => {
      let { crntItems } = prevState;
      const { validation } = prevState;

      if (parentKey) {
        const parent = this.findNode(crntItems, parentKey);
        parent.children = parent.children.filter(_ => key !== _.key);
      } else {
        crntItems = crntItems.filter(_ => _.key !== key);
      }

      //crntItems.splice(idx, 1);
      delete validation[key];
      // Update the sort propety
      crntItems = this.updateSortProperty(crntItems);

      if (this.props.onChanged) {
        this.props.onChanged(crntItems);
      }

      return { crntItems, validation, isLoading: false };
    });
  }

  /**
   * Update an item from the tree
   */
  private updateItem = (key: string, value: T): void => {
    this.setState((prevState: ITreeCollectionDataViewerState): ITreeCollectionDataViewerState => {
      const { crntItems } = prevState;
      // Update the item in the array
      const treeItem = this.findNode(crntItems, key);
      treeItem.data.value = value;

      if (this.props.onChanged) {
        this.props.onChanged(crntItems);
      }
      return { crntItems, isLoading: false };
    });
  }


  /**
   * Validate every item
   */
  private validateItem = (key: string, isValid: boolean): void => {

    this.setState((prevState: ITreeCollectionDataViewerState) => {
      const { validation } = prevState;
      validation[key] = isValid;
      return {
        validation: prevState.validation
      };
    });
  }

  /**
   * Check if all items are valid
   */
  private allItemsValid(): boolean {

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
   * Move an item in the array
   *
   * @param crntItems
   * @param oldIdx
   * @param newIdx
   */

  private moveItemTo(crntItems: ITreeItem[], oldIdx: number, newIdx: number): ITreeItem[] {
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
  private updateSortProperty(crntItems: ITreeItem[]): ITreeItem[] {
    // Update the sort order
    return crntItems.map((item, itemIdx) => {
      item.data.sortIdx = itemIdx + 1;
      return item;
    });
  }

  /**
   * Update the sort order
   */
  private updateSortOrder = (parentKey: string, oldIdx: number, newIdx: number): void => {

    const newOrderedItems = cloneDeep(this.state.crntItems);
    const parentItem = this.findNode(newOrderedItems, parentKey);
    parentItem.children = this.moveItemTo(parentItem.children, oldIdx, newIdx - 1);
    parentItem.children = this.updateSortProperty(parentItem.children);

    this.setState({
      crntItems: newOrderedItems
    });
  }


  private reduceType = (item: ITreeItem): BaseCustomTreeItem<T> => {
    const cleanedItem: BaseCustomTreeItem<T> = item.data.value;
    if (item.children && item.children.length > 0) {
      cleanedItem.children = item.children.map(childItem => this.reduceType(childItem));
    } else if (item.children) {
      delete cleanedItem.children;
    }
    return cleanedItem;
  }

  /**
   * Save the collection data
   */
  private onSave = (): void => {

    const mapped = this.state.crntItems.map(item => this.reduceType(item));
    this.props.fOnSave(mapped);

  }

  /**
   * Cancel
   */
  private onCancel = (): void => {
    this.props.fOnClose();
  }

  private renderItem = (item: ITreeItem): JSX.Element => {

    let fields;

    const parentItem = item.data.parent ? this.findNode(this.state.crntItems, item.data.parent) : undefined;

    if (typeof (this.props.fields) === 'function') {
      const foundParent = parentItem ? cloneDeep(parentItem) : undefined;
      fields = this.props.fields(cloneDeep(item), cloneDeep(this.state.crntItems), foundParent);
    }
    else {
      fields = this.props.fields;
    }


    return <TreeCollectionDataItem
      itemKey={item.key}
      key={item.key}
      fields={fields}
      index={item.data.sortIdx}
      level={item.data.level}
      itemData={item.data.value}
      parentKey={item.data.parent}
      totalItems={parentItem?.children?.length ?? 0}
      enableSorting={this.props.enableSorting}
      disableItemDeletion={this.props.disableItemDeletion}
      disableItemCreation={this.props.disableItemCreation}
      fUpdateItem={this.updateItem}
      fDeleteItem={this.removeItem}
      fValidation={this.validateItem}
      fOnSorting={this.updateSortOrder}
      fAddItem={this.addNewItem}
    />;
  }

  /**
   * Default React render
   */
  public render(): React.ReactElement<ITreeCollectionDataViewerProps> {

    if (this.state.isLoading) return <div />;

    return (
      <div>
        <div className={`PropertyFieldTreeCollectionData__panel__table ${styles.table} ${this.props.tableClassName || ""}`}>
          {
            (this.state.crntItems && this.state.crntItems.length > 0) && (
              <this._treeView key="treeView" items={this.state.crntItems} onRenderItem={this.renderItem} defaultExpanded />
            )
          }
        </div>
        {
          (!this.state.crntItems || this.state.crntItems.length === 0) && (
            <p className={`PropertyFieldTreeCollectionData__panel__no-collection-data ${styles.noTreeCollectionData}`}>{strings.TreeCollectionDataEmptyValue}</p>
          )
        }

        <span className={styles.tableCell}>
          {
            /* Check add or delete action */

            (

              <Link title={strings.TreeCollectionAddRootButtonLabel} className={`${this.props.disableItemCreation ? styles.addBtnDisabled : styles.addBtn}`}
                disabled={(!this.props.enableMultiRoots && this.state.crntItems.length === 1) || this.props.disableItemCreation} onClick={async () => await this.addNewItem(null)}>
                <Icon iconName="Add" />
              </Link>
            )
          }
        </span>
        <div className={`PropertyFieldTreeCollectionData__panel__actions ${styles.panelActions}`}>
          <PrimaryButton text={this.props.saveBtnLabel || strings.SaveButtonLabel} onClick={this.onSave} disabled={!this.allItemsValid()} className="PropertyFieldTreeCollectionData__panel__action__save" />
          <DefaultButton text={this.props.cancelBtnLabel || strings.CancelButtonLabel} onClick={this.onCancel} className="PropertyFieldTreeCollectionData__panel__action__cancel" />
        </div>
      </div>
    );
  }
}
