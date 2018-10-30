import { IVideoEmbedProperties } from "./IPropertyWebPartInformation";

/**
 * PropertyFieldColorPickerHost properties interface
 */
export interface IPropertyWebPartInformationHostProps {
	videoProperties?: IVideoEmbedProperties;
	moreInfoLink?: string;
	moreInfoLinkTarget?: string;
	description: string;
}