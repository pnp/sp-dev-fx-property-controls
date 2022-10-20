import * as React from 'react';
import styles from '../PropertyFieldTreeCollectionDataHost.module.scss';
import { ITreeCollectionDataItemProps, ITreeCollectionDataItemState } from '.';
import { TextField } from 'office-ui-fabric-react/lib/components/TextField';
import { Icon } from 'office-ui-fabric-react/lib/components/Icon';
import { Link } from 'office-ui-fabric-react/lib/components/Link';
import * as strings from 'PropertyControlStrings';

import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/components/Dropdown';
import { Callout, DirectionalHint } from 'office-ui-fabric-react/lib/components/Callout';

import { clone, findIndex, sortBy } from '@microsoft/sp-lodash-subset';
import { CollectionDropdownField } from '../../collectionData/collectionDropdownField/CollectionDropdownField';
import { isEqual } from '@microsoft/sp-lodash-subset';
import { CollectionCheckboxField } from '../../collectionData/collectionCheckboxField/CollectionCheckboxField';
import { CustomCollectionFieldType, ICustomCollectionField, FieldValidator } from '../../collectionData';
import { CollectionNumberField } from '../../collectionData/collectionNumberField/CollectionNumberField';
import { CollectionColorField } from '../../collectionData/collectionColorField/CollectionColorField';
import { CollectionIconField } from '../../collectionData/collectionIconField/CollectionIconField';

export class TreeCollectionDataItem extends React.Component<ITreeCollectionDataItemProps, ITreeCollectionDataItemState> {

  private validation: FieldValidator = {};
  private calloutCellRef: HTMLElement;

  constructor(props: ITreeCollectionDataItemProps) {
    super(props);

    this.state = {
      crntItem: clone(this.props.itemData),
      errorMsgs: [],
      showCallout: false,
      isLoading: true
    };
  }


  public async componentDidMount(): Promise<void> {

    const isValid = await this.checkNodeIsValidForSave(this.props.itemData);

    // Set the validation for the item
    if (this.props.fValidation) {
      this.props.fValidation(this.props.itemKey, isValid);
    }

    this.setState({ isLoading: false });
  }
  /**
   * componentDidUpdate lifecycle hook
   * @param prevProps
   * @param prevState
   */
  public componentDidUpdate(prevProps: ITreeCollectionDataItemProps, prevState: ITreeCollectionDataItemState): void {

    if (!isEqual(prevProps, this.props)) {
      this.setState({
        crntItem: clone(this.props.itemData)
      });
    }
  }

  /**
   * Update the item value on the field change
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private onValueChanged = (fieldId: string, value: any): Promise<void> => {

    const crntItem = clone(this.state.crntItem);
    // Update the changed field
    crntItem[fieldId] = value;
    this.setState({ crntItem });
    return;
  }

  /**
   * Perform all required field checks at once
   */
  private async doAllFieldChecks(): Promise<void> {
    // Check if item needs to be updated
    if (this.props.fUpdateItem && !isEqual(this.props.itemData, this.state.crntItem)) {
      await this.updateItem();
    }
  }

  /**
   * Check if all values of the required fields are provided
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private checkAllRequiredFieldsValid(item: any): boolean {
    // Get all the required fields
    const requiredFields = this.props.fields.filter(f => f.required);
    // Check all the required field values
    for (const field of requiredFields) {
      if (typeof item[field.id] === "undefined" || item[field.id] === null || item[field.id] === "") {
        return false;
      }
    }
    return true;
  }

  /**
   * Check if any of the fields contain a value
   * @param item
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  /*private checkAnyFieldContainsValue(item: any): boolean {
    const { fields } = this.props;
    for (const field of fields) {
      if (typeof item[field.id] !== "undefined" && item[field.id] !== null && item[field.id] !== "") {
        return true;
      }
    }
    return false;
  }*/

  /**
   * Check onGetCustomErrorMessage
   * @param item
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private async checkAnyFieldCustomErrorMessage(item: any): Promise<boolean> {
    const { fields, index } = this.props;

    const validations = await Promise.all(fields.filter(f => f.onGetErrorMessage).map(async f => {
      const validation = await f.onGetErrorMessage(item[f.id], index, item);
      return this.storeFieldValidation(f.id, validation);
    }));

    return validations.filter(v => v && v.length > 0).length === 0;
  }

  /**
   * Check if node is ready for save
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private async checkNodeIsValidForSave(item: any): Promise<boolean> {

    return this.checkAllRequiredFieldsValid(item) &&
      //this.checkAnyFieldContainsValue(item) &&
      await this.checkAnyFieldCustomErrorMessage(item) &&
      this.checkAllFieldsAreValid();
  }

  /**
   * Checks if all fields are valid
   */
  private checkAllFieldsAreValid(): boolean {
    if (this.validation) {
      const keys = Object.keys(this.validation);
      for (const key of keys) {
        if (!this.validation[key]) {
          return false;
        }
      }
    }
    return true;
  }

  /**
   * Add an empty node to the collection
   */
  private addNode = async (): Promise<void> => {
    if (this.props.fAddItem) {
      this.props.fAddItem(this.props.itemKey);
    }
  }

  /**
   * Update the current node
   */
  private updateItem = async (): Promise<void> => {
    const { crntItem } = this.state;
    const isValid = await this.checkNodeIsValidForSave(crntItem);

    if (this.props.fUpdateItem) {
      // Check if all the fields are correctly provided
      if (isValid) {
        this.props.fUpdateItem(this.props.itemKey, crntItem);
      }
    }

    // TODO: We set validation anyways?
    // Set the validation for the item
    if (this.props.fValidation) {
      this.props.fValidation(this.props.itemKey, isValid);
    }
  }

  /**
   * Delete the item from the collection
   */
  private deleteNode = (): void => {
    if (this.props.fDeleteItem) {
      this.props.fDeleteItem(this.props.itemKey, this.props.parentKey);
    }
  }

  /**
   * Allow custom field validation
   *
   * @param field
   * @param value
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private fieldValidation = async (field: ICustomCollectionField, value: any): Promise<string> => {

    let validation = "";
    // Do the custom validation check
    if (field.onGetErrorMessage) {
      // Set initial field validation
      this.validation[field.id] = false;
      // Do the validation
      validation = await field.onGetErrorMessage(value, this.props.index, this.state.crntItem);
    }

    return this.storeFieldValidation(field.id, validation, true);
  }

  /**
   * Updates callout and validation state
   */
  private async storeFieldValidation(fieldId: string, validation: string, doAllFieldChecks: boolean = false): Promise<string> {
    // Store the field validation
    this.validation[fieldId] = validation === "";
    // Add message for the error callout
    this.errorCalloutHandler(fieldId, validation);
    if (doAllFieldChecks) {
      await this.doAllFieldChecks();
    }
    return validation;
  }

  /**
   * Custom field validation
   */
  private onCustomFieldValidation = async (fieldId: string, errorMsg: string): Promise<void> => {

    if (fieldId) {
      await this.storeFieldValidation(fieldId, errorMsg, true);
    }
  }

  /**
   * URL field validation
   *
   * @param field
   * @param value
   * @param item
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private urlFieldValidation = async (field: ICustomCollectionField, value: any, item: any): Promise<string> => {
    let isValid = true;
    let validation = "";

    // Check if custom validation is configured
    if (field.onGetErrorMessage) {
      // Using the custom validation
      validation = await field.onGetErrorMessage(value, this.props.index, item);
      isValid = validation === "";
    } else {
      // Check if entered value is a valid URL
      //const regEx: RegExp = /(http|https)?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)/;
      //TODO check
      const regEx: RegExp = /(http|https)?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/;
      isValid = (value === null || value.length === 0 || regEx.test(value));
      validation = isValid ? "" : strings.InvalidUrlError;
    }

    return this.storeFieldValidation(field.id, validation, true);
  }

  /**
   * Error callout message handler
   *
   * @param field
   * @param message
   */
  private errorCalloutHandler(fieldId: string, message: string): void {

    let { errorMsgs } = this.state;
    const { crntItem } = this.state;

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


    if (!isEqual(this.state.errorMsgs, errorMsgs)) {
      this.setState({
        errorMsgs
      });
    }
  }

  /**
   * Toggle the error callout
   */
  private toggleErrorCallout = (): void => {
    this.setState((prevState: ITreeCollectionDataItemState) => ({
      showCallout: !prevState.showCallout
    }));
  }

  private hideErrorCallout = (): void => {
    this.setState({
      showCallout: false
    });
  }

  /**
   * Render the field
   *
   * @param field
   * @param item
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private renderField(field: ICustomCollectionField, item: any): JSX.Element {
    const disableFieldOnEdit: boolean = field.disableEdit && !!this.props.fUpdateItem;

    switch (field.type) {
      case CustomCollectionFieldType.boolean:
        return <CollectionCheckboxField field={field} item={item} disableEdit={disableFieldOnEdit} fOnValueChange={this.onValueChanged} fValidation={this.fieldValidation} />;
      case CustomCollectionFieldType.dropdown:
        return <CollectionDropdownField field={field} item={item} disableEdit={disableFieldOnEdit} fOnValueChange={this.onValueChanged} fValidation={this.fieldValidation} />;
      case CustomCollectionFieldType.number:
        return <CollectionNumberField field={field} item={item} disableEdit={disableFieldOnEdit} fOnValueChange={this.onValueChanged} fValidation={this.fieldValidation} />;
      case CustomCollectionFieldType.fabricIcon:
        return <CollectionIconField renderMode={field.iconFieldRenderMode} field={field} item={item} disableEdit={disableFieldOnEdit} fOnValueChange={this.onValueChanged} fValidation={this.fieldValidation} />;
      case CustomCollectionFieldType.color:
        return <CollectionColorField field={field} item={item} disableEdit={disableFieldOnEdit} fOnValueChange={this.onValueChanged} fValidation={this.fieldValidation} />;
      case CustomCollectionFieldType.url:
        return <TextField placeholder={field.placeholder || field.title}
          value={item[field.id] ? item[field.id] : ""}
          required={field.required}
          disabled={disableFieldOnEdit}
          className={styles.collectionDataField}
          onChange={(e, value) => this.onValueChanged(field.id, value)}
          deferredValidationTime={field.deferredValidationTime || field.deferredValidationTime >= 0 ? field.deferredValidationTime : 200}
          onGetErrorMessage={async (value: string) => this.urlFieldValidation(field, value, item)}
          inputClassName="PropertyFieldTreeCollectionData__panel__url-field" />;
      case CustomCollectionFieldType.custom:
        if (field.onCustomRender) {
          return field.onCustomRender(field, item[field.id], async (fieldId, value) => {
            await this.onValueChanged(fieldId, value);
            if (field.onGetErrorMessage) { await this.fieldValidation(field, value); }
          }, item, item.uniqueId, this.onCustomFieldValidation);
        }
        return null;
      case CustomCollectionFieldType.string:
      default:
        return <TextField placeholder={field.placeholder || field.title}
          className={styles.collectionDataField}
          value={item[field.id] ? item[field.id] : ""}
          required={field.required}
          disabled={disableFieldOnEdit}
          onChange={(e, value) => this.onValueChanged(field.id, value)}
          deferredValidationTime={field.deferredValidationTime || field.deferredValidationTime >= 0 ? field.deferredValidationTime : 200}
          onGetErrorMessage={async (value: string) => await this.fieldValidation(field, value)}
          inputClassName="PropertyFieldTreeCollectionData__panel__string-field" />;
    }
  }

  /**
   * Retrieve all dropdown options
   */
  private getSortingOptions(): IDropdownOption[] {
    const opts: IDropdownOption[] = [];
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
   * Default React render
   */
  public render(): React.ReactElement<ITreeCollectionDataItemProps> {

    if (this.state.isLoading) return <div />;

    const { crntItem } = this.state;
    const opts = this.getSortingOptions();

    return (
      <div className={`PropertyFieldTreeCollectionData__panel__table-row ${styles.tableRow} ${(this.props.level % 2 === 0) ? styles.tableRowEven : styles.tableRowOdd} ${this.props.index === null ? styles.tableFooter : ""}`}>
        {
          (this.props.enableSorting && this.props.totalItems > 1) && (
            <span className={`PropertyFieldTreeCollectionData__panel__sorting-field ${styles.tableCell}`}>
              <Dropdown options={opts} selectedKey={this.props.index} onChange={(event, opt) => this.props.fOnSorting(this.props.parentKey, this.props.index - 1, opt.key as number)} />
            </span>
          )
        }
        {
          (this.props.enableSorting && (this.props.totalItems === null || this.props.totalItems === 1)) && (
            <span className={`${styles.tableCell}`} />
          )
        }
        {
          this.props.fields.map(f => (
            <span key={`dataitem-${f.id}`} className={`${styles.tableCell} ${styles.inputField}`}>{this.renderField(f, crntItem)}</span>
          ))
        }

        <span className={styles.tableCell}>
          <span ref={ref => { this.calloutCellRef = ref }}>
            <Link title={strings.TreeCollectionDataItemShowErrorsLabel}
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
                            <li key={`${msg.field}-${idx}`}><b>{msg.field}</b>: {msg.message ? msg.message : msg.isRequired ? strings.TreeCollectionDataItemFieldRequiredLabel : null}</li>
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

            (<>  <Link title={strings.TreeCollectionDeleteNodeButtonLabel} disabled={!this.props.fDeleteItem || this.props.disableItemDeletion} onClick={this.deleteNode}>
              <Icon iconName="Clear" />
            </Link>

              <Link title={strings.TreeCollectionAddNodeButtonLabel} className={`${this.props.disableItemCreation ? styles.addBtnDisabled : styles.addBtn}`} disabled={!this.props.fAddItem || this.props.disableItemCreation} onClick={async () => await this.addNode()}>
                <Icon iconName="Add" />
              </Link>
            </>
            )
          }
        </span>
      </div>
    );
  }
}