import { ISearchBoxStyles } from "office-ui-fabric-react/lib/components/SearchBox";

export interface IPropertyFieldSearchHostProps {
  key: string;
  value: string;
  placeholder?:string;
  underlined?:boolean;
  styles?: ISearchBoxStyles;
  className?: string;
  onSearch?: (newValue: any) => void; // eslint-disable-line @typescript-eslint/no-explicit-any
  onChange?: (newValue: any) => void; // eslint-disable-line @typescript-eslint/no-explicit-any
  onClear?: (ev?: any) => void; // eslint-disable-line @typescript-eslint/no-explicit-any
  onEscape?: (ev?: any) => void; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export interface IPropertyFieldSearchHostState {
  value: string;
}
