import * as React from "react";
import { SearchBox } from "office-ui-fabric-react";
import * as telemetry from '../../common/telemetry';

import {
  IPropertyFieldSearchHostProps,
  IPropertyFieldSearchHostState
} from "./IPropertyFieldSearchHost";

export default class PropertyFieldSearchHost extends React.Component<
  IPropertyFieldSearchHostProps,
  IPropertyFieldSearchHostState
> {
  constructor(props: IPropertyFieldSearchHostProps) {
    super(props);

    telemetry.track('PropertyFieldOrder', {});

    this.state = {
      value: this.props.value
    };
  }
  ///
  public componentDidUpdate(
    prevProps: IPropertyFieldSearchHostProps,
    prevState: IPropertyFieldSearchHostState
  ): void {
    if (prevProps.value !== this.props.value) {
      this.setState({ value: this.props.value });
    }
  }

  public render(): React.ReactElement<IPropertyFieldSearchHostProps> {
    return (
      <div>
        <SearchBox
          underlined={this.props.underlined}
          placeholder={this.props.placeholder}
          onSearch={this.props.onSearch}
          onClear={this.props.onClear}
          onEscape={this.props.onEscape}
          value={this.state.value}
          onChange={(
            e,
            newvalue: string
          ) => {
            this.setState({ value: newvalue });
            this.props.onChange(newvalue);
          }}
        />
      </div>
    );
  }
}
