// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import * as tslib_1 from "tslib";
import { isTokenCredential, isNode } from "@azure/core-http";
import { BlobClient } from "./internal";
import { AppendBlob } from "./generated/src/operations";
import { ensureCpkIfSpecified } from "./models";
import { newPipeline, Pipeline } from "./Pipeline";
import { URLConstants } from "./utils/constants";
import { setURLParameter, extractConnectionStringParts } from "./utils/utils.common";
import { SharedKeyCredential } from "./credentials/SharedKeyCredential";
import { AnonymousCredential } from "./credentials/AnonymousCredential";
import { rangeToString } from "./Range";
/**
 * AppendBlobClient defines a set of operations applicable to append blobs.
 *
 * @export
 * @class AppendBlobClient
 * @extends {BlobClient}
 */
var AppendBlobClient = /** @class */ (function (_super) {
    tslib_1.__extends(AppendBlobClient, _super || null);
    function AppendBlobClient(urlOrConnectionString, credentialOrPipelineOrContainerName, blobNameOrOptions, options) {
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
        _this.appendBlobContext = new AppendBlob(_this.storageClientContext);
        return _this;
    }
    /**
     * Creates a new AppendBlobClient object identical to the source but with the
     * specified snapshot timestamp.
     * Provide "" will remove the snapshot and return a Client to the base blob.
     *
     * @param {string} snapshot The snapshot timestamp.
     * @returns {AppendBlobClient} A new AppendBlobClient object identical to the source but with the specified snapshot timestamp.
     * @memberof AppendBlobClient
     */
    AppendBlobClient.prototype.withSnapshot = function (snapshot) {
        return new AppendBlobClient(setURLParameter(this.url, URLConstants.Parameters.SNAPSHOT, snapshot.length === 0 ? undefined : snapshot), this.pipeline);
    };
    /**
     * Creates a 0-length append blob. Call AppendBlock to append data to an append blob.
     * @see https://docs.microsoft.com/rest/api/storageservices/put-blob
     *
     * @param {AppendBlobCreateOptions} [options] Options to the Append Block Create operation.
     * @returns {Promise<Models.AppendBlobsCreateResponse>}
     * @memberof AppendBlobClient
     */
    AppendBlobClient.prototype.create = function (options) {
        if (options === void 0) { options = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                options.accessConditions = options.accessConditions || {};
                ensureCpkIfSpecified(options.customerProvidedKey, this.isHttps);
                return [2 /*return*/, this.appendBlobContext.create(0, {
                        abortSignal: options.abortSignal,
                        blobHTTPHeaders: options.blobHTTPHeaders,
                        leaseAccessConditions: options.accessConditions.leaseAccessConditions,
                        metadata: options.metadata,
                        modifiedAccessConditions: options.accessConditions.modifiedAccessConditions,
                        cpkInfo: options.customerProvidedKey
                    })];
            });
        });
    };
    /**
     * Commits a new block of data to the end of the existing append blob.
     * @see https://docs.microsoft.com/rest/api/storageservices/append-block
     *
     * @param {HttpRequestBody} body Data to be appended.
     * @param {number} contentLength Length of the body in bytes.
     * @param {AppendBlobAppendBlockOptions} [options] Options to the Append Block operation.
     * @returns {Promise<Models.AppendBlobsAppendBlockResponse>}
     * @memberof AppendBlobClient
     */
    AppendBlobClient.prototype.appendBlock = function (body, contentLength, options) {
        if (options === void 0) { options = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                options.accessConditions = options.accessConditions || {};
                ensureCpkIfSpecified(options.customerProvidedKey, this.isHttps);
                return [2 /*return*/, this.appendBlobContext.appendBlock(body, contentLength, {
                        abortSignal: options.abortSignal,
                        appendPositionAccessConditions: options.accessConditions.appendPositionAccessConditions,
                        leaseAccessConditions: options.accessConditions.leaseAccessConditions,
                        modifiedAccessConditions: options.accessConditions.modifiedAccessConditions,
                        onUploadProgress: options.progress,
                        transactionalContentMD5: options.transactionalContentMD5,
                        transactionalContentCrc64: options.transactionalContentCrc64,
                        cpkInfo: options.customerProvidedKey
                    })];
            });
        });
    };
    /**
     * The Append Block operation commits a new block of data to the end of an existing append blob
     * where the contents are read from a source url.
     * @see https://docs.microsoft.com/en-us/rest/api/storageservices/append-block-from-url
     *
     * @param {string} sourceURL
     *                 The url to the blob that will be the source of the copy. A source blob in the same storage account can
     *                 be authenticated via Shared Key. However, if the source is a blob in another account, the source blob
     *                 must either be public or must be authenticated via a shared access signature. If the source blob is
     *                 public, no authentication is required to perform the operation.
     * @param {number} sourceOffset Offset in source to be appended
     * @param {number} count Number of bytes to be appended as a block
     * @param {AppendBlobAppendBlockFromURLOptions} [options={}]
     * @returns {Promise<Models.AppendBlobAppendBlockFromUrlResponse>}
     * @memberof AppendBlobClient
     */
    AppendBlobClient.prototype.appendBlockFromURL = function (sourceURL, sourceOffset, count, options) {
        if (options === void 0) { options = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                options.accessConditions = options.accessConditions || {};
                options.sourceModifiedAccessConditions = options.sourceModifiedAccessConditions || {};
                ensureCpkIfSpecified(options.customerProvidedKey, this.isHttps);
                return [2 /*return*/, this.appendBlobContext.appendBlockFromUrl(sourceURL, 0, {
                        abortSignal: options.abortSignal,
                        sourceRange: rangeToString({ offset: sourceOffset, count: count }),
                        sourceContentMD5: options.sourceContentMD5,
                        sourceContentCrc64: options.sourceContentCrc64,
                        leaseAccessConditions: options.accessConditions.leaseAccessConditions,
                        appendPositionAccessConditions: options.accessConditions.appendPositionAccessConditions,
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
    return AppendBlobClient;
}(BlobClient));
export { AppendBlobClient };
//# sourceMappingURL=AppendBlobClient.js.map