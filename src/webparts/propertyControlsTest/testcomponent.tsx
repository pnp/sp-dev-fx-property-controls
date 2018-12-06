import * as React from 'react';

export interface IComponentProps {}

export interface IComponentState {}

export default class Component extends React.Component<IComponentProps, IComponentState> {
  constructor(props: IComponentProps) {
    super(props);

    this.state = {

    };
  }

  public render(): React.ReactElement<IComponentProps> {
    return (
      <div>
        <input value="nothing" onChange={null} /> 🎉
      </div>
    );
  }
}
