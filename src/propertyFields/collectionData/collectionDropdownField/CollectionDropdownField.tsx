import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import * as React from 'react';
import { ICustomCollectionField } from '..';
import { IBaseCollectionFieldProps } from '../IBaseCollectionFIeldsProps';
import styles from '../PropertyFieldCollectionDataHost.module.scss';

export interface ICollectionDropdownFieldProps extends IBaseCollectionFieldProps { }

export const CollectionDropdownField: React.FunctionComponent<ICollectionDropdownFieldProps> = ({
  field,
  item,
  disableEdit,
  fOnValueChange,
  fValidation
}) => {

  const [options, setOptions] = React.useState<IDropdownOption[]>();
  const [errorMessage, setErrorMessage] = React.useState<string>();



  const onValueChange = React.useCallback(async (value: string | number) => {

    if (!field) {
      return;
    }

    if (fOnValueChange) {
      await fOnValueChange(field.id, value);
    }

    if (fValidation) {
      const error = await fValidation(field, value);
      setErrorMessage(error);
    }
  }, [field, fOnValueChange, fValidation]);

  React.useEffect(() => {
    if (!field || !field.options) {
      return;
    }

    let newOptions: IDropdownOption[] = [];

    if (typeof (field.options) === 'function') {
      if (!item) {
        return;
      }
      newOptions = field.options(field.id, item);
    }
    else {
      newOptions = field.options.slice();
    }

    setOptions(newOptions);

  }, [field, item, field.options]);

  React.useEffect(() => {
    if (item && field) {
      onValueChange(item[field.id]);
    }
  }, []);

  if (!field || !item) {
    return <></>;
  }

  return <Dropdown placeHolder={field.placeholder || field.title}
    options={options}
    selectedKey={item[field.id] || null}
    required={field.required}
    disabled={disableEdit}
    onChange={(e, i) => { onValueChange(i.key); }}
    onRenderOption={field.onRenderOption}
    className={`PropertyFieldCollectionData__panel__dropdown-field ${errorMessage ? styles.invalidField : ''}`} />;
};
