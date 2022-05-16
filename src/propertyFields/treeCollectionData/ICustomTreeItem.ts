export interface ICustomTreeItem { 
  /**
   * Additional data of the tree item.
   */
  data?: any;
  /**
   * List of child tree items.
   */
  children?: ICustomTreeItem[];
}
