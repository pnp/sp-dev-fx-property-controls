import * as React from 'react';
import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { Async } from 'office-ui-fabric-react/lib/Utilities';
import { IconButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { Spinner, SpinnerType } from 'office-ui-fabric-react/lib/Spinner';
import {
  IPropertyFieldCodeEditorPropsInternal
} from './IPropertyFieldCodeEditor';
import { SPHttpClient, SPHttpClientResponse, ISPHttpClientOptions } from '@microsoft/sp-http';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { ICheckedTerms, ICheckedTerm } from './IPropertyFieldCodeEditor';
import { IPropertyFieldCodeEditorHostProps, IPropertyFieldCodeEditorHostState, ITermGroupProps, ITermGroupState, ITermSetProps, ITermSetState, ITermProps, ITermState } from './IPropertyFieldCodeEditorHost';
import SPTermStorePickerService from './../../services/SPTermStorePickerService';
import { ITermStore, IGroup, ITerm } from './../../services/ISPTermStorePickerService';
import styles from './PropertyFieldCodeEditorHost.module.scss';
import { sortBy, uniqBy } from '@microsoft/sp-lodash-subset';
import FieldErrorMessage from '../errorMessage/FieldErrorMessage';
import * as appInsights from '../../common/appInsights';

/**
 * Renders the controls for PropertyFieldCodeEditor component
 */
export default class PropertyFieldCodeEditorHost extends React.Component<IPropertyFieldCodeEditorHostProps, IPropertyFieldCodeEditorHostState> {
  private async: Async;
  private delayedValidate: (value: ICheckedTerms) => void;
  private termsService: SPTermStorePickerService;

  /**
   * Constructor method
   */
  constructor(props: IPropertyFieldCodeEditorHostProps) {
    super(props);
    debugger;
    appInsights.track('PropertyFieldCodeEditor', {
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
    this.async = new Async(this);
    //this.validate = this.validate.bind(this);
  //  this.notifyAfterValidate = this.notifyAfterValidate.bind(this);
   // this.delayedValidate = this.async.debounce(this.validate, this.props.deferredValidationTime);
  }

 
  // /**
  //  * Validates the new custom field value
  //  */
  // private validate(value: string): void {
  //   if (this.props.onGetErrorMessage === null || this.props.onGetErrorMessage === undefined) {
  //     this.notifyAfterValidate(this.props.initialValue, value);
  //     return;
  //   }

  //   const result: string | PromiseLike<string> = this.props.onGetErrorMessage(value || []);
  //   if (typeof result !== 'undefined') {
  //     if (typeof result === 'string') {
  //       if (result === '') {
  //         this.notifyAfterValidate(this.props.initialValues, value);
  //       }
  //       this.setState({
  //         errorMessage: result
  //       });
  //     } else {
  //       result.then((errorMessage: string) => {
  //         if (typeof errorMessage === 'undefined' || errorMessage === '') {
  //           this.notifyAfterValidate(this.props.initialValues, value);
  //         }
  //         this.setState({
  //           errorMessage: errorMessage
  //         });
  //       });
  //     }
  //   } else {
  //     this.notifyAfterValidate(this.props.initialValues, value);
  //   }
  // }

  // /**
  //  * Notifies the parent Web Part of a property value change
  //  */
  // private notifyAfterValidate(oldValue: string, newValue: string) {
  //   if (this.props.onPropertyChange && newValue !== null) {
  //     this.props.properties[this.props.targetProperty] = newValue;
  //     this.props.onPropertyChange(this.props.targetProperty, oldValue, newValue);
  //     // Trigger the apply button
  //     if (typeof this.props.onChange !== 'undefined' && this.props.onChange !== null) {
  //       this.props.onChange(this.props.targetProperty, newValue);
  //     }
  //   }
  // }

  /**
   * Open the right Panel
   */
  private onOpenPanel(): void {
    if (this.props.disabled === true) {
      return;
    }
    this.setState({
      openPanel: true,
      loaded: false
    });
  }

  /**
   * Close the panel
   */
  private onClosePanel(): void {
    this.setState({
      openPanel: false,
      loaded: false
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
   * Renders the SPListpicker controls with Office UI  Fabric
   */
  public render(): JSX.Element {
   
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
                  value={this.state.code}
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
      <div>
                  {this.state.code}
                </div>
          }
        </Panel>
      </div>
    );
  }
}
