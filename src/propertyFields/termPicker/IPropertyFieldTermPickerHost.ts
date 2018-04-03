import { IPickerTerms } from './IPropertyFieldTermPicker';
import { ITermStore, IGroup, ITermSet, ITerm } from '../../services/ISPTermStorePickerService';
import { IPropertyFieldTermPickerPropsInternal } from './IPropertyFieldTermPicker';
import SPTermStorePickerService from '../../services/SPTermStorePickerService';

/**
 * PropertyFieldTermPickerHost properties interface
 */
export interface IPropertyFieldTermPickerHostProps extends IPropertyFieldTermPickerPropsInternal {
  onChange: (targetProperty?: string, newValue?: any) => void;
}

/**
 * PropertyFieldTermPickerHost state interface
 */
export interface IPropertyFieldTermPickerHostState {
  termStores?: ITermStore[];
  errorMessage?: string;
  openPanel?: boolean;
  loaded?: boolean;
  activeNodes?: IPickerTerms;
}

export interface ITermChanges {
  changedCallback: (term: ITerm, checked: boolean) => void;
  activeNodes?: IPickerTerms;
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
