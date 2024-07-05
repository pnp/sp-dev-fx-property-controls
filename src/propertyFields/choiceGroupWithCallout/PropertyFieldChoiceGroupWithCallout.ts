/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import omit from 'lodash/omit';

import { IChoiceGroupOption } from '@fluentui/react';
import {
  IPropertyPaneField,
  PropertyPaneFieldType,
} from '@microsoft/sp-property-pane';

import {
  IPropertyFieldChoiceGroupWithCalloutProps,
  IPropertyFieldChoiceGroupWithCalloutPropsInternal,
} from './IPropertyFieldChoiceGroupWithCallout';
import PropertyFieldToggleWithCalloutHost
  from './PropertyFieldChoiceGroupWithCalloutHost';

class PropertyFieldChoiceGroupWithCalloutBuilder
  implements
    IPropertyPaneField<IPropertyFieldChoiceGroupWithCalloutPropsInternal>
{
  public targetProperty: string;
  public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
  public properties: IPropertyFieldChoiceGroupWithCalloutPropsInternal;

  private _onChangeCallback: (targetProperty?: string, newValue?: any) => void; // eslint-disable-line @typescript-eslint/no-explicit-any

  public constructor(
    _targetProperty: string,
    _properties: IPropertyFieldChoiceGroupWithCalloutPropsInternal
  ) {
    this.targetProperty = _targetProperty;
    this.properties = _properties;

    this.properties.onRender = this._render.bind(this);
    this.properties.onDispose = this._dispose.bind(this);
  }

  private _render(
    elem: HTMLElement,
    context?: any,
    changeCallback?: (targetProperty?: string, newValue?: any) => void
  ): void {
    // eslint-disable-line @typescript-eslint/no-explicit-any
    // IPropertyPaneChoiceGroupOption should be manually converted to IChoiceGroupOption

    const options: IChoiceGroupOption[] = [];
    let selectedKey: string | number | undefined = undefined;

    this.properties.options.forEach((o) => {
      options.push({
        ...omit(o, ['key', 'iconProps']),
        iconProps: o.iconProps && {
          iconName: o.iconProps.officeFabricIconFontName,
        },
        key: o.key.toString(),
      });

      if (o.checked) {
        selectedKey = o.key;
      }
    });
    const props = this.properties as IPropertyFieldChoiceGroupWithCalloutProps;

    const element = React.createElement(PropertyFieldToggleWithCalloutHost, {
      ...omit(props, ['options']),
      options: options,
      onChange: this._onChanged.bind(this),
      selectedKey: selectedKey,
    });

    ReactDOM.render(element, elem);

    if (changeCallback) {
      this._onChangeCallback = changeCallback;
    }
  }

  private _dispose(elem: HTMLElement): void {
    ReactDOM.unmountComponentAtNode(elem);
  }

  private _onChanged(
    ev?: React.FormEvent<HTMLElement | HTMLInputElement>,
    option?: IChoiceGroupOption
  ): void {
    if (this._onChangeCallback && option) {
      this._onChangeCallback(this.targetProperty, option.key);
    }
  }
}

export function PropertyFieldChoiceGroupWithCallout(
  targetProperty: string,
  properties: IPropertyFieldChoiceGroupWithCalloutProps
): IPropertyPaneField<IPropertyFieldChoiceGroupWithCalloutPropsInternal> {
  return new PropertyFieldChoiceGroupWithCalloutBuilder(targetProperty, {
    ...properties,
    onRender: null,
    onDispose: null,
  });
}
