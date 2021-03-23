import * as React from "react";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import * as telemetry from '../../common/telemetry';
//import styles from './Component.module.scss';

import {
  IPropertyFieldPasswordHostProps,
  IPropertyFieldPasswordHostState
} from "./IPropertyFieldPasswordHost";

export default class PropertyFieldPasswordHost extends React.Component<
  IPropertyFieldPasswordHostProps,
  IPropertyFieldPasswordHostState
> {
  constructor(props: IPropertyFieldPasswordHostProps) {
    super(props);

    telemetry.track('PropertyFieldPassword', {});

    this.state = {
      value: this.props.value
    };
  }
  ///
  public componentDidUpdate(prevProps: IPropertyFieldPasswordHostProps, prevState:  IPropertyFieldPasswordHostState): void {
    if (prevProps.value !== this.props.value){
      this.setState({value : this.props.value});
    }
  }

  public render(): React.ReactElement<IPropertyFieldPasswordHostProps> {
    return (
      <div>
        <TextField
          type="password"
          label={this.props.label ? this.props.label : null}
          value={this.state.value}
          onChange={(
              e,
             newValue:string
          ) => {
            this.setState({ value: newValue });
            this.props.onChanged(newValue);
          }}
        />
      </div>
    );
  }
}
