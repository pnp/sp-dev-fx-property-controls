import { IBrandFontToken } from './IPropertyFieldBrandFontPicker';
import { BaseComponentContext } from '@microsoft/sp-component-base';

/**
 * PropertyFieldBrandFontPickerHost properties interface
 */
export interface IPropertyFieldBrandFontPickerHostProps {
  label: string;
  initialValue?: string;
  targetProperty: string;
  context: BaseComponentContext;
  onSelectionChanged?: (option: IBrandFontToken) => void;
  disabled?: boolean;
  customFontTokens?: IBrandFontToken[];
  onFontTokensLoaded?: (tokens: IBrandFontToken[]) => void;
  showPreview?: boolean;
  previewText?: string;
  loadingErrorMessage?: string;
  useSystemFallback?: boolean;
}

/**
 * PropertyFieldBrandFontPickerHost state interface
 */
export interface IPropertyFieldBrandFontPickerHostState {
  loading: boolean;
  fontTokens: IBrandFontToken[];
  selectedToken?: IBrandFontToken;
  errorMessage?: string;
}
