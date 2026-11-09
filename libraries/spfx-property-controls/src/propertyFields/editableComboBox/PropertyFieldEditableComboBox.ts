import * as React from 'react';
import * as ReactDom from 'react-dom';
import { IPropertyPaneField, PropertyPaneFieldType } from '@microsoft/sp-property-pane';

import { IPropertyFieldEditableComboBoxProps, IPropertyFieldEditableComboBoxPropsInternal } from './IPropertyFieldEditableComboBox';
import PropertyFieldEditableComboBoxHost from './PropertyFieldEditableComboBoxHost';
import { IPropertyFieldEditableComboBoxHostProps } from './IPropertyFieldEditableComboBoxHost';

class PropertyFieldEditableComboBoxBuilder implements IPropertyPaneField<IPropertyFieldEditableComboBoxProps> {
  //Properties defined by IPropertyPaneField
	public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
	public targetProperty: string;
	public properties: IPropertyFieldEditableComboBoxPropsInternal;
	private elem: HTMLElement;
	private currentOptionText: string;
	//private changeCB?: (text: string, wasAdded: boolean) => void;

  public constructor(_targetProperty: string, _properties: IPropertyFieldEditableComboBoxProps) {
		this.targetProperty = _targetProperty;
		this.properties = {
			key: _properties.key,
      disabled: _properties.disabled,
			label: _properties.label,
      maxFillInLength: _properties.maxFillInLength,
      onPropertyChange: _properties.onPropertyChange,
      onOptionAdded: _properties.onOptionAdded,
      options: _properties.options,
      selectedText: _properties.selectedText,
      showTooltip: _properties.showTooltip,
      tooltipText: _properties.tooltipText,
			properties: _properties.properties,
			onRender: this.onRender.bind(this)
		};

    this.currentOptionText = _properties.selectedText;
	}

  public render(): void {
		if (!this.elem) {
			return;
		}

		this.onRender(this.elem);
	}

  private onRender(elem: HTMLElement): void {
    if (!this.elem) {this.elem = elem;}
      //Render the property in our PropertyPane
      const element: React.ReactElement<IPropertyFieldEditableComboBoxHostProps> = React.createElement(PropertyFieldEditableComboBoxHost, {
        key: this.properties.key,
        disabled: this.properties.disabled,
        label: this.properties.label,
        options: this.properties.options,
        selectedText: this.properties.selectedText,
        maxFillInLength: this.properties.maxFillInLength,
        showTooltip: this.properties.showTooltip,
        tooltipText: this.properties.tooltipText,
        onOptionChanged: this.onOptionChanged.bind(this)
      });
    ReactDom.render(element, elem);
  }

  private onOptionChanged(text: string, wasAdded: boolean): void {
    if (this.properties !== undefined) {
      if (this.properties.onPropertyChange && text !== null) {
        const newOption: string = text;
        const oldOption: string = this.currentOptionText;
        this.currentOptionText = newOption;
        this.properties.onPropertyChange(this.targetProperty, oldOption, newOption);
        this.properties.properties[this.targetProperty] = newOption;
        if (wasAdded) {
          this.properties.onOptionAdded(text);
        }
      }
    }
  }
}

export function PropertyFieldEditableComboBox(targetProperty: string, properties: IPropertyFieldEditableComboBoxProps): IPropertyPaneField<IPropertyFieldEditableComboBoxProps> {
  return new PropertyFieldEditableComboBoxBuilder(targetProperty, properties);
}

