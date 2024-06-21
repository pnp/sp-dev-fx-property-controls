import * as React from "react";
import { Spinner } from "@fluentui/react/lib/Spinner";
//import styles from './Component.module.scss';

import {
  IPropertyFieldSpinnerHostProps,
  IPropertyFieldSpinnerHostState
} from "./IPropertyFieldSpinnerHost";

import * as telemetry from '../../common/telemetry';


export default class PropertyFieldSpinnerHost extends React.Component<
  IPropertyFieldSpinnerHostProps,
  IPropertyFieldSpinnerHostState
> {
  constructor(props: IPropertyFieldSpinnerHostProps) {
    super(props);

    telemetry.track('PropertyFieldSpinner', {});

    this.state = {
      isVisible: this.props.isVisible
    };
  }
  ///
  public componentDidUpdate(
    prevProps: IPropertyFieldSpinnerHostProps,
    prevState: IPropertyFieldSpinnerHostState
  ): void {
    if (prevProps.isVisible !== this.props.isVisible) {
      this.setState({ isVisible: this.props.isVisible });
    }
  }

  public render(): React.ReactElement<IPropertyFieldSpinnerHostProps> {
    return (
      <div>
        {
          this.props.isVisible &&
          <Spinner
            className={this.props.className}
            size={this.props.size}
            label={this.props.label}
          />
        }
      </div>
    );
  }
}
