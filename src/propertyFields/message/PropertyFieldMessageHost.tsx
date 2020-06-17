import * as React from "react";
import { TextField, MessageBar, MessageBarType } from "office-ui-fabric-react";
//import styles from './Component.module.scss';

import {
  IPropertyFieldMessageHostProps,
  IPropertyFieldMessageHostState
} from "./IPropertyFieldMessageHost";


export default class PropertyFieldPasswordHost extends React.Component<
  IPropertyFieldMessageHostProps,
  IPropertyFieldMessageHostState
> {
  constructor(props: IPropertyFieldMessageHostProps) {
    super(props);

    this.state = {
      text: this.props.text
    };
  }
  ///
  public componentDidUpdate(
    prevProps: IPropertyFieldMessageHostProps,
    prevState: IPropertyFieldMessageHostState
  ): void {
    if (prevProps.text !== this.props.text) {
      this.setState({ text: this.props.text });
    }
  }

  public render(): React.ReactElement<IPropertyFieldMessageHostProps> {
    return (
      <div>


      {
        this.props.isVisible &&
         <MessageBar
         className={this.props.className}
         messageBarType={this.props.messageType}
         isMultiline={this.props.multiline}
         truncated={this.props.truncate}
       >
         {this.state.text}
       </MessageBar>
      }
      </div>
    );
  }
}
