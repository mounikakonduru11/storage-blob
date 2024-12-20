import * as tslib_1 from "tslib";
import { BaseRequestPolicy, deserializationPolicy, generateUuid, HttpHeaders, WebResource, isTokenCredential, bearerTokenAuthenticationPolicy, isNode } from "@azure/core-http";
import { AnonymousCredential } from "./credentials/AnonymousCredential";
import { BlobClient } from "./BlobClient";
import { Mutex } from "./utils/Mutex";
import { Pipeline } from "./Pipeline";
import { getURLPath, getURLPathAndQuery, iEqual } from "./utils/utils.common";
import { HeaderConstants, BATCH_MAX_REQUEST, HTTP_VERSION_1_1, HTTP_LINE_ENDING, DefaultStorageScope } from "./utils/constants";
import { SharedKeyCredential } from "./credentials/SharedKeyCredential";
/**
 * A BatchRequest represents a based class for BatchDeleteRequest and BatchSetTierRequest.
 *
 * @export
 * @class BatchRequest
 */
var BatchRequest = /** @class */ (function () {
    function BatchRequest() {
        this.batch = "batch";
        this.batchRequest = new InnerBatchRequest();
    }
    /**
     * Get the value of Content-Type for a batch request.
     * The value must be multipart/mixed with a batch boundary.
     * Example: multipart/mixed; boundary=batch_a81786c8-e301-4e42-a729-a32ca24ae252
     */
    BatchRequest.prototype.getMultiPartContentType = function () {
        return this.batchRequest.getMultipartContentType();
    };
    /**
     * Get assembled HTTP request body for sub requests.
     */
    BatchRequest.prototype.getHttpRequestBody = function () {
        return this.batchRequest.getHttpRequestBody();
    };
    /**
     * Get sub requests that are added into the batch request.
     */
    BatchRequest.prototype.getSubRequests = function () {
        return this.batchRequest.getSubRequests();
    };
    BatchRequest.prototype.addSubRequestInternal = function (subRequest, assembleSubRequestFunc) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Mutex.lock(this.batch)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, , 4, 6]);
                        this.batchRequest.preAddSubRequest(subRequest);
                        return [4 /*yield*/, assembleSubRequestFunc()];
                    case 3:
                        _a.sent();
                        this.batchRequest.postAddSubRequest(subRequest);
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, Mutex.unlock(this.batch)];
                    case 5:
                        _a.sent();
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return BatchRequest;
}());
export { BatchRequest };
/**
 * A BatchDeleteRequest represents a batch delete request, which consists of one or more delete operations.
 *
 * @export
 * @class BatchDeleteRequest
 * @extends {BatchRequest}
 */
var BatchDeleteRequest = /** @class */ (function (_super) {
    tslib_1.__extends(BatchDeleteRequest, _super);
    function BatchDeleteRequest() {
        return _super.call(this) || this;
    }
    BatchDeleteRequest.prototype.addSubRequest = function (urlOrBlobClient, credentialOrOptions, options) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var url, credential;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (typeof urlOrBlobClient === "string" &&
                            ((isNode && credentialOrOptions instanceof SharedKeyCredential) ||
                                credentialOrOptions instanceof AnonymousCredential ||
                                isTokenCredential(credentialOrOptions))) {
                            // First overload
                            url = urlOrBlobClient;
                            credential = credentialOrOptions;
                        }
                        else if (urlOrBlobClient instanceof BlobClient) {
                            // Second overload
                            url = urlOrBlobClient.url;
                            credential = urlOrBlobClient.credential;
                            options = credentialOrOptions;
                        }
                        else {
                            throw new RangeError("Invalid arguments. Either url and credential, or BlobClient need be provided.");
                        }
                        if (!options) {
                            options = {};
                        }
                        return [4 /*yield*/, _super.prototype.addSubRequestInternal.call(this, {
                                url: url,
                                credential: credential
                            }, function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, new BlobClient(url, this.batchRequest.createPipeline(credential)).delete(options)];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return BatchDeleteRequest;
}(BatchRequest));
export { BatchDeleteRequest };
/**
 * A BatchSetTierRequest represents a batch set tier request, which consists of one or more set tier operations.
 *
 * @export
 * @class BatchSetTierRequest
 * @extends {BatchRequest}
 */
var BatchSetTierRequest = /** @class */ (function (_super) {
    tslib_1.__extends(BatchSetTierRequest, _super);
    function BatchSetTierRequest() {
        return _super.call(this) || this;
    }
    BatchSetTierRequest.prototype.addSubRequest = function (urlOrBlobClient, credentialOrTier, tierOrOptions, options) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var url, credential, tier;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (typeof urlOrBlobClient === "string" &&
                            ((isNode && credentialOrTier instanceof SharedKeyCredential) ||
                                credentialOrTier instanceof AnonymousCredential ||
                                isTokenCredential(credentialOrTier))) {
                            // First overload
                            url = urlOrBlobClient;
                            credential = credentialOrTier;
                            tier = tierOrOptions;
                        }
                        else if (urlOrBlobClient instanceof BlobClient) {
                            // Second overload
                            url = urlOrBlobClient.url;
                            credential = urlOrBlobClient.credential;
                            tier = credentialOrTier;
                            options = tierOrOptions;
                        }
                        else {
                            throw new RangeError("Invalid arguments. Either url and credential, or BlobClient need be provided.");
                        }
                        if (!options) {
                            options = {};
                        }
                        return [4 /*yield*/, _super.prototype.addSubRequestInternal.call(this, {
                                url: url,
                                credential: credential
                            }, function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, new BlobClient(url, this.batchRequest.createPipeline(credential)).setTier(tier, options)];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return BatchSetTierRequest;
}(BatchRequest));
export { BatchSetTierRequest };
/**
 * Inner batch request class which is responsible for assembling and serializing sub requests.
 * See https://docs.microsoft.com/en-us/rest/api/storageservices/blob-batch#request-body for how request get assembled.
 */
var InnerBatchRequest = /** @class */ (function () {
    function InnerBatchRequest() {
        this.operationCount = 0;
        this.body = "";
        var tempGuid = generateUuid();
        // batch_{batchid}
        this.boundary = "batch_" + tempGuid;
        // --batch_{batchid}
        // Content-Type: application/http
        // Content-Transfer-Encoding: binary
        this.subRequestPrefix = "--" + this.boundary + HTTP_LINE_ENDING + HeaderConstants.CONTENT_TYPE + ": application/http" + HTTP_LINE_ENDING + HeaderConstants.CONTENT_TRANSFER_ENCODING + ": binary";
        // multipart/mixed; boundary=batch_{batchid}
        this.multipartContentType = "multipart/mixed; boundary=" + this.boundary;
        // --batch_{batchid}--
        this.batchRequestEnding = "--" + this.boundary + "--";
        this.subRequests = new Map();
    }
    /**
     * Create pipeline to assemble sub requests. The idea here is to use exising
     * credential and serialization/deserialization components, with additional policies to
     * filter unnecessary headers, assemble sub requests into request's body
     * and intercept request from going to wire.
     * @param credential
     */
    InnerBatchRequest.prototype.createPipeline = function (credential) {
        var isAnonymousCreds = credential instanceof AnonymousCredential;
        var policyFactoryLength = 3 + (isAnonymousCreds ? 0 : 1); // [deserilizationPolicy, BatchHeaderFilterPolicyFactory, (Optional)Credential, BatchRequestAssemblePolicyFactory]
        var factories = new Array(policyFactoryLength);
        factories[0] = deserializationPolicy(); // Default deserializationPolicy is provided by protocol layer
        factories[1] = new BatchHeaderFilterPolicyFactory(); // Use batch header filter policy to exclude unnecessary headers
        if (!isAnonymousCreds) {
            factories[2] = isTokenCredential(credential)
                ? bearerTokenAuthenticationPolicy(credential, DefaultStorageScope)
                : credential;
        }
        factories[policyFactoryLength - 1] = new BatchRequestAssemblePolicyFactory(this); // Use batch assemble policy to assemble request and intercept request from going to wire
        return new Pipeline(factories, {});
    };
    InnerBatchRequest.prototype.appendSubRequestToBody = function (request) {
        // Start to assemble sub request
        this.body += [
            this.subRequestPrefix,
            HeaderConstants.CONTENT_ID + ": " + this.operationCount,
            "",
            request.method.toString() + " " + getURLPathAndQuery(request.url) + " " + HTTP_VERSION_1_1 + HTTP_LINE_ENDING // sub request start line with method
        ].join(HTTP_LINE_ENDING);
        for (var _i = 0, _a = request.headers.headersArray(); _i < _a.length; _i++) {
            var header = _a[_i];
            this.body += header.name + ": " + header.value + HTTP_LINE_ENDING;
        }
        this.body += HTTP_LINE_ENDING; // sub request's headers need be ending with an empty line
        // No body to assemble for current batch request support
        // End to assemble sub request
    };
    InnerBatchRequest.prototype.preAddSubRequest = function (subRequest) {
        if (this.operationCount >= BATCH_MAX_REQUEST) {
            throw new RangeError("Cannot exceed " + BATCH_MAX_REQUEST + " sub requests in a single batch");
        }
        // Fast fail if url for sub request is invalid
        var path = getURLPath(subRequest.url);
        if (!path || path == "") {
            throw new RangeError("Invalid url for sub request: '" + subRequest.url + "'");
        }
    };
    InnerBatchRequest.prototype.postAddSubRequest = function (subRequest) {
        this.subRequests.set(this.operationCount, subRequest);
        this.operationCount++;
    };
    // Return the http request body with assembling the ending line to the sub request body.
    InnerBatchRequest.prototype.getHttpRequestBody = function () {
        return "" + this.body + this.batchRequestEnding + HTTP_LINE_ENDING;
    };
    InnerBatchRequest.prototype.getMultipartContentType = function () {
        return this.multipartContentType;
    };
    InnerBatchRequest.prototype.getSubRequests = function () {
        return this.subRequests;
    };
    return InnerBatchRequest;
}());
var BatchRequestAssemblePolicy = /** @class */ (function (_super) {
    tslib_1.__extends(BatchRequestAssemblePolicy, _super);
    function BatchRequestAssemblePolicy(batchRequest, nextPolicy, options) {
        var _this = _super.call(this, nextPolicy, options) || this;
        _this.dummyResponse = {
            request: new WebResource(),
            status: 200,
            headers: new HttpHeaders()
        };
        _this.batchRequest = batchRequest;
        return _this;
    }
    BatchRequestAssemblePolicy.prototype.sendRequest = function (request) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.batchRequest.appendSubRequestToBody(request)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.dummyResponse]; // Intercept request from going to wire
                }
            });
        });
    };
    return BatchRequestAssemblePolicy;
}(BaseRequestPolicy));
var BatchRequestAssemblePolicyFactory = /** @class */ (function () {
    function BatchRequestAssemblePolicyFactory(batchRequest) {
        this.batchRequest = batchRequest;
    }
    BatchRequestAssemblePolicyFactory.prototype.create = function (nextPolicy, options) {
        return new BatchRequestAssemblePolicy(this.batchRequest, nextPolicy, options);
    };
    return BatchRequestAssemblePolicyFactory;
}());
var BatchHeaderFilterPolicy = /** @class */ (function (_super) {
    tslib_1.__extends(BatchHeaderFilterPolicy, _super);
    function BatchHeaderFilterPolicy(nextPolicy, options) {
        return _super.call(this, nextPolicy, options) || this;
    }
    BatchHeaderFilterPolicy.prototype.sendRequest = function (request) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var xMsHeaderName, _i, _a, header;
            return tslib_1.__generator(this, function (_b) {
                xMsHeaderName = "";
                for (_i = 0, _a = request.headers.headersArray(); _i < _a.length; _i++) {
                    header = _a[_i];
                    if (iEqual(header.name, HeaderConstants.X_MS_VERSION)) {
                        xMsHeaderName = header.name;
                    }
                }
                if (xMsHeaderName !== "") {
                    request.headers.remove(xMsHeaderName); // The subrequests should not have the x-ms-version header.
                }
                return [2 /*return*/, this._nextPolicy.sendRequest(request)];
            });
        });
    };
    return BatchHeaderFilterPolicy;
}(BaseRequestPolicy));
var BatchHeaderFilterPolicyFactory = /** @class */ (function () {
    function BatchHeaderFilterPolicyFactory() {
    }
    BatchHeaderFilterPolicyFactory.prototype.create = function (nextPolicy, options) {
        return new BatchHeaderFilterPolicy(nextPolicy, options);
    };
    return BatchHeaderFilterPolicyFactory;
}());
//# sourceMappingURL=BatchRequest.js.map