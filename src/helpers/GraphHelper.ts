import { MSGraphClient } from '@microsoft/sp-http';
import { WebPartContext } from '@microsoft/sp-webpart-base';

export interface IGraphBatchRequestItem {
  id: string;
  method: 'GET' | 'POST';
  url: string;
  dependsOn?: string[];
  body?: {[key: string]: string};
}

export interface IGraphBatchResponseItem {
  id: string;
  status: number;
  body: any;
}

const RequestsPerBatch = 10;

export async function batch(batchRequestItems: IGraphBatchRequestItem[], version: string, context: WebPartContext): Promise<IGraphBatchResponseItem[]> {
  const requestsCount = batchRequestItems.length;
  const batchesCount = Math.ceil(requestsCount / RequestsPerBatch);
  let batchIndex = 0;

  const result: IGraphBatchResponseItem[] = [];

  const client = await getGraphClient(context);

  while (batchIndex < batchesCount) {
    let start = batchIndex * RequestsPerBatch;
    let end = start + RequestsPerBatch;
    if (end > requestsCount) {
      end = requestsCount;
    }

    const response = await client.api('/$batch').version(version).post({
      requests: batchRequestItems.slice(start, end)
    });

    result.push(...response.responses);
    batchIndex++;
  }

  return result;
}

export async function getGraphClient(context: WebPartContext): Promise<MSGraphClient> {
  const client = await context.msGraphClientFactory.getClient();

  return client;
}
