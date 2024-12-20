import * as coreHttp from "@azure/core-http";
import * as Models from "../models";
import { StorageClientContext } from "../storageClientContext";
/** Class representing a Blob. */
export declare class Blob {
    private readonly client;
    /**
     * Create a Blob.
     * @param {StorageClientContext} client Reference to the service client.
     */
    constructor(client: StorageClientContext);
    /**
     * The Download operation reads or downloads a blob from the system, including its metadata and
     * properties. You can also call Download to read a snapshot.
     * @param [options] The optional parameters
     * @returns Promise<Models.BlobDownloadResponse>
     */
    download(options?: Models.BlobDownloadOptionalParams): Promise<Models.BlobDownloadResponse>;
    /**
     * @param callback The callback
     */
    download(callback: coreHttp.ServiceCallback<void>): void;
    /**
     * @param options The optional parameters
     * @param callback The callback
     */
    download(options: Models.BlobDownloadOptionalParams, callback: coreHttp.ServiceCallback<void>): void;
    /**
     * The Get Properties operation returns all user-defined metadata, standard HTTP properties, and
     * system properties for the blob. It does not return the content of the blob.
     * @param [options] The optional parameters
     * @returns Promise<Models.BlobGetPropertiesResponse>
     */
    getProperties(options?: Models.BlobGetPropertiesOptionalParams): Promise<Models.BlobGetPropertiesResponse>;
    /**
     * @param callback The callback
     */
    getProperties(callback: coreHttp.ServiceCallback<void>): void;
    /**
     * @param options The optional parameters
     * @param callback The callback
     */
    getProperties(options: Models.BlobGetPropertiesOptionalParams, callback: coreHttp.ServiceCallback<void>): void;
    /**
     * If the storage account's soft delete feature is disabled then, when a blob is deleted, it is
     * permanently removed from the storage account. If the storage account's soft delete feature is
     * enabled, then, when a blob is deleted, it is marked for deletion and becomes inaccessible
     * immediately. However, the blob service retains the blob or snapshot for the number of days
     * specified by the DeleteRetentionPolicy section of [Storage service properties]
     * (Set-Blob-Service-Properties.md). After the specified number of days has passed, the blob's data
     * is permanently removed from the storage account. Note that you continue to be charged for the
     * soft-deleted blob's storage until it is permanently removed. Use the List Blobs API and specify
     * the "include=deleted" query parameter to discover which blobs and snapshots have been soft
     * deleted. You can then use the Undelete Blob API to restore a soft-deleted blob. All other
     * operations on a soft-deleted blob or snapshot causes the service to return an HTTP status code
     * of 404 (ResourceNotFound).
     * @param [options] The optional parameters
     * @returns Promise<Models.BlobDeleteResponse>
     */
    deleteMethod(options?: Models.BlobDeleteMethodOptionalParams): Promise<Models.BlobDeleteResponse>;
    /**
     * @param callback The callback
     */
    deleteMethod(callback: coreHttp.ServiceCallback<void>): void;
    /**
     * @param options The optional parameters
     * @param callback The callback
     */
    deleteMethod(options: Models.BlobDeleteMethodOptionalParams, callback: coreHttp.ServiceCallback<void>): void;
    /**
     * Set the owner, group, permissions, or access control list for a blob.
     * @param [options] The optional parameters
     * @returns Promise<Models.BlobSetAccessControlResponse>
     */
    setAccessControl(options?: Models.BlobSetAccessControlOptionalParams): Promise<Models.BlobSetAccessControlResponse>;
    /**
     * @param callback The callback
     */
    setAccessControl(callback: coreHttp.ServiceCallback<void>): void;
    /**
     * @param options The optional parameters
     * @param callback The callback
     */
    setAccessControl(options: Models.BlobSetAccessControlOptionalParams, callback: coreHttp.ServiceCallback<void>): void;
    /**
     * Get the owner, group, permissions, or access control list for a blob.
     * @param [options] The optional parameters
     * @returns Promise<Models.BlobGetAccessControlResponse>
     */
    getAccessControl(options?: Models.BlobGetAccessControlOptionalParams): Promise<Models.BlobGetAccessControlResponse>;
    /**
     * @param callback The callback
     */
    getAccessControl(callback: coreHttp.ServiceCallback<void>): void;
    /**
     * @param options The optional parameters
     * @param callback The callback
     */
    getAccessControl(options: Models.BlobGetAccessControlOptionalParams, callback: coreHttp.ServiceCallback<void>): void;
    /**
     * Rename a blob/file.  By default, the destination is overwritten and if the destination already
     * exists and has a lease the lease is broken.  This operation supports conditional HTTP requests.
     * For more information, see [Specifying Conditional Headers for Blob Service
     * Operations](https://docs.microsoft.com/en-us/rest/api/storageservices/specifying-conditional-headers-for-blob-service-operations).
     * To fail if the destination already exists, use a conditional request with If-None-Match: "*".
     * @param renameSource The file or directory to be renamed. The value must have the following
     * format: "/{filesysystem}/{path}".  If "x-ms-properties" is specified, the properties will
     * overwrite the existing properties; otherwise, the existing properties will be preserved.
     * @param [options] The optional parameters
     * @returns Promise<Models.BlobRenameResponse>
     */
    rename(renameSource: string, options?: Models.BlobRenameOptionalParams): Promise<Models.BlobRenameResponse>;
    /**
     * @param renameSource The file or directory to be renamed. The value must have the following
     * format: "/{filesysystem}/{path}".  If "x-ms-properties" is specified, the properties will
     * overwrite the existing properties; otherwise, the existing properties will be preserved.
     * @param callback The callback
     */
    rename(renameSource: string, callback: coreHttp.ServiceCallback<void>): void;
    /**
     * @param renameSource The file or directory to be renamed. The value must have the following
     * format: "/{filesysystem}/{path}".  If "x-ms-properties" is specified, the properties will
     * overwrite the existing properties; otherwise, the existing properties will be preserved.
     * @param options The optional parameters
     * @param callback The callback
     */
    rename(renameSource: string, options: Models.BlobRenameOptionalParams, callback: coreHttp.ServiceCallback<void>): void;
    /**
     * Undelete a blob that was previously soft deleted
     * @param [options] The optional parameters
     * @returns Promise<Models.BlobUndeleteResponse>
     */
    undelete(options?: Models.BlobUndeleteOptionalParams): Promise<Models.BlobUndeleteResponse>;
    /**
     * @param callback The callback
     */
    undelete(callback: coreHttp.ServiceCallback<void>): void;
    /**
     * @param options The optional parameters
     * @param callback The callback
     */
    undelete(options: Models.BlobUndeleteOptionalParams, callback: coreHttp.ServiceCallback<void>): void;
    /**
     * The Set HTTP Headers operation sets system properties on the blob
     * @param [options] The optional parameters
     * @returns Promise<Models.BlobSetHTTPHeadersResponse>
     */
    setHTTPHeaders(options?: Models.BlobSetHTTPHeadersOptionalParams): Promise<Models.BlobSetHTTPHeadersResponse>;
    /**
     * @param callback The callback
     */
    setHTTPHeaders(callback: coreHttp.ServiceCallback<void>): void;
    /**
     * @param options The optional parameters
     * @param callback The callback
     */
    setHTTPHeaders(options: Models.BlobSetHTTPHeadersOptionalParams, callback: coreHttp.ServiceCallback<void>): void;
    /**
     * The Set Blob Metadata operation sets user-defined metadata for the specified blob as one or more
     * name-value pairs
     * @param [options] The optional parameters
     * @returns Promise<Models.BlobSetMetadataResponse>
     */
    setMetadata(options?: Models.BlobSetMetadataOptionalParams): Promise<Models.BlobSetMetadataResponse>;
    /**
     * @param callback The callback
     */
    setMetadata(callback: coreHttp.ServiceCallback<void>): void;
    /**
     * @param options The optional parameters
     * @param callback The callback
     */
    setMetadata(options: Models.BlobSetMetadataOptionalParams, callback: coreHttp.ServiceCallback<void>): void;
    /**
     * [Update] The Lease Blob operation establishes and manages a lock on a blob for write and delete
     * operations
     * @param [options] The optional parameters
     * @returns Promise<Models.BlobAcquireLeaseResponse>
     */
    acquireLease(options?: Models.BlobAcquireLeaseOptionalParams): Promise<Models.BlobAcquireLeaseResponse>;
    /**
     * @param callback The callback
     */
    acquireLease(callback: coreHttp.ServiceCallback<void>): void;
    /**
     * @param options The optional parameters
     * @param callback The callback
     */
    acquireLease(options: Models.BlobAcquireLeaseOptionalParams, callback: coreHttp.ServiceCallback<void>): void;
    /**
     * [Update] The Lease Blob operation establishes and manages a lock on a blob for write and delete
     * operations
     * @param leaseId Specifies the current lease ID on the resource.
     * @param [options] The optional parameters
     * @returns Promise<Models.BlobReleaseLeaseResponse>
     */
    releaseLease(leaseId: string, options?: Models.BlobReleaseLeaseOptionalParams): Promise<Models.BlobReleaseLeaseResponse>;
    /**
     * @param leaseId Specifies the current lease ID on the resource.
     * @param callback The callback
     */
    releaseLease(leaseId: string, callback: coreHttp.ServiceCallback<void>): void;
    /**
     * @param leaseId Specifies the current lease ID on the resource.
     * @param options The optional parameters
     * @param callback The callback
     */
    releaseLease(leaseId: string, options: Models.BlobReleaseLeaseOptionalParams, callback: coreHttp.ServiceCallback<void>): void;
    /**
     * [Update] The Lease Blob operation establishes and manages a lock on a blob for write and delete
     * operations
     * @param leaseId Specifies the current lease ID on the resource.
     * @param [options] The optional parameters
     * @returns Promise<Models.BlobRenewLeaseResponse>
     */
    renewLease(leaseId: string, options?: Models.BlobRenewLeaseOptionalParams): Promise<Models.BlobRenewLeaseResponse>;
    /**
     * @param leaseId Specifies the current lease ID on the resource.
     * @param callback The callback
     */
    renewLease(leaseId: string, callback: coreHttp.ServiceCallback<void>): void;
    /**
     * @param leaseId Specifies the current lease ID on the resource.
     * @param options The optional parameters
     * @param callback The callback
     */
    renewLease(leaseId: string, options: Models.BlobRenewLeaseOptionalParams, callback: coreHttp.ServiceCallback<void>): void;
    /**
     * [Update] The Lease Blob operation establishes and manages a lock on a blob for write and delete
     * operations
     * @param leaseId Specifies the current lease ID on the resource.
     * @param proposedLeaseId Proposed lease ID, in a GUID string format. The Blob service returns 400
     * (Invalid request) if the proposed lease ID is not in the correct format. See Guid Constructor
     * (String) for a list of valid GUID string formats.
     * @param [options] The optional parameters
     * @returns Promise<Models.BlobChangeLeaseResponse>
     */
    changeLease(leaseId: string, proposedLeaseId: string, options?: Models.BlobChangeLeaseOptionalParams): Promise<Models.BlobChangeLeaseResponse>;
    /**
     * @param leaseId Specifies the current lease ID on the resource.
     * @param proposedLeaseId Proposed lease ID, in a GUID string format. The Blob service returns 400
     * (Invalid request) if the proposed lease ID is not in the correct format. See Guid Constructor
     * (String) for a list of valid GUID string formats.
     * @param callback The callback
     */
    changeLease(leaseId: string, proposedLeaseId: string, callback: coreHttp.ServiceCallback<void>): void;
    /**
     * @param leaseId Specifies the current lease ID on the resource.
     * @param proposedLeaseId Proposed lease ID, in a GUID string format. The Blob service returns 400
     * (Invalid request) if the proposed lease ID is not in the correct format. See Guid Constructor
     * (String) for a list of valid GUID string formats.
     * @param options The optional parameters
     * @param callback The callback
     */
    changeLease(leaseId: string, proposedLeaseId: string, options: Models.BlobChangeLeaseOptionalParams, callback: coreHttp.ServiceCallback<void>): void;
    /**
     * [Update] The Lease Blob operation establishes and manages a lock on a blob for write and delete
     * operations
     * @param [options] The optional parameters
     * @returns Promise<Models.BlobBreakLeaseResponse>
     */
    breakLease(options?: Models.BlobBreakLeaseOptionalParams): Promise<Models.BlobBreakLeaseResponse>;
    /**
     * @param callback The callback
     */
    breakLease(callback: coreHttp.ServiceCallback<void>): void;
    /**
     * @param options The optional parameters
     * @param callback The callback
     */
    breakLease(options: Models.BlobBreakLeaseOptionalParams, callback: coreHttp.ServiceCallback<void>): void;
    /**
     * The Create Snapshot operation creates a read-only snapshot of a blob
     * @param [options] The optional parameters
     * @returns Promise<Models.BlobCreateSnapshotResponse>
     */
    createSnapshot(options?: Models.BlobCreateSnapshotOptionalParams): Promise<Models.BlobCreateSnapshotResponse>;
    /**
     * @param callback The callback
     */
    createSnapshot(callback: coreHttp.ServiceCallback<void>): void;
    /**
     * @param options The optional parameters
     * @param callback The callback
     */
    createSnapshot(options: Models.BlobCreateSnapshotOptionalParams, callback: coreHttp.ServiceCallback<void>): void;
    /**
     * The Start Copy From URL operation copies a blob or an internet resource to a new blob.
     * @param copySource Specifies the name of the source page blob snapshot. This value is a URL of up
     * to 2 KB in length that specifies a page blob snapshot. The value should be URL-encoded as it
     * would appear in a request URI. The source blob must either be public or must be authenticated
     * via a shared access signature.
     * @param [options] The optional parameters
     * @returns Promise<Models.BlobStartCopyFromURLResponse>
     */
    startCopyFromURL(copySource: string, options?: Models.BlobStartCopyFromURLOptionalParams): Promise<Models.BlobStartCopyFromURLResponse>;
    /**
     * @param copySource Specifies the name of the source page blob snapshot. This value is a URL of up
     * to 2 KB in length that specifies a page blob snapshot. The value should be URL-encoded as it
     * would appear in a request URI. The source blob must either be public or must be authenticated
     * via a shared access signature.
     * @param callback The callback
     */
    startCopyFromURL(copySource: string, callback: coreHttp.ServiceCallback<void>): void;
    /**
     * @param copySource Specifies the name of the source page blob snapshot. This value is a URL of up
     * to 2 KB in length that specifies a page blob snapshot. The value should be URL-encoded as it
     * would appear in a request URI. The source blob must either be public or must be authenticated
     * via a shared access signature.
     * @param options The optional parameters
     * @param callback The callback
     */
    startCopyFromURL(copySource: string, options: Models.BlobStartCopyFromURLOptionalParams, callback: coreHttp.ServiceCallback<void>): void;
    /**
     * The Copy From URL operation copies a blob or an internet resource to a new blob. It will not
     * return a response until the copy is complete.
     * @param copySource Specifies the name of the source page blob snapshot. This value is a URL of up
     * to 2 KB in length that specifies a page blob snapshot. The value should be URL-encoded as it
     * would appear in a request URI. The source blob must either be public or must be authenticated
     * via a shared access signature.
     * @param [options] The optional parameters
     * @returns Promise<Models.BlobCopyFromURLResponse>
     */
    copyFromURL(copySource: string, options?: Models.BlobCopyFromURLOptionalParams): Promise<Models.BlobCopyFromURLResponse>;
    /**
     * @param copySource Specifies the name of the source page blob snapshot. This value is a URL of up
     * to 2 KB in length that specifies a page blob snapshot. The value should be URL-encoded as it
     * would appear in a request URI. The source blob must either be public or must be authenticated
     * via a shared access signature.
     * @param callback The callback
     */
    copyFromURL(copySource: string, callback: coreHttp.ServiceCallback<void>): void;
    /**
     * @param copySource Specifies the name of the source page blob snapshot. This value is a URL of up
     * to 2 KB in length that specifies a page blob snapshot. The value should be URL-encoded as it
     * would appear in a request URI. The source blob must either be public or must be authenticated
     * via a shared access signature.
     * @param options The optional parameters
     * @param callback The callback
     */
    copyFromURL(copySource: string, options: Models.BlobCopyFromURLOptionalParams, callback: coreHttp.ServiceCallback<void>): void;
    /**
     * The Abort Copy From URL operation aborts a pending Copy From URL operation, and leaves a
     * destination blob with zero length and full metadata.
     * @param copyId The copy identifier provided in the x-ms-copy-id header of the original Copy Blob
     * operation.
     * @param [options] The optional parameters
     * @returns Promise<Models.BlobAbortCopyFromURLResponse>
     */
    abortCopyFromURL(copyId: string, options?: Models.BlobAbortCopyFromURLOptionalParams): Promise<Models.BlobAbortCopyFromURLResponse>;
    /**
     * @param copyId The copy identifier provided in the x-ms-copy-id header of the original Copy Blob
     * operation.
     * @param callback The callback
     */
    abortCopyFromURL(copyId: string, callback: coreHttp.ServiceCallback<void>): void;
    /**
     * @param copyId The copy identifier provided in the x-ms-copy-id header of the original Copy Blob
     * operation.
     * @param options The optional parameters
     * @param callback The callback
     */
    abortCopyFromURL(copyId: string, options: Models.BlobAbortCopyFromURLOptionalParams, callback: coreHttp.ServiceCallback<void>): void;
    /**
     * The Set Tier operation sets the tier on a blob. The operation is allowed on a page blob in a
     * premium storage account and on a block blob in a blob storage account (locally redundant storage
     * only). A premium page blob's tier determines the allowed size, IOPS, and bandwidth of the blob.
     * A block blob's tier determines Hot/Cool/Archive storage type. This operation does not update the
     * blob's ETag.
     * @param tier Indicates the tier to be set on the blob. Possible values include: 'P4', 'P6',
     * 'P10', 'P15', 'P20', 'P30', 'P40', 'P50', 'P60', 'P70', 'P80', 'Hot', 'Cool', 'Archive'
     * @param [options] The optional parameters
     * @returns Promise<Models.BlobSetTierResponse>
     */
    setTier(tier: Models.AccessTier, options?: Models.BlobSetTierOptionalParams): Promise<Models.BlobSetTierResponse>;
    /**
     * @param tier Indicates the tier to be set on the blob. Possible values include: 'P4', 'P6',
     * 'P10', 'P15', 'P20', 'P30', 'P40', 'P50', 'P60', 'P70', 'P80', 'Hot', 'Cool', 'Archive'
     * @param callback The callback
     */
    setTier(tier: Models.AccessTier, callback: coreHttp.ServiceCallback<void>): void;
    /**
     * @param tier Indicates the tier to be set on the blob. Possible values include: 'P4', 'P6',
     * 'P10', 'P15', 'P20', 'P30', 'P40', 'P50', 'P60', 'P70', 'P80', 'Hot', 'Cool', 'Archive'
     * @param options The optional parameters
     * @param callback The callback
     */
    setTier(tier: Models.AccessTier, options: Models.BlobSetTierOptionalParams, callback: coreHttp.ServiceCallback<void>): void;
    /**
     * Returns the sku name and account kind
     * @param [options] The optional parameters
     * @returns Promise<Models.BlobGetAccountInfoResponse>
     */
    getAccountInfo(options?: coreHttp.RequestOptionsBase): Promise<Models.BlobGetAccountInfoResponse>;
    /**
     * @param callback The callback
     */
    getAccountInfo(callback: coreHttp.ServiceCallback<void>): void;
    /**
     * @param options The optional parameters
     * @param callback The callback
     */
    getAccountInfo(options: coreHttp.RequestOptionsBase, callback: coreHttp.ServiceCallback<void>): void;
}
//# sourceMappingURL=blob.d.ts.map