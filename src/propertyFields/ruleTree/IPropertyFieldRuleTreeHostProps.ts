import { IPropertyFieldRuleTreeProps as IPropertyFieldRuleTreeProps } from '.';
import { ICustomTreeItem } from '../treeCollectionData/ICustomTreeItem';
import { IRuleTreeData } from './IRuleTreeData';

/**
 * PropertyFieldCollectionDataHost properties interface
 */
export interface IPropertyFieldRuleTreeHostProps extends IPropertyFieldRuleTreeProps {
  onChanged: (value: any[]) => void;
}

export interface IPropertyFieldRuleTreeHostState {
  panelOpen: boolean;
  items:ICustomTreeItem<IRuleTreeData>[];
}
