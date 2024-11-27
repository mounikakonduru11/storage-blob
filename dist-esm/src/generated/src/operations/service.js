/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is
 * regenerated.
 */
import * as tslib_1 from "tslib";
import * as coreHttp from "@azure/core-http";
import * as Mappers from "../models/serviceMappers";
import * as Parameters from "../models/parameters";
/** Class representing a Service. */
var Service = /** @class */ (function () {
    /**
     * Create a Service.
     * @param {StorageClientContext} client Reference to the service client.
     */
    function Service(client) {
        this.client = client;
    }
    Service.prototype.setProperties = function (storageServiceProperties, options, callback) {
        return this.client.sendOperationRequest({
            storageServiceProperties: storageServiceProperties,
            options: options
        }, setPropertiesOperationSpec, callback);
    };
    Service.prototype.getProperties = function (options, callback) {
        return this.client.sendOperationRequest({
            options: options
        }, getPropertiesOperationSpec, callback);
    };
    Service.prototype.getStatistics = function (options, callback) {
        return this.client.sendOperationRequest({
            options: options
        }, getStatisticsOperationSpec, callback);
    };
    Service.prototype.listContainersSegment = function (options, callback) {
        return this.client.sendOperationRequest({
            options: options
        }, listContainersSegmentOperationSpec, callback);
    };
    Service.prototype.getUserDelegationKey = function (keyInfo, options, callback) {
        return this.client.sendOperationRequest({
            keyInfo: keyInfo,
            options: options
        }, getUserDelegationKeyOperationSpec, callback);
    };
    Service.prototype.getAccountInfo = function (options, callback) {
        return this.client.sendOperationRequest({
            options: options
        }, getAccountInfoOperationSpec, callback);
    };
    Service.prototype.submitBatch = function (body, contentLength, multipartContentType, options, callback) {
        return this.client.sendOperationRequest({
            body: body,
            contentLength: contentLength,
            multipartContentType: multipartContentType,
            options: options
        }, submitBatchOperationSpec, callback);
    };
    return Service;
}());
export { Service };
// Operation Specifications
var serializer = new coreHttp.Serializer(Mappers, true);
var setPropertiesOperationSpec = {
    httpMethod: "PUT",
    urlParameters: [
        Parameters.url
    ],
    queryParameters: [
        Parameters.timeout,
        Parameters.restype0,
        Parameters.comp0
    ],
    headerParameters: [
        Parameters.version,
        Parameters.requestId
    ],
    requestBody: {
        parameterPath: "storageServiceProperties",
        mapper: tslib_1.__assign({}, Mappers.StorageServiceProperties, { required: true })
    },
    contentType: "application/xml; charset=utf-8",
    responses: {
        202: {
            headersMapper: Mappers.ServiceSetPropertiesHeaders
        },
        default: {
            bodyMapper: Mappers.StorageError
        }
    },
    isXML: true,
    serializer: serializer
};
var getPropertiesOperationSpec = {
    httpMethod: "GET",
    urlParameters: [
        Parameters.url
    ],
    queryParameters: [
        Parameters.timeout,
        Parameters.restype0,
        Parameters.comp0
    ],
    headerParameters: [
        Parameters.version,
        Parameters.requestId
    ],
    responses: {
        200: {
            bodyMapper: Mappers.StorageServiceProperties,
            headersMapper: Mappers.ServiceGetPropertiesHeaders
        },
        default: {
            bodyMapper: Mappers.StorageError
        }
    },
    isXML: true,
    serializer: serializer
};
var getStatisticsOperationSpec = {
    httpMethod: "GET",
    urlParameters: [
        Parameters.url
    ],
    queryParameters: [
        Parameters.timeout,
        Parameters.restype0,
        Parameters.comp1
    ],
    headerParameters: [
        Parameters.version,
        Parameters.requestId
    ],
    responses: {
        200: {
            bodyMapper: Mappers.StorageServiceStats,
            headersMapper: Mappers.ServiceGetStatisticsHeaders
        },
        default: {
            bodyMapper: Mappers.StorageError
        }
    },
    isXML: true,
    serializer: serializer
};
var listContainersSegmentOperationSpec = {
    httpMethod: "GET",
    urlParameters: [
        Parameters.url
    ],
    queryParameters: [
        Parameters.prefix,
        Parameters.marker0,
        Parameters.maxresults,
        Parameters.include0,
        Parameters.timeout,
        Parameters.comp2
    ],
    headerParameters: [
        Parameters.version,
        Parameters.requestId
    ],
    responses: {
        200: {
            bodyMapper: Mappers.ListContainersSegmentResponse,
            headersMapper: Mappers.ServiceListContainersSegmentHeaders
        },
        default: {
            bodyMapper: Mappers.StorageError
        }
    },
    isXML: true,
    serializer: serializer
};
var getUserDelegationKeyOperationSpec = {
    httpMethod: "POST",
    urlParameters: [
        Parameters.url
    ],
    queryParameters: [
        Parameters.timeout,
        Parameters.restype0,
        Parameters.comp3
    ],
    headerParameters: [
        Parameters.version,
        Parameters.requestId
    ],
    requestBody: {
        parameterPath: "keyInfo",
        mapper: tslib_1.__assign({}, Mappers.KeyInfo, { required: true })
    },
    contentType: "application/xml; charset=utf-8",
    responses: {
        200: {
            bodyMapper: Mappers.UserDelegationKey,
            headersMapper: Mappers.ServiceGetUserDelegationKeyHeaders
        },
        default: {
            bodyMapper: Mappers.StorageError
        }
    },
    isXML: true,
    serializer: serializer
};
var getAccountInfoOperationSpec = {
    httpMethod: "GET",
    urlParameters: [
        Parameters.url
    ],
    queryParameters: [
        Parameters.restype1,
        Parameters.comp0
    ],
    headerParameters: [
        Parameters.version
    ],
    responses: {
        200: {
            headersMapper: Mappers.ServiceGetAccountInfoHeaders
        },
        default: {
            bodyMapper: Mappers.StorageError
        }
    },
    isXML: true,
    serializer: serializer
};
var submitBatchOperationSpec = {
    httpMethod: "POST",
    urlParameters: [
        Parameters.url
    ],
    queryParameters: [
        Parameters.timeout,
        Parameters.comp4
    ],
    headerParameters: [
        Parameters.contentLength,
        Parameters.multipartContentType,
        Parameters.version,
        Parameters.requestId
    ],
    requestBody: {
        parameterPath: "body",
        mapper: {
            required: true,
            serializedName: "body",
            type: {
                name: "Stream"
            }
        }
    },
    contentType: "application/xml; charset=utf-8",
    responses: {
        202: {
            bodyMapper: {
                serializedName: "parsedResponse",
                type: {
                    name: "Stream"
                }
            },
            headersMapper: Mappers.ServiceSubmitBatchHeaders
        },
        default: {
            bodyMapper: Mappers.StorageError
        }
    },
    isXML: true,
    serializer: serializer
};
//# sourceMappingURL=service.js.map