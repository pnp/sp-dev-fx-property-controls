import * as strings from 'PropertyControlStrings';
import * as React from 'react';
import { Dropdown } from 'office-ui-fabric-react/lib/components/Dropdown';
import { Label } from 'office-ui-fabric-react/lib/components/Label';
import { IPropertyFieldMultiSelectHostProps } from './IPropertyFieldMultiSelectHost';
import * as telemetry from '../../common/telemetry';

export default class PropertyFieldMultiSelectHost extends React.Component<IPropertyFieldMultiSelectHostProps, {}> {
  constructor(props: IPropertyFieldMultiSelectHostProps) {
    super(props);

    telemetry.track('PropertyFieldMultiSelect', {
      disabled: props.disabled
    });
  }

  public render(): JSX.Element {
    if (this.props.options && this.props.options.length === 0 &&
        this.props.selectedKeys && this.props.selectedKeys.length > 0) {
      return (
        <div>
          <Dropdown label={this.props.label} placeHolder={strings.propertyFieldMultiSelectNoOptions} disabled={true} />
        </div>
      );
    }

    return (
      <div>
        <Dropdown key={`MultiSelectOptions-${this.props.options.length}`} {...this.props} multiSelect={true} />
      </div>
    );
  }
}
