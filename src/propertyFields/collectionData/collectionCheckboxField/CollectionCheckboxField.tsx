import * as React from 'react';
import styles from '../PropertyFieldCollectionDataHost.module.scss';
import { Checkbox } from 'office-ui-fabric-react/lib/components/Checkbox';
import { IBaseCollectionFieldProps } from '../IBaseCollectionFIeldsProps';

export interface ICollectionCheckboxFieldProps extends IBaseCollectionFieldProps { }

export const CollectionCheckboxField: React.FunctionComponent<ICollectionCheckboxFieldProps> = ({
  field,
  item,
  disableEdit,
  fOnValueChange,
  fValidation
}) => {

  const [errorMessage, setErrorMessage] = React.useState<string>();

  const onValueChange = React.useCallback(async (value: any) => {

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
    if (item && field) {
      onValueChange(item[field.id]);
    }
  }, []);

  if (!field || !item) {
    return <></>;
  }

  return <Checkbox checked={item[field.id] ? item[field.id] : false}
    onChange={async (e, v) => await onValueChange(v)}
    disabled={disableEdit}
    className={`PropertyFieldCollectionData__panel__boolean-field ${errorMessage ? styles.invalidField : ''}`} />;
};
