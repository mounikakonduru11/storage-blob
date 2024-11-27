/// <reference types="node" />
import { HttpRequestBody, HttpResponse, TransferProgressEvent, TokenCredential } from "@azure/core-http";
import * as Models from "./generated/src/models";
import { AbortSignalLike } from "@azure/abort-controller";
import { BlobClient } from "./internal";
import { BlobHTTPHeaders } from "./generated/src/models";
import { Range } from "./Range";
import { BlobAccessConditions, Metadata, BlockBlobTier } from "./models";
import { NewPipelineOptions, Pipeline } from "./Pipeline";
import { SharedKeyCredential } from "./credentials/SharedKeyCredential";
import { AnonymousCredential } from "./credentials/AnonymousCredential";
import { Readable } from "stream";
/**
 * Options to configure Block Blob - Upload operation.
 *
 * @export
 * @interface BlockBlobUploadOptions
 */
export interface BlockBlobUploadOptions {
    /**
     * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
     * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
     *
     * @type {AbortSignalLike}
     * @memberof BlockBlobUploadOptions
     */
    abortSignal?: AbortSignalLike;
    /**
     * Conditions to meet when uploading to the block blob.
     *
     * @type {BlobAccessConditions}
     * @memberof BlockBlobUploadOptions
     */
    accessConditions?: BlobAccessConditions;
    /**
     * HTTP headers to set when uploading to a block blob.
     *
     * @type {Models.BlobHTTPHeaders}
     * @memberof BlockBlobUploadOptions
     */
    blobHTTPHeaders?: Models.BlobHTTPHeaders;
    /**
     * A collection of key-value string pair to associate with the blob when uploading to a block blob.
     *
     * @type {Metadata}
     * @memberof BlockBlobUploadOptions
     */
    metadata?: Metadata;
    /**
     * Callback to receive events on the progress of upload operation.
     *
     * @memberof BlockBlobUploadOptions
     */
    progress?: (progress: TransferProgressEvent) => void;
    /**
     * Customer Provided Key Info.
     *
     * @type {Models.CpkInfo}
     * @memberof BlockBlobUploadOptions
     */
    customerProvidedKey?: Models.CpkInfo;
    /**
     * Access tier.
     * More Details - https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blob-storage-tiers
     *
     * @type {BlockBlobTier | string}
     * @memberof BlockBlobUploadOptions
     */
    tier?: BlockBlobTier | string;
}
/**
 * Options to configure Block Blob - Stage Block operation.
 *
 * @export
 * @interface BlockBlobStageBlockOptions
 */
export interface BlockBlobStageBlockOptions {
    /**
     * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
     * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
     *
     * @type {AbortSignalLike}
     * @memberof BlockBlobStageBlockOptions
     */
    abortSignal?: AbortSignalLike;
    /**
     * If specified, contains the lease id that must be matched and lease with this id
     * must be active in order for the operation to succeed.
     *
     * @type {Models.LeaseAccessConditions}
     * @memberof BlockBlobStageBlockOptions
     */
    leaseAccessConditions?: Models.LeaseAccessConditions;
    /**
     * Callback to receive events on the progress of stage block operation.
     *
     * @memberof BlockBlobStageBlockOptions
     */
    progress?: (progress: TransferProgressEvent) => void;
    /**
     * An MD5 hash of the block content. This hash is used to verify the integrity of the block during transport.
     * When this is specified, the storage service compares the hash of the content that has arrived with this value.
     *
     * transactionalContentMD5 and transactionalContentCrc64 cannot be set at same time.
     *
     * @type {Uint8Array}
     * @memberof BlockBlobStageBlockOptions
     */
    transactionalContentMD5?: Uint8Array;
    /**
     * A CRC64 hash of the block content. This hash is used to verify the integrity of the block during transport.
     * When this is specified, the storage service compares the hash of the content that has arrived with this value.
     *
     * transactionalContentMD5 and transactionalContentCrc64 cannot be set at same time.
     *
     * @type {Uint8Array}
     * @memberof BlockBlobStageBlockOptions
     */
    transactionalContentCrc64?: Uint8Array;
    /**
     * Customer Provided Key Info.
     *
     * @type {Models.CpkInfo}
     * @memberof BlockBlobUploadOptions
     */
    customerProvidedKey?: Models.CpkInfo;
}
/**
 * Options to configure Block Blob - Stage Block from URL operation.
 *
 * @export
 * @interface BlockBlobStageBlockFromURLOptions
 */
export interface BlockBlobStageBlockFromURLOptions {
    /**
     * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
     * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
     *
     * @type {AbortSignalLike}
     * @memberof BlockBlobStageBlockFromURLOptions
     */
    abortSignal?: AbortSignalLike;
    /**
     * Specifies the bytes of the source Blob/File to upload.
     * If not specified, the entire content is uploaded as a single block.
     *
     * @type {Range}
     * @memberof BlockBlobStageBlockFromURLOptions
     */
    range?: Range;
    /**
     * If specified, contains the lease id that must be matched and lease with this id
     * must be active in order for the operation to succeed.
     *
     * @type {Models.LeaseAccessConditions}
     * @memberof BlockBlobStageBlockFromURLOptions
     */
    leaseAccessConditions?: Models.LeaseAccessConditions;
    /**
     * An MD5 hash of the content from the URI.
     * This hash is used to verify the integrity of the content during transport of the data from the URI.
     * When this is specified, the storage service compares the hash of the content that has arrived from the copy-source with this value.
     *
     * sourceContentMD5 and sourceContentCrc64 cannot be set at same time.
     *
     * @type {Uint8Array}
     * @memberof BlockBlobStageBlockFromURLOptions
     */
    sourceContentMD5?: Uint8Array;
    /**
     * A CRC64 hash of the content from the URI.
     * This hash is used to verify the integrity of the content during transport of the data from the URI.
     * When this is specified, the storage service compares the hash of the content that has arrived from the copy-source with this value.
     *
     * sourceContentMD5 and sourceContentCrc64 cannot be set at same time.
     * @type {Uint8Array}
     * @memberof BlockBlobStageBlockFromURLOptions
     */
    sourceContentCrc64?: Uint8Array;
    /**
     * Customer Provided Key Info.
     *
     * @type {Models.CpkInfo}
     * @memberof BlockBlobStageBlockFromURLOptions
     */
    customerProvidedKey?: Models.CpkInfo;
}
/**
 * Options to configure Block Blob - Commit Block List operation.
 *
 * @export
 * @interface BlockBlobCommitBlockListOptions
 */
export interface BlockBlobCommitBlockListOptions {
    /**
     * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
     * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
     *
     * @type {AbortSignalLike}
     * @memberof BlockBlobCommitBlockListOptions
     */
    abortSignal?: AbortSignalLike;
    /**
     * Conditions to meet when committing the block list.
     *
     * @type {BlobAccessConditions}
     * @memberof BlockBlobCommitBlockListOptions
     */
    /**
     * Conditions to meet when committing block list.
     *
     * @type {BlobAccessConditions}
     * @memberof BlockBlobCommitBlockListOptions
     */
    accessConditions?: BlobAccessConditions;
    /**
     * HTTP headers to set when committing block list.
     *
     * @type {Models.BlobHTTPHeaders}
     * @memberof BlockBlobCommitBlockListOptions
     */
    blobHTTPHeaders?: Models.BlobHTTPHeaders;
    /**
     * A collection of key-value string pair to associate with the blob when committing block list.
     *
     * @type {Metadata}
     * @memberof BlockBlobCommitBlockListOptions
     */
    metadata?: Metadata;
    /**
     * Customer Provided Key Info.
     *
     * @type {Models.CpkInfo}
     * @memberof BlockBlobCommitBlockListOptions
     */
    customerProvidedKey?: Models.CpkInfo;
    /**
     * Access tier.
     * More Details - https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blob-storage-tiers
     *
     * @type {BlockBlobTier | string}
     * @memberof BlockBlobCommitBlockListOptions
     */
    tier?: BlockBlobTier | string;
}
/**
 * Options to configure Block Blob - Get Block List operation.
 *
 * @export
 * @interface BlockBlobGetBlockListOptions
 */
export interface BlockBlobGetBlockListOptions {
    /**
     * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
     * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
     *
     * @type {AbortSignalLike}
     * @memberof BlockBlobGetBlockListOptions
     */
    abortSignal?: AbortSignalLike;
    /**
     * If specified, contains the lease id that must be matched and lease with this id
     * must be active in order for the operation to succeed.
     *
     * @type {Models.LeaseAccessConditions}
     * @memberof BlockBlobGetBlockListOptions
     */
    leaseAccessConditions?: Models.LeaseAccessConditions;
}
/**
 * Option interface for uploadStream().
 *
 * @export
 * @interface UploadStreamToBlockBlobOptions
 */
export interface UploadStreamToBlockBlobOptions {
    /**
     * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
     * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
     *
     * @type {AbortSignalLike}
     * @memberof IUploadToBlockBlobOptions
     */
    abortSignal?: AbortSignalLike;
    /**
     * Blob HTTP Headers.
     *
     * @type {BlobHTTPHeaders}
     * @memberof UploadStreamToBlockBlobOptions
     */
    blobHTTPHeaders?: BlobHTTPHeaders;
    /**
     * Metadata of block blob.
     *
     * @type {{ [propertyName: string]: string }}
     * @memberof UploadStreamToBlockBlobOptions
     */
    metadata?: {
        [propertyName: string]: string;
    };
    /**
     * Access conditions headers.
     *
     * @type {BlobAccessConditions}
     * @memberof UploadStreamToBlockBlobOptions
     */
    accessConditions?: BlobAccessConditions;
    /**
     * Progress updater.
     *
     * @memberof UploadStreamToBlockBlobOptions
     */
    progress?: (progress: TransferProgressEvent) => void;
}
/**
 * Option interface for BlockBlobClient.uploadFile() and BlockBlobClient.uploadSeekableStream().
 *
 * @export
 * @interface UploadToBlockBlobOptions
 */
export interface UploadToBlockBlobOptions {
    /**
     * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
     * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
     *
     * @type {AbortSignalLike}
     * @memberof IUploadToBlockBlobOptions
     */
    abortSignal?: AbortSignalLike;
    /**
     * Destination block blob size in bytes.
     *
     * @type {number}
     * @memberof UploadToBlockBlobOptions
     */
    blockSize?: number;
    /**
     * Blob size threshold in bytes to start concurrency uploading.
     * Default value is 256MB, blob size less than this option will
     * be uploaded via one I/O operation without concurrency.
     * You can customize a value less equal than the default value.
     *
     * @type {number}
     * @memberof UploadToBlockBlobOptions
     */
    maxSingleShotSize?: number;
    /**
     * Progress updater.
     *
     * @memberof UploadToBlockBlobOptions
     */
    progress?: (progress: TransferProgressEvent) => void;
    /**
     * Blob HTTP Headers.
     *
     * @type {BlobHTTPHeaders}
     * @memberof UploadToBlockBlobOptions
     */
    blobHTTPHeaders?: Models.BlobHTTPHeaders;
    /**
     * Metadata of block blob.
     *
     * @type {{ [propertyName: string]: string }}
     * @memberof UploadToBlockBlobOptions
     */
    metadata?: {
        [propertyName: string]: string;
    };
    /**
     * Access conditions headers.
     *
     * @type {BlobAccessConditions}
     * @memberof UploadToBlockBlobOptions
     */
    blobAccessConditions?: BlobAccessConditions;
    /**
     * Concurrency of parallel uploading. Must be >= 0.
     *
     * @type {number}
     * @memberof UploadToBlockBlobOptions
     */
    parallelism?: number;
}
/**
 * Type for BlockBlobClient.uploadFile(), BlockBlobClient.uploadStream() and BlockBlobClient.uploadBrowserDate().
 *
 * @export
 */
export declare type BlobUploadCommonResponse = Models.BlockBlobUploadHeaders & {
    /**
     * The underlying HTTP response.
     *
     * @type {HttpResponse}
     * @memberof IBlobUploadCommonResponse
     */
    _response: HttpResponse;
};
/**
 * BlockBlobClient defines a set of operations applicable to block blobs.
 *
 * @export
 * @class BlockBlobClient
 * @extends {BlobClient}
 */
export declare class BlockBlobClient extends BlobClient {
    /**
     * blockBlobContext provided by protocol layer.
     *
     * @private
     * @type {BlockBlobs}
     * @memberof BlockBlobClient
     */
    private blockBlobContext;
    /**
     *
     * Creates an instance of BlockBlobClient.
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
     * @memberof BlockBlobClient
     */
    constructor(connectionString: string, containerName: string, blobName: string, options?: NewPipelineOptions);
    /**
     * Creates an instance of BlockBlobClient.
     * This method accepts an encoded URL or non-encoded URL pointing to a block blob.
     * Encoded URL string will NOT be escaped twice, only special characters in URL path will be escaped.
     * If a blob name includes ? or %, blob name must be encoded in the URL.
     *
     * @param {string} url A URL string pointing to Azure Storage block blob, such as
     *                     "https://myaccount.blob.core.windows.net/mycontainer/blockblob". You can
     *                     append a SAS if using AnonymousCredential, such as
     *                     "https://myaccount.blob.core.windows.net/mycontainer/blockblob?sasString".
     *                     This method accepts an encoded URL or non-encoded URL pointing to a blob.
     *                     Encoded URL string will NOT be escaped twice, only special characters in URL path will be escaped.
     *                     However, if a blob name includes ? or %, blob name must be encoded in the URL.
     *                     Such as a blob named "my?blob%", the URL should be "https://myaccount.blob.core.windows.net/mycontainer/my%3Fblob%25".
     * @param {SharedKeyCredential | AnonymousCredential | TokenCredential} credential Such as AnonymousCredential, SharedKeyCredential or TokenCredential.
     * @param {NewPipelineOptions} [options] Optional. Options to configure the HTTP pipeline.
     * @memberof BlockBlobClient
     */
    constructor(url: string, credential?: SharedKeyCredential | AnonymousCredential | TokenCredential, options?: NewPipelineOptions);
    /**
     * Creates an instance of BlockBlobClient.
     * This method accepts an encoded URL or non-encoded URL pointing to a block blob.
     * Encoded URL string will NOT be escaped twice, only special characters in URL path will be escaped.
     * If a blob name includes ? or %, blob name must be encoded in the URL.
     *
     * @param {string} url A URL string pointing to Azure Storage block blob, such as
     *                     "https://myaccount.blob.core.windows.net/mycontainer/blockblob". You can
     *                     append a SAS if using AnonymousCredential, such as
     *                     "https://myaccount.blob.core.windows.net/mycontainer/blockblob?sasString".
     *                     This method accepts an encoded URL or non-encoded URL pointing to a blob.
     *                     Encoded URL string will NOT be escaped twice, only special characters in URL path will be escaped.
     *                     However, if a blob name includes ? or %, blob name must be encoded in the URL.
     *                     Such as a blob named "my?blob%", the URL should be "https://myaccount.blob.core.windows.net/mycontainer/my%3Fblob%25".
     * @param {Pipeline} pipeline Call newPipeline() to create a default
     *                            pipeline, or provide a customized pipeline.
     * @memberof BlockBlobClient
     */
    constructor(url: string, pipeline: Pipeline);
    /**
     * Creates a new BlockBlobClient object identical to the source but with the
     * specified snapshot timestamp.
     * Provide "" will remove the snapshot and return a URL to the base blob.
     *
     * @param {string} snapshot The snapshot timestamp.
     * @returns {BlockBlobClient} A new BlockBlobClient object identical to the source but with the specified snapshot timestamp.
     * @memberof BlockBlobClient
     */
    withSnapshot(snapshot: string): BlockBlobClient;
    /**
     * Creates a new block blob, or updates the content of an existing block blob.
     * Updating an existing block blob overwrites any existing metadata on the blob.
     * Partial updates are not supported; the content of the existing blob is
     * overwritten with the new content. To perform a partial update of a block blob's,
     * use stageBlock and commitBlockList.
     *
     * This is a non-parallel uploading method, please use uploadFile(),
     * uploadStream() or uploadBrowserData() for better performance
     * with concurrency uploading.
     *
     * @see https://docs.microsoft.com/rest/api/storageservices/put-blob
     *
     * @param {HttpRequestBody} body Blob, string, ArrayBuffer, ArrayBufferView or a function
     *                               which returns a new Readable stream whose offset is from data source beginning.
     * @param {number} contentLength Length of body in bytes. Use Buffer.byteLength() to calculate body length for a
     *                               string including non non-Base64/Hex-encoded characters.
     * @param {BlockBlobUploadOptions} [options] Options to the Block Blob Upload operation.
     * @returns {Promise<Models.BlockBlobUploadResponse>} Response data for the Block Blob Upload operation.
     * @memberof BlockBlobClient
     */
    upload(body: HttpRequestBody, contentLength: number, options?: BlockBlobUploadOptions): Promise<Models.BlockBlobUploadResponse>;
    /**
     * Uploads the specified block to the block blob's "staging area" to be later
     * committed by a call to commitBlockList.
     * @see https://docs.microsoft.com/rest/api/storageservices/put-block
     *
     * @param {string} blockId A 64-byte value that is base64-encoded
     * @param {HttpRequestBody} body Data to upload to the staging area.
     * @param {number} contentLength Number of bytes to upload.
     * @param {BlockBlobStageBlockOptions} [options] Options to the Block Blob Stage Block operation.
     * @returns {Promise<Models.BlockBlobStageBlockResponse>} Response data for the Block Blob Stage Block operation.
     * @memberof BlockBlobClient
     */
    stageBlock(blockId: string, body: HttpRequestBody, contentLength: number, options?: BlockBlobStageBlockOptions): Promise<Models.BlockBlobStageBlockResponse>;
    /**
     * The Stage Block From URL operation creates a new block to be committed as part
     * of a blob where the contents are read from a URL.
     * This API is available starting in version 2018-03-28.
     * @see https://docs.microsoft.com/en-us/rest/api/storageservices/put-block-from-url
     *
     * @param {string} blockId A 64-byte value that is base64-encoded
     * @param {string} sourceURL Specifies the URL of the blob. The value
     *                           may be a URL of up to 2 KB in length that specifies a blob.
     *                           The value should be URL-encoded as it would appear
     *                           in a request URI. The source blob must either be public
     *                           or must be authenticated via a shared access signature.
     *                           If the source blob is public, no authentication is required
     *                           to perform the operation. Here are some examples of source object URLs:
     *                           - https://myaccount.blob.core.windows.net/mycontainer/myblob
     *                           - https://myaccount.blob.core.windows.net/mycontainer/myblob?snapshot=<DateTime>
     * @param {number} [offset] From which position of the blob to download, >= 0
     * @param {number} [count] How much data to be downloaded, > 0. Will download to the end when undefined
     * @param {BlockBlobStageBlockFromURLOptions} [options={}] Options to the Block Blob Stage Block From URL operation.
     * @returns {Promise<Models.BlockBlobStageBlockFromURLResponse>} Response data for the Block Blob Stage Block From URL operation.
     * @memberof BlockBlobClient
     */
    stageBlockFromURL(blockId: string, sourceURL: string, offset?: number, count?: number, options?: BlockBlobStageBlockFromURLOptions): Promise<Models.BlockBlobStageBlockFromURLResponse>;
    /**
     * Writes a blob by specifying the list of block IDs that make up the blob.
     * In order to be written as part of a blob, a block must have been successfully written
     * to the server in a prior stageBlock operation. You can call commitBlockList to update a blob
     * by uploading only those blocks that have changed, then committing the new and existing
     * blocks together. Any blocks not specified in the block list and permanently deleted.
     * @see https://docs.microsoft.com/rest/api/storageservices/put-block-list
     *
     * @param {string[]} blocks  Array of 64-byte value that is base64-encoded
     * @param {BlockBlobCommitBlockListOptions} [options] Options to the Block Blob Commit Block List operation.
     * @returns {Promise<Models.BlockBlobCommitBlockListResponse>} Response data for the Block Blob Commit Block List operation.
     * @memberof BlockBlobClient
     */
    commitBlockList(blocks: string[], options?: BlockBlobCommitBlockListOptions): Promise<Models.BlockBlobCommitBlockListResponse>;
    /**
     * Returns the list of blocks that have been uploaded as part of a block blob
     * using the specified block list filter.
     * @see https://docs.microsoft.com/rest/api/storageservices/get-block-list
     *
     * @param {Models.BlockListType} listType Specifies whether to return the list of committed blocks,
     *                                        the list of uncommitted blocks, or both lists together.
     * @param {BlockBlobGetBlockListOptions} [options] Options to the Block Blob Get Block List operation.
     * @returns {Promise<Models.BlockBlobGetBlockListResponse>} Response data for the Block Blob Get Block List operation.
     * @memberof BlockBlobClient
     */
    getBlockList(listType: Models.BlockListType, options?: BlockBlobGetBlockListOptions): Promise<Models.BlockBlobGetBlockListResponse>;
    /**
     * ONLY AVAILABLE IN BROWSERS.
     *
     * Uploads a browser Blob/File/ArrayBuffer/ArrayBufferView object to block blob.
     *
     * When buffer length <= 256MB, this method will use 1 upload call to finish the upload.
     * Otherwise, this method will call stageBlock to upload blocks, and finally call commitBlockList
     * to commit the block list.
     *
     * @export
     * @param {Blob | ArrayBuffer | ArrayBufferView} browserData Blob, File, ArrayBuffer or ArrayBufferView
     * @param {UploadToBlockBlobOptions} [options] Options to upload browser data.
     * @returns {Promise<BlobUploadCommonResponse>} Response data for the Blob Upload operation.
     */
    uploadBrowserData(browserData: Blob | ArrayBuffer | ArrayBufferView, options?: UploadToBlockBlobOptions): Promise<BlobUploadCommonResponse>;
    /**
     * ONLY AVAILABLE IN BROWSERS.
     *
     * Uploads a browser Blob object to block blob. Requires a blobFactory as the data source,
     * which need to return a Blob object with the offset and size provided.
     *
     * When buffer length <= 256MB, this method will use 1 upload call to finish the upload.
     * Otherwise, this method will call stageBlock to upload blocks, and finally call commitBlockList
     * to commit the block list.
     *
     * @param {(offset: number, size: number) => Blob} blobFactory
     * @param {number} size size of the data to upload.
     * @param {UploadToBlockBlobOptions} [options] Options to Upload to Block Blob operation.
     * @returns {Promise<BlobUploadCommonResponse>} Response data for the Blob Upload operation.
     */
    private UploadSeekableBlob;
    /**
     * ONLY AVAILABLE IN NODE.JS RUNTIME.
     *
     * Uploads a local file in blocks to a block blob.
     *
     * When file size <= 256MB, this method will use 1 upload call to finish the upload.
     * Otherwise, this method will call stageBlock to upload blocks, and finally call commitBlockList
     * to commit the block list.
     *
     * @param {string} filePath Full path of local file
     * @param {UploadToBlockBlobOptions} [options] Options to Upload to Block Blob operation.
     * @returns {(Promise<BlobUploadCommonResponse>)}  Response data for the Blob Upload operation.
     */
    uploadFile(filePath: string, options?: UploadToBlockBlobOptions): Promise<BlobUploadCommonResponse>;
    /**
     * ONLY AVAILABLE IN NODE.JS RUNTIME.
     *
     * Uploads a Node.js Readable stream into block blob.
     *
     * PERFORMANCE IMPROVEMENT TIPS:
     * * Input stream highWaterMark is better to set a same value with bufferSize
     *    parameter, which will avoid Buffer.concat() operations.
     *
     * @param {Readable} stream Node.js Readable stream
     * @param {BlockBlobClient} blockBlobClient A BlockBlobClient instance
     * @param {number} bufferSize Size of every buffer allocated, also the block size in the uploaded block blob
     * @param {number} maxBuffers Max buffers will allocate during uploading, positive correlation
     *                            with max uploading concurrency
     * @param {UploadStreamToBlockBlobOptions} [options] Options to Upload Stream to Block Blob operation.
     * @returns {Promise<BlobUploadCommonResponse>} Response data for the Blob Upload operation.
     */
    uploadStream(stream: Readable, bufferSize: number, maxBuffers: number, options?: UploadStreamToBlockBlobOptions): Promise<BlobUploadCommonResponse>;
    /**
     * ONLY AVAILABLE IN NODE.JS RUNTIME.
     *
     * Accepts a Node.js Readable stream factory, and uploads in blocks to a block blob.
     * The Readable stream factory must returns a Node.js Readable stream starting from the offset defined. The offset
     * is the offset in the block blob to be uploaded.
     *
     * When buffer length <= 256MB, this method will use 1 upload call to finish the upload.
     * Otherwise, this method will call stageBlock to upload blocks, and finally call commitBlockList
     * to commit the block list.
     *
     * @export
     * @param {(offset: number) => NodeJS.ReadableStream} streamFactory Returns a Node.js Readable stream starting
     *                                                                  from the offset defined
     * @param {number} size Size of the block blob
     * @param {UploadToBlockBlobOptions} [options] Options to Upload to Block Blob operation.
     * @returns {(Promise<BlobUploadCommonResponse>)}  Response data for the Blob Upload operation.
     */
    private uploadResetableStream;
}
//# sourceMappingURL=BlockBlobClient.d.ts.map