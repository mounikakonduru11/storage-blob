// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import * as tslib_1 from "tslib";
import { isTokenCredential, isNode } from "@azure/core-http";
import { Container } from "./generated/src/operations";
import { newPipeline, Pipeline } from "./Pipeline";
import { ETagNone } from "./utils/constants";
import { appendToURLPath, truncatedISO8061Date, extractConnectionStringParts } from "./utils/utils.common";
import { AppendBlobClient, BlobClient, BlockBlobClient, PageBlobClient, StorageClient } from "./internal";
import { SharedKeyCredential } from "./credentials/SharedKeyCredential";
import { AnonymousCredential } from "./credentials/AnonymousCredential";
import { LeaseClient } from "./LeaseClient";
import "@azure/core-paging";
/**
 * A ContainerClient represents a URL to the Azure Storage container allowing you to manipulate its blobs.
 *
 * @export
 * @class ContainerClient
 */
var ContainerClient = /** @class */ (function (_super) {
    tslib_1.__extends(ContainerClient, _super);
    function ContainerClient(urlOrConnectionString, credentialOrPipelineOrContainerName, options) {
        var _this = this;
        var pipeline;
        if (credentialOrPipelineOrContainerName instanceof Pipeline) {
            pipeline = credentialOrPipelineOrContainerName;
        }
        else if ((isNode && credentialOrPipelineOrContainerName instanceof SharedKeyCredential) ||
            credentialOrPipelineOrContainerName instanceof AnonymousCredential ||
            isTokenCredential(credentialOrPipelineOrContainerName)) {
            pipeline = newPipeline(credentialOrPipelineOrContainerName, options);
        }
        else if (!credentialOrPipelineOrContainerName &&
            typeof credentialOrPipelineOrContainerName !== "string") {
            // The second parameter is undefined. Use anonymous credential.
            pipeline = newPipeline(new AnonymousCredential(), options);
        }
        else if (credentialOrPipelineOrContainerName &&
            typeof credentialOrPipelineOrContainerName === "string") {
            var containerName = credentialOrPipelineOrContainerName;
            var extractedCreds = extractConnectionStringParts(urlOrConnectionString);
            if (extractedCreds.kind === "AccountConnString") {
                if (isNode) {
                    var sharedKeyCredential = new SharedKeyCredential(extractedCreds.accountName, extractedCreds.accountKey);
                    urlOrConnectionString = extractedCreds.url + "/" + containerName + "/";
                    pipeline = newPipeline(sharedKeyCredential, options);
                }
                else {
                    throw new Error("Account connection string is only supported in Node.js environment");
                }
            }
            else if (extractedCreds.kind === "SASConnString") {
                urlOrConnectionString =
                    extractedCreds.url + "/" + containerName + "?" + extractedCreds.accountSas;
                pipeline = newPipeline(new AnonymousCredential(), options);
            }
            else {
                throw new Error("Connection string must be either an Account connection string or a SAS connection string");
            }
        }
        else {
            throw new Error("Expecting non-empty strings for containerName parameter");
        }
        _this = _super.call(this, urlOrConnectionString, pipeline) || this;
        _this.containerContext = new Container(_this.storageClientContext);
        return _this;
    }
    /**
     * Creates a new container under the specified account. If the container with
     * the same name already exists, the operation fails.
     * @see https://docs.microsoft.com/en-us/rest/api/storageservices/create-container
     *
     * @param {ContainerCreateOptions} [options] Options to Container Create operation.
     * @returns {Promise<Models.ContainerCreateResponse>}
     * @memberof ContainerClient
     */
    ContainerClient.prototype.create = function (options) {
        if (options === void 0) { options = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                // Spread operator in destructuring assignments,
                // this will filter out unwanted properties from the response object into result object
                return [2 /*return*/, this.containerContext.create(tslib_1.__assign({}, options))];
            });
        });
    };
    /**
     * Creates a BlobClient object.
     *
     * @param {string} blobName A blob name
     * @returns {BlobClient} A new BlobClient object for the given blob name.
     * @memberof BlobClient
     */
    ContainerClient.prototype.getBlobClient = function (blobName) {
        return new BlobClient(appendToURLPath(this.url, encodeURIComponent(blobName)), this.pipeline);
    };
    /**
     * Creates a AppendBlobClient object.
     *
     * @param {string} blobName An append blob name
     * @returns {AppendBlobClient}
     * @memberof ContainerClient
     */
    ContainerClient.prototype.getAppendBlobClient = function (blobName) {
        return new AppendBlobClient(appendToURLPath(this.url, encodeURIComponent(blobName)), this.pipeline);
    };
    /**
     * Creates a BlockBlobClient object.
     *
     * @param {string} blobName A block blob name
     * @returns {BlockBlobClient}
     * @memberof ContainerClient
     */
    ContainerClient.prototype.getBlockBlobClient = function (blobName) {
        return new BlockBlobClient(appendToURLPath(this.url, encodeURIComponent(blobName)), this.pipeline);
    };
    /**
     * Creates a PageBlobClient object.
     *
     * @param {string} blobName A page blob name
     * @returns {PageBlobClient}
     * @memberof ContainerClient
     */
    ContainerClient.prototype.getPageBlobClient = function (blobName) {
        return new PageBlobClient(appendToURLPath(this.url, encodeURIComponent(blobName)), this.pipeline);
    };
    /**
     * Returns all user-defined metadata and system properties for the specified
     * container. The data returned does not include the container's list of blobs.
     * @see https://docs.microsoft.com/en-us/rest/api/storageservices/get-container-properties
     *
     * @param {ContainersGetPropertiesOptions} [options] Options to Container Get Properties operation.
     * @returns {Promise<Models.ContainerGetPropertiesResponse>}
     * @memberof ContainerClient
     */
    ContainerClient.prototype.getProperties = function (options) {
        if (options === void 0) { options = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                if (!options.leaseAccessConditions) {
                    options.leaseAccessConditions = {};
                }
                return [2 /*return*/, this.containerContext.getProperties(tslib_1.__assign({ abortSignal: options.abortSignal }, options.leaseAccessConditions))];
            });
        });
    };
    /**
     * Marks the specified container for deletion. The container and any blobs
     * contained within it are later deleted during garbage collection.
     * @see https://docs.microsoft.com/en-us/rest/api/storageservices/delete-container
     *
     * @param {ContainerDeleteMethodOptions} [options] Options to Container Delete operation.
     * @returns {Promise<Models.ContainerDeleteResponse>}
     * @memberof ContainerClient
     */
    ContainerClient.prototype.delete = function (options) {
        if (options === void 0) { options = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                if (!options.containerAccessConditions) {
                    options.containerAccessConditions = {};
                }
                if (!options.containerAccessConditions.modifiedAccessConditions) {
                    options.containerAccessConditions.modifiedAccessConditions = {};
                }
                if (!options.containerAccessConditions.leaseAccessConditions) {
                    options.containerAccessConditions.leaseAccessConditions = {};
                }
                if ((options.containerAccessConditions.modifiedAccessConditions.ifMatch &&
                    options.containerAccessConditions.modifiedAccessConditions.ifMatch !== ETagNone) ||
                    (options.containerAccessConditions.modifiedAccessConditions.ifNoneMatch &&
                        options.containerAccessConditions.modifiedAccessConditions.ifNoneMatch !== ETagNone)) {
                    throw new RangeError("the IfMatch and IfNoneMatch access conditions must have their default\
        values because they are ignored by the service");
                }
                return [2 /*return*/, this.containerContext.deleteMethod({
                        abortSignal: options.abortSignal,
                        leaseAccessConditions: options.containerAccessConditions.leaseAccessConditions,
                        modifiedAccessConditions: options.containerAccessConditions.modifiedAccessConditions
                    })];
            });
        });
    };
    /**
     * Sets one or more user-defined name-value pairs for the specified container.
     *
     * If no option provided, or no metadata defined in the parameter, the container
     * metadata will be removed.
     *
     * @see https://docs.microsoft.com/en-us/rest/api/storageservices/set-container-metadata
     *
     * @param {Metadata} [metadata] Replace existing metadata with this value.
     *                               If no value provided the existing metadata will be removed.
     * @param {ContainerSetMetadataOptions} [options] Options to Container Set Metadata operation.
     * @returns {Promise<Models.ContainerSetMetadataResponse>}
     * @memberof ContainerClient
     */
    ContainerClient.prototype.setMetadata = function (metadata, options) {
        if (options === void 0) { options = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                if (!options.containerAccessConditions) {
                    options.containerAccessConditions = {};
                }
                if (!options.containerAccessConditions.modifiedAccessConditions) {
                    options.containerAccessConditions.modifiedAccessConditions = {};
                }
                if (!options.containerAccessConditions.leaseAccessConditions) {
                    options.containerAccessConditions.leaseAccessConditions = {};
                }
                if (options.containerAccessConditions.modifiedAccessConditions.ifUnmodifiedSince ||
                    (options.containerAccessConditions.modifiedAccessConditions.ifMatch &&
                        options.containerAccessConditions.modifiedAccessConditions.ifMatch !== ETagNone) ||
                    (options.containerAccessConditions.modifiedAccessConditions.ifNoneMatch &&
                        options.containerAccessConditions.modifiedAccessConditions.ifNoneMatch !== ETagNone)) {
                    throw new RangeError("the IfUnmodifiedSince, IfMatch, and IfNoneMatch must have their default values\
        because they are ignored by the blob service");
                }
                return [2 /*return*/, this.containerContext.setMetadata({
                        abortSignal: options.abortSignal,
                        leaseAccessConditions: options.containerAccessConditions.leaseAccessConditions,
                        metadata: metadata,
                        modifiedAccessConditions: options.containerAccessConditions.modifiedAccessConditions
                    })];
            });
        });
    };
    /**
     * Gets the permissions for the specified container. The permissions indicate
     * whether container data may be accessed publicly.
     *
     * WARNING: JavaScript Date will potential lost precision when parsing start and expiry string.
     * For example, new Date("2018-12-31T03:44:23.8827891Z").toISOString() will get "2018-12-31T03:44:23.882Z".
     *
     * @see https://docs.microsoft.com/en-us/rest/api/storageservices/get-container-acl
     *
     * @param {ContainerGetAccessPolicyOptions} [options] Options to Container Get Access Policy operation.
     * @returns {Promise<ContainerGetAccessPolicyResponse>}
     * @memberof ContainerClient
     */
    ContainerClient.prototype.getAccessPolicy = function (options) {
        if (options === void 0) { options = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var response, res, _i, response_1, identifier, accessPolicy;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!options.leaseAccessConditions) {
                            options.leaseAccessConditions = {};
                        }
                        return [4 /*yield*/, this.containerContext.getAccessPolicy({
                                abortSignal: options.abortSignal,
                                leaseAccessConditions: options.leaseAccessConditions
                            })];
                    case 1:
                        response = _a.sent();
                        res = {
                            _response: response._response,
                            blobPublicAccess: response.blobPublicAccess,
                            date: response.date,
                            eTag: response.eTag,
                            errorCode: response.errorCode,
                            lastModified: response.lastModified,
                            requestId: response.requestId,
                            clientRequestId: response.clientRequestId,
                            signedIdentifiers: [],
                            version: response.version
                        };
                        for (_i = 0, response_1 = response; _i < response_1.length; _i++) {
                            identifier = response_1[_i];
                            accessPolicy = {
                                permission: identifier.accessPolicy.permission
                            };
                            if (identifier.accessPolicy.expiry) {
                                accessPolicy.expiry = new Date(identifier.accessPolicy.expiry);
                            }
                            if (identifier.accessPolicy.start) {
                                accessPolicy.start = new Date(identifier.accessPolicy.start);
                            }
                            res.signedIdentifiers.push({
                                accessPolicy: accessPolicy,
                                id: identifier.id
                            });
                        }
                        return [2 /*return*/, res];
                }
            });
        });
    };
    /**
     * Sets the permissions for the specified container. The permissions indicate
     * whether blobs in a container may be accessed publicly.
     *
     * When you set permissions for a container, the existing permissions are replaced.
     * If no access or containerAcl provided, the existing container ACL will be
     * removed.
     * @see https://docs.microsoft.com/en-us/rest/api/storageservices/set-container-acl
     *
     * @param {Models.PublicAccessType} [access] The level of public access to data in the container.
     * @param {SignedIdentifier[]} [containerAcl] Array of elements each having a unique Id and details of the access policy.
     * @param {ContainerSetAccessPolicyOptions} [options] Options to Container Set Access Policy operation.
     * @returns {Promise<Models.ContainerSetAccessPolicyResponse>}
     * @memberof ContainerClient
     */
    ContainerClient.prototype.setAccessPolicy = function (access, containerAcl, options) {
        if (options === void 0) { options = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var acl, _i, _a, identifier;
            return tslib_1.__generator(this, function (_b) {
                options.containerAccessConditions = options.containerAccessConditions || {};
                acl = [];
                for (_i = 0, _a = containerAcl || []; _i < _a.length; _i++) {
                    identifier = _a[_i];
                    acl.push({
                        accessPolicy: {
                            expiry: identifier.accessPolicy.expiry
                                ? truncatedISO8061Date(identifier.accessPolicy.expiry)
                                : "",
                            permission: identifier.accessPolicy.permission,
                            start: identifier.accessPolicy.start
                                ? truncatedISO8061Date(identifier.accessPolicy.start)
                                : ""
                        },
                        id: identifier.id
                    });
                }
                return [2 /*return*/, this.containerContext.setAccessPolicy({
                        abortSignal: options.abortSignal,
                        access: access,
                        containerAcl: acl,
                        leaseAccessConditions: options.containerAccessConditions.leaseAccessConditions,
                        modifiedAccessConditions: options.containerAccessConditions.modifiedAccessConditions
                    })];
            });
        });
    };
    /**
     * Get a LeaseClient that manages leases on the container.
     *
     * @param {string} [proposeLeaseId] Initial proposed lease Id.
     * @returns {LeaseClient} A new LeaseClient object for managing leases on the container.
     * @memberof ContainerClient
     */
    ContainerClient.prototype.getLeaseClient = function (proposeLeaseId) {
        return new LeaseClient(this, proposeLeaseId);
    };
    /**
     * Creates a new block blob, or updates the content of an existing block blob.
     *
     * Updating an existing block blob overwrites any existing metadata on the blob.
     * Partial updates are not supported; the content of the existing blob is
     * overwritten with the new content. To perform a partial update of a block blob's,
     * use stageBlock and commitBlockList.
     *
     * This is a non-parallel uploading method, please use BlockBlobClient.uploadFile(),
     * BlockBlobClient.uploadStream() or BlockBlobClient.uploadBrowserData() for better performance
     * with concurrency uploading.
     *
     * @see https://docs.microsoft.com/rest/api/storageservices/put-blob
     *
     * @param {string} blobName Name of the block blob to create or update.
     * @param {HttpRequestBody} body Blob, string, ArrayBuffer, ArrayBufferView or a function
     *                               which returns a new Readable stream whose offset is from data source beginning.
     * @param {number} contentLength Length of body in bytes. Use Buffer.byteLength() to calculate body length for a
     *                               string including non non-Base64/Hex-encoded characters.
     * @param {BlockBlobUploadOptions} [options] Options to configure the Block Blob Upload operation.
     * @returns {Promise<{ blockBlobClient: BlockBlobClient; response: Models.BlockBlobUploadResponse }>} Block Blob upload response data and the corresponding BlockBlobClient instance.
     * @memberof ContainerClient
     */
    ContainerClient.prototype.uploadBlockBlob = function (blobName, body, contentLength, options) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var blockBlobClient, response;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        blockBlobClient = this.getBlockBlobClient(blobName);
                        return [4 /*yield*/, blockBlobClient.upload(body, contentLength, options)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, {
                                blockBlobClient: blockBlobClient,
                                response: response
                            }];
                }
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
     * @param {string} blobName
     * @param {BlobDeleteOptions} [options] Options to Blob Delete operation.
     * @returns {Promise<Models.BlobDeleteResponse>} Block blob deletion response data.
     * @memberof ContainerClient
     */
    ContainerClient.prototype.deleteBlob = function (blobName, options) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var blobClient;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        blobClient = this.getBlobClient(blobName);
                        return [4 /*yield*/, blobClient.delete(options)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * listBlobFlatSegment returns a single segment of blobs starting from the
     * specified Marker. Use an empty Marker to start enumeration from the beginning.
     * After getting a segment, process it, and then call ListBlobsFlatSegment again
     * (passing the the previously-returned Marker) to get the next segment.
     * @see https://docs.microsoft.com/rest/api/storageservices/list-blobs
     *
     * @param {string} [marker] A string value that identifies the portion of the list to be returned with the next list operation.
     * @param {ContainerListBlobsSegmentOptions} [options] Options to Container List Blob Flat Segment operation.
     * @returns {Promise<Models.ContainerListBlobFlatSegmentResponse>}
     * @memberof ContainerClient
     */
    ContainerClient.prototype.listBlobFlatSegment = function (marker, options) {
        if (options === void 0) { options = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.containerContext.listBlobFlatSegment(tslib_1.__assign({ marker: marker }, options))];
            });
        });
    };
    /**
     * listBlobHierarchySegment returns a single segment of blobs starting from
     * the specified Marker. Use an empty Marker to start enumeration from the
     * beginning. After getting a segment, process it, and then call ListBlobsHierarchicalSegment
     * again (passing the the previously-returned Marker) to get the next segment.
     * @see https://docs.microsoft.com/rest/api/storageservices/list-blobs
     *
     * @param {string} delimiter The charactor or string used to define the virtual hierarchy
     * @param {string} [marker] A string value that identifies the portion of the list to be returned with the next list operation.
     * @param {ContainerListBlobsSegmentOptions} [options] Options to Container List Blob Hierarchy Segment operation.
     * @returns {Promise<Models.ContainerListBlobHierarchySegmentResponse>}
     * @memberof ContainerClient
     */
    ContainerClient.prototype.listBlobHierarchySegment = function (delimiter, marker, options) {
        if (options === void 0) { options = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.containerContext.listBlobHierarchySegment(delimiter, tslib_1.__assign({ marker: marker }, options))];
            });
        });
    };
    /**
     * Returns an AsyncIterableIterator for ContainerListBlobFlatSegmentResponse
     *
     * @private
     * @param {string} [marker] A string value that identifies the portion of
     *                          the list of blobs to be returned with the next listing operation. The
     *                          operation returns the NextMarker value within the response body if the
     *                          listing operation did not return all blobs remaining to be listed
     *                          with the current page. The NextMarker value can be used as the value for
     *                          the marker parameter in a subsequent call to request the next page of list
     *                          items. The marker value is opaque to the client.
     * @param {ContainerListBlobsSegmentOptions} [options] Options to list blobs operation.
     * @returns {AsyncIterableIterator<Models.ContainerListBlobFlatSegmentResponse>}
     * @memberof ContainerClient
     */
    ContainerClient.prototype.listSegments = function (marker, options) {
        if (options === void 0) { options = {}; }
        return tslib_1.__asyncGenerator(this, arguments, function listSegments_1() {
            var listBlobsFlatSegmentResponse;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, tslib_1.__await(this.listBlobFlatSegment(marker, options))];
                    case 1:
                        listBlobsFlatSegmentResponse = _a.sent();
                        marker = listBlobsFlatSegmentResponse.nextMarker;
                        return [4 /*yield*/, tslib_1.__await(listBlobsFlatSegmentResponse)];
                    case 2: return [4 /*yield*/, tslib_1.__await.apply(void 0, [_a.sent()])];
                    case 3: return [4 /*yield*/, _a.sent()];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        if (marker) return [3 /*break*/, 0];
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Returns an AsyncIterableIterator for Blob Items
     *
     * @private
     * @param {ContainerListBlobsSegmentOptions} [options] Options to list blobs operation.
     * @returns {AsyncIterableIterator<Models.BlobItem>}
     * @memberof ContainerClient
     */
    ContainerClient.prototype.listItems = function (options) {
        if (options === void 0) { options = {}; }
        return tslib_1.__asyncGenerator(this, arguments, function listItems_1() {
            var marker, _a, _b, listBlobsFlatSegmentResponse, e_1_1;
            var e_1, _c;
            return tslib_1.__generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 7, 8, 13]);
                        _a = tslib_1.__asyncValues(this.listSegments(marker, options));
                        _d.label = 1;
                    case 1: return [4 /*yield*/, tslib_1.__await(_a.next())];
                    case 2:
                        if (!(_b = _d.sent(), !_b.done)) return [3 /*break*/, 6];
                        listBlobsFlatSegmentResponse = _b.value;
                        return [5 /*yield**/, tslib_1.__values(tslib_1.__asyncDelegator(tslib_1.__asyncValues(listBlobsFlatSegmentResponse.segment.blobItems)))];
                    case 3: return [4 /*yield*/, tslib_1.__await.apply(void 0, [_d.sent()])];
                    case 4:
                        _d.sent();
                        _d.label = 5;
                    case 5: return [3 /*break*/, 1];
                    case 6: return [3 /*break*/, 13];
                    case 7:
                        e_1_1 = _d.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 13];
                    case 8:
                        _d.trys.push([8, , 11, 12]);
                        if (!(_b && !_b.done && (_c = _a.return))) return [3 /*break*/, 10];
                        return [4 /*yield*/, tslib_1.__await(_c.call(_a))];
                    case 9:
                        _d.sent();
                        _d.label = 10;
                    case 10: return [3 /*break*/, 12];
                    case 11:
                        if (e_1) throw e_1.error;
                        return [7 /*endfinally*/];
                    case 12: return [7 /*endfinally*/];
                    case 13: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Returns an async iterable iterator to list all the blobs
     * under the specified account.
     *
     * .byPage() returns an async iterable iterator to list the blobs in pages.
     *
     * @example
     *   let i = 1;
     *   for await (const blob of containerClient.listBlobsFlat()) {
     *     console.log(`Blob ${i++}: ${blob.name}`);
     *   }
     *
     * @example
     *   // Generator syntax .next()
     *   let i = 1;
     *   iter = containerClient.listBlobsFlat();
     *   let blobItem = await iter.next();
     *   while (!blobItem.done) {
     *     console.log(`Blob ${i++}: ${blobItem.value.name}`);
     *     blobItem = await iter.next();
     *   }
     *
     * @example
     *   // Example for .byPage()
     *   // passing optional maxPageSize in the page settings
     *   let i = 1;
     *   for await (const response of containerClient.listBlobsFlat().byPage({ maxPageSize: 20 })) {
     *     for (const blob of response.segment.blobItems) {
     *       console.log(`Blob ${i++}: ${blob.name}`);
     *     }
     *   }
     *
     * @example
     *   // Passing marker as an argument (similar to the previous example)
     *   let i = 1;
     *   let iterator = containerClient.listBlobsFlat().byPage({ maxPageSize: 2 });
     *   let response = (await iterator.next()).value;
     *   // Prints 2 blob names
     *   for (const blob of response.segment.blobItems) {
     *     console.log(`Blob ${i++}: ${blob.name}`);
     *    }
     *   // Gets next marker
     *   let marker = response.nextMarker;
     *    // Passing next marker as continuationToken
     *   iterator = containerClient.listBlobsFlat().byPage({ continuationToken: marker, maxPageSize: 10 });
     *   response = (await iterator.next()).value;
     *   // Prints 10 blob names
     *   for (const blob of response.segment.blobItems) {
     *     console.log(`Blob ${i++}: ${blob.name}`);
     *   }
     *
     * @param {ContainerListBlobsOptions} [options={}] Options to list blobs.
     * @returns {PagedAsyncIterableIterator<Models.BlobItem, Models.ContainerListBlobFlatSegmentResponse>} An asyncIterableIterator that supports paging.
     * @memberof ContainerClient
     */
    ContainerClient.prototype.listBlobsFlat = function (options) {
        var _a;
        var _this = this;
        if (options === void 0) { options = {}; }
        // AsyncIterableIterator to iterate over blobs
        var iter = this.listItems(options);
        return _a = {
                /**
                 * @member {Promise} [next] The next method, part of the iteration protocol
                 */
                next: function () {
                    return iter.next();
                }
            },
            /**
             * @member {Symbol} [asyncIterator] The connection to the async iterator, part of the iteration protocol
             */
            _a[Symbol.asyncIterator] = function () {
                return this;
            },
            /**
             * @member {Function} [byPage] Return an AsyncIterableIterator that works a page at a time
             */
            _a.byPage = function (settings) {
                if (settings === void 0) { settings = {}; }
                return _this.listSegments(settings.continuationToken, tslib_1.__assign({ maxresults: settings.maxPageSize }, options));
            },
            _a;
    };
    /**
     * Returns an AsyncIterableIterator for ContainerListBlobHierarchySegmentResponse
     *
     * @private
     * @param {string} [marker] A string value that identifies the portion of
     *                          the list of blobs to be returned with the next listing operation. The
     *                          operation returns the NextMarker value within the response body if the
     *                          listing operation did not return all blobs remaining to be listed
     *                          with the current page. The NextMarker value can be used as the value for
     *                          the marker parameter in a subsequent call to request the next page of list
     *                          items. The marker value is opaque to the client.
     * @param {ContainerListBlobsSegmentOptions} [options] Options to list blobs operation.
     * @returns {AsyncIterableIterator<Models.ContainerListBlobHierarchySegmentResponse>}
     * @memberof ContainerClient
     */ ContainerClient.prototype.listHierarchySegments = function (delimiter, marker, options) {
        if (options === void 0) { options = {}; }
        return tslib_1.__asyncGenerator(this, arguments, function listHierarchySegments_1() {
            var listBlobsHierarchySegmentResponse;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, tslib_1.__await(this.listBlobHierarchySegment(delimiter, marker, options))];
                    case 1:
                        listBlobsHierarchySegmentResponse = _a.sent();
                        marker = listBlobsHierarchySegmentResponse.nextMarker;
                        return [4 /*yield*/, tslib_1.__await(listBlobsHierarchySegmentResponse)];
                    case 2: return [4 /*yield*/, tslib_1.__await.apply(void 0, [_a.sent()])];
                    case 3: return [4 /*yield*/, _a.sent()];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        if (marker) return [3 /*break*/, 0];
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Returns an AsyncIterableIterator for BlobPrefixes and BlobItems
     *
     * @private
     * @param {ContainerListBlobsSegmentOptions} [options] Options to list blobs operation.
     * @returns {AsyncIterableIterator<{ kind: "prefix" } & Models.BlobPrefix | { kind: "blob" } & Models.BlobItem>}
     * @memberof ContainerClient
     */
    ContainerClient.prototype.listItemsByHierarchy = function (delimiter, options) {
        if (options === void 0) { options = {}; }
        return tslib_1.__asyncGenerator(this, arguments, function listItemsByHierarchy_1() {
            var marker, _a, _b, listBlobsHierarchySegmentResponse, segment, _i, _c, prefix, _d, _e, blob, e_2_1;
            var e_2, _f;
            return tslib_1.__generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        _g.trys.push([0, 14, 15, 20]);
                        _a = tslib_1.__asyncValues(this.listHierarchySegments(delimiter, marker, options));
                        _g.label = 1;
                    case 1: return [4 /*yield*/, tslib_1.__await(_a.next())];
                    case 2:
                        if (!(_b = _g.sent(), !_b.done)) return [3 /*break*/, 13];
                        listBlobsHierarchySegmentResponse = _b.value;
                        segment = listBlobsHierarchySegmentResponse.segment;
                        if (!segment.blobPrefixes) return [3 /*break*/, 7];
                        _i = 0, _c = segment.blobPrefixes;
                        _g.label = 3;
                    case 3:
                        if (!(_i < _c.length)) return [3 /*break*/, 7];
                        prefix = _c[_i];
                        return [4 /*yield*/, tslib_1.__await(tslib_1.__assign({ kind: "prefix" }, prefix))];
                    case 4: return [4 /*yield*/, _g.sent()];
                    case 5:
                        _g.sent();
                        _g.label = 6;
                    case 6:
                        _i++;
                        return [3 /*break*/, 3];
                    case 7:
                        _d = 0, _e = segment.blobItems;
                        _g.label = 8;
                    case 8:
                        if (!(_d < _e.length)) return [3 /*break*/, 12];
                        blob = _e[_d];
                        return [4 /*yield*/, tslib_1.__await(tslib_1.__assign({ kind: "blob" }, blob))];
                    case 9: return [4 /*yield*/, _g.sent()];
                    case 10:
                        _g.sent();
                        _g.label = 11;
                    case 11:
                        _d++;
                        return [3 /*break*/, 8];
                    case 12: return [3 /*break*/, 1];
                    case 13: return [3 /*break*/, 20];
                    case 14:
                        e_2_1 = _g.sent();
                        e_2 = { error: e_2_1 };
                        return [3 /*break*/, 20];
                    case 15:
                        _g.trys.push([15, , 18, 19]);
                        if (!(_b && !_b.done && (_f = _a.return))) return [3 /*break*/, 17];
                        return [4 /*yield*/, tslib_1.__await(_f.call(_a))];
                    case 16:
                        _g.sent();
                        _g.label = 17;
                    case 17: return [3 /*break*/, 19];
                    case 18:
                        if (e_2) throw e_2.error;
                        return [7 /*endfinally*/];
                    case 19: return [7 /*endfinally*/];
                    case 20: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Returns an async iterable iterator to list all the blobs by hierarchy.
     * under the specified account.
     *
     * .byPage() returns an async iterable iterator to list the blobs by hierarchy in pages.
     *
     * @example
     *   for await (const item of containerClient.listBlobsByHierarchy("/")) {
     *     if (item.kind === "prefix") {
     *       console.log(`\tBlobPrefix: ${item.name}`);
     *     } else {
     *       console.log(`\tBlobItem: name - ${item.name}, last modified - ${item.properties.lastModified}`);
     *     }
     *   }
     *
     * @example
     * // Generator syntax .next() and passing a prefix
     * let iter = await containerClient.listBlobsByHierarchy("/", { prefix: "prefix1/" });
     * let entity = await iter.next();
     * while (!entity.done) {
     *   let item = entity.value;
     *   if (item.kind === "prefix") {
     *     console.log(`\tBlobPrefix: ${item.name}`);
     *   } else {
     *     console.log(`\tBlobItem: name - ${item.name}, last modified - ${item.properties.lastModified}`);
     *   }
     *   entity = await iter.next();
     * }
     *
     * @example
     *   // byPage()
     *   console.log("Listing blobs by hierarchy by page");
     *   for await (const response of containerClient.listBlobsByHierarchy("/").byPage()) {
     *     const segment = response.segment;
     *     if (segment.blobPrefixes) {
     *       for (const prefix of segment.blobPrefixes) {
     *         console.log(`\tBlobPrefix: ${prefix.name}`);
     *       }
     *     }
     *     for (const blob of response.segment.blobItems) {
     *       console.log(`\tBlobItem: name - ${blob.name}, last modified - ${blob.properties.lastModified}`);
     *     }
     *   }
     *
     * @example
     *   // 4. byPage() and passing a prefix and max page size
     *   console.log("Listing blobs by hierarchy by page, specifying a prefix and a max page size");
     *   let i = 1;
     *   for await (const response of containerClient.listBlobsByHierarchy("/", { prefix: "prefix2/sub1/"}).byPage({ maxPageSize: 2 })) {
     *     console.log(`Page ${i++}`);
     *     const segment = response.segment;
     *     if (segment.blobPrefixes) {
     *       for (const prefix of segment.blobPrefixes) {
     *         console.log(`\tBlobPrefix: ${prefix.name}`);
     *       }
     *     }
     *     for (const blob of response.segment.blobItems) {
     *       console.log(`\tBlobItem: name - ${blob.name}, last modified - ${blob.properties.lastModified}`);
     *     }
     *   }
     *
     * @param {string} delimiter The charactor or string used to define the virtual hierarchy
     * @param {ContainerListBlobsOptions} [options={}] Options to list blobs operation.
     * @returns {(PagedAsyncIterableIterator<
     *   { kind: "prefix" } & Models.BlobPrefix | { kind: "blob" } & Models.BlobItem,
     *     Models.ContainerListBlobHierarchySegmentResponse
     *   >)}
     * @memberof ContainerClient
     */
    ContainerClient.prototype.listBlobsByHierarchy = function (delimiter, options) {
        var _a;
        var _this = this;
        if (options === void 0) { options = {}; }
        // AsyncIterableIterator to iterate over blob prefixes and blobs
        var iter = this.listItemsByHierarchy(delimiter, options);
        return _a = {
                /**
                 * @member {Promise} [next] The next method, part of the iteration protocol
                 */
                next: function () {
                    return tslib_1.__awaiter(this, void 0, void 0, function () {
                        return tslib_1.__generator(this, function (_a) {
                            return [2 /*return*/, iter.next()];
                        });
                    });
                }
            },
            /**
             * @member {Symbol} [asyncIterator] The connection to the async iterator, part of the iteration protocol
             */
            _a[Symbol.asyncIterator] = function () {
                return this;
            },
            /**
             * @member {Function} [byPage] Return an AsyncIterableIterator that works a page at a time
             */
            _a.byPage = function (settings) {
                if (settings === void 0) { settings = {}; }
                return _this.listHierarchySegments(delimiter, settings.continuationToken, tslib_1.__assign({ maxresults: settings.maxPageSize }, options));
            },
            _a;
    };
    return ContainerClient;
}(StorageClient));
export { ContainerClient };
//# sourceMappingURL=ContainerClient.js.map