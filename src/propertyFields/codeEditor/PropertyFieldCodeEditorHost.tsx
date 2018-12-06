import * as React from 'react';
import { Async } from 'office-ui-fabric-react/lib/Utilities';
import { PrimaryButton, DefaultButton, IButtonProps,IconButton } from 'office-ui-fabric-react/lib/Button';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { IPropertyFieldCodeEditorPropsInternal } from './IPropertyFieldCodeEditor';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { IPropertyFieldCodeEditorHostProps, IPropertyFieldCodeEditorHostState } from './IPropertyFieldCodeEditorHost';
import styles from './PropertyFieldCodeEditorHost.module.scss';
import FieldErrorMessage from '../errorMessage/FieldErrorMessage';
import * as telemetry from '../../common/telemetry';
import * as strings from 'PropertyControlStrings';
import * as brace from 'brace';
import AceEditor from 'react-ace';
import 'brace/mode/json';
import 'brace/mode/javascript';
import 'brace/mode/sass';
import 'brace/mode/typescript';
import 'brace/mode/html';
import 'brace/mode/handlebars';
import 'brace/mode/xml';
import 'brace/theme/monokai';

/**
 * Renders the controls for PropertyFieldCodeEditor component
 */
export default class PropertyFieldCodeEditorHost extends React.Component<IPropertyFieldCodeEditorHostProps, IPropertyFieldCodeEditorHostState> {
  private async: Async;
  private previousValue: string;
  private cancel = true;

  /**
   * Constructor method
   */
  constructor(props: IPropertyFieldCodeEditorHostProps) {
    super(props);

    telemetry.track('PropertyFieldCodeEditor', {
      language: props.language,
      disabled: props.disabled
    });

    this.state = {
      code: typeof this.props.initialValue !== 'undefined' ? this.props.initialValue : '',
      loaded: false,
      openPanel: false,
      errorMessage: ''
    };

    this.onOpenPanel = this.onOpenPanel.bind(this);
    this.onClosePanel = this.onClosePanel.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
    this.async = new Async(this);
  }

  /**
   * componentWillUpdate lifecycle hook
   *
   * @param nextProps
   * @param nextState
   */
  public componentWillUpdate(nextProps: IPropertyFieldCodeEditorHostProps, nextState: IPropertyFieldCodeEditorHostState): void {
    if (nextProps.initialValue !== this.props.initialValue) {
      this.setState({
        code: typeof this.props.initialValue !== 'undefined' ? this.props.initialValue : ''
      });
    }
  }

  /**
   * Open the right Panel
   */
  private onOpenPanel(): void {
    if (this.props.disabled) {
      return;
    }

    // Store the current code value
    this.previousValue = this.state.code;
    this.cancel = true;

    this.setState({
      openPanel: true,
      loaded: false
    });
  }

  /**
   * Close the panel
   */
  private onClosePanel(): void {
    this.setState((crntState: IPropertyFieldCodeEditorHostState) => {
      const newState: IPropertyFieldCodeEditorHostState = {
        openPanel: false,
        loaded: false
      };

      // Check if the property has to be reset
      if (this.cancel) {
        newState.code = this.previousValue;
      }

      return newState;
    });
  }


  /**
   * Called when the component will unmount
   */
  public componentWillUnmount() {
    if (typeof this.async !== 'undefined') {
      this.async.dispose();
    }
  }


  /**
   * Called when the save button  gets clicked
   */
  public onSave(): void {
    this.cancel = false;
    this.props.properties[this.props.targetProperty] = this.state.code;
    this.props.onPropertyChange(this.props.targetProperty, this.props.initialValue, this.state.code);
    // Trigger the apply button
    if (typeof this.props.onChange !== 'undefined' && this.props.onChange !== null) {
      this.props.onChange(this.props.targetProperty, this.state.code);
    }
    this.setState((current)=>({ ...current, openPanel: false }));
  }

  /**
   * Called when the code gets changed
   */
  public onChange(newValue: string, event?: any): void {
    this.setState((current) => ({ ...current, code: newValue }));
  }

  /**
   * Renders the SPListpicker controls with Office UI  Fabric
   */
  public render(): JSX.Element {
    return (
      <div>
        {this.props.label && <Label>{this.props.label}</Label>}
        <table className={styles.codeFieldTable}>
          <tbody>
            <tr>
              <td>
                <TextField
                  disabled={this.props.disabled}
                  onChanged={null}
                  readOnly={true}
                  value={this.state.code}
                  onClick={this.onOpenPanel}
                />
              </td>
              <td className={styles.codeFieldRow}>
                <IconButton disabled={this.props.disabled} iconProps={{ iconName: 'Code' }} onClick={this.onOpenPanel} />
              </td>
            </tr>
          </tbody>
        </table>

        <FieldErrorMessage errorMessage={this.state.errorMessage} />

        <Panel
          isOpen={this.state.openPanel}
          hasCloseButton={true}
          onDismiss={this.onClosePanel}
          isLightDismiss={true}
          type={PanelType.medium}
          headerText={this.props.panelTitle}
          onRenderFooterContent={() => (
            <div className={styles.actions}>
              <PrimaryButton iconProps={{ iconName: 'Save' }} text={strings.SaveButtonLabel} value={strings.SaveButtonLabel} onClick={this.onSave} />

              <DefaultButton iconProps={{ iconName: 'Cancel' }} text={strings.CancelButtonLabel} value={strings.CancelButtonLabel} onClick={this.onClosePanel} />
            </div>
          )}>

          <AceEditor
            mode={this.props.language}
            theme="monokai"
            onChange={this.onChange}
            value={this.state.code}
            name={`code-${this.props.targetProperty}`}
            editorProps={{ $blockScrolling: true }}
          />
        </Panel>
      </div>
    );
  }
}
