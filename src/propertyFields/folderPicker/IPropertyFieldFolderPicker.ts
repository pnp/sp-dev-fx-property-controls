import { BaseComponentContext } from '@microsoft/sp-component-base';
import { IFolder } from '../../services/IFolderExplorerService';

export interface IPropertyFieldFolderPickerProps {
  /**
* Current context
*/
  siteAbsoluteUrl?: string;
  /**
 * Current context
 */
  context: BaseComponentContext;

  /**
   * The label for the control
   */
  label: string;

  /**
   * The lowest level folder that can be explored. This can be the root folder of a library.
   */
  rootFolder: IFolder;

  /**
   * The default folder to be explored
   */
  defaultFolder?: IFolder;

  /**
   * Is selection required
   */
  required?: boolean;

  /**
   * Is the control disabled
   */
  disabled?: boolean;

  /**
   * Allow current user to create folders on the target location. If enabled, you need to ensure that the user has the required permissions
   */
  canCreateFolders?: boolean;

  /**
   * Selected folder result
   */
  selectedFolder: IFolder;

  /**
   * Callback function called after a folder is selected
   * @argument folder The selected folder
   */
  onSelect: (folder: IFolder) => void;

  /**
   * Defines a onPropertyChange function to raise when the selected value changed.
   * Normally this function must be always defined with the 'this.onPropertyChange'
   * method of the web part object.
   */
  onPropertyChange(propertyPath: string, oldValue: any, newValue: any): void; // eslint-disable-line @typescript-eslint/no-explicit-any
  /**
   * Parent Web Part properties
   */
  properties: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  /**
   * An unique key to identity this file picker control
   */
  key: string;

}

export interface IPropertyFieldFolderPickerPropsInternal extends IPropertyFieldFolderPickerProps {
  targetProperty: string;
  onRender(elem: HTMLElement): void;
  onDispose(elem: HTMLElement): void;
}
