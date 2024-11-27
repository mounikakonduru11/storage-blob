// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import * as tslib_1 from "tslib";
import { isTokenCredential, isNode } from "@azure/core-http";
import { BlobClient } from "./internal";
import { PageBlob } from "./generated/src/operations";
import { rangeToString } from "./Range";
import { ensureCpkIfSpecified, toAccessTier } from "./models";
import { newPipeline, Pipeline } from "./Pipeline";
import { URLConstants } from "./utils/constants";
import { setURLParameter, extractConnectionStringParts } from "./utils/utils.common";
import { SharedKeyCredential } from "./credentials/SharedKeyCredential";
import { AnonymousCredential } from "./credentials/AnonymousCredential";
/**
 * PageBlobClient defines a set of operations applicable to page blobs.
 *
 * @export
 * @class PageBlobClient
 * @extends {BlobClient}
 */
var PageBlobClient = /** @class */ (function (_super) {
    tslib_1.__extends(PageBlobClient, _super || null);
    function PageBlobClient(urlOrConnectionString, credentialOrPipelineOrContainerName, blobNameOrOptions, options) {
        var _this = this;
        // In TypeScript we cannot simply pass all parameters to super() like below so have to duplicate the code instead.
        //   super(s, credentialOrPipelineOrContainerNameOrOptions, blobNameOrOptions, options);
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
        _this.pageBlobContext = new PageBlob(_this.storageClientContext);
        return _this;
    }
    /**
     * Creates a new PageBlobClient object identical to the source but with the
     * specified snapshot timestamp.
     * Provide "" will remove the snapshot and return a Client to the base blob.
     *
     * @param {string} snapshot The snapshot timestamp.
     * @returns {PageBlobClient} A new PageBlobClient object identical to the source but with the specified snapshot timestamp.
     * @memberof PageBlobClient
     */
    PageBlobClient.prototype.withSnapshot = function (snapshot) {
        return new PageBlobClient(setURLParameter(this.url, URLConstants.Parameters.SNAPSHOT, snapshot.length === 0 ? undefined : snapshot), this.pipeline);
    };
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
    PageBlobClient.prototype.create = function (size, options) {
        if (options === void 0) { options = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                options.accessConditions = options.accessConditions || {};
                ensureCpkIfSpecified(options.customerProvidedKey, this.isHttps);
                return [2 /*return*/, this.pageBlobContext.create(0, size, {
                        abortSignal: options.abortSignal,
                        blobHTTPHeaders: options.blobHTTPHeaders,
                        blobSequenceNumber: options.blobSequenceNumber,
                        leaseAccessConditions: options.accessConditions.leaseAccessConditions,
                        metadata: options.metadata,
                        modifiedAccessConditions: options.accessConditions.modifiedAccessConditions,
                        cpkInfo: options.customerProvidedKey,
                        tier: toAccessTier(options.tier)
                    })];
            });
        });
    };
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
    PageBlobClient.prototype.uploadPages = function (body, offset, count, options) {
        if (options === void 0) { options = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                options.accessConditions = options.accessConditions || {};
                ensureCpkIfSpecified(options.customerProvidedKey, this.isHttps);
                return [2 /*return*/, this.pageBlobContext.uploadPages(body, count, {
                        abortSignal: options.abortSignal,
                        leaseAccessConditions: options.accessConditions.leaseAccessConditions,
                        modifiedAccessConditions: options.accessConditions.modifiedAccessConditions,
                        onUploadProgress: options.progress,
                        range: rangeToString({ offset: offset, count: count }),
                        sequenceNumberAccessConditions: options.accessConditions.sequenceNumberAccessConditions,
                        transactionalContentMD5: options.transactionalContentMD5,
                        transactionalContentCrc64: options.transactionalContentCrc64,
                        cpkInfo: options.customerProvidedKey
                    })];
            });
        });
    };
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
    PageBlobClient.prototype.uploadPagesFromURL = function (sourceURL, sourceOffset, destOffset, count, options) {
        if (options === void 0) { options = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                options.accessConditions = options.accessConditions || {};
                options.sourceModifiedAccessConditions = options.sourceModifiedAccessConditions || {};
                ensureCpkIfSpecified(options.customerProvidedKey, this.isHttps);
                return [2 /*return*/, this.pageBlobContext.uploadPagesFromURL(sourceURL, rangeToString({ offset: sourceOffset, count: count }), 0, rangeToString({ offset: destOffset, count: count }), {
                        abortSignal: options.abortSignal,
                        sourceContentMD5: options.sourceContentMD5,
                        sourceContentCrc64: options.sourceContentCrc64,
                        leaseAccessConditions: options.accessConditions.leaseAccessConditions,
                        sequenceNumberAccessConditions: options.accessConditions.sequenceNumberAccessConditions,
                        modifiedAccessConditions: options.accessConditions.modifiedAccessConditions,
                        sourceModifiedAccessConditions: {
                            sourceIfMatch: options.sourceModifiedAccessConditions.ifMatch,
                            sourceIfModifiedSince: options.sourceModifiedAccessConditions.ifModifiedSince,
                            sourceIfNoneMatch: options.sourceModifiedAccessConditions.ifNoneMatch,
                            sourceIfUnmodifiedSince: options.sourceModifiedAccessConditions.ifUnmodifiedSince
                        },
                        cpkInfo: options.customerProvidedKey
                    })];
            });
        });
    };
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
    PageBlobClient.prototype.clearPages = function (offset, count, options) {
        if (offset === void 0) { offset = 0; }
        if (options === void 0) { options = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                options.accessConditions = options.accessConditions || {};
                return [2 /*return*/, this.pageBlobContext.clearPages(0, {
                        abortSignal: options.abortSignal,
                        leaseAccessConditions: options.accessConditions.leaseAccessConditions,
                        modifiedAccessConditions: options.accessConditions.modifiedAccessConditions,
                        range: rangeToString({ offset: offset, count: count }),
                        sequenceNumberAccessConditions: options.accessConditions.sequenceNumberAccessConditions,
                        cpkInfo: options.customerProvidedKey
                    })];
            });
        });
    };
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
    PageBlobClient.prototype.getPageRanges = function (offset, count, options) {
        if (offset === void 0) { offset = 0; }
        if (options === void 0) { options = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                options.accessConditions = options.accessConditions || {};
                return [2 /*return*/, this.pageBlobContext.getPageRanges({
                        abortSignal: options.abortSignal,
                        leaseAccessConditions: options.accessConditions.leaseAccessConditions,
                        modifiedAccessConditions: options.accessConditions.modifiedAccessConditions,
                        range: rangeToString({ offset: offset, count: count })
                    })];
            });
        });
    };
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
    PageBlobClient.prototype.getPageRangesDiff = function (offset, count, prevSnapshot, options) {
        if (options === void 0) { options = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                options.accessConditions = options.accessConditions || {};
                return [2 /*return*/, this.pageBlobContext.getPageRangesDiff({
                        abortSignal: options.abortSignal,
                        leaseAccessConditions: options.accessConditions.leaseAccessConditions,
                        modifiedAccessConditions: options.accessConditions.modifiedAccessConditions,
                        prevsnapshot: prevSnapshot,
                        range: rangeToString({ offset: offset, count: count })
                    })];
            });
        });
    };
    /**
     * Resizes the page blob to the specified size (which must be a multiple of 512).
     * @see https://docs.microsoft.com/rest/api/storageservices/set-blob-properties
     *
     * @param {number} size Target size
     * @param {PageBlobResizeOptions} [options] Options to the Page Blob Resize operation.
     * @returns {Promise<Models.PageBlobResizeResponse>} Response data for the Page Blob Resize operation.
     * @memberof PageBlobClient
     */
    PageBlobClient.prototype.resize = function (size, options) {
        if (options === void 0) { options = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                options.accessConditions = options.accessConditions || {};
                return [2 /*return*/, this.pageBlobContext.resize(size, {
                        abortSignal: options.abortSignal,
                        leaseAccessConditions: options.accessConditions.leaseAccessConditions,
                        modifiedAccessConditions: options.accessConditions.modifiedAccessConditions
                    })];
            });
        });
    };
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
    PageBlobClient.prototype.updateSequenceNumber = function (sequenceNumberAction, sequenceNumber, options) {
        if (options === void 0) { options = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                options.accessConditions = options.accessConditions || {};
                return [2 /*return*/, this.pageBlobContext.updateSequenceNumber(sequenceNumberAction, {
                        abortSignal: options.abortSignal,
                        blobSequenceNumber: sequenceNumber,
                        leaseAccessConditions: options.accessConditions.leaseAccessConditions,
                        modifiedAccessConditions: options.accessConditions.modifiedAccessConditions
                    })];
            });
        });
    };
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
    PageBlobClient.prototype.startCopyIncremental = function (copySource, options) {
        if (options === void 0) { options = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.pageBlobContext.copyIncremental(copySource, {
                        abortSignal: options.abortSignal,
                        modifiedAccessConditions: options.modifiedAccessConditions
                    })];
            });
        });
    };
    return PageBlobClient;
}(BlobClient));
export { PageBlobClient };
//# sourceMappingURL=PageBlobClient.js.map