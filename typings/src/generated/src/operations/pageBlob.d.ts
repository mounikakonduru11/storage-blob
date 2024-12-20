import * as coreHttp from "@azure/core-http";
import * as Models from "../models";
import { StorageClientContext } from "../storageClientContext";
/** Class representing a PageBlob. */
export declare class PageBlob {
    private readonly client;
    /**
     * Create a PageBlob.
     * @param {StorageClientContext} client Reference to the service client.
     */
    constructor(client: StorageClientContext);
    /**
     * The Create operation creates a new page blob.
     * @param contentLength The length of the request.
     * @param blobContentLength This header specifies the maximum size for the page blob, up to 1 TB.
     * The page blob size must be aligned to a 512-byte boundary.
     * @param [options] The optional parameters
     * @returns Promise<Models.PageBlobCreateResponse>
     */
    create(contentLength: number, blobContentLength: number, options?: Models.PageBlobCreateOptionalParams): Promise<Models.PageBlobCreateResponse>;
    /**
     * @param contentLength The length of the request.
     * @param blobContentLength This header specifies the maximum size for the page blob, up to 1 TB.
     * The page blob size must be aligned to a 512-byte boundary.
     * @param callback The callback
     */
    create(contentLength: number, blobContentLength: number, callback: coreHttp.ServiceCallback<void>): void;
    /**
     * @param contentLength The length of the request.
     * @param blobContentLength This header specifies the maximum size for the page blob, up to 1 TB.
     * The page blob size must be aligned to a 512-byte boundary.
     * @param options The optional parameters
     * @param callback The callback
     */
    create(contentLength: number, blobContentLength: number, options: Models.PageBlobCreateOptionalParams, callback: coreHttp.ServiceCallback<void>): void;
    /**
     * The Upload Pages operation writes a range of pages to a page blob
     * @param body Initial data
     * @param contentLength The length of the request.
     * @param [options] The optional parameters
     * @returns Promise<Models.PageBlobUploadPagesResponse>
     */
    uploadPages(body: coreHttp.HttpRequestBody, contentLength: number, options?: Models.PageBlobUploadPagesOptionalParams): Promise<Models.PageBlobUploadPagesResponse>;
    /**
     * @param body Initial data
     * @param contentLength The length of the request.
     * @param callback The callback
     */
    uploadPages(body: coreHttp.HttpRequestBody, contentLength: number, callback: coreHttp.ServiceCallback<void>): void;
    /**
     * @param body Initial data
     * @param contentLength The length of the request.
     * @param options The optional parameters
     * @param callback The callback
     */
    uploadPages(body: coreHttp.HttpRequestBody, contentLength: number, options: Models.PageBlobUploadPagesOptionalParams, callback: coreHttp.ServiceCallback<void>): void;
    /**
     * The Clear Pages operation clears a set of pages from a page blob
     * @param contentLength The length of the request.
     * @param [options] The optional parameters
     * @returns Promise<Models.PageBlobClearPagesResponse>
     */
    clearPages(contentLength: number, options?: Models.PageBlobClearPagesOptionalParams): Promise<Models.PageBlobClearPagesResponse>;
    /**
     * @param contentLength The length of the request.
     * @param callback The callback
     */
    clearPages(contentLength: number, callback: coreHttp.ServiceCallback<void>): void;
    /**
     * @param contentLength The length of the request.
     * @param options The optional parameters
     * @param callback The callback
     */
    clearPages(contentLength: number, options: Models.PageBlobClearPagesOptionalParams, callback: coreHttp.ServiceCallback<void>): void;
    /**
     * The Upload Pages operation writes a range of pages to a page blob where the contents are read
     * from a URL
     * @param sourceUrl Specify a URL to the copy source.
     * @param sourceRange Bytes of source data in the specified range. The length of this range should
     * match the ContentLength header and x-ms-range/Range destination range header.
     * @param contentLength The length of the request.
     * @param range The range of bytes to which the source range would be written. The range should be
     * 512 aligned and range-end is required.
     * @param [options] The optional parameters
     * @returns Promise<Models.PageBlobUploadPagesFromURLResponse>
     */
    uploadPagesFromURL(sourceUrl: string, sourceRange: string, contentLength: number, range: string, options?: Models.PageBlobUploadPagesFromURLOptionalParams): Promise<Models.PageBlobUploadPagesFromURLResponse>;
    /**
     * @param sourceUrl Specify a URL to the copy source.
     * @param sourceRange Bytes of source data in the specified range. The length of this range should
     * match the ContentLength header and x-ms-range/Range destination range header.
     * @param contentLength The length of the request.
     * @param range The range of bytes to which the source range would be written. The range should be
     * 512 aligned and range-end is required.
     * @param callback The callback
     */
    uploadPagesFromURL(sourceUrl: string, sourceRange: string, contentLength: number, range: string, callback: coreHttp.ServiceCallback<void>): void;
    /**
     * @param sourceUrl Specify a URL to the copy source.
     * @param sourceRange Bytes of source data in the specified range. The length of this range should
     * match the ContentLength header and x-ms-range/Range destination range header.
     * @param contentLength The length of the request.
     * @param range The range of bytes to which the source range would be written. The range should be
     * 512 aligned and range-end is required.
     * @param options The optional parameters
     * @param callback The callback
     */
    uploadPagesFromURL(sourceUrl: string, sourceRange: string, contentLength: number, range: string, options: Models.PageBlobUploadPagesFromURLOptionalParams, callback: coreHttp.ServiceCallback<void>): void;
    /**
     * The Get Page Ranges operation returns the list of valid page ranges for a page blob or snapshot
     * of a page blob
     * @param [options] The optional parameters
     * @returns Promise<Models.PageBlobGetPageRangesResponse>
     */
    getPageRanges(options?: Models.PageBlobGetPageRangesOptionalParams): Promise<Models.PageBlobGetPageRangesResponse>;
    /**
     * @param callback The callback
     */
    getPageRanges(callback: coreHttp.ServiceCallback<Models.PageList>): void;
    /**
     * @param options The optional parameters
     * @param callback The callback
     */
    getPageRanges(options: Models.PageBlobGetPageRangesOptionalParams, callback: coreHttp.ServiceCallback<Models.PageList>): void;
    /**
     * The Get Page Ranges Diff operation returns the list of valid page ranges for a page blob that
     * were changed between target blob and previous snapshot.
     * @param [options] The optional parameters
     * @returns Promise<Models.PageBlobGetPageRangesDiffResponse>
     */
    getPageRangesDiff(options?: Models.PageBlobGetPageRangesDiffOptionalParams): Promise<Models.PageBlobGetPageRangesDiffResponse>;
    /**
     * @param callback The callback
     */
    getPageRangesDiff(callback: coreHttp.ServiceCallback<Models.PageList>): void;
    /**
     * @param options The optional parameters
     * @param callback The callback
     */
    getPageRangesDiff(options: Models.PageBlobGetPageRangesDiffOptionalParams, callback: coreHttp.ServiceCallback<Models.PageList>): void;
    /**
     * Resize the Blob
     * @param blobContentLength This header specifies the maximum size for the page blob, up to 1 TB.
     * The page blob size must be aligned to a 512-byte boundary.
     * @param [options] The optional parameters
     * @returns Promise<Models.PageBlobResizeResponse>
     */
    resize(blobContentLength: number, options?: Models.PageBlobResizeOptionalParams): Promise<Models.PageBlobResizeResponse>;
    /**
     * @param blobContentLength This header specifies the maximum size for the page blob, up to 1 TB.
     * The page blob size must be aligned to a 512-byte boundary.
     * @param callback The callback
     */
    resize(blobContentLength: number, callback: coreHttp.ServiceCallback<void>): void;
    /**
     * @param blobContentLength This header specifies the maximum size for the page blob, up to 1 TB.
     * The page blob size must be aligned to a 512-byte boundary.
     * @param options The optional parameters
     * @param callback The callback
     */
    resize(blobContentLength: number, options: Models.PageBlobResizeOptionalParams, callback: coreHttp.ServiceCallback<void>): void;
    /**
     * Update the sequence number of the blob
     * @param sequenceNumberAction Required if the x-ms-blob-sequence-number header is set for the
     * request. This property applies to page blobs only. This property indicates how the service
     * should modify the blob's sequence number. Possible values include: 'max', 'update', 'increment'
     * @param [options] The optional parameters
     * @returns Promise<Models.PageBlobUpdateSequenceNumberResponse>
     */
    updateSequenceNumber(sequenceNumberAction: Models.SequenceNumberActionType, options?: Models.PageBlobUpdateSequenceNumberOptionalParams): Promise<Models.PageBlobUpdateSequenceNumberResponse>;
    /**
     * @param sequenceNumberAction Required if the x-ms-blob-sequence-number header is set for the
     * request. This property applies to page blobs only. This property indicates how the service
     * should modify the blob's sequence number. Possible values include: 'max', 'update', 'increment'
     * @param callback The callback
     */
    updateSequenceNumber(sequenceNumberAction: Models.SequenceNumberActionType, callback: coreHttp.ServiceCallback<void>): void;
    /**
     * @param sequenceNumberAction Required if the x-ms-blob-sequence-number header is set for the
     * request. This property applies to page blobs only. This property indicates how the service
     * should modify the blob's sequence number. Possible values include: 'max', 'update', 'increment'
     * @param options The optional parameters
     * @param callback The callback
     */
    updateSequenceNumber(sequenceNumberAction: Models.SequenceNumberActionType, options: Models.PageBlobUpdateSequenceNumberOptionalParams, callback: coreHttp.ServiceCallback<void>): void;
    /**
     * The Copy Incremental operation copies a snapshot of the source page blob to a destination page
     * blob. The snapshot is copied such that only the differential changes between the previously
     * copied snapshot are transferred to the destination. The copied snapshots are complete copies of
     * the original snapshot and can be read or copied from as usual. This API is supported since REST
     * version 2016-05-31.
     * @param copySource Specifies the name of the source page blob snapshot. This value is a URL of up
     * to 2 KB in length that specifies a page blob snapshot. The value should be URL-encoded as it
     * would appear in a request URI. The source blob must either be public or must be authenticated
     * via a shared access signature.
     * @param [options] The optional parameters
     * @returns Promise<Models.PageBlobCopyIncrementalResponse>
     */
    copyIncremental(copySource: string, options?: Models.PageBlobCopyIncrementalOptionalParams): Promise<Models.PageBlobCopyIncrementalResponse>;
    /**
     * @param copySource Specifies the name of the source page blob snapshot. This value is a URL of up
     * to 2 KB in length that specifies a page blob snapshot. The value should be URL-encoded as it
     * would appear in a request URI. The source blob must either be public or must be authenticated
     * via a shared access signature.
     * @param callback The callback
     */
    copyIncremental(copySource: string, callback: coreHttp.ServiceCallback<void>): void;
    /**
     * @param copySource Specifies the name of the source page blob snapshot. This value is a URL of up
     * to 2 KB in length that specifies a page blob snapshot. The value should be URL-encoded as it
     * would appear in a request URI. The source blob must either be public or must be authenticated
     * via a shared access signature.
     * @param options The optional parameters
     * @param callback The callback
     */
    copyIncremental(copySource: string, options: Models.PageBlobCopyIncrementalOptionalParams, callback: coreHttp.ServiceCallback<void>): void;
}
//# sourceMappingURL=pageBlob.d.ts.map