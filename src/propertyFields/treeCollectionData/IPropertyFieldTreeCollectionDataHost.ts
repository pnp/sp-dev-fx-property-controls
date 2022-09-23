import { IPropertyFieldTreeCollectionDataProps } from '.';

/**
 * PropertyFieldTreeCollectionDataHost properties interface
 */
export interface IPropertyFieldTreeCollectionDataHostProps extends IPropertyFieldTreeCollectionDataProps {
  onChanged: (value: object[]) => void;
}

export interface IPropertyFieldTreeCollectionDataHostState {
  panelOpen: boolean;
}
