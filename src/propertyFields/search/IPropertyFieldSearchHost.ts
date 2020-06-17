import { ISearchBoxStyles } from "office-ui-fabric-react";

export interface IPropertyFieldSearchHostProps {
  key: string;
  value: string;
  placeholder?:string;
  underlined?:boolean;
  styles?: ISearchBoxStyles;
  className?: string;
  onSearch?: (newValue: any) => void;
  onChange?: (newValue: any) => void;
  onClear?: (ev?: any) => void;
  onEscape?: (ev?: any) => void;
}

export interface IPropertyFieldSearchHostState {
  value: string;
}
