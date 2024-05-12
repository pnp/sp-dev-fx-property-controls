/* eslint-disable @typescript-eslint/no-explicit-any */

import { IPropertyPaneCustomFieldProps } from '@microsoft/sp-property-pane';

import { IItem } from './grid/IItem';

export interface IPropertyFieldGridProps {
  key: string;
  styles?: React.CSSProperties;
  className?: string;
  isVisible?: boolean;
  items: IItem[];
  label?: string;
  onPropertyChange?: (propertyPath: string,oldValue:any ,newValue: any) => void;
  onSelected?: (items:IItem[])=>void;
  defaultSelectedItems?: IItem[];
  selectedItems?: IItem[];
  maxHeight?: number;
  multiSelect?: boolean;
  column1Label?: string;
  column2Label?: string;
 
}

export interface IPropertyFieldGridPropsInternal extends IPropertyFieldGridProps, IPropertyPaneCustomFieldProps {
  
  onRender(elem: HTMLElement): void;
  onDispose(elem: HTMLElement): void;
  
}
