import * as coreHttp from "@azure/core-http";
import * as Models from "../models";
import { StorageClientContext } from "../storageClientContext";
/** Class representing a Service. */
export declare class Service {
    private readonly client;
    /**
     * Create a Service.
     * @param {StorageClientContext} client Reference to the service client.
     */
    constructor(client: StorageClientContext);
    /**
     * Sets properties for a storage account's Blob service endpoint, including properties for Storage
     * Analytics and CORS (Cross-Origin Resource Sharing) rules
     * @param storageServiceProperties The StorageService properties.
     * @param [options] The optional parameters
     * @returns Promise<Models.ServiceSetPropertiesResponse>
     */
    setProperties(storageServiceProperties: Models.StorageServiceProperties, options?: Models.ServiceSetPropertiesOptionalParams): Promise<Models.ServiceSetPropertiesResponse>;
    /**
     * @param storageServiceProperties The StorageService properties.
     * @param callback The callback
     */
    setProperties(storageServiceProperties: Models.StorageServiceProperties, callback: coreHttp.ServiceCallback<void>): void;
    /**
     * @param storageServiceProperties The StorageService properties.
     * @param options The optional parameters
     * @param callback The callback
     */
    setProperties(storageServiceProperties: Models.StorageServiceProperties, options: Models.ServiceSetPropertiesOptionalParams, callback: coreHttp.ServiceCallback<void>): void;
    /**
     * gets the properties of a storage account's Blob service, including properties for Storage
     * Analytics and CORS (Cross-Origin Resource Sharing) rules.
     * @param [options] The optional parameters
     * @returns Promise<Models.ServiceGetPropertiesResponse>
     */
    getProperties(options?: Models.ServiceGetPropertiesOptionalParams): Promise<Models.ServiceGetPropertiesResponse>;
    /**
     * @param callback The callback
     */
    getProperties(callback: coreHttp.ServiceCallback<Models.StorageServiceProperties>): void;
    /**
     * @param options The optional parameters
     * @param callback The callback
     */
    getProperties(options: Models.ServiceGetPropertiesOptionalParams, callback: coreHttp.ServiceCallback<Models.StorageServiceProperties>): void;
    /**
     * Retrieves statistics related to replication for the Blob service. It is only available on the
     * secondary location endpoint when read-access geo-redundant replication is enabled for the
     * storage account.
     * @param [options] The optional parameters
     * @returns Promise<Models.ServiceGetStatisticsResponse>
     */
    getStatistics(options?: Models.ServiceGetStatisticsOptionalParams): Promise<Models.ServiceGetStatisticsResponse>;
    /**
     * @param callback The callback
     */
    getStatistics(callback: coreHttp.ServiceCallback<Models.StorageServiceStats>): void;
    /**
     * @param options The optional parameters
     * @param callback The callback
     */
    getStatistics(options: Models.ServiceGetStatisticsOptionalParams, callback: coreHttp.ServiceCallback<Models.StorageServiceStats>): void;
    /**
     * The List Containers Segment operation returns a list of the containers under the specified
     * account
     * @param [options] The optional parameters
     * @returns Promise<Models.ServiceListContainersSegmentResponse>
     */
    listContainersSegment(options?: Models.ServiceListContainersSegmentOptionalParams): Promise<Models.ServiceListContainersSegmentResponse>;
    /**
     * @param callback The callback
     */
    listContainersSegment(callback: coreHttp.ServiceCallback<Models.ListContainersSegmentResponse>): void;
    /**
     * @param options The optional parameters
     * @param callback The callback
     */
    listContainersSegment(options: Models.ServiceListContainersSegmentOptionalParams, callback: coreHttp.ServiceCallback<Models.ListContainersSegmentResponse>): void;
    /**
     * Retrieves a user delegation key for the Blob service. This is only a valid operation when using
     * bearer token authentication.
     * @param keyInfo
     * @param [options] The optional parameters
     * @returns Promise<Models.ServiceGetUserDelegationKeyResponse>
     */
    getUserDelegationKey(keyInfo: Models.KeyInfo, options?: Models.ServiceGetUserDelegationKeyOptionalParams): Promise<Models.ServiceGetUserDelegationKeyResponse>;
    /**
     * @param keyInfo
     * @param callback The callback
     */
    getUserDelegationKey(keyInfo: Models.KeyInfo, callback: coreHttp.ServiceCallback<Models.UserDelegationKey>): void;
    /**
     * @param keyInfo
     * @param options The optional parameters
     * @param callback The callback
     */
    getUserDelegationKey(keyInfo: Models.KeyInfo, options: Models.ServiceGetUserDelegationKeyOptionalParams, callback: coreHttp.ServiceCallback<Models.UserDelegationKey>): void;
    /**
     * Returns the sku name and account kind
     * @param [options] The optional parameters
     * @returns Promise<Models.ServiceGetAccountInfoResponse>
     */
    getAccountInfo(options?: coreHttp.RequestOptionsBase): Promise<Models.ServiceGetAccountInfoResponse>;
    /**
     * @param callback The callback
     */
    getAccountInfo(callback: coreHttp.ServiceCallback<void>): void;
    /**
     * @param options The optional parameters
     * @param callback The callback
     */
    getAccountInfo(options: coreHttp.RequestOptionsBase, callback: coreHttp.ServiceCallback<void>): void;
    /**
     * The Batch operation allows multiple API calls to be embedded into a single HTTP request.
     * @param body Initial data
     * @param contentLength The length of the request.
     * @param multipartContentType Required. The value of this header must be multipart/mixed with a
     * batch boundary. Example header value: multipart/mixed; boundary=batch_<GUID>
     * @param [options] The optional parameters
     * @returns Promise<Models.ServiceSubmitBatchResponse>
     */
    submitBatch(body: coreHttp.HttpRequestBody, contentLength: number, multipartContentType: string, options?: Models.ServiceSubmitBatchOptionalParams): Promise<Models.ServiceSubmitBatchResponse>;
    /**
     * @param body Initial data
     * @param contentLength The length of the request.
     * @param multipartContentType Required. The value of this header must be multipart/mixed with a
     * batch boundary. Example header value: multipart/mixed; boundary=batch_<GUID>
     * @param callback The callback
     */
    submitBatch(body: coreHttp.HttpRequestBody, contentLength: number, multipartContentType: string, callback: coreHttp.ServiceCallback<void>): void;
    /**
     * @param body Initial data
     * @param contentLength The length of the request.
     * @param multipartContentType Required. The value of this header must be multipart/mixed with a
     * batch boundary. Example header value: multipart/mixed; boundary=batch_<GUID>
     * @param options The optional parameters
     * @param callback The callback
     */
    submitBatch(body: coreHttp.HttpRequestBody, contentLength: number, multipartContentType: string, options: Models.ServiceSubmitBatchOptionalParams, callback: coreHttp.ServiceCallback<void>): void;
}
//# sourceMappingURL=service.d.ts.map