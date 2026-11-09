import * as React from 'react';
import { IPropertyFieldTeamPickerListItemProps } from './IPropertyFieldTeamPickerListItem';
import { Checkbox } from '@fluentui/react/lib/Checkbox';
import styles from './PropertyFieldTeamPickerListItem.module.scss';

export const PropertyFieldTeamPickerListItem = (props: IPropertyFieldTeamPickerListItemProps): JSX.Element => {
  const { team, checked } = props;

  return (
    <li className={styles.teamListItem} key={team.id}>
      <Checkbox
        className={styles.checkbox}
        checked={checked}
        onChange={(ev?: React.FormEvent<HTMLElement | HTMLInputElement>, nowChecked?: boolean): void => props.handleCheckboxChange(team, nowChecked)}
      />
      <span className={styles.title} title={team.title}>{team.title}</span>
    </li>
  );
};
