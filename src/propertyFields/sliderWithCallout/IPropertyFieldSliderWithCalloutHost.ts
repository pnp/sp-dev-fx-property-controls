import { IPropertyFieldHeaderCalloutProps } from '../../common/propertyFieldHeader/IPropertyFieldHeader';
import { ISliderProps } from '@fluentui/react/lib/components/Slider';

/**
 * PropertyFieldSliderWithCalloutHost properties interface
 */
export interface IPropertyFieldSliderWithCalloutHostProps extends ISliderProps, IPropertyFieldHeaderCalloutProps {
  debounce?: number;
}
