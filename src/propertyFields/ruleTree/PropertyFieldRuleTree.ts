import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  IPropertyPaneField,
  PropertyPaneFieldType,
} from '@microsoft/sp-property-pane';

import { PropertyFieldRuleTreeHost, IPropertyFieldRuleTreePropsInternal, IPropertyFieldRuleTreeProps } from '.';
import { IRuleTreeData } from './IRuleTreeData';
import { BaseCustomTreeItem } from '../treeCollectionData/ICustomTreeItem';

/**
 * Property Field Collection Data Builder Class
 */
class PropertyFieldRuleTreeDataBuilder implements IPropertyPaneField<IPropertyFieldRuleTreePropsInternal> {
  public targetProperty: string;
  public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
  public properties: IPropertyFieldRuleTreePropsInternal;

  private _onChangeCallback: (targetProperty?: string, newValue?: BaseCustomTreeItem<IRuleTreeData>[]) => void;

  public constructor(_targetProperty: string, _properties: IPropertyFieldRuleTreePropsInternal) {
    this.targetProperty = _targetProperty;
    this.properties = _properties;

    this.properties.onRender = this.render.bind(this);
    this.properties.onDispose = this.dispose.bind(this);
  }

  private render(elem: HTMLElement, context?: any, changeCallback?: (targetProperty?: string, newValue?: BaseCustomTreeItem<IRuleTreeData>[]) => void): void {
    const props: IPropertyFieldRuleTreeProps = <IPropertyFieldRuleTreeProps>this.properties;

    const element = React.createElement(PropertyFieldRuleTreeHost, {
      ...props,
      onChanged: this.onChanged.bind(this)
    });

    ReactDOM.render(element, elem);

    if (changeCallback) {
      this._onChangeCallback = changeCallback;
    }
  }

  /**
   * Dispose the property field
   */
  private dispose(elem: HTMLElement): void {
    ReactDOM.unmountComponentAtNode(elem);
  }

  /**
   * On field change event handler
   * @param value
   */
  private onChanged(value: BaseCustomTreeItem<IRuleTreeData>[]): void {
    //TODO this is always defined??
    if (this._onChangeCallback) {
      this._onChangeCallback(this.targetProperty, value);
    }
  }
}

/**
 * Property field
 * @param targetProperty
 * @param properties
 */
export function PropertyFieldRuleTree(targetProperty: string, properties: IPropertyFieldRuleTreeProps): IPropertyPaneField<IPropertyFieldRuleTreePropsInternal> {
  return new PropertyFieldRuleTreeDataBuilder(targetProperty, {
    ...properties,
    onRender: null,
    onDispose: null
  });
}
