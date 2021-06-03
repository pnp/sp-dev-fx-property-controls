import { IPropertyFieldHeaderCalloutProps } from '../../common/propertyFieldHeader/IPropertyFieldHeader';
import { ITextFieldProps } from 'office-ui-fabric-react/lib/components/TextField';

/**
 * PropertyFieldTextWithCalloutHost properties interface
 */
export interface IPropertyFieldTextWithCalloutHostProps extends ITextFieldProps, IPropertyFieldHeaderCalloutProps {
    onChanged?: (newValue: any) => void;
}
