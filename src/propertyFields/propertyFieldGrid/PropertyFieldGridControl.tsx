import * as React from 'react';

import {
  FluentProvider,
  IdPrefixProvider,
  Subtitle2,
  teamsLightTheme,
} from '@fluentui/react-components';

import { Grid } from './grid/Grid';
import {
  IPropertyFieldGridControlProps,
  IPropertyFieldGridControlState,
} from './IPropertyFieldGridControlProps';

export default class PropertyFieldButtonControl extends React.Component<
  IPropertyFieldGridControlProps,
  IPropertyFieldGridControlState
> {
  constructor(props: IPropertyFieldGridControlProps) {
    super(props);
    this.state = {
      ...props,
      selectedItems: this.props.defaultSelectedItems,
    };
  }
  ///
  public componentDidUpdate(
    prevProps: IPropertyFieldGridControlProps,
    prevState: IPropertyFieldGridControlState
  ): void {
    if (
      prevProps.isVisible !== this.props.isVisible ||
      prevProps.items !== this.props.items ||
      prevProps.className !== this.props.className ||
      prevProps.styles !== this.props.styles ||
      prevProps.label !== this.props.label ||
      prevProps.defaultSelectedItems !== this.props.defaultSelectedItems ||
      prevProps.key !== this.props.key ||
      prevProps.maxHeight !== this.props.maxHeight ||
      prevProps.multiSelect !== this.props.multiSelect
    ) {
      this.setState({
        items: this.props.items,
        defaultSelectedItems: this.props.defaultSelectedItems,
      });
    }
  }

  public render(): React.ReactElement<IPropertyFieldGridControlProps> {
    if (this.props.isVisible === false) {
      return null;
    }
    const containerStyles: React.CSSProperties = {
      display: "flex",
      flexDirection: "column",
      gap: 15,
      maxHeight: this.props.maxHeight ?? 400,
      height: "100%",
      overflowY: "auto",
      marginTop: 20,
      marginBottom: 20,
      ...this.props.styles,
    };
    return (
      <IdPrefixProvider value="gridItems-pnp_pcontrol-">
        <FluentProvider theme={teamsLightTheme}>
          <div className={this.props.className} style={containerStyles}>
            <Subtitle2> {this.props.label}</Subtitle2>
            <Grid
              items={this.state.items}
              onSelected={this.props.onSelected}
              defaultSelectedItems={this.props.defaultSelectedItems}
              multiSelect={this.props.multiSelect}
              column2Label={this.props.column2Label}
              column1Label={this.props.column1Label}
            />
          </div>
        </FluentProvider>
      </IdPrefixProvider>
    );
  }
}
