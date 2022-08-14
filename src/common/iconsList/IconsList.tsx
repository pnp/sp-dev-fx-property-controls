import * as React from 'react';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { getId } from 'office-ui-fabric-react/lib/Utilities';
import styles from './IconsList.module.scss';

const radioIdBase: string = getId('radio');

export interface IIconsListProps {
  onChange: (iconName: string) => void;
  icons: string[];
  selectedIconName?: string;
  listClassName?: string;
  iconClassName?: string;
}

export const IconsList: React.FunctionComponent<IIconsListProps> = ({
  onChange,
  icons,
  selectedIconName
}) => {

  const renderIcon = (iconName: string): JSX.Element => {
    const radioId: string = `${radioIdBase}-${iconName}`;
    return <li className={styles.iconItem}>
      <input type="radio" name={radioIdBase} id={radioId} className={styles.iconRadio}
        data-automation-id={`icon-picker-${iconName}`}
        checked={iconName === selectedIconName}
        onChange={() => onChange(iconName)} />
      <label className={styles.iconLabel} htmlFor={radioId} title={iconName}>
        <Icon iconName={iconName} className={styles.iconGlyph} />
        <span className={styles.iconName}>{iconName}</span>
      </label>
    </li>;
  };

  return <ul className={styles.iconList}>
    {icons.map(renderIcon)}
  </ul>;
};