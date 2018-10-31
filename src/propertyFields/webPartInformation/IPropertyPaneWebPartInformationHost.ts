import { IVideoEmbedProperties } from "./IPropertyPaneWebPartInformation";

/**
 * PropertyFieldColorPickerHost properties interface
 */
export interface IPropertyPaneWebPartInformationHostProps {
	videoProperties?: IVideoEmbedProperties;
	moreInfoLink?: string;
	moreInfoLinkTarget?: string;
	description: string;
}