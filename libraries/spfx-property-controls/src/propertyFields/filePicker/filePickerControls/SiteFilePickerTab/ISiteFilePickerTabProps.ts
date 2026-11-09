import { IFilePickerTab } from "..";
import { FileBrowserService } from "../../../../services/FileBrowserService";
import { IBreadcrumbItem } from "@fluentui/react/lib/Breadcrumb";

export interface ISiteFilePickerTabProps extends IFilePickerTab {
  fileBrowserService: FileBrowserService;
  includePageLibraries?: boolean;

  /**
   * Represents the base node in the breadrumb navigation
   */
  breadcrumbFirstNode?: IBreadcrumbItem;
}
