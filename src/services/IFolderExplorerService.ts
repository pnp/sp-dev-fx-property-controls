export interface IFolder {
  /**
   * Folder name
   */
  Name: string;

  /**
   * Server relative url of the folder
   */
  ServerRelativeUrl: string;
}

export interface IFolderExplorerService {

  /**
 * Get libraries within a given site
 * @param webAbsoluteUrl - the url of the target site
 */
  getDocumentLibraries(webAbsoluteUrl: string): Promise<IFolder[]>;


  /**
  * Get folders within a given library or sub folder
  * @param webAbsoluteUrl - the url of the target site
  * @param folderRelativeUrl - the relative url of the folder
  */
  getFolders(webAbsoluteUrl: string, folderRelativeUrl: string): Promise<IFolder[]>;

  /**
  * Create a new folder
  * @param webAbsoluteUrl - the url of the target site
  * @param folderRelativeUrl - the relative url of the base folder
  * @param name - the name of the folder to be created
  */
  addFolder(webAbsoluteUrl: string, folderRelativeUrl: string, name: string): Promise<IFolder>;
}
