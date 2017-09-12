import * as React from 'react';
import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { Async } from 'office-ui-fabric-react/lib/Utilities';
import { IconButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { Spinner, SpinnerType } from 'office-ui-fabric-react/lib/Spinner';
import { Environment, EnvironmentType } from '@microsoft/sp-core-library';
import {
  IPropertyFieldTermPickerPropsInternal
} from './IPropertyFieldTermPicker';
import { SPHttpClient, SPHttpClientResponse, ISPHttpClientOptions } from '@microsoft/sp-http';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { ICheckedTerms, ICheckedTerm } from './IPropertyFieldTermPicker';
import { IPropertyFieldTermPickerHostProps, IPropertyFieldFontPickerHostState, ITermGroupProps, ITermGroupState, ITermSetProps, ITermSetState, ITermProps, ITermState } from './IPropertyFieldTermPickerHost';
import SPTermStorePickerService from './../../services/SPTermStorePickerService';
import { ITermStore, IGroup, ITerm } from './../../services/ISPTermStorePickerService';
import styles from './PropertyFieldTermPickerHost.module.scss';
import { sortBy, uniqBy } from '@microsoft/sp-lodash-subset';
import TermGroup from './TermGroup';
import FieldErrorMessage from '../errorMessage/FieldErrorMessage';

/**
 * Image URLs / Base64
 */
export const COLLAPSED_IMG = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAUCAYAAABSx2cSAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjEwcrIlkgAAAIJJREFUOE/NkjEKwCAMRdu7ewZXJ/EqHkJwE9TBCwR+a6FLUQsRwYBTeD8/35wADnZVmPvY4OOYO3UNbK1FKeUWH+fRtK21hjEG3vuhQBdOKUEpBedcV6ALExFijJBSIufcFBjCVSCEACEEqpNvBmsmT+3MTnvqn/+O4+1vdtv7274APmNjtuXVz6sAAAAASUVORK5CYII="; // /_layouts/15/images/MDNCollapsed.png
export const EXPANDED_IMG = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAUCAYAAABSx2cSAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjEwcrIlkgAAAFtJREFUOE9j/P//PwPZAKSZXEy2RrCLybV1CGjetWvX/46ODqBLUQOXoJ9BGtXU1MCYJM0wjZGRkaRpRtZIkmZ0jSRpBgUOzJ8wmqwAw5eICIb2qGYSkyfNAgwAasU+UQcFvD8AAAAASUVORK5CYII="; // /_layouts/15/images/MDNExpanded.png
export const GROUP_IMG = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAC9SURBVDhPY2CgNXh1qEkdiJ8D8X90TNBuJM0V6IpBhoHFgIxebKYTIwYzAMNpxGhGdsFwNoBgNEFjAWsYgOSKiorMgPgbEP/Hgj8AxXpB0Yg1gQAldYuLix8/efLkzn8s4O7du9eAan7iM+DV/v37z546der/jx8/sJkBdhVOA5qbm08ePnwYrOjQoUOkGwDU+AFowLmjR4/idwGukAYaYAkMgxfPnj27h816kDg4DPABoAI/IP6DIxZA4l0AOd9H3QXl5+cAAAAASUVORK5CYII="; // /_layouts/15/Images/EMMGroup.png
export const TERMSET_IMG = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACaSURBVDhPrZLRCcAgDERdpZMIjuQA7uWH4CqdxMY0EQtNjKWB0A/77sxF55SKMTalk8a61lqCFqsLiwKac84ZRUUBi7MoYHVmAfjfjzE6vJqZQfie0AcwBQVW8ATi7AR7zGGGNSE6Q2cyLSPIjRswjO7qKhcPDN2hK46w05wZMcEUIG+HrzzcrRsQBIJ5hS8C9fGAPmRwu/9RFxW6L8CM4Ry8AAAAAElFTkSuQmCC"; // /_layouts/15/Images/EMMTermSet.png

/**
 * @class
 * Renders the controls for PropertyFieldTermPicker component
 */
export default class PropertyFieldTermPickerHost extends React.Component<IPropertyFieldTermPickerHostProps, IPropertyFieldFontPickerHostState> {
  private async: Async;
  private delayedValidate: (value: ICheckedTerms) => void;
  private termsService: SPTermStorePickerService;

  /**
   * @function
   * Constructor
   */
  constructor(props: IPropertyFieldTermPickerHostProps) {
    super(props);

    this.state = {
      activeNodes: typeof this.props.initialValues !== "undefined" ? this.props.initialValues : [],
      termStores: [],
      loaded: false,
      openPanel: false,
      errorMessage: ''
    };

    this.onOpenPanel = this.onOpenPanel.bind(this);
    this.onClosePanel = this.onClosePanel.bind(this);
    this.termsChanged = this.termsChanged.bind(this);
    this.async = new Async(this);
    this.validate = this.validate.bind(this);
    this.notifyAfterValidate = this.notifyAfterValidate.bind(this);
    this.delayedValidate = this.async.debounce(this.validate, this.props.deferredValidationTime);
  }

  /**
   * @function
   * Loads the list from SharePoint current web site
   */
  private loadTermStores(): void {
    this.termsService = new SPTermStorePickerService(this.props, this.props.context);
    this.termsService.getTermStores().then((response: ITermStore[]) => {
      // Check if a response was retrieved
      if (response !== null) {
        this.setState({
          termStores: response,
          loaded: true
        });
      } else {
        this.setState({
          termStores: [],
          loaded: true
        });
      }
    });
  }

  /**
   * @function
   * Validates the new custom field value
   */
  private validate(value: ICheckedTerms): void {
    if (this.props.onGetErrorMessage === null || this.props.onGetErrorMessage === undefined) {
      this.notifyAfterValidate(this.props.initialValues, value);
      return;
    }

    var result: string | PromiseLike<string> = this.props.onGetErrorMessage(value || []);
    if (typeof result !== "undefined") {
      if (typeof result === 'string') {
        if (result === '') {
          this.notifyAfterValidate(this.props.initialValues, value);
        }
        this.setState({
          errorMessage: result
        });
      } else {
        result.then((errorMessage: string) => {
          if (typeof errorMessage === "undefined" || errorMessage === '') {
            this.notifyAfterValidate(this.props.initialValues, value);
          }
          this.setState({
            errorMessage: errorMessage
          });
        });
      }
    } else {
      this.notifyAfterValidate(this.props.initialValues, value);
    }
  }

  /**
   * @function
   * Notifies the parent Web Part of a property value change
   */
  private notifyAfterValidate(oldValue: ICheckedTerms, newValue: ICheckedTerms) {
    if (this.props.onPropertyChange && newValue !== null) {
      this.props.properties[this.props.targetProperty] = newValue;
      this.props.onPropertyChange(this.props.targetProperty, oldValue, newValue);
      // Trigger the apply button
      if (typeof this.props.onChange !== "undefined" && this.props.onChange !== null) {
        this.props.onChange(this.props.targetProperty, newValue);
      }
    }
  }

  /**
   * @function
   * Open the right Panel
   */
  private onOpenPanel(): void {
    if (this.props.disabled === true) {
      return;
    }
    this.loadTermStores();
    this.setState({
      openPanel: true,
      loaded: false
    });
  }

  /**
   * @function
   * Close the panel
   */
  private onClosePanel(): void {
    this.setState({
      openPanel: false,
      loaded: false
    });
  }

  /**
   * Clicks on a node
   * @param node
   */
  private termsChanged(term: ITerm, checked: boolean): void {
    let activeNodes = this.state.activeNodes;
    if (typeof term === "undefined" || term === null) {
      return;
    }

    // Term item to add to the active nodes array
    const termItem = {
      name: term.Name,
      id: term.Id,
      path: term.PathOfTerm,
      termSet: term.TermSet.Id
    };

    // Check if the term is checked or unchecked
    if (checked) {
      // Check if it is allowed to select multiple terms
      if (this.props.allowMultipleSelections) {
        // Add the checked term
        activeNodes.push(termItem);
        // Filter out the duplicate terms
        activeNodes = uniqBy(activeNodes, 'id');
      } else {
        // Only store the current selected item
        activeNodes = [termItem];
      }
    } else {
      // Remove the term from the list of active nodes
      activeNodes = activeNodes.filter(item => item.path !== term.PathOfTerm);
    }
    // Sort all active nodes
    activeNodes = sortBy(activeNodes, 'path');
    // Update the current state
    this.setState({
      activeNodes: activeNodes
    });
    this.delayedValidate(activeNodes);
  }

  /**
   * @function
   * Gets the given node position in the active nodes collection
   * @param node
   */
  private getSelectedNodePosition(node: ICheckedTerm): number {
    for (var i = 0; i < this.state.activeNodes.length; i++) {
      if (node.id === this.state.activeNodes[i].id) {
        return i;
      }
    }
    return -1;
  }

  /**
   * @function
   * Called when the component will unmount
   */
  public componentWillUnmount() {
    if (typeof this.async !== "undefined") {
      this.async.dispose();
    }
  }

  /**
   * @function
   * Renders the SPListpicker controls with Office UI  Fabric
   */
  public render(): JSX.Element {
    let termSetsString: string = '';
    if (typeof this.state.activeNodes !== "undefined" && this.state.activeNodes.length > 0) {
      termSetsString = this.state.activeNodes.map(term => term.name).join(', ');
    }

    // Renders content
    return (
      <div>
        <Label>{this.props.label}</Label>
        <table className={styles.termFieldTable}>
          <tbody>
            <tr>
              <td>
                <TextField
                  disabled={this.props.disabled}
                  style={{ width: '100%' }}
                  onChanged={null}
                  readOnly={true}
                  value={termSetsString}
                />
              </td>
              <td className={styles.termFieldRow}>
                <IconButton disabled={this.props.disabled} iconProps={{ iconName: 'Tag' }} onClick={this.onOpenPanel} />
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
          headerText={this.props.panelTitle}>

          {
            /* Show spinner in the panel while retrieving terms */
            this.state.loaded === false ? <Spinner type={SpinnerType.normal} /> : ''
          }

          {
            /* Once the state is loaded, start rendering the term store, group, term sets */
            this.state.loaded === true ? this.state.termStores.map((termStore: ITermStore, index: number) => {
              return (
                <div key={termStore.Id}>
                  <h3>{termStore.Name}</h3>
                  {
                    termStore.Groups._Child_Items_.map((group) => {
                      return <TermGroup key={group.Id} group={group} termstore={termStore.Id} termsService={this.termsService} activeNodes={this.state.activeNodes} changedCallback={this.termsChanged} multiSelection={this.props.allowMultipleSelections} />;
                    })
                  }
                </div>
              );
            }) : ''
          }
        </Panel>
      </div>
    );
  }
}
