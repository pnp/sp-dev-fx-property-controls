import { ICustomTreeItem } from '../treeCollectionData/ICustomTreeItem';
import { IPropertyFieldRuleTreeProps } from './IPropertyFieldRuleTreeProps';
import { IRuleTreeData } from './IRuleTreeData';

/**
 * PropertyFieldCollectionDataHost properties interface
 */
export interface IPropertyFieldRuleTreeHostProps extends IPropertyFieldRuleTreeProps {
  onChanged: (value: object[]) => void;
}

export interface IPropertyFieldRuleTreeHostState {
  panelOpen: boolean;
  items: ICustomTreeItem<IRuleTreeData>[];
}
