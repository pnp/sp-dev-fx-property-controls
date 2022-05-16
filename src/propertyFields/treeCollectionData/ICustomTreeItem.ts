
export interface ICustomTreeData
{
  parent:string;
  level:number;
  value:{};
}

export interface ICustomTreeItem<T extends ICustomTreeData> { 
  /**
   * Additional data of the tree item.
   */
  data: T;
  /**
   * List of child tree items.
   */
  children?: ICustomTreeItem<T>[];
}
