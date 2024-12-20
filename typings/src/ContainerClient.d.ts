import { HttpRequestBody, HttpResponse, TokenCredential } from "@azure/core-http";
import { AbortSignalLike } from "@azure/abort-controller";
import * as Models from "./generated/src/models";
import { ContainerAccessConditions, Metadata } from "./models";
import { NewPipelineOptions, Pipeline } from "./Pipeline";
import { AppendBlobClient, BlobClient, BlockBlobClient, PageBlobClient, StorageClient, BlockBlobUploadOptions, BlobDeleteOptions } from "./internal";
import { SharedKeyCredential } from "./credentials/SharedKeyCredential";
import { AnonymousCredential } from "./credentials/AnonymousCredential";
import { LeaseClient } from "./LeaseClient";
import "@azure/core-paging";
import { PagedAsyncIterableIterator } from "@azure/core-paging";
/**
 * Options to configure Container - Create operation.
 *
 * @export
 * @interface ContainerCreateOptions
 */
export interface ContainerCreateOptions {
    /**
     * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
     * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
     *
     * @type {AbortSignalLike}
     * @memberof ContainerCreateOptions
     */
    abortSignal?: AbortSignalLike;
    /**
     * A collection of key-value string pair to associate with the container.
     *
     * @type {Metadata}
     * @memberof ContainerCreateOptions
     */
    metadata?: Metadata;
    /**
     * Specifies whether data in the container may be accessed publicly and the level of access. Possible values include:
     * - `container`: Specifies full public read access for container and blob data. Clients can enumerate blobs within the container via anonymous request, but cannot enumerate containers within the storage account.
     * - `blob`: Specifies public read access for blobs. Blob data within this container can be read via anonymous request, but container data is not available. Clients cannot enumerate blobs within the container via anonymous request.
     *
     * @type {Models.PublicAccessType}
     * @memberof ContainerCreateOptions
     */
    access?: Models.PublicAccessType;
}
/**
 * Options to configure Container - Get Properties operation.
 *
 * @export
 * @interface ContainerGetPropertiesOptions
 */
export interface ContainerGetPropertiesOptions {
    /**
     * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
     * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
     *
     * @type {AbortSignalLike}
     * @memberof ContainerGetPropertiesOptions
     */
    abortSignal?: AbortSignalLike;
    /**
     * If specified, contains the lease id that must be matched and lease with this id
     * must be active in order for the operation to succeed.
     *
     * @type {Models.LeaseAccessConditions}
     * @memberof ContainerGetPropertiesOptions
     */
    leaseAccessConditions?: Models.LeaseAccessConditions;
}
/**
 * Options to configure Container - Delete operation.
 *
 * @export
 * @interface ContainerDeleteMethodOptions
 */
export interface ContainerDeleteMethodOptions {
    /**
     * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
     * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
     *
     * @type {AbortSignalLike}
     * @memberof ContainerDeleteMethodOptions
     */
    abortSignal?: AbortSignalLike;
    /**
     * Conditions to meet when deleting the container.
     *
     * @type {ContainerAccessConditions}
     * @memberof ContainerDeleteMethodOptions
     */
    containerAccessConditions?: ContainerAccessConditions;
}
/**
 * Options to configure Container - Set Metadata operation.
 *
 * @export
 * @interface ContainerSetMetadataOptions
 */
export interface ContainerSetMetadataOptions {
    /**
     * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
     * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
     *
     * @type {AbortSignalLike}
     * @memberof ContainerSetMetadataOptions
     */
    abortSignal?: AbortSignalLike;
    /**
     * If specified, contains the lease id that must be matched and lease with this id
     * must be active in order for the operation to succeed.
     *
     * @type {ContainerAccessConditions}
     * @memberof ContainerSetMetadataOptions
     */
    containerAccessConditions?: ContainerAccessConditions;
}
/**
 * Options to configure Container - Get Access Policy operation.
 *
 * @export
 * @interface ContainerGetAccessPolicyOptions
 */
export interface ContainerGetAccessPolicyOptions {
    /**
     * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
     * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
     *
     * @type {AbortSignalLike}
     * @memberof ContainerGetAccessPolicyOptions
     */
    abortSignal?: AbortSignalLike;
    /**
     * If specified, contains the lease id that must be matched and lease with this id
     * must be active in order for the operation to succeed.
     *
     * @type {Models.LeaseAccessConditions}
     * @memberof ContainerGetAccessPolicyOptions
     */
    leaseAccessConditions?: Models.LeaseAccessConditions;
}
/**
 * Signed identifier.
 *
 * @export
 * @interface SignedIdentifier
 */
export interface SignedIdentifier {
    /**
     * @member {string} id a unique id
     */
    id: string;
    /**
     * @member {AccessPolicy} accessPolicy
     */
    accessPolicy: {
        /**
         * @member {Date} start Optional. The date-time the policy is active
         */
        start?: Date;
        /**
         * @member {string} expiry Optional. The date-time the policy expires
         */
        expiry?: Date;
        /**
         * @member {string} permission The permissions for the acl policy
         * @see https://docs.microsoft.com/en-us/rest/api/storageservices/set-container-acl
         */
        permission: string;
    };
}
export declare type ContainerGetAccessPolicyResponse = {
    signedIdentifiers: SignedIdentifier[];
} & Models.ContainerGetAccessPolicyHeaders & {
    /**
     * The underlying HTTP response.
     */
    _response: HttpResponse & {
        /**
         * The parsed HTTP response headers.
         */
        parsedHeaders: Models.ContainerGetAccessPolicyHeaders;
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: Models.SignedIdentifier[];
    };
};
/**
 * Options to configure Container - Set Access Policy operation.
 *
 * @export
 * @interface ContainerSetAccessPolicyOptions
 */
export interface ContainerSetAccessPolicyOptions {
    /**
     * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
     * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
     *
     * @type {AbortSignalLike}
     * @memberof ContainerSetAccessPolicyOptions
     */
    abortSignal?: AbortSignalLike;
    /**
     * Conditions to meet when setting the access policy.
     *
     * @type {ContainerAccessConditions}
     * @memberof ContainerSetAccessPolicyOptions
     */
    containerAccessConditions?: ContainerAccessConditions;
}
/**
 * Options to configure Container - Acquire Lease operation.
 *
 * @export
 * @interface ContainerAcquireLeaseOptions
 */
export interface ContainerAcquireLeaseOptions {
    /**
     * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
     * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
     *
     * @type {AbortSignalLike}
     * @memberof ContainerAcquireLeaseOptions
     */
    abortSignal?: AbortSignalLike;
    /**
     * Conditions to meet when acquiring the lease.
     *
     * @type {Models.ModifiedAccessConditions}
     * @memberof ContainerAcquireLeaseOptions
     */
    modifiedAccessConditions?: Models.ModifiedAccessConditions;
}
/**
 * Options to configure Container - Release Lease operation.
 *
 * @export
 * @interface ContainerReleaseLeaseOptions
 */
export interface ContainerReleaseLeaseOptions {
    /**
     * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
     * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
     *
     * @type {AbortSignalLike}
     * @memberof ContainerReleaseLeaseOptions
     */
    abortSignal?: AbortSignalLike;
    /**
     * Conditions to meet when releasing the lease.
     *
     * @type {Models.ModifiedAccessConditions}
     * @memberof ContainerReleaseLeaseOptions
     */
    modifiedAccessConditions?: Models.ModifiedAccessConditions;
}
/**
 * Options to configure Container - Renew Lease operation.
 *
 * @export
 * @interface ContainerRenewLeaseOptions
 */
export interface ContainerRenewLeaseOptions {
    /**
     * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
     * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
     *
     * @type {AbortSignalLike}
     * @memberof ContainerRenewLeaseOptions
     */
    abortSignal?: AbortSignalLike;
    /**
     * Conditions to meet when renewing the lease.
     *
     * @type {Models.ModifiedAccessConditions}
     * @memberof ContainerRenewLeaseOptions
     */
    modifiedAccessConditions?: Models.ModifiedAccessConditions;
}
/**
 * Options to configure Container - Break Lease operation.
 *
 * @export
 * @interface ContainerBreakLeaseOptions
 */
export interface ContainerBreakLeaseOptions {
    /**
     * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
     * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
     *
     * @type {AbortSignalLike}
     * @memberof ContainerBreakLeaseOptions
     */
    abortSignal?: AbortSignalLike;
    /**
     * Conditions to meet when breaking the lease.
     *
     * @type {Models.ModifiedAccessConditions}
     * @memberof ContainerBreakLeaseOptions
     */
    modifiedAccessConditions?: Models.ModifiedAccessConditions;
}
/**
 * Options to configure Container - Change Lease operation.
 *
 * @export
 * @interface ContainerChangeLeaseOptions
 */
export interface ContainerChangeLeaseOptions {
    /**
     * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
     * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
     *
     * @type {AbortSignalLike}
     * @memberof ContainerChangeLeaseOptions
     */
    abortSignal?: AbortSignalLike;
    /**
     * Conditions to meet when changing the lease.
     *
     * @type {Models.ModifiedAccessConditions}
     * @memberof ContainerChangeLeaseOptions
     */
    modifiedAccessConditions?: Models.ModifiedAccessConditions;
}
/**
 * Options to configure Container - List Blobs operation.
 *
 * @export
 * @interface ContainerListBlobsOptions
 */
export interface ContainerListBlobsOptions {
    /**
     * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
     * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
     *
     * @type {AbortSignalLike}
     * @memberof ContainerListBlobsOptions
     */
    abortSignal?: AbortSignalLike;
    /**
     * @member {string} [prefix] Filters the results to return only containers
     * whose name begins with the specified prefix.
     */
    prefix?: string;
    /**
     * @member {ListBlobsIncludeItem[]} [include] Include this parameter to
     * specify one or more datasets to include in the response.
     */
    include?: Models.ListBlobsIncludeItem[];
}
/**
 * A ContainerClient represents a URL to the Azure Storage container allowing you to manipulate its blobs.
 *
 * @export
 * @class ContainerClient
 */
export declare class ContainerClient extends StorageClient {
    /**
     * containerContext provided by protocol layer.
     *
     * @private
     * @type {Containers}
     * @memberof ContainerClient
     */
    private containerContext;
    /**
     *
     * Creates an instance of ContainerClient.
     *
     * @param {string} connectionString Account connection string or a SAS connection string of an Azure storage account.
     *                                  [ Note - Account connection string can only be used in NODE.JS runtime. ]
     *                                  Account connection string example -
     *                                  `DefaultEndpointsProtocol=https;AccountName=myaccount;AccountKey=accountKey;EndpointSuffix=core.windows.net`
     *                                  SAS connection string example -
     *                                  `BlobEndpoint=https://myaccount.blob.core.windows.net/;QueueEndpoint=https://myaccount.queue.core.windows.net/;FileEndpoint=https://myaccount.file.core.windows.net/;TableEndpoint=https://myaccount.table.core.windows.net/;SharedAccessSignature=sasString`
     * @param {string} containerName Container name.
     * @param {NewPipelineOptions} [options] Optional. Options to configure the HTTP pipeline.
     * @memberof ContainerClient
     */
    constructor(connectionString: string, containerName: string, options?: NewPipelineOptions);
    /**
     * Creates an instance of PageBlobClient.
     * This method accepts an encoded URL or non-encoded URL pointing to a page blob.
     * Encoded URL string will NOT be escaped twice, only special characters in URL path will be escaped.
     * If a blob name includes ? or %, blob name must be encoded in the URL.
     *
     * @param {string} url A URL string pointing to Azure Storage page blob, such as
     *                     "https://myaccount.blob.core.windows.net/mycontainer/pageblob". You can
     *                     append a SAS if using AnonymousCredential, such as
     *                     "https://myaccount.blob.core.windows.net/mycontainer/pageblob?sasString".
     *                     This method accepts an encoded URL or non-encoded URL pointing to a blob.
     *                     Encoded URL string will NOT be escaped twice, only special characters in URL path will be escaped.
     *                     However, if a blob name includes ? or %, blob name must be encoded in the URL.
     *                     Such as a blob named "my?blob%", the URL should be "https://myaccount.blob.core.windows.net/mycontainer/my%3Fblob%25".
     * @param {SharedKeyCredential | AnonymousCredential | TokenCredential} credential Such as AnonymousCredential, SharedKeyCredential
     *                                                  or a TokenCredential from @azure/identity. If not specified,
     *                                                  AnonymousCredential is used.
     * @param {NewPipelineOptions} [options] Optional. Options to configure the HTTP pipeline.
     * @memberof ContainerClient
     */
    constructor(url: string, credential?: SharedKeyCredential | AnonymousCredential | TokenCredential, options?: NewPipelineOptions);
    /**
     * Creates an instance of PageBlobClient.
     * This method accepts an encoded URL or non-encoded URL pointing to a page blob.
     * Encoded URL string will NOT be escaped twice, only special characters in URL path will be escaped.
     * If a blob name includes ? or %, blob name must be encoded in the URL.
     *
     * @param {string} url A URL string pointing to Azure Storage page blob, such as
     *                     "https://myaccount.blob.core.windows.net/mycontainer/pageblob". You can
     *                     append a SAS if using AnonymousCredential, such as
     *                     "https://myaccount.blob.core.windows.net/mycontainer/pageblob?sasString".
     *                     This method accepts an encoded URL or non-encoded URL pointing to a blob.
     *                     Encoded URL string will NOT be escaped twice, only special characters in URL path will be escaped.
     *                     However, if a blob name includes ? or %, blob name must be encoded in the URL.
  
     *                     Such as a blob named "my?blob%", the URL should be "https://myaccount.blob.core.windows.net/mycontainer/my%3Fblob%25".
     * @param {Pipeline} pipeline Call newPipeline() to create a default
     *                            pipeline, or provide a customized pipeline.
     * @memberof ContainerClient
     */
    constructor(url: string, pipeline: Pipeline);
    /**
     * Creates a new container under the specified account. If the container with
     * the same name already exists, the operation fails.
     * @see https://docs.microsoft.com/en-us/rest/api/storageservices/create-container
     *
     * @param {ContainerCreateOptions} [options] Options to Container Create operation.
     * @returns {Promise<Models.ContainerCreateResponse>}
     * @memberof ContainerClient
     */
    create(options?: ContainerCreateOptions): Promise<Models.ContainerCreateResponse>;
    /**
     * Creates a BlobClient object.
     *
     * @param {string} blobName A blob name
     * @returns {BlobClient} A new BlobClient object for the given blob name.
     * @memberof BlobClient
     */
    getBlobClient(blobName: string): BlobClient;
    /**
     * Creates a AppendBlobClient object.
     *
     * @param {string} blobName An append blob name
     * @returns {AppendBlobClient}
     * @memberof ContainerClient
     */
    getAppendBlobClient(blobName: string): AppendBlobClient;
    /**
     * Creates a BlockBlobClient object.
     *
     * @param {string} blobName A block blob name
     * @returns {BlockBlobClient}
     * @memberof ContainerClient
     */
    getBlockBlobClient(blobName: string): BlockBlobClient;
    /**
     * Creates a PageBlobClient object.
     *
     * @param {string} blobName A page blob name
     * @returns {PageBlobClient}
     * @memberof ContainerClient
     */
    getPageBlobClient(blobName: string): PageBlobClient;
    /**
     * Returns all user-defined metadata and system properties for the specified
     * container. The data returned does not include the container's list of blobs.
     * @see https://docs.microsoft.com/en-us/rest/api/storageservices/get-container-properties
     *
     * @param {ContainersGetPropertiesOptions} [options] Options to Container Get Properties operation.
     * @returns {Promise<Models.ContainerGetPropertiesResponse>}
     * @memberof ContainerClient
     */
    getProperties(options?: ContainerGetPropertiesOptions): Promise<Models.ContainerGetPropertiesResponse>;
    /**
     * Marks the specified container for deletion. The container and any blobs
     * contained within it are later deleted during garbage collection.
     * @see https://docs.microsoft.com/en-us/rest/api/storageservices/delete-container
     *
     * @param {ContainerDeleteMethodOptions} [options] Options to Container Delete operation.
     * @returns {Promise<Models.ContainerDeleteResponse>}
     * @memberof ContainerClient
     */
    delete(options?: ContainerDeleteMethodOptions): Promise<Models.ContainerDeleteResponse>;
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
    setMetadata(metadata?: Metadata, options?: ContainerSetMetadataOptions): Promise<Models.ContainerSetMetadataResponse>;
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
    getAccessPolicy(options?: ContainerGetAccessPolicyOptions): Promise<ContainerGetAccessPolicyResponse>;
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
    setAccessPolicy(access?: Models.PublicAccessType, containerAcl?: SignedIdentifier[], options?: ContainerSetAccessPolicyOptions): Promise<Models.ContainerSetAccessPolicyResponse>;
    /**
     * Get a LeaseClient that manages leases on the container.
     *
     * @param {string} [proposeLeaseId] Initial proposed lease Id.
     * @returns {LeaseClient} A new LeaseClient object for managing leases on the container.
     * @memberof ContainerClient
     */
    getLeaseClient(proposeLeaseId?: string): LeaseClient;
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
    uploadBlockBlob(blobName: string, body: HttpRequestBody, contentLength: number, options?: BlockBlobUploadOptions): Promise<{
        blockBlobClient: BlockBlobClient;
        response: Models.BlockBlobUploadResponse;
    }>;
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
    deleteBlob(blobName: string, options?: BlobDeleteOptions): Promise<Models.BlobDeleteResponse>;
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
    private listBlobFlatSegment;
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
    private listBlobHierarchySegment;
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
    private listSegments;
    /**
     * Returns an AsyncIterableIterator for Blob Items
     *
     * @private
     * @param {ContainerListBlobsSegmentOptions} [options] Options to list blobs operation.
     * @returns {AsyncIterableIterator<Models.BlobItem>}
     * @memberof ContainerClient
     */
    private listItems;
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
    listBlobsFlat(options?: ContainerListBlobsOptions): PagedAsyncIterableIterator<Models.BlobItem, Models.ContainerListBlobFlatSegmentResponse>;
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
     */ private listHierarchySegments;
    /**
     * Returns an AsyncIterableIterator for BlobPrefixes and BlobItems
     *
     * @private
     * @param {ContainerListBlobsSegmentOptions} [options] Options to list blobs operation.
     * @returns {AsyncIterableIterator<{ kind: "prefix" } & Models.BlobPrefix | { kind: "blob" } & Models.BlobItem>}
     * @memberof ContainerClient
     */
    private listItemsByHierarchy;
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
    listBlobsByHierarchy(delimiter: string, options?: ContainerListBlobsOptions): PagedAsyncIterableIterator<{
        kind: "prefix";
    } & Models.BlobPrefix | {
        kind: "blob";
    } & Models.BlobItem, Models.ContainerListBlobHierarchySegmentResponse>;
}
//# sourceMappingURL=ContainerClient.d.ts.map