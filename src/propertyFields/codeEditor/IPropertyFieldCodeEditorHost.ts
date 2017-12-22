import { ICheckedTerms } from './IPropertyFieldCodeEditor';
import { ITermStore, IGroup, ITermSet, ITerm } from '../../services/ISPTermStorePickerService';
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

export interface ITermChanges {
  changedCallback: (term: ITerm, checked: boolean) => void;
  activeNodes?: ICheckedTerms;
}

export interface ITermGroupProps extends ITermChanges {
  group: IGroup;
  termstore: string;
  termsService: SPTermStorePickerService;
  multiSelection: boolean;
}

export interface ITermGroupState {
  expanded: boolean;
}

export interface ITermSetProps extends ITermChanges {
  termset: ITermSet;
  termstore: string;
  termsService: SPTermStorePickerService;
  autoExpand: () => void;
  multiSelection: boolean;
}

export interface ITermSetState {
  terms?: ITerm[];
  loaded?: boolean;
  expanded?: boolean;
}

export interface ITermProps extends ITermChanges {
  termset: string;
  term: ITerm;
  multiSelection: boolean;
}

export interface ITermState {
  selected?: boolean;
}
