import { IComboBoxOption } from 'office-ui-fabric-react/lib/ComboBox';

/**
 * @interface IPropertyFieldEditableComboBoxHostProps
 * @description Core properties settable for an editable combo box
 */
export interface IPropertyFieldEditableComboBoxHostProps
{
  disabled: boolean;
  label: string;
  options: IComboBoxOption[];
  selectedText: string;
  maxFillInLength: number | undefined;
  showTooltip: boolean;
  tooltipText: string;
  onOptionChanged: (text: string, wasAdded: boolean) => void;
}

/**
 * @interface IPropertyFieldEditableComboBoxHostState
 * @description Core state variables used by an editable combo box
 */
export interface IPropertyFieldEditableComboBoxHostState {
  options: IComboBoxOption[];
  selectedText: string | undefined;
}
