import * as React from 'react';
import { Dropdown } from 'office-ui-fabric-react/lib/components/Dropdown';
import { IPropertyFieldMultiSelectHostProps } from './IPropertyFieldMultiSelectHost';
import * as appInsights from '../../common/appInsights';

export default class PropertyFieldMultiSelectHost extends React.Component<IPropertyFieldMultiSelectHostProps, null> {
  constructor(props: IPropertyFieldMultiSelectHostProps) {
    super(props);

    appInsights.track('PropertyFieldMultiSelect', {
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
