import * as tslib_1 from "tslib";
import { isTokenCredential, isNode } from "@azure/core-http";
import { BatchResponseParser } from "./BatchResponseParser";
import { utf8ByteLength } from "./BatchUtils";
import { Service } from "./generated/src/operations";
import { newPipeline, Pipeline } from "./Pipeline";
import { ContainerClient } from "./ContainerClient";
import { appendToURLPath, extractConnectionStringParts } from "./utils/utils.common";
import { SharedKeyCredential } from "./credentials/SharedKeyCredential";
import { AnonymousCredential } from "./credentials/AnonymousCredential";
import { StorageClient } from "./internal";
import "@azure/core-paging";
import { truncatedISO8061Date } from "./utils/utils.common";
/**
 * A BlobServiceClient represents a Client to the Azure Storage Blob service allowing you
 * to manipulate blob containers.
 *
 * @export
 * @class BlobServiceClient
 */
var BlobServiceClient = /** @class */ (function (_super) {
    tslib_1.__extends(BlobServiceClient, _super);
    function BlobServiceClient(url, credentialOrPipeline, options) {
        var _this = this;
        var pipeline;
        if (credentialOrPipeline instanceof Pipeline) {
            pipeline = credentialOrPipeline;
        }
        else if ((isNode && credentialOrPipeline instanceof SharedKeyCredential) ||
            credentialOrPipeline instanceof AnonymousCredential ||
            isTokenCredential(credentialOrPipeline)) {
            pipeline = newPipeline(credentialOrPipeline, options);
        }
        else {
            // The second parameter is undefined. Use anonymous credential
            pipeline = newPipeline(new AnonymousCredential(), options);
        }
        _this = _super.call(this, url, pipeline) || this;
        _this.serviceContext = new Service(_this.storageClientContext);
        return _this;
    }
    /**
     *
     * Creates an instance of BlobServiceClient from connection string.
     *
     * @param {string} connectionString Account connection string or a SAS connection string of an Azure storage account.
     *                                  [ Note - Account connection string can only be used in NODE.JS runtime. ]
     *                                  Account connection string example -
     *                                  `DefaultEndpointsProtocol=https;AccountName=myaccount;AccountKey=accountKey;EndpointSuffix=core.windows.net`
     *                                  SAS connection string example -
     *                                  `BlobEndpoint=https://myaccount.blob.core.windows.net/;QueueEndpoint=https://myaccount.queue.core.windows.net/;FileEndpoint=https://myaccount.file.core.windows.net/;TableEndpoint=https://myaccount.table.core.windows.net/;SharedAccessSignature=sasString`
     * @param {NewPipelineOptions} [options] Optional. Options to configure the HTTP pipeline.
     * @memberof BlobServiceClient
     */
    BlobServiceClient.fromConnectionString = function (connectionString, options) {
        var extractedCreds = extractConnectionStringParts(connectionString);
        if (extractedCreds.kind === "AccountConnString") {
            if (isNode) {
                var sharedKeyCredential = new SharedKeyCredential(extractedCreds.accountName, extractedCreds.accountKey);
                var pipeline = newPipeline(sharedKeyCredential, options);
                return new BlobServiceClient(extractedCreds.url, pipeline);
            }
            else {
                throw new Error("Account connection string is only supported in Node.js environment");
            }
        }
        else if (extractedCreds.kind === "SASConnString") {
            var pipeline = newPipeline(new AnonymousCredential(), options);
            return new BlobServiceClient(extractedCreds.url + "?" + extractedCreds.accountSas, pipeline);
        }
        else {
            throw new Error("Connection string must be either an Account connection string or a SAS connection string");
        }
    };
    /**
     * Creates a ContainerClient object
     *
     * @param containerName A container name
     * @returns {ContainerClient} A new ContainerClient object for the given container name.
     * @memberof BlobServiceClient
     */
    BlobServiceClient.prototype.getContainerClient = function (containerName) {
        return new ContainerClient(appendToURLPath(this.url, encodeURIComponent(containerName)), this.pipeline);
    };
    /**
     * Create a Blob container.
     *
     * @param {string} containerName Name of the container to create.
     * @param {ContainerCreateOptions} [options] Options to configure Container Create operation.
     * @returns {Promise<{ containerClient: ContainerClient; containerCreateResponse: Models.ContainerCreateResponse }>} Container creation response and the corresponding container client.
     * @memberof BlobServiceClient
     */
    BlobServiceClient.prototype.createContainer = function (containerName, options) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var containerClient, containerCreateResponse;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        containerClient = this.getContainerClient(containerName);
                        return [4 /*yield*/, containerClient.create(options)];
                    case 1:
                        containerCreateResponse = _a.sent();
                        return [2 /*return*/, {
                                containerClient: containerClient,
                                containerCreateResponse: containerCreateResponse
                            }];
                }
            });
        });
    };
    /**
     * Deletes a Blob container.
     *
     * @param {string} containerName Name of the container to delete.
     * @param {ContainerDeleteMethodOptions} [options] Options to configure Container Delete operation.
     * @returns {Promise<Models.ContainerDeleteResponse>} Container deletion response.
     * @memberof BlobServiceClient
     */
    BlobServiceClient.prototype.deleteContainer = function (containerName, options) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var containerClient;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        containerClient = this.getContainerClient(containerName);
                        return [4 /*yield*/, containerClient.delete(options)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Gets the properties of a storage account’s Blob service, including properties
     * for Storage Analytics and CORS (Cross-Origin Resource Sharing) rules.
     * @see https://docs.microsoft.com/en-us/rest/api/storageservices/get-blob-service-properties}
     *
     * @param {ServiceGetPropertiesOptions} [options] Options to the Service Get Properties operation.
     * @returns {Promise<Models.ServiceGetPropertiesResponse>} Response data for the Service Get Properties operation.
     * @memberof BlobServiceClient
     */
    BlobServiceClient.prototype.getProperties = function (options) {
        if (options === void 0) { options = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.serviceContext.getProperties({
                        abortSignal: options.abortSignal
                    })];
            });
        });
    };
    /**
     * Sets properties for a storage account’s Blob service endpoint, including properties
     * for Storage Analytics, CORS (Cross-Origin Resource Sharing) rules and soft delete settings.
     * @see https://docs.microsoft.com/en-us/rest/api/storageservices/set-blob-service-properties}
     *
     * @param {Models.StorageServiceProperties} properties
     * @param {ServiceSetPropertiesOptions} [options] Options to the Service Set Properties operation.
     * @returns {Promise<Models.ServiceSetPropertiesResponse>} Response data for the Service Set Properties operation.
     * @memberof BlobServiceClient
     */
    BlobServiceClient.prototype.setProperties = function (properties, options) {
        if (options === void 0) { options = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.serviceContext.setProperties(properties, {
                        abortSignal: options.abortSignal
                    })];
            });
        });
    };
    /**
     * Retrieves statistics related to replication for the Blob service. It is only
     * available on the secondary location endpoint when read-access geo-redundant
     * replication is enabled for the storage account.
     * @see https://docs.microsoft.com/en-us/rest/api/storageservices/get-blob-service-stats}
     *
     * @param {ServiceGetStatisticsOptions} [options] Options to the Service Get Statistics operation.
     * @returns {Promise<Models.ServiceGetStatisticsResponse>} Response data for the Service Get Statistics operation.
     * @memberof BlobServiceClient
     */
    BlobServiceClient.prototype.getStatistics = function (options) {
        if (options === void 0) { options = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.serviceContext.getStatistics({
                        abortSignal: options.abortSignal
                    })];
            });
        });
    };
    /**
     * The Get Account Information operation returns the sku name and account kind
     * for the specified account.
     * The Get Account Information operation is available on service versions beginning
     * with version 2018-03-28.
     * @see https://docs.microsoft.com/en-us/rest/api/storageservices/get-account-information
     *
     * @param {ServiceGetAccountInfoOptions} [options] Options to the Service Get Account Info operation.
     * @returns {Promise<Models.ServiceGetAccountInfoResponse>} Response data for the Service Get Account Info operation.
     * @memberof BlobServiceClient
     */
    BlobServiceClient.prototype.getAccountInfo = function (options) {
        if (options === void 0) { options = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.serviceContext.getAccountInfo({
                        abortSignal: options.abortSignal
                    })];
            });
        });
    };
    /**
     * Returns a list of the containers under the specified account.
     * @see https://docs.microsoft.com/en-us/rest/api/storageservices/list-containers2
     *
     * @param {string} [marker] A string value that identifies the portion of
     *                          the list of containers to be returned with the next listing operation. The
     *                          operation returns the NextMarker value within the response body if the
     *                          listing operation did not return all containers remaining to be listed
     *                          with the current page. The NextMarker value can be used as the value for
     *                          the marker parameter in a subsequent call to request the next page of list
     *                          items. The marker value is opaque to the client.
     * @param {ServiceListContainersSegmentOptions} [options] Options to the Service List Container Segment operation.
     * @returns {Promise<Models.ServiceListContainersSegmentResponse>} Response data for the Service List Container Segment operation.
     * @memberof BlobServiceClient
     */
    BlobServiceClient.prototype.listContainersSegment = function (marker, options) {
        if (options === void 0) { options = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.serviceContext.listContainersSegment(tslib_1.__assign({ abortSignal: options.abortSignal, marker: marker }, options))];
            });
        });
    };
    /**
     * Returns an AsyncIterableIterator for ServiceListContainersSegmentResponses
     *
     * @private
     * @param {string} [marker] A string value that identifies the portion of
     *                          the list of containers to be returned with the next listing operation. The
     *                          operation returns the NextMarker value within the response body if the
     *                          listing operation did not return all containers remaining to be listed
     *                          with the current page. The NextMarker value can be used as the value for
     *                          the marker parameter in a subsequent call to request the next page of list
     *                          items. The marker value is opaque to the client.
     * @param {ServiceListContainersSegmentOptions} [options] Options to list containers operation.
     * @returns {AsyncIterableIterator<Models.ServiceListContainersSegmentResponse>}
     * @memberof BlobServiceClient
     */
    BlobServiceClient.prototype.listSegments = function (marker, options) {
        if (options === void 0) { options = {}; }
        return tslib_1.__asyncGenerator(this, arguments, function listSegments_1() {
            var listContainersSegmentResponse;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, tslib_1.__await(this.listContainersSegment(marker, options))];
                    case 1:
                        listContainersSegmentResponse = _a.sent();
                        marker = listContainersSegmentResponse.nextMarker;
                        return [4 /*yield*/, tslib_1.__await(listContainersSegmentResponse)];
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
     * Returns an AsyncIterableIterator for Container Items
     *
     * @private
     * @param {ServiceListContainersSegmentOptions} [options] Options to list containers operation.
     * @returns {AsyncIterableIterator<Models.ServiceListcontainersSegmentResponse>}
     * @memberof BlobServiceClient
     */
    BlobServiceClient.prototype.listItems = function (options) {
        if (options === void 0) { options = {}; }
        return tslib_1.__asyncGenerator(this, arguments, function listItems_1() {
            var marker, _a, _b, segment, e_1_1;
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
                        segment = _b.value;
                        return [5 /*yield**/, tslib_1.__values(tslib_1.__asyncDelegator(tslib_1.__asyncValues(segment.containerItems)))];
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
     * Returns an async iterable iterator to list all the containers
     * under the specified account.
     *
     * .byPage() returns an async iterable iterator to list the containers in pages.
     *
     * @example
     *   let i = 1;
     *   for await (const container of blobServiceClient.listContainers()) {
     *     console.log(`Container ${i++}: ${container.name}`);
     *   }
     *
     * @example
     *   // Generator syntax .next()
     *   let i = 1;
     *   iter = blobServiceClient.listContainers();
     *   let containerItem = await iter.next();
     *   while (!containerItem.done) {
     *     console.log(`Container ${i++}: ${containerItem.value.name}`);
     *     containerItem = await iter.next();
     *   }
     *
     * @example
     *   // Example for .byPage()
     *   // passing optional maxPageSize in the page settings
     *   let i = 1;
     *   for await (const response of blobServiceClient.listContainers().byPage({ maxPageSize: 20 })) {
     *     if (response.containerItems) {
     *       for (const container of response.containerItems) {
     *         console.log(`Container ${i++}: ${container.name}`);
     *       }
     *     }
     *   }
     *
     * @example
     *   // Passing marker as an argument (similar to the previous example)
     *   let i = 1;
     *   let iterator = blobServiceClient.listContainers().byPage({ maxPageSize: 2 });
     *   let response = (await iterator.next()).value;
     *   // Prints 2 container names
     *   if (response.containerItems) {
     *     for (const container of response.containerItems) {
     *       console.log(`Container ${i++}: ${container.name}`);
     *     }
     *   }
     *   // Gets next marker
     *   let marker = response.nextMarker;
     *   // Passing next marker as continuationToken
     *   iterator = blobServiceClient
     *     .listContainers()
     *     .byPage({ continuationToken: marker, maxPageSize: 10 });
     *   response = (await iterator.next()).value;
     *   // Prints 10 container names
     *   if (response.containerItems) {
     *     for (const container of response.containerItems) {
     *        console.log(`Container ${i++}: ${container.name}`);
     *     }
     *   }
     *
     *
     * @param {ServiceListContainersOptions} [options={}] Options to list containers.
     * @returns {PagedAsyncIterableIterator<Models.ContainerItem, Models.ServiceListContainersSegmentResponse>} An asyncIterableIterator that supports paging.
     * @memberof BlobServiceClient
     */
    BlobServiceClient.prototype.listContainers = function (options) {
        var _a;
        var _this = this;
        if (options === void 0) { options = {}; }
        // AsyncIterableIterator to iterate over containers
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
     * ONLY AVAILABLE WHEN USING BEARER TOKEN AUTHENTICATION (TokenCredential).
     *
     * Retrieves a user delegation key for the Blob service. This is only a valid operation when using
     * bearer token authentication.
     *
     * @see https://docs.microsoft.com/en-us/rest/api/storageservices/get-user-delegation-key
     *
     *                          goto documents of Aborter for more examples about request cancellation
     * @param {Date} start      The start time for the user delegation SAS. Must be within 7 days of the current time
     * @param {Date} expiry     The end time for the user delegation SAS. Must be within 7 days of the current time
     * @returns {Promise<ServiceGetUserDelegationKeyResponse>}
     * @memberof BlobServiceClient
     */
    BlobServiceClient.prototype.getUserDelegationKey = function (start, expiry, options) {
        if (options === void 0) { options = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var response, userDelegationKey, res;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.serviceContext.getUserDelegationKey({
                            start: truncatedISO8061Date(start, false),
                            expiry: truncatedISO8061Date(expiry, false)
                        }, {
                            abortSignal: options.abortSignal
                        })];
                    case 1:
                        response = _a.sent();
                        userDelegationKey = {
                            signedOid: response.signedOid,
                            signedTid: response.signedTid,
                            signedStart: new Date(response.signedStart),
                            signedExpiry: new Date(response.signedExpiry),
                            signedService: response.signedService,
                            signedVersion: response.signedVersion,
                            value: response.value
                        };
                        res = tslib_1.__assign({ _response: response._response, requestId: response.requestId, clientRequestId: response.clientRequestId, version: response.version, date: response.date, errorCode: response.errorCode }, userDelegationKey);
                        return [2 /*return*/, res];
                }
            });
        });
    };
    /**
     * Submit batch request which consists of multiple subrequests.
     *
     * @example
     * let batchDeleteRequest = new BatchDeleteRequest();
     * await batchDeleteRequest.addSubRequest(urlInString0, credential0);
     * await batchDeleteRequest.addSubRequest(urlInString1, credential1, {
     *  deleteSnapshots: "include"
     * });
     * const deleteBatchResp = await blobServiceClient.submitBatch(batchDeleteRequest);
     * console.log(deleteBatchResp.subResponsesSucceededCount);
     *
     * @example
     * let batchSetTierRequest = new BatchSetTierRequest();
     * await batchSetTierRequest.addSubRequest(blockBlobClient0, "Cool");
     * await batchSetTierRequest.addSubRequest(blockBlobClient1, "Cool", {
     *  leaseAccessConditions: { leaseId: leaseId }
     * });
     * const setTierBatchResp = await blobServiceClient.submitBatch(batchSetTierRequest);
     * console.log(setTierBatchResp.subResponsesSucceededCount);
     *
     * @see https://docs.microsoft.com/en-us/rest/api/storageservices/blob-batch
     *
     * @param {BatchRequest} batchRequest Supported batch request: BatchDeleteRequest or BatchSetTierRequest.
     * @param {ServiceSubmitBatchOptionalParams} [options]
     * @returns {Promise<ServiceSubmitBatchResponse>}
     * @memberof BlobServiceClient
     */
    BlobServiceClient.prototype.submitBatch = function (batchRequest, options) {
        if (options === void 0) { options = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var batchRequestBody, rawBatchResponse, batchResponseParser, responseSummary, res;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!batchRequest || batchRequest.getSubRequests().size == 0) {
                            throw new RangeError("Batch request should contain one or more sub requests.");
                        }
                        batchRequestBody = batchRequest.getHttpRequestBody();
                        return [4 /*yield*/, this.serviceContext.submitBatch(batchRequestBody, utf8ByteLength(batchRequestBody), batchRequest.getMultiPartContentType(), tslib_1.__assign({}, options))];
                    case 1:
                        rawBatchResponse = _a.sent();
                        batchResponseParser = new BatchResponseParser(rawBatchResponse, batchRequest.getSubRequests());
                        return [4 /*yield*/, batchResponseParser.parseBatchResponse()];
                    case 2:
                        responseSummary = _a.sent();
                        res = {
                            _response: rawBatchResponse._response,
                            contentType: rawBatchResponse.contentType,
                            errorCode: rawBatchResponse.errorCode,
                            requestId: rawBatchResponse.requestId,
                            clientRequestId: rawBatchResponse.clientRequestId,
                            version: rawBatchResponse.version,
                            subResponses: responseSummary.subResponses,
                            subResponsesSucceededCount: responseSummary.subResponsesSucceededCount,
                            subResponsesFailedCount: responseSummary.subResponsesFailedCount
                        };
                        return [2 /*return*/, res];
                }
            });
        });
    };
    return BlobServiceClient;
}(StorageClient));
export { BlobServiceClient };
//# sourceMappingURL=BlobServiceClient.js.map