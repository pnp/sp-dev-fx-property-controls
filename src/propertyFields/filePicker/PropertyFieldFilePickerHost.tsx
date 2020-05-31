import * as React from 'react';

import { FilePicker, IFilePickerResult } from './filePickerControls';

import styles from './PropertyFieldFilePickerHost.module.scss';

import {
  IPropertyFieldFilePickerHostProps,
} from './IPropertyFieldFilePickerHost';
import { GeneralHelper } from '../../../lib/helpers/GeneralHelper';

/**
 * Renders the controls for PropertyFieldImagePicker component
 */
export default class PropertyFieldFilePickerHost extends React.Component<IPropertyFieldFilePickerHostProps, { filePickerResult: IFilePickerResult }> {
  /**
   * Constructor method
   */
  constructor(props: IPropertyFieldFilePickerHostProps) {
    super(props);
    this.state = {
      filePickerResult: props.filePickerResult ? props.filePickerResult : null
    }
  }

  public componentWillReceiveProps(nextProps: IPropertyFieldFilePickerHostProps) {
    if (nextProps !== this.props) {
      this.setState({
        filePickerResult: nextProps.filePickerResult
      });
    }
  }

  /**
   * Renders the FilePicker control
   */
  public render(): JSX.Element {
    return (
      <div>
        {this.state.filePickerResult && this.state.filePickerResult.fileAbsoluteUrl && (
          <div className={styles.singlePreview}>
            {GeneralHelper.isImage(this.state.filePickerResult.fileName) &&
              <img className={styles.singlePreviewImage} src={this.state.filePickerResult.fileAbsoluteUrl} alt={this.state.filePickerResult.fileName} />
            }
            <div>
              {this.state.filePickerResult.fileName}
            </div>
          </div>
        )}

        <FilePicker
          required={this.props.required}
          disabled={this.props.disabled}
          bingAPIKey={this.props.bingAPIKey}
          accepts={this.props.accepts ? this.props.accepts : []}
          buttonIcon="FileImage"
          onSave={(filePickerResult: IFilePickerResult) => { this.setState({ filePickerResult: filePickerResult }); this.props.onSave(filePickerResult); }}
          onChanged={(filePickerResult: IFilePickerResult) => { this.setState({ filePickerResult: filePickerResult }); this.props.onChanged(filePickerResult); }}
          context={this.props.context}
          filePickerResult={this.props.filePickerResult}
          buttonClassName={this.props.buttonClassName}
          buttonLabel={this.props.buttonLabel}
          label={this.props.label}
          //existing filePickerResult absolute url for inline editing of url          
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

}
