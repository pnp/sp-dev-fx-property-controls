import { IPropertyFieldNumberProps } from './IPropertyFieldNumber';

/**
* PropertyFieldNumberHost properties interface
*/
export interface IPropertyFieldNumberHostProps extends IPropertyFieldNumberProps {
  /**
   * Callback for the onChanged event.
   */
  onChanged?: (newValue: any) => void; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export interface IPropertyFieldNumberHostState {
  value: string;
  roundedValue?: number;
}
