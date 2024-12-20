// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import * as tslib_1 from "tslib";
import { isNode, isTokenCredential } from "@azure/core-http";
import { BlobDownloadResponse } from "./BlobDownloadResponse";
import { Blob } from "./generated/src/operations";
import { rangeToString } from "./Range";
import { ensureCpkIfSpecified, toAccessTier } from "./models";
import { newPipeline, Pipeline } from "./Pipeline";
import { DEFAULT_MAX_DOWNLOAD_RETRY_REQUESTS, URLConstants, DEFAULT_BLOB_DOWNLOAD_BLOCK_BYTES } from "./utils/constants";
import { setURLParameter, extractConnectionStringParts, readStreamToLocalFile } from "./utils/utils.common";
import { AppendBlobClient, StorageClient } from "./internal";
import { BlockBlobClient } from "./internal";
import { PageBlobClient } from "./internal";
import { SharedKeyCredential } from "./credentials/SharedKeyCredential";
import { AnonymousCredential } from "./credentials/AnonymousCredential";
import { Batch } from "./utils/Batch";
import { streamToBuffer } from "./utils/utils.node";
import { LeaseClient } from "./LeaseClient";
/**
 * A BlobClient represents a URL to an Azure Storage blob; the blob may be a block blob,
 * append blob, or page blob.
 *
 * @export
 * @class BlobClient
 */
var BlobClient = /** @class */ (function (_super) {
    tslib_1.__extends(BlobClient, _super);
    function BlobClient(urlOrConnectionString, credentialOrPipelineOrContainerName, blobNameOrOptions, options) {
        var _this = this;
        var pipeline;
        if (credentialOrPipelineOrContainerName instanceof Pipeline) {
            pipeline = credentialOrPipelineOrContainerName;
        }
        else if ((isNode && credentialOrPipelineOrContainerName instanceof SharedKeyCredential) ||
            credentialOrPipelineOrContainerName instanceof AnonymousCredential ||
            isTokenCredential(credentialOrPipelineOrContainerName)) {
            options = blobNameOrOptions;
            pipeline = newPipeline(credentialOrPipelineOrContainerName, options);
        }
        else if (!credentialOrPipelineOrContainerName &&
            typeof credentialOrPipelineOrContainerName !== "string") {
            // The second parameter is undefined. Use anonymous credential.
            pipeline = newPipeline(new AnonymousCredential(), options);
        }
        else if (credentialOrPipelineOrContainerName &&
            typeof credentialOrPipelineOrContainerName === "string" &&
            blobNameOrOptions &&
            typeof blobNameOrOptions === "string") {
            var containerName = credentialOrPipelineOrContainerName;
            var blobName = blobNameOrOptions;
            var extractedCreds = extractConnectionStringParts(urlOrConnectionString);
            if (extractedCreds.kind === "AccountConnString") {
                if (isNode) {
                    var sharedKeyCredential = new SharedKeyCredential(extractedCreds.accountName, extractedCreds.accountKey);
                    urlOrConnectionString = extractedCreds.url + "/" + containerName + "/" + blobName;
                    pipeline = newPipeline(sharedKeyCredential, options);
                }
                else {
                    throw new Error("Account connection string is only supported in Node.js environment");
                }
            }
            else if (extractedCreds.kind === "SASConnString") {
                urlOrConnectionString =
                    extractedCreds.url +
                        "/" +
                        containerName +
                        "/" +
                        blobName +
                        "?" +
                        extractedCreds.accountSas;
                pipeline = newPipeline(new AnonymousCredential(), options);
            }
            else {
                throw new Error("Connection string must be either an Account connection string or a SAS connection string");
            }
        }
        else {
            throw new Error("Expecting non-empty strings for containerName and blobName parameters");
        }
        _this = _super.call(this, urlOrConnectionString, pipeline) || this;
        _this.blobContext = new Blob(_this.storageClientContext);
        return _this;
    }
    /**
     * Creates a new BlobClient object identical to the source but with the specified snapshot timestamp.
     * Provide "" will remove the snapshot and return a Client to the base blob.
     *
     * @param {string} snapshot The snapshot timestamp.
     * @returns {BlobClient} A new BlobClient object identical to the source but with the specified snapshot timestamp
     * @memberof BlobClient
     */
    BlobClient.prototype.withSnapshot = function (snapshot) {
        return new BlobClient(setURLParameter(this.url, URLConstants.Parameters.SNAPSHOT, snapshot.length === 0 ? undefined : snapshot), this.pipeline);
    };
    /**
     * Creates a AppendBlobClient object.
     *
     * @returns {AppendBlobClient}
     * @memberof BlobClient
     */
    BlobClient.prototype.getAppendBlobClient = function () {
        return new AppendBlobClient(this.url, this.pipeline);
    };
    /**
     * Creates a BlockBlobClient object.
     *
     * @returns {BlockBlobClient}
     * @memberof BlobClient
     */
    BlobClient.prototype.getBlockBlobClient = function () {
        return new BlockBlobClient(this.url, this.pipeline);
    };
    /**
     * Creates a PageBlobClient object.
     *
     * @returns {PageBlobClient}
     * @memberof BlobClient
     */
    BlobClient.prototype.getPageBlobClient = function () {
        return new PageBlobClient(this.url, this.pipeline);
    };
    /**
     * Reads or downloads a blob from the system, including its metadata and properties.
     * You can also call Get Blob to read a snapshot.
     *
     * * In Node.js, data returns in a Readable stream readableStreamBody
     * * In browsers, data returns in a promise blobBody
     *
     * @see https://docs.microsoft.com/en-us/rest/api/storageservices/get-blob
     *
     * @param {number} [offset] From which position of the blob to download, >= 0
     * @param {number} [count] How much data to be downloaded, > 0. Will download to the end when undefined
     * @param {BlobDownloadOptions} [options] Optional options to Blob Download operation.
     * @returns {Promise<Models.BlobDownloadResponse>}
     * @memberof BlobClient
     */
    BlobClient.prototype.download = function (offset, count, options) {
        if (offset === void 0) { offset = 0; }
        if (options === void 0) { options = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var res;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        options.blobAccessConditions = options.blobAccessConditions || {};
                        options.blobAccessConditions.modifiedAccessConditions =
                            options.blobAccessConditions.modifiedAccessConditions || {};
                        ensureCpkIfSpecified(options.customerProvidedKey, this.isHttps);
                        return [4 /*yield*/, this.blobContext.download({
                                abortSignal: options.abortSignal,
                                leaseAccessConditions: options.blobAccessConditions.leaseAccessConditions,
                                modifiedAccessConditions: options.blobAccessConditions.modifiedAccessConditions,
                                onDownloadProgress: isNode ? undefined : options.progress,
                                range: offset === 0 && !count ? undefined : rangeToString({ offset: offset, count: count }),
                                rangeGetContentMD5: options.rangeGetContentMD5,
                                rangeGetContentCRC64: options.rangeGetContentCrc64,
                                snapshot: options.snapshot,
                                cpkInfo: options.customerProvidedKey
                            })];
                    case 1:
                        res = _a.sent();
                        // Return browser response immediately
                        if (!isNode) {
                            return [2 /*return*/, res];
                        }
                        // We support retrying when download stream unexpected ends in Node.js runtime
                        // Following code shouldn't be bundled into browser build, however some
                        // bundlers may try to bundle following code and "FileReadResponse.ts".
                        // In this case, "FileDownloadResponse.browser.ts" will be used as a shim of "FileDownloadResponse.ts"
                        // The config is in package.json "browser" field
                        if (options.maxRetryRequests === undefined || options.maxRetryRequests < 0) {
                            // TODO: Default value or make it a required parameter?
                            options.maxRetryRequests = DEFAULT_MAX_DOWNLOAD_RETRY_REQUESTS;
                        }
                        if (res.contentLength === undefined) {
                            throw new RangeError("File download response doesn't contain valid content length header");
                        }
                        if (!res.eTag) {
                            throw new RangeError("File download response doesn't contain valid etag header");
                        }
                        return [2 /*return*/, new BlobDownloadResponse(res, function (start) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var updatedOptions;
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            updatedOptions = {
                                                leaseAccessConditions: options.blobAccessConditions.leaseAccessConditions,
                                                modifiedAccessConditions: {
                                                    ifMatch: options.blobAccessConditions.modifiedAccessConditions.ifMatch || res.eTag,
                                                    ifModifiedSince: options.blobAccessConditions.modifiedAccessConditions
                                                        .ifModifiedSince,
                                                    ifNoneMatch: options.blobAccessConditions.modifiedAccessConditions.ifNoneMatch,
                                                    ifUnmodifiedSince: options.blobAccessConditions.modifiedAccessConditions
                                                        .ifUnmodifiedSince
                                                },
                                                range: rangeToString({
                                                    count: offset + res.contentLength - start,
                                                    offset: start
                                                }),
                                                rangeGetContentMD5: options.rangeGetContentMD5,
                                                rangeGetContentCRC64: options.rangeGetContentCrc64,
                                                snapshot: options.snapshot,
                                                cpkInfo: options.customerProvidedKey
                                            };
                                            return [4 /*yield*/, this.blobContext.download(tslib_1.__assign({ abortSignal: options.abortSignal }, updatedOptions))];
                                        case 1: 
                                        // Debug purpose only
                                        // console.log(
                                        //   `Read from internal stream, range: ${
                                        //     updatedOptions.range
                                        //   }, options: ${JSON.stringify(updatedOptions)}`
                                        // );
                                        return [2 /*return*/, (_a.sent()).readableStreamBody];
                                    }
                                });
                            }); }, offset, res.contentLength, {
                                abortSignal: options.abortSignal,
                                maxRetryRequests: options.maxRetryRequests,
                                progress: options.progress
                            })];
                }
            });
        });
    };
    /**
     * Returns all user-defined metadata, standard HTTP properties, and system properties
     * for the blob. It does not return the content of the blob.
     * @see https://docs.microsoft.com/en-us/rest/api/storageservices/get-blob-properties
     *
     * @param {BlobGetPropertiesOptions} [options] Optional options to Get Properties operation.
     * @returns {Promise<Models.BlobGetPropertiesResponse>}
     * @memberof BlobClient
     */
    BlobClient.prototype.getProperties = function (options) {
        if (options === void 0) { options = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                options.blobAccessConditions = options.blobAccessConditions || {};
                ensureCpkIfSpecified(options.customerProvidedKey, this.isHttps);
                return [2 /*return*/, this.blobContext.getProperties({
                        abortSignal: options.abortSignal,
                        leaseAccessConditions: options.blobAccessConditions.leaseAccessConditions,
                        modifiedAccessConditions: options.blobAccessConditions.modifiedAccessConditions,
                        cpkInfo: options.customerProvidedKey
                    })];
            });
        });
    };
    /**
     * Marks the specified blob or snapshot for deletion. The blob is later deleted
     * during garbage collection. Note that in order to delete a blob, you must delete
     * all of its snapshots. You can delete both at the same time with the Delete
     * Blob operation.
     * @see https://docs.microsoft.com/en-us/rest/api/storageservices/delete-blob
     *
     * @param {BlobDeleteOptions} [options] Optional options to Blob Delete operation.
     * @returns {Promise<Models.BlobDeleteResponse>}
     * @memberof BlobClient
     */
    BlobClient.prototype.delete = function (options) {
        if (options === void 0) { options = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                options.blobAccessConditions = options.blobAccessConditions || {};
                return [2 /*return*/, this.blobContext.deleteMethod({
                        abortSignal: options.abortSignal,
                        deleteSnapshots: options.deleteSnapshots,
                        leaseAccessConditions: options.blobAccessConditions.leaseAccessConditions,
                        modifiedAccessConditions: options.blobAccessConditions.modifiedAccessConditions
                    })];
            });
        });
    };
    /**
     * Restores the contents and metadata of soft deleted blob and any associated
     * soft deleted snapshots. Undelete Blob is supported only on version 2017-07-29
     * or later.
     * @see https://docs.microsoft.com/en-us/rest/api/storageservices/undelete-blob
     *
     * @param {BlobUndeleteOptions} [options] Optional options to Blob Undelete operation.
     * @returns {Promise<Models.BlobUndeleteResponse>}
     * @memberof BlobClient
     */
    BlobClient.prototype.undelete = function (options) {
        if (options === void 0) { options = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.blobContext.undelete({
                        abortSignal: options.abortSignal
                    })];
            });
        });
    };
    /**
     * Sets system properties on the blob.
     *
     * If no value provided, or no value provided for the specificed blob HTTP headers,
     * these blob HTTP headers without a value will be cleared.
     * @see https://docs.microsoft.com/en-us/rest/api/storageservices/set-blob-properties
     *
     * @param {Models.BlobHTTPHeaders} [blobHTTPHeaders] If no value provided, or no value provided for
     *                                                   the specificed blob HTTP headers, these blob HTTP
     *                                                   headers without a value will be cleared.
     * @param {BlobSetHTTPHeadersOptions} [options] Optional options to Blob Set HTTP Headers operation.
     * @returns {Promise<Models.BlobSetHTTPHeadersResponse>}
     * @memberof BlobClient
     */
    BlobClient.prototype.setHTTPHeaders = function (blobHTTPHeaders, options) {
        if (options === void 0) { options = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                options.blobAccessConditions = options.blobAccessConditions || {};
                ensureCpkIfSpecified(options.customerProvidedKey, this.isHttps);
                return [2 /*return*/, this.blobContext.setHTTPHeaders({
                        abortSignal: options.abortSignal,
                        blobHTTPHeaders: blobHTTPHeaders,
                        leaseAccessConditions: options.blobAccessConditions.leaseAccessConditions,
                        modifiedAccessConditions: options.blobAccessConditions.modifiedAccessConditions,
                        cpkInfo: options.customerProvidedKey
                    })];
            });
        });
    };
    /**
     * Sets user-defined metadata for the specified blob as one or more name-value pairs.
     *
     * If no option provided, or no metadata defined in the parameter, the blob
     * metadata will be removed.
     * @see https://docs.microsoft.com/en-us/rest/api/storageservices/set-blob-metadata
     *
     * @param {Metadata} [metadata] Replace existing metadata with this value.
     *                               If no value provided the existing metadata will be removed.
     * @param {BlobSetMetadataOptions} [options] Optional options to Set Metadata operation.
     * @returns {Promise<Models.BlobSetMetadataResponse>}
     * @memberof BlobClient
     */
    BlobClient.prototype.setMetadata = function (metadata, options) {
        if (options === void 0) { options = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                options.blobAccessConditions = options.blobAccessConditions || {};
                ensureCpkIfSpecified(options.customerProvidedKey, this.isHttps);
                return [2 /*return*/, this.blobContext.setMetadata({
                        abortSignal: options.abortSignal,
                        leaseAccessConditions: options.blobAccessConditions.leaseAccessConditions,
                        metadata: metadata,
                        modifiedAccessConditions: options.blobAccessConditions.modifiedAccessConditions,
                        cpkInfo: options.customerProvidedKey
                    })];
            });
        });
    };
    /**
     * Get a LeaseClient that manages leases on the blob.
     *
     * @param {string} [proposeLeaseId] Initial proposed lease Id.
     * @returns {LeaseClient} A new LeaseClient object for managing leases on the blob.
     * @memberof BlobClient
     */
    BlobClient.prototype.getLeaseClient = function (proposeLeaseId) {
        return new LeaseClient(this, proposeLeaseId);
    };
    /**
     * Creates a read-only snapshot of a blob.
     * @see https://docs.microsoft.com/en-us/rest/api/storageservices/snapshot-blob
     *
     * @param {BlobCreateSnapshotOptions} [options] Optional options to the Blob Create Snapshot operation.
     * @returns {Promise<Models.BlobCreateSnapshotResponse>}
     * @memberof BlobClient
     */
    BlobClient.prototype.createSnapshot = function (options) {
        if (options === void 0) { options = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                options.blobAccessConditions = options.blobAccessConditions || {};
                ensureCpkIfSpecified(options.customerProvidedKey, this.isHttps);
                return [2 /*return*/, this.blobContext.createSnapshot({
                        abortSignal: options.abortSignal,
                        leaseAccessConditions: options.blobAccessConditions.leaseAccessConditions,
                        metadata: options.metadata,
                        modifiedAccessConditions: options.blobAccessConditions.modifiedAccessConditions,
                        cpkInfo: options.customerProvidedKey
                    })];
            });
        });
    };
    /**
     * Asynchronously copies a blob to a destination within the storage account.
     * In version 2012-02-12 and later, the source for a Copy Blob operation can be
     * a committed blob in any Azure storage account.
     * Beginning with version 2015-02-21, the source for a Copy Blob operation can be
     * an Azure file in any Azure storage account.
     * Only storage accounts created on or after June 7th, 2012 allow the Copy Blob
     * operation to copy from another storage account.
     * @see https://docs.microsoft.com/en-us/rest/api/storageservices/copy-blob
     *
     * @param {string} copySource url to the ource Azure Blob/File.
     * @param {BlobStartCopyFromURLOptions} [options] Optional options to the Blob Start Copy From URL operation.
     * @returns {Promise<Models.BlobStartCopyFromURLResponse>}
     * @memberof BlobClient
     */
    BlobClient.prototype.startCopyFromURL = function (copySource, options) {
        if (options === void 0) { options = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                options.blobAccessConditions = options.blobAccessConditions || {};
                options.sourceModifiedAccessConditions = options.sourceModifiedAccessConditions || {};
                return [2 /*return*/, this.blobContext.startCopyFromURL(copySource, {
                        abortSignal: options.abortSignal,
                        leaseAccessConditions: options.blobAccessConditions.leaseAccessConditions,
                        metadata: options.metadata,
                        modifiedAccessConditions: options.blobAccessConditions.modifiedAccessConditions,
                        sourceModifiedAccessConditions: {
                            sourceIfMatch: options.sourceModifiedAccessConditions.ifMatch,
                            sourceIfModifiedSince: options.sourceModifiedAccessConditions.ifModifiedSince,
                            sourceIfNoneMatch: options.sourceModifiedAccessConditions.ifNoneMatch,
                            sourceIfUnmodifiedSince: options.sourceModifiedAccessConditions.ifUnmodifiedSince
                        },
                        rehydratePriority: options.rehydratePriority,
                        tier: toAccessTier(options.tier)
                    })];
            });
        });
    };
    /**
     * Aborts a pending asynchronous Copy Blob operation, and leaves a destination blob with zero
     * length and full metadata. Version 2012-02-12 and newer.
     * @see https://docs.microsoft.com/en-us/rest/api/storageservices/abort-copy-blob
     *
     * @param {string} copyId Id of the Copy From URL operation.
     * @param {BlobAbortCopyFromURLOptions} [options] Optional options to the Blob Abort Copy From URL operation.
     * @returns {Promise<Models.BlobAbortCopyFromURLResponse>}
     * @memberof BlobClient
     */
    BlobClient.prototype.abortCopyFromURL = function (copyId, options) {
        if (options === void 0) { options = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.blobContext.abortCopyFromURL(copyId, {
                        abortSignal: options.abortSignal,
                        leaseAccessConditions: options.leaseAccessConditions
                    })];
            });
        });
    };
    /**
     * The synchronous Copy From URL operation copies a blob or an internet resource to a new blob. It will not
     * return a response until the copy is complete.
     * @see https://docs.microsoft.com/en-us/rest/api/storageservices/copy-blob-from-url
     *
     * @param {string} copySource The source URL to copy from, Shared Access Signature(SAS) maybe needed for authentication
     * @param {BlobSyncCopyFromURLOptions} [options={}]
     * @returns {Promise<Models.BlobCopyFromURLResponse>}
     * @memberof BlobURL
     */
    BlobClient.prototype.syncCopyFromURL = function (copySource, options) {
        if (options === void 0) { options = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                options.blobAccessConditions = options.blobAccessConditions || {};
                options.sourceModifiedAccessConditions = options.sourceModifiedAccessConditions || {};
                return [2 /*return*/, this.blobContext.copyFromURL(copySource, {
                        abortSignal: options.abortSignal,
                        metadata: options.metadata,
                        leaseAccessConditions: options.blobAccessConditions.leaseAccessConditions,
                        modifiedAccessConditions: options.blobAccessConditions.modifiedAccessConditions,
                        sourceModifiedAccessConditions: {
                            sourceIfMatch: options.sourceModifiedAccessConditions.ifMatch,
                            sourceIfModifiedSince: options.sourceModifiedAccessConditions.ifModifiedSince,
                            sourceIfNoneMatch: options.sourceModifiedAccessConditions.ifNoneMatch,
                            sourceIfUnmodifiedSince: options.sourceModifiedAccessConditions.ifUnmodifiedSince
                        }
                    })];
            });
        });
    };
    /**
     * Sets the tier on a blob. The operation is allowed on a page blob in a premium
     * storage account and on a block blob in a blob storage account (locally redundant
     * storage only). A premium page blob's tier determines the allowed size, IOPS,
     * and bandwidth of the blob. A block blob's tier determines Hot/Cool/Archive
     * storage type. This operation does not update the blob's ETag.
     * @see https://docs.microsoft.com/en-us/rest/api/storageservices/set-blob-tier
     *
     * @param {BlockBlobTier | PremiumPageBlobTier | string} tier The tier to be set on the blob. Valid values are Hot, Cool, or Archive.
     * @param {BlobSetTierOptions} [options] Optional options to the Blob Set Tier operation.
     * @returns {Promise<Models.BlobsSetTierResponse>}
     * @memberof BlobClient
     */
    BlobClient.prototype.setTier = function (tier, options) {
        if (options === void 0) { options = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.blobContext.setTier(toAccessTier(tier), {
                            abortSignal: options.abortSignal,
                            leaseAccessConditions: options.leaseAccessConditions,
                            rehydratePriority: options.rehydratePriority
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // High level function
    /**
     * ONLY AVAILABLE IN NODE.JS RUNTIME.
     *
     * Downloads an Azure Blob in parallel to a buffer.
     * Offset and count are optional, pass 0 for both to download the entire blob.
     *
     * @export
     * @param {Buffer} buffer Buffer to be fill, must have length larger than count
     * @param {number} offset From which position of the block blob to download(in bytes)
     * @param {number} [count] How much data(in bytes) to be downloaded. Will download to the end when passing undefined
     * @param {DownloadFromBlobOptions} [options] DownloadFromBlobOptions
     * @returns {Promise<void>}
     */
    BlobClient.prototype.downloadToBuffer = function (buffer, offset, count, options) {
        if (options === void 0) { options = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var response, transferProgress, batch, _loop_1, off;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!options.blockSize) {
                            options.blockSize = 0;
                        }
                        if (options.blockSize < 0) {
                            throw new RangeError("blockSize option must be >= 0");
                        }
                        if (options.blockSize === 0) {
                            options.blockSize = DEFAULT_BLOB_DOWNLOAD_BLOCK_BYTES;
                        }
                        if (offset < 0) {
                            throw new RangeError("offset option must be >= 0");
                        }
                        if (count && count <= 0) {
                            throw new RangeError("count option must be > 0");
                        }
                        if (!options.blobAccessConditions) {
                            options.blobAccessConditions = {};
                        }
                        if (!!count) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getProperties(options)];
                    case 1:
                        response = _a.sent();
                        count = response.contentLength - offset;
                        if (count < 0) {
                            throw new RangeError("offset " + offset + " shouldn't be larger than blob size " + response.contentLength);
                        }
                        _a.label = 2;
                    case 2:
                        if (buffer.length < count) {
                            throw new RangeError("The buffer's size should be equal to or larger than the request count of bytes: " + count);
                        }
                        transferProgress = 0;
                        batch = new Batch(options.parallelism);
                        _loop_1 = function (off) {
                            batch.addOperation(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var chunkEnd, response, stream;
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            chunkEnd = offset + count;
                                            if (off + options.blockSize < chunkEnd) {
                                                chunkEnd = off + options.blockSize;
                                            }
                                            return [4 /*yield*/, this.download(off, chunkEnd - off, {
                                                    abortSignal: options.abortSignal,
                                                    blobAccessConditions: options.blobAccessConditions,
                                                    maxRetryRequests: options.maxRetryRequestsPerBlock
                                                })];
                                        case 1:
                                            response = _a.sent();
                                            stream = response.readableStreamBody;
                                            return [4 /*yield*/, streamToBuffer(stream, buffer, off - offset, chunkEnd - offset)];
                                        case 2:
                                            _a.sent();
                                            // Update progress after block is downloaded, in case of block trying
                                            // Could provide finer grained progress updating inside HTTP requests,
                                            // only if convenience layer download try is enabled
                                            transferProgress += chunkEnd - off;
                                            if (options.progress) {
                                                options.progress({ loadedBytes: transferProgress });
                                            }
                                            return [2 /*return*/];
                                    }
                                });
                            }); });
                        };
                        for (off = offset; off < offset + count; off = off + options.blockSize) {
                            _loop_1(off);
                        }
                        return [4 /*yield*/, batch.do()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * ONLY AVAILABLE IN NODE.JS RUNTIME.
     *
     * Downloads an Azure Blob to a local file.
     * Fails if the the given file path already exits.
     * Offset and count are optional, pass 0 and undefined respectively to download the entire blob.
     *
     * @param {string} filePath
     * @param {number} [offset] From which position of the block blob to download.
     * @param {number} [count] How much data to be downloaded. Will download to the end when passing undefined.
     * @param {BlobDownloadOptions} [options] Options to Blob download options.
     * @returns {Promise<Models.BlobDownloadResponse>} The response data for blob download operation,
     *                                                 but with readableStreamBody set to undefined since its
     *                                                 content is already read and written into a local file
     *                                                 at the specified path.
     * @memberof BlobClient
     */
    BlobClient.prototype.downloadToFile = function (filePath, offset, count, options) {
        if (offset === void 0) { offset = 0; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var response;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.download(offset, count, options)];
                    case 1:
                        response = _a.sent();
                        if (!response.readableStreamBody) return [3 /*break*/, 3];
                        return [4 /*yield*/, readStreamToLocalFile(response.readableStreamBody, filePath)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        // The stream is no longer accessible so setting it to undefined.
                        response.blobDownloadStream = undefined;
                        return [2 /*return*/, response];
                }
            });
        });
    };
    return BlobClient;
}(StorageClient));
export { BlobClient };
//# sourceMappingURL=BlobClient.js.map