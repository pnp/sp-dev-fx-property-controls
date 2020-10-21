import { IPropertyFieldGuidProps } from "./IPropertyFieldGuid";

export interface IPropertyFieldGuidHostProps extends IPropertyFieldGuidProps {
  onChanged?: (newValue: any) => void;
}

export interface IPropertyFieldGuidHostState {
  value: string;
}
