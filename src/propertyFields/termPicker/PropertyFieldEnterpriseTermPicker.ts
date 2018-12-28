import { IPropertyFieldTermPickerProps, IPropertyFieldTermPickerPropsInternal } from "./IPropertyFieldTermPicker";
import { PropertyFieldTermPickerBuilder } from "./PropertyFieldTermPicker";
import PnPTermStorePickerService from "../../services/PnPTermStorePickerService";
import { IPropertyPaneField } from "@microsoft/sp-webpart-base";

/**
 * Helper method to create a SPList Picker on the PropertyPane.
 * @param targetProperty - Target property the SharePoint list picker is associated to.
 * @param properties - Strongly typed SPList Picker properties.
 */
export function PropertyFieldEnterpriseTermPicker(targetProperty: string, properties: IPropertyFieldTermPickerProps): IPropertyPaneField<IPropertyFieldTermPickerPropsInternal> {
    // Calls the PropertyFieldTermPicker builder object
    // This object will simulate a PropertyFieldCustom to manage his rendering process
    return new PropertyFieldTermPickerBuilder(targetProperty, {
      ...properties,
      targetProperty: targetProperty,
      onRender: null,
      onDispose: null,
      termService: new PnPTermStorePickerService(properties, properties.context)
    });
  }