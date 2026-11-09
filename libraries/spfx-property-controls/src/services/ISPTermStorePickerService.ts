import { IPickerTerm } from './../propertyFields/termPicker/IPropertyFieldTermPicker';
import { findIndex } from '@microsoft/sp-lodash-subset';

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
  Labels?: string[];
}

/**
 * Properties for the Term Store Picker Service
 */
export interface ISPTermStorePickerServiceProps {
  limitByGroupNameOrID?: string;
  limitByTermsetNameOrID?: string;
  excludeSystemGroup?: boolean;
}

/**
 * Properties for the Enterprise Term Store Picker Service
 */
export interface IPnPTermStorePickerServiceProps extends ISPTermStorePickerServiceProps {
  /**
   * Specifies if term labels should be loaded from the store
   */
  includeLabels?: boolean;
}

/**
 * Interface to be implemented by Term Store Picker Services
 */
export interface ISPTermStorePickerService {
  /**
   * Searches terms by provided text
   */
  searchTermsByName: (searchText: string) => Promise<IPickerTerm[]>;
  /**
   * Gets term sets from the stores
   */
  getTermSets: () => Promise<ITermSet[]>;
  /**
   * Get term sets from the specified group
   */
  getGroupTermSets: (group: IGroup) => Promise<ITermSets>;
  /**
   * Gets all terms from the specified term set
   */
  getAllTerms: (termSet: ITermSet) => Promise<ITerm[]>;
  /**
   * Gets term stores from the taxonomy service
   */
  getTermStores: () => Promise<ITermStore[]>;
}

/**
 * Helper class with some methods that can be used in any Term Store Picker Service implementation
 */
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
   * Sorting terms based on their path and depth
   *
   * @param terms
   */
  public static sortTerms(terms: ITerm[]): ITerm[] {
    // Start sorting by depth
    let newTermsOrder: ITerm[] = [];
    let itemsToSort = true;
    let pathLevel = 1;
    while (itemsToSort) {
      // Get terms for the current level
      let crntTerms = terms.filter(term => term.PathDepth === pathLevel);
      if (crntTerms && crntTerms.length > 0) {
        crntTerms = crntTerms.sort(this.sortTermByPath);

        if (pathLevel !== 1) {
          crntTerms = crntTerms.reverse();
          for (const crntTerm of crntTerms) {
            const pathElms = crntTerm.PathOfTerm.split(";");
            // Last item is not needed for parent path
            pathElms.pop();
            // Find the parent item and add the new item
            const idx = findIndex(newTermsOrder, term => term.PathOfTerm === pathElms.join(";"));
            if (idx !== -1) {
              newTermsOrder.splice(idx + 1, 0, crntTerm);
            } else {
              // Push the item at the end if the parent couldn't be found
              newTermsOrder.push(crntTerm);
            }
          }
        } else {
          newTermsOrder = crntTerms;
        }

        ++pathLevel;
      } else {
        itemsToSort = false;
      }
    }
    return newTermsOrder;
  }

  /**
   * Sort the terms by their path
   *
   * @param a term 2
   * @param b term 2
   */
  private static sortTermByPath(a: ITerm, b: ITerm): number {
    if (a.PathOfTerm < b.PathOfTerm) {
      return -1;
    }
    if (a.PathOfTerm > b.PathOfTerm) {
      return 1;
    }
    return 0;
  }
}
