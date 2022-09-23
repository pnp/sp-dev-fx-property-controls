import { ICustomTreeChildItems } from "../treeCollectionData/ICustomTreeItem";
import { RuleTreeBaseOperator } from "./RuleTreeBaseOperator";

//TODO change leftHand and or rightHand type. What is event leftHand?
//Both "strings" will be evaluated through the token service. but the tokenservice returns a string? so that doesn't matter
//event returning object doesn't make any sense as it could be a number, string ...
export interface IRuleTreeData extends ICustomTreeChildItems<IRuleTreeData> {
  leftHand: string;
  operator: RuleTreeBaseOperator;
  rightHand: string;
  conjunction: 'AND' | 'OR'
}