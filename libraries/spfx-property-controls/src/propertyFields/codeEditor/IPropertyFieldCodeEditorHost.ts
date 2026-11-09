import { IPropertyFieldCodeEditorPropsInternal } from './IPropertyFieldCodeEditor';

/**
 * PropertyFieldCodeEditorHost properties interface
 */
export interface IPropertyFieldCodeEditorHostProps extends IPropertyFieldCodeEditorPropsInternal {
  onChange: (targetProperty?: string, newValue?: any) => void; // eslint-disable-line @typescript-eslint/no-explicit-any
}

/**
 * PropertyFieldCodeEditorHost state interface
 */
export interface IPropertyFieldCodeEditorHostState {
  errorMessage?: string;
  openPanel?: boolean;
  loaded?: boolean;
  code?: string;
}
