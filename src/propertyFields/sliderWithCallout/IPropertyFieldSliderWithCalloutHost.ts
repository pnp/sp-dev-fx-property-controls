import { IPropertyFieldHeaderCalloutProps } from '../../common/propertyFieldHeader/IPropertyFieldHeader';
import { ISliderProps } from '@fluentui/react/lib/Slider';

/**
 * PropertyFieldSliderWithCalloutHost properties interface
 */
export interface IPropertyFieldSliderWithCalloutHostProps extends ISliderProps, IPropertyFieldHeaderCalloutProps {
  debounce?: number;
}
