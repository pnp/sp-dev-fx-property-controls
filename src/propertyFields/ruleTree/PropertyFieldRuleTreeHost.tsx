import * as React from 'react';
import * as telemetry from '../../common/telemetry';
import { IPropertyFieldRuleTreeHostProps, IPropertyFieldRuleTreeHostState } from '.';
import { DefaultButton } from 'office-ui-fabric-react/lib/components/Button';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/components/Panel';
import { Label } from 'office-ui-fabric-react/lib/components/Label';
 import { RuleTreeViewer } from './ruleTreeViewer';
import FieldErrorMessage from '../errorMessage/FieldErrorMessage';
import * as strings from 'PropertyControlStrings';
import { Dropdown, GroupedList, TextField } from 'office-ui-fabric-react';
import { ReactNode } from 'react';

export class PropertyFieldRuleTreeHost extends React.Component<IPropertyFieldRuleTreeHostProps, IPropertyFieldRuleTreeHostState> {
  constructor(props: IPropertyFieldRuleTreeHostProps) {
    super(props);

    this.state = {
      panelOpen: false
    };

    telemetry.track('PropertyFieldCollectionData', {});
  }

  /**
   * Open the panel
   */
  private openPanel = () => {
    this.setState({
      panelOpen: true
    });
  }

  /**
   * Closes the panel
   */
  private closePanel = () => {
    this.setState({
      panelOpen: false
    });
  }

  /**
   * On save action
   */
  private onSave = (items: any[]) => {
    this.props.onChanged(items);
    this.setState({
      panelOpen: false
    });
  }

  public render(): JSX.Element {
    return (
      <div>
        <Label>{this.props.label}</Label>

        <DefaultButton text={this.props.manageBtnLabel}
          onClick={this.openPanel}
          // disabled={this.props.fields.length === 0 || this.props.disabled} />
          disabled={this.props.disabled} />

        {
          //    this.props.fields.length === 0 && <FieldErrorMessage errorMessage={strings.CollectionDataEmptyFields} />
        }

        <Panel isOpen={this.state.panelOpen}
          onDismiss={this.closePanel}
          type={PanelType.large}
          headerText={this.props.panelHeader}
          onOuterClick={() => { }}
          className={`PropertyFieldCollectionData__panel ${this.props.panelClassName || ""}`}>
          {
            this.props.panelDescription && (
              <p className="PropertyFieldCollectionData__panel__description">{this.props.panelDescription}</p>
            )
          }
          <RuleTreeViewer {...this.props} fOnSave={this.onSave} fOnClose={this.closePanel} />

        </Panel>
      </div>
    );
  }
}
//          <CollectionDataViewer {...this.props} fOnSave={this.onSave} fOnClose={this.closePanel} />