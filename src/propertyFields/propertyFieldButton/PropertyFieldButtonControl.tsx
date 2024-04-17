import * as React from 'react';

import {
  DefaultButton,
  PrimaryButton,
} from '@fluentui/react/lib/Button';

import {
  IPropertyFieldButtonControlProps,
  IPropertyFieldButtonControlState,
} from './IPropertyFieldButtonControl';

//import styles from './Component.module.scss';

export default class PropertyFieldButtonControl extends React.Component<
  IPropertyFieldButtonControlProps,
  IPropertyFieldButtonControlState
> {
  constructor(props: IPropertyFieldButtonControlProps) {
    super(props);
    this.state = {
      isVisible: this.props.isVisible,
      disabled: this.props.disabled,
      isPrimary: this.props.isPrimary,
      text: this.props.text,
      iconProps: this.props.iconProps,
      onClick: this.props.onClick,
      key: this.props.key,
    };
  }
  ///
  public componentDidUpdate(
    prevProps: IPropertyFieldButtonControlProps,
    prevState: IPropertyFieldButtonControlState
  ): void {
    if (
      prevProps.isVisible !== this.props.isVisible ||
      prevProps.disabled !== this.props.disabled ||
      prevProps.isPrimary !== this.props.isPrimary ||
      prevProps.className !== this.props.className ||
      prevProps.styles !== this.props.styles ||
      prevProps.text !== this.props.text ||
      prevProps.iconProps !== this.props.iconProps ||
      prevProps.onClick !== this.props.onClick ||
      prevProps.key !== this.props.key
   

    ) {
      this.setState({
        isVisible: this.props.isVisible,
        disabled: this.props.disabled,
        isPrimary: this.props.isPrimary,
        className: this.props.className,
        styles: this.props.styles,
        text: this.props.text,
        iconProps: this.props.iconProps,
        onClick: this.props.onClick,
        key: this.props.key,
      });
    }
  }

   

  public render(): React.ReactElement<IPropertyFieldButtonControlProps> {
    if (!this.props.isVisible) {
      return null;
    }
    return (
      <div>
        {this.props.isPrimary ? (
          <PrimaryButton
            text={this.state.text}
            key={this.state.key}
            disabled={this.state.disabled}
            className={this.state.className}
            styles={this.state.styles}
            onClick={this.state.onClick}
            iconProps={this.state.iconProps}
          />
        ) : (
          <DefaultButton
          text={this.state.text}
          key={this.state.key}
          disabled={this.state.disabled}
          className={this.state.className}
          styles={this.state.styles}
          onClick={this.state.onClick}
          iconProps={this.state.iconProps}
          />
        )}
      </div>
    );
  }
}

