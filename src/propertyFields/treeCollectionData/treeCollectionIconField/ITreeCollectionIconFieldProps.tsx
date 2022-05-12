import { IBaseCollectionFieldProps } from "../IBaseTreeCollectionFieldsProps";

export type CollectionIconFieldRenderMode = 'textbox' | 'picker';

export interface ICollectionIconFieldProps extends IBaseCollectionFieldProps { 
  renderMode?: CollectionIconFieldRenderMode;
}
