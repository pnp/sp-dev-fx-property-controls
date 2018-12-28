import { IPickerTerm } from './../propertyFields/termPicker/IPropertyFieldTermPicker';

/**
 * Interfaces for Term store, groups and term sets
 */
export interface ITermStore {
  _ObjectType_: string; // SP.Taxonomy.TermStore
  _ObjectIdentity_: string;
  Id: string;
  Name: string;
  Groups: IGroups;
}

/**
 * Interface to store backward connection between Group and Term store
 */
export interface ITermStoreMinimal {
  Id: string;
  Name: string;
}

export interface IGroups {
  _ObjectType_: string; // SP.Taxonomy.TermGroupCollection
  _Child_Items_: IGroup[];
}

export interface IGroup {
  _ObjectType_: string; // SP.Taxonomy.TermGroup
  _ObjectIdentity_: string;
  TermSets: ITermSets;
  Id: string;
  Name: string;
  IsSystemGroup: boolean;
  TermStore?: ITermStoreMinimal;
}

export interface ITermSets {
  _ObjectType_: string; // SP.Taxonomy.TermSetCollection
  _Child_Items_: ITermSet[];
}

export interface ITermSet {
  _ObjectType_: string; // SP.Taxonomy.TermSet
  _ObjectIdentity_: string;
  Id: string;
  Name: string;
  Description: string;
  Names: ITermSetNames;
  /**
   * This prop is internal. It is not returned from SP Service.
   * We need that to store Group Id.
   */
  Group?: string;
}

export interface ITermSetMinimal {
  _ObjectType_: string; // SP.Taxonomy.TermSet
  _ObjectIdentity_: string;
  Id: string;
  Name: string;
}

export interface ITermSetNames {
  [locale: string]: string;
}

/**
 * Interfaces for the terms
 */
export interface ITerms {
  _ObjectType_: string; // SP.Taxonomy.TermCollection
  _Child_Items_: ITerm[];
}

/**
 * Term
 */
export interface ITerm {
  _ObjectType_: string; // SP.Taxonomy.Term
  _ObjectIdentity_: string;
  Id: string;
  Name: string;
  Description: string;
  IsDeprecated: boolean;
  IsAvailableForTagging: boolean;
  IsRoot: boolean;
  PathOfTerm: string;
  TermSet: ITermSetMinimal;
  PathDepth?: number;
}

/**
 * Properties for the Term Store Picker Service
 */
export interface ISPTermStorePickerServiceProps {
  limitByGroupNameOrID?: string;
  limitByTermsetNameOrID?: string;
  excludeSystemGroup?: boolean;
}

export interface IPnPTermStorePickerServiceProps extends ISPTermStorePickerServiceProps {
  includeLabels?: boolean;
}

export interface ISPTermStorePickerService {
  searchTermsByName: (searchText: string) => Promise<IPickerTerm[]>;
  getTermSets: () => Promise<ITermSet[]>;
  getGroupTermSets: (group: IGroup) => Promise<ITermSets>;
  getAllTerms: (termSet: ITermSet) => Promise<ITerm[]>;
  getTermStores: () => Promise<ITermStore[]>;
}

export class TermStorePickerServiceHelper {
  /**
   * Cleans the Guid from the Web Service response
   * @param guid
   */
  public static cleanGuid(guid: string): string {
    if (guid !== undefined) {
      return guid.replace('/Guid(', '').replace('/', '').replace(')', '');
    } else {
      return '';
    }
  }

  /**
   * Checks if the provided string is a GUID
   * @param strGuid string to check
   */
  public static isGuid(strGuid: string): boolean {
    return /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(strGuid);
  }

    /**
   * Sort the terms by their path
   * @param a term 2
   * @param b term 2
   */
  public static sortTerms(a: ITerm, b: ITerm) {
    if (a.PathOfTerm < b.PathOfTerm) {
      return -1;
    }
    if (a.PathOfTerm > b.PathOfTerm) {
      return 1;
    }
    return 0;
  }
}
