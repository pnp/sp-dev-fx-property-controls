import * as React from 'react';
import * as telemetry from '../../common/telemetry';
import { IPropertyFieldCollectionDataHostProps, IPropertyFieldCollectionDataHostState } from '.';
import { DefaultButton } from 'office-ui-fabric-react/lib/components/Button';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/components/Panel';
import { Label } from 'office-ui-fabric-react/lib/components/Label';
import { CollectionDataViewer } from './collectionDataViewer';
import FieldErrorMessage from '../errorMessage/FieldErrorMessage';
import * as strings from 'PropertyControlStrings';

export class PropertyFieldCollectionDataHost extends React.Component<IPropertyFieldCollectionDataHostProps, IPropertyFieldCollectionDataHostState> {
  constructor(props: IPropertyFieldCollectionDataHostProps) {
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
                       disabled={this.props.fields.length === 0 || this.props.disabled} />

        {
          this.props.fields.length === 0 && <FieldErrorMessage errorMessage={strings.CollectionDataEmptyFields} />
        }

        <Panel isOpen={this.state.panelOpen}
               onDismiss={this.closePanel}
               type={PanelType.large}
               headerText={this.props.panelHeader}>
          {
            this.props.panelDescription && (
              <p>{this.props.panelDescription}</p>
            )
          }
          <CollectionDataViewer {...this.props} fOnSave={this.onSave} fOnClose={this.closePanel} />
        </Panel>
      </div>
    );
  }
}
