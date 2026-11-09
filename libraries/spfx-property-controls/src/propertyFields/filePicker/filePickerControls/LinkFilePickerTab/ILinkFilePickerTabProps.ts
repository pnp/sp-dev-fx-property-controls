import { IFilePickerTab } from "../FilePicker.types";
import { FilesSearchService } from "../../../../services/FilesSearchService";

export interface ILinkFilePickerTabProps extends IFilePickerTab {
  allowExternalLinks: boolean;
  fileSearchService: FilesSearchService;
  checkIfFileExists: boolean;
}
