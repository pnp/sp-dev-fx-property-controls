import * as React from 'react';
import { IPanelProps, Panel, PanelType } from '@fluentui/react/lib/Panel';
import { IconSelectorRenderOption } from '../Types';
import { IconsList } from '../iconsList/IconsList';
import * as strings from 'PropertyControlStrings';
import { SearchBox } from '@fluentui/react/lib/SearchBox';
import { IRenderFunction } from '@fluentui/react/lib/Utilities';
import debounce from 'lodash/debounce';
import styles from './IconSelector.module.scss';
import { FluentIconsService } from '../../services/FluentIconsService';
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';
import { Icon } from '@fluentui/react/lib/Icon';
import Dialog, { DialogFooter, DialogType } from '@fluentui/react/lib/Dialog';
import { initializeIcons } from '@fluentui/react/lib/Icons';

initializeIcons();

const _fluentIconsService: FluentIconsService = new FluentIconsService();
const _icons = _fluentIconsService.getAll();

export interface IIconSelectorProps {
  renderOption?: IconSelectorRenderOption;
  currentIcon?: string;
  panelClassName?: string;
  panelType?: PanelType;
  dialogType?: DialogType;
  isOpen?: boolean;
  onChange?: (iconName: string) => void;
  onDismiss?: () => void;
  onSave?: (iconName: string) => void;
}

export const IconSelector: React.FunctionComponent<IIconSelectorProps> = ({
  renderOption = 'panel',
  currentIcon,
  panelClassName,
  panelType = PanelType.medium,
  dialogType = DialogType.normal,
  isOpen,
  onChange,
  onDismiss,
  onSave
}) => {
  const [selectedIconName, setSelectedIconName] = React.useState<string>();
  const [icons, setIcons] = React.useState<string[]>();

  const onSelectedIconChange = React.useCallback((iconName: string) => {
    setSelectedIconName(iconName);
    if (onChange) {
      onChange(iconName);
    }
  }, [onChange]);

  const internalOnDismiss = React.useCallback(() => {
    setSelectedIconName(currentIcon);
    if (onDismiss) {
      onDismiss();
    }
  }, [currentIcon, onDismiss]);

  const onSearchAbort = React.useCallback(() => {
    setIcons(_icons);
  }, []);

  const onSearchChange = React.useCallback((searchText: string) => {
    let items: string[];
    if (searchText && searchText.trim().length > 2) {
      items = _fluentIconsService.search(searchText);
    } else {
      items = _fluentIconsService.getAll();
    }

    setIcons(items);
  }, []);

  const confirmSelection = React.useCallback(() => {
    if (onSave) {
      onSave(selectedIconName);
    }
  }, [selectedIconName]);

  const renderContent = (): JSX.Element => {
    return <div>
      <IconsList icons={icons} selectedIconName={selectedIconName} onChange={onSelectedIconChange} />
    </div>;
  };

  const renderPanelNav: IRenderFunction<IPanelProps> = (props: IPanelProps, defaultRender: IRenderFunction<IPanelProps>): JSX.Element => {
    return <div className={styles.navArea}>
      <h2 className={styles.headTitle}>{strings.SelectIcon}</h2>
      <SearchBox className={styles.searchBox}
        onAbort={onSearchAbort}
        data-automation-id={`icon-picker-search`}
        onSearch={debounce(onSearchChange, 300)}
        onChange={debounce((e, value) => onSearchChange(value), 300)} />
      <div className={styles.closeBtnContainer}>{defaultRender(props)}</div>
    </div>;
  };

  const renderPanelFooter: IRenderFunction<IPanelProps> = (): JSX.Element => {
    return <div className={styles.footer} data-automation-id={`icon-picker-footer`}>
      <PrimaryButton text={strings.SaveButtonLabel} onClick={confirmSelection} disabled={!selectedIconName} className={styles.btnSave} data-automation-id={`icon-picker-save`} />
      <div className={`${styles.selectionDisplay} ${selectedIconName ? 'noSelection' : ''}`}>
        <span className={styles.selectionLabel}>{strings.SelectedLabel}:</span>
        <Icon iconName={selectedIconName} className={styles.selectionIcon} />
      </div>
      <DefaultButton text={strings.CancelButtonLabel} onClick={internalOnDismiss} className={styles.btnCancel} data-automation-id={`icon-picker-close`} />
    </div>;
  };

  const renderPanel = (): JSX.Element => {
    return <Panel
      isOpen={isOpen}
      onDismiss={internalOnDismiss}
      type={panelType}
      data-automation-id={`icon-picker-panel`}
      closeButtonAriaLabel={strings.CloseButton}
      className={panelClassName}
      onRenderNavigation={renderPanelNav}
      onRenderFooterContent={renderPanelFooter}
      isFooterAtBottom={true}
    >
      {renderContent()}
    </Panel>;
  };

  const renderDialog = (): JSX.Element => {
    return <Dialog
      hidden={!isOpen}
      onDismiss={internalOnDismiss}
      isBlocking={true}
      containerClassName={styles.dialog}

      dialogContentProps={{
        type: dialogType,
        title: strings.SelectIcon,
        showCloseButton: true,
        className: panelClassName
      }}
    >
      <SearchBox className={styles.searchBox}
        onAbort={onSearchAbort}
        data-automation-id={`icon-picker-search`}
        onSearch={debounce(onSearchChange, 300)}
        onChange={debounce((e, value) => onSearchChange(value), 300)} />
      <div className={styles.dialogIconsContainer}>
        {renderContent()}
      </div>

      <DialogFooter>
        <div className={styles.dialogFooter}>
          <Icon iconName={selectedIconName} className={styles.dialogSelectedIcons} />
          <PrimaryButton className={styles.save} text={strings.SaveButtonLabel} onClick={confirmSelection} disabled={!selectedIconName} data-automation-id={`icon-picker-save`} />
          <DefaultButton text={strings.CancelButtonLabel} onClick={internalOnDismiss} className={styles.btnCancel} data-automation-id={`icon-picker-close`} />
        </div>
      </DialogFooter>
    </Dialog>;
  };

  React.useEffect(() => {
    setIcons(_icons);
  }, []);

  React.useEffect(() => {
    if (isOpen === false) {
      setIcons(_icons);
    }
  }, [isOpen]);

  React.useEffect(() => {
    setSelectedIconName(currentIcon);
  }, [currentIcon]);

  return (
    <>
      {renderOption === 'panel' ? renderPanel() : renderDialog()}
    </>
  );
};