import * as React from 'react';
import styles from '../PropertyFieldCollectionDataHost.module.scss';
import { TextField } from 'office-ui-fabric-react/lib/components/TextField';
import { Icon } from 'office-ui-fabric-react/lib/components/Icon';
import { Link } from 'office-ui-fabric-react/lib/components/Link';
import * as strings from 'PropertyControlStrings';
import { ICustomCollectionField, CustomCollectionFieldType } from '../ICustomCollectionField';
import { FieldValidator } from '../FieldValidator';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/components/Dropdown';
import { Callout, DirectionalHint } from 'office-ui-fabric-react/lib/components/Callout';
import { CollectionIconField } from '../collectionIconField';
import { clone, findIndex, sortBy } from '@microsoft/sp-lodash-subset';
import { CollectionNumberField } from '../collectionNumberField';
import { CollectionColorField } from '../collectionColorField';
import { Guid } from '@microsoft/sp-core-library';
import { CollectionDropdownField } from '../collectionDropdownField/CollectionDropdownField';
import { CollectionCheckboxField } from '../collectionCheckboxField/CollectionCheckboxField';
import { IBaseCollectionDataItemProps } from './IBaseCollectionDataItemProps';
import { IBaseCollectionDataItemState } from './IBaseCollectionDataItemState';

export class BaseCollectionDataItem extends React.Component<IBaseCollectionDataItemProps, IBaseCollectionDataItemState> {
  private validation: FieldValidator = {};
  private calloutCellRef: HTMLElement;

  constructor(props: IBaseCollectionDataItemProps) {
    super(props);

    // Create an empty item with all properties
    const emptyItem = this.generateEmptyItem();

    this.state = {
      crntItem: clone(this.props.item) || { ...emptyItem },
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
  public componentDidUpdate(prevProps: IBaseCollectionDataItemProps): void {
    if (this.props.item !== prevProps.item) {
      this.setState({
        crntItem: clone(this.props.item)
      });
    }
  }

  /**
   * Update the item value on the field change
   */
  private onValueChanged = (fieldId: string, value: any): Promise<void> => { // eslint-disable-line @typescript-eslint/no-explicit-any
    return new Promise((resolve) => this.setState((prevState: IBaseCollectionDataItemState) => {
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
  private async doAllFieldChecks(): Promise<void> {
    const { crntItem } = this.state;

    let disableAdd: boolean = null;

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
  private checkAllRequiredFieldsValid(item: any): boolean { // eslint-disable-line @typescript-eslint/no-explicit-any
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
  private checkAnyFieldContainsValue(item: any): boolean { // eslint-disable-line @typescript-eslint/no-explicit-any
    const { fields } = this.props;
    for (const field of fields) {
      if (typeof item[field.id] !== "undefined" && item[field.id] !== null && item[field.id] !== "") {
        return true;
      }
    }
    return false;
  }

  /**
   * Check onGetCustomErrorMessage
   * @param item
   */
  private async checkAnyFieldCustomErrorMessage(item: any): Promise<boolean> { // eslint-disable-line @typescript-eslint/no-explicit-any
    const { fields, index } = this.props;

    const validations = await Promise.all(fields.filter(f => f.onGetErrorMessage).map(async f => {
      const validation = await f.onGetErrorMessage(item[f.id], index, item);
      return this.storeFieldValidation(f.id, validation);
    }));

    return validations.filter(v => v && v.length > 0).length === 0;
  }

  /**
   * Check if row is ready for save
   */
  private async checkRowIsValidForSave(item: any): Promise<boolean> { // eslint-disable-line @typescript-eslint/no-explicit-any
    return this.checkAllRequiredFieldsValid(item) &&
      this.checkAnyFieldContainsValue(item) &&
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
   * Add the current row to the collection
   */
  private addRow = async (): Promise<void> => {
    if (this.props.fAddItem) {
      const { crntItem } = this.state;
      // Check if all the fields are correctly provided
      if (this.checkRowIsValidForSave(crntItem)) {
        this.props.fAddItem(crntItem);
        // Clear all field values
        const emptyItem = this.generateEmptyItem();
        this.setState({
          crntItem: { ...emptyItem }
        });
      }
    }
  }

  /**
   * Add the current row to the collection
   */
  private updateItem = async (): Promise<void> => {
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
  private deleteRow = (): void => {
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
  private fieldValidation = async (field: ICustomCollectionField, value: any): Promise<string> => { // eslint-disable-line @typescript-eslint/no-explicit-any
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
    console.log(fieldId, errorMsg);
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
  private urlFieldValidation = async (field: ICustomCollectionField, value: any, item: any): Promise<string> => { // eslint-disable-line @typescript-eslint/no-explicit-any
    let isValid = true;
    let validation = "";

    // Check if custom validation is configured
    if (field.onGetErrorMessage) {
      // Using the custom validation
      validation = await field.onGetErrorMessage(value, this.props.index, item);
      isValid = validation === "";
    } else {
      // Check if entered value is a valid URL
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
    this.setState((prevState: IBaseCollectionDataItemState) => {
      let { errorMsgs } = prevState;
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

      return {
        errorMsgs
      };
    });
  }

  /**
   * Toggle the error callout
   */
  private toggleErrorCallout = (): void => {
    this.setState((prevState: IBaseCollectionDataItemState) => ({
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
  private renderField(field: ICustomCollectionField, item: any): JSX.Element { // eslint-disable-line @typescript-eslint/no-explicit-any
    const disableFieldOnEdit: boolean = (field.disableEdit && !!this.props.fUpdateItem) || (field.disable && field.disable(item));

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
          inputClassName="PropertyFieldCollectionData__panel__url-field" />;
      case CustomCollectionFieldType.custom:
        if (field.onCustomRender) {
          return field.onCustomRender(field, item[field.id], (fieldId, value) => {
            this.onValueChanged(fieldId, value).then(() => {
              this.fieldValidation(field, value).then(() => { /* no-op; */ }).catch(() => { /* no-op; */ });
            }).catch(() => { /* no-op; */ });
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
          inputClassName="PropertyFieldCollectionData__panel__string-field" />;
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
  * Creates an empty item with a unique id
  */
  private generateEmptyItem(): any { // eslint-disable-line @typescript-eslint/no-explicit-any
    // Create an empty item with all properties
    const emptyItem: any = {}; // eslint-disable-line @typescript-eslint/no-explicit-any
    emptyItem.uniqueId = Guid.newGuid().toString();

    for (const field of this.props.fields) {
      // Assign default value or null to the emptyItem
      emptyItem[field.id] = field.defaultValue || null;
    }
    return emptyItem;
  }

  /**
   * Default React render
   */
  public render(): React.ReactElement<IBaseCollectionDataItemProps> {
    const { crntItem, disableAdd } = this.state;
    const opts = this.getSortingOptions();

    return (
      <div className={`PropertyFieldCollectionData__panel__table-row ${styles.tableRow} ${this.props.index === null ? styles.tableFooter : ""}`}>
        {
          (this.props.sortingEnabled && this.props.totalItems) && (
            <span className={`PropertyFieldCollectionData__panel__sorting-field ${styles.tableCell}`}>
              <Dropdown options={opts} selectedKey={this.props.index + 1} onChanged={(opt) => this.props.fOnSorting(this.props.index, opt.key as number)} />
            </span>
          )
        }
        {
          (this.props.sortingEnabled && this.props.totalItems === null) && (
            <span className={`${styles.tableCell}`} />
          )
        }
        {
          this.props.fields.map(f => (
            <span key={`dataitem-${f.id}`} className={`${styles.tableCell} ${styles.inputField}`}>{this.renderField(f, crntItem)}</span>
          ))
        }

        <span className={styles.tableCell}>
          <span ref={ref => { this.calloutCellRef = ref; }}>
            <Link title={strings.CollectionDataItemShowErrorsLabel}
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
                      <p>{strings.CollectionDataItemFieldIssuesLabel}</p>
                      <ul>
                        {
                          this.state.errorMsgs.map((msg, idx) => (
                            <li key={`${msg.field}-${idx}`}><b>{msg.field}</b>: {msg.message ? msg.message : msg.isRequired ? strings.CollectionDataItemFieldRequiredLabel : null}</li>
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
              <Link title={strings.CollectionAddRowButtonLabel} className={`${disableAdd ? styles.addBtnDisabled : styles.addBtn}`} disabled={disableAdd} onClick={async () => await this.addRow()}>
                <Icon iconName="Add" />
              </Link>
            )
          }
        </span>
      </div>
    );
  }
}
