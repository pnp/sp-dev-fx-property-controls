import { SPHttpClientResponse } from '@microsoft/sp-http';
import { SPHttpClient } from '@microsoft/sp-http';
import { Environment, EnvironmentType } from '@microsoft/sp-core-library';
import { BaseComponentContext } from '@microsoft/sp-component-base';
import { ISPColumn, IPropertyFieldColumnPickerHostProps, PropertyFieldColumnPickerOrderBy } from '../propertyFields/columnPicker';
import { ISPColumnPickerService } from './ISPColumnPickerService';
import { ISPColumns } from '../propertyFields/columnPicker';

/**
 * Service implementation to get list & list items from current SharePoint site
 */
export class SPColumnPickerService implements ISPColumnPickerService {
    private context: BaseComponentContext;
    private props: IPropertyFieldColumnPickerHostProps;

    /**
     * Service constructor
     */
    constructor(_props: IPropertyFieldColumnPickerHostProps, pageContext: BaseComponentContext) {
        this.props = _props;
        this.context = pageContext;
    }

    /**
     * Gets the collection of column for a selected list
     */
    public async getColumns(displayHiddenColumns?: boolean): Promise<ISPColumns> {
        if (Environment.type === EnvironmentType.Local) {
            // If the running environment is local, load the data from the mock
            return this.getColumnsFromMock();
        }
        else {
            if (this.props.listId === undefined || this.props.listId === "") {
                return this.getEmptyColumns();
            }

            const webAbsoluteUrl = this.props.webAbsoluteUrl ? this.props.webAbsoluteUrl : this.context.pageContext.web.absoluteUrl;

            // If the running environment is SharePoint, request the lists REST service
            let queryUrl: string = `${webAbsoluteUrl}/_api/lists(guid'${this.props.listId}')/Fields?$select=Title,Id,InternalName`;

            // Check if the orderBy property is provided
            if (this.props.orderBy !== null) {
                queryUrl += '&$orderby=';
                switch (this.props.orderBy) {
                    case PropertyFieldColumnPickerOrderBy.Id:
                        queryUrl += 'Id';
                        break;
                    case PropertyFieldColumnPickerOrderBy.Title:
                        queryUrl += 'Title';
                        break;
                }

                // Adds an OData Filter to the list
                if (this.props.filter) {
                    if (displayHiddenColumns) queryUrl += `&$filter=&${encodeURIComponent(this.props.filter)}`;
                    else queryUrl += `&$filter=Hidden eq false&${encodeURIComponent(this.props.filter)}`;
                } else {
                    if (!displayHiddenColumns) queryUrl += `&$filter=Hidden eq false`;
                }

                let response = await this.context.spHttpClient.get(queryUrl, SPHttpClient.configurations.v1);

                let columns = (await response.json()) as ISPColumns;

                // Check if onColumnsRetrieved callback is defined
                if (this.props.onColumnsRetrieved) {
                    //Call onColumnsRetrieved
                    let lr = this.props.onColumnsRetrieved(columns.value);
                    let output: ISPColumn[];

                    //Conditional checking to see of PromiseLike object or array
                    if (lr instanceof Array) {
                        output = lr;
                    } else {
                        output = await lr;
                    }

                    columns.value = output;
                }

                return columns;
            }
        }
    }

    /**
     * Returns an empty column for when a list isn't selected
     */
    private getEmptyColumns(): Promise<ISPColumns> {
        return new Promise<ISPColumns>((resolve) => {
            const listData: ISPColumns = {
                value: [
                ]
            };

            resolve(listData);
        });
    }
    /**
     * Returns 3 fake SharePoint Columns for the Mock mode
     */
    private getColumnsFromMock(): Promise<ISPColumns> {
        return new Promise<ISPColumns>((resolve) => {
            const listData: ISPColumns = {
                value: [
                    { Title: 'Mock Column One', Id: '3bacd87b-b7df-439a-bb20-4d4d13523431', InternalName: 'MockColumnOne' },
                    { Title: 'Mock Column Two', Id: '5e37c820-e2cb-49f7-93f5-14003c07788b', InternalName: 'Mock_x0020_Column_x0020_Two' },
                    { Title: 'Mock Column Three', Id: '5fda7245-c4a7-403b-adc1-8bd8b481b4ee', InternalName: 'MockColumnThree' }
                ]
            };

            resolve(listData);
        });
    }
}
