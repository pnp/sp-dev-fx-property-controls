import * as monaco from 'monaco-editor';

import { Elanguages } from './monacoEditorControl';

export interface IPropertyFieldMonacoEditorHostProps {
  value: string;
	theme?:'vs-dark' | 'vs-light' | 'hc-black';
	readOnly?: boolean;
	showLineNumbers?: boolean;
	showMiniMap?: boolean;
	onValueChange?: (newValue:string, validationErrors:string[]) => void;
  language: string | Elanguages;
  jsonDiagnosticsOptions?: monaco.languages.json.DiagnosticsOptions;
  jscriptDiagnosticsOptions?: monaco.languages.typescript.DiagnosticsOptions;
  panelWidth?: number;
}

export interface IPropertyFieldMonacoEditorHostState {
  value: string;
  validationErrors: string[];
  showPanel: boolean;
}
