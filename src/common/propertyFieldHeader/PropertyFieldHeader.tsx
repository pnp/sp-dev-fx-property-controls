import * as React from 'react';
import { Callout, DirectionalHint } from 'office-ui-fabric-react/lib/components/Callout';
import { IPropertyFieldHeaderProps, IPropertyFieldHeaderState, CalloutTriggers } from './IPropertyFieldHeader';
import { getIconClassName } from 'office-ui-fabric-react/lib/Styling';
import { css } from 'office-ui-fabric-react/lib/Utilities';

import styles from './PropertyFieldHeader.module.scss';

/**
 * PropertyFieldHeader component.
 * Displays a label and a callout
 */
export default class PropertyFieldHeader extends React.Component<IPropertyFieldHeaderProps, IPropertyFieldHeaderState> {

  private _infoIcon: HTMLElement;

  public constructor(props: IPropertyFieldHeaderProps, state: IPropertyFieldHeaderState) {
    super(props, state);
    this._onCalloutDismiss = this._onCalloutDismiss.bind(this);
    this.state = {
      isCalloutVisible: false
    };
  }

  public render(): JSX.Element {
    const {
      disabled,
      label,
      calloutContent,
      calloutTrigger,
      calloutWidth,
      gapSpace
    } = this.props;

    return (
      <div className={css({
        [styles.headerBar]: true,
        [styles.isDisabled]: !!disabled
      })}>
        <div className={styles.header}>
          {label}
        </div>
        <div className={styles.info}>
          {calloutContent && (
            <i className={getIconClassName('Info')} ref={(infoIcon) => { this._infoIcon = infoIcon; }}
              onMouseOver={!disabled && calloutTrigger === CalloutTriggers.Hover ? this._onInfoIconMouseOver.bind(this) : null}
              onMouseOut={!disabled && calloutTrigger === CalloutTriggers.Hover ? this._onInfoIconMouseOut.bind(this) : null}
              onClick={!disabled && calloutTrigger === CalloutTriggers.Click ? this._onInfoIconClick.bind(this) : null}></i>
          )}
        </div>
        {this.state.isCalloutVisible && (
          <Callout
            className={styles.headerCallout}
            target={this._infoIcon}
            isBeakVisible={true}
            directionalHint={DirectionalHint.leftCenter}
            directionalHintForRTL={DirectionalHint.rightCenter}
            onDismiss={this._onCalloutDismiss}
            gapSpace={gapSpace !== undefined ? gapSpace : 5}
            calloutWidth={calloutWidth}>
            {calloutContent}
          </Callout>
        )
        }
      </div>);
  }


  private _onCalloutDismiss() {
    if (this.state.isCalloutVisible) {
      this.setState({
        isCalloutVisible: false
      });
    }
  }

  private _onInfoIconMouseOver(): void {
    if (this.props.calloutTrigger !== CalloutTriggers.Hover) {
      return;
    }

    if (!this.state.isCalloutVisible) {
      this.setState({
        isCalloutVisible: true
      });
    }
  }

  private _onInfoIconMouseOut(e: MouseEvent): void {
    if (this.props.calloutTrigger !== CalloutTriggers.Hover) {
      return;
    }

    if (e.relatedTarget) {

      let relatedTarget: HTMLElement = (e.relatedTarget as HTMLElement);
      if (relatedTarget && relatedTarget.closest('.ms-Callout-container')) {
        return;
      }
    }

    this.setState({
      isCalloutVisible: false
    });

  }

  private _onInfoIconClick(): void {
    if (this.props.calloutTrigger !== CalloutTriggers.Click) {
      return;
    }

    this.setState({
      isCalloutVisible: !this.state.isCalloutVisible
    });
  }
}
