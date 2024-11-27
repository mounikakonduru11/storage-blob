import { WebResource, TokenCredential } from "@azure/core-http";
import { AnonymousCredential } from "./credentials/AnonymousCredential";
import { BlobClient, BlobDeleteOptions, BlobSetTierOptions } from "./BlobClient";
import * as Models from "./generated/src/models";
import { Pipeline } from "./Pipeline";
import { SharedKeyCredential } from "./credentials/SharedKeyCredential";
export interface BatchSubRequest {
    /**
     * The URL of the resource to request operation.
     *
     * @type {string}
     * @memberof BatchSubRequest
     */
    url: string;
    /**
     * The credential used for sub request.
     *
     * @type {SharedKeyCredential | AnonymousCredential | TokenCredential}
     * @memberof BatchSubRequest
     */
    credential: SharedKeyCredential | AnonymousCredential | TokenCredential;
}
/**
 * A BatchRequest represents a based class for BatchDeleteRequest and BatchSetTierRequest.
 *
 * @export
 * @class BatchRequest
 */
export declare abstract class BatchRequest {
    protected batchRequest: InnerBatchRequest;
    protected readonly batch: string;
    constructor();
    /**
     * Get the value of Content-Type for a batch request.
     * The value must be multipart/mixed with a batch boundary.
     * Example: multipart/mixed; boundary=batch_a81786c8-e301-4e42-a729-a32ca24ae252
     */
    getMultiPartContentType(): string;
    /**
     * Get assembled HTTP request body for sub requests.
     */
    getHttpRequestBody(): string;
    /**
     * Get sub requests that are added into the batch request.
     */
    getSubRequests(): Map<number, BatchSubRequest>;
    protected addSubRequestInternal(subRequest: BatchSubRequest, assembleSubRequestFunc: () => Promise<void>): Promise<void>;
}
/**
 * A BatchDeleteRequest represents a batch delete request, which consists of one or more delete operations.
 *
 * @export
 * @class BatchDeleteRequest
 * @extends {BatchRequest}
 */
export declare class BatchDeleteRequest extends BatchRequest {
    constructor();
    /**
     * Add a delete operation(subrequest) to mark the specified blob or snapshot for deletion.
     * Note that in order to delete a blob, you must delete all of its snapshots.
     * You can delete both at the same time. See [delete operation details](https://docs.microsoft.com/en-us/rest/api/storageservices/delete-blob).
     * The operation(subrequest) will be authenticated and authorized with specified credential.
     * See [blob batch authorization details](https://docs.microsoft.com/en-us/rest/api/storageservices/blob-batch#authorization).
     *
     * @param {string} url The url of the blob resource to delete.
     * @param {SharedKeyCredential | AnonymousCredential | TokenCredential} credential The credential to be used for authentication and authorization.
     * @param {BlobDeleteOptions} [options]
     * @returns {Promise<void>}
     * @memberof BatchDeleteRequest
     */
    addSubRequest(url: string, credential: SharedKeyCredential | AnonymousCredential | TokenCredential, options?: BlobDeleteOptions): Promise<void>;
    /**
     * Add a delete operation(subrequest) to mark the specified blob or snapshot for deletion.
     * Note that in order to delete a blob, you must delete all of its snapshots.
     * You can delete both at the same time. See [delete operation details](https://docs.microsoft.com/en-us/rest/api/storageservices/delete-blob).
     * The operation(subrequest) will be authenticated and authorized with specified credential.
     * See [blob batch authorization details](https://docs.microsoft.com/en-us/rest/api/storageservices/blob-batch#authorization).
     *
     * @param {BlobClient} blobClient The BlobClient.
     * @param {BlobDeleteOptions} [options]
     * @returns {Promise<void>}
     * @memberof BatchDeleteRequest
     */
    addSubRequest(blobClient: BlobClient, options?: BlobDeleteOptions): Promise<void>;
}
/**
 * A BatchSetTierRequest represents a batch set tier request, which consists of one or more set tier operations.
 *
 * @export
 * @class BatchSetTierRequest
 * @extends {BatchRequest}
 */
export declare class BatchSetTierRequest extends BatchRequest {
    constructor();
    /**
     * Add a set tier operation(subrequest) to set the tier on a blob.
     * The operation is allowed on a page blob in a premium
     * storage account and on a block blob in a blob storage account (locally redundant
     * storage only). A premium page blob's tier determines the allowed size, IOPS,
     * and bandwidth of the blob. A block blob's tier determines Hot/Cool/Archive
     * storage type. This operation does not update the blob's ETag.
     * See [set blob tier details](https://docs.microsoft.com/en-us/rest/api/storageservices/set-blob-tier).
     * The operation(subrequest) will be authenticated and authorized
     * with specified credential.See [blob batch authorization details](https://docs.microsoft.com/en-us/rest/api/storageservices/blob-batch#authorization).
     *
     * @param {string} url The url of the blob resource to delete.
     * @param {Credential} credential The credential to be used for authentication and authorization.
     * @param {Models.AccessTier} tier
     * @param {BlobSetTierOptions} [options]
     * @returns {Promise<void>}
     * @memberof BatchSetTierRequest
     */
    addSubRequest(url: string, credential: SharedKeyCredential | AnonymousCredential | TokenCredential, tier: Models.AccessTier, options?: BlobSetTierOptions): Promise<void>;
    /**
     * Add a set tier operation(subrequest) to set the tier on a blob.
     * The operation is allowed on a page blob in a premium
     * storage account and on a block blob in a blob storage account (locally redundant
     * storage only). A premium page blob's tier determines the allowed size, IOPS,
     * and bandwidth of the blob. A block blob's tier determines Hot/Cool/Archive
     * storage type. This operation does not update the blob's ETag.
     * See [set blob tier details](https://docs.microsoft.com/en-us/rest/api/storageservices/set-blob-tier).
     * The operation(subrequest) will be authenticated and authorized
     * with specified credential.See [blob batch authorization details](https://docs.microsoft.com/en-us/rest/api/storageservices/blob-batch#authorization).
     *
     * @param {BlobClient} blobClient The BlobClient.
     * @param {Models.AccessTier} tier
     * @param {BlobSetTierOptions} [options]
     * @returns {Promise<void>}
     * @memberof BatchSetTierRequest
     */
    addSubRequest(blobClient: BlobClient, tier: Models.AccessTier, options?: BlobSetTierOptions): Promise<void>;
}
/**
 * Inner batch request class which is responsible for assembling and serializing sub requests.
 * See https://docs.microsoft.com/en-us/rest/api/storageservices/blob-batch#request-body for how request get assembled.
 */
declare class InnerBatchRequest {
    private operationCount;
    private body;
    private subRequests;
    private readonly boundary;
    private readonly subRequestPrefix;
    private readonly multipartContentType;
    private readonly batchRequestEnding;
    constructor();
    /**
     * Create pipeline to assemble sub requests. The idea here is to use exising
     * credential and serialization/deserialization components, with additional policies to
     * filter unnecessary headers, assemble sub requests into request's body
     * and intercept request from going to wire.
     * @param credential
     */
    createPipeline(credential: SharedKeyCredential | AnonymousCredential | TokenCredential): Pipeline;
    appendSubRequestToBody(request: WebResource): void;
    preAddSubRequest(subRequest: BatchSubRequest): void;
    postAddSubRequest(subRequest: BatchSubRequest): void;
    getHttpRequestBody(): string;
    getMultipartContentType(): string;
    getSubRequests(): Map<number, BatchSubRequest>;
}
export {};
//# sourceMappingURL=BatchRequest.d.ts.map