import { IPropertyPaneCustomFieldProps } from "@microsoft/sp-webpart-base";
import { ICustomCollectionField } from ".";

export interface IPropertyFieldCollectionDataProps {
  /**
   * An unique key that indicates the identity of this control.
   */
  key: string;
  /**
   * Property field label displayed on top.
   */
  label: string;
  /**
   * Label to be used as the header in the panel.
   */
  panelHeader: string;
  /**
   * Label of the button to open the panel.
   */
  manageBtnLabel: string;
  /**
   * The fields to be used for the list of collection data.
   */
  fields: ICustomCollectionField[];
  /**
   * The collection data value.
   */
  value: any[];
  /**
   * Specify if the control is disabled.
   */
  disabled?: boolean;
}

export interface IPropertyFieldCollectionDataPropsInternal extends IPropertyPaneCustomFieldProps, IPropertyFieldCollectionDataProps {}
