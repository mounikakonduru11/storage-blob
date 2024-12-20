// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import * as tslib_1 from "tslib";
import * as fs from "fs";
import { generateUuid, isTokenCredential, isNode } from "@azure/core-http";
import { BlobClient } from "./internal";
import { BlockBlob } from "./generated/src/operations";
import { rangeToString } from "./Range";
import { ensureCpkIfSpecified, toAccessTier } from "./models";
import { newPipeline, Pipeline } from "./Pipeline";
import { setURLParameter, extractConnectionStringParts, generateBlockID } from "./utils/utils.common";
import { SharedKeyCredential } from "./credentials/SharedKeyCredential";
import { AnonymousCredential } from "./credentials/AnonymousCredential";
import { URLConstants, BLOCK_BLOB_MAX_STAGE_BLOCK_BYTES, BLOCK_BLOB_MAX_UPLOAD_BLOB_BYTES, BLOCK_BLOB_MAX_BLOCKS, DEFAULT_BLOB_DOWNLOAD_BLOCK_BYTES } from "./utils/constants";
import { BufferScheduler } from "./utils/BufferScheduler";
import { Batch } from "./utils/Batch";
/**
 * BlockBlobClient defines a set of operations applicable to block blobs.
 *
 * @export
 * @class BlockBlobClient
 * @extends {BlobClient}
 */
var BlockBlobClient = /** @class */ (function (_super) {
    tslib_1.__extends(BlockBlobClient, _super || null );
    function BlockBlobClient(urlOrConnectionString, credentialOrPipelineOrContainerName, blobNameOrOptions, options) {
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
        _this.blockBlobContext = new BlockBlob(_this.storageClientContext);
        return _this;
    }
    /**
     * Creates a new BlockBlobClient object identical to the source but with the
     * specified snapshot timestamp.
     * Provide "" will remove the snapshot and return a URL to the base blob.
     *
     * @param {string} snapshot The snapshot timestamp.
     * @returns {BlockBlobClient} A new BlockBlobClient object identical to the source but with the specified snapshot timestamp.
     * @memberof BlockBlobClient
     */
    BlockBlobClient.prototype.withSnapshot = function (snapshot) {
        return new BlockBlobClient(setURLParameter(this.url, URLConstants.Parameters.SNAPSHOT, snapshot.length === 0 ? undefined : snapshot), this.pipeline);
    };
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
    BlockBlobClient.prototype.upload = function (body, contentLength, options) {
        if (options === void 0) { options = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                options.accessConditions = options.accessConditions || {};
                ensureCpkIfSpecified(options.customerProvidedKey, this.isHttps);
                return [2 /*return*/, this.blockBlobContext.upload(body, contentLength, {
                        abortSignal: options.abortSignal,
                        blobHTTPHeaders: options.blobHTTPHeaders,
                        leaseAccessConditions: options.accessConditions.leaseAccessConditions,
                        metadata: options.metadata,
                        modifiedAccessConditions: options.accessConditions.modifiedAccessConditions,
                        onUploadProgress: options.progress,
                        cpkInfo: options.customerProvidedKey,
                        tier: toAccessTier(options.tier)
                    })];
            });
        });
    };
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
    BlockBlobClient.prototype.stageBlock = function (blockId, body, contentLength, options) {
        if (options === void 0) { options = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                ensureCpkIfSpecified(options.customerProvidedKey, this.isHttps);
                return [2 /*return*/, this.blockBlobContext.stageBlock(blockId, contentLength, body, {
                        abortSignal: options.abortSignal,
                        leaseAccessConditions: options.leaseAccessConditions,
                        onUploadProgress: options.progress,
                        transactionalContentMD5: options.transactionalContentMD5,
                        transactionalContentCrc64: options.transactionalContentCrc64,
                        cpkInfo: options.customerProvidedKey
                    })];
            });
        });
    };
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
    BlockBlobClient.prototype.stageBlockFromURL = function (blockId, sourceURL, offset, count, options) {
        if (offset === void 0) { offset = 0; }
        if (options === void 0) { options = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                ensureCpkIfSpecified(options.customerProvidedKey, this.isHttps);
                return [2 /*return*/, this.blockBlobContext.stageBlockFromURL(blockId, 0, sourceURL, {
                        abortSignal: options.abortSignal,
                        leaseAccessConditions: options.leaseAccessConditions,
                        sourceContentMD5: options.sourceContentMD5,
                        sourceContentCrc64: options.sourceContentCrc64,
                        sourceRange: offset === 0 && !count ? undefined : rangeToString({ offset: offset, count: count }),
                        cpkInfo: options.customerProvidedKey
                    })];
            });
        });
    };
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
    BlockBlobClient.prototype.commitBlockList = function (blocks, options) {
        if (options === void 0) { options = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                options.accessConditions = options.accessConditions || {};
                ensureCpkIfSpecified(options.customerProvidedKey, this.isHttps);
                return [2 /*return*/, this.blockBlobContext.commitBlockList({ latest: blocks }, {
                        abortSignal: options.abortSignal,
                        blobHTTPHeaders: options.blobHTTPHeaders,
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
    BlockBlobClient.prototype.getBlockList = function (listType, options) {
        if (options === void 0) { options = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var res;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.blockBlobContext.getBlockList(listType, {
                            abortSignal: options.abortSignal,
                            leaseAccessConditions: options.leaseAccessConditions
                        })];
                    case 1:
                        res = _a.sent();
                        if (!res.committedBlocks) {
                            res.committedBlocks = [];
                        }
                        if (!res.uncommittedBlocks) {
                            res.uncommittedBlocks = [];
                        }
                        return [2 /*return*/, res];
                }
            });
        });
    };
    // High level functions
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
    BlockBlobClient.prototype.uploadBrowserData = function (browserData, options) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var browserBlob;
            return tslib_1.__generator(this, function (_a) {
                browserBlob = new Blob([browserData]);
                return [2 /*return*/, this.UploadSeekableBlob(function (offset, size) {
                        return browserBlob.slice(offset, offset + size);
                    }, browserBlob.size, options)];
            });
        });
    };
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
    BlockBlobClient.prototype.UploadSeekableBlob = function (blobFactory, size, options) {
        if (options === void 0) { options = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var numBlocks, blockList, blockIDPrefix, transferProgress, batch, _loop_1, i;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!options.blockSize) {
                            options.blockSize = 0;
                        }
                        if (options.blockSize < 0 || options.blockSize > BLOCK_BLOB_MAX_STAGE_BLOCK_BYTES) {
                            throw new RangeError("blockSize option must be >= 0 and <= " + BLOCK_BLOB_MAX_STAGE_BLOCK_BYTES);
                        }
                        if (options.maxSingleShotSize !== 0 && !options.maxSingleShotSize) {
                            options.maxSingleShotSize = BLOCK_BLOB_MAX_UPLOAD_BLOB_BYTES;
                        }
                        if (options.maxSingleShotSize < 0 ||
                            options.maxSingleShotSize > BLOCK_BLOB_MAX_UPLOAD_BLOB_BYTES) {
                            throw new RangeError("maxSingleShotSize option must be >= 0 and <= " + BLOCK_BLOB_MAX_UPLOAD_BLOB_BYTES);
                        }
                        if (options.blockSize === 0) {
                            if (size > BLOCK_BLOB_MAX_STAGE_BLOCK_BYTES * BLOCK_BLOB_MAX_BLOCKS) {
                                throw new RangeError(size + " is too larger to upload to a block blob.");
                            }
                            if (size > options.maxSingleShotSize) {
                                options.blockSize = Math.ceil(size / BLOCK_BLOB_MAX_BLOCKS);
                                if (options.blockSize < DEFAULT_BLOB_DOWNLOAD_BLOCK_BYTES) {
                                    options.blockSize = DEFAULT_BLOB_DOWNLOAD_BLOCK_BYTES;
                                }
                            }
                        }
                        if (!options.blobHTTPHeaders) {
                            options.blobHTTPHeaders = {};
                        }
                        if (!options.blobAccessConditions) {
                            options.blobAccessConditions = {};
                        }
                        if (size <= options.maxSingleShotSize) {
                            return [2 /*return*/, this.upload(blobFactory(0, size), size, options)];
                        }
                        numBlocks = Math.floor((size - 1) / options.blockSize) + 1;
                        if (numBlocks > BLOCK_BLOB_MAX_BLOCKS) {
                            throw new RangeError("The buffer's size is too big or the BlockSize is too small;" +
                                ("the number of blocks must be <= " + BLOCK_BLOB_MAX_BLOCKS));
                        }
                        blockList = [];
                        blockIDPrefix = generateUuid();
                        transferProgress = 0;
                        batch = new Batch(options.parallelism);
                        _loop_1 = function (i) {
                            batch.addOperation(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var blockID, start, end, contentLength;
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            blockID = generateBlockID(blockIDPrefix, i);
                                            start = options.blockSize * i;
                                            end = i === numBlocks - 1 ? size : start + options.blockSize;
                                            contentLength = end - start;
                                            blockList.push(blockID);
                                            return [4 /*yield*/, this.stageBlock(blockID, blobFactory(start, contentLength), contentLength, {
                                                    abortSignal: options.abortSignal,
                                                    leaseAccessConditions: options.blobAccessConditions.leaseAccessConditions
                                                })];
                                        case 1:
                                            _a.sent();
                                            // Update progress after block is successfully uploaded to server, in case of block trying
                                            // TODO: Hook with convenience layer progress event in finer level
                                            transferProgress += contentLength;
                                            if (options.progress) {
                                                options.progress({
                                                    loadedBytes: transferProgress
                                                });
                                            }
                                            return [2 /*return*/];
                                    }
                                });
                            }); });
                        };
                        for (i = 0; i < numBlocks; i++) {
                            _loop_1(i);
                        }
                        return [4 /*yield*/, batch.do()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.commitBlockList(blockList, options)];
                }
            });
        });
    };
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
    BlockBlobClient.prototype.uploadFile = function (filePath, options) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var size;
            return tslib_1.__generator(this, function (_a) {
                size = fs.statSync(filePath).size;
                return [2 /*return*/, this.uploadResetableStream(function (offset, count) {
                        return fs.createReadStream(filePath, {
                            autoClose: true,
                            end: count ? offset + count - 1 : Infinity,
                            start: offset
                        });
                    }, size, options)];
            });
        });
    };
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
    BlockBlobClient.prototype.uploadStream = function (stream, bufferSize, maxBuffers, options) {
        if (options === void 0) { options = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var blockNum, blockIDPrefix, transferProgress, blockList, scheduler;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!options.blobHTTPHeaders) {
                            options.blobHTTPHeaders = {};
                        }
                        if (!options.accessConditions) {
                            options.accessConditions = {};
                        }
                        blockNum = 0;
                        blockIDPrefix = generateUuid();
                        transferProgress = 0;
                        blockList = [];
                        scheduler = new BufferScheduler(stream, bufferSize, maxBuffers, function (buffer) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            var blockID;
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        blockID = generateBlockID(blockIDPrefix, blockNum);
                                        blockList.push(blockID);
                                        blockNum++;
                                        return [4 /*yield*/, this.stageBlock(blockID, buffer, buffer.length, {
                                                leaseAccessConditions: options.accessConditions.leaseAccessConditions
                                            })];
                                    case 1:
                                        _a.sent();
                                        // Update progress after block is successfully uploaded to server, in case of block trying
                                        transferProgress += buffer.length;
                                        if (options.progress) {
                                            options.progress({ loadedBytes: transferProgress });
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        }); }, 
                        // Parallelism should set a smaller value than maxBuffers, which is helpful to
                        // reduce the possibility when a outgoing handler waits for stream data, in
                        // this situation, outgoing handlers are blocked.
                        // Outgoing queue shouldn't be empty.
                        Math.ceil((maxBuffers / 4) * 3));
                        return [4 /*yield*/, scheduler.do()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.commitBlockList(blockList, options)];
                }
            });
        });
    };
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
    BlockBlobClient.prototype.uploadResetableStream = function (streamFactory, size, options) {
        if (options === void 0) { options = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var numBlocks, blockList, blockIDPrefix, transferProgress, batch, _loop_2, i;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!options.blockSize) {
                            options.blockSize = 0;
                        }
                        if (options.blockSize < 0 || options.blockSize > BLOCK_BLOB_MAX_STAGE_BLOCK_BYTES) {
                            throw new RangeError("blockSize option must be >= 0 and <= " + BLOCK_BLOB_MAX_STAGE_BLOCK_BYTES);
                        }
                        if (options.maxSingleShotSize !== 0 && !options.maxSingleShotSize) {
                            options.maxSingleShotSize = BLOCK_BLOB_MAX_UPLOAD_BLOB_BYTES;
                        }
                        if (options.maxSingleShotSize < 0 ||
                            options.maxSingleShotSize > BLOCK_BLOB_MAX_UPLOAD_BLOB_BYTES) {
                            throw new RangeError("maxSingleShotSize option must be >= 0 and <= " + BLOCK_BLOB_MAX_UPLOAD_BLOB_BYTES);
                        }
                        if (options.blockSize === 0) {
                            if (size > BLOCK_BLOB_MAX_BLOCKS * BLOCK_BLOB_MAX_STAGE_BLOCK_BYTES) {
                                throw new RangeError(size + " is too larger to upload to a block blob.");
                            }
                            if (size > options.maxSingleShotSize) {
                                options.blockSize = Math.ceil(size / BLOCK_BLOB_MAX_BLOCKS);
                                if (options.blockSize < DEFAULT_BLOB_DOWNLOAD_BLOCK_BYTES) {
                                    options.blockSize = DEFAULT_BLOB_DOWNLOAD_BLOCK_BYTES;
                                }
                            }
                        }
                        if (!options.blobHTTPHeaders) {
                            options.blobHTTPHeaders = {};
                        }
                        if (!options.blobAccessConditions) {
                            options.blobAccessConditions = {};
                        }
                        if (size <= options.maxSingleShotSize) {
                            return [2 /*return*/, this.upload(function () { return streamFactory(0); }, size, options)];
                        }
                        numBlocks = Math.floor((size - 1) / options.blockSize) + 1;
                        if (numBlocks > BLOCK_BLOB_MAX_BLOCKS) {
                            throw new RangeError("The buffer's size is too big or the BlockSize is too small;" +
                                ("the number of blocks must be <= " + BLOCK_BLOB_MAX_BLOCKS));
                        }
                        blockList = [];
                        blockIDPrefix = generateUuid();
                        transferProgress = 0;
                        batch = new Batch(options.parallelism);
                        _loop_2 = function (i) {
                            batch.addOperation(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var blockID, start, end, contentLength;
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            blockID = generateBlockID(blockIDPrefix, i);
                                            start = options.blockSize * i;
                                            end = i === numBlocks - 1 ? size : start + options.blockSize;
                                            contentLength = end - start;
                                            blockList.push(blockID);
                                            return [4 /*yield*/, this.stageBlock(blockID, function () { return streamFactory(start, contentLength); }, contentLength, {
                                                    abortSignal: options.abortSignal,
                                                    leaseAccessConditions: options.blobAccessConditions.leaseAccessConditions
                                                })];
                                        case 1:
                                            _a.sent();
                                            // Update progress after block is successfully uploaded to server, in case of block trying
                                            transferProgress += contentLength;
                                            if (options.progress) {
                                                options.progress({ loadedBytes: transferProgress });
                                            }
                                            return [2 /*return*/];
                                    }
                                });
                            }); });
                        };
                        for (i = 0; i < numBlocks; i++) {
                            _loop_2(i);
                        }
                        return [4 /*yield*/, batch.do()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.commitBlockList(blockList, options)];
                }
            });
        });
    };
    return BlockBlobClient;
}(BlobClient));
export { BlockBlobClient };
//# sourceMappingURL=BlockBlobClient.js.map