import * as React from 'react';
import { IPropertyPanePropertyEditorHostProps, IPropertyPanePropertyEditorHostState } from './IPropertyPanePropertyEditorHost';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { PrimaryButton, DefaultButton, IButtonProps, IconButton } from 'office-ui-fabric-react/lib/Button';
import AceEditor from 'react-ace';
import { set } from '@microsoft/sp-lodash-subset';
import * as telemetry from '../../common/telemetry';
import styles from './PropertyPanePropertyEditorHost.module.scss';
import * as strings from 'PropertyControlStrings';
import { GeneralHelper, getPropertyValue, setPropertyValue } from '../../helpers/GeneralHelper';
import { DynamicProperty } from '@microsoft/sp-component-base';


export default class PropertyPanePropertyEditorHost extends React.Component<IPropertyPanePropertyEditorHostProps, IPropertyPanePropertyEditorHostState> {

  private previousValue: string;
  private cancel: boolean = true;
  private fileRef: HTMLInputElement = null;

  constructor(props: IPropertyPanePropertyEditorHostProps, state: IPropertyPanePropertyEditorHostState) {
    super(props);

    telemetry.track('PropertyWebPartInformation', {});

    this.state = {
      propertiesJson: this.getProperties(),
      errorMessage: undefined,
    };
  }

  private setFileRef = (element: HTMLInputElement) => {
    this.fileRef = element;
  }

  private getProperties = (): string => {
    let props = {};
    props = this.props.webpart.properties;
    return JSON.stringify(props);
  }

  /**
   * Called when the save button  gets clicked
   */
  private onSave = (): void => {
    const newProperties = JSON.parse(this.state.propertiesJson);
    for (let propName in newProperties) {
      // Do not update dynamic data properties
      const currentValue = getPropertyValue(this.props.webpart.properties, propName);


        if (currentValue?.__type === "DynamicProperty") {
          const currVal: DynamicProperty<any> = currentValue as DynamicProperty<any>;

          const newVal = newProperties[propName];
          if (GeneralHelper.isDefined(newVal.value)) {
            currVal.setValue(newVal.value);
          }
          if (GeneralHelper.isDefined(newVal.reference)) {
            currVal.setReference(newVal.reference._reference);
          }
        }
        else {
          setPropertyValue(this.props.webpart.properties, propName, newProperties[propName]);
        }

        if (typeof this.props.webpart.properties[propName].onChange !== 'undefined' && this.props.webpart.properties[propName].onChange !== null) {
          this.props.webpart.properties[propName].onChange(propName, newProperties[propName]);
        }
      }

    this.props.webpart.render();
    this.props.webpart.context.propertyPane.refresh();
    this.setState((current) => ({ ...current, openPanel: false }));
  }

  /**
   * Called when the properties editor changes
   */
  private onChange = (newValue: string, event?: any): void => {
    this.setState((current) => ({ ...current, propertiesJson: newValue }));
  }

  /**
   * Called to open the editor panel
   */
  private onOpenPanel = (): void => {

    // Store the current code value
    this.previousValue = JSON.stringify(this.props.webpart.properties, null, '\t');
    this.setState((current) => ({ ...current, propertiesJson: this.previousValue }));
    this.cancel = true;

    this.setState({
      openPanel: true,
    });
  }

  /**
  * Close the panel
  */
  private onClosePanel = (): void => {
    this.setState((crntState: IPropertyPanePropertyEditorHostState) => {
      const newState: IPropertyPanePropertyEditorHostState = {
        openPanel: false,
      };

      // Check if the property has to be reset
      if (this.cancel) {
        newState.propertiesJson = this.previousValue;
      }

      return newState;
    });
  }

  /**
   * Called when clicking 'Download'
   */
  private onDownload = (): void => {

    const a = document.createElement("a");
    document.body.appendChild(a);
    a.setAttribute("style", "display: none");
    a.setAttribute("data-interception", "off");
    const json = JSON.stringify(JSON.parse(this.state.propertiesJson), null, '\t'); // remove indentation
    const blob = new Blob([json], { type: "octet/stream" });
    const url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = "webpartproperties.json";
    a.click();
    window.URL.revokeObjectURL(url);
  }

  /**
   * Called when the changed event occurs on the file upload control
   */
  private onUpload = (): void => {
    if (this.fileRef.files.length > 0 && this.fileRef.files[0].type === "application/json") {
      let fileReader: FileReader = new FileReader();
      fileReader.readAsText(this.fileRef.files[0]);
      fileReader.onload = () => {
        let jsonString = fileReader.result as string;
        let json = JSON.parse(jsonString); // normalize as an object
        jsonString = JSON.stringify(json, null, '\t'); // and format as an indented string again
        this.setState((current) => ({ ...current, propertiesJson: jsonString }));
      };
    } else {
      alert(strings.JsonFileRequiredMessage);
    }
  }

  public render(): JSX.Element {
    return (
      <div>
        <DefaultButton onClick={this.onOpenPanel}>{strings.EditPropertiesButtonLabel}</DefaultButton>
        <Panel
          isOpen={this.state.openPanel}
          hasCloseButton={true}
          onDismiss={this.onClosePanel}
          isLightDismiss={true}
          type={PanelType.medium}
          headerText={strings.EditPropertiesPanelHeaderText}
          onRenderFooterContent={() => (
            <div className={styles.actions}>
              <div className="ms-Grid" dir="ltr">
                <div className="ms-Grid-row">
                  <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6 ms-textAlignLeft">
                    <PrimaryButton iconProps={{ iconName: 'Accept' }} text={strings.ApplyButtonLabel} value={strings.ApplyButtonLabel} onClick={this.onSave} />

                    <DefaultButton iconProps={{ iconName: 'Cancel' }} text={strings.CancelButtonLabel} value={strings.CancelButtonLabel} onClick={this.onClosePanel} />
                  </div>
                  <div className="ms-Grid-col ms-sm6 ms-md6 ms-lg6 ms-textAlignRight">
                    <DefaultButton color="ms-bgColor-themeLight" iconProps={{ iconName: 'Download' }} text={strings.ExportButtonLabel} value={strings.ExportButtonLabel} onClick={this.onDownload} />

                    <input type="file" id="uploadwebpartjson" ref={this.setFileRef} style={{ display: "none" }} onChange={this.onUpload} />

                    <DefaultButton iconProps={{ iconName: 'Upload' }} text={strings.ImportButtonLabel} value={strings.ImportButtonLabel} onClick={() => { this.fileRef.click(); }} />
                  </div>
                </div>
              </div>
            </div>
          )}>

          <AceEditor
            mode='ace/mode/json'
            theme="monokai"
            onChange={this.onChange}
            value={this.state.propertiesJson}
            name={`code-property-editor`}
            editorProps={{ $blockScrolling: true }}
          />
        </Panel>
      </div>
    );
  }
}
