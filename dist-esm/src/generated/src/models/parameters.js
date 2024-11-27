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
export var access = {
    parameterPath: [
        "options",
        "access"
    ],
    mapper: {
        serializedName: "x-ms-blob-public-access",
        type: {
            name: "String"
        }
    }
};
export var action0 = {
    parameterPath: "action",
    mapper: {
        required: true,
        isConstant: true,
        serializedName: "x-ms-lease-action",
        defaultValue: 'acquire',
        type: {
            name: "String"
        }
    }
};
export var action1 = {
    parameterPath: "action",
    mapper: {
        required: true,
        isConstant: true,
        serializedName: "x-ms-lease-action",
        defaultValue: 'release',
        type: {
            name: "String"
        }
    }
};
export var action2 = {
    parameterPath: "action",
    mapper: {
        required: true,
        isConstant: true,
        serializedName: "x-ms-lease-action",
        defaultValue: 'renew',
        type: {
            name: "String"
        }
    }
};
export var action3 = {
    parameterPath: "action",
    mapper: {
        required: true,
        isConstant: true,
        serializedName: "x-ms-lease-action",
        defaultValue: 'break',
        type: {
            name: "String"
        }
    }
};
export var action4 = {
    parameterPath: "action",
    mapper: {
        required: true,
        isConstant: true,
        serializedName: "x-ms-lease-action",
        defaultValue: 'change',
        type: {
            name: "String"
        }
    }
};
export var action5 = {
    parameterPath: "action",
    mapper: {
        required: true,
        isConstant: true,
        serializedName: "action",
        defaultValue: 'setAccessControl',
        type: {
            name: "String"
        }
    }
};
export var action6 = {
    parameterPath: "action",
    mapper: {
        required: true,
        isConstant: true,
        serializedName: "action",
        defaultValue: 'getAccessControl',
        type: {
            name: "String"
        }
    }
};
export var appendPosition = {
    parameterPath: [
        "options",
        "appendPositionAccessConditions",
        "appendPosition"
    ],
    mapper: {
        serializedName: "x-ms-blob-condition-appendpos",
        type: {
            name: "Number"
        }
    }
};
export var blobCacheControl = {
    parameterPath: [
        "options",
        "blobHTTPHeaders",
        "blobCacheControl"
    ],
    mapper: {
        serializedName: "x-ms-blob-cache-control",
        type: {
            name: "String"
        }
    }
};
export var blobContentDisposition = {
    parameterPath: [
        "options",
        "blobHTTPHeaders",
        "blobContentDisposition"
    ],
    mapper: {
        serializedName: "x-ms-blob-content-disposition",
        type: {
            name: "String"
        }
    }
};
export var blobContentEncoding = {
    parameterPath: [
        "options",
        "blobHTTPHeaders",
        "blobContentEncoding"
    ],
    mapper: {
        serializedName: "x-ms-blob-content-encoding",
        type: {
            name: "String"
        }
    }
};
export var blobContentLanguage = {
    parameterPath: [
        "options",
        "blobHTTPHeaders",
        "blobContentLanguage"
    ],
    mapper: {
        serializedName: "x-ms-blob-content-language",
        type: {
            name: "String"
        }
    }
};
export var blobContentLength = {
    parameterPath: "blobContentLength",
    mapper: {
        required: true,
        serializedName: "x-ms-blob-content-length",
        type: {
            name: "Number"
        }
    }
};
export var blobContentMD5 = {
    parameterPath: [
        "options",
        "blobHTTPHeaders",
        "blobContentMD5"
    ],
    mapper: {
        serializedName: "x-ms-blob-content-md5",
        type: {
            name: "ByteArray"
        }
    }
};
export var blobContentType = {
    parameterPath: [
        "options",
        "blobHTTPHeaders",
        "blobContentType"
    ],
    mapper: {
        serializedName: "x-ms-blob-content-type",
        type: {
            name: "String"
        }
    }
};
export var blobSequenceNumber = {
    parameterPath: [
        "options",
        "blobSequenceNumber"
    ],
    mapper: {
        serializedName: "x-ms-blob-sequence-number",
        defaultValue: 0,
        type: {
            name: "Number"
        }
    }
};
export var blobType0 = {
    parameterPath: "blobType",
    mapper: {
        required: true,
        isConstant: true,
        serializedName: "x-ms-blob-type",
        defaultValue: 'PageBlob',
        type: {
            name: "String"
        }
    }
};
export var blobType1 = {
    parameterPath: "blobType",
    mapper: {
        required: true,
        isConstant: true,
        serializedName: "x-ms-blob-type",
        defaultValue: 'AppendBlob',
        type: {
            name: "String"
        }
    }
};
export var blobType2 = {
    parameterPath: "blobType",
    mapper: {
        required: true,
        isConstant: true,
        serializedName: "x-ms-blob-type",
        defaultValue: 'BlockBlob',
        type: {
            name: "String"
        }
    }
};
export var blockId = {
    parameterPath: "blockId",
    mapper: {
        required: true,
        serializedName: "blockid",
        type: {
            name: "String"
        }
    }
};
export var breakPeriod = {
    parameterPath: [
        "options",
        "breakPeriod"
    ],
    mapper: {
        serializedName: "x-ms-lease-break-period",
        type: {
            name: "Number"
        }
    }
};
export var cacheControl = {
    parameterPath: [
        "options",
        "directoryHttpHeaders",
        "cacheControl"
    ],
    mapper: {
        serializedName: "x-ms-cache-control",
        type: {
            name: "String"
        }
    }
};
export var comp0 = {
    parameterPath: "comp",
    mapper: {
        required: true,
        isConstant: true,
        serializedName: "comp",
        defaultValue: 'properties',
        type: {
            name: "String"
        }
    }
};
export var comp1 = {
    parameterPath: "comp",
    mapper: {
        required: true,
        isConstant: true,
        serializedName: "comp",
        defaultValue: 'stats',
        type: {
            name: "String"
        }
    }
};
export var comp10 = {
    parameterPath: "comp",
    mapper: {
        required: true,
        isConstant: true,
        serializedName: "comp",
        defaultValue: 'copy',
        type: {
            name: "String"
        }
    }
};
export var comp11 = {
    parameterPath: "comp",
    mapper: {
        required: true,
        isConstant: true,
        serializedName: "comp",
        defaultValue: 'tier',
        type: {
            name: "String"
        }
    }
};
export var comp12 = {
    parameterPath: "comp",
    mapper: {
        required: true,
        isConstant: true,
        serializedName: "comp",
        defaultValue: 'page',
        type: {
            name: "String"
        }
    }
};
export var comp13 = {
    parameterPath: "comp",
    mapper: {
        required: true,
        isConstant: true,
        serializedName: "comp",
        defaultValue: 'pagelist',
        type: {
            name: "String"
        }
    }
};
export var comp14 = {
    parameterPath: "comp",
    mapper: {
        required: true,
        isConstant: true,
        serializedName: "comp",
        defaultValue: 'incrementalcopy',
        type: {
            name: "String"
        }
    }
};
export var comp15 = {
    parameterPath: "comp",
    mapper: {
        required: true,
        isConstant: true,
        serializedName: "comp",
        defaultValue: 'appendblock',
        type: {
            name: "String"
        }
    }
};
export var comp16 = {
    parameterPath: "comp",
    mapper: {
        required: true,
        isConstant: true,
        serializedName: "comp",
        defaultValue: 'block',
        type: {
            name: "String"
        }
    }
};
export var comp17 = {
    parameterPath: "comp",
    mapper: {
        required: true,
        isConstant: true,
        serializedName: "comp",
        defaultValue: 'blocklist',
        type: {
            name: "String"
        }
    }
};
export var comp2 = {
    parameterPath: "comp",
    mapper: {
        required: true,
        isConstant: true,
        serializedName: "comp",
        defaultValue: 'list',
        type: {
            name: "String"
        }
    }
};
export var comp3 = {
    parameterPath: "comp",
    mapper: {
        required: true,
        isConstant: true,
        serializedName: "comp",
        defaultValue: 'userdelegationkey',
        type: {
            name: "String"
        }
    }
};
export var comp4 = {
    parameterPath: "comp",
    mapper: {
        required: true,
        isConstant: true,
        serializedName: "comp",
        defaultValue: 'batch',
        type: {
            name: "String"
        }
    }
};
export var comp5 = {
    parameterPath: "comp",
    mapper: {
        required: true,
        isConstant: true,
        serializedName: "comp",
        defaultValue: 'metadata',
        type: {
            name: "String"
        }
    }
};
export var comp6 = {
    parameterPath: "comp",
    mapper: {
        required: true,
        isConstant: true,
        serializedName: "comp",
        defaultValue: 'acl',
        type: {
            name: "String"
        }
    }
};
export var comp7 = {
    parameterPath: "comp",
    mapper: {
        required: true,
        isConstant: true,
        serializedName: "comp",
        defaultValue: 'lease',
        type: {
            name: "String"
        }
    }
};
export var comp8 = {
    parameterPath: "comp",
    mapper: {
        required: true,
        isConstant: true,
        serializedName: "comp",
        defaultValue: 'undelete',
        type: {
            name: "String"
        }
    }
};
export var comp9 = {
    parameterPath: "comp",
    mapper: {
        required: true,
        isConstant: true,
        serializedName: "comp",
        defaultValue: 'snapshot',
        type: {
            name: "String"
        }
    }
};
export var contentDisposition = {
    parameterPath: [
        "options",
        "directoryHttpHeaders",
        "contentDisposition"
    ],
    mapper: {
        serializedName: "x-ms-content-disposition",
        type: {
            name: "String"
        }
    }
};
export var contentEncoding = {
    parameterPath: [
        "options",
        "directoryHttpHeaders",
        "contentEncoding"
    ],
    mapper: {
        serializedName: "x-ms-content-encoding",
        type: {
            name: "String"
        }
    }
};
export var contentLanguage = {
    parameterPath: [
        "options",
        "directoryHttpHeaders",
        "contentLanguage"
    ],
    mapper: {
        serializedName: "x-ms-content-language",
        type: {
            name: "String"
        }
    }
};
export var contentLength = {
    parameterPath: "contentLength",
    mapper: {
        required: true,
        serializedName: "Content-Length",
        type: {
            name: "Number"
        }
    }
};
export var contentType = {
    parameterPath: [
        "options",
        "directoryHttpHeaders",
        "contentType"
    ],
    mapper: {
        serializedName: "x-ms-content-type",
        type: {
            name: "String"
        }
    }
};
export var copyActionAbortConstant = {
    parameterPath: "copyActionAbortConstant",
    mapper: {
        required: true,
        isConstant: true,
        serializedName: "x-ms-copy-action",
        defaultValue: 'abort',
        type: {
            name: "String"
        }
    }
};
export var copyId = {
    parameterPath: "copyId",
    mapper: {
        required: true,
        serializedName: "copyid",
        type: {
            name: "String"
        }
    }
};
export var copySource = {
    parameterPath: "copySource",
    mapper: {
        required: true,
        serializedName: "x-ms-copy-source",
        type: {
            name: "String"
        }
    }
};
export var deleteSnapshots = {
    parameterPath: [
        "options",
        "deleteSnapshots"
    ],
    mapper: {
        serializedName: "x-ms-delete-snapshots",
        type: {
            name: "Enum",
            allowedValues: [
                "include",
                "only"
            ]
        }
    }
};
export var delimiter = {
    parameterPath: "delimiter",
    mapper: {
        required: true,
        serializedName: "delimiter",
        type: {
            name: "String"
        }
    }
};
export var directoryProperties = {
    parameterPath: [
        "options",
        "directoryProperties"
    ],
    mapper: {
        serializedName: "x-ms-properties",
        type: {
            name: "String"
        }
    }
};
export var duration = {
    parameterPath: [
        "options",
        "duration"
    ],
    mapper: {
        serializedName: "x-ms-lease-duration",
        type: {
            name: "Number"
        }
    }
};
export var encryptionAlgorithm = {
    parameterPath: [
        "options",
        "cpkInfo",
        "encryptionAlgorithm"
    ],
    mapper: {
        serializedName: "x-ms-encryption-algorithm",
        type: {
            name: "Enum",
            allowedValues: [
                "AES256"
            ]
        }
    }
};
export var encryptionKey = {
    parameterPath: [
        "options",
        "cpkInfo",
        "encryptionKey"
    ],
    mapper: {
        serializedName: "x-ms-encryption-key",
        type: {
            name: "String"
        }
    }
};
export var encryptionKeySha256 = {
    parameterPath: [
        "options",
        "cpkInfo",
        "encryptionKeySha256"
    ],
    mapper: {
        serializedName: "x-ms-encryption-key-sha256",
        type: {
            name: "String"
        }
    }
};
export var group = {
    parameterPath: [
        "options",
        "group"
    ],
    mapper: {
        serializedName: "x-ms-group",
        type: {
            name: "String"
        }
    }
};
export var ifMatch = {
    parameterPath: [
        "options",
        "modifiedAccessConditions",
        "ifMatch"
    ],
    mapper: {
        serializedName: "If-Match",
        type: {
            name: "String"
        }
    }
};
export var ifModifiedSince = {
    parameterPath: [
        "options",
        "modifiedAccessConditions",
        "ifModifiedSince"
    ],
    mapper: {
        serializedName: "If-Modified-Since",
        type: {
            name: "DateTimeRfc1123"
        }
    }
};
export var ifNoneMatch = {
    parameterPath: [
        "options",
        "modifiedAccessConditions",
        "ifNoneMatch"
    ],
    mapper: {
        serializedName: "If-None-Match",
        type: {
            name: "String"
        }
    }
};
export var ifSequenceNumberEqualTo = {
    parameterPath: [
        "options",
        "sequenceNumberAccessConditions",
        "ifSequenceNumberEqualTo"
    ],
    mapper: {
        serializedName: "x-ms-if-sequence-number-eq",
        type: {
            name: "Number"
        }
    }
};
export var ifSequenceNumberLessThan = {
    parameterPath: [
        "options",
        "sequenceNumberAccessConditions",
        "ifSequenceNumberLessThan"
    ],
    mapper: {
        serializedName: "x-ms-if-sequence-number-lt",
        type: {
            name: "Number"
        }
    }
};
export var ifSequenceNumberLessThanOrEqualTo = {
    parameterPath: [
        "options",
        "sequenceNumberAccessConditions",
        "ifSequenceNumberLessThanOrEqualTo"
    ],
    mapper: {
        serializedName: "x-ms-if-sequence-number-le",
        type: {
            name: "Number"
        }
    }
};
export var ifUnmodifiedSince = {
    parameterPath: [
        "options",
        "modifiedAccessConditions",
        "ifUnmodifiedSince"
    ],
    mapper: {
        serializedName: "If-Unmodified-Since",
        type: {
            name: "DateTimeRfc1123"
        }
    }
};
export var include0 = {
    parameterPath: [
        "options",
        "include"
    ],
    mapper: {
        serializedName: "include",
        type: {
            name: "Enum",
            allowedValues: [
                "metadata"
            ]
        }
    }
};
export var include1 = {
    parameterPath: [
        "options",
        "include"
    ],
    mapper: {
        serializedName: "include",
        type: {
            name: "Sequence",
            element: {
                type: {
                    name: "Enum",
                    allowedValues: [
                        "copy",
                        "deleted",
                        "metadata",
                        "snapshots",
                        "uncommittedblobs"
                    ]
                }
            }
        }
    },
    collectionFormat: coreHttp.QueryCollectionFormat.Csv
};
export var leaseId0 = {
    parameterPath: [
        "options",
        "leaseAccessConditions",
        "leaseId"
    ],
    mapper: {
        serializedName: "x-ms-lease-id",
        type: {
            name: "String"
        }
    }
};
export var leaseId1 = {
    parameterPath: "leaseId",
    mapper: {
        required: true,
        serializedName: "x-ms-lease-id",
        type: {
            name: "String"
        }
    }
};
export var listType = {
    parameterPath: "listType",
    mapper: {
        required: true,
        serializedName: "blocklisttype",
        defaultValue: 'committed',
        type: {
            name: "Enum",
            allowedValues: [
                "committed",
                "uncommitted",
                "all"
            ]
        }
    }
};
export var marker0 = {
    parameterPath: [
        "options",
        "marker"
    ],
    mapper: {
        serializedName: "marker",
        type: {
            name: "String"
        }
    }
};
export var marker1 = {
    parameterPath: [
        "options",
        "marker"
    ],
    mapper: {
        serializedName: "continuation",
        type: {
            name: "String"
        }
    }
};
export var maxresults = {
    parameterPath: [
        "options",
        "maxresults"
    ],
    mapper: {
        serializedName: "maxresults",
        constraints: {
            InclusiveMinimum: 1
        },
        type: {
            name: "Number"
        }
    }
};
export var maxSize = {
    parameterPath: [
        "options",
        "appendPositionAccessConditions",
        "maxSize"
    ],
    mapper: {
        serializedName: "x-ms-blob-condition-maxsize",
        type: {
            name: "Number"
        }
    }
};
export var metadata = {
    parameterPath: [
        "options",
        "metadata"
    ],
    mapper: {
        serializedName: "x-ms-meta",
        type: {
            name: "Dictionary",
            value: {
                type: {
                    name: "String"
                }
            }
        },
        headerCollectionPrefix: "x-ms-meta-"
    }
};
export var multipartContentType = {
    parameterPath: "multipartContentType",
    mapper: {
        required: true,
        serializedName: "Content-Type",
        type: {
            name: "String"
        }
    }
};
export var owner = {
    parameterPath: [
        "options",
        "owner"
    ],
    mapper: {
        serializedName: "x-ms-owner",
        type: {
            name: "String"
        }
    }
};
export var pageWrite0 = {
    parameterPath: "pageWrite",
    mapper: {
        required: true,
        isConstant: true,
        serializedName: "x-ms-page-write",
        defaultValue: 'update',
        type: {
            name: "String"
        }
    }
};
export var pageWrite1 = {
    parameterPath: "pageWrite",
    mapper: {
        required: true,
        isConstant: true,
        serializedName: "x-ms-page-write",
        defaultValue: 'clear',
        type: {
            name: "String"
        }
    }
};
export var pathRenameMode = {
    parameterPath: "pathRenameMode",
    mapper: {
        serializedName: "mode",
        type: {
            name: "Enum",
            allowedValues: [
                "legacy",
                "posix"
            ]
        }
    }
};
export var posixAcl = {
    parameterPath: [
        "options",
        "posixAcl"
    ],
    mapper: {
        serializedName: "x-ms-acl",
        type: {
            name: "String"
        }
    }
};
export var posixPermissions = {
    parameterPath: [
        "options",
        "posixPermissions"
    ],
    mapper: {
        serializedName: "x-ms-permissions",
        type: {
            name: "String"
        }
    }
};
export var posixUmask = {
    parameterPath: [
        "options",
        "posixUmask"
    ],
    mapper: {
        serializedName: "x-ms-umask",
        type: {
            name: "String"
        }
    }
};
export var prefix = {
    parameterPath: [
        "options",
        "prefix"
    ],
    mapper: {
        serializedName: "prefix",
        type: {
            name: "String"
        }
    }
};
export var prevsnapshot = {
    parameterPath: [
        "options",
        "prevsnapshot"
    ],
    mapper: {
        serializedName: "prevsnapshot",
        type: {
            name: "String"
        }
    }
};
export var proposedLeaseId0 = {
    parameterPath: [
        "options",
        "proposedLeaseId"
    ],
    mapper: {
        serializedName: "x-ms-proposed-lease-id",
        type: {
            name: "String"
        }
    }
};
export var proposedLeaseId1 = {
    parameterPath: "proposedLeaseId",
    mapper: {
        required: true,
        serializedName: "x-ms-proposed-lease-id",
        type: {
            name: "String"
        }
    }
};
export var range0 = {
    parameterPath: [
        "options",
        "range"
    ],
    mapper: {
        serializedName: "x-ms-range",
        type: {
            name: "String"
        }
    }
};
export var range1 = {
    parameterPath: "range",
    mapper: {
        required: true,
        serializedName: "x-ms-range",
        type: {
            name: "String"
        }
    }
};
export var rangeGetContentCRC64 = {
    parameterPath: [
        "options",
        "rangeGetContentCRC64"
    ],
    mapper: {
        serializedName: "x-ms-range-get-content-crc64",
        type: {
            name: "Boolean"
        }
    }
};
export var rangeGetContentMD5 = {
    parameterPath: [
        "options",
        "rangeGetContentMD5"
    ],
    mapper: {
        serializedName: "x-ms-range-get-content-md5",
        type: {
            name: "Boolean"
        }
    }
};
export var recursiveDirectoryDelete = {
    parameterPath: "recursiveDirectoryDelete",
    mapper: {
        required: true,
        serializedName: "recursive",
        type: {
            name: "Boolean"
        }
    }
};
export var rehydratePriority = {
    parameterPath: [
        "options",
        "rehydratePriority"
    ],
    mapper: {
        serializedName: "x-ms-rehydrate-priority",
        type: {
            name: "String"
        }
    }
};
export var renameSource = {
    parameterPath: "renameSource",
    mapper: {
        required: true,
        serializedName: "x-ms-rename-source",
        type: {
            name: "String"
        }
    }
};
export var requestId = {
    parameterPath: [
        "options",
        "requestId"
    ],
    mapper: {
        serializedName: "x-ms-client-request-id",
        type: {
            name: "String"
        }
    }
};
export var resource = {
    parameterPath: "resource",
    mapper: {
        required: true,
        isConstant: true,
        serializedName: "resource",
        defaultValue: 'directory',
        type: {
            name: "String"
        }
    }
};
export var restype0 = {
    parameterPath: "restype",
    mapper: {
        required: true,
        isConstant: true,
        serializedName: "restype",
        defaultValue: 'service',
        type: {
            name: "String"
        }
    }
};
export var restype1 = {
    parameterPath: "restype",
    mapper: {
        required: true,
        isConstant: true,
        serializedName: "restype",
        defaultValue: 'account',
        type: {
            name: "String"
        }
    }
};
export var restype2 = {
    parameterPath: "restype",
    mapper: {
        required: true,
        isConstant: true,
        serializedName: "restype",
        defaultValue: 'container',
        type: {
            name: "String"
        }
    }
};
export var sequenceNumberAction = {
    parameterPath: "sequenceNumberAction",
    mapper: {
        required: true,
        serializedName: "x-ms-sequence-number-action",
        type: {
            name: "Enum",
            allowedValues: [
                "max",
                "update",
                "increment"
            ]
        }
    }
};
export var snapshot = {
    parameterPath: [
        "options",
        "snapshot"
    ],
    mapper: {
        serializedName: "snapshot",
        type: {
            name: "String"
        }
    }
};
export var sourceContentCrc64 = {
    parameterPath: [
        "options",
        "sourceContentCrc64"
    ],
    mapper: {
        serializedName: "x-ms-source-content-crc64",
        type: {
            name: "ByteArray"
        }
    }
};
export var sourceContentMD5 = {
    parameterPath: [
        "options",
        "sourceContentMD5"
    ],
    mapper: {
        serializedName: "x-ms-source-content-md5",
        type: {
            name: "ByteArray"
        }
    }
};
export var sourceIfMatch = {
    parameterPath: [
        "options",
        "sourceModifiedAccessConditions",
        "sourceIfMatch"
    ],
    mapper: {
        serializedName: "x-ms-source-if-match",
        type: {
            name: "String"
        }
    }
};
export var sourceIfModifiedSince = {
    parameterPath: [
        "options",
        "sourceModifiedAccessConditions",
        "sourceIfModifiedSince"
    ],
    mapper: {
        serializedName: "x-ms-source-if-modified-since",
        type: {
            name: "DateTimeRfc1123"
        }
    }
};
export var sourceIfNoneMatch = {
    parameterPath: [
        "options",
        "sourceModifiedAccessConditions",
        "sourceIfNoneMatch"
    ],
    mapper: {
        serializedName: "x-ms-source-if-none-match",
        type: {
            name: "String"
        }
    }
};
export var sourceIfUnmodifiedSince = {
    parameterPath: [
        "options",
        "sourceModifiedAccessConditions",
        "sourceIfUnmodifiedSince"
    ],
    mapper: {
        serializedName: "x-ms-source-if-unmodified-since",
        type: {
            name: "DateTimeRfc1123"
        }
    }
};
export var sourceLeaseId = {
    parameterPath: [
        "options",
        "sourceLeaseId"
    ],
    mapper: {
        serializedName: "x-ms-source-lease-id",
        type: {
            name: "String"
        }
    }
};
export var sourceRange0 = {
    parameterPath: "sourceRange",
    mapper: {
        required: true,
        serializedName: "x-ms-source-range",
        type: {
            name: "String"
        }
    }
};
export var sourceRange1 = {
    parameterPath: [
        "options",
        "sourceRange"
    ],
    mapper: {
        serializedName: "x-ms-source-range",
        type: {
            name: "String"
        }
    }
};
export var sourceUrl = {
    parameterPath: "sourceUrl",
    mapper: {
        required: true,
        serializedName: "x-ms-copy-source",
        type: {
            name: "String"
        }
    }
};
export var tier0 = {
    parameterPath: [
        "options",
        "tier"
    ],
    mapper: {
        serializedName: "x-ms-access-tier",
        type: {
            name: "String"
        }
    }
};
export var tier1 = {
    parameterPath: "tier",
    mapper: {
        required: true,
        serializedName: "x-ms-access-tier",
        type: {
            name: "String"
        }
    }
};
export var timeout = {
    parameterPath: [
        "options",
        "timeout"
    ],
    mapper: {
        serializedName: "timeout",
        constraints: {
            InclusiveMinimum: 0
        },
        type: {
            name: "Number"
        }
    }
};
export var transactionalContentCrc64 = {
    parameterPath: [
        "options",
        "transactionalContentCrc64"
    ],
    mapper: {
        serializedName: "x-ms-content-crc64",
        type: {
            name: "ByteArray"
        }
    }
};
export var transactionalContentMD5 = {
    parameterPath: [
        "options",
        "transactionalContentMD5"
    ],
    mapper: {
        serializedName: "Content-MD5",
        type: {
            name: "ByteArray"
        }
    }
};
export var upn = {
    parameterPath: [
        "options",
        "upn"
    ],
    mapper: {
        serializedName: "upn",
        type: {
            name: "Boolean"
        }
    }
};
export var url = {
    parameterPath: "url",
    mapper: {
        required: true,
        serializedName: "url",
        defaultValue: '',
        type: {
            name: "String"
        }
    },
    skipEncoding: true
};
export var version = {
    parameterPath: "version",
    mapper: {
        required: true,
        isConstant: true,
        serializedName: "x-ms-version",
        defaultValue: '2019-02-02',
        type: {
            name: "String"
        }
    }
};
export var xMsRequiresSync = {
    parameterPath: "xMsRequiresSync",
    mapper: {
        required: true,
        isConstant: true,
        serializedName: "x-ms-requires-sync",
        defaultValue: 'true',
        type: {
            name: "String"
        }
    }
};
//# sourceMappingURL=parameters.js.map