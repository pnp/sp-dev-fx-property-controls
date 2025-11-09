import { BaseComponentContext } from '@microsoft/sp-component-base';
import { IBrandFontToken } from '../propertyFields/brandFontPicker/IPropertyFieldBrandFontPicker';

/**
 * Service to interact with SharePoint Brand Center for font tokens
 */
export class BrandCenterService {
  private readonly context: BaseComponentContext;

  constructor(context: BaseComponentContext) {
    this.context = context;
  }

  /**
   * Get font tokens from SharePoint Brand Center
   */
  public async getFontTokens(): Promise<IBrandFontToken[]> {
       
    const siteFontTokens = await this.getFontTokensFromRest();
       
    const systemTokens = this.getSystemFontTokens();
        
    // Combine all font tokens with categories
    const allTokens = [...siteFontTokens, ...systemTokens];

    return allTokens;
  }

  /**
   * Get system font tokens as fallback
   */
  private getSystemFontTokens(): IBrandFontToken[] {
    return [
      {
        name: 'fontFamilyBase',
        displayName: 'Base Font',
        value: 'var(--fontFamilyBase, "Segoe UI", "Segoe UI Web (West European)", "Segoe UI", -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif)',
        preview: 'The quick brown fox jumps over the lazy dog',
        category: 'microsoft'
      },
      {
        name: 'fontFamilyMonospace',
        displayName: 'Monospace Font',
        value: 'var(--fontFamilyMonospace, Consolas, "Courier New", Courier, monospace)',
        preview: 'The quick brown fox jumps over the lazy dog',
        category: 'microsoft'
      },
      {
        name: 'fontFamilyNumeric',
        displayName: 'Numeric Font',
        value: 'var(--fontFamilyNumeric, Bahnschrift, "Segoe UI", "Segoe UI Web (West European)", "Segoe UI", -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif)',
        preview: '0123456789',
        category: 'microsoft'
      }
    ];
  }

  /**
   * Try to get font tokens using SharePoint Brand Center REST API
   */
  private async getFontTokensFromRest(): Promise<IBrandFontToken[]> {
    try {
      const spHttpClient = this.context.spHttpClient;
      const currentWebUrl = this.context.pageContext.web.absoluteUrl;

      return await this.fetchSiteFontPackages(spHttpClient, currentWebUrl);
    } catch (error) {
      console.debug('SharePoint Brand Center REST API access not available:', error);
    }

    return [];
  }

  /**
   * Fetch site font packages from SharePoint API
   */
  private async fetchSiteFontPackages(spHttpClient: any, currentWebUrl: string): Promise<IBrandFontToken[]> { // eslint-disable-line @typescript-eslint/no-explicit-any
    const tokens: IBrandFontToken[] = [];

    try {
      const siteFontPackagesResponse = await spHttpClient.get(
        `${currentWebUrl}/_api/SiteFontPackages`,
        {
          headers: {
            'Accept': 'application/json;odata=verbose',
            'Content-Type': 'application/json;odata=verbose'
          }
        } as any // eslint-disable-line @typescript-eslint/no-explicit-any
      );

      if (siteFontPackagesResponse.ok) {
        return await this.parseSiteFontPackagesResponse(siteFontPackagesResponse, currentWebUrl);
      } else {
        console.debug(`Site font packages API returned ${siteFontPackagesResponse.status}: ${siteFontPackagesResponse.statusText}`);
      }
    } catch (siteFontPackagesError) {
      console.debug('Site font packages not available:', siteFontPackagesError);
    }

    return tokens;
  }

  /**
   * Parse the site font packages response
   */
  private async parseSiteFontPackagesResponse(response: any, currentWebUrl: string): Promise<IBrandFontToken[]> { // eslint-disable-line @typescript-eslint/no-explicit-any
    const contentType = response.headers.get('content-type');
    
    // Check if the response is JSON
    if (contentType?.includes('application/json')) {
      return await this.processJsonFontPackagesResponse(response, currentWebUrl);
    } 
    // Check if the response is Atom XML feed
    else if (contentType?.includes('application/atom+xml')) {
      return await this.processAtomXmlFontPackagesResponse(response, currentWebUrl);
    } 
    else {
      // Response is not JSON or Atom XML, likely an error response
      const responseText = await response.text();
      console.debug('Site font packages returned unexpected response:', responseText.substring(0, 200));
      return [];
    }
  }

  /**
   * Process JSON response containing font packages
   */
  private async processJsonFontPackagesResponse(response: any, currentWebUrl: string): Promise<IBrandFontToken[]> { // eslint-disable-line @typescript-eslint/no-explicit-any
    const tokens: IBrandFontToken[] = [];
    const siteFontPackagesData = await response.json();
    
    if (siteFontPackagesData?.d?.results) {
      for (const fontPackage of siteFontPackagesData.d.results) {
        if (fontPackage.ID && !fontPackage.IsHidden && fontPackage.IsValid) {
          const fontTokens = await this.processSiteFontPackage(fontPackage, currentWebUrl);
          if (fontTokens.length > 0) {
            tokens.push(...fontTokens);
          }
        }
      }
    }

    return tokens;
  }

  /**
   * Process Atom XML response containing font packages
   */
  private async processAtomXmlFontPackagesResponse(response: any, currentWebUrl: string): Promise<IBrandFontToken[]> { // eslint-disable-line @typescript-eslint/no-explicit-any
    const tokens: IBrandFontToken[] = [];
    
    try {
      const xmlText = await response.text();
      
      // Parse the Atom XML feed - look for entry elements
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
      
      // Check for parsing errors
      const parserErrors = xmlDoc.getElementsByTagName('parsererror');
      if (parserErrors.length > 0) {
        console.debug('XML parsing error:', parserErrors[0].textContent);
        return tokens;
      }
      
      // Look for entry elements in the Atom feed
      const entries = xmlDoc.getElementsByTagName('entry');
      
      for (const entry of Array.from(entries)) {
        const fontPackage = this.parseAtomEntry(entry);
        
        if (fontPackage?.ID && !fontPackage.IsHidden && fontPackage.IsValid) {
          const fontTokens = await this.processSiteFontPackage(fontPackage, currentWebUrl);
          if (fontTokens.length > 0) {
            tokens.push(...fontTokens);
          }
        }
      }
    } catch (xmlParseError) {
      console.debug('Could not parse Atom XML response:', xmlParseError);
    }
    
    return tokens;
  }

  /**
   * Parse an Atom entry element to extract font package data
   */
  private parseAtomEntry(entry: Element): any { // eslint-disable-line @typescript-eslint/no-explicit-any
    try {
      const properties = entry.getElementsByTagName('m:properties')[0];
      if (!properties) {
        return null;
      }
      
      const getValue = (tagName: string): string | null => {
        const element = properties.getElementsByTagName(tagName)[0];
        return element?.textContent || null;
      };
      
      const getBoolValue = (tagName: string): boolean => {
        const value = getValue(tagName);
        return value === 'true';
      };
      
      return {
        ID: getValue('d:ID'),
        Title: getValue('d:Title'),
        IsHidden: getBoolValue('d:IsHidden'),
        IsValid: getBoolValue('d:IsValid'),
        PackageJson: getValue('d:PackageJson')
      };
    } catch (parseError) {
      console.debug('Could not parse Atom entry:', parseError);
      return null;
    }
  }

  /**
   * Process a site font package and extract font tokens
   */
  private async processSiteFontPackage(fontPackage: any, webUrl: string): Promise<IBrandFontToken[]> { // eslint-disable-line @typescript-eslint/no-explicit-any
    const tokens: IBrandFontToken[] = [];
    
    try {
      // Parse the PackageJson to get font information
      if (fontPackage.PackageJson) {
        const packageData = JSON.parse(fontPackage.PackageJson);
        
        // Create a single token for the entire font package
        const packageTitle = fontPackage.Title; // Use the title as is
        
        // Determine the primary font value to use for the package
        let primaryFontValue = `"${packageTitle}", sans-serif`;
        
        // Try to get the primary font from font slots or faces
        if (packageData.fontSlots) {
          // Prefer body font, then heading, then title, then label
          const preferenceOrder = ['body', 'heading', 'title', 'label'];
          for (const slotName of preferenceOrder) {
            const slot = packageData.fontSlots[slotName];
            if (slot?.fontFamily) {
              primaryFontValue = `"${slot.fontFamily}", sans-serif`;
              break;
            }
          }
        } else if (packageData.fontFaces && Array.isArray(packageData.fontFaces) && packageData.fontFaces.length > 0) {
          // Use the first font face if no slots are available
          const firstFontFace = packageData.fontFaces[0];
          if (firstFontFace?.fontFamily) {
            primaryFontValue = `"${firstFontFace.fontFamily}", sans-serif`;
          }
        }
        
        // Create a single token for this font package
        tokens.push({
          name: `siteFontPackage${fontPackage.ID.replace(/[^a-zA-Z0-9]/g, '')}`,
          displayName: packageTitle,
          value: primaryFontValue,
          preview: 'The quick brown fox jumps over the lazy dog',
          fileUrl: `${webUrl}/_api/SiteFontPackages/GetById('${fontPackage.ID}')`,
          category: 'site'
        });

        // If no specific fonts found, create a general token from the package title
        if (tokens.length === 0 && fontPackage.Title) {
          tokens.push({
            name: `siteFontPackage${fontPackage.ID.replace(/[^a-zA-Z0-9]/g, '')}`,
            displayName: `Brand Font: ${packageTitle}`,
            value: `"${packageTitle}", sans-serif`,
            preview: 'The quick brown fox jumps over the lazy dog',
            fileUrl: `${webUrl}/_api/SiteFontPackages/GetById('${fontPackage.ID}')`,
            category: 'site'
          });
        }
      }
    } catch (parseError) {
      console.debug(`Could not parse font package ${fontPackage.ID}:`, parseError);
      
      // Fallback: create token from title if JSON parsing fails
      if (fontPackage.Title) {
        const packageTitle = fontPackage.Title; // Use the title as is
        tokens.push({
          name: `siteFontPackage${fontPackage.ID.replace(/[^a-zA-Z0-9]/g, '')}`,
          displayName: `Brand Font: ${packageTitle}`,
          value: `"${packageTitle}", sans-serif`,
          preview: 'The quick brown fox jumps over the lazy dog',
          fileUrl: `${webUrl}/_api/SiteFontPackages/GetById('${fontPackage.ID}')`,
          category: 'site'
        });
      }
    }
    
    return tokens;
  }
}
