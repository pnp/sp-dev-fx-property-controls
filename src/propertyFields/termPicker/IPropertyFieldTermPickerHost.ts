import { IPickerTerms } from './IPropertyFieldTermPicker';
import { ITermStore, IGroup, ITermSet, ITerm, ISPTermStorePickerService } from '../../services/ISPTermStorePickerService';
import { IPropertyFieldTermPickerPropsInternal } from './IPropertyFieldTermPicker';

/**
 * PropertyFieldTermPickerHost properties interface
 */
export interface IPropertyFieldTermPickerHostProps extends IPropertyFieldTermPickerPropsInternal {
  onChange: (targetProperty?: string, newValue?: any) => void; // eslint-disable-line @typescript-eslint/no-explicit-any
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
  changedCallback: (term: ITerm, termGroup: string, checked: boolean) => void;
  activeNodes?: IPickerTerms;
}

export interface ITermGroupProps extends ITermChanges {
  group: IGroup;
  termstore: string;
  termsService: ISPTermStorePickerService;
  multiSelection: boolean;
  isTermSetSelectable?: boolean;
  areTermsSelectable?: boolean;
  areTermsHidden?: boolean;
  disabledTermIds?: string[];
}

export interface ITermGroupState {
  expanded: boolean;
  loaded?: boolean;
}

export interface ITermSetProps extends ITermChanges {
  termset: ITermSet;
  termstore: string;
  termGroup: string;
  termsService: ISPTermStorePickerService;
  autoExpand: () => void;
  multiSelection: boolean;
  isTermSetSelectable?: boolean;
  areTermsSelectable?: boolean;
  areTermsHidden?: boolean;
  disabledTermIds?: string[];
}

export interface ITermSetState {
  terms?: ITerm[];
  loaded?: boolean;
  expanded?: boolean;
}

export interface ITermProps extends ITermChanges {
  termset: string;
  termGroup: string;
  term: ITerm;
  multiSelection: boolean;
  disabled: boolean;
  isTermSelectable: boolean;
}

export interface ITermState {
  selected?: boolean;
}
