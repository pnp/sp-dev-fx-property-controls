
/* eslint-disable @typescript-eslint/no-explicit-any */

import { IItem } from './grid/IItem';

export interface IPropertyFieldGridControlProps {
  key: string;
  styles?: React.CSSProperties;
  className?: string;
  isVisible?: boolean;
  items: IItem[];
  label?: string;
  defaultSelectedItems?: IItem[];
  onSelected? : (items:IItem[])=>void;
  maxHeight?: number;
  multiSelect?: boolean;
  
}

export interface IPropertyFieldGridControlState  {
 defaultSelectedItems?: IItem[];
  items: IItem[];
  selectedItems: IItem[];
}
