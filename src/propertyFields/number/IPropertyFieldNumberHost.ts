import { IPropertyFieldNumberProps } from './IPropertyFieldNumber';

/**
* PropertyFieldNumberHost properties interface
*/
export interface IPropertyFieldNumberHostProps extends IPropertyFieldNumberProps {
  /**
   * Callback for the onChanged event.
   */
  onChanged?: (newValue: any) => void;
}

export interface IPropertyFieldNumberHostState {
  value: string;
}
