import * as React from "react";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { Guid } from '@microsoft/sp-core-library';

import {
  IPropertyFieldGuidHostProps,
  IPropertyFieldGuidHostState
} from "./IPropertyFieldGuidHost";
import { GeneralHelper } from "../../helpers/GeneralHelper";
import * as strings from 'PropertyControlStrings';
import * as telemetry from '../../common/telemetry';

export default class PropertyFieldGuidHost extends React.Component<
  IPropertyFieldGuidHostProps,
  IPropertyFieldGuidHostState
  > {
  constructor(props: IPropertyFieldGuidHostProps) {
    super(props);
    this.state = {
      value: this.props.value
    };

    telemetry.track('PropertyFieldButton', {});
  }
  ///
  public componentDidUpdate(prevProps: IPropertyFieldGuidHostProps, prevState: IPropertyFieldGuidHostState): void {
    if (prevProps.value !== this.props.value) {
      this.setState({ value: this.props.value });
    }
  }

  private _validateGuid = (value: string): string => {

    return GeneralHelper.isDefined(value) &&
      GeneralHelper.isDefined(Guid.tryParse(value)) &&
      Guid.isValid(value)
      ? ''
      : GeneralHelper.isDefined(this.props.errorMessage)
        ? this.props.errorMessage
        : strings.IncorrectGuidValidationMessage;
  }

  private _onChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, value: string): void => {
    this.setState({ value });

    if (GeneralHelper.isDefined(value)) {
      if (GeneralHelper.isDefined(Guid.tryParse(value)) && Guid.isValid(value)) {
        this.props.onChanged(Guid.tryParse(value)["_guid"]);
      }
    } else {
      this.props.onChanged(undefined);
    }
  }

  public render(): React.ReactElement<IPropertyFieldGuidHostProps> {
    return (
      <div>
        <TextField
          label={this.props.label ? this.props.label : null}
          value={this.state.value}
          onGetErrorMessage={this._validateGuid}
          onChange={this._onChange}
        />
      </div>
    );
  }
}
