import { IPropertyFieldRuleTreeProps as IPropertyFieldRuleTreeProps } from '.';

/**
 * PropertyFieldCollectionDataHost properties interface
 */
export interface IPropertyFieldRuleTreeHostProps extends IPropertyFieldRuleTreeProps {
  onChanged: (value: any[]) => void;
}

export interface IPropertyFieldRuleTreeHostState {
  panelOpen: boolean;
}
