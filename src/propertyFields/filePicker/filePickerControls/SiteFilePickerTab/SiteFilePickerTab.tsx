import * as React from 'react';
import { findIndex } from '@microsoft/sp-lodash-subset';
import { ISiteFilePickerTabProps, ISiteFilePickerTabState } from '.';
import { DocumentLibraryBrowser, FileBrowser } from '../controls';
import { PrimaryButton, DefaultButton } from '@fluentui/react/lib/Button';
import { Breadcrumb, IBreadcrumbItem } from '@fluentui/react/lib/Breadcrumb';
import { ScrollablePane } from '@fluentui/react/lib/ScrollablePane';
import { IFile, ILibrary } from '../../../../services/FileBrowserService.types';
import { Link } from '@fluentui/react/lib/Link';
import { IFilePickerResult, FilePickerBreadcrumbItem } from '../FilePicker.types';

import styles from './SiteFilePickerTab.module.scss';
import * as strings from 'PropertyControlStrings';

export default class SiteFilePickerTab extends React.Component<ISiteFilePickerTabProps, ISiteFilePickerTabState> {
  constructor(props: ISiteFilePickerTabProps) {
    super(props);

    // Add current site to the breadcrumb or the provided node
    const breadcrumbSiteNode: FilePickerBreadcrumbItem = this.props.breadcrumbFirstNode ? this.props.breadcrumbFirstNode : {
      isCurrentItem: true,
      text: props.context.pageContext.web.title,
      key: props.context.pageContext.web.id.toString()
    };
    breadcrumbSiteNode.onClick = () => { this.onBreadcrumpItemClick(breadcrumbSiteNode); };

    this.state = {
      filePickerResult: null,
      libraryAbsolutePath: undefined,
      libraryTitle: strings.DocumentLibraries,
      libraryId: '',
      libraryPath: undefined,
      folderName: strings.DocumentLibraries,
      breadcrumbItems: [breadcrumbSiteNode]
    };
  }

  public render(): React.ReactElement<ISiteFilePickerTabProps> {
    return (
      <div className={styles.tabContainer}>
        <div className={styles.tabHeaderContainer}>
          <Breadcrumb items={this.state.breadcrumbItems} /*onRenderItem={this.renderBreadcrumbItem}*/ className={styles.breadcrumbNav} />
        </div>
        <div className={styles.tabFiles}>
          {this.state.libraryAbsolutePath === undefined &&
            <div className={styles.scrollablePaneWrapper}>
              <ScrollablePane>
                <DocumentLibraryBrowser
                  fileBrowserService={this.props.fileBrowserService}
                  onOpenLibrary={(selectedLibrary: ILibrary) => this._handleOpenLibrary(selectedLibrary, true)}
                  includePageLibraries={this.props.includePageLibraries} />
              </ScrollablePane>
            </div>}
          {this.state.libraryAbsolutePath !== undefined &&
            <FileBrowser
              onChange={(filePickerResult: IFilePickerResult) => this._handleSelectionChange(filePickerResult)}
              onOpenFolder={(folder: IFile) => this._handleOpenFolder(folder, true)}
              fileBrowserService={this.props.fileBrowserService}
              libraryName={this.state.libraryTitle}
              libraryId={this.state.libraryId}
              folderPath={this.state.libraryPath}
              accepts={this.props.accepts}
              context={this.props.context}
            />}
        </div>
        <div className={styles.actionButtonsContainer}>
          <div className={styles.actionButtons}>
            <PrimaryButton
              disabled={!this.state.filePickerResult}
              onClick={() => this._handleSave()} className={styles.actionButton}>{strings.OpenButtonLabel}</PrimaryButton>
            <DefaultButton onClick={() => this._handleClose()} className={styles.actionButton}>{strings.CancelButtonLabel}</DefaultButton>
          </div>
        </div>
      </div>
    );
  }

  private renderBreadcrumbItem = (item: IBreadcrumbItem): JSX.Element => {
    return (
      <Link href={item.href} onClick={item.onClick} key={item.key} className={`ms-Link ms-Breadcrumb-itemLink ${styles.breadcrumbNavItem}`}>{item.text}</Link>
    );
  }

  /**
   * Handles breadcrump item click
   */
  private onBreadcrumpItemClick = (node: FilePickerBreadcrumbItem): void => {
    let { breadcrumbItems } = this.state;
    let breadcrumbClickedItemIndx = 0;
    // Site node clicked
    if (!node.libraryData && !node.folderData) {
      this.setState({
        libraryAbsolutePath: undefined,
        libraryPath: undefined,
        folderName: undefined
      });
    }
    // Check if it is folder item
    else if (node.folderData) {
      this._handleOpenFolder(node.folderData, false);
      // select which node has been clicked
      breadcrumbClickedItemIndx = findIndex(breadcrumbItems, item => item.folderData && item.folderData.absoluteUrl === node.key);
    }
    // Check if it is library node
    else if (node.libraryData) {
      this._handleOpenLibrary(node.libraryData, false);
      // select which node has been clicked
      breadcrumbClickedItemIndx = findIndex(breadcrumbItems, item => item.libraryData && item.libraryData.serverRelativeUrl === node.key);
    }
    // Trim nodes array
    breadcrumbItems = breadcrumbItems.slice(0, breadcrumbClickedItemIndx + 1);
    // Set new current node
    breadcrumbItems[breadcrumbItems.length - 1].isCurrentItem = true;

    this.setState({
      breadcrumbItems,
      filePickerResult: undefined
    });
  }

  /**
   * Is called when user selects a different file
   */
  private _handleSelectionChange = (filePickerResult: IFilePickerResult): void => {
    if (filePickerResult) {
      filePickerResult.downloadFileContent = () => { return this.props.fileBrowserService.downloadSPFileContent(filePickerResult.fileAbsoluteUrl, filePickerResult.fileName); };
    }
    // this.props.fileBrowserService
    this.setState({
      filePickerResult
    });
  }

  /**
   * Called when user saves
   */
  private _handleSave = (): void => {
    this.props.onSave(this.state.filePickerResult);
  }

  /**
   * Called when user closes tab
   */
  private _handleClose = (): void => {
    this.props.onClose();
  }

  /**
   * Triggered when user opens a file folder
   */
  private _handleOpenFolder = (folder: IFile, addBreadcrumbNode: boolean): void => {
    const { breadcrumbItems } = this.state;

    if (addBreadcrumbNode) {
      breadcrumbItems.map(item => { item.isCurrentItem = false; });
      const breadcrumbNode: FilePickerBreadcrumbItem = {
        folderData: folder,
        isCurrentItem: true,
        text: folder.name,
        key: folder.absoluteUrl
      };
      breadcrumbNode.onClick = () => { this.onBreadcrumpItemClick(breadcrumbNode); };
      breadcrumbItems.push(breadcrumbNode);
    }

    this.setState({
      filePickerResult: null,
      libraryPath: folder.serverRelativeUrl,
      folderName: folder.name,
      libraryAbsolutePath: folder.absoluteUrl,
      breadcrumbItems
    });
  }

  /**
   * Triggered when user opens a top-level document library
   */
  private _handleOpenLibrary = (library: ILibrary, addBreadcrumbNode: boolean): void => {
    const { breadcrumbItems } = this.state;
    if (addBreadcrumbNode) {
      breadcrumbItems.map(item => { item.isCurrentItem = false; });
      const breadcrumbNode: FilePickerBreadcrumbItem = {
        libraryData: library,
        isCurrentItem: true,
        text: library.title,
        key: library.serverRelativeUrl
      };
      breadcrumbNode.onClick = () => { this.onBreadcrumpItemClick(breadcrumbNode); };
      breadcrumbItems.push(breadcrumbNode);
    }
    this.setState({
      libraryAbsolutePath: library.absoluteUrl,
      libraryTitle: library.title,
      libraryId: library.id,
      libraryPath: library.serverRelativeUrl,
      breadcrumbItems
    });
  }
}
