export interface ICustomTreeItem {
 /**
     * Unique key to identify tree item.
     */
  key: string; 
  /**
   * Additional data of the tree item.
   */
  data?: any;
  /**
   * List of child tree items.
   */
  children?: ICustomTreeItem[];
}
