/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is
 * regenerated.
 */
import * as coreHttp from "@azure/core-http";
import * as Mappers from "../models/containerMappers";
import * as Parameters from "../models/parameters";
/** Class representing a Container. */
var Container = /** @class */ (function () {
    /**
     * Create a Container.
     * @param {StorageClientContext} client Reference to the service client.
     */
    function Container(client) {
        this.client = client;
    }
    Container.prototype.create = function (options, callback) {
        return this.client.sendOperationRequest({
            options: options
        }, createOperationSpec, callback);
    };
    Container.prototype.getProperties = function (options, callback) {
        return this.client.sendOperationRequest({
            options: options
        }, getPropertiesOperationSpec, callback);
    };
    Container.prototype.deleteMethod = function (options, callback) {
        return this.client.sendOperationRequest({
            options: options
        }, deleteMethodOperationSpec, callback);
    };
    Container.prototype.setMetadata = function (options, callback) {
        return this.client.sendOperationRequest({
            options: options
        }, setMetadataOperationSpec, callback);
    };
    Container.prototype.getAccessPolicy = function (options, callback) {
        return this.client.sendOperationRequest({
            options: options
        }, getAccessPolicyOperationSpec, callback);
    };
    Container.prototype.setAccessPolicy = function (options, callback) {
        return this.client.sendOperationRequest({
            options: options
        }, setAccessPolicyOperationSpec, callback);
    };
    Container.prototype.acquireLease = function (options, callback) {
        return this.client.sendOperationRequest({
            options: options
        }, acquireLeaseOperationSpec, callback);
    };
    Container.prototype.releaseLease = function (leaseId, options, callback) {
        return this.client.sendOperationRequest({
            leaseId: leaseId,
            options: options
        }, releaseLeaseOperationSpec, callback);
    };
    Container.prototype.renewLease = function (leaseId, options, callback) {
        return this.client.sendOperationRequest({
            leaseId: leaseId,
            options: options
        }, renewLeaseOperationSpec, callback);
    };
    Container.prototype.breakLease = function (options, callback) {
        return this.client.sendOperationRequest({
            options: options
        }, breakLeaseOperationSpec, callback);
    };
    Container.prototype.changeLease = function (leaseId, proposedLeaseId, options, callback) {
        return this.client.sendOperationRequest({
            leaseId: leaseId,
            proposedLeaseId: proposedLeaseId,
            options: options
        }, changeLeaseOperationSpec, callback);
    };
    Container.prototype.listBlobFlatSegment = function (options, callback) {
        return this.client.sendOperationRequest({
            options: options
        }, listBlobFlatSegmentOperationSpec, callback);
    };
    Container.prototype.listBlobHierarchySegment = function (delimiter, options, callback) {
        return this.client.sendOperationRequest({
            delimiter: delimiter,
            options: options
        }, listBlobHierarchySegmentOperationSpec, callback);
    };
    Container.prototype.getAccountInfo = function (options, callback) {
        return this.client.sendOperationRequest({
            options: options
        }, getAccountInfoOperationSpec, callback);
    };
    return Container;
}());
export { Container };
// Operation Specifications
var serializer = new coreHttp.Serializer(Mappers, true);
var createOperationSpec = {
    httpMethod: "PUT",
    path: "{containerName}",
    urlParameters: [
        Parameters.url
    ],
    queryParameters: [
        Parameters.timeout,
        Parameters.restype2
    ],
    headerParameters: [
        Parameters.metadata,
        Parameters.access,
        Parameters.version,
        Parameters.requestId
    ],
    responses: {
        201: {
            headersMapper: Mappers.ContainerCreateHeaders
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
    path: "{containerName}",
    urlParameters: [
        Parameters.url
    ],
    queryParameters: [
        Parameters.timeout,
        Parameters.restype2
    ],
    headerParameters: [
        Parameters.version,
        Parameters.requestId,
        Parameters.leaseId0
    ],
    responses: {
        200: {
            headersMapper: Mappers.ContainerGetPropertiesHeaders
        },
        default: {
            bodyMapper: Mappers.StorageError
        }
    },
    isXML: true,
    serializer: serializer
};
var deleteMethodOperationSpec = {
    httpMethod: "DELETE",
    path: "{containerName}",
    urlParameters: [
        Parameters.url
    ],
    queryParameters: [
        Parameters.timeout,
        Parameters.restype2
    ],
    headerParameters: [
        Parameters.version,
        Parameters.requestId,
        Parameters.leaseId0,
        Parameters.ifModifiedSince,
        Parameters.ifUnmodifiedSince
    ],
    responses: {
        202: {
            headersMapper: Mappers.ContainerDeleteHeaders
        },
        default: {
            bodyMapper: Mappers.StorageError
        }
    },
    isXML: true,
    serializer: serializer
};
var setMetadataOperationSpec = {
    httpMethod: "PUT",
    path: "{containerName}",
    urlParameters: [
        Parameters.url
    ],
    queryParameters: [
        Parameters.timeout,
        Parameters.restype2,
        Parameters.comp5
    ],
    headerParameters: [
        Parameters.metadata,
        Parameters.version,
        Parameters.requestId,
        Parameters.leaseId0,
        Parameters.ifModifiedSince
    ],
    responses: {
        200: {
            headersMapper: Mappers.ContainerSetMetadataHeaders
        },
        default: {
            bodyMapper: Mappers.StorageError
        }
    },
    isXML: true,
    serializer: serializer
};
var getAccessPolicyOperationSpec = {
    httpMethod: "GET",
    path: "{containerName}",
    urlParameters: [
        Parameters.url
    ],
    queryParameters: [
        Parameters.timeout,
        Parameters.restype2,
        Parameters.comp6
    ],
    headerParameters: [
        Parameters.version,
        Parameters.requestId,
        Parameters.leaseId0
    ],
    responses: {
        200: {
            bodyMapper: {
                xmlElementName: "SignedIdentifier",
                serializedName: "parsedResponse",
                type: {
                    name: "Sequence",
                    element: {
                        type: {
                            name: "Composite",
                            className: "SignedIdentifier"
                        }
                    }
                }
            },
            headersMapper: Mappers.ContainerGetAccessPolicyHeaders
        },
        default: {
            bodyMapper: Mappers.StorageError
        }
    },
    isXML: true,
    serializer: serializer
};
var setAccessPolicyOperationSpec = {
    httpMethod: "PUT",
    path: "{containerName}",
    urlParameters: [
        Parameters.url
    ],
    queryParameters: [
        Parameters.timeout,
        Parameters.restype2,
        Parameters.comp6
    ],
    headerParameters: [
        Parameters.access,
        Parameters.version,
        Parameters.requestId,
        Parameters.leaseId0,
        Parameters.ifModifiedSince,
        Parameters.ifUnmodifiedSince
    ],
    requestBody: {
        parameterPath: [
            "options",
            "containerAcl"
        ],
        mapper: {
            xmlName: "SignedIdentifiers",
            xmlElementName: "SignedIdentifier",
            serializedName: "containerAcl",
            type: {
                name: "Sequence",
                element: {
                    type: {
                        name: "Composite",
                        className: "SignedIdentifier"
                    }
                }
            }
        }
    },
    contentType: "application/xml; charset=utf-8",
    responses: {
        200: {
            headersMapper: Mappers.ContainerSetAccessPolicyHeaders
        },
        default: {
            bodyMapper: Mappers.StorageError
        }
    },
    isXML: true,
    serializer: serializer
};
var acquireLeaseOperationSpec = {
    httpMethod: "PUT",
    path: "{containerName}",
    urlParameters: [
        Parameters.url
    ],
    queryParameters: [
        Parameters.timeout,
        Parameters.comp7,
        Parameters.restype2
    ],
    headerParameters: [
        Parameters.duration,
        Parameters.proposedLeaseId0,
        Parameters.version,
        Parameters.requestId,
        Parameters.action0,
        Parameters.ifModifiedSince,
        Parameters.ifUnmodifiedSince
    ],
    responses: {
        201: {
            headersMapper: Mappers.ContainerAcquireLeaseHeaders
        },
        default: {
            bodyMapper: Mappers.StorageError
        }
    },
    isXML: true,
    serializer: serializer
};
var releaseLeaseOperationSpec = {
    httpMethod: "PUT",
    path: "{containerName}",
    urlParameters: [
        Parameters.url
    ],
    queryParameters: [
        Parameters.timeout,
        Parameters.comp7,
        Parameters.restype2
    ],
    headerParameters: [
        Parameters.leaseId1,
        Parameters.version,
        Parameters.requestId,
        Parameters.action1,
        Parameters.ifModifiedSince,
        Parameters.ifUnmodifiedSince
    ],
    responses: {
        200: {
            headersMapper: Mappers.ContainerReleaseLeaseHeaders
        },
        default: {
            bodyMapper: Mappers.StorageError
        }
    },
    isXML: true,
    serializer: serializer
};
var renewLeaseOperationSpec = {
    httpMethod: "PUT",
    path: "{containerName}",
    urlParameters: [
        Parameters.url
    ],
    queryParameters: [
        Parameters.timeout,
        Parameters.comp7,
        Parameters.restype2
    ],
    headerParameters: [
        Parameters.leaseId1,
        Parameters.version,
        Parameters.requestId,
        Parameters.action2,
        Parameters.ifModifiedSince,
        Parameters.ifUnmodifiedSince
    ],
    responses: {
        200: {
            headersMapper: Mappers.ContainerRenewLeaseHeaders
        },
        default: {
            bodyMapper: Mappers.StorageError
        }
    },
    isXML: true,
    serializer: serializer
};
var breakLeaseOperationSpec = {
    httpMethod: "PUT",
    path: "{containerName}",
    urlParameters: [
        Parameters.url
    ],
    queryParameters: [
        Parameters.timeout,
        Parameters.comp7,
        Parameters.restype2
    ],
    headerParameters: [
        Parameters.breakPeriod,
        Parameters.version,
        Parameters.requestId,
        Parameters.action3,
        Parameters.ifModifiedSince,
        Parameters.ifUnmodifiedSince
    ],
    responses: {
        202: {
            headersMapper: Mappers.ContainerBreakLeaseHeaders
        },
        default: {
            bodyMapper: Mappers.StorageError
        }
    },
    isXML: true,
    serializer: serializer
};
var changeLeaseOperationSpec = {
    httpMethod: "PUT",
    path: "{containerName}",
    urlParameters: [
        Parameters.url
    ],
    queryParameters: [
        Parameters.timeout,
        Parameters.comp7,
        Parameters.restype2
    ],
    headerParameters: [
        Parameters.leaseId1,
        Parameters.proposedLeaseId1,
        Parameters.version,
        Parameters.requestId,
        Parameters.action4,
        Parameters.ifModifiedSince,
        Parameters.ifUnmodifiedSince
    ],
    responses: {
        200: {
            headersMapper: Mappers.ContainerChangeLeaseHeaders
        },
        default: {
            bodyMapper: Mappers.StorageError
        }
    },
    isXML: true,
    serializer: serializer
};
var listBlobFlatSegmentOperationSpec = {
    httpMethod: "GET",
    path: "{containerName}",
    urlParameters: [
        Parameters.url
    ],
    queryParameters: [
        Parameters.prefix,
        Parameters.marker0,
        Parameters.maxresults,
        Parameters.include1,
        Parameters.timeout,
        Parameters.restype2,
        Parameters.comp2
    ],
    headerParameters: [
        Parameters.version,
        Parameters.requestId
    ],
    responses: {
        200: {
            bodyMapper: Mappers.ListBlobsFlatSegmentResponse,
            headersMapper: Mappers.ContainerListBlobFlatSegmentHeaders
        },
        default: {
            bodyMapper: Mappers.StorageError
        }
    },
    isXML: true,
    serializer: serializer
};
var listBlobHierarchySegmentOperationSpec = {
    httpMethod: "GET",
    path: "{containerName}",
    urlParameters: [
        Parameters.url
    ],
    queryParameters: [
        Parameters.prefix,
        Parameters.delimiter,
        Parameters.marker0,
        Parameters.maxresults,
        Parameters.include1,
        Parameters.timeout,
        Parameters.restype2,
        Parameters.comp2
    ],
    headerParameters: [
        Parameters.version,
        Parameters.requestId
    ],
    responses: {
        200: {
            bodyMapper: Mappers.ListBlobsHierarchySegmentResponse,
            headersMapper: Mappers.ContainerListBlobHierarchySegmentHeaders
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
    path: "{containerName}",
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
            headersMapper: Mappers.ContainerGetAccountInfoHeaders
        },
        default: {
            bodyMapper: Mappers.StorageError
        }
    },
    isXML: true,
    serializer: serializer
};
//# sourceMappingURL=container.js.map