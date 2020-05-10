import * as React from "react";
import { TextField, Spinner, SpinnerSize } from "office-ui-fabric-react";
//import styles from './Component.module.scss';

import {
   IPropertyFieldSpinnerHostProps,
  IPropertyFieldSpinnerHostState
} from "./IPropertyFieldSpinnerHost";


export default class PropertyFieldPasswordHost extends React.Component<
  IPropertyFieldSpinnerHostProps,
  IPropertyFieldSpinnerHostState
> {
  constructor(props: IPropertyFieldSpinnerHostProps) {
    super(props);

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
       >
       </Spinner>
      }
      </div>
    );
  }
}
