/// <reference types="node" />
import { HttpResponse } from "@azure/core-http";
import * as Models from "./generated/src/models";
import { Metadata } from "./models";
import { RetriableReadableStreamOptions } from "./utils/RetriableReadableStream";
import { ReadableStreamGetter } from "./utils/RetriableReadableStream";
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
export declare class BlobDownloadResponse implements Models.BlobDownloadResponse {
    /**
     * Indicates that the service supports
     * requests for partial file content.
     *
     * @readonly
     * @type {(string | undefined)}
     * @memberof BlobDownloadResponse
     */
    readonly acceptRanges: string | undefined;
    /**
     * Returns if it was previously specified
     * for the file.
     *
     * @readonly
     * @type {(string | undefined)}
     * @memberof BlobDownloadResponse
     */
    readonly cacheControl: string | undefined;
    /**
     * Returns the value that was specified
     * for the 'x-ms-content-disposition' header and specifies how to process the
     * response.
     *
     * @readonly
     * @type {(string | undefined)}
     * @memberof BlobDownloadResponse
     */
    readonly contentDisposition: string | undefined;
    /**
     * Returns the value that was specified
     * for the Content-Encoding request header.
     *
     * @readonly
     * @type {(string | undefined)}
     * @memberof BlobDownloadResponse
     */
    readonly contentEncoding: string | undefined;
    /**
     * Returns the value that was specified
     * for the Content-Language request header.
     *
     * @readonly
     * @type {(string | undefined)}
     * @memberof BlobDownloadResponse
     */
    readonly contentLanguage: string | undefined;
    /**
     * The current sequence number for a
     * page blob. This header is not returned for block blobs or append blobs.
     *
     * @readonly
     * @type {(number | undefined)}
     * @memberof BlobDownloadResponse
     */
    readonly blobSequenceNumber: number | undefined;
    /**
     * The blob's type. Possible values include:
     * 'BlockBlob', 'PageBlob', 'AppendBlob'.
     *
     * @readonly
     * @type {(Models.BlobType | undefined)}
     * @memberof BlobDownloadResponse
     */
    readonly blobType: Models.BlobType | undefined;
    /**
     * The number of bytes present in the
     * response body.
     *
     * @readonly
     * @type {(number | undefined)}
     * @memberof BlobDownloadResponse
     */
    readonly contentLength: number | undefined;
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
    readonly contentMD5: Uint8Array | undefined;
    /**
     * Indicates the range of bytes returned if
     * the client requested a subset of the file by setting the Range request
     * header.
     *
     * @readonly
     * @type {(string | undefined)}
     * @memberof BlobDownloadResponse
     */
    readonly contentRange: string | undefined;
    /**
     * The content type specified for the file.
     * The default content type is 'application/octet-stream'
     *
     * @readonly
     * @type {(string | undefined)}
     * @memberof BlobDownloadResponse
     */
    readonly contentType: string | undefined;
    /**
     * Conclusion time of the last attempted
     * Copy File operation where this file was the destination file. This value
     * can specify the time of a completed, aborted, or failed copy attempt.
     *
     * @readonly
     * @type {(Date | undefined)}
     * @memberof BlobDownloadResponse
     */
    readonly copyCompletionTime: Date | undefined;
    /**
     * String identifier for the last attempted Copy
     * File operation where this file was the destination file.
     *
     * @readonly
     * @type {(string | undefined)}
     * @memberof BlobDownloadResponse
     */
    readonly copyId: string | undefined;
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
    readonly copyProgress: string | undefined;
    /**
     * URL up to 2KB in length that specifies the
     * source file used in the last attempted Copy File operation where this file
     * was the destination file.
     *
     * @readonly
     * @type {(string | undefined)}
     * @memberof BlobDownloadResponse
     */
    readonly copySource: string | undefined;
    /**
     * State of the copy operation
     * identified by 'x-ms-copy-id'. Possible values include: 'pending',
     * 'success', 'aborted', 'failed'
     *
     * @readonly
     * @type {(Models.CopyStatusType | undefined)}
     * @memberof BlobDownloadResponse
     */
    readonly copyStatus: Models.CopyStatusType | undefined;
    /**
     * Only appears when
     * x-ms-copy-status is failed or pending. Describes cause of fatal or
     * non-fatal copy operation failure.
     *
     * @readonly
     * @type {(string | undefined)}
     * @memberof BlobDownloadResponse
     */
    readonly copyStatusDescription: string | undefined;
    /**
     * When a blob is leased,
     * specifies whether the lease is of infinite or fixed duration. Possible
     * values include: 'infinite', 'fixed'.
     *
     * @readonly
     * @type {(Models.LeaseDurationType | undefined)}
     * @memberof BlobDownloadResponse
     */
    readonly leaseDuration: Models.LeaseDurationType | undefined;
    /**
     * Lease state of the blob. Possible
     * values include: 'available', 'leased', 'expired', 'breaking', 'broken'.
     *
     * @readonly
     * @type {(Models.LeaseStateType | undefined)}
     * @memberof BlobDownloadResponse
     */
    readonly leaseState: Models.LeaseStateType | undefined;
    /**
     * The current lease status of the
     * blob. Possible values include: 'locked', 'unlocked'.
     *
     * @readonly
     * @type {(Models.LeaseStatusType | undefined)}
     * @memberof BlobDownloadResponse
     */
    readonly leaseStatus: Models.LeaseStatusType | undefined;
    /**
     * A UTC date/time value generated by the service that
     * indicates the time at which the response was initiated.
     *
     * @readonly
     * @type {(Date | undefined)}
     * @memberof BlobDownloadResponse
     */
    readonly date: Date | undefined;
    /**
     * The number of committed blocks
     * present in the blob. This header is returned only for append blobs.
     *
     * @readonly
     * @type {(number | undefined)}
     * @memberof BlobDownloadResponse
     */
    readonly blobCommittedBlockCount: number | undefined;
    /**
     * The ETag contains a value that you can use to
     * perform operations conditionally, in quotes.
     *
     * @readonly
     * @type {(string | undefined)}
     * @memberof BlobDownloadResponse
     */
    readonly eTag: string | undefined;
    readonly errorCode: string | undefined;
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
    readonly isServerEncrypted: boolean | undefined;
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
    readonly blobContentMD5: Uint8Array | undefined;
    /**
     * Returns the date and time the file was last
     * modified. Any operation that modifies the file or its properties updates
     * the last modified time.
     *
     * @readonly
     * @type {(Date | undefined)}
     * @memberof BlobDownloadResponse
     */
    readonly lastModified: Date | undefined;
    /**
     * A name-value pair
     * to associate with a file storage object.
     *
     * @readonly
     * @type {(Metadata | undefined)}
     * @memberof BlobDownloadResponse
     */
    readonly metadata: Metadata | undefined;
    /**
     * This header uniquely identifies the request
     * that was made and can be used for troubleshooting the request.
     *
     * @readonly
     * @type {(string | undefined)}
     * @memberof BlobDownloadResponse
     */
    readonly requestId: string | undefined;
    /**
     * If a client request id header is sent in the request, this header will be present in the
     * response with the same value.
     *
     * @readonly
     * @type {(string | undefined)}
     * @memberof BlobDownloadResponse
     */
    readonly clientRequestId: string | undefined;
    /**
     * Indicates the version of the File service used
     * to execute the request.
     *
     * @readonly
     * @type {(string | undefined)}
     * @memberof BlobDownloadResponse
     */
    readonly version: string | undefined;
    /**
     * The SHA-256 hash of the encryption key used to encrypt the blob. This value is only returned
     * when the blob was encrypted with a customer-provided key.
     *
     * @readonly
     * @type {(string | undefined)}
     * @memberof BlobDownloadResponse
     */
    readonly encryptionKeySha256: string | undefined;
    /**
     * If the request is to read a specified range and the x-ms-range-get-content-crc64 is set to
     * true, then the request returns a crc64 for the range, as long as the range size is less than
     * or equal to 4 MB. If both x-ms-range-get-content-crc64 & x-ms-range-get-content-md5 is
     * specified in the same request, it will fail with 400(Bad Request)
     */
    readonly contentCrc64: Uint8Array | undefined;
    /**
     * The response body as a browser Blob.
     * Always undefined in node.js.
     *
     * @readonly
     * @type {(Promise<Blob> | undefined)}
     * @memberof BlobDownloadResponse
     */
    readonly blobBody: Promise<Blob> | undefined;
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
    readonly readableStreamBody: NodeJS.ReadableStream | undefined;
    readonly _response: HttpResponse & {
        parsedHeaders: Models.BlobDownloadHeaders;
    };
    private originalResponse;
    private blobDownloadStream?;
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
    constructor(originalResponse: Models.BlobDownloadResponse, getter: ReadableStreamGetter, offset: number, count: number, options?: RetriableReadableStreamOptions);
}
//# sourceMappingURL=BlobDownloadResponse.d.ts.map