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
    const {
      videoProperties
    } = this.props;
    if (videoProperties && videoProperties.embedLink !== "") {
      const linkProperties: React.IframeHTMLAttributes<HTMLIFrameElement> = {};

      linkProperties.src = videoProperties.embedLink;
      if (videoProperties.height) {
        linkProperties.height = videoProperties.height;
      }

      if (videoProperties.width) {
        linkProperties.width = videoProperties.width;
      }

      for (const prop in videoProperties.properties) {
        if (Object.prototype.hasOwnProperty.call(videoProperties.properties, prop)) {
          linkProperties[prop] = this.props.videoProperties[prop];
        }
      }

      iframeElm = <iframe {...linkProperties} />;
    }

    return (
      <div>
        <div dangerouslySetInnerHTML={{ __html: this.props.description }} />

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
