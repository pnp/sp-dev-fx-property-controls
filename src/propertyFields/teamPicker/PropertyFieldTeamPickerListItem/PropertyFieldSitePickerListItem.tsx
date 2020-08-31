import * as React from 'react';
import { IPropertyFieldTeamPickerListItemProps } from './IPropertyFieldSitePickerListItem';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import styles from './PropertyFieldTeamPickerListItem.module.scss';

export const PropertyFieldTeamPickerListItem = (props: IPropertyFieldTeamPickerListItemProps): JSX.Element => {
  const { site, checked } = props;

  return (
    <li className={styles.teamListItem} key={site.id}>
      <Checkbox
        className={styles.checkbox}
        checked={checked}
        onChange={(ev?: React.FormEvent<HTMLElement | HTMLInputElement>, nowChecked?: boolean): void => props.handleCheckboxChange(site, nowChecked)}
      />
      <span className={styles.title} title={site.title}>{site.title}</span>
    </li>
  );
};