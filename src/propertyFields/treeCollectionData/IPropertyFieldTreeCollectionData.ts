import { IPropertyPaneCustomFieldProps } from "@microsoft/sp-property-pane";
import { ITreeItem } from "@pnp/spfx-controls-react/lib/TreeView";
import { ICustomCollectionField } from "../collectionData/ICustomCollectionField";
import { BaseCustomTreeItem } from "./ICustomTreeItem";
import { IPropertyTreeBaseProps } from "./IPropertyTreeBaseProps";

export interface IPropertyFieldTreeCollectionDataProps extends IPropertyTreeBaseProps {

  /**
   * The fields to be used for the list of collection data.
   * Fields can be the same for every level or a function that will determine the fields based on item? and level(depth of tree)
   */
  fields: ICustomCollectionField[] | ((item: ITreeItem, items: ITreeItem[], parentItem?: ITreeItem) => ICustomCollectionField[]);
  /**
   * The collection data value.
   */
  value: BaseCustomTreeItem<object>[];
}

export interface IPropertyFieldTreeCollectionDataPropsInternal extends IPropertyPaneCustomFieldProps, IPropertyFieldTreeCollectionDataProps { }
