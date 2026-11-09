import {
  ISPTermStorePickerService,
  IPnPTermStorePickerServiceProps,
  ITermStore,
  ITermSet,
  TermStorePickerServiceHelper,
  ITerm,
  IGroup,
  ITermSets
} from "./ISPTermStorePickerService";
import { BaseComponentContext } from '@microsoft/sp-component-base';
import { IPickerTerm } from './../propertyFields/termPicker/IPropertyFieldTermPicker';
import { SPHttpClient } from "@microsoft/sp-http";

/**
 * Interfaces for taxonomy REST API responses
 */
interface ITaxonomyTermStoreInfo {
  id: string;
  name: string;
  defaultLanguageTag: string;
  languageTags: string[];
}

interface ITaxonomyGroupInfo {
  id: string;
  name: string;
  description: string;
  scope: string;
  createdDateTime: string;
  type: string;
}

interface ITaxonomyTermSetInfo {
  id: string;
  localizedNames: { name: string; languageTag: string }[];
  description: string;
  createdDateTime: string;
  properties: { key: string; value: string }[];
}

interface ITaxonomyTermInfo {
  id: string;
  labels: { name: string; isDefault: boolean; languageTag: string }[];
  descriptions: { description: string; languageTag: string }[];
  createdDateTime: string;
  lastModifiedDateTime: string;
  properties: { key: string; value: string }[];
  isDeprecated?: boolean;
  isAvailableForTagging?: boolean;
  childrenCount?: number;
  children?: ITaxonomyTermInfo[];
}

/**
 * Term Store Picker Service implementation that uses SharePoint REST API for taxonomy
 * This replaces the old @pnp/sp-taxonomy which is no longer available in PnPjs v4
 */
export default class PnPTermStorePickerService implements ISPTermStorePickerService {

  private readonly _termSetCollectionObjectType: string = 'SP.Taxonomy.TermSetCollection';
  private readonly _termGroupCollectionObjectType: string = 'SP.Taxonomy.TermGroupCollection';
  protected context: BaseComponentContext;
  private _termStoreId: string;
  private _termStores: ITermStore[];
  private _groups: { [termStoreId: string]: IGroup[] } = {};

  constructor(private props: IPnPTermStorePickerServiceProps, context: BaseComponentContext) {
    // No initialization needed - we use SPHttpClient from context
        this.context = context;

  }

  /**
   * Makes a request to the taxonomy REST API
   * @param endpoint - The endpoint path after /v2.1/_api/
   */
  private async _taxonomyRequest<T>(endpoint: string): Promise<T> {
    const url = `${this.context.pageContext.web.absoluteUrl}/_api/v2.1/${endpoint}`;
    const response = await this.context.spHttpClient.get(
      url,
      SPHttpClient.configurations.v1
    );
    
    if (!response.ok) {
      throw new Error(`Taxonomy API request failed: ${response.statusText}`);
    }
    
    return response.json();
  }

  /**
   * Gets term stores from the taxonomy service
   */
  public async getTermStores(): Promise<ITermStore[]> {
    await this._ensureTermStores();
    return this._termStores;
  }

  /**
   * Searches terms by provided text
   * @param searchText text to search
   */
  public async searchTermsByName(searchText: string): Promise<IPickerTerm[]> {
    if (this.props.limitByTermsetNameOrID) {
      return this._searchTermsByTermSet(searchText);
    } else if (this.props.limitByGroupNameOrID) {
      return this._searchTermsByGroup(searchText);
    } else {
      return this._searchAllTerms(searchText);
    }
  }

  /**
   * Gets term sets from the stores
   */
  public async getTermSets(): Promise<ITermSet[]> {
    await this._ensureTermStores();
    let termSets: ITermSet[] = [];

    for (const termStore of this._termStores) {
      const groups = this._groups[termStore.Id];
      
      for (const group of groups) {
        if (this.props.limitByTermsetNameOrID) {
          // Filter to specific term set
          const filteredTermSets = group.TermSets._Child_Items_.filter(ts => 
            ts.Name === this.props.limitByTermsetNameOrID || 
            ts.Id.toLowerCase() === this.props.limitByTermsetNameOrID.toLowerCase()
          );
          termSets = [...termSets, ...filteredTermSets];
        } else {
          termSets = [...termSets, ...group.TermSets._Child_Items_];
        }
      }
    }

    return termSets;
  }

  /**
   * Gets all terms from the specified term set
   * @param termSet Term Set to get terms from
   */
  public async getAllTerms(termSet: ITermSet): Promise<ITerm[]> {
    await this._ensureTermStores();
    
    try {
      // Use the new taxonomy REST API to get terms
      const response = await this._taxonomyRequest<{ value: ITaxonomyTermInfo[] }>(
        `termStore/sets/${termSet.Id}/terms?$expand=children`
      );

      const resultTerms: ITerm[] = [];
      
      // Recursively process terms to build flat list with paths
      const processTerms = (terms: ITaxonomyTermInfo[], parentPath: string = '', depth: number = 1): void => {
        for (const taxonomyTerm of terms) {
          const termName = this._getDefaultLabel(taxonomyTerm);
          const pathOfTerm = parentPath ? `${parentPath};${termName}` : termName;
          
          const term: ITerm = {
            _ObjectType_: 'SP.Taxonomy.Term',
            _ObjectIdentity_: taxonomyTerm.id,
            Id: taxonomyTerm.id,
            Name: termName,
            Description: this._getDescription(taxonomyTerm),
            IsDeprecated: taxonomyTerm.isDeprecated || false,
            IsAvailableForTagging: taxonomyTerm.isAvailableForTagging !== false,
            IsRoot: depth === 1,
            PathOfTerm: pathOfTerm,
            PathDepth: depth,
            TermSet: {
              _ObjectType_: 'SP.Taxonomy.TermSet',
              _ObjectIdentity_: termSet.Id,
              Id: termSet.Id,
              Name: termSet.Name
            }
          };

          if (this.props.includeLabels) {
            term.Labels = taxonomyTerm.labels.map(l => l.name);
          }

          resultTerms.push(term);

          // Process children recursively
          if (taxonomyTerm.children && taxonomyTerm.children.length > 0) {
            processTerms(taxonomyTerm.children, pathOfTerm, depth + 1);
          }
        }
      };

      processTerms(response.value);
      return TermStorePickerServiceHelper.sortTerms(resultTerms);
    } catch (error) {
      console.error('Error loading terms', error);
      return [];
    }
  }

  /**
   * Get term sets from the specified group
   * @param group Term Group
   */
  public async getGroupTermSets(group: IGroup): Promise<ITermSets> {
    await this._ensureTermStores();
    
    const groupData = this._groups[group.TermStore?.Id || this._termStoreId]?.find(g => g.Id === group.Id);
    
    if (!groupData) {
      return {
        _ObjectType_: this._termSetCollectionObjectType,
        _Child_Items_: []
      };
    }

    let termSets = groupData.TermSets._Child_Items_;
    
    if (this.props.limitByTermsetNameOrID) {
      termSets = termSets.filter(ts => 
        ts.Name === this.props.limitByTermsetNameOrID || 
        ts.Id.toLowerCase() === this.props.limitByTermsetNameOrID.toLowerCase()
      );
    }

    return {
      _ObjectType_: this._termSetCollectionObjectType,
      _Child_Items_: termSets
    };
  }

  /**
   * Searches terms by provided text in the term sets specified by limitByTermsetNameOrID
   */
  private async _searchTermsByTermSet(searchText: string): Promise<IPickerTerm[]> {
    await this._ensureTermStores();
    const returnTerms: IPickerTerm[] = [];
    
    const termSets = await this.getTermSets();
    
    for (const termSet of termSets) {
      const terms = await this.getAllTerms(termSet);
      const filtered = this._filterTermsBySearch(terms, searchText);
      
      for (const term of filtered) {
        returnTerms.push(this._termToPickerTerm(term, termSet));
      }
    }

    return returnTerms;
  }

  /**
   * Searches terms by provided text in the group specified by limitByGroupNameOrID
   */
  private async _searchTermsByGroup(searchText: string): Promise<IPickerTerm[]> {
    await this._ensureTermStores();
    const returnTerms: IPickerTerm[] = [];

    for (const termStore of this._termStores) {
      const groups = this._groups[termStore.Id];
      const targetGroup = groups.find(g => 
        g.Name === this.props.limitByGroupNameOrID || 
        g.Id.toLowerCase() === this.props.limitByGroupNameOrID.toLowerCase()
      );

      if (targetGroup) {
        for (const termSet of targetGroup.TermSets._Child_Items_) {
          const terms = await this.getAllTerms(termSet);
          const filtered = this._filterTermsBySearch(terms, searchText);
          
          for (const term of filtered) {
            const pickerTerm = this._termToPickerTerm(term, termSet);
            pickerTerm.termGroup = targetGroup.Id;
            returnTerms.push(pickerTerm);
          }
        }
      }
    }

    return returnTerms;
  }

  /**
   * Searches for terms across all term stores
   */
  private async _searchAllTerms(searchText: string): Promise<IPickerTerm[]> {
    await this._ensureTermStores();
    const returnTerms: IPickerTerm[] = [];

    for (const termStore of this._termStores) {
      const groups = this._groups[termStore.Id];
      
      for (const group of groups) {
        for (const termSet of group.TermSets._Child_Items_) {
          const terms = await this.getAllTerms(termSet);
          const filtered = this._filterTermsBySearch(terms, searchText);
          
          for (const term of filtered) {
            const pickerTerm = this._termToPickerTerm(term, termSet);
            pickerTerm.termGroup = group.Id;
            returnTerms.push(pickerTerm);
          }
        }
      }
    }

    return returnTerms;
  }

  /**
   * Filters terms by search text (starts with, case-insensitive)
   */
  private _filterTermsBySearch(terms: ITerm[], searchText: string): ITerm[] {
    const lowerSearch = searchText.toLowerCase();
    return terms.filter(t => t.Name.toLowerCase().startsWith(lowerSearch)).slice(0, 30);
  }

  /**
   * Converts an ITerm to an IPickerTerm
   */
  private _termToPickerTerm(term: ITerm, termSet: ITermSet): IPickerTerm {
    const pickerTerm: IPickerTerm = {
      key: term.Id,
      name: term.Name,
      path: term.PathOfTerm,
      termSet: termSet.Id,
      termSetName: termSet.Name,
      termGroup: ''
    };

    if (term.Labels) {
      pickerTerm.labels = term.Labels;
    }

    return pickerTerm;
  }

  /**
   * Ensures term stores and groups are loaded
   */
  private async _ensureTermStores(): Promise<void> {
    if (this._termStores) {
      return;
    }

    try {
      // Get the default term store
      const termStoreInfo = await this._taxonomyRequest<ITaxonomyTermStoreInfo>('termStore');
      this._termStoreId = termStoreInfo.id;

      // Get all groups in the term store
      const groupsResponse = await this._taxonomyRequest<{ value: ITaxonomyGroupInfo[] }>('termStore/groups');
      
      let groups = groupsResponse.value;

      // Filter by group if specified
      if (this.props.limitByGroupNameOrID) {
        groups = groups.filter(g => 
          g.name === this.props.limitByGroupNameOrID || 
          g.id.toLowerCase() === this.props.limitByGroupNameOrID.toLowerCase()
        );
      }

      // Exclude system groups if specified
      if (this.props.excludeSystemGroup) {
        groups = groups.filter(g => g.type !== 'systemGroup');
      }

      // Build the groups with their term sets
      const processedGroups: IGroup[] = [];

      for (const taxonomyGroup of groups) {
        // Get term sets for this group
        const termSetsResponse = await this._taxonomyRequest<{ value: ITaxonomyTermSetInfo[] }>(
          `termStore/groups/${taxonomyGroup.id}/sets`
        );

        let termSets = termSetsResponse.value;

        // Filter by term set if specified
        if (this.props.limitByTermsetNameOrID) {
          termSets = termSets.filter(ts => {
            const name = ts.localizedNames.find(n => n.languageTag === termStoreInfo.defaultLanguageTag)?.name || ts.localizedNames[0]?.name;
            return name === this.props.limitByTermsetNameOrID || 
                   ts.id.toLowerCase() === this.props.limitByTermsetNameOrID.toLowerCase();
          });
        }

        const group: IGroup = {
          _ObjectType_: 'SP.Taxonomy.TermGroup',
          _ObjectIdentity_: taxonomyGroup.id,
          Id: taxonomyGroup.id,
          Name: taxonomyGroup.name,
          IsSystemGroup: taxonomyGroup.type === 'systemGroup',
          TermStore: {
            Id: termStoreInfo.id,
            Name: termStoreInfo.name
          },
          TermSets: {
            _ObjectType_: this._termSetCollectionObjectType,
            _Child_Items_: termSets.map(ts => this._convertTermSet(ts, termStoreInfo.defaultLanguageTag, taxonomyGroup.id))
          }
        };

        // Only add groups that have term sets (after filtering)
        if (group.TermSets._Child_Items_.length > 0 || !this.props.limitByTermsetNameOrID) {
          processedGroups.push(group);
        }
      }

      this._groups[termStoreInfo.id] = processedGroups;

      // Build the term store result
      this._termStores = [{
        _ObjectType_: 'SP.Taxonomy.TermStore',
        _ObjectIdentity_: termStoreInfo.id,
        Id: termStoreInfo.id,
        Name: termStoreInfo.name,
        Groups: {
          _ObjectType_: this._termGroupCollectionObjectType,
          _Child_Items_: processedGroups
        }
      }];

    } catch (error) {
      console.error('Error loading term stores', error);
      this._termStores = [];
    }
  }

  /**
   * Converts a taxonomy API term set to the internal ITermSet format
   */
  private _convertTermSet(taxonomyTermSet: ITaxonomyTermSetInfo, defaultLanguage: string, groupId: string): ITermSet {
    const defaultName = taxonomyTermSet.localizedNames.find(n => n.languageTag === defaultLanguage)?.name || 
                        taxonomyTermSet.localizedNames[0]?.name || '';
    
    const names: { [locale: string]: string } = {};
    taxonomyTermSet.localizedNames.forEach(n => {
      names[n.languageTag] = n.name;
    });

    return {
      _ObjectType_: 'SP.Taxonomy.TermSet',
      _ObjectIdentity_: taxonomyTermSet.id,
      Id: taxonomyTermSet.id,
      Name: defaultName,
      Description: taxonomyTermSet.description || '',
      Names: names,
      Group: groupId
    };
  }

  /**
   * Gets the default label from a taxonomy term
   */
  private _getDefaultLabel(taxonomyTerm: ITaxonomyTermInfo): string {
    const defaultLabel = taxonomyTerm.labels.find(l => l.isDefault);
    return defaultLabel?.name || taxonomyTerm.labels[0]?.name || '';
  }

  /**
   * Gets the description from a taxonomy term
   */
  private _getDescription(taxonomyTerm: ITaxonomyTermInfo): string {
    return taxonomyTerm.descriptions?.[0]?.description || '';
  }
}