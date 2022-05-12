import * as React from 'react';
import styles from '../PropertyFieldTreeCollectionDataHost.module.scss';
import { ITreeCollectionDataViewerProps, ITreeCollectionDataViewerState } from '.';
import { TreeCollectionDataItem } from '../treeCollectionDataItem';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/components/Button';
import { Icon } from 'office-ui-fabric-react/lib/components/Icon';
import * as strings from 'PropertyControlStrings';
import { cloneDeep, sortBy } from '@microsoft/sp-lodash-subset';
import { TreeView, ITreeItem, TreeViewSelectionMode, ITreeItemAction } from "@pnp/spfx-controls-react/lib/TreeView";
import { getGUID } from '@pnp/common';

export class TreeCollectionDataViewer extends React.Component<ITreeCollectionDataViewerProps, ITreeCollectionDataViewerState> {
  private readonly SORT_IDX = "sortIdx";

  constructor(props: ITreeCollectionDataViewerProps) {
    super(props);

    this.state = {
      crntItems: [],
      validation: {}
    };
  }

  /**
   * componentDidMount lifecycle hook
   */
  public componentDidMount(): void {
    let crntItems = this.props.value ? sortBy(cloneDeep(this.props.value), this.SORT_IDX) : [{key:'root', label:'root', data:{parent:null, level: 0, value:{}},children:[]},];

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

  private search = (tree:ITreeItem[], key:string)=> {
    const stack = [ tree[0] ]
    while (stack.length) {
      const node = stack.pop();
      if (node.key === key) return node
      node.children && stack.push(...node.children)
    }
    return null;
  }

  private addItemAction =  async (parentKey:string, item: any) => {
    
    this.setState((prevState: ITreeCollectionDataViewerState): ITreeCollectionDataViewerState => {
      const { crntItems } = prevState;
    
      const treeItem = this.search(crntItems, parentKey);      
      const nItem:ITreeItem = {key:getGUID(),label:`${treeItem.children?.length?? 0}`, data:{parent:treeItem.key, level: treeItem.data.level +1, value:{} },children:[]};
      treeItem.children.push(nItem);
      // Update the item in the array
      //let extNode = crntItems.filter(_=> _.key === treeItem.key)[0];
      //console.log('extNode',extNode, nItem);
      //extNode = nItem;
      return { crntItems };
    });        
  }

  private removeItemAction =  async (key: string, parentKey:string) => {
    console.log("delete", key,parent);


    if(!parent)
      return;

    this.setState((prevState: ITreeCollectionDataViewerState): ITreeCollectionDataViewerState => {
      const { crntItems } = prevState;
      const parent = this.search(crntItems, parentKey);

      parent.children = parent.children.filter(_=> key !== _.key);

      // Update the item in the array
      //let extNode = crntItems.filter(_=> _.key === treeItem.key)[0];
      //extNode = nItem;
      return { crntItems };
    });        
  }
  
  /**
   * Update an item from the tree
   */
  private updateItem = (key: string, item: any) => {
    this.setState((prevState: ITreeCollectionDataViewerState): ITreeCollectionDataViewerState => {
      const { crntItems } = prevState;
      // Update the item in the array
      const treeItem = this.search(crntItems, key); 
      treeItem.data.value = item;
      return { crntItems };
    });
  }

  /**
   * Remove an item from the collection
   */
  private deleteItem = (idx: number) => {
    this.setState((prevState: ITreeCollectionDataViewerState): ITreeCollectionDataViewerState => {
      let { crntItems, validation } = prevState;
      crntItems.splice(idx, 1);
      delete validation[idx];

      // Update the sort propety
      crntItems = this.updateSortProperty(crntItems);

      return {
        crntItems: sortBy(crntItems, this.SORT_IDX),
        validation: validation
      };
    });
  }

  /**
   * Validate every item
   */
  private validateItem = (idx: number, isValid: boolean) => {
    this.setState((prevState: ITreeCollectionDataViewerState) => {
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
    this.setState((prevState: ITreeCollectionDataViewerState) => {
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


  private cleanupMap = (item:ITreeItem)=>
  {

    return {'key': item.key, 'label':item.label, 'data': item.data, 'children':item.children?.map( childItem =>this.cleanupMap(childItem)) };
  }
  /**
   * Save the collection data
   */
  private onSave = () => {
    
    //const mapped = this.state.crntItems.map(item=> this.cleanupMap(item));
    //console.log("saving",this.state.crntItems, mapped);
    this.props.fOnSave(this.state.crntItems);
    
  }

  /**
   * Cancel
   */
  private onCancel = () => {
    this.props.fOnClose();
  }

  private renderItem  = (item: ITreeItem):JSX.Element => 
  {
    console.log(item);

    let fields;

    if (typeof (this.props.fields) === 'function') {
      //((level: number, item: ITreeItem) => ICustomTreeCollectionField[])
      fields = this.props.fields(item);
    }
    else
    {
      fields = this.props.fields;
    }


    return <TreeCollectionDataItem 
    itemKey={item.key}
    fields={fields}
    index={0}
    itemData={item.data.value}
    parentKey={item.data.parent}
    // totalItems={allItems.length}
    sortingEnabled={this.props.enableSorting}
    disableItemDeletion={this.props.disableItemDeletion}
    fUpdateItem={this.updateItem}
    fDeleteItem={this.removeItemAction}
    fValidation={this.validateItem}
    fOnSorting={this.updateSortOrder} 
    fAddItem={this.addItemAction}
    // fAddInCreation={ ()=>{console.log("WTF")}}
    />
  }

  /**
   * Default React render
   */
  public render(): React.ReactElement<ITreeCollectionDataViewerProps> {
    
    
    return (
      <div>
        <div className={`PropertyFieldTreeCollectionData__panel__table ${styles.table} ${this.props.tableClassName || ""}`}>       
          {
            (this.state.crntItems && this.state.crntItems.length > 0) && (
              <TreeView items={this.state.crntItems} onRenderItem={this.renderItem} />
            )
          }

        </div>


        <div className={`PropertyFieldTreeCollectionData__panel__actions ${styles.panelActions}`}>
          <PrimaryButton text={this.props.saveBtnLabel || strings.SaveButtonLabel} onClick={this.onSave} disabled={!this.allItemsValid()} className="PropertyFieldTreeCollectionData__panel__action__save" /> 
          <DefaultButton text={this.props.cancelBtnLabel || strings.CancelButtonLabel} onClick={this.onCancel} className="PropertyFieldTreeCollectionData__panel__action__cancel" />
        </div>
      </div>
    );
  }
}

/*

        {
          (!this.state.crntItems || this.state.crntItems.length === 0) && (
            <p className={`PropertyFieldTreeCollectionData__panel__no-collection-data ${styles.noTreeCollectionData}`}>{strings.TreeCollectionDataEmptyValue}</p>
          )
        }
         <TreeCollectionDataItem key={item.uniqueId}
                                    fields={visibleFields}
                                    index={idx}
                                    item={item}
                                    totalItems={allItems.length}
                                    sortingEnabled={this.props.enableSorting}
                                    disableItemDeletion={this.props.disableItemDeletion}
                                    fUpdateItem={this.updateItem}
                                    fDeleteItem={this.deleteItem}
                                    fValidation={this.validateItem}
                                    fOnSorting={this.updateSortOrder} />

          {
            !this.props.disableItemCreation && (
              <TreeCollectionDataItem fields={visibleFields}
                                  index={null}
                                  item={null}
                                  sortingEnabled={this.props.enableSorting}
                                  totalItems={null}
                                  fAddItem={this.addItem}
                                  fAddInCreation={this.addInCreation} />
            )
          }
*/