// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { isNode } from "@azure/core-http";
import { RetriableReadableStream } from "./utils/RetriableReadableStream";
/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * BlobDownloadResponse implements Models.BlobDownloadResponse interface, and in Node.js runtime it will
 * automatically retry when internal read stream unexpected ends. (This kind of unexpected ends cannot
 * trigger retries defined in pipeline retry policy.)
 *
 * The readableStreamBody stream will retry underlayer, you can just use it as a normal Node.js
 * Readable stream.
 *
 * @export
 * @class BlobDownloadResponse
 * @implements {Models.BlobDownloadResponse}
 */
var BlobDownloadResponse = /** @class */ (function () {
    /**
     * Creates an instance of BlobDownloadResponse.
     *
     * @param {Models.BlobDownloadResponse} originalResponse
     * @param {ReadableStreamGetter} getter
     * @param {number} offset
     * @param {number} count
     * @param {RetriableReadableStreamOptions} [options={}]
     * @memberof BlobDownloadResponse
     */
    function BlobDownloadResponse(originalResponse, getter, offset, count, options) {
        if (options === void 0) { options = {}; }
        this.originalResponse = originalResponse;
        this.blobDownloadStream = new RetriableReadableStream(this.originalResponse.readableStreamBody, getter, offset, count, options);
    }
    Object.defineProperty(BlobDownloadResponse.prototype, "acceptRanges", {
        /**
         * Indicates that the service supports
         * requests for partial file content.
         *
         * @readonly
         * @type {(string | undefined)}
         * @memberof BlobDownloadResponse
         */
        get: function () {
            return this.originalResponse.acceptRanges;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BlobDownloadResponse.prototype, "cacheControl", {
        /**
         * Returns if it was previously specified
         * for the file.
         *
         * @readonly
         * @type {(string | undefined)}
         * @memberof BlobDownloadResponse
         */
        get: function () {
            return this.originalResponse.cacheControl;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BlobDownloadResponse.prototype, "contentDisposition", {
        /**
         * Returns the value that was specified
         * for the 'x-ms-content-disposition' header and specifies how to process the
         * response.
         *
         * @readonly
         * @type {(string | undefined)}
         * @memberof BlobDownloadResponse
         */
        get: function () {
            return this.originalResponse.contentDisposition;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BlobDownloadResponse.prototype, "contentEncoding", {
        /**
         * Returns the value that was specified
         * for the Content-Encoding request header.
         *
         * @readonly
         * @type {(string | undefined)}
         * @memberof BlobDownloadResponse
         */
        get: function () {
            return this.originalResponse.contentEncoding;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BlobDownloadResponse.prototype, "contentLanguage", {
        /**
         * Returns the value that was specified
         * for the Content-Language request header.
         *
         * @readonly
         * @type {(string | undefined)}
         * @memberof BlobDownloadResponse
         */
        get: function () {
            return this.originalResponse.contentLanguage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BlobDownloadResponse.prototype, "blobSequenceNumber", {
        /**
         * The current sequence number for a
         * page blob. This header is not returned for block blobs or append blobs.
         *
         * @readonly
         * @type {(number | undefined)}
         * @memberof BlobDownloadResponse
         */
        get: function () {
            return this.originalResponse.blobSequenceNumber;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BlobDownloadResponse.prototype, "blobType", {
        /**
         * The blob's type. Possible values include:
         * 'BlockBlob', 'PageBlob', 'AppendBlob'.
         *
         * @readonly
         * @type {(Models.BlobType | undefined)}
         * @memberof BlobDownloadResponse
         */
        get: function () {
            return this.originalResponse.blobType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BlobDownloadResponse.prototype, "contentLength", {
        /**
         * The number of bytes present in the
         * response body.
         *
         * @readonly
         * @type {(number | undefined)}
         * @memberof BlobDownloadResponse
         */
        get: function () {
            return this.originalResponse.contentLength;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BlobDownloadResponse.prototype, "contentMD5", {
        /**
         * If the file has an MD5 hash and the
         * request is to read the full file, this response header is returned so that
         * the client can check for message content integrity. If the request is to
         * read a specified range and the 'x-ms-range-get-content-md5' is set to
         * true, then the request returns an MD5 hash for the range, as long as the
         * range size is less than or equal to 4 MB. If neither of these sets of
         * conditions is true, then no value is returned for the 'Content-MD5'
         * header.
         *
         * @readonly
         * @type {(Uint8Array | undefined)}
         * @memberof BlobDownloadResponse
         */
        get: function () {
            return this.originalResponse.contentMD5;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BlobDownloadResponse.prototype, "contentRange", {
        /**
         * Indicates the range of bytes returned if
         * the client requested a subset of the file by setting the Range request
         * header.
         *
         * @readonly
         * @type {(string | undefined)}
         * @memberof BlobDownloadResponse
         */
        get: function () {
            return this.originalResponse.contentRange;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BlobDownloadResponse.prototype, "contentType", {
        /**
         * The content type specified for the file.
         * The default content type is 'application/octet-stream'
         *
         * @readonly
         * @type {(string | undefined)}
         * @memberof BlobDownloadResponse
         */
        get: function () {
            return this.originalResponse.contentType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BlobDownloadResponse.prototype, "copyCompletionTime", {
        /**
         * Conclusion time of the last attempted
         * Copy File operation where this file was the destination file. This value
         * can specify the time of a completed, aborted, or failed copy attempt.
         *
         * @readonly
         * @type {(Date | undefined)}
         * @memberof BlobDownloadResponse
         */
        get: function () {
            return this.originalResponse.copyCompletionTime;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BlobDownloadResponse.prototype, "copyId", {
        /**
         * String identifier for the last attempted Copy
         * File operation where this file was the destination file.
         *
         * @readonly
         * @type {(string | undefined)}
         * @memberof BlobDownloadResponse
         */
        get: function () {
            return this.originalResponse.copyId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BlobDownloadResponse.prototype, "copyProgress", {
        /**
         * Contains the number of bytes copied and
         * the total bytes in the source in the last attempted Copy File operation
         * where this file was the destination file. Can show between 0 and
         * Content-Length bytes copied.
         *
         * @readonly
         * @type {(string | undefined)}
         * @memberof BlobDownloadResponse
         */
        get: function () {
            return this.originalResponse.copyProgress;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BlobDownloadResponse.prototype, "copySource", {
        /**
         * URL up to 2KB in length that specifies the
         * source file used in the last attempted Copy File operation where this file
         * was the destination file.
         *
         * @readonly
         * @type {(string | undefined)}
         * @memberof BlobDownloadResponse
         */
        get: function () {
            return this.originalResponse.copySource;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BlobDownloadResponse.prototype, "copyStatus", {
        /**
         * State of the copy operation
         * identified by 'x-ms-copy-id'. Possible values include: 'pending',
         * 'success', 'aborted', 'failed'
         *
         * @readonly
         * @type {(Models.CopyStatusType | undefined)}
         * @memberof BlobDownloadResponse
         */
        get: function () {
            return this.originalResponse.copyStatus;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BlobDownloadResponse.prototype, "copyStatusDescription", {
        /**
         * Only appears when
         * x-ms-copy-status is failed or pending. Describes cause of fatal or
         * non-fatal copy operation failure.
         *
         * @readonly
         * @type {(string | undefined)}
         * @memberof BlobDownloadResponse
         */
        get: function () {
            return this.originalResponse.copyStatusDescription;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BlobDownloadResponse.prototype, "leaseDuration", {
        /**
         * When a blob is leased,
         * specifies whether the lease is of infinite or fixed duration. Possible
         * values include: 'infinite', 'fixed'.
         *
         * @readonly
         * @type {(Models.LeaseDurationType | undefined)}
         * @memberof BlobDownloadResponse
         */
        get: function () {
            return this.originalResponse.leaseDuration;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BlobDownloadResponse.prototype, "leaseState", {
        /**
         * Lease state of the blob. Possible
         * values include: 'available', 'leased', 'expired', 'breaking', 'broken'.
         *
         * @readonly
         * @type {(Models.LeaseStateType | undefined)}
         * @memberof BlobDownloadResponse
         */
        get: function () {
            return this.originalResponse.leaseState;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BlobDownloadResponse.prototype, "leaseStatus", {
        /**
         * The current lease status of the
         * blob. Possible values include: 'locked', 'unlocked'.
         *
         * @readonly
         * @type {(Models.LeaseStatusType | undefined)}
         * @memberof BlobDownloadResponse
         */
        get: function () {
            return this.originalResponse.leaseStatus;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BlobDownloadResponse.prototype, "date", {
        /**
         * A UTC date/time value generated by the service that
         * indicates the time at which the response was initiated.
         *
         * @readonly
         * @type {(Date | undefined)}
         * @memberof BlobDownloadResponse
         */
        get: function () {
            return this.originalResponse.date;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BlobDownloadResponse.prototype, "blobCommittedBlockCount", {
        /**
         * The number of committed blocks
         * present in the blob. This header is returned only for append blobs.
         *
         * @readonly
         * @type {(number | undefined)}
         * @memberof BlobDownloadResponse
         */
        get: function () {
            return this.originalResponse.blobCommittedBlockCount;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BlobDownloadResponse.prototype, "eTag", {
        /**
         * The ETag contains a value that you can use to
         * perform operations conditionally, in quotes.
         *
         * @readonly
         * @type {(string | undefined)}
         * @memberof BlobDownloadResponse
         */
        get: function () {
            return this.originalResponse.eTag;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BlobDownloadResponse.prototype, "errorCode", {
        get: function () {
            return this.originalResponse.errorCode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BlobDownloadResponse.prototype, "isServerEncrypted", {
        /**
         * The value of this header is set to
         * true if the file data and application metadata are completely encrypted
         * using the specified algorithm. Otherwise, the value is set to false (when
         * the file is unencrypted, or if only parts of the file/application metadata
         * are encrypted).
         *
         * @readonly
         * @type {(boolean | undefined)}
         * @memberof BlobDownloadResponse
         */
        get: function () {
            return this.originalResponse.isServerEncrypted;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BlobDownloadResponse.prototype, "blobContentMD5", {
        /**
         * If the blob has a MD5 hash, and if
         * request contains range header (Range or x-ms-range), this response header
         * is returned with the value of the whole blob's MD5 value. This value may
         * or may not be equal to the value returned in Content-MD5 header, with the
         * latter calculated from the requested range.
         *
         * @readonly
         * @type {(Uint8Array | undefined)}
         * @memberof BlobDownloadResponse
         */
        get: function () {
            return this.originalResponse.blobContentMD5;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BlobDownloadResponse.prototype, "lastModified", {
        /**
         * Returns the date and time the file was last
         * modified. Any operation that modifies the file or its properties updates
         * the last modified time.
         *
         * @readonly
         * @type {(Date | undefined)}
         * @memberof BlobDownloadResponse
         */
        get: function () {
            return this.originalResponse.lastModified;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BlobDownloadResponse.prototype, "metadata", {
        /**
         * A name-value pair
         * to associate with a file storage object.
         *
         * @readonly
         * @type {(Metadata | undefined)}
         * @memberof BlobDownloadResponse
         */
        get: function () {
            return this.originalResponse.metadata;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BlobDownloadResponse.prototype, "requestId", {
        /**
         * This header uniquely identifies the request
         * that was made and can be used for troubleshooting the request.
         *
         * @readonly
         * @type {(string | undefined)}
         * @memberof BlobDownloadResponse
         */
        get: function () {
            return this.originalResponse.requestId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BlobDownloadResponse.prototype, "clientRequestId", {
        /**
         * If a client request id header is sent in the request, this header will be present in the
         * response with the same value.
         *
         * @readonly
         * @type {(string | undefined)}
         * @memberof BlobDownloadResponse
         */
        get: function () {
            return this.originalResponse.clientRequestId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BlobDownloadResponse.prototype, "version", {
        /**
         * Indicates the version of the File service used
         * to execute the request.
         *
         * @readonly
         * @type {(string | undefined)}
         * @memberof BlobDownloadResponse
         */
        get: function () {
            return this.originalResponse.version;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BlobDownloadResponse.prototype, "encryptionKeySha256", {
        /**
         * The SHA-256 hash of the encryption key used to encrypt the blob. This value is only returned
         * when the blob was encrypted with a customer-provided key.
         *
         * @readonly
         * @type {(string | undefined)}
         * @memberof BlobDownloadResponse
         */
        get: function () {
            return this.originalResponse.encryptionKeySha256;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BlobDownloadResponse.prototype, "contentCrc64", {
        /**
         * If the request is to read a specified range and the x-ms-range-get-content-crc64 is set to
         * true, then the request returns a crc64 for the range, as long as the range size is less than
         * or equal to 4 MB. If both x-ms-range-get-content-crc64 & x-ms-range-get-content-md5 is
         * specified in the same request, it will fail with 400(Bad Request)
         */
        get: function () {
            return this.originalResponse.contentCrc64;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BlobDownloadResponse.prototype, "blobBody", {
        /**
         * The response body as a browser Blob.
         * Always undefined in node.js.
         *
         * @readonly
         * @type {(Promise<Blob> | undefined)}
         * @memberof BlobDownloadResponse
         */
        get: function () {
            return this.originalResponse.blobBody;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BlobDownloadResponse.prototype, "readableStreamBody", {
        /**
         * The response body as a node.js Readable stream.
         * Always undefined in the browser.
         *
         * It will automatically retry when internal read stream unexpected ends.
         *
         * @readonly
         * @type {(NodeJS.ReadableStream | undefined)}
         * @memberof BlobDownloadResponse
         */
        get: function () {
            return isNode ? this.blobDownloadStream : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BlobDownloadResponse.prototype, "_response", {
        get: function () {
            return this.originalResponse._response;
        },
        enumerable: true,
        configurable: true
    });
    return BlobDownloadResponse;
}());
export { BlobDownloadResponse };
//# sourceMappingURL=BlobDownloadResponse.js.map