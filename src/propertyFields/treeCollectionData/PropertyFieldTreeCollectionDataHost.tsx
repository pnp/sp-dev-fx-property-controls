import * as React from 'react';
import * as telemetry from '../../common/telemetry';
import { IPropertyFieldTreeCollectionDataHostProps, IPropertyFieldTreeCollectionDataHostState } from '.';
import { DefaultButton } from 'office-ui-fabric-react/lib/components/Button';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/components/Panel';
import { Label } from 'office-ui-fabric-react/lib/components/Label';
import { TreeCollectionDataViewer } from './treeCollectionDataViewer';
import FieldErrorMessage from '../errorMessage/FieldErrorMessage';
import * as strings from 'PropertyControlStrings';

export class PropertyFieldTreeCollectionDataHost extends React.Component<IPropertyFieldTreeCollectionDataHostProps, IPropertyFieldTreeCollectionDataHostState> {
  constructor(props: IPropertyFieldTreeCollectionDataHostProps) {
    super(props);

    this.state = {
      panelOpen: false
    };

    telemetry.track('PropertyFieldTreeCollectionData', {});
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
    console.log("saving", items);
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
                       disabled={this.props.fields.length === 0 || this.props.disabled} />

        {
          this.props.fields.length === 0 && <FieldErrorMessage errorMessage={strings.TreeCollectionDataEmptyFields} />
        }

        <Panel isOpen={this.state.panelOpen}
               onDismiss={this.closePanel}
               type={PanelType.large}
               headerText={this.props.panelHeader}
               onOuterClick={()=>{}}
               className={`PropertyFieldTreeCollectionData__panel ${this.props.panelClassName || ""}`}>
          {
            this.props.panelDescription && (
              <p className="PropertyFieldTreeCollectionData__panel__description">{this.props.panelDescription}</p>
            )
          }

          <TreeCollectionDataViewer {...this.props} fOnSave={this.onSave} fOnClose={this.closePanel} />
        </Panel>
      </div>
    );
  }
}
