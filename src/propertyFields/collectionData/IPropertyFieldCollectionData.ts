import { IPropertyPaneCustomFieldProps } from "@microsoft/sp-webpart-base";
import { ICustomCollectionField } from ".";

export interface IPropertyFieldCollectionDataProps {
  key: string;
  label: string;
  description?: string;
  panelHeader: string;
  manageBtnLabel: string;
  fields: ICustomCollectionField[];
  value: any[];
  disabled: boolean;
}

export interface IPropertyFieldCollectionDataPropsInternal extends IPropertyPaneCustomFieldProps, IPropertyFieldCollectionDataProps {}
