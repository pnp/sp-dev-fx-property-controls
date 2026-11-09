import * as React from 'react';
import styles from '../PropertyFieldCollectionDataHost.module.scss';
import { ICollectionIconFieldProps } from '.';
import { TextField, Icon, ActionButton } from '@fluentui/react';
import { IconSelector } from '../../../common/iconSelector/IconSelector';

interface ICollectionIconFieldState {
  isPanelOpen?: boolean;
  errorMessage?: string;
}

export class CollectionIconField extends React.Component<ICollectionIconFieldProps, ICollectionIconFieldState> {
  constructor(props: ICollectionIconFieldProps) {
    super(props);

    this.state = {
      isPanelOpen: false
    };
  }

  public render(): React.ReactElement<ICollectionIconFieldProps> {
    const { field, item, renderMode } = this.props;
    const iconName = item[field.id] ? item[field.id] : '';
    const label = iconName || field.placeholder || field.title;
    return (
      <>
        {renderMode !== 'picker' &&
          <div className={`PropertyFieldCollectionData__panel__icon-field ${styles.iconField}`}>
            <TextField placeholder={field.placeholder || field.title}
              className={styles.collectionDataField}
              value={iconName}
              required={field.required}
              onChange={async (e, value) => await this.props.fOnValueChange(field.id, value)}
              deferredValidationTime={field.deferredValidationTime || field.deferredValidationTime >= 0 ? field.deferredValidationTime : 200}
              onGetErrorMessage={async (value) => await this.props.fValidation(this.props.field, value)}
              disabled={this.props.disableEdit} />
            <Icon iconName={item[field.id] ? item[field.id] : ""} />
          </div>
        }
        {renderMode === 'picker' &&
          <div className={`PropertyFieldCollectionData__panel__icon-field ${styles.collectionDataField} ${styles.iconPicker}`}>
            <ActionButton 
              required={field.required}
              disabled={this.props.disableEdit} 
              onClick={this._onSelectIconClick}
              title={label}
              ariaLabel={label}
              styles={{
                root: {
                  padding: '0px',
                  textAlign: 'left',
                },
                icon: {
                  marginLeft: '0px'
                },
                label: {
                  whiteSpace: 'nowrap',
                  marginLeft: iconName ? 'inherit' : '0px',
                  display: 'block',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: '80px'
                }
              }}
              iconProps={{
                iconName: iconName
              }}>
              {label}
            </ActionButton>
            {field.required && <span className={styles.requiredField}>*</span>}
            <IconSelector
              currentIcon={iconName}
              renderOption='panel'
              isOpen={this.state.isPanelOpen}
              onSave={this._onIconChage}
              onDismiss={this._onPanelDismiss}
               />
          </div>
        }
      </>
    );
  }

  private _onSelectIconClick = (): void => {
    this.setState({
      isPanelOpen: true
    });
  }

  private _onIconChage = async (iconName: string): Promise<void> => {
    const { field } = this.props;
    this.setState({
      isPanelOpen: false
    });
    await this.props.fOnValueChange(field.id, iconName);
    const errorMessage = await this.props.fValidation(field, iconName);
    this.setState({
      errorMessage: errorMessage
    });
  }

  private _onPanelDismiss = (): void => {
    this.setState({
      isPanelOpen: false
    });
  }
}
