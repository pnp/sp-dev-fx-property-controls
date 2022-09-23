
export interface ICustomTreeData {
  parent: string;
  level: number;
  sortIdx: number;
}

export interface ICustomTreeChildItems<T> {
  children?: ICustomTreeChildItems<T>[];
}

export interface ICustomTreeItem<T> extends ICustomTreeChildItems<T> {
  data: ICustomTreeData;
}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type BaseCustomTreeItem<T extends ICustomTreeChildItems<T>> = { [Property in keyof T]: any; }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CustomTreeItem<T extends ICustomTreeChildItems<T>> = { [Property in keyof T]: any; }