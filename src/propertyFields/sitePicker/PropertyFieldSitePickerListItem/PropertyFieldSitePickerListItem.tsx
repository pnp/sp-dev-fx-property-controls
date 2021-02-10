import * as React from 'react';
import { IPropertyFieldSitePickerListItemProps } from './IPropertyFieldSitePickerListItem';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import styles from './PropertyFieldSitePickerListItem.module.scss';

export const PropertyFieldSitePickerListItem = (props: IPropertyFieldSitePickerListItemProps): JSX.Element => {
  const { site, checked } = props;

  return (
    <li className={styles.siteListItem} key={site.url}>
      <Checkbox
        className={styles.checkbox}
        checked={checked}
        onChange={(ev?: React.FormEvent<HTMLElement | HTMLInputElement>, nowChecked?: boolean): void => props.handleCheckboxChange(site, nowChecked)}
      />
      <span className={styles.title} title={site.title}>{site.title}</span>
    </li>
  );
};
