import * as React from 'react';
import { Dropdown } from 'office-ui-fabric-react/lib/components/Dropdown';
import { IPropertyFieldMultiSelectHostProps } from './IPropertyFieldMultiSelectHost';
import * as telemetry from '../../common/telemetry';

export default class PropertyFieldMultiSelectHost extends React.Component<IPropertyFieldMultiSelectHostProps, null> {
  constructor(props: IPropertyFieldMultiSelectHostProps) {
    super(props);

    telemetry.track('PropertyFieldMultiSelect', {
      disabled: props.disabled
    });
  }

  public render(): JSX.Element {
    return (
      <div>
        <Dropdown {...this.props} multiSelect={true} />
      </div>
    );
  }
}
