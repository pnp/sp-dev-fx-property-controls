import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
  IPropertyPaneField,
  PropertyPaneFieldType
} from '@microsoft/sp-webpart-base';
import {
	IPropertyEditorProps,
	IPropertyEditorPropsInternal
} from './IPropertyEditor';
import { IPropertyEditorHostProps } from './IPropertyEditorHost';
import PropertyEditorHost from './PropertyEditorHost';

class PropertyEditorBuilder implements IPropertyPaneField<IPropertyEditorProps> {

	//Properties defined by IPropertyPaneField
	public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
	public targetProperty: string;
	public properties: IPropertyEditorPropsInternal;

	private elem: HTMLElement;

	public constructor(_properties: IPropertyEditorProps) {
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

		const element: React.ReactElement<IPropertyEditorHostProps> = React.createElement(PropertyEditorHost, {
			webpart: this.properties.webpart
		});
		ReactDom.render(element, elem);
	}
}

export function PropertyEditor(properties: IPropertyEditorProps): IPropertyPaneField<IPropertyEditorProps> {
	return new PropertyEditorBuilder(properties);
}
