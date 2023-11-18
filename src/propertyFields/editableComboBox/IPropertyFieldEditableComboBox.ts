import { IPropertyPaneCustomFieldProps } from '@microsoft/sp-property-pane';
import { IComboBoxOption } from '@fluentui/react/lib/ComboBox';

/**
 * @interface IPropertyFieldEditableComboBoxProps
 * @description Public properties of the PropertyFieldEditableComboBox custom field
 */
export interface IPropertyFieldEditableComboBoxProps {
  /**
   * @property disabled
   * @type boolean
   * @description whether or not the control is disabled
   */
  disabled: boolean;

  /**
   * @property label
   * @type string
   * @description Label text above the control
   */
  label: string;

  /**
   * @property selectedText
   * @type string
   * @description The default value to select of the options provided
   */
  selectedText: string;

  /**
   * @property maxFillInLenth
   * @type number | undefined
   * @description maximum length of text allowed for fill-ins (unlimited if undefined) - automatically caps typing after this number
   */
  maxFillInLength: number | undefined;

  /**
   * @property showTooltip
   * @type boolean
   * @description places a tooltip to the right of the label for additional description of the information being used to fille this combo box
   */
  showTooltip: boolean;

  /**
   * @property tooltipText
   * @type string
   * @description the actual text of the tooltip - will only show up if `showTooltip` is set to `true`
   */
  tooltipText: string;

  /**
   * @property options
   * @type IComboBoxOption[]
   * @description the initial list of options to load into the combo box
   */
  options: IComboBoxOption[];

  /**
   * @property onPropertyChange
   * @type (propertyPath: string, oldValue: any, newValue: any) => void
	 * @description Defines an onPropertyChange function to raise when the selected value changes.
	 * Normally this function must be defined with the 'this.onPropertyChange'
	 * method of the web part object.
	 */
	onPropertyChange: (propertyPath: string, oldValue: any, newValue: any) => void; // eslint-disable-line @typescript-eslint/no-explicit-any

  /**
   * @property onOptionAdded
   * @type (category: string) => void
   * @description event handler for when a NEW value was added to the list of options, in the event that the caller wants to add this to an outside source
   */
  onOptionAdded: (text: string) => void;

  /**
   * @property key
   * @type string
	 * @description An UNIQUE key indicates the identity of this control
	 */
	key: string;

	/**
   * @property properties
   * @type any
	 * @description Parent Web Part properties
	 */
	properties: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export interface IPropertyFieldEditableComboBoxPropsInternal extends IPropertyFieldEditableComboBoxProps, IPropertyPaneCustomFieldProps {
}
