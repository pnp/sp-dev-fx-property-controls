import { IPropertyFieldMonacoEditorProps } from './IPropertyFieldMonacoEditor';

export interface IPropertyFieldMonacoEditorHostProps extends  IPropertyFieldMonacoEditorProps,  Omit<IPropertyFieldMonacoEditorProps, "onChange"> {
	onPropertyChange?: (newValue: string) => void;
}

export interface IPropertyFieldMonacoEditorHostState {
  value: string;
  validationErrors: string[];
  showPanel: boolean;
}
