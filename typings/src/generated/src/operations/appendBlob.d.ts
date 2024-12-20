import * as coreHttp from "@azure/core-http";
import * as Models from "../models";
import { StorageClientContext } from "../storageClientContext";
/** Class representing a AppendBlob. */
export declare class AppendBlob {
    private readonly client;
    /**
     * Create a AppendBlob.
     * @param {StorageClientContext} client Reference to the service client.
     */
    constructor(client: StorageClientContext);
    /**
     * The Create Append Blob operation creates a new append blob.
     * @param contentLength The length of the request.
     * @param [options] The optional parameters
     * @returns Promise<Models.AppendBlobCreateResponse>
     */
    create(contentLength: number, options?: Models.AppendBlobCreateOptionalParams): Promise<Models.AppendBlobCreateResponse>;
    /**
     * @param contentLength The length of the request.
     * @param callback The callback
     */
    create(contentLength: number, callback: coreHttp.ServiceCallback<void>): void;
    /**
     * @param contentLength The length of the request.
     * @param options The optional parameters
     * @param callback The callback
     */
    create(contentLength: number, options: Models.AppendBlobCreateOptionalParams, callback: coreHttp.ServiceCallback<void>): void;
    /**
     * The Append Block operation commits a new block of data to the end of an existing append blob.
     * The Append Block operation is permitted only if the blob was created with x-ms-blob-type set to
     * AppendBlob. Append Block is supported only on version 2015-02-21 version or later.
     * @param body Initial data
     * @param contentLength The length of the request.
     * @param [options] The optional parameters
     * @returns Promise<Models.AppendBlobAppendBlockResponse>
     */
    appendBlock(body: coreHttp.HttpRequestBody, contentLength: number, options?: Models.AppendBlobAppendBlockOptionalParams): Promise<Models.AppendBlobAppendBlockResponse>;
    /**
     * @param body Initial data
     * @param contentLength The length of the request.
     * @param callback The callback
     */
    appendBlock(body: coreHttp.HttpRequestBody, contentLength: number, callback: coreHttp.ServiceCallback<void>): void;
    /**
     * @param body Initial data
     * @param contentLength The length of the request.
     * @param options The optional parameters
     * @param callback The callback
     */
    appendBlock(body: coreHttp.HttpRequestBody, contentLength: number, options: Models.AppendBlobAppendBlockOptionalParams, callback: coreHttp.ServiceCallback<void>): void;
    /**
     * The Append Block operation commits a new block of data to the end of an existing append blob
     * where the contents are read from a source url. The Append Block operation is permitted only if
     * the blob was created with x-ms-blob-type set to AppendBlob. Append Block is supported only on
     * version 2015-02-21 version or later.
     * @param sourceUrl Specify a URL to the copy source.
     * @param contentLength The length of the request.
     * @param [options] The optional parameters
     * @returns Promise<Models.AppendBlobAppendBlockFromUrlResponse>
     */
    appendBlockFromUrl(sourceUrl: string, contentLength: number, options?: Models.AppendBlobAppendBlockFromUrlOptionalParams): Promise<Models.AppendBlobAppendBlockFromUrlResponse>;
    /**
     * @param sourceUrl Specify a URL to the copy source.
     * @param contentLength The length of the request.
     * @param callback The callback
     */
    appendBlockFromUrl(sourceUrl: string, contentLength: number, callback: coreHttp.ServiceCallback<void>): void;
    /**
     * @param sourceUrl Specify a URL to the copy source.
     * @param contentLength The length of the request.
     * @param options The optional parameters
     * @param callback The callback
     */
    appendBlockFromUrl(sourceUrl: string, contentLength: number, options: Models.AppendBlobAppendBlockFromUrlOptionalParams, callback: coreHttp.ServiceCallback<void>): void;
}
//# sourceMappingURL=appendBlob.d.ts.map