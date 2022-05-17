import { RuleTreeBaseOperator } from "./RuleTreeBaseOperator";

export interface IRuleTreeData  {
    leftHand: string;
    operator: RuleTreeBaseOperator;
    rightHand: string;
    conjunction: 'AND' | 'OR'
  }