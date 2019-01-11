import { IPropertyFieldEnterpriseTermPickerProps, IPropertyFieldEnterpriseTermPickerPropsInternal, IPropertyFieldTermPickerProps } from "./IPropertyFieldTermPicker";
import { PropertyFieldTermPickerBuilder } from "./PropertyFieldTermPicker";
import PnPTermStorePickerService from "../../services/PnPTermStorePickerService";
import { IPropertyPaneField } from "@microsoft/sp-webpart-base";

/**
 * Helper method to create a Enterprise Term Picker on the PropertyPane.
 * @param targetProperty - Target property the Term Picker is associated to.
 * @param properties - Strongly typed Term Picker Picker properties.
 */
export function PropertyFieldEnterpriseTermPicker(targetProperty: string, properties: IPropertyFieldEnterpriseTermPickerProps): IPropertyPaneField<IPropertyFieldEnterpriseTermPickerPropsInternal> {
    // Calls the PropertyFieldEnterpriseTermPicker builder object
    // This object will simulate a PropertyFieldCustom to manage its rendering process

    const termPickerInternalProps = properties as IPropertyFieldTermPickerProps;

    return new PropertyFieldTermPickerBuilder(targetProperty, {
      ...termPickerInternalProps,
      targetProperty: targetProperty,
      onRender: null,
      onDispose: null,
      termService: new PnPTermStorePickerService(properties, properties.context)
    });
  }