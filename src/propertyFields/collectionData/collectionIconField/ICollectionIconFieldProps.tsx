import { IBaseCollectionFieldProps } from "../IBaseCollectionFIeldsProps";

export type CollectionIconFieldRenderMode = 'textbox' | 'picker';

export interface ICollectionIconFieldProps extends IBaseCollectionFieldProps { 
  renderMode?: CollectionIconFieldRenderMode;
}
