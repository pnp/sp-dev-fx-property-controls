import * as React from 'react';

import {
  DefaultButton,
  mergeStyles,
  mergeStyleSets,
  Panel,
  PanelType,
  PrimaryButton,
  Stack,
  TextField,
} from 'office-ui-fabric-react';
import strings from 'PropertyControlStrings';

import * as telemetry from '../../common/telemetry';
import {
  IPropertyFieldMonacoEditorHostProps,
  IPropertyFieldMonacoEditorHostState,
} from './IPropertyFieldMonacoEditorHost';
import { MonacoEditor } from './monacoEditorControl';

const DEFAULT_PANEL_WIDTH = "800px";

export default class PropertyFieldMonacoEditorHost extends React.Component<
  IPropertyFieldMonacoEditorHostProps,
  IPropertyFieldMonacoEditorHostState
> {
  constructor(props: IPropertyFieldMonacoEditorHostProps) {
    super(props);
    telemetry.track("PropertyFieldOrder", {});
    this.state = {
      value: this.props.value,
      validationErrors: [],
      showPanel: false,
    };
  }

  public componentDidUpdate(
    prevProps: IPropertyFieldMonacoEditorHostProps,
    prevState: IPropertyFieldMonacoEditorHostState
  ): void {
    if (prevProps.value !== this.props.value) {
      this.setState({ value: this.props.value });
    }
  }

  protected showPanel = (indicator: boolean): void => {
    this.setState({ showPanel: indicator });
  }

  private controlClasses = mergeStyleSets({
    headerTitle: mergeStyles({
      paddingTop: 20,
    }),
    textFieldStyles: mergeStyles({
      paddingBottom: 5,
    }),
  });

  protected onValueChange = (newValue: string, errors: string[]): void => {
    this.setState({ value: newValue, validationErrors: errors });
  }

  protected onRenderFooterContent = (): JSX.Element => {
    return (
      <Stack horizontal horizontalAlign="start" tokens={{ childrenGap: 5 }}>
        <PrimaryButton
          onClick={() => {
            this.props.onValueChange(this.state.value, this.state.validationErrors);
            this.showPanel(false);
          }}
        >
          {strings.MonacoEditorSaveButtonLabel}
        </PrimaryButton>
        <DefaultButton onClick={() => this.showPanel(false)}>{strings.MonacoEditorCancelButtonLabel}</DefaultButton>
      </Stack>
    );
  }

  public render(): React.ReactElement<IPropertyFieldMonacoEditorHostProps> {
    const { panelWidth } = this.props;
    const _panelWidth = panelWidth ? `${panelWidth}px` : DEFAULT_PANEL_WIDTH;
    return (
      <>
        <TextField value={this.props.value} readOnly className={this.controlClasses.textFieldStyles}></TextField>
        <PrimaryButton
          text={strings.MonacoEditorOpenButtonLabel}
          onClick={(ev) => {
            this.showPanel(true);
          }}
        ></PrimaryButton>
        <Panel
          type={PanelType.custom}
          customWidth={_panelWidth}
          isOpen={this.state.showPanel}
          onDismiss={() => {
            this.showPanel(false);
          }}
          headerText={strings.MonacoEditorPanelTitle}
          onRenderFooterContent={this.onRenderFooterContent}
          isFooterAtBottom={true}
        >
          <div className={this.controlClasses.headerTitle}>
            <MonacoEditor {...this.props} onValueChange={this.onValueChange} />
          </div>
        </Panel>
      </>
    );
  }
}
