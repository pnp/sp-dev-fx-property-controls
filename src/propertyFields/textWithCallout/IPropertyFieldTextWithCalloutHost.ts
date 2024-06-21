import { IPropertyFieldHeaderCalloutProps } from '../../common/propertyFieldHeader/IPropertyFieldHeader';
import { ITextFieldProps } from '@fluentui/react/lib/TextField';

/**
 * PropertyFieldTextWithCalloutHost properties interface
 */
export interface IPropertyFieldTextWithCalloutHostProps extends ITextFieldProps, IPropertyFieldHeaderCalloutProps {
  onChanged?: (newValue: any) => void; // eslint-disable-line @typescript-eslint/no-explicit-any
}
