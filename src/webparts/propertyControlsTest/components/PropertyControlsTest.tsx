import * as React from 'react';
import styles from './PropertyControlsTest.module.scss';
import { IPropertyControlsTestProps } from './IPropertyControlsTestProps';

/**
 * Property control test component that renders the property control values
 */
export default class PropertyControlsTest extends React.Component<IPropertyControlsTestProps, {}> {
  public setHtml() {
    return { __html: this.props.htmlCode };
  }
  public render(): React.ReactElement<IPropertyControlsTestProps> {
    return (
      <div className={styles.propertyControlsTest}>
        <div className={styles.container}>
          <div className={`ms-Grid-row ms-bgColor-neutralLight ms-fontColor-neutralDark ${styles.row}`}>
            <div className="ms-Grid-col ms-lg10 ms-xl8 ms-xlPush2 ms-lgPush1">
              <p className="ms-font-xxl ms-fontColor-neutralDark">Property pane control values:</p>
              <p className="ms-font-m ms-fontColor-neutralDark">Number value: {this.props.numberValue}</p>
              <p className="ms-font-m ms-fontColor-neutralDark">Multi-select: {this.props.multiSelect.toString()}</p>
              <p className="ms-font-m ms-fontColor-neutralDark">People: {this.props.people.map(p => {
                return !!p.fullName ? p.fullName : p.description;
              }).join(', ')}</p>
              <p className="ms-font-m ms-fontColor-neutralDark">HTML:
              <div dangerouslySetInnerHTML={this.setHtml()} />
              </p>
              <p className="ms-font-m ms-fontColor-neutralDark">List: {this.props.list}</p>
              <p className="ms-font-m ms-fontColor-neutralDark">List Filtered: {this.props.listFiltered}</p>
              <p className="ms-font-m ms-fontColor-neutralDark">Multi List: {this.props.multiList.join(', ')}</p>
              <p className="ms-font-m ms-fontColor-neutralDark">Multi Filtered: {this.props.multiListFiltered.join(', ')}</p>
              <p className="ms-font-m ms-fontColor-neutralDark">Term(s): {this.props.terms.map(t => t.name).join(', ')}</p>
              <p className="ms-font-m ms-fontColor-neutralDark">Date: {this.props.datetime.displayValue}</p>
              <p className="ms-font-m ms-fontColor-neutralDark">Color: <span className={styles.colorBox} style={{ backgroundColor: this.props.color }}>&nbsp;</span>{this.props.color}</p>
              <p className="ms-font-m ms-fontColor-neutralDark">Color Object: <span className={styles.colorBox} style={{ backgroundColor: this.props.colorObj ? this.props.colorObj.str : '' }}>&nbsp;</span>{this.props.colorObj ? `${this.props.colorObj.str}= R:${this.props.colorObj.r},G:${this.props.colorObj.g},B:${this.props.colorObj.b},A:${this.props.colorObj.a} H:${this.props.colorObj.h},S:${this.props.colorObj.s},V:${this.props.colorObj.v} HEX:${this.props.colorObj.hex}` : ''}</p>
              <p className="ms-font-m ms-fontColor-neutralDark">Spin Value: {this.props.spinValue}</p>
              <p className="ms-font-m ms-fontColor-neutralDark">Dropdown With Callout Key: {this.props.dropdownWithCalloutKey}</p>
              <p className="ms-font-m ms-fontColor-neutralDark">Slider With Callout Value: {this.props.sliderWithCalloutValue}</p>
              <p className="ms-font-m ms-fontColor-neutralDark">Choice Group With Callout Value: {this.props.choiceGroupWithCalloutValue}</p>
              <p className="ms-font-m ms-fontColor-neutralDark">Dropdown Info Header Key: {this.props.dropdownInfoHeaderKey}</p>
              <p className="ms-font-m ms-fontColor-neutralDark">Text Info Header Value: {this.props.textInfoHeaderValue}</p>
              <p className="ms-font-m ms-fontColor-neutralDark">Toggle Info Header Value: {this.props.toggleInfoHeaderValue ? 'Marvel' : 'DC Comics'}</p>
              <p className="ms-font-m ms-fontColor-neutralDark">Checkbox with Callout Value: {(this.props.checkboxWithCalloutValue || '').toString()}</p>
              <p className="ms-font-m ms-fontColor-neutralDark" style={{ wordBreak: "break-all" }}>Collection data: {JSON.stringify(this.props.collectionData)}</p>
              <p className="ms-font-m ms-fontColor-neutralDark">Ordered Items: {this.props.orderedItems.map((value: any) => {
                return (
                  <i
                    className={"ms-Icon ms-Icon--" + value.iconName + " " + styles.orderedIcon}
                    title={value.text}
                    key={value.text}
                  />
                );
              })}</p>
              <p className="ms-font-m ms-fontColor-neutralDark">Swatch Color: <span className={styles.colorBox} style={{ backgroundColor: this.props.swatchColor }}>&nbsp;</span>{this.props.swatchColor}</p>
              <p className="ms-font-m ms-fontColor-neutralDark">Enterprise Term(s): {this.props.enterpriseTerms.map(t => t.name).join(', ')}</p>
              <p className="ms-font-m ms-fontColor-neutralDark">Site(s): {this.props.sites.map(t => t.title).join(', ')}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
