import { BaseComponentContext } from '@microsoft/sp-component-base';
import { SPHttpClient } from "@microsoft/sp-http";
import { IFolderExplorerService, IFolder } from "./IFolderExplorerService";

export class FolderExplorerService implements IFolderExplorerService {

  private context: BaseComponentContext;

  constructor(context: BaseComponentContext) {
    this.context = context;
  }

  /**
   * Get libraries within a given site
   * @param webAbsoluteUrl - the url of the target site
   */
  public getDocumentLibraries = async (webAbsoluteUrl: string): Promise<IFolder[]> => {
    let results: IFolder[] = [];
    try {
      const url = `${webAbsoluteUrl}/_api/web/lists?$filter=BaseTemplate eq 101 and Hidden eq false&$expand=RootFolder&$select=Title,RootFolder/ServerRelativeUrl&$orderby=Title`;
      const response = await this.context.spHttpClient.get(url, SPHttpClient.configurations.v1);

      if (!response.ok) {
        throw new Error(`Something went wrong when retrieving libraries. Status='${response.status}'`);
      }

      const data = await response.json();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const libraries: any[] = data.value;

      results = libraries.map((library): IFolder => {
        return { Name: library.Title, ServerRelativeUrl: library.RootFolder.ServerRelativeUrl };
      });
    } catch (error) {
      console.error('Error loading libraries', error);
    }
    return results;
  }

  /**
   * Get folders within a given library or sub folder
   * @param webAbsoluteUrl - the url of the target site
   * @param folderRelativeUrl - the relative url of the folder
   */
  public getFolders = async (webAbsoluteUrl: string, folderRelativeUrl: string): Promise<IFolder[]> => {
    let results: IFolder[] = [];
    try {
      const escapedPath = folderRelativeUrl.replace(/'/g, "''");
      const url = `${webAbsoluteUrl}/_api/web/GetFolderByServerRelativePath(decodedUrl='${escapedPath}')/Folders?$select=Name,ServerRelativeUrl&$orderby=Name`;
      const response = await this.context.spHttpClient.get(url, SPHttpClient.configurations.v1);

      if (!response.ok) {
        throw new Error(`Something went wrong when retrieving folders. Status='${response.status}'`);
      }

      const data = await response.json();
      const foldersResult: IFolder[] = data.value;
      results = foldersResult.filter(f => f.Name !== "Forms");
    } catch (error) {
      console.error('Error loading folders', error);
    }
    return results;
  }

  /**
   * Create a new folder
   * @param webAbsoluteUrl - the url of the target site
   * @param folderRelativeUrl - the relative url of the base folder
   * @param name - the name of the folder to be created
   */
  public addFolder = async (webAbsoluteUrl: string, folderRelativeUrl: string, name: string): Promise<IFolder> => {
    let folder: IFolder = null;
    try {
      // Escape single quotes for the path parameter, but don't encode the slashes
      const escapedPath = folderRelativeUrl.replace(/'/g, "''");
      // For the folder name, escape single quotes
      const escapedName = name.replace(/'/g, "''");
      const url = `${webAbsoluteUrl}/_api/web/GetFolderByServerRelativePath(decodedUrl='${escapedPath}')/AddSubFolderUsingPath(decodedUrl='${escapedName}')`;
      const response = await this.context.spHttpClient.post(url, SPHttpClient.configurations.v1, {});

      if (!response.ok) {
        throw new Error(`Something went wrong when adding folder. Status='${response.status}'`);
      }

      // AddSubFolderUsingPath returns 204 No Content on success (we could requery to get exact values if needed)
      folder = {
        Name: name,
        ServerRelativeUrl: `${folderRelativeUrl}/${name}`
      };

    } catch (error) {
      console.error('Error adding folder', error);
    }
    return folder;
  }
}