import { ICustomCollectionField, IPropertyFieldCollectionDataProps } from '.';

/**
 * PropertyFieldCollectionDataHost properties interface
 */
export interface IPropertyFieldCollectionDataHostProps extends IPropertyFieldCollectionDataProps {
  onChanged: (value: any[]) => void;
}

export interface IPropertyFieldCollectionDataHostState {
  panelOpen: boolean;
}
