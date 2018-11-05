import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
  IPropertyPaneField,
  PropertyPaneFieldType
} from '@microsoft/sp-webpart-base';

import { IPropertyPaneWebPartInformationProps, IPropertyWebPartInformationPropsInternal } from "./IPropertyPaneWebPartInformation";
import { IPropertyPaneWebPartInformationHostProps } from './IPropertyPaneWebPartInformationHost';
import PropertyPaneWebPartInformationHost from './PropertyPaneWebPartInformationHost';

class PropertyPaneWebPartInformationBuilder implements IPropertyPaneField<IPropertyPaneWebPartInformationProps> {
	//Properties defined by IPropertyPaneField
	public targetProperty: string;
	public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
	public properties: IPropertyWebPartInformationPropsInternal;

	private elem: HTMLElement;

	public constructor(_properties: IPropertyPaneWebPartInformationProps) {
		this.properties = {
			key: _properties.key,
			moreInfoLink: _properties.moreInfoLink,
			moreInfoLinkTarget: _properties.moreInfoLinkTarget !== undefined ? _properties.moreInfoLinkTarget : "_blank",
			videoProperties: _properties.videoProperties,
			description: _properties.description,
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

		const element: React.ReactElement<IPropertyPaneWebPartInformationHostProps> = React.createElement(PropertyPaneWebPartInformationHost, {
			moreInfoLink: this.properties.moreInfoLink,
			moreInfoLinkTarget: this.properties.moreInfoLinkTarget,
			description: this.properties.description,
			videoProperties: this.properties.videoProperties
		});
		ReactDom.render(element, elem);
	}
}

export function PropertyPaneWebPartInformation(properties: IPropertyPaneWebPartInformationProps): IPropertyPaneField<IPropertyPaneWebPartInformationProps> {
	return new PropertyPaneWebPartInformationBuilder(properties);
}
