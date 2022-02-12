import { IFilePickerResult , FilePickerBreadcrumbItem} from "../FilePicker.types";

export interface ISiteFilePickerTabState {
  filePickerResult: IFilePickerResult;
  libraryAbsolutePath: string;
  libraryTitle: string;
  libraryId: string;
  libraryPath: string;
  folderName: string;

  breadcrumbItems: FilePickerBreadcrumbItem[];
}
