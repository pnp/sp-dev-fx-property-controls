import { ICustomTreeCollectionField, IPropertyFieldTreeCollectionDataProps } from '.';

/**
 * PropertyFieldTreeCollectionDataHost properties interface
 */
export interface IPropertyFieldTreeCollectionDataHostProps extends IPropertyFieldTreeCollectionDataProps {
  onChanged: (value: any[]) => void;
}

export interface IPropertyFieldTreeCollectionDataHostState {
  panelOpen: boolean;
}
