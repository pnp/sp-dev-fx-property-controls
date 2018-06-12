import * as React from 'react';
import styles from '../PropertyFieldCollectionDataHost.module.scss';
import { ICollectionIconFieldProps } from '.';
import { TextField } from 'office-ui-fabric-react/lib/components/TextField';
import { Icon } from 'office-ui-fabric-react/lib/components/Icon';

export class CollectionIconField extends React.Component<ICollectionIconFieldProps, {}> {
  constructor(props: ICollectionIconFieldProps) {
    super(props);

    this.state = {
      iconName: null
    };
  }

  public render(): React.ReactElement<ICollectionIconFieldProps> {
    return (
      <div className={styles.iconField}>
        <TextField placeholder={this.props.field.title}
                   value={this.props.item[this.props.field.id] ? this.props.item[this.props.field.id] : ""}
                   required={this.props.field.required}
                   onChanged={(value) => this.props.fOnValueChange(this.props.field.id, value)} />
        <Icon iconName={this.props.item[this.props.field.id] ? this.props.item[this.props.field.id] : ""} />
      </div>
    );
  }
}
