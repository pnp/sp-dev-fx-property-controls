
export interface ICustomTreeData<T>
{
  parent:string;
  level:number;
  sortIdx:number;
  value: T;
}

export interface ICustomTreeItem<T> { 
  /**
   * Additional data of the tree item.
   */
  data: ICustomTreeData<T>;
  /**
   * List of child tree items.
   */
  children?: ICustomTreeItem<T>[];
}
