import * as React from 'react';
import * as strings from 'PropertyControlStrings';
import { IPropertyPaneWebPartInformationHostProps } from './IPropertyPaneWebPartInformationHost';
import * as telemetry from '../../common/telemetry';

export default class PropertyPaneWebPartInformationHost extends React.Component<IPropertyPaneWebPartInformationHostProps> {

  constructor(props: IPropertyPaneWebPartInformationHostProps) {
    super(props);

    telemetry.track('PropertyWebPartInformation', {});
  }

  public render(): JSX.Element {
    let iframeElm: JSX.Element = null;
    if (this.props.videoProperties && this.props.videoProperties.embedLink !== "") {
      let linkProperties = {};
      linkProperties["src"] = this.props.videoProperties.embedLink;

      if (this.props.videoProperties.height) {
        linkProperties["height"] = this.props.videoProperties.height;
      }

      if (this.props.videoProperties.width) {
        linkProperties["width"] = this.props.videoProperties.width;
      }

      for (let prop in this.props.videoProperties.properties)
      {
        linkProperties["prop"] = this.props.videoProperties[prop];
      }

      iframeElm = <iframe {...linkProperties}></iframe>;
    }

    return (
      <div>
        <div dangerouslySetInnerHTML={{ __html: this.props.description }}></div>

        {
          this.props.moreInfoLink && (
            <div><a href={this.props.moreInfoLink} target={this.props.moreInfoLinkTarget}>{strings.MoreInfoLabel}</a></div>
          )
        }

        {iframeElm}
      </div>
    );
  }
}
