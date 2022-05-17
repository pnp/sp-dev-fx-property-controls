import * as React from 'react';
import * as telemetry from '../../common/telemetry';
import { IPropertyFieldRuleTreeHostProps, IPropertyFieldRuleTreeHostState } from '.';
import { DefaultButton } from 'office-ui-fabric-react/lib/components/Button';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/components/Panel';
import { Label } from 'office-ui-fabric-react/lib/components/Label';
import {Text } from 'office-ui-fabric-react/lib/components/Text';
import * as strings from 'PropertyControlStrings';
import { TreeCollectionDataViewer } from '../treeCollectionData/treeCollectionDataViewer/TreeCollectionDataViewer';
import { CustomCollectionFieldType, ICustomCollectionField } from '../collectionData/ICustomCollectionField';
import { RuleTreeBaseOperator } from './RuleTreeBaseOperator';
import {  ICustomTreeItem } from '../treeCollectionData/ICustomTreeItem';
import { IRuleTreeData } from './IRuleTreeData';
import { ITreeItem } from '@pnp/spfx-controls-react/lib/TreeView';

export class PropertyFieldRuleTreeHost extends React.Component<IPropertyFieldRuleTreeHostProps, IPropertyFieldRuleTreeHostState> {
  constructor(props: IPropertyFieldRuleTreeHostProps) {
    super(props);

    this.state = {
      panelOpen: false,
      items: []
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


  private readonly standardFields: ICustomCollectionField[] = [{
    id: 'leftHand',
    title: "Left Hand", // commonStrings.PropertyPane.InformationPage.Extensibility.Columns.Name,
    type: CustomCollectionFieldType.string,
    required: true,
  },
  {
    id: 'operator',
    title: "Operator", //commonStrings.PropertyPane.InformationPage.Extensibility.Columns.Id,
    type: CustomCollectionFieldType.dropdown,
    defaultValue:"EQ",
    options: [{
      key: "EQ",
      text: "EQ",
      selected:true
    },
    {
      key: "NE",
      text: "NE"
    },
    {
      key: "IN",
      text: 'IN'
    }
      ,
    {
      key: "NOTIN",
      text: 'NOTIN'
    }
    ],
    required: true
  },
  {
    id: 'rightHand',
    title: "Right Hand", //commonStrings.PropertyPane.InformationPage.Extensibility.Columns.Name,
    type: CustomCollectionFieldType.string
  },  
  ];

  private getFields = (item: ITreeItem, items: ITreeItem[], parentItem: ITreeItem):ICustomCollectionField[] => {

  /*  if( (item.children?.length ?? 0 > 0) || (item.data.sortIdx < (parentItem?.children?.length ?? 0) ) || ( !parentItem && item.data.sortIdx < items.length))
    {
      return this.standardFields.concat({
        id: 'conjunction',
        title: "Conjunction", //commonStrings.PropertyPane.InformationPage.Extensibility.Columns.Id,
        type: CustomCollectionFieldType.dropdown,
        options: [{
          key: "AND",
          text: "AND",
          selected: true
        },
        {
          key: "OR",
          text: "OR"
        }
        ],
        required: true
      },)
    }*/
    
    if( parentItem
         || item.data.sortIdx > 1
        )
    {
      return  [{
        id: 'conjunction',
        title: "Conjunction", //commonStrings.PropertyPane.InformationPage.Extensibility.Columns.Id,
        type: CustomCollectionFieldType.dropdown,
        defaultValue:'AND',
        options: [{
          key: "AND",
          text: "AND",
          selected: true
        },
        {
          key: "OR",
          text: "OR"
        }
        ],
        required: true
      }, ...this.standardFields]
    }
    return this.standardFields;
  }

  private evaluateRules = () => {
    /*
        for (const rule of this.properties.targetAudienceRules) {                
          const leftHand = await this.tokenService.resolveTokens(rule.leftHand);
          const rightHand = await this.tokenService.resolveTokens(rule.rightHand);                    
         console.log("X:",`'${leftHand}' ${rule.operator} '${rightHand}'`);
          switch((<any>RuleTreeBaseOperator)[rule.operator])
          {
              case RuleTreeBaseOperator.Eq:
                  this._showWebpartFromAudienceSetting = isEqual(leftHand,rightHand);
              break;
    
              case TagetAudianceRuleOperator.Neq:
                  this._showWebpartFromAudienceSetting = !isEqual(leftHand,rightHand);
              break;
    
              case TagetAudianceRuleOperator.In:
                  this._showWebpartFromAudienceSetting = rightHand?.split(',').includes(leftHand);
              break;
    
              case TagetAudianceRuleOperator.NotIn:
                  this._showWebpartFromAudienceSetting = !rightHand?.split(',').includes(leftHand);
              break;
              default:
                  console.error("Unknown op", rule.operator);
          }
          
          if(this._showWebpartFromAudienceSetting) {
              console.log("this._showWebpartFromAudienceSetting",this._showWebpartFromAudienceSetting);
              break;
              
          }else{
              this._failedAudienceRule.push(`'${leftHand}' ${rule.operator} '${rightHand}'`);                        
          }
        }
    */
  }


  private itemsToText = (items: ICustomTreeItem<IRuleTreeData>[]) => {
  
    const res = items?.map(item =>`${(item.data.value.conjunction && item.data.sortIdx > 1) ? item.data.value.conjunction: ''  } ${item.data.value.leftHand} ${item.data.value.operator} ${item.data.value.rightHand} ${ item.children?.length ?? 0 > 0 ? `${item.children[0].data.value.conjunction}` + '(' + this.itemsToText(item.children) + ')' : '' }`).join(' ');
    return res;
  }

  private itemsUpdated = (items: any) => {
    this.setState({ items });
  }


  public render(): JSX.Element {
    const text = this.itemsToText(this.state.items);
    return (
      <div>
        <Label>{this.props.label}</Label>

        <DefaultButton text={this.props.manageBtnLabel}
          onClick={this.openPanel}
          disabled={this.props.disabled} />


        {this.state.panelOpen && <Panel isOpen={this.state.panelOpen}
          onDismiss={this.closePanel}
          type={PanelType.large}
          headerText={this.props.panelHeader}
          onOuterClick={() => { }}
          className={`PropertyFieldTreeCollectionData__panel ${this.props.panelClassName || ""}`}>
          {
            this.props.panelDescription && (
              <p className="PropertyFieldTreeCollectionData__panel__description">{this.props.panelDescription}</p>
            )
          }

          <TreeCollectionDataViewer {...this.props} fields={this.getFields} fOnSave={this.onSave} fOnClose={this.closePanel} onChanged={this.itemsUpdated} />

          <div>
            <Label>Debug:</Label>
            <Text>{text}</Text>
          </div>

        </Panel>}
      </div>
    );
  }
}