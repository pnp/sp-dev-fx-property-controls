import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
  IPropertyPaneField,
  PropertyPaneFieldType
} from '@microsoft/sp-property-pane';
import {
	IPropertyPanePropertyEditorProps,
	IPropertyPanePropertyEditorPropsInternal
} from './IPropertyPanePropertyEditor';
import { IPropertyPanePropertyEditorHostProps } from './IPropertyPanePropertyEditorHost';
import PropertyPanePropertyEditorHost from './PropertyPanePropertyEditorHost';

class PropertyPanePropertyEditorBuilder implements IPropertyPaneField<IPropertyPanePropertyEditorProps> {

	//Properties defined by IPropertyPaneField
	public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
	public targetProperty: string;
	public properties: IPropertyPanePropertyEditorPropsInternal;

	private elem: HTMLElement;

	public constructor(_properties: IPropertyPanePropertyEditorProps) {
		this.properties = {
			key: _properties.key,
			webpart: _properties.webpart,
			onRender: this.onRender.bind(this)
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

		const element: React.ReactElement<IPropertyPanePropertyEditorHostProps> = React.createElement(PropertyPanePropertyEditorHost, {
			webpart: this.properties.webpart
		});
		ReactDom.render(element, elem);
	}
}

export function PropertyPanePropertyEditor(properties: IPropertyPanePropertyEditorProps): IPropertyPaneField<IPropertyPanePropertyEditorProps> {
	return new PropertyPanePropertyEditorBuilder(properties);
}
