import { BaseComponentContext } from '@microsoft/sp-component-base';
import { FilePickerTabType, IFilePickerResult } from "./FilePicker.types";

export interface IFilePickerProps {
  /**
   * Specifies the text describing the file picker
   */
  label?: string;
  /**
   * Specifies the label of the file picker button
   */
  buttonLabel?: string;

  /**
   * Specifies the icon to be used to display Icon Button.
   */
  buttonIcon?: string;

  /**
   * Handler when the file has been selected
   */
  onSave:(filePickerResult: IFilePickerResult)=>void;

  /**
   * Handler when file has been changed.
   */
  onChanged?: (filePickerResult: IFilePickerResult) => void;

  /**
   * Handler when the file picker panel has been closed without selection of a file.
   */
  onCancel: () => void;

  /**
   * ClassName to be applied to the opener button element.
   */
  buttonClassName?: string;

  /**
   * ClassName to be applied to the Panel root element.
   */
  panelClassName?: string;

  /**
   * File extensions to be displayed.
   */
  accepts?: string[];

  /**
   * Sets the label to inform that the value is required.
   */
  required?: boolean;

  /**
   * Used to execute WebSearch. If not provided SearchTab will not be available.
   */
  bingAPIKey?: string;

  /**
   * Specifies if the picker button is disabled
   */
  disabled?: boolean;

  /**
   * Number of itmes to obtain when executing REST queries. Default 100.
   */
  itemsCountQueryLimit?: number;

  /**
   * Specifies if RecentTab should be hidden.
   */
  hideRecentTab?: boolean;

  /**
   * Specifies if WebSearchTab should be hidden.
   */
  hideWebSearchTab?: boolean;

  /**
   * Specifies if OrganisationalAssetTab should be hidden.
   */
  hideOrganisationalAssetTab?: boolean;

  /**
   * Specifies if OneDriveTab should be hidden.
   */
  hideOneDriveTab?: boolean;

  /**
   * Specifies if SiteFilesTab should be hidden.
   */
  hideSiteFilesTab?: boolean;

  /**
   * Specifies if LocalUploadTab should be hidden.
   */
  hideLocalUploadTab?: boolean;

  /**
   * Specifies if LinkUploadTab should be hidden.
   */
  hideLinkUploadTab?: boolean;

  /**
   * Specifies if last active tab will be stored after the Upload panel has been closed.
   * Note: the value of selected tab is stored in the queryString hash.
   * @default true
   */
  storeLastActiveTab?: boolean;

  /**
   * Specifies a default active tab. If none is specified, it will default to "RecentTab" regardless if it's hidden or not.
   */
   defaultSelectedTab?: FilePickerTabType;

  filePickerResult: IFilePickerResult;

  context: BaseComponentContext;

  /**
   * Specifies if StockImagesTab should be hidden.
   */
  hideStockImages?: boolean;

  /**
   * Specifies if external links are allowed
   */
  allowExternalLinks?: boolean;
  /**
   * Specifies if file check should be done
   */
   checkIfFileExists?: boolean;
  /**
   * Specifies if Site Pages is displayed in the Site Tab
   */
   includePageLibraries?: boolean;
}
