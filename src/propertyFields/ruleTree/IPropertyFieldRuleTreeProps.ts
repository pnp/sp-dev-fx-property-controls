import { IPropertyPaneCustomFieldProps } from "@microsoft/sp-property-pane";
import { BaseCustomTreeItem } from "../treeCollectionData/ICustomTreeItem";
import { IPropertyTreeBaseProps } from "../treeCollectionData/IPropertyTreeBaseProps";
import { IRuleTreeData } from "./IRuleTreeData";

export interface IPropertyFieldRuleTreeProps extends IPropertyTreeBaseProps {
  /**
   * The custom tree data
   */
  value: BaseCustomTreeItem<IRuleTreeData>[];
  /**
   * 
   */
  serviceInterfaceObject: {};
}

export interface IPropertyFieldRuleTreePropsInternal extends IPropertyPaneCustomFieldProps, IPropertyFieldRuleTreeProps { }
