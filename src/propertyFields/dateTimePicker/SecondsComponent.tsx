import * as React from "react";
import { ITimeComponentProps } from "./IPropertyFieldDateTimePickerHost";
import { Dropdown, IDropdownOption } from "office-ui-fabric-react/lib/components/Dropdown";

/**
 * @class
 * Seconds component
 */
export default class SecondsComponent extends React.Component<ITimeComponentProps, {}> {
  constructor(props: ITimeComponentProps) {
    super(props);
  }

  public render(): JSX.Element {
    let seconds: IDropdownOption[] = [];
    for (let k = 0; k < 60; k++) {
      let digitSec: string;
      if (k < 10) {
        digitSec = '0' + k;
      } else {
        digitSec = k.toString();
      }
      let selected: boolean = false;
      if (k == this.props.value) {
        selected = true;
      }
      seconds.push({ key: k, text: digitSec, isSelected: selected });
    }

    return (
      <Dropdown
        label=""
        options={seconds}
        onChanged={this.props.onChange} />
    );
  }
}
