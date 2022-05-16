import { IPropertyFieldRuleTreeProps as IPropertyFieldRuleTreeProps, IRuleTreeData } from '.';
import { ICustomTreeItem } from '../treeCollectionData/ICustomTreeItem';

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
