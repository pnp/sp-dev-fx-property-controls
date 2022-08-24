import { IPropertyFieldGuidProps } from "./IPropertyFieldGuid";

export interface IPropertyFieldGuidHostProps extends IPropertyFieldGuidProps {
  onChanged?: (newValue: any) => void; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export interface IPropertyFieldGuidHostState {
  value: string;
}
