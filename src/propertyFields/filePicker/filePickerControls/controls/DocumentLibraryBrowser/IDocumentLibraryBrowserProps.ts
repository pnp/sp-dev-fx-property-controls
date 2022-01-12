import { FileBrowserService } from "../../../../../services/FileBrowserService";
import { ILibrary } from "../../../../../services/FileBrowserService.types";

export interface IDocumentLibraryBrowserProps {
  fileBrowserService: FileBrowserService;
  displaySitePages?: boolean;
  onOpenLibrary: (selectedLibrary: ILibrary) => void;
}
