import * as monaco from 'monaco-editor';

import { IPropertyPaneCustomFieldProps } from '@microsoft/sp-property-pane';

export interface IPropertyFieldMonacoEditorProps   {
  key: string;
	value: string;
	theme?: 'vs-dark' | 'vs-light' | 'hc-black' ;
	readOnly?: boolean;
	showLineNumbers?: boolean;
	showMiniMap?: boolean;
	onChange?: (newValue: string) => void;
  language: string | Elanguages;
  jsonDiagnosticsOptions?: monaco.languages.json.DiagnosticsOptions;
  jscriptDiagnosticsOptions?: monaco.languages.typescript.DiagnosticsOptions;
  panelWidth?: number;
}

export interface IPropertyFieldMonacoEditorPropsInternal extends IPropertyFieldMonacoEditorProps , IPropertyPaneCustomFieldProps{}

 enum Elanguages {
    typescript = 'typescript',
    javascript = 'javascript',
    css = 'css',
    html = 'html',
    json = 'json',
    xml = 'xml',
    markdown = 'markdown',
    less = 'less',
    scss = 'scss',
    handlebars = 'handlebars',
}
