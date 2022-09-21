import { IPropertyFieldCollectionDataProps } from './IPropertyFieldCollectionData';

/**
 * PropertyFieldCollectionDataHost properties interface
 */
export interface IPropertyFieldCollectionDataHostProps extends IPropertyFieldCollectionDataProps {
  onChanged: (value: any[]) => void; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export interface IPropertyFieldCollectionDataHostState {
  panelOpen: boolean;
}
