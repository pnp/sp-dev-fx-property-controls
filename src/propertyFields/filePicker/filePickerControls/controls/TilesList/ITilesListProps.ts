import { FileBrowserService } from "../../../../../services/FileBrowserService";
import { IFile } from "../../../../../services/FileBrowserService.types";
import { Selection } from 'office-ui-fabric-react/lib/Selection';
import { IFilePickerResult } from "../../FilePicker.types";
import { BaseComponentContext } from "@microsoft/sp-component-base";

export interface ITilesListProps {
  fileBrowserService: FileBrowserService;
  filePickerResult: IFilePickerResult;
  selection: Selection;
  items: IFile[];
  context: BaseComponentContext;

  onFolderOpen: (item: IFile) => void;
  onFileSelected: (item: IFile) => void;
  onNextPageDataRequest: () => void;
}
