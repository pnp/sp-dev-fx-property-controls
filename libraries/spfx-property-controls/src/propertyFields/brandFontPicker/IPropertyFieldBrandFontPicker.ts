import { IPropertyPaneCustomFieldProps } from '@microsoft/sp-property-pane';
import { BaseComponentContext } from '@microsoft/sp-component-base';

/**
 * Brand font token interface
 */
export interface IBrandFontToken {
  /**
   * The CSS variable name (e.g., "fontFamilyBase")
   */
  name: string;
  
  /**
   * The display name for the font
   */
  displayName: string;
  
  /**
   * The font family value (e.g., "Segoe UI, system-ui, sans-serif")
   */
  value: string;
  
  /**
   * Optional preview text
   */
  preview?: string;
  
  /**
   * Optional font file URL
   */
  fileUrl?: string;
  
  /**
   * Font source category
   */
  category?: 'site' | 'organization' | 'microsoft';
}

/**
 * Public properties of the PropertyFieldBrandFontPicker custom field
 */
export interface IPropertyFieldBrandFontPickerProps {
  /**
   * Property field label displayed on top
   */
  label: string;

  /**
   * Defines an onPropertyChange function to raise when the selected value changes.
   * Normally this function must be defined with the 'this.onPropertyChange'
   * method of the web part object.
   */
  onPropertyChange(propertyPath: string, oldValue: any, newValue: any): void; // eslint-disable-line @typescript-eslint/no-explicit-any

  /**
   * The initial selected font token name
   */
  initialValue?: string;

  /**
   * Whether the property pane field is enabled or not
   */
  disabled?: boolean;

  /**
   * The context object of the SPFx component
   */
  context: BaseComponentContext;

  /**
   * Custom properties object
   */
  properties?: any; // eslint-disable-line @typescript-eslint/no-explicit-any

  /**
   * An unique key that indicates the identity of this control
   */
  key?: string;

  /**
   * Whether the property pane field is visible or not
   */
  isHidden?: boolean;

  /**
   * Custom font tokens to use as fallback or override
   */
  customFontTokens?: IBrandFontToken[];

  /**
   * Callback function that will be called on font tokens loaded
   */
  onFontTokensLoaded?: (tokens: IBrandFontToken[]) => void;

  /**
   * Whether to show preview text in the dropdown
   */
  showPreview?: boolean;

  /**
   * Custom preview text to use
   */
  previewText?: string;

  /**
   * Error message to display when font tokens cannot be loaded
   */
  loadingErrorMessage?: string;

  /**
   * Whether to use system fonts as fallback when Brand Center is not available
   */
  useSystemFallback?: boolean;
}

/**
 * Private properties of the PropertyFieldBrandFontPicker custom field.
 * We separate public & private properties to include onRender & onDispose method waited
 * by the PropertyPane control without asking it from the developer
 */
export interface IPropertyFieldBrandFontPickerPropsInternal extends IPropertyPaneCustomFieldProps {
  label: string;
  initialValue?: string;
  targetProperty: string;
  context: BaseComponentContext;
  onPropertyChange(propertyPath: string, oldValue: any, newValue: any): void; // eslint-disable-line @typescript-eslint/no-explicit-any
  properties: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  disabled?: boolean;
  key: string;
  isHidden?: boolean;
  customFontTokens?: IBrandFontToken[];
  onFontTokensLoaded?: (tokens: IBrandFontToken[]) => void;
  showPreview?: boolean;
  previewText?: string;
  loadingErrorMessage?: string;
  useSystemFallback?: boolean;
}
