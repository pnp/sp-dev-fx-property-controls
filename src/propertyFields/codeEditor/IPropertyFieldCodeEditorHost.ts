import { IPropertyFieldCodeEditorPropsInternal } from './IPropertyFieldCodeEditor';
import SPTermStorePickerService from '../../services/SPTermStorePickerService';

/**
 * PropertyFieldCodeEditorHost properties interface
 */
export interface IPropertyFieldCodeEditorHostProps extends IPropertyFieldCodeEditorPropsInternal {
  onChange: (targetProperty?: string, newValue?: any) => void;
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
