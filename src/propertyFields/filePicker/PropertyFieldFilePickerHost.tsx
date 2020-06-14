import * as React from 'react';
import { FilePicker, IFilePickerResult } from './filePickerControls';
import styles from './PropertyFieldFilePickerHost.module.scss';
import { IPropertyFieldFilePickerHostProps } from './IPropertyFieldFilePickerHost';
import { GeneralHelper } from '../../../lib/helpers/GeneralHelper';
import * as telemetry from '../../common/telemetry';

export default class PropertyFieldFilePickerHost extends React.Component<IPropertyFieldFilePickerHostProps> {

  constructor(props: IPropertyFieldFilePickerHostProps) {
    super(props);

    telemetry.track('PropertyFieldFilePicker', {
      disabled: props.disabled
    });

  }

  public render(): JSX.Element {
    return (
      <div>
        {this.props.filePickerResult && this.props.filePickerResult.fileAbsoluteUrl && (
          <div className={styles.singlePreview}>
            {GeneralHelper.isImage(this.props.filePickerResult.fileName) &&
              <img className={styles.singlePreviewImage} src={this.props.filePickerResult.fileAbsoluteUrl} alt={this.props.filePickerResult.fileName} />
            }
            <div>
              {this.props.filePickerResult.fileName}
            </div>
          </div>
        )}

        <FilePicker
          required={this.props.required}
          disabled={this.props.disabled}
          bingAPIKey={this.props.bingAPIKey}
          accepts={this.props.accepts ? this.props.accepts : []}
          buttonIcon={this.props.buttonIcon ? this.props.buttonIcon : "FileImage"}
          onSave={(filePickerResult: IFilePickerResult) => { this.handleFileSave(filePickerResult); }}
          onChanged={(filePickerResult: IFilePickerResult) => { this.handleFileChange(filePickerResult); }}
          context={this.props.context}
          filePickerResult={this.props.filePickerResult}
          buttonClassName={this.props.buttonClassName}
          buttonLabel={this.props.buttonLabel}
          label={this.props.label}
          key={this.props.key}
          itemsCountQueryLimit={this.props.itemsCountQueryLimit !== undefined ? this.props.itemsCountQueryLimit : 100}
          hideWebSearchTab={this.props.hideWebSearchTab !== undefined ? this.props.hideWebSearchTab : true}
          hideRecentTab={this.props.hideRecentTab !== undefined ? this.props.hideRecentTab : false}
          hideSiteFilesTab={this.props.hideSiteFilesTab !== undefined ? this.props.hideSiteFilesTab : false}
          hideLocalUploadTab={this.props.hideLocalUploadTab !== undefined ? this.props.hideLocalUploadTab : false}
          hideLinkUploadTab={this.props.hideLinkUploadTab !== undefined ? this.props.hideLinkUploadTab : false}
          hideOneDriveTab={this.props.hideOneDriveTab !== undefined ? this.props.hideOneDriveTab : false}
          hideOrganisationalAssetTab={this.props.hideOrganisationalAssetTab !== undefined ? this.props.hideOrganisationalAssetTab : false}
          panelClassName={this.props.panelClassName}
          storeLastActiveTab={this.props.storeLastActiveTab}
        />
      </div>
    );
  }

  private handleFileSave = async (filePickerResult: IFilePickerResult): Promise<void> => {

    this.props.onSave(filePickerResult);

    this.props.properties[this.props.targetProperty] = filePickerResult;
    this.props.onPropertyChange(this.props.targetProperty, this.props.filePickerResult, filePickerResult);

    if (typeof this.props.onChange !== 'undefined' && this.props.onChange !== null) {
      this.props.onChange(this.props.targetProperty, filePickerResult);
    }
  }

  private handleFileChange = async (filePickerResult: IFilePickerResult): Promise<void> => {

    this.props.onChanged(filePickerResult);

    if (typeof this.props.onChange !== 'undefined' && this.props.onChange !== null) {
      this.props.onChange(this.props.targetProperty, filePickerResult);
    }
  }

}
