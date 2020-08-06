import * as React from 'react';
import * as ReactDom from 'react-dom';

import { IPropertyPaneMarkdownContentProps, IPropertyPaneMarkdownContentPropsInternal } from "./IPropertyPaneMarkdownContent";
import { IPropertyPaneMarkdownContentHostProps } from './IPropertyPaneMarkdownContentHost';
import PropertyPaneMarkdownContentHost from './PropertyPaneMarkdownContentHost';
import {
  IPropertyPaneField, PropertyPaneFieldType
} from '@microsoft/sp-webpart-base';


class PropertyPaneMarkdownContentBuilder implements IPropertyPaneField<IPropertyPaneMarkdownContentProps> {
	//Properties defined by IPropertyPaneField
	public targetProperty: string;
	public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
	public properties: IPropertyPaneMarkdownContentPropsInternal;

	private elem: HTMLElement;

	public constructor(_properties: IPropertyPaneMarkdownContentProps) {
		this.properties = {
			key: _properties.key,
      label: _properties.label,
      markdown: _properties.markdown,
      options: _properties.options,
      onRender: this.onRender.bind(this),
		};
	}

	public render(): void {
		if (!this.elem) {
			return;
		}
		this.onRender(this.elem);
	}

	private onRender(elem: HTMLElement, ctx?: any, changeCallback?: (targetProperty?: string, newValue?: any) => void): void {
		if (!this.elem) {
			this.elem = elem;
		}

		const element: React.ReactElement<IPropertyPaneMarkdownContentHostProps> = React.createElement(PropertyPaneMarkdownContentHost, {
      description: this.properties.label,
      markdown: this.properties.markdown,
      markdownProps: this.properties.options
		});
		ReactDom.render(element, elem);
	}
}

/**
 * Creates a property pane section that displays read-only markdown content.
 * Use this property pane control to display additional instructions, help
 * screens, etc.
 *
 * @param properties
 */
export function PropertyPaneMarkdownContent(properties: IPropertyPaneMarkdownContentProps): IPropertyPaneField<IPropertyPaneMarkdownContentProps> {
	return new PropertyPaneMarkdownContentBuilder(properties);
}
