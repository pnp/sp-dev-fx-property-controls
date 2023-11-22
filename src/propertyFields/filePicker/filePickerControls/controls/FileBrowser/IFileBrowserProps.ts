import { BaseComponentContext } from "@microsoft/sp-component-base";
import { FileBrowserService } from "../../../../../services/FileBrowserService";
import { IFile } from "../../../../../services/FileBrowserService.types";
import { IFilePickerResult } from "../../FilePicker.types";

export interface IFileBrowserProps {
  fileBrowserService: FileBrowserService;
  libraryName: string;
  libraryId: string;
  folderPath: string;
  accepts: string[];
  context: BaseComponentContext;
  onChange: (filePickerResult: IFilePickerResult) => void;
  onOpenFolder: (folder: IFile) => void;
}
