import { FilePickerTabType, IFilePickerResult } from "./filePickerControls/FilePicker.types";
import { BaseComponentContext } from '@microsoft/sp-component-base';

/**
 * Public properties of PropertyFieldFilePicker custom field
 */
export interface IPropertyFieldFilePickerProps {

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
  onSave:(filePickerResult: IFilePickerResult) => void;

  /**
   * Handler when file has been changed.
   */
  onChanged?: (filePickerResult: IFilePickerResult) => void;

  /**
   * Handler when the file picker panel has been closed without selection of a file.
   */
   onCancel?: () => void;

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

  /**
   * Defines a onPropertyChange function to raise when the selected value changed.
   * Normally this function must be always defined with the 'this.onPropertyChange'
   * method of the web part object.
   */
  onPropertyChange(propertyPath: string, oldValue: any, newValue: any): void;
  /**
   * Parent Web Part properties
   */
  properties: any;
  /**
   * An unique key to identity this file picker control
   */
  key: string;

  /**
   * Web Part context
   */
  context: BaseComponentContext;

  /**
   * The data associated with the selected file
   */
  filePickerResult: IFilePickerResult;
  /**
   * Specifies if StockImagesTab should be hidden.
   */
  hideStockImages?: boolean;
}

export interface IPropertyFieldFilePickerPropsInternal extends IPropertyFieldFilePickerProps {
    targetProperty: string;
    onRender(elem: HTMLElement): void;
    onDispose(elem: HTMLElement): void;
}
