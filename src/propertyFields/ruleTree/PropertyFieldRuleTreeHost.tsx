import * as React from 'react';
import * as telemetry from '../../common/telemetry';
import { IPropertyFieldRuleTreeHostProps, IPropertyFieldRuleTreeHostState } from '.';
import { DefaultButton } from 'office-ui-fabric-react/lib/components/Button';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/components/Panel';
import { Label } from 'office-ui-fabric-react/lib/components/Label';
// import { CollectionDataViewer } from './collectionDataViewer';
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
          <GroupedList items={[{title:'fu'},{title:'fu2'}]} groups={[{key:'1',name:'g1', startIndex:0, count:1},{key:'2',name:'g2', startIndex:1, count:1}]} onRenderCell={function (nestingDepth?: number, item?: any, index?: number): ReactNode {
            
            return <div key={item.title}>
              <Dropdown  options={[{key:1,text:'1'}]} />
              <TextField value={item.title} />
              <Dropdown options={[{key:'Eq',text:'Eq'}]} />
              <TextField value={item.title} />
              </div>;
          }} />

        </Panel>
      </div>
    );
  }
}
//          <CollectionDataViewer {...this.props} fOnSave={this.onSave} fOnClose={this.closePanel} />