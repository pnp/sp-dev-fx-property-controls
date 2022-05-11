import * as React from 'react';
import styles from '../PropertyFieldRuleTreeHost.module.scss';
import { IRuleTreeNodeProps, IRuleTreeNodeState } from '.';
import { TextField } from 'office-ui-fabric-react/lib/components/TextField';
import { Icon } from 'office-ui-fabric-react/lib/components/Icon';
import { Link } from 'office-ui-fabric-react/lib/components/Link';
import * as strings from 'PropertyControlStrings';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/components/Dropdown';
import { Callout, DirectionalHint } from 'office-ui-fabric-react/lib/components/Callout';
import { clone, findIndex, sortBy } from '@microsoft/sp-lodash-subset';
import { Guid } from '@microsoft/sp-core-library';

export class RuleTreeNode extends React.Component<IRuleTreeNodeProps, IRuleTreeNodeState> {
  private emptyItem: any = null;
  //private validation: FieldValidator = {};
  private calloutCellRef: HTMLElement;

  constructor(props: IRuleTreeNodeProps) {
    super(props);

    // Create an empty item with all properties
    let emptyItem = this.generateEmptyItem();

    this.state = {
      crntItem: clone(this.props.item) || {...emptyItem},
      errorMsgs: [],
      showCallout: false,
      disableAdd: false
    };
  }

  /**
   * componentDidUpdate lifecycle hook
   * @param prevProps
   * @param prevState
   */
  public componentDidUpdate(prevProps: IRuleTreeNodeProps): void {
    if (this.props.item !== prevProps.item) {
      this.setState({
        crntItem: clone(this.props.item)
      });
    }
  }

  /**
   * Update the item value on the field change
   */
  private onValueChanged = (fieldId: string, value: any): Promise<void> => {
    return new Promise((resolve) => this.setState((prevState: IRuleTreeNodeState) => {
      const { crntItem } = prevState;
      // Update the changed field
      crntItem[fieldId] = value;

      // Store this in the current state
      return { crntItem };
    }, () => resolve()));
  }

  /**
   * Perform all required field checks at once
   */
  private async doAllFieldChecks() {
    const { crntItem } = this.state;

    let disableAdd : boolean = null;

    // Check if current item is valid
    if (this.props.fAddInCreation) {
      if (await this.checkRowIsValidForSave(crntItem)) {
        disableAdd = false;
        this.props.fAddInCreation(crntItem, true);
      } else {
        disableAdd = true;
        this.props.fAddInCreation(crntItem, false);
      }
    }

    this.setState({ disableAdd });

    // Check if item needs to be updated
    if (this.props.fUpdateItem) {
      await this.updateItem();
    }
  }

  /**
   * Check if all values of the required fields are provided
   */
  private checkAllRequiredFieldsValid(item: any): boolean {
    // TODO
    /*
    // Get all the required fields
    const requiredFields = this.props.fields.filter(f => f.required);
    // Check all the required field values
    for (const field of requiredFields) {
      if (typeof item[field.id] === "undefined" || item[field.id] === null || item[field.id] === "") {
        return false;
      }
    }*/
    return true;
  }

  /**
   * Check if any of the fields contain a value
   * @param item
   */
  private checkAnyFieldContainsValue(item: any): boolean {
    /*
    const { fields } = this.props;
    for (const field of fields) {
      if (typeof item[field.id] !== "undefined" && item[field.id] !== null && item[field.id] !== "") {
        return true;
      }
    }*/
    return false;
  }

  /**
   * Check onGetCustomErrorMessage
   * @param item
   */
  private async checkAnyFieldCustomErrorMessage(item: any): Promise<boolean> {
    // TODO
/*    const { fields, index } = this.props;
    
    var validations = await Promise.all(fields.filter(f => f.onGetErrorMessage).map(async f => {
      var validation = await f.onGetErrorMessage(item[f.id], index, item);
      return this.storeFieldValidation(f.id, validation);
    }));

    return validations.filter(v => v && v.length > 0).length == 0;*/
    return false;
  }

  /**
   * Check if row is ready for save
   */
  private async checkRowIsValidForSave(item: any): Promise<boolean> {
    return this.checkAllRequiredFieldsValid(item) && 
      this.checkAnyFieldContainsValue(item) &&
      await this.checkAnyFieldCustomErrorMessage(item) && 
      this.checkAllFieldsAreValid();
  }

  /**
   * Checks if all fields are valid
   */
  private checkAllFieldsAreValid(): boolean {
    // TODO
 /*   if (this.validation) {
      const keys = Object.keys(this.validation);
      for (const key of keys) {
        if (!this.validation[key]) {
          return false;
        }
      }
    }*/

    return true;
  }

  /**
   * Add the current row to the collection
   */
  private addRow = async () => {
    if (this.props.fAddItem) {
      const { crntItem } = this.state;
      // Check if all the fields are correctly provided
      if (this.checkRowIsValidForSave(crntItem)) {
        this.props.fAddItem(crntItem);
        // Clear all field values
        let emptyItem = this.generateEmptyItem();
        this.setState({
          crntItem: {...emptyItem}
        });
      }
    }
  }

  /**
   * Add the current row to the collection
   */
  private updateItem = async () => {
    const { crntItem } = this.state;
    const isValid = await this.checkRowIsValidForSave(crntItem);

    if (this.props.fUpdateItem) {
      // Check if all the fields are correctly provided
      if (isValid) {
        this.props.fUpdateItem(this.props.index, crntItem);
      }
    }

    // Set the validation for the item
    if (this.props.fValidation) {
      this.props.fValidation(this.props.index, isValid);
    }
  }

  /**
   * Delete the item from the collection
   */
  private deleteRow = () => {
    if (this.props.fDeleteItem) {
      this.props.fDeleteItem(this.props.index);
    }
  }

  /**
   * Allow custom field validation
   *
   * @param field
   * @param value
   */
  private fieldValidation = async (fieldName:string, value: any): Promise<string> => {
    let validation = "";
    /*
    // Do the custom validation check
    if (field.onGetErrorMessage) {
      // Set initial field validation
      this.validation[field.id] = false;
      // Do the validation
      validation = await field.onGetErrorMessage(value, this.props.index, this.state.crntItem);
    }

    return this.storeFieldValidation(field.id, validation, true);*/
    return "";
  }

  /**
   * Updates callout and validation state
   */
  private async storeFieldValidation(fieldId: string, validation: string, doAllFieldChecks: boolean = false) {
    // Store the field validation
   // this.validation[fieldId] = validation === "";
    // Add message for the error callout
    this.errorCalloutHandler(fieldId, validation);
    if(doAllFieldChecks) {
      await this.doAllFieldChecks();
    }
    return validation;
  }

  /**
   * Custom field validation
   */
  private onCustomFieldValidation = async (fieldId: string, errorMsg: string) => {
    console.log(fieldId, errorMsg);
    if (fieldId) {
      await this.storeFieldValidation(fieldId, errorMsg, true);
    }
  }


  /**
   * Error callout message handler
   *
   * @param field
   * @param message
   */
  private errorCalloutHandler(fieldId: string, message: string) {
  // TODO
  /*
    this.setState((prevState: IRuleTreeNodeState) => {
      let { crntItem, errorMsgs } = prevState;

      // Get the current field
      const fieldIdx = findIndex(this.props.fields, f => f.id === fieldId);
      if (fieldIdx === -1) {
        return;
      }
      const field = this.props.fields[fieldIdx];

      // Check if there already is a message for the field
      const fieldMsgIdx = findIndex(errorMsgs, msg => msg.field === field.title);

      // Add message
      let fieldMsg;
      if (fieldMsgIdx === -1) {
        fieldMsg = {
          field: field.title,
          message: message
        };
      } else {
        // Update message
        fieldMsg = errorMsgs[fieldMsgIdx];
        if (fieldMsg) {
          fieldMsg.message = message;
        }
      }

      // Check if field required message needs to be shown
      if (field.required) {
        if (typeof crntItem[field.id] === "undefined" || crntItem[field.id] === null || crntItem[field.id] === "") {
          fieldMsg.isRequired = true;
        } else {
          fieldMsg.isRequired = false;
        }
      }

      // If required and message are false, it doesn't need to be added
      if (!fieldMsg.message && !fieldMsg.isRequired) {
        // Remove the item
        if (fieldMsgIdx !== -1) {
          errorMsgs.splice(fieldMsgIdx, 1);
        }
      } else {
        if (fieldMsgIdx === -1) {
          errorMsgs.push(fieldMsg);
        }
      }

      // Sort based on the index
      errorMsgs = sortBy(errorMsgs, ["field"]);

      return {
        errorMsgs
      };
    });
    */
  }

  /**
   * Toggle the error callout
   */
  private toggleErrorCallout = () => {
    this.setState((prevState: IRuleTreeNodeState) => ({
      showCallout: !prevState.showCallout
    }));
  }

  private hideErrorCallout = () => {
    this.setState({
      showCallout: false
    });
  }

  /**
   * Retrieve all dropdown options
   */
  private getSortingOptions(): IDropdownOption[] {
    let opts: IDropdownOption[] = [];
    const { totalItems } = this.props;
    for (let i = 1; i <= totalItems; i++) {
      opts.push({
        text: i.toString(),
        key: i
      });
    }
    return opts;
  }

   /**
   * Creates an empty item with a unique id
   */
  private generateEmptyItem(): any {
    // Create an empty item with all properties
    let emptyItem:any = {};
    emptyItem.uniqueId = Guid.newGuid().toString();

      // Assign default value or null to the emptyItem
      emptyItem['left'] = "";
      emptyItem['comparer'] = "";
      emptyItem['right'] = "";
    
    return emptyItem;
  }

  /**
   * Default React render
   */
  public render(): React.ReactElement<IRuleTreeNodeProps> {
    const { crntItem, disableAdd } = this.state;
    const opts = this.getSortingOptions();

    return (
      <div className={`PropertyFieldCollectionData__panel__table-row ${styles.tableRow} ${this.props.index === null ? styles.tableFooter : ""}`}>
      
        {
         ( <>
            <span key={`dataitem-left`} className={`${styles.tableCell} ${styles.inputField}`}>
              <TextField placeholder='left'
                          className={styles.collectionDataField}
                          value={crntItem['left'] ?? ""}
                          required={true}
                          disabled={false}
                          onChange={(e, value) => this.onValueChanged('left', value)}
                          // deferredValidationTime={field.deferredValidationTime || field.deferredValidationTime >= 0 ? field.deferredValidationTime : 200}
                          onGetErrorMessage={async (value: string) => await this.fieldValidation('left', value)}
                          inputClassName="PropertyFieldCollectionData__panel__string-field" />    
            </span>
            <span key={`dataitem-comparer`} className={`${styles.tableCell} ${styles.inputField}`}>
            <TextField placeholder='comparer'
                        className={styles.collectionDataField}
                        value={crntItem['comparer'] ?? ""}
                        required={true}
                        disabled={false}
                        onChange={(e, value) => this.onValueChanged('comparer', value)}
                        // deferredValidationTime={field.deferredValidationTime || field.deferredValidationTime >= 0 ? field.deferredValidationTime : 200}
                        onGetErrorMessage={async (value: string) => await this.fieldValidation('comparer', value)}
                        inputClassName="PropertyFieldCollectionData__panel__string-field" />    
          </span>
          <span key={`dataitem-right`} className={`${styles.tableCell} ${styles.inputField}`}>
          <TextField placeholder='right'
                      className={styles.collectionDataField}
                      value={crntItem['right'] ?? ""}
                      required={true}
                      disabled={false}
                      onChange={(e, value) => this.onValueChanged('right', value)}
                      // deferredValidationTime={field.deferredValidationTime || field.deferredValidationTime >= 0 ? field.deferredValidationTime : 200}
                      onGetErrorMessage={async (value: string) => await this.fieldValidation('right', value)}
                      inputClassName="PropertyFieldCollectionData__panel__string-field" />   
        </span></>)
          
        }

        <span className={styles.tableCell}>
          <span ref={ref => this.calloutCellRef = ref}>
            <Link title='TODO:ShowErrors' // strings.RuleTreeNodeShowErrorsLabel
                  className={styles.errorCalloutLink}
                  disabled={!this.state.errorMsgs || this.state.errorMsgs.length === 0}
                  onClick={this.toggleErrorCallout}>
              <Icon iconName="Error" />
            </Link>
          </span>

          {
            this.state.showCallout && (
              <Callout className={styles.errorCallout}
                       target={this.calloutCellRef}
                       isBeakVisible={true}
                       directionalHint={DirectionalHint.bottomLeftEdge}
                       directionalHintForRTL={DirectionalHint.rightBottomEdge}
                       onDismiss={this.hideErrorCallout}>
                {
                  (this.state.errorMsgs && this.state.errorMsgs.length > 0) && (
                    <div className={styles.errorMsgs}>
                      <p>Field issues:</p>
                      <ul>
                        {
                          this.state.errorMsgs.map((msg, idx) => (
                            <li key={`${msg.field}-${idx}`}><b>{msg.field}</b>: {msg.message ? msg.message : msg.isRequired ? 'TODO:Required' : null}</li> //strings.RuleTreeNodeFieldRequiredLabel 
                          ))
                        }
                      </ul>
                    </div>
                  )
                }
              </Callout>
            )
          }
        </span>

        <span className={styles.tableCell}>
        {
          /* Check add or delete action */
          this.props.index !== null ? (
            <Link title={strings.CollectionDeleteRowButtonLabel} disabled={!this.props.fDeleteItem || this.props.disableItemDeletion} onClick={this.deleteRow}>
              <Icon iconName="Clear" />
            </Link>
          ) : (
            <Link title={strings.CollectionAddRowButtonLabel} className={`${disableAdd ? "" : styles.addBtn}`} disabled={disableAdd} onClick={async () => await this.addRow()}>
              <Icon iconName="Add" />
            </Link>
          )
        }
        </span>
      </div>
    );
  }
}

// TODO
/*

  {
          (this.props.sortingEnabled && this.props.totalItems) && (
            <span className={`PropertyFieldCollectionData__panel__sorting-field ${styles.tableCell}`}>
              <Dropdown options={opts} selectedKey={this.props.index + 1} onChanged={(opt) => this.props.fOnSorting(this.props.index, opt.key as number) } />
            </span>
          )
        }
        {
          (this.props.sortingEnabled && this.props.totalItems === null) && (
            <span className={`${styles.tableCell}`}></span>
          )
        }
        */