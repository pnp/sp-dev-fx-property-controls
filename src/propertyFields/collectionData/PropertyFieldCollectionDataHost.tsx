import * as React from 'react';
import * as telemetry from '../../common/telemetry';
import {
  IPropertyFieldCollectionDataHostProps,
  IPropertyFieldCollectionDataHostState,
} from './IPropertyFieldCollectionDataHost';
import { DefaultButton, Panel, PanelType, Label } from '@fluentui/react';
import { CollectionDataViewer } from './collectionDataViewer';
import FieldErrorMessage from '../errorMessage/FieldErrorMessage';
import * as strings from 'PropertyControlStrings';

export class PropertyFieldCollectionDataHost extends React.Component<
  IPropertyFieldCollectionDataHostProps,
  IPropertyFieldCollectionDataHostState
> {
  constructor(props: IPropertyFieldCollectionDataHostProps) {
    super(props);

    this.state = {
      panelOpen: false,
    };

    telemetry.track('PropertyFieldCollectionData', {});
  }

  /**
   * Open the panel
   */
  private openPanel = (): void => {
    this.setState({
      panelOpen: true,
    });
  };

  /**
   * Closes the panel
   */
  private closePanel = (): void => {
    this.setState({
      panelOpen: false,
    });
  };

  /**
   * On save action
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private onSave = (items: any[]): void => {
    this.props.onChanged(items);
    this.setState({
      panelOpen: false,
    });
  };

  public render(): JSX.Element {
    return (
      <div>
        <Label>{this.props.label}</Label>

        <DefaultButton
          text={this.props.manageBtnLabel}
          onClick={this.openPanel}
          disabled={this.props.fields.length === 0 || this.props.disabled}
        />

        {this.props.fields.length === 0 && (
          <FieldErrorMessage errorMessage={strings.CollectionDataEmptyFields} />
        )}

        <Panel
          isOpen={this.state.panelOpen}
          onDismiss={this.closePanel}
          type={PanelType.large}
          headerText={this.props.panelHeader}
          onOuterClick={() => {
            /* no-op; */
          }}
          className={`PropertyFieldCollectionData__panel ${
            this.props.panelClassName || ''
          }`}
          {...(this.props.panelProps ?? {})}
        >
          {this.props.panelDescription && (
            <p className='PropertyFieldCollectionData__panel__description'>
              {this.props.panelDescription}
            </p>
          )}

          <CollectionDataViewer
            {...this.props}
            fOnSave={this.onSave}
            fOnClose={this.closePanel}
          />
        </Panel>
      </div>
    );
  }
}
