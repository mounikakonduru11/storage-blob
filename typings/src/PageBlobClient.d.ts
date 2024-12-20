import { HttpRequestBody, TransferProgressEvent, TokenCredential } from "@azure/core-http";
import { AbortSignalLike } from "@azure/abort-controller";
import { BlobClient } from "./internal";
import * as Models from "./generated/src/models";
import { BlobAccessConditions, Metadata, PageBlobAccessConditions, PremiumPageBlobTier } from "./models";
import { NewPipelineOptions, Pipeline } from "./Pipeline";
import { SharedKeyCredential } from "./credentials/SharedKeyCredential";
import { AnonymousCredential } from "./credentials/AnonymousCredential";
/**
 * Options to configure Page Blob - Create operation.
 *
 * @export
 * @interface PageBlobCreateOptions
 */
export interface PageBlobCreateOptions {
    /**
     * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
     * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
     *
     * @type {AbortSignalLike}
     * @memberof PageBlobCreateOptions
     */
    abortSignal?: AbortSignalLike;
    /**
     * Conditions to meet when creating a page blob.
     *
     * @type {BlobAccessConditions}
     * @memberof PageBlobCreateOptions
     */
    accessConditions?: BlobAccessConditions;
    /**
     * A user-controlled value that can be used to track requests.
     * The value must be between 0 and 2^63 - 1. The default value is 0.
     *
     * @type {number}
     * @memberof PageBlobCreateOptions
     */
    blobSequenceNumber?: number;
    /**
     * HTTP headers to set when creating a page blob.
     *
     * @type {Models.BlobHTTPHeaders}
     * @memberof PageBlobCreateOptions
     */
    blobHTTPHeaders?: Models.BlobHTTPHeaders;
    /**
     * A collection of key-value string pair to associate with the blob when creating append blobs.
     *
     * @type {Metadata}
     * @memberof PageBlobCreateOptions
     */
    metadata?: Metadata;
    /**
     * Customer Provided Key Info.
     *
     * @type {Models.CpkInfo}
     * @memberof PageBlobCreateOptions
     */
    customerProvidedKey?: Models.CpkInfo;
    /**
     * Access tier.
     * More Details - https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blob-storage-tiers
     *
     * @type {PremiumPageBlobTier | string}
     * @memberof PageBlobCreateOptions
     */
    tier?: PremiumPageBlobTier | string;
}
/**
 * Options to configure Page Blob - Upload Pages operation.
 *
 * @export
 * @interface PageBlobUploadPagesOptions
 */
export interface PageBlobUploadPagesOptions {
    /**
     * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
     * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
     *
     * @type {AbortSignalLike}
     * @memberof PageBlobUploadPagesOptions
     */
    abortSignal?: AbortSignalLike;
    /**
     * Conditions to meet when uploading pages.
     *
     * @type {PageBlobAccessConditions}
     * @memberof PageBlobUploadPagesOptions
     */
    accessConditions?: PageBlobAccessConditions;
    /**
     * Callback to receive events on the progress of upload pages operation.
     *
     * @memberof PageBlobUploadPagesOptions
     */
    progress?: (progress: TransferProgressEvent) => void;
    /**
     * An MD5 hash of the content. This hash is used to verify the integrity of the content during transport.
     * When this is specified, the storage service compares the hash of the content that has arrived with this value.
     *
     * transactionalContentMD5 and transactionalContentCrc64 cannot be set at same time.
     *
     * @type {Uint8Array}
     * @memberof PageBlobUploadPagesOptions
     */
    transactionalContentMD5?: Uint8Array;
    /**
     * A CRC64 hash of the content. This hash is used to verify the integrity of the content during transport.
     * When this is specified, the storage service compares the hash of the content that has arrived with this value.
     *
     * transactionalContentMD5 and transactionalContentCrc64 cannot be set at same time.
     *
     * @type {Uint8Array}
     * @memberof PageBlobUploadPagesOptions
     */
    transactionalContentCrc64?: Uint8Array;
    /**
     * Customer Provided Key Info.
     *
     * @type {Models.CpkInfo}
     * @memberof PageBlobUploadPagesOptions
     */
    customerProvidedKey?: Models.CpkInfo;
}
/**
 * Options to configure Page Blob - Clear Pages operation.
 *
 * @export
 * @interface PageBlobClearPagesOptions
 */
export interface PageBlobClearPagesOptions {
    /**
     * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
     * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
     *
     * @type {AbortSignalLike}
     * @memberof PageBlobClearPagesOptions
     */
    abortSignal?: AbortSignalLike;
    /**
     * Conditions to meet when clearing pages.
     *
     * @type {PageBlobAccessConditions}
     * @memberof PageBlobClearPagesOptions
     */
    accessConditions?: PageBlobAccessConditions;
    /**
     * Customer Provided Key Info.
     *
     * @type {Models.CpkInfo}
     * @memberof PageBlobClearPagesOptions
     */
    customerProvidedKey?: Models.CpkInfo;
}
/**
 * Options to configure Page Blob - Get Page Ranges operation.
 *
 * @export
 * @interface PageBlobGetPageRangesOptions
 */
export interface PageBlobGetPageRangesOptions {
    /**
     * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
     * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
     *
     * @type {AbortSignalLike}
     * @memberof PageBlobGetPageRangesOptions
     */
    abortSignal?: AbortSignalLike;
    /**
     * Conditions to meet when getting page ranges.
     *
     * @type {BlobAccessConditions}
     * @memberof PageBlobGetPageRangesOptions
     */
    accessConditions?: BlobAccessConditions;
}
/**
 * Options to configure Page Blob - Get Ranges Diff operation.
 *
 * @export
 * @interface PageBlobGetPageRangesDiffOptions
 */
export interface PageBlobGetPageRangesDiffOptions {
    /**
     * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
     * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
     *
     * @type {AbortSignalLike}
     * @memberof PageBlobGetPageRangesDiffOptions
     */
    abortSignal?: AbortSignalLike;
    /**
     * Conditions to meet when getting page ranges diff.
     *
     * @type {BlobAccessConditions}
     * @memberof PageBlobGetPageRangesDiffOptions
     */
    accessConditions?: BlobAccessConditions;
    /**
     * (unused)
     *
     * @type {string}
     * @memberof PageBlobGetPageRangesDiffOptions
     */
    range?: string;
}
/**
 * Options to configure Page Blob - Resize operation.
 *
 * @export
 * @interface PageBlobResizeOptions
 */
export interface PageBlobResizeOptions {
    /**
     * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
     * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
     *
     * @type {AbortSignalLike}
     * @memberof PageBlobResizeOptions
     */
    abortSignal?: AbortSignalLike;
    /**
     * Conditions to meet when resizing a page blob.
     *
     * @type {BlobAccessConditions}
     * @memberof PageBlobResizeOptions
     */
    accessConditions?: BlobAccessConditions;
}
/**
 * Options to configure Page Blob - Update Sequence Number operation.
 *
 * @export
 * @interface PageBlobUpdateSequenceNumberOptions
 */
export interface PageBlobUpdateSequenceNumberOptions {
    /**
     * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
     * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
     *
     * @type {AbortSignalLike}
     * @memberof PageBlobUpdateSequenceNumberOptions
     */
    abortSignal?: AbortSignalLike;
    /**
     * Conditions to meet when updating sequence number.
     *
     * @type {BlobAccessConditions}
     * @memberof PageBlobUpdateSequenceNumberOptions
     */
    accessConditions?: BlobAccessConditions;
}
/**
 * Options to configure Page Blob - Start Copy Incremental operation.
 *
 * @export
 * @interface PageBlobStartCopyIncrementalOptions
 */
export interface PageBlobStartCopyIncrementalOptions {
    /**
     * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
     * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
     *
     * @type {AbortSignalLike}
     * @memberof PageBlobStartCopyIncrementalOptions
     */
    abortSignal?: AbortSignalLike;
    /**
     * Conditions to meet when startting copy incremental operation.
     *
     * @type {Models.ModifiedAccessConditions}
     * @memberof PageBlobStartCopyIncrementalOptions
     */
    modifiedAccessConditions?: Models.ModifiedAccessConditions;
}
export interface PageBlobUploadPagesFromURLOptions {
    /**
     * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
     * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
     *
     * @type {AbortSignalLike}
     * @memberof PageBlobUploadPagesFromURLOptions
     */
    abortSignal?: AbortSignalLike;
    /**
     * Conditions to meet when updating sequence number.
     *
     * @type {PageBlobAccessConditions}
     * @memberof PageBlobUploadPagesFromURLOptions
     */
    accessConditions?: PageBlobAccessConditions;
    /**
     * Conditions to meet for the source Azure Blob/File when copying from a URL to the blob.
     *
     * @type {Models.ModifiedAccessConditions}
     * @memberof PageBlobUploadPagesFromURLOptions
     */
    sourceModifiedAccessConditions?: Models.ModifiedAccessConditions;
    /**
     * An MD5 hash of the content from the URI.
     * This hash is used to verify the integrity of the content during transport of the data from the URI.
     * When this is specified, the storage service compares the hash of the content that has arrived from the copy-source with this value.
     *
     * sourceContentMD5 and sourceContentCrc64 cannot be set at same time.
     *
     * @type {Uint8Array}
     * @memberof PageBlobUploadPagesFromURLOptions
     */
    sourceContentMD5?: Uint8Array;
    /**
     * A CRC64 hash of the content from the URI.
     * This hash is used to verify the integrity of the content during transport of the data from the URI.
     * When this is specified, the storage service compares the hash of the content that has arrived from the copy-source with this value.
     *
     * sourceContentMD5 and sourceContentCrc64 cannot be set at same time.
     *
     * @type {Uint8Array}
     * @memberof PageBlobUploadPagesFromURLOptions
     */
    sourceContentCrc64?: Uint8Array;
    /**
     * Customer Provided Key Info.
     *
     * @type {Models.CpkInfo}
     * @memberof PageBlobUploadPagesFromURLOptions
     */
    customerProvidedKey?: Models.CpkInfo;
}
/**
 * PageBlobClient defines a set of operations applicable to page blobs.
 *
 * @export
 * @class PageBlobClient
 * @extends {BlobClient}
 */
export declare class PageBlobClient extends BlobClient {
    /**
     * pageBlobsContext provided by protocol layer.
     *
     * @private
     * @type {PageBlobs}
     * @memberof PageBlobClient
     */
    private pageBlobContext;
    /**
     *
     * Creates an instance of PageBlobClient.
     *
     * @param {string} connectionString Account connection string or a SAS connection string of an Azure storage account.
     *                                  [ Note - Account connection string can only be used in NODE.JS runtime. ]
     *                                  Account connection string example -
     *                                  `DefaultEndpointsProtocol=https;AccountName=myaccount;AccountKey=accountKey;EndpointSuffix=core.windows.net`
     *                                  SAS connection string example -
     *                                  `BlobEndpoint=https://myaccount.blob.core.windows.net/;QueueEndpoint=https://myaccount.queue.core.windows.net/;FileEndpoint=https://myaccount.file.core.windows.net/;TableEndpoint=https://myaccount.table.core.windows.net/;SharedAccessSignature=sasString`
     * @param {string} containerName Container name.
     * @param {string} blobName Blob name.
     * @param {NewPipelineOptions} [options] Optional. Options to configure the HTTP pipeline.
     * @memberof PageBlobClient
     */
    constructor(connectionString: string, containerName: string, blobName: string, options?: NewPipelineOptions);
    /**
     * Creates an instance of PageBlobClient.
     * This method accepts an encoded URL or non-encoded URL pointing to a blob.
     * Encoded URL string will NOT be escaped twice, only special characters in URL path will be escaped.
     * If a blob name includes ? or %, blob name must be encoded in the URL.
     *
     * @param {string} url A Client string pointing to Azure Storage blob service, such as
     *                     "https://myaccount.blob.core.windows.net". You can append a SAS
     *                     if using AnonymousCredential, such as "https://myaccount.blob.core.windows.net?sasString".
     * @param {SharedKeyCredential | AnonymousCredential | TokenCredential} credential Such as AnonymousCredential, SharedKeyCredential
     *                                                  or a TokenCredential from @azure/identity.
     * @param {NewPipelineOptions} [options] Optional. Options to configure the HTTP pipeline.
     * @memberof PageBlobClient
     */
    constructor(url: string, credential: SharedKeyCredential | AnonymousCredential | TokenCredential, options?: NewPipelineOptions);
    /**
     * Creates an instance of PageBlobClient.
     *
     * @param {string} url A URL string pointing to Azure Storage blob, such as
     *                     "https://myaccount.blob.core.windows.net/mycontainer/blob".
     *                     You can append a SAS if using AnonymousCredential, such as
     *                     "https://myaccount.blob.core.windows.net/mycontainer/blob?sasString".
     *                     This method accepts an encoded URL or non-encoded URL pointing to a blob.
     *                     Encoded URL string will NOT be escaped twice, only special characters in URL path will be escaped.
     *                     However, if a blob name includes ? or %, blob name must be encoded in the URL.
     *                     Such as a blob named "my?blob%", the URL should be "https://myaccount.blob.core.windows.net/mycontainer/my%3Fblob%25".
     * @param {Pipeline} pipeline Call newPipeline() to create a default
     *                            pipeline, or provide a customized pipeline.
     * @memberof PageBlobClient
     */
    constructor(url: string, pipeline: Pipeline);
    /**
     * Creates a new PageBlobClient object identical to the source but with the
     * specified snapshot timestamp.
     * Provide "" will remove the snapshot and return a Client to the base blob.
     *
     * @param {string} snapshot The snapshot timestamp.
     * @returns {PageBlobClient} A new PageBlobClient object identical to the source but with the specified snapshot timestamp.
     * @memberof PageBlobClient
     */
    withSnapshot(snapshot: string): PageBlobClient;
    /**
     * Creates a page blob of the specified length. Call uploadPages to upload data
     * data to a page blob.
     * @see https://docs.microsoft.com/rest/api/storageservices/put-blob
     *
     * @param {number} size size of the page blob.
     * @param {PageBlobCreateOptions} [options] Options to the Page Blob Create operation.
     * @returns {Promise<Models.PageBlobCreateResponse>} Response data for the Page Blob Create operation.
     * @memberof PageBlobClient
     */
    create(size: number, options?: PageBlobCreateOptions): Promise<Models.PageBlobCreateResponse>;
    /**
     * Writes 1 or more pages to the page blob. The start and end offsets must be a multiple of 512.
     * @see https://docs.microsoft.com/rest/api/storageservices/put-page
     *
     * @param {HttpRequestBody} body Data to upload
     * @param {number} offset Offset of destination page blob
     * @param {number} count Content length of the body, also number of bytes to be uploaded
     * @param {PageBlobUploadPagesOptions} [options] Options to the Page Blob Upload Pages operation.
     * @returns {Promise<Models.PageBlobsUploadPagesResponse>} Response data for the Page Blob Upload Pages operation.
     * @memberof PageBlobClient
     */
    uploadPages(body: HttpRequestBody, offset: number, count: number, options?: PageBlobUploadPagesOptions): Promise<Models.PageBlobUploadPagesResponse>;
    /**
     * The Upload Pages operation writes a range of pages to a page blob where the
     * contents are read from a URL.
     * @see https://docs.microsoft.com/en-us/rest/api/storageservices/put-page-from-url
     *
     * @param {string} sourceURL Specify a URL to the copy source, Shared Access Signature(SAS) maybe needed for authentication
     * @param {number} sourceOffset The source offset to copy from. Pass 0 to copy from the beginning of source page blob
     * @param {number} destOffset Offset of destination page blob
     * @param {number} count Number of bytes to be uploaded from source page blob
     * @param {PageBlobUploadPagesFromURLOptions} [options={}]
     * @returns {Promise<Models.PageBlobUploadPagesFromURLResponse>}
     * @memberof PageBlobClient
     */
    uploadPagesFromURL(sourceURL: string, sourceOffset: number, destOffset: number, count: number, options?: PageBlobUploadPagesFromURLOptions): Promise<Models.PageBlobUploadPagesFromURLResponse>;
    /**
     * Frees the specified pages from the page blob.
     * @see https://docs.microsoft.com/rest/api/storageservices/put-page
     *
     * @param {number} [offset] Starting byte position of the pages to clear.
     * @param {number} [count] Number of bytes to clear.
     * @param {PageBlobClearPagesOptions} [options] Options to the Page Blob Clear Pages operation.
     * @returns {Promise<Models.PageBlobClearPagesResponse>} Response data for the Page Blob Clear Pages operation.
     * @memberof PageBlobClient
     */
    clearPages(offset?: number, count?: number, options?: PageBlobClearPagesOptions): Promise<Models.PageBlobClearPagesResponse>;
    /**
     * Returns the list of valid page ranges for a page blob or snapshot of a page blob.
     * @see https://docs.microsoft.com/rest/api/storageservices/get-page-ranges
     *
     * @param {number} [offset] Starting byte position of the page ranges.
     * @param {number} [count] Number of bytes to get.
     * @param {PageBlobGetPageRangesOptions} [options] Options to the Page Blob Get Ranges operation.
     * @returns {Promise<Models.PageBlobGetPageRangesResponse>} Response data for the Page Blob Get Ranges operation.
     * @memberof PageBlobClient
     */
    getPageRanges(offset?: number, count?: number, options?: PageBlobGetPageRangesOptions): Promise<Models.PageBlobGetPageRangesResponse>;
    /**
     * Gets the collection of page ranges that differ between a specified snapshot and this page blob.
     * @see https://docs.microsoft.com/rest/api/storageservices/get-page-ranges
     *
     * @param {number} offset Starting byte position of the page blob
     * @param {number} count Number of bytes to get ranges diff.
     * @param {string} prevSnapshot Timestamp of snapshot to retrive the difference.
     * @param {PageBlobGetPageRangesDiffOptions} [options] Options to the Page Blob Get Page Ranges Diff operation.
     * @returns {Promise<Models.PageBlobGetPageRangesDiffResponse>} Response data for the Page Blob Get Page Range Diff operation.
     * @memberof PageBlobClient
     */
    getPageRangesDiff(offset: number, count: number, prevSnapshot: string, options?: PageBlobGetPageRangesDiffOptions): Promise<Models.PageBlobGetPageRangesDiffResponse>;
    /**
     * Resizes the page blob to the specified size (which must be a multiple of 512).
     * @see https://docs.microsoft.com/rest/api/storageservices/set-blob-properties
     *
     * @param {number} size Target size
     * @param {PageBlobResizeOptions} [options] Options to the Page Blob Resize operation.
     * @returns {Promise<Models.PageBlobResizeResponse>} Response data for the Page Blob Resize operation.
     * @memberof PageBlobClient
     */
    resize(size: number, options?: PageBlobResizeOptions): Promise<Models.PageBlobResizeResponse>;
    /**
     * Sets a page blob's sequence number.
     * @see https://docs.microsoft.com/en-us/rest/api/storageservices/set-blob-properties
     *
     * @param {Models.SequenceNumberActionType} sequenceNumberAction Indicates how the service should modify the blob's sequence number.
     * @param {number} [sequenceNumber] Required if sequenceNumberAction is max or update
     * @param {PageBlobUpdateSequenceNumberOptions} [options] Options to the Page Blob Update Sequence Number operation.
     * @returns {Promise<Models.PageBlobUpdateSequenceNumberResponse>} Response data for the Page Blob Update Sequence Number operation.
     * @memberof PageBlobClient
     */
    updateSequenceNumber(sequenceNumberAction: Models.SequenceNumberActionType, sequenceNumber?: number, options?: PageBlobUpdateSequenceNumberOptions): Promise<Models.PageBlobUpdateSequenceNumberResponse>;
    /**
     * Begins an operation to start an incremental copy from one page blob's snapshot to this page blob.
     * The snapshot is copied such that only the differential changes between the previously
     * copied snapshot are transferred to the destination.
     * The copied snapshots are complete copies of the original snapshot and can be read or copied from as usual.
     * @see https://docs.microsoft.com/rest/api/storageservices/incremental-copy-blob
     * @see https://docs.microsoft.com/en-us/azure/virtual-machines/windows/incremental-snapshots
     *
     * @param {string} copySource Specifies the name of the source page blob snapshot. For example,
     *                            https://myaccount.blob.core.windows.net/mycontainer/myblob?snapshot=<DateTime>
     * @param {PageBlobStartCopyIncrementalOptions} [options] Options to the Page Blob Copy Incremental operation.
     * @returns {Promise<Models.PageBlobCopyIncrementalResponse>} Response data for the Page Blob Copy Incremental operation.
     * @memberof PageBlobClient
     */
    startCopyIncremental(copySource: string, options?: PageBlobStartCopyIncrementalOptions): Promise<Models.PageBlobCopyIncrementalResponse>;
}
//# sourceMappingURL=PageBlobClient.d.ts.map