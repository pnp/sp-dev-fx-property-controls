import * as React from 'react';
import * as strings from 'PropertyControlStrings';
import { IPropertyWebPartInformationHostProps } from './IPropertyWebPartInformationHost';
import PropertyFieldHeader from '../../common/propertyFieldHeader/PropertyFieldHeader';

export default class PropertyWebPartInformationHost extends React.Component<IPropertyWebPartInformationHostProps> {

    constructor(props: IPropertyWebPartInformationHostProps) {
        super(props);
    }

    private moreInfoLink = (): JSX.Element => {
        if (this.props.moreInfoLink !== undefined) {
            return <div><a href={this.props.moreInfoLink} target={this.props.moreInfoLinkTarget}>{strings.MoreInfoLabel}</a></div>;
        } else {
            return;
        }

    }

    private youtubeEmbed = (): JSX.Element => {
        let linkProperties = {};
        if (this.props.videoProperties !== undefined && this.props.videoProperties.embedLink !== "") {
            linkProperties["src"] = this.props.videoProperties.embedLink;
            if (this.props.videoProperties.height) {
                linkProperties["height"] = this.props.videoProperties.height;
            }
            if (this.props.videoProperties.width) {
                linkProperties["width"] = this.props.videoProperties.width;
            }
            for(let prop in this.props.videoProperties.properties)
            {
                linkProperties["prop"] = this.props.videoProperties[prop];
            }
            return <iframe {...linkProperties}></iframe>;
        } else {
            return;
        }
    }

    public render(): JSX.Element {
        return (
            <div>
                <PropertyFieldHeader label={strings.DescriptionLabel}  ></PropertyFieldHeader>
                <div dangerouslySetInnerHTML={{ __html: this.props.description }}></div>
                <this.moreInfoLink></this.moreInfoLink>
                <this.youtubeEmbed></this.youtubeEmbed>
            </div>
        );
    }
}
