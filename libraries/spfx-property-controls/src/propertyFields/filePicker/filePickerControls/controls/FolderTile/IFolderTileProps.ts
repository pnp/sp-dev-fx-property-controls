import { IDimensions } from "../../../../../services/IOneDriveService";
import { IFile } from "../../../../../services/FileBrowserService.types";
import { BaseComponentContext } from "@microsoft/sp-component-base";

export interface IFolderTileProps {
  item: IFile;
  index: number;
  isSelected: boolean;
  pageWidth: number;
  onItemInvoked: (item: IFile) => void;
  tileDimensions: IDimensions;
  context: BaseComponentContext;
}
