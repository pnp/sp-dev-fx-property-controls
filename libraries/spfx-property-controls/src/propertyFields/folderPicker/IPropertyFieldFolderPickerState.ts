import { IFolder } from '../../services/IFolderExplorerService';

export interface IPropertyFieldFolderPickerState {
    showPanel: boolean;
    selectedFolder: IFolder;
}