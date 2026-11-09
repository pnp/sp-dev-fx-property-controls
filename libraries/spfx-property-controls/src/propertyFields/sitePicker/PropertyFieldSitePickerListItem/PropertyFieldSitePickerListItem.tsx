import * as React from 'react';
import { IPropertyFieldSitePickerListItemProps } from './IPropertyFieldSitePickerListItem';
import { Checkbox } from '@fluentui/react/lib/Checkbox';
import styles from './PropertyFieldSitePickerListItem.module.scss';
import { toRelativeUrl } from '../../../helpers/GeneralHelper';

export const PropertyFieldSitePickerListItem = (props: IPropertyFieldSitePickerListItemProps): JSX.Element => {
  const { site, checked } = props;

  return (
    <li className={styles.siteListItem} key={site.url}>
      <Checkbox
        className={styles.checkbox}
        checked={checked}
        onChange={(ev?: React.FormEvent<HTMLElement | HTMLInputElement>, nowChecked?: boolean): void => props.handleCheckboxChange(site, nowChecked)}
      />
      <div className={styles.content}>
        <span className={styles.title} title={site.title}>{site.title}</span>
        <span className={styles.url} title={site.url}>{toRelativeUrl(site.url)}</span>
      </div>
    </li>
  );
};
