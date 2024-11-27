/// <reference types="node" />
import { ServiceClientOptions } from "@azure/core-http";
import * as coreHttp from "@azure/core-http";
/**
 * Key information
 */
export interface KeyInfo {
    /**
     * The date-time the key is active in ISO 8601 UTC time
     */
    start: string;
    /**
     * The date-time the key expires in ISO 8601 UTC time
     */
    expiry: string;
}
/**
 * A user delegation key
 */
export interface UserDelegationKey {
    /**
     * The Azure Active Directory object ID in GUID format.
     */
    signedOid: string;
    /**
     * The Azure Active Directory tenant ID in GUID format
     */
    signedTid: string;
    /**
     * The date-time the key is active
     * **NOTE: This entity will be treated as a string instead of a Date because the API can
     * potentially deal with a higher precision value than what is supported by JavaScript.**
     */
    signedStart: string;
    /**
     * The date-time the key expires
     * **NOTE: This entity will be treated as a string instead of a Date because the API can
     * potentially deal with a higher precision value than what is supported by JavaScript.**
     */
    signedExpiry: string;
    /**
     * Abbreviation of the Azure Storage service that accepts the key
     */
    signedService: string;
    /**
     * The service version that created the key
     */
    signedVersion: string;
    /**
     * The key as a base64 string
     */
    value: string;
}
/**
 * An interface representing StorageError.
 */
export interface StorageError {
    message?: string;
}
/**
 * The service error response object.
 */
export interface DataLakeStorageErrorError {
    /**
     * The service error code.
     */
    code?: string;
    /**
     * The service error message.
     */
    message?: string;
}
/**
 * An interface representing DataLakeStorageError.
 */
export interface DataLakeStorageError {
    /**
     * The service error response object.
     */
    error?: DataLakeStorageErrorError;
}
/**
 * An Access policy
 */
export interface AccessPolicy {
    /**
     * the date-time the policy is active
     * **NOTE: This entity will be treated as a string instead of a Date because the API can
     * potentially deal with a higher precision value than what is supported by JavaScript.**
     */
    start: string;
    /**
     * the date-time the policy expires
     * **NOTE: This entity will be treated as a string instead of a Date because the API can
     * potentially deal with a higher precision value than what is supported by JavaScript.**
     */
    expiry: string;
    /**
     * the permissions for the acl policy
     */
    permission: string;
}
/**
 * Properties of a blob
 */
export interface BlobProperties {
    creationTime?: Date;
    lastModified: Date;
    etag: string;
    /**
     * Size in bytes
     */
    contentLength?: number;
    contentType?: string;
    contentEncoding?: string;
    contentLanguage?: string;
    contentMD5?: Uint8Array;
    contentDisposition?: string;
    cacheControl?: string;
    blobSequenceNumber?: number;
    /**
     * Possible values include: 'BlockBlob', 'PageBlob', 'AppendBlob'
     */
    blobType?: BlobType;
    /**
     * Possible values include: 'locked', 'unlocked'
     */
    leaseStatus?: LeaseStatusType;
    /**
     * Possible values include: 'available', 'leased', 'expired', 'breaking', 'broken'
     */
    leaseState?: LeaseStateType;
    /**
     * Possible values include: 'infinite', 'fixed'
     */
    leaseDuration?: LeaseDurationType;
    copyId?: string;
    /**
     * Possible values include: 'pending', 'success', 'aborted', 'failed'
     */
    copyStatus?: CopyStatusType;
    copySource?: string;
    copyProgress?: string;
    copyCompletionTime?: Date;
    copyStatusDescription?: string;
    serverEncrypted?: boolean;
    incrementalCopy?: boolean;
    destinationSnapshot?: string;
    deletedTime?: Date;
    remainingRetentionDays?: number;
    /**
     * Possible values include: 'P4', 'P6', 'P10', 'P15', 'P20', 'P30', 'P40', 'P50', 'P60', 'P70',
     * 'P80', 'Hot', 'Cool', 'Archive'
     */
    accessTier?: AccessTier;
    accessTierInferred?: boolean;
    /**
     * Possible values include: 'rehydrate-pending-to-hot', 'rehydrate-pending-to-cool'
     */
    archiveStatus?: ArchiveStatus;
    customerProvidedKeySha256?: string;
    accessTierChangeTime?: Date;
}
/**
 * An interface representing BlobMetadata.
 */
export interface BlobMetadata {
    encrypted?: string;
    /**
     * Describes unknown properties. The value of an unknown property MUST be of type "string". Due
     * to valid TS constraints we have modeled this as a union of `string | any`.
     */
    [property: string]: string | any;
}
/**
 * An Azure Storage blob
 */
export interface BlobItem {
    name: string;
    deleted: boolean;
    snapshot: string;
    properties: BlobProperties;
    metadata?: BlobMetadata;
}
/**
 * An interface representing BlobFlatListSegment.
 */
export interface BlobFlatListSegment {
    blobItems: BlobItem[];
}
/**
 * An enumeration of blobs
 */
export interface ListBlobsFlatSegmentResponse {
    serviceEndpoint: string;
    containerName: string;
    prefix?: string;
    marker?: string;
    maxResults?: number;
    delimiter?: string;
    segment: BlobFlatListSegment;
    nextMarker?: string;
}
/**
 * An interface representing BlobPrefix.
 */
export interface BlobPrefix {
    name: string;
}
/**
 * An interface representing BlobHierarchyListSegment.
 */
export interface BlobHierarchyListSegment {
    blobPrefixes?: BlobPrefix[];
    blobItems: BlobItem[];
}
/**
 * An enumeration of blobs
 */
export interface ListBlobsHierarchySegmentResponse {
    serviceEndpoint: string;
    containerName: string;
    prefix?: string;
    marker?: string;
    maxResults?: number;
    delimiter?: string;
    segment: BlobHierarchyListSegment;
    nextMarker?: string;
}
/**
 * Represents a single block in a block blob.  It describes the block's ID and size.
 */
export interface Block {
    /**
     * The base64 encoded block ID.
     */
    name: string;
    /**
     * The block size in bytes.
     */
    size: number;
}
/**
 * An interface representing BlockList.
 */
export interface BlockList {
    committedBlocks?: Block[];
    uncommittedBlocks?: Block[];
}
/**
 * An interface representing BlockLookupList.
 */
export interface BlockLookupList {
    committed?: string[];
    uncommitted?: string[];
    latest?: string[];
}
/**
 * Properties of a container
 */
export interface ContainerProperties {
    lastModified: Date;
    etag: string;
    /**
     * Possible values include: 'locked', 'unlocked'
     */
    leaseStatus?: LeaseStatusType;
    /**
     * Possible values include: 'available', 'leased', 'expired', 'breaking', 'broken'
     */
    leaseState?: LeaseStateType;
    /**
     * Possible values include: 'infinite', 'fixed'
     */
    leaseDuration?: LeaseDurationType;
    /**
     * Possible values include: 'container', 'blob'
     */
    publicAccess?: PublicAccessType;
    hasImmutabilityPolicy?: boolean;
    hasLegalHold?: boolean;
}
/**
 * An Azure Storage container
 */
export interface ContainerItem {
    name: string;
    properties: ContainerProperties;
    metadata?: {
        [propertyName: string]: string;
    };
}
/**
 * An enumeration of containers
 */
export interface ListContainersSegmentResponse {
    serviceEndpoint: string;
    prefix?: string;
    marker?: string;
    maxResults?: number;
    containerItems: ContainerItem[];
    nextMarker?: string;
}
/**
 * CORS is an HTTP feature that enables a web application running under one domain to access
 * resources in another domain. Web browsers implement a security restriction known as same-origin
 * policy that prevents a web page from calling APIs in a different domain; CORS provides a secure
 * way to allow one domain (the origin domain) to call APIs in another domain
 */
export interface CorsRule {
    /**
     * The origin domains that are permitted to make a request against the storage service via CORS.
     * The origin domain is the domain from which the request originates. Note that the origin must
     * be an exact case-sensitive match with the origin that the user age sends to the service. You
     * can also use the wildcard character '*' to allow all origin domains to make requests via CORS.
     */
    allowedOrigins: string;
    /**
     * The methods (HTTP request verbs) that the origin domain may use for a CORS request. (comma
     * separated)
     */
    allowedMethods: string;
    /**
     * the request headers that the origin domain may specify on the CORS request.
     */
    allowedHeaders: string;
    /**
     * The response headers that may be sent in the response to the CORS request and exposed by the
     * browser to the request issuer
     */
    exposedHeaders: string;
    /**
     * The maximum amount time that a browser should cache the preflight OPTIONS request.
     */
    maxAgeInSeconds: number;
}
/**
 * Geo-Replication information for the Secondary Storage Service
 */
export interface GeoReplication {
    /**
     * The status of the secondary location. Possible values include: 'live', 'bootstrap',
     * 'unavailable'
     */
    status: GeoReplicationStatusType;
    /**
     * A GMT date/time value, to the second. All primary writes preceding this value are guaranteed
     * to be available for read operations at the secondary. Primary writes after this point in time
     * may or may not be available for reads.
     */
    lastSyncTime: Date;
}
/**
 * the retention policy which determines how long the associated data should persist
 */
export interface RetentionPolicy {
    /**
     * Indicates whether a retention policy is enabled for the storage service
     */
    enabled: boolean;
    /**
     * Indicates the number of days that metrics or logging or soft-deleted data should be retained.
     * All data older than this value will be deleted
     */
    days?: number;
}
/**
 * Azure Analytics Logging settings.
 */
export interface Logging {
    /**
     * The version of Storage Analytics to configure.
     */
    version: string;
    /**
     * Indicates whether all delete requests should be logged.
     */
    deleteProperty: boolean;
    /**
     * Indicates whether all read requests should be logged.
     */
    read: boolean;
    /**
     * Indicates whether all write requests should be logged.
     */
    write: boolean;
    retentionPolicy: RetentionPolicy;
}
/**
 * a summary of request statistics grouped by API in hour or minute aggregates for blobs
 */
export interface Metrics {
    /**
     * The version of Storage Analytics to configure.
     */
    version?: string;
    /**
     * Indicates whether metrics are enabled for the Blob service.
     */
    enabled: boolean;
    /**
     * Indicates whether metrics should generate summary statistics for called API operations.
     */
    includeAPIs?: boolean;
    retentionPolicy?: RetentionPolicy;
}
/**
 * An interface representing PageRange.
 */
export interface PageRange {
    start: number;
    end: number;
}
/**
 * An interface representing ClearRange.
 */
export interface ClearRange {
    start: number;
    end: number;
}
/**
 * the list of pages
 */
export interface PageList {
    pageRange?: PageRange[];
    clearRange?: ClearRange[];
}
/**
 * signed identifier
 */
export interface SignedIdentifier {
    /**
     * a unique id
     */
    id: string;
    accessPolicy: AccessPolicy;
}
/**
 * The properties that enable an account to host a static website
 */
export interface StaticWebsite {
    /**
     * Indicates whether this account is hosting a static website
     */
    enabled: boolean;
    /**
     * The default name of the index page under each directory
     */
    indexDocument?: string;
    /**
     * The absolute path of the custom 404 page
     */
    errorDocument404Path?: string;
}
/**
 * Storage Service Properties.
 */
export interface StorageServiceProperties {
    logging?: Logging;
    hourMetrics?: Metrics;
    minuteMetrics?: Metrics;
    /**
     * The set of CORS rules.
     */
    cors?: CorsRule[];
    /**
     * The default version to use for requests to the Blob service if an incoming request's version
     * is not specified. Possible values include version 2008-10-27 and all more recent versions
     */
    defaultServiceVersion?: string;
    deleteRetentionPolicy?: RetentionPolicy;
    staticWebsite?: StaticWebsite;
}
/**
 * Stats for the storage service.
 */
export interface StorageServiceStats {
    geoReplication?: GeoReplication;
}
/**
 * Additional parameters for a set of operations.
 */
export interface LeaseAccessConditions {
    /**
     * If specified, the operation only succeeds if the resource's lease is active and matches this
     * ID.
     */
    leaseId?: string;
}
/**
 * Additional parameters for a set of operations.
 */
export interface ModifiedAccessConditions {
    /**
     * Specify this header value to operate only on a blob if it has been modified since the
     * specified date/time.
     */
    ifModifiedSince?: Date;
    /**
     * Specify this header value to operate only on a blob if it has not been modified since the
     * specified date/time.
     */
    ifUnmodifiedSince?: Date;
    /**
     * Specify an ETag value to operate only on blobs with a matching value.
     */
    ifMatch?: string;
    /**
     * Specify an ETag value to operate only on blobs without a matching value.
     */
    ifNoneMatch?: string;
}
/**
 * Additional parameters for a set of operations, such as: Directory_create, Directory_rename,
 * Blob_rename.
 */
export interface DirectoryHttpHeaders {
    /**
     * Cache control for given resource
     */
    cacheControl?: string;
    /**
     * Content type for given resource
     */
    contentType?: string;
    /**
     * Content encoding for given resource
     */
    contentEncoding?: string;
    /**
     * Content language for given resource
     */
    contentLanguage?: string;
    /**
     * Content disposition for given resource
     */
    contentDisposition?: string;
}
/**
 * Additional parameters for a set of operations.
 */
export interface SourceModifiedAccessConditions {
    /**
     * Specify this header value to operate only on a blob if it has been modified since the
     * specified date/time.
     */
    sourceIfModifiedSince?: Date;
    /**
     * Specify this header value to operate only on a blob if it has not been modified since the
     * specified date/time.
     */
    sourceIfUnmodifiedSince?: Date;
    /**
     * Specify an ETag value to operate only on blobs with a matching value.
     */
    sourceIfMatch?: string;
    /**
     * Specify an ETag value to operate only on blobs without a matching value.
     */
    sourceIfNoneMatch?: string;
}
/**
 * Additional parameters for a set of operations.
 */
export interface CpkInfo {
    /**
     * Optional. Specifies the encryption key to use to encrypt the data provided in the request. If
     * not specified, encryption is performed with the root account encryption key.  For more
     * information, see Encryption at Rest for Azure Storage Services.
     */
    encryptionKey?: string;
    /**
     * The SHA-256 hash of the provided encryption key. Must be provided if the x-ms-encryption-key
     * header is provided.
     */
    encryptionKeySha256?: string;
    /**
     * The algorithm used to produce the encryption key hash. Currently, the only accepted value is
     * "AES256". Must be provided if the x-ms-encryption-key header is provided. Possible values
     * include: 'AES256'
     */
    encryptionAlgorithm?: EncryptionAlgorithmType;
}
/**
 * Additional parameters for a set of operations.
 */
export interface BlobHTTPHeaders {
    /**
     * Optional. Sets the blob's cache control. If specified, this property is stored with the blob
     * and returned with a read request.
     */
    blobCacheControl?: string;
    /**
     * Optional. Sets the blob's content type. If specified, this property is stored with the blob
     * and returned with a read request.
     */
    blobContentType?: string;
    /**
     * Optional. An MD5 hash of the blob content. Note that this hash is not validated, as the hashes
     * for the individual blocks were validated when each was uploaded.
     */
    blobContentMD5?: Uint8Array;
    /**
     * Optional. Sets the blob's content encoding. If specified, this property is stored with the
     * blob and returned with a read request.
     */
    blobContentEncoding?: string;
    /**
     * Optional. Set the blob's content language. If specified, this property is stored with the blob
     * and returned with a read request.
     */
    blobContentLanguage?: string;
    /**
     * Optional. Sets the blob's Content-Disposition header.
     */
    blobContentDisposition?: string;
}
/**
 * Additional parameters for a set of operations, such as: PageBlob_uploadPages,
 * PageBlob_clearPages, PageBlob_uploadPagesFromURL.
 */
export interface SequenceNumberAccessConditions {
    /**
     * Specify this header value to operate only on a blob if it has a sequence number less than or
     * equal to the specified.
     */
    ifSequenceNumberLessThanOrEqualTo?: number;
    /**
     * Specify this header value to operate only on a blob if it has a sequence number less than the
     * specified.
     */
    ifSequenceNumberLessThan?: number;
    /**
     * Specify this header value to operate only on a blob if it has the specified sequence number.
     */
    ifSequenceNumberEqualTo?: number;
}
/**
 * Additional parameters for a set of operations, such as: AppendBlob_appendBlock,
 * AppendBlob_appendBlockFromUrl.
 */
export interface AppendPositionAccessConditions {
    /**
     * Optional conditional header. The max length in bytes permitted for the append blob. If the
     * Append Block operation would cause the blob to exceed that limit or if the blob size is
     * already greater than the value specified in this header, the request will fail with
     * MaxBlobSizeConditionNotMet error (HTTP status code 412 - Precondition Failed).
     */
    maxSize?: number;
    /**
     * Optional conditional header, used only for the Append Block operation. A number indicating the
     * byte offset to compare. Append Block will succeed only if the append position is equal to this
     * number. If it is not, the request will fail with the AppendPositionConditionNotMet error (HTTP
     * status code 412 - Precondition Failed).
     */
    appendPosition?: number;
}
/**
 * An interface representing StorageClientOptions.
 */
export interface StorageClientOptions extends ServiceClientOptions {
    /**
     * Determines the behavior of the rename operation. Possible values include: 'legacy', 'posix'
     */
    pathRenameMode?: PathRenameMode;
}
/**
 * Optional Parameters.
 */
export interface ServiceSetPropertiesOptionalParams extends coreHttp.RequestOptionsBase {
    /**
     * The timeout parameter is expressed in seconds. For more information, see <a
     * href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations">Setting
     * Timeouts for Blob Service Operations.</a>
     */
    timeoutParameter?: number;
    /**
     * Provides a client-generated, opaque value with a 1 KB character limit that is recorded in the
     * analytics logs when storage analytics logging is enabled.
     */
    requestId?: string;
}
/**
 * Optional Parameters.
 */
export interface ServiceGetPropertiesOptionalParams extends coreHttp.RequestOptionsBase {
    /**
     * The timeout parameter is expressed in seconds. For more information, see <a
     * href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations">Setting
     * Timeouts for Blob Service Operations.</a>
     */
    timeoutParameter?: number;
    /**
     * Provides a client-generated, opaque value with a 1 KB character limit that is recorded in the
     * analytics logs when storage analytics logging is enabled.
     */
    requestId?: string;
}
/**
 * Optional Parameters.
 */
export interface ServiceGetStatisticsOptionalParams extends coreHttp.RequestOptionsBase {
    /**
     * The timeout parameter is expressed in seconds. For more information, see <a
     * href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations">Setting
     * Timeouts for Blob Service Operations.</a>
     */
    timeoutParameter?: number;
    /**
     * Provides a client-generated, opaque value with a 1 KB character limit that is recorded in the
     * analytics logs when storage analytics logging is enabled.
     */
    requestId?: string;
}
/**
 * Optional Parameters.
 */
export interface ServiceListContainersSegmentOptionalParams extends coreHttp.RequestOptionsBase {
    /**
     * Filters the results to return only containers whose name begins with the specified prefix.
     */
    prefix?: string;
    /**
     * A string value that identifies the portion of the list of containers to be returned with the
     * next listing operation. The operation returns the NextMarker value within the response body if
     * the listing operation did not return all containers remaining to be listed with the current
     * page. The NextMarker value can be used as the value for the marker parameter in a subsequent
     * call to request the next page of list items. The marker value is opaque to the client.
     */
    marker?: string;
    /**
     * Specifies the maximum number of containers to return. If the request does not specify
     * maxresults, or specifies a value greater than 5000, the server will return up to 5000 items.
     * Note that if the listing operation crosses a partition boundary, then the service will return
     * a continuation token for retrieving the remainder of the results. For this reason, it is
     * possible that the service will return fewer results than specified by maxresults, or than the
     * default of 5000.
     */
    maxresults?: number;
    /**
     * Include this parameter to specify that the container's metadata be returned as part of the
     * response body. Possible values include: 'metadata'
     */
    include?: ListContainersIncludeType;
    /**
     * The timeout parameter is expressed in seconds. For more information, see <a
     * href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations">Setting
     * Timeouts for Blob Service Operations.</a>
     */
    timeoutParameter?: number;
    /**
     * Provides a client-generated, opaque value with a 1 KB character limit that is recorded in the
     * analytics logs when storage analytics logging is enabled.
     */
    requestId?: string;
}
/**
 * Optional Parameters.
 */
export interface ServiceGetUserDelegationKeyOptionalParams extends coreHttp.RequestOptionsBase {
    /**
     * The timeout parameter is expressed in seconds. For more information, see <a
     * href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations">Setting
     * Timeouts for Blob Service Operations.</a>
     */
    timeoutParameter?: number;
    /**
     * Provides a client-generated, opaque value with a 1 KB character limit that is recorded in the
     * analytics logs when storage analytics logging is enabled.
     */
    requestId?: string;
}
/**
 * Optional Parameters.
 */
export interface ServiceSubmitBatchOptionalParams extends coreHttp.RequestOptionsBase {
    /**
     * The timeout parameter is expressed in seconds. For more information, see <a
     * href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations">Setting
     * Timeouts for Blob Service Operations.</a>
     */
    timeoutParameter?: number;
    /**
     * Provides a client-generated, opaque value with a 1 KB character limit that is recorded in the
     * analytics logs when storage analytics logging is enabled.
     */
    requestId?: string;
}
/**
 * Optional Parameters.
 */
export interface ContainerCreateOptionalParams extends coreHttp.RequestOptionsBase {
    /**
     * The timeout parameter is expressed in seconds. For more information, see <a
     * href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations">Setting
     * Timeouts for Blob Service Operations.</a>
     */
    timeoutParameter?: number;
    /**
     * Optional. Specifies a user-defined name-value pair associated with the blob. If no name-value
     * pairs are specified, the operation will copy the metadata from the source blob or file to the
     * destination blob. If one or more name-value pairs are specified, the destination blob is
     * created with the specified metadata, and metadata is not copied from the source blob or file.
     * Note that beginning with version 2009-09-19, metadata names must adhere to the naming rules
     * for C# identifiers. See Naming and Referencing Containers, Blobs, and Metadata for more
     * information.
     */
    metadata?: {
        [propertyName: string]: string;
    };
    /**
     * Specifies whether data in the container may be accessed publicly and the level of access.
     * Possible values include: 'container', 'blob'
     */
    access?: PublicAccessType;
    /**
     * Provides a client-generated, opaque value with a 1 KB character limit that is recorded in the
     * analytics logs when storage analytics logging is enabled.
     */
    requestId?: string;
}
/**
 * Optional Parameters.
 */
export interface ContainerGetPropertiesOptionalParams extends coreHttp.RequestOptionsBase {
    /**
     * The timeout parameter is expressed in seconds. For more information, see <a
     * href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations">Setting
     * Timeouts for Blob Service Operations.</a>
     */
    timeoutParameter?: number;
    /**
     * Provides a client-generated, opaque value with a 1 KB character limit that is recorded in the
     * analytics logs when storage analytics logging is enabled.
     */
    requestId?: string;
    /**
     * Additional parameters for the operation
     */
    leaseAccessConditions?: LeaseAccessConditions;
}
/**
 * Optional Parameters.
 */
export interface ContainerDeleteMethodOptionalParams extends coreHttp.RequestOptionsBase {
    /**
     * The timeout parameter is expressed in seconds. For more information, see <a
     * href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations">Setting
     * Timeouts for Blob Service Operations.</a>
     */
    timeoutParameter?: number;
    /**
     * Provides a client-generated, opaque value with a 1 KB character limit that is recorded in the
     * analytics logs when storage analytics logging is enabled.
     */
    requestId?: string;
    /**
     * Additional parameters for the operation
     */
    leaseAccessConditions?: LeaseAccessConditions;
    /**
     * Additional parameters for the operation
     */
    modifiedAccessConditions?: ModifiedAccessConditions;
}
/**
 * Optional Parameters.
 */
export interface ContainerSetMetadataOptionalParams extends coreHttp.RequestOptionsBase {
    /**
     * The timeout parameter is expressed in seconds. For more information, see <a
     * href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations">Setting
     * Timeouts for Blob Service Operations.</a>
     */
    timeoutParameter?: number;
    /**
     * Optional. Specifies a user-defined name-value pair associated with the blob. If no name-value
     * pairs are specified, the operation will copy the metadata from the source blob or file to the
     * destination blob. If one or more name-value pairs are specified, the destination blob is
     * created with the specified metadata, and metadata is not copied from the source blob or file.
     * Note that beginning with version 2009-09-19, metadata names must adhere to the naming rules
     * for C# identifiers. See Naming and Referencing Containers, Blobs, and Metadata for more
     * information.
     */
    metadata?: {
        [propertyName: string]: string;
    };
    /**
     * Provides a client-generated, opaque value with a 1 KB character limit that is recorded in the
     * analytics logs when storage analytics logging is enabled.
     */
    requestId?: string;
    /**
     * Additional parameters for the operation
     */
    leaseAccessConditions?: LeaseAccessConditions;
    /**
     * Additional parameters for the operation
     */
    modifiedAccessConditions?: ModifiedAccessConditions;
}
/**
 * Optional Parameters.
 */
export interface ContainerGetAccessPolicyOptionalParams extends coreHttp.RequestOptionsBase {
    /**
     * The timeout parameter is expressed in seconds. For more information, see <a
     * href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations">Setting
     * Timeouts for Blob Service Operations.</a>
     */
    timeoutParameter?: number;
    /**
     * Provides a client-generated, opaque value with a 1 KB character limit that is recorded in the
     * analytics logs when storage analytics logging is enabled.
     */
    requestId?: string;
    /**
     * Additional parameters for the operation
     */
    leaseAccessConditions?: LeaseAccessConditions;
}
/**
 * Optional Parameters.
 */
export interface ContainerSetAccessPolicyOptionalParams extends coreHttp.RequestOptionsBase {
    /**
     * the acls for the container
     */
    containerAcl?: SignedIdentifier[];
    /**
     * The timeout parameter is expressed in seconds. For more information, see <a
     * href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations">Setting
     * Timeouts for Blob Service Operations.</a>
     */
    timeoutParameter?: number;
    /**
     * Specifies whether data in the container may be accessed publicly and the level of access.
     * Possible values include: 'container', 'blob'
     */
    access?: PublicAccessType;
    /**
     * Provides a client-generated, opaque value with a 1 KB character limit that is recorded in the
     * analytics logs when storage analytics logging is enabled.
     */
    requestId?: string;
    /**
     * Additional parameters for the operation
     */
    leaseAccessConditions?: LeaseAccessConditions;
    /**
     * Additional parameters for the operation
     */
    modifiedAccessConditions?: ModifiedAccessConditions;
}
/**
 * Optional Parameters.
 */
export interface ContainerAcquireLeaseOptionalParams extends coreHttp.RequestOptionsBase {
    /**
     * The timeout parameter is expressed in seconds. For more information, see <a
     * href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations">Setting
     * Timeouts for Blob Service Operations.</a>
     */
    timeoutParameter?: number;
    /**
     * Specifies the duration of the lease, in seconds, or negative one (-1) for a lease that never
     * expires. A non-infinite lease can be between 15 and 60 seconds. A lease duration cannot be
     * changed using renew or change.
     */
    duration?: number;
    /**
     * Proposed lease ID, in a GUID string format. The Blob service returns 400 (Invalid request) if
     * the proposed lease ID is not in the correct format. See Guid Constructor (String) for a list
     * of valid GUID string formats.
     */
    proposedLeaseId?: string;
    /**
     * Provides a client-generated, opaque value with a 1 KB character limit that is recorded in the
     * analytics logs when storage analytics logging is enabled.
     */
    requestId?: string;
    /**
     * Additional parameters for the operation
     */
    modifiedAccessConditions?: ModifiedAccessConditions;
}
/**
 * Optional Parameters.
 */
export interface ContainerReleaseLeaseOptionalParams extends coreHttp.RequestOptionsBase {
    /**
     * The timeout parameter is expressed in seconds. For more information, see <a
     * href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations">Setting
     * Timeouts for Blob Service Operations.</a>
     */
    timeoutParameter?: number;
    /**
     * Provides a client-generated, opaque value with a 1 KB character limit that is recorded in the
     * analytics logs when storage analytics logging is enabled.
     */
    requestId?: string;
    /**
     * Additional parameters for the operation
     */
    modifiedAccessConditions?: ModifiedAccessConditions;
}
/**
 * Optional Parameters.
 */
export interface ContainerRenewLeaseOptionalParams extends coreHttp.RequestOptionsBase {
    /**
     * The timeout parameter is expressed in seconds. For more information, see <a
     * href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations">Setting
     * Timeouts for Blob Service Operations.</a>
     */
    timeoutParameter?: number;
    /**
     * Provides a client-generated, opaque value with a 1 KB character limit that is recorded in the
     * analytics logs when storage analytics logging is enabled.
     */
    requestId?: string;
    /**
     * Additional parameters for the operation
     */
    modifiedAccessConditions?: ModifiedAccessConditions;
}
/**
 * Optional Parameters.
 */
export interface ContainerBreakLeaseOptionalParams extends coreHttp.RequestOptionsBase {
    /**
     * The timeout parameter is expressed in seconds. For more information, see <a
     * href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations">Setting
     * Timeouts for Blob Service Operations.</a>
     */
    timeoutParameter?: number;
    /**
     * For a break operation, proposed duration the lease should continue before it is broken, in
     * seconds, between 0 and 60. This break period is only used if it is shorter than the time
     * remaining on the lease. If longer, the time remaining on the lease is used. A new lease will
     * not be available before the break period has expired, but the lease may be held for longer
     * than the break period. If this header does not appear with a break operation, a fixed-duration
     * lease breaks after the remaining lease period elapses, and an infinite lease breaks
     * immediately.
     */
    breakPeriod?: number;
    /**
     * Provides a client-generated, opaque value with a 1 KB character limit that is recorded in the
     * analytics logs when storage analytics logging is enabled.
     */
    requestId?: string;
    /**
     * Additional parameters for the operation
     */
    modifiedAccessConditions?: ModifiedAccessConditions;
}
/**
 * Optional Parameters.
 */
export interface ContainerChangeLeaseOptionalParams extends coreHttp.RequestOptionsBase {
    /**
     * The timeout parameter is expressed in seconds. For more information, see <a
     * href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations">Setting
     * Timeouts for Blob Service Operations.</a>
     */
    timeoutParameter?: number;
    /**
     * Provides a client-generated, opaque value with a 1 KB character limit that is recorded in the
     * analytics logs when storage analytics logging is enabled.
     */
    requestId?: string;
    /**
     * Additional parameters for the operation
     */
    modifiedAccessConditions?: ModifiedAccessConditions;
}
/**
 * Optional Parameters.
 */
export interface ContainerListBlobFlatSegmentOptionalParams extends coreHttp.RequestOptionsBase {
    /**
     * Filters the results to return only containers whose name begins with the specified prefix.
     */
    prefix?: string;
    /**
     * A string value that identifies the portion of the list of containers to be returned with the
     * next listing operation. The operation returns the NextMarker value within the response body if
     * the listing operation did not return all containers remaining to be listed with the current
     * page. The NextMarker value can be used as the value for the marker parameter in a subsequent
     * call to request the next page of list items. The marker value is opaque to the client.
     */
    marker?: string;
    /**
     * Specifies the maximum number of containers to return. If the request does not specify
     * maxresults, or specifies a value greater than 5000, the server will return up to 5000 items.
     * Note that if the listing operation crosses a partition boundary, then the service will return
     * a continuation token for retrieving the remainder of the results. For this reason, it is
     * possible that the service will return fewer results than specified by maxresults, or than the
     * default of 5000.
     */
    maxresults?: number;
    /**
     * Include this parameter to specify one or more datasets to include in the response.
     */
    include?: ListBlobsIncludeItem[];
    /**
     * The timeout parameter is expressed in seconds. For more information, see <a
     * href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations">Setting
     * Timeouts for Blob Service Operations.</a>
     */
    timeoutParameter?: number;
    /**
     * Provides a client-generated, opaque value with a 1 KB character limit that is recorded in the
     * analytics logs when storage analytics logging is enabled.
     */
    requestId?: string;
}
/**
 * Optional Parameters.
 */
export interface ContainerListBlobHierarchySegmentOptionalParams extends coreHttp.RequestOptionsBase {
    /**
     * Filters the results to return only containers whose name begins with the specified prefix.
     */
    prefix?: string;
    /**
     * A string value that identifies the portion of the list of containers to be returned with the
     * next listing operation. The operation returns the NextMarker value within the response body if
     * the listing operation did not return all containers remaining to be listed with the current
     * page. The NextMarker value can be used as the value for the marker parameter in a subsequent
     * call to request the next page of list items. The marker value is opaque to the client.
     */
    marker?: string;
    /**
     * Specifies the maximum number of containers to return. If the request does not specify
     * maxresults, or specifies a value greater than 5000, the server will return up to 5000 items.
     * Note that if the listing operation crosses a partition boundary, then the service will return
     * a continuation token for retrieving the remainder of the results. For this reason, it is
     * possible that the service will return fewer results than specified by maxresults, or than the
     * default of 5000.
     */
    maxresults?: number;
    /**
     * Include this parameter to specify one or more datasets to include in the response.
     */
    include?: ListBlobsIncludeItem[];
    /**
     * The timeout parameter is expressed in seconds. For more information, see <a
     * href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations">Setting
     * Timeouts for Blob Service Operations.</a>
     */
    timeoutParameter?: number;
    /**
     * Provides a client-generated, opaque value with a 1 KB character limit that is recorded in the
     * analytics logs when storage analytics logging is enabled.
     */
    requestId?: string;
}
/**
 * Optional Parameters.
 */
export interface DirectoryCreateOptionalParams extends coreHttp.RequestOptionsBase {
    /**
     * The timeout parameter is expressed in seconds. For more information, see <a
     * href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations">Setting
     * Timeouts for Blob Service Operations.</a>
     */
    timeoutParameter?: number;
    /**
     * Optional.  User-defined properties to be stored with the file or directory, in the format of a
     * comma-separated list of name and value pairs "n1=v1, n2=v2, ...", where each value is base64
     * encoded.
     */
    directoryProperties?: string;
    /**
     * Optional and only valid if Hierarchical Namespace is enabled for the account. Sets POSIX
     * access permissions for the file owner, the file owning group, and others. Each class may be
     * granted read, write, or execute permission.  The sticky bit is also supported.  Both symbolic
     * (rwxrw-rw-) and 4-digit octal notation (e.g. 0766) are supported.
     */
    posixPermissions?: string;
    /**
     * Only valid if Hierarchical Namespace is enabled for the account. This umask restricts
     * permission settings for file and directory, and will only be applied when default Acl does not
     * exist in parent directory. If the umask bit has set, it means that the corresponding
     * permission will be disabled. Otherwise the corresponding permission will be determined by the
     * permission. A 4-digit octal notation (e.g. 0022) is supported here. If no umask was specified,
     * a default umask - 0027 will be used.
     */
    posixUmask?: string;
    /**
     * Provides a client-generated, opaque value with a 1 KB character limit that is recorded in the
     * analytics logs when storage analytics logging is enabled.
     */
    requestId?: string;
    /**
     * Additional parameters for the operation
     */
    directoryHttpHeaders?: DirectoryHttpHeaders;
    /**
     * Additional parameters for the operation
     */
    leaseAccessConditions?: LeaseAccessConditions;
    /**
     * Additional parameters for the operation
     */
    modifiedAccessConditions?: ModifiedAccessConditions;
}
/**
 * Optional Parameters.
 */
export interface DirectoryRenameOptionalParams extends coreHttp.RequestOptionsBase {
    /**
     * The timeout parameter is expressed in seconds. For more information, see <a
     * href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations">Setting
     * Timeouts for Blob Service Operations.</a>
     */
    timeoutParameter?: number;
    /**
     * When renaming a directory, the number of paths that are renamed with each invocation is
     * limited.  If the number of paths to be renamed exceeds this limit, a continuation token is
     * returned in this response header.  When a continuation token is returned in the response, it
     * must be specified in a subsequent invocation of the rename operation to continue renaming the
     * directory.
     */
    marker?: string;
    /**
     * Optional.  User-defined properties to be stored with the file or directory, in the format of a
     * comma-separated list of name and value pairs "n1=v1, n2=v2, ...", where each value is base64
     * encoded.
     */
    directoryProperties?: string;
    /**
     * Optional and only valid if Hierarchical Namespace is enabled for the account. Sets POSIX
     * access permissions for the file owner, the file owning group, and others. Each class may be
     * granted read, write, or execute permission.  The sticky bit is also supported.  Both symbolic
     * (rwxrw-rw-) and 4-digit octal notation (e.g. 0766) are supported.
     */
    posixPermissions?: string;
    /**
     * Only valid if Hierarchical Namespace is enabled for the account. This umask restricts
     * permission settings for file and directory, and will only be applied when default Acl does not
     * exist in parent directory. If the umask bit has set, it means that the corresponding
     * permission will be disabled. Otherwise the corresponding permission will be determined by the
     * permission. A 4-digit octal notation (e.g. 0022) is supported here. If no umask was specified,
     * a default umask - 0027 will be used.
     */
    posixUmask?: string;
    /**
     * A lease ID for the source path. If specified, the source path must have an active lease and
     * the leaase ID must match.
     */
    sourceLeaseId?: string;
    /**
     * Provides a client-generated, opaque value with a 1 KB character limit that is recorded in the
     * analytics logs when storage analytics logging is enabled.
     */
    requestId?: string;
    /**
     * Additional parameters for the operation
     */
    directoryHttpHeaders?: DirectoryHttpHeaders;
    /**
     * Additional parameters for the operation
     */
    leaseAccessConditions?: LeaseAccessConditions;
    /**
     * Additional parameters for the operation
     */
    modifiedAccessConditions?: ModifiedAccessConditions;
    /**
     * Additional parameters for the operation
     */
    sourceModifiedAccessConditions?: SourceModifiedAccessConditions;
}
/**
 * Optional Parameters.
 */
export interface DirectoryDeleteMethodOptionalParams extends coreHttp.RequestOptionsBase {
    /**
     * The timeout parameter is expressed in seconds. For more information, see <a
     * href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations">Setting
     * Timeouts for Blob Service Operations.</a>
     */
    timeoutParameter?: number;
    /**
     * When renaming a directory, the number of paths that are renamed with each invocation is
     * limited.  If the number of paths to be renamed exceeds this limit, a continuation token is
     * returned in this response header.  When a continuation token is returned in the response, it
     * must be specified in a subsequent invocation of the rename operation to continue renaming the
     * directory.
     */
    marker?: string;
    /**
     * Provides a client-generated, opaque value with a 1 KB character limit that is recorded in the
     * analytics logs when storage analytics logging is enabled.
     */
    requestId?: string;
    /**
     * Additional parameters for the operation
     */
    leaseAccessConditions?: LeaseAccessConditions;
    /**
     * Additional parameters for the operation
     */
    modifiedAccessConditions?: ModifiedAccessConditions;
}
/**
 * Optional Parameters.
 */
export interface DirectorySetAccessControlOptionalParams extends coreHttp.RequestOptionsBase {
    /**
     * The timeout parameter is expressed in seconds. For more information, see <a
     * href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations">Setting
     * Timeouts for Blob Service Operations.</a>
     */
    timeoutParameter?: number;
    /**
     * Optional. The owner of the blob or directory.
     */
    owner?: string;
    /**
     * Optional. The owning group of the blob or directory.
     */
    group?: string;
    /**
     * Optional and only valid if Hierarchical Namespace is enabled for the account. Sets POSIX
     * access permissions for the file owner, the file owning group, and others. Each class may be
     * granted read, write, or execute permission.  The sticky bit is also supported.  Both symbolic
     * (rwxrw-rw-) and 4-digit octal notation (e.g. 0766) are supported.
     */
    posixPermissions?: string;
    /**
     * Sets POSIX access control rights on files and directories. The value is a comma-separated list
     * of access control entries. Each access control entry (ACE) consists of a scope, a type, a user
     * or group identifier, and permissions in the format "[scope:][type]:[id]:[permissions]".
     */
    posixAcl?: string;
    /**
     * Provides a client-generated, opaque value with a 1 KB character limit that is recorded in the
     * analytics logs when storage analytics logging is enabled.
     */
    requestId?: string;
    /**
     * Additional parameters for the operation
     */
    leaseAccessConditions?: LeaseAccessConditions;
    /**
     * Additional parameters for the operation
     */
    modifiedAccessConditions?: ModifiedAccessConditions;
}
/**
 * Optional Parameters.
 */
export interface DirectoryGetAccessControlOptionalParams extends coreHttp.RequestOptionsBase {
    /**
     * The timeout parameter is expressed in seconds. For more information, see <a
     * href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations">Setting
     * Timeouts for Blob Service Operations.</a>
     */
    timeoutParameter?: number;
    /**
     * Optional. Valid only when Hierarchical Namespace is enabled for the account. If "true", the
     * identity values returned in the x-ms-owner, x-ms-group, and x-ms-acl response headers will be
     * transformed from Azure Active Directory Object IDs to User Principal Names.  If "false", the
     * values will be returned as Azure Active Directory Object IDs. The default value is false.
     */
    upn?: boolean;
    /**
     * Provides a client-generated, opaque value with a 1 KB character limit that is recorded in the
     * analytics logs when storage analytics logging is enabled.
     */
    requestId?: string;
    /**
     * Additional parameters for the operation
     */
    leaseAccessConditions?: LeaseAccessConditions;
    /**
     * Additional parameters for the operation
     */
    modifiedAccessConditions?: ModifiedAccessConditions;
}
/**
 * Optional Parameters.
 */
export interface BlobDownloadOptionalParams extends coreHttp.RequestOptionsBase {
    /**
     * The snapshot parameter is an opaque DateTime value that, when present, specifies the blob
     * snapshot to retrieve. For more information on working with blob snapshots, see <a
     * href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/creating-a-snapshot-of-a-blob">Creating
     * a Snapshot of a Blob.</a>
     */
    snapshot?: string;
    /**
     * The timeout parameter is expressed in seconds. For more information, see <a
     * href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations">Setting
     * Timeouts for Blob Service Operations.</a>
     */
    timeoutParameter?: number;
    /**
     * Return only the bytes of the blob in the specified range.
     */
    range?: string;
    /**
     * When set to true and specified together with the Range, the service returns the MD5 hash for
     * the range, as long as the range is less than or equal to 4 MB in size.
     */
    rangeGetContentMD5?: boolean;
    /**
     * When set to true and specified together with the Range, the service returns the CRC64 hash for
     * the range, as long as the range is less than or equal to 4 MB in size.
     */
    rangeGetContentCRC64?: boolean;
    /**
     * Provides a client-generated, opaque value with a 1 KB character limit that is recorded in the
     * analytics logs when storage analytics logging is enabled.
     */
    requestId?: string;
    /**
     * Additional parameters for the operation
     */
    leaseAccessConditions?: LeaseAccessConditions;
    /**
     * Additional parameters for the operation
     */
    cpkInfo?: CpkInfo;
    /**
     * Additional parameters for the operation
     */
    modifiedAccessConditions?: ModifiedAccessConditions;
}
/**
 * Optional Parameters.
 */
export interface BlobGetPropertiesOptionalParams extends coreHttp.RequestOptionsBase {
    /**
     * The snapshot parameter is an opaque DateTime value that, when present, specifies the blob
     * snapshot to retrieve. For more information on working with blob snapshots, see <a
     * href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/creating-a-snapshot-of-a-blob">Creating
     * a Snapshot of a Blob.</a>
     */
    snapshot?: string;
    /**
     * The timeout parameter is expressed in seconds. For more information, see <a
     * href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations">Setting
     * Timeouts for Blob Service Operations.</a>
     */
    timeoutParameter?: number;
    /**
     * Provides a client-generated, opaque value with a 1 KB character limit that is recorded in the
     * analytics logs when storage analytics logging is enabled.
     */
    requestId?: string;
    /**
     * Additional parameters for the operation
     */
    leaseAccessConditions?: LeaseAccessConditions;
    /**
     * Additional parameters for the operation
     */
    cpkInfo?: CpkInfo;
    /**
     * Additional parameters for the operation
     */
    modifiedAccessConditions?: ModifiedAccessConditions;
}
/**
 * Optional Parameters.
 */
export interface BlobDeleteMethodOptionalParams extends coreHttp.RequestOptionsBase {
    /**
     * The snapshot parameter is an opaque DateTime value that, when present, specifies the blob
     * snapshot to retrieve. For more information on working with blob snapshots, see <a
     * href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/creating-a-snapshot-of-a-blob">Creating
     * a Snapshot of a Blob.</a>
     */
    snapshot?: string;
    /**
     * The timeout parameter is expressed in seconds. For more information, see <a
     * href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations">Setting
     * Timeouts for Blob Service Operations.</a>
     */
    timeoutParameter?: number;
    /**
     * Required if the blob has associated snapshots. Specify one of the following two options:
     * include: Delete the base blob and all of its snapshots. only: Delete only the blob's snapshots
     * and not the blob itself. Possible values include: 'include', 'only'
     */
    deleteSnapshots?: DeleteSnapshotsOptionType;
    /**
     * Provides a client-generated, opaque value with a 1 KB character limit that is recorded in the
     * analytics logs when storage analytics logging is enabled.
     */
    requestId?: string;
    /**
     * Additional parameters for the operation
     */
    leaseAccessConditions?: LeaseAccessConditions;
    /**
     * Additional parameters for the operation
     */
    modifiedAccessConditions?: ModifiedAccessConditions;
}
/**
 * Optional Parameters.
 */
export interface BlobSetAccessControlOptionalParams extends coreHttp.RequestOptionsBase {
    /**
     * The timeout parameter is expressed in seconds. For more information, see <a
     * href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations">Setting
     * Timeouts for Blob Service Operations.</a>
     */
    timeoutParameter?: number;
    /**
     * Optional. The owner of the blob or directory.
     */
    owner?: string;
    /**
     * Optional. The owning group of the blob or directory.
     */
    group?: string;
    /**
     * Optional and only valid if Hierarchical Namespace is enabled for the account. Sets POSIX
     * access permissions for the file owner, the file owning group, and others. Each class may be
     * granted read, write, or execute permission.  The sticky bit is also supported.  Both symbolic
     * (rwxrw-rw-) and 4-digit octal notation (e.g. 0766) are supported.
     */
    posixPermissions?: string;
    /**
     * Sets POSIX access control rights on files and directories. The value is a comma-separated list
     * of access control entries. Each access control entry (ACE) consists of a scope, a type, a user
     * or group identifier, and permissions in the format "[scope:][type]:[id]:[permissions]".
     */
    posixAcl?: string;
    /**
     * Provides a client-generated, opaque value with a 1 KB character limit that is recorded in the
     * analytics logs when storage analytics logging is enabled.
     */
    requestId?: string;
    /**
     * Additional parameters for the operation
     */
    leaseAccessConditions?: LeaseAccessConditions;
    /**
     * Additional parameters for the operation
     */
    modifiedAccessConditions?: ModifiedAccessConditions;
}
/**
 * Optional Parameters.
 */
export interface BlobGetAccessControlOptionalParams extends coreHttp.RequestOptionsBase {
    /**
     * The timeout parameter is expressed in seconds. For more information, see <a
     * href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations">Setting
     * Timeouts for Blob Service Operations.</a>
     */
    timeoutParameter?: number;
    /**
     * Optional. Valid only when Hierarchical Namespace is enabled for the account. If "true", the
     * identity values returned in the x-ms-owner, x-ms-group, and x-ms-acl response headers will be
     * transformed from Azure Active Directory Object IDs to User Principal Names.  If "false", the
     * values will be returned as Azure Active Directory Object IDs. The default value is false.
     */
    upn?: boolean;
    /**
     * Provides a client-generated, opaque value with a 1 KB character limit that is recorded in the
     * analytics logs when storage analytics logging is enabled.
     */
    requestId?: string;
    /**
     * Additional parameters for the operation
     */
    leaseAccessConditions?: LeaseAccessConditions;
    /**
     * Additional parameters for the operation
     */
    modifiedAccessConditions?: ModifiedAccessConditions;
}
/**
 * Optional Parameters.
 */
export interface BlobRenameOptionalParams extends coreHttp.RequestOptionsBase {
    /**
     * The timeout parameter is expressed in seconds. For more information, see <a
     * href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations">Setting
     * Timeouts for Blob Service Operations.</a>
     */
    timeoutParameter?: number;
    /**
     * Optional.  User-defined properties to be stored with the file or directory, in the format of a
     * comma-separated list of name and value pairs "n1=v1, n2=v2, ...", where each value is base64
     * encoded.
     */
    directoryProperties?: string;
    /**
     * Optional and only valid if Hierarchical Namespace is enabled for the account. Sets POSIX
     * access permissions for the file owner, the file owning group, and others. Each class may be
     * granted read, write, or execute permission.  The sticky bit is also supported.  Both symbolic
     * (rwxrw-rw-) and 4-digit octal notation (e.g. 0766) are supported.
     */
    posixPermissions?: string;
    /**
     * Only valid if Hierarchical Namespace is enabled for the account. This umask restricts
     * permission settings for file and directory, and will only be applied when default Acl does not
     * exist in parent directory. If the umask bit has set, it means that the corresponding
     * permission will be disabled. Otherwise the corresponding permission will be determined by the
     * permission. A 4-digit octal notation (e.g. 0022) is supported here. If no umask was specified,
     * a default umask - 0027 will be used.
     */
    posixUmask?: string;
    /**
     * A lease ID for the source path. If specified, the source path must have an active lease and
     * the leaase ID must match.
     */
    sourceLeaseId?: string;
    /**
     * Provides a client-generated, opaque value with a 1 KB character limit that is recorded in the
     * analytics logs when storage analytics logging is enabled.
     */
    requestId?: string;
    /**
     * Additional parameters for the operation
     */
    directoryHttpHeaders?: DirectoryHttpHeaders;
    /**
     * Additional parameters for the operation
     */
    leaseAccessConditions?: LeaseAccessConditions;
    /**
     * Additional parameters for the operation
     */
    modifiedAccessConditions?: ModifiedAccessConditions;
    /**
     * Additional parameters for the operation
     */
    sourceModifiedAccessConditions?: SourceModifiedAccessConditions;
}
/**
 * Optional Parameters.
 */
export interface BlobUndeleteOptionalParams extends coreHttp.RequestOptionsBase {
    /**
     * The timeout parameter is expressed in seconds. For more information, see <a
     * href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations">Setting
     * Timeouts for Blob Service Operations.</a>
     */
    timeoutParameter?: number;
    /**
     * Provides a client-generated, opaque value with a 1 KB character limit that is recorded in the
     * analytics logs when storage analytics logging is enabled.
     */
    requestId?: string;
}
/**
 * Optional Parameters.
 */
export interface BlobSetHTTPHeadersOptionalParams extends coreHttp.RequestOptionsBase {
    /**
     * The timeout parameter is expressed in seconds. For more information, see <a
     * href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations">Setting
     * Timeouts for Blob Service Operations.</a>
     */
    timeoutParameter?: number;
    /**
     * Provides a client-generated, opaque value with a 1 KB character limit that is recorded in the
     * analytics logs when storage analytics logging is enabled.
     */
    requestId?: string;
    /**
     * Additional parameters for the operation
     */
    blobHTTPHeaders?: BlobHTTPHeaders;
    /**
     * Additional parameters for the operation
     */
    leaseAccessConditions?: LeaseAccessConditions;
    /**
     * Additional parameters for the operation
     */
    modifiedAccessConditions?: ModifiedAccessConditions;
}
/**
 * Optional Parameters.
 */
export interface BlobSetMetadataOptionalParams extends coreHttp.RequestOptionsBase {
    /**
     * The timeout parameter is expressed in seconds. For more information, see <a
     * href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations">Setting
     * Timeouts for Blob Service Operations.</a>
     */
    timeoutParameter?: number;
    /**
     * Optional. Specifies a user-defined name-value pair associated with the blob. If no name-value
     * pairs are specified, the operation will copy the metadata from the source blob or file to the
     * destination blob. If one or more name-value pairs are specified, the destination blob is
     * created with the specified metadata, and metadata is not copied from the source blob or file.
     * Note that beginning with version 2009-09-19, metadata names must adhere to the naming rules
     * for C# identifiers. See Naming and Referencing Containers, Blobs, and Metadata for more
     * information.
     */
    metadata?: {
        [propertyName: string]: string;
    };
    /**
     * Provides a client-generated, opaque value with a 1 KB character limit that is recorded in the
     * analytics logs when storage analytics logging is enabled.
     */
    requestId?: string;
    /**
     * Additional parameters for the operation
     */
    leaseAccessConditions?: LeaseAccessConditions;
    /**
     * Additional parameters for the operation
     */
    cpkInfo?: CpkInfo;
    /**
     * Additional parameters for the operation
     */
    modifiedAccessConditions?: ModifiedAccessConditions;
}
/**
 * Optional Parameters.
 */
export interface BlobAcquireLeaseOptionalParams extends coreHttp.RequestOptionsBase {
    /**
     * The timeout parameter is expressed in seconds. For more information, see <a
     * href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations">Setting
     * Timeouts for Blob Service Operations.</a>
     */
    timeoutParameter?: number;
    /**
     * Specifies the duration of the lease, in seconds, or negative one (-1) for a lease that never
     * expires. A non-infinite lease can be between 15 and 60 seconds. A lease duration cannot be
     * changed using renew or change.
     */
    duration?: number;
    /**
     * Proposed lease ID, in a GUID string format. The Blob service returns 400 (Invalid request) if
     * the proposed lease ID is not in the correct format. See Guid Constructor (String) for a list
     * of valid GUID string formats.
     */
    proposedLeaseId?: string;
    /**
     * Provides a client-generated, opaque value with a 1 KB character limit that is recorded in the
     * analytics logs when storage analytics logging is enabled.
     */
    requestId?: string;
    /**
     * Additional parameters for the operation
     */
    modifiedAccessConditions?: ModifiedAccessConditions;
}
/**
 * Optional Parameters.
 */
export interface BlobReleaseLeaseOptionalParams extends coreHttp.RequestOptionsBase {
    /**
     * The timeout parameter is expressed in seconds. For more information, see <a
     * href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations">Setting
     * Timeouts for Blob Service Operations.</a>
     */
    timeoutParameter?: number;
    /**
     * Provides a client-generated, opaque value with a 1 KB character limit that is recorded in the
     * analytics logs when storage analytics logging is enabled.
     */
    requestId?: string;
    /**
     * Additional parameters for the operation
     */
    modifiedAccessConditions?: ModifiedAccessConditions;
}
/**
 * Optional Parameters.
 */
export interface BlobRenewLeaseOptionalParams extends coreHttp.RequestOptionsBase {
    /**
     * The timeout parameter is expressed in seconds. For more information, see <a
     * href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations">Setting
     * Timeouts for Blob Service Operations.</a>
     */
    timeoutParameter?: number;
    /**
     * Provides a client-generated, opaque value with a 1 KB character limit that is recorded in the
     * analytics logs when storage analytics logging is enabled.
     */
    requestId?: string;
    /**
     * Additional parameters for the operation
     */
    modifiedAccessConditions?: ModifiedAccessConditions;
}
/**
 * Optional Parameters.
 */
export interface BlobChangeLeaseOptionalParams extends coreHttp.RequestOptionsBase {
    /**
     * The timeout parameter is expressed in seconds. For more information, see <a
     * href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations">Setting
     * Timeouts for Blob Service Operations.</a>
     */
    timeoutParameter?: number;
    /**
     * Provides a client-generated, opaque value with a 1 KB character limit that is recorded in the
     * analytics logs when storage analytics logging is enabled.
     */
    requestId?: string;
    /**
     * Additional parameters for the operation
     */
    modifiedAccessConditions?: ModifiedAccessConditions;
}
/**
 * Optional Parameters.
 */
export interface BlobBreakLeaseOptionalParams extends coreHttp.RequestOptionsBase {
    /**
     * The timeout parameter is expressed in seconds. For more information, see <a
     * href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations">Setting
     * Timeouts for Blob Service Operations.</a>
     */
    timeoutParameter?: number;
    /**
     * For a break operation, proposed duration the lease should continue before it is broken, in
     * seconds, between 0 and 60. This break period is only used if it is shorter than the time
     * remaining on the lease. If longer, the time remaining on the lease is used. A new lease will
     * not be available before the break period has expired, but the lease may be held for longer
     * than the break period. If this header does not appear with a break operation, a fixed-duration
     * lease breaks after the remaining lease period elapses, and an infinite lease breaks
     * immediately.
     */
    breakPeriod?: number;
    /**
     * Provides a client-generated, opaque value with a 1 KB character limit that is recorded in the
     * analytics logs when storage analytics logging is enabled.
     */
    requestId?: string;
    /**
     * Additional parameters for the operation
     */
    modifiedAccessConditions?: ModifiedAccessConditions;
}
/**
 * Optional Parameters.
 */
export interface BlobCreateSnapshotOptionalParams extends coreHttp.RequestOptionsBase {
    /**
     * The timeout parameter is expressed in seconds. For more information, see <a
     * href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations">Setting
     * Timeouts for Blob Service Operations.</a>
     */
    timeoutParameter?: number;
    /**
     * Optional. Specifies a user-defined name-value pair associated with the blob. If no name-value
     * pairs are specified, the operation will copy the metadata from the source blob or file to the
     * destination blob. If one or more name-value pairs are specified, the destination blob is
     * created with the specified metadata, and metadata is not copied from the source blob or file.
     * Note that beginning with version 2009-09-19, metadata names must adhere to the naming rules
     * for C# identifiers. See Naming and Referencing Containers, Blobs, and Metadata for more
     * information.
     */
    metadata?: {
        [propertyName: string]: string;
    };
    /**
     * Provides a client-generated, opaque value with a 1 KB character limit that is recorded in the
     * analytics logs when storage analytics logging is enabled.
     */
    requestId?: string;
    /**
     * Additional parameters for the operation
     */
    cpkInfo?: CpkInfo;
    /**
     * Additional parameters for the operation
     */
    modifiedAccessConditions?: ModifiedAccessConditions;
    /**
     * Additional parameters for the operation
     */
    leaseAccessConditions?: LeaseAccessConditions;
}
/**
 * Optional Parameters.
 */
export interface BlobStartCopyFromURLOptionalParams extends coreHttp.RequestOptionsBase {
    /**
     * The timeout parameter is expressed in seconds. For more information, see <a
     * href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations">Setting
     * Timeouts for Blob Service Operations.</a>
     */
    timeoutParameter?: number;
    /**
     * Optional. Specifies a user-defined name-value pair associated with the blob. If no name-value
     * pairs are specified, the operation will copy the metadata from the source blob or file to the
     * destination blob. If one or more name-value pairs are specified, the destination blob is
     * created with the specified metadata, and metadata is not copied from the source blob or file.
     * Note that beginning with version 2009-09-19, metadata names must adhere to the naming rules
     * for C# identifiers. See Naming and Referencing Containers, Blobs, and Metadata for more
     * information.
     */
    metadata?: {
        [propertyName: string]: string;
    };
    /**
     * Optional. Indicates the tier to be set on the blob. Possible values include: 'P4', 'P6',
     * 'P10', 'P15', 'P20', 'P30', 'P40', 'P50', 'P60', 'P70', 'P80', 'Hot', 'Cool', 'Archive'
     */
    tier?: AccessTier;
    /**
     * Optional: Indicates the priority with which to rehydrate an archived blob. Possible values
     * include: 'High', 'Standard'
     */
    rehydratePriority?: RehydratePriority;
    /**
     * Provides a client-generated, opaque value with a 1 KB character limit that is recorded in the
     * analytics logs when storage analytics logging is enabled.
     */
    requestId?: string;
    /**
     * Additional parameters for the operation
     */
    sourceModifiedAccessConditions?: SourceModifiedAccessConditions;
    /**
     * Additional parameters for the operation
     */
    modifiedAccessConditions?: ModifiedAccessConditions;
    /**
     * Additional parameters for the operation
     */
    leaseAccessConditions?: LeaseAccessConditions;
}
/**
 * Optional Parameters.
 */
export interface BlobCopyFromURLOptionalParams extends coreHttp.RequestOptionsBase {
    /**
     * The timeout parameter is expressed in seconds. For more information, see <a
     * href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations">Setting
     * Timeouts for Blob Service Operations.</a>
     */
    timeoutParameter?: number;
    /**
     * Optional. Specifies a user-defined name-value pair associated with the blob. If no name-value
     * pairs are specified, the operation will copy the metadata from the source blob or file to the
     * destination blob. If one or more name-value pairs are specified, the destination blob is
     * created with the specified metadata, and metadata is not copied from the source blob or file.
     * Note that beginning with version 2009-09-19, metadata names must adhere to the naming rules
     * for C# identifiers. See Naming and Referencing Containers, Blobs, and Metadata for more
     * information.
     */
    metadata?: {
        [propertyName: string]: string;
    };
    /**
     * Optional. Indicates the tier to be set on the blob. Possible values include: 'P4', 'P6',
     * 'P10', 'P15', 'P20', 'P30', 'P40', 'P50', 'P60', 'P70', 'P80', 'Hot', 'Cool', 'Archive'
     */
    tier?: AccessTier;
    /**
     * Provides a client-generated, opaque value with a 1 KB character limit that is recorded in the
     * analytics logs when storage analytics logging is enabled.
     */
    requestId?: string;
    /**
     * Additional parameters for the operation
     */
    sourceModifiedAccessConditions?: SourceModifiedAccessConditions;
    /**
     * Additional parameters for the operation
     */
    modifiedAccessConditions?: ModifiedAccessConditions;
    /**
     * Additional parameters for the operation
     */
    leaseAccessConditions?: LeaseAccessConditions;
}
/**
 * Optional Parameters.
 */
export interface BlobAbortCopyFromURLOptionalParams extends coreHttp.RequestOptionsBase {
    /**
     * The timeout parameter is expressed in seconds. For more information, see <a
     * href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations">Setting
     * Timeouts for Blob Service Operations.</a>
     */
    timeoutParameter?: number;
    /**
     * Provides a client-generated, opaque value with a 1 KB character limit that is recorded in the
     * analytics logs when storage analytics logging is enabled.
     */
    requestId?: string;
    /**
     * Additional parameters for the operation
     */
    leaseAccessConditions?: LeaseAccessConditions;
}
/**
 * Optional Parameters.
 */
export interface BlobSetTierOptionalParams extends coreHttp.RequestOptionsBase {
    /**
     * The timeout parameter is expressed in seconds. For more information, see <a
     * href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations">Setting
     * Timeouts for Blob Service Operations.</a>
     */
    timeoutParameter?: number;
    /**
     * Optional: Indicates the priority with which to rehydrate an archived blob. Possible values
     * include: 'High', 'Standard'
     */
    rehydratePriority?: RehydratePriority;
    /**
     * Provides a client-generated, opaque value with a 1 KB character limit that is recorded in the
     * analytics logs when storage analytics logging is enabled.
     */
    requestId?: string;
    /**
     * Additional parameters for the operation
     */
    leaseAccessConditions?: LeaseAccessConditions;
}
/**
 * Optional Parameters.
 */
export interface PageBlobCreateOptionalParams extends coreHttp.RequestOptionsBase {
    /**
     * The timeout parameter is expressed in seconds. For more information, see <a
     * href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations">Setting
     * Timeouts for Blob Service Operations.</a>
     */
    timeoutParameter?: number;
    /**
     * Optional. Specifies a user-defined name-value pair associated with the blob. If no name-value
     * pairs are specified, the operation will copy the metadata from the source blob or file to the
     * destination blob. If one or more name-value pairs are specified, the destination blob is
     * created with the specified metadata, and metadata is not copied from the source blob or file.
     * Note that beginning with version 2009-09-19, metadata names must adhere to the naming rules
     * for C# identifiers. See Naming and Referencing Containers, Blobs, and Metadata for more
     * information.
     */
    metadata?: {
        [propertyName: string]: string;
    };
    /**
     * Set for page blobs only. The sequence number is a user-controlled value that you can use to
     * track requests. The value of the sequence number must be between 0 and 2^63 - 1. Default
     * value: 0.
     */
    blobSequenceNumber?: number;
    /**
     * Provides a client-generated, opaque value with a 1 KB character limit that is recorded in the
     * analytics logs when storage analytics logging is enabled.
     */
    requestId?: string;
    /**
     * Optional. Indicates the tier to be set on the blob. Possible values include: 'P4', 'P6',
     * 'P10', 'P15', 'P20', 'P30', 'P40', 'P50', 'P60', 'P70', 'P80', 'Hot', 'Cool', 'Archive'
     */
    tier?: AccessTier;
    /**
     * Additional parameters for the operation
     */
    blobHTTPHeaders?: BlobHTTPHeaders;
    /**
     * Additional parameters for the operation
     */
    leaseAccessConditions?: LeaseAccessConditions;
    /**
     * Additional parameters for the operation
     */
    cpkInfo?: CpkInfo;
    /**
     * Additional parameters for the operation
     */
    modifiedAccessConditions?: ModifiedAccessConditions;
}
/**
 * Optional Parameters.
 */
export interface PageBlobUploadPagesOptionalParams extends coreHttp.RequestOptionsBase {
    /**
     * Specify the transactional md5 for the body, to be validated by the service.
     */
    transactionalContentMD5?: Uint8Array;
    /**
     * Specify the transactional crc64 for the body, to be validated by the service.
     */
    transactionalContentCrc64?: Uint8Array;
    /**
     * The timeout parameter is expressed in seconds. For more information, see <a
     * href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations">Setting
     * Timeouts for Blob Service Operations.</a>
     */
    timeoutParameter?: number;
    /**
     * Return only the bytes of the blob in the specified range.
     */
    range?: string;
    /**
     * Provides a client-generated, opaque value with a 1 KB character limit that is recorded in the
     * analytics logs when storage analytics logging is enabled.
     */
    requestId?: string;
    /**
     * Additional parameters for the operation
     */
    leaseAccessConditions?: LeaseAccessConditions;
    /**
     * Additional parameters for the operation
     */
    cpkInfo?: CpkInfo;
    /**
     * Additional parameters for the operation
     */
    sequenceNumberAccessConditions?: SequenceNumberAccessConditions;
    /**
     * Additional parameters for the operation
     */
    modifiedAccessConditions?: ModifiedAccessConditions;
}
/**
 * Optional Parameters.
 */
export interface PageBlobClearPagesOptionalParams extends coreHttp.RequestOptionsBase {
    /**
     * The timeout parameter is expressed in seconds. For more information, see <a
     * href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations">Setting
     * Timeouts for Blob Service Operations.</a>
     */
    timeoutParameter?: number;
    /**
     * Return only the bytes of the blob in the specified range.
     */
    range?: string;
    /**
     * Provides a client-generated, opaque value with a 1 KB character limit that is recorded in the
     * analytics logs when storage analytics logging is enabled.
     */
    requestId?: string;
    /**
     * Additional parameters for the operation
     */
    leaseAccessConditions?: LeaseAccessConditions;
    /**
     * Additional parameters for the operation
     */
    cpkInfo?: CpkInfo;
    /**
     * Additional parameters for the operation
     */
    sequenceNumberAccessConditions?: SequenceNumberAccessConditions;
    /**
     * Additional parameters for the operation
     */
    modifiedAccessConditions?: ModifiedAccessConditions;
}
/**
 * Optional Parameters.
 */
export interface PageBlobUploadPagesFromURLOptionalParams extends coreHttp.RequestOptionsBase {
    /**
     * Specify the md5 calculated for the range of bytes that must be read from the copy source.
     */
    sourceContentMD5?: Uint8Array;
    /**
     * Specify the crc64 calculated for the range of bytes that must be read from the copy source.
     */
    sourceContentCrc64?: Uint8Array;
    /**
     * The timeout parameter is expressed in seconds. For more information, see <a
     * href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations">Setting
     * Timeouts for Blob Service Operations.</a>
     */
    timeoutParameter?: number;
    /**
     * Provides a client-generated, opaque value with a 1 KB character limit that is recorded in the
     * analytics logs when storage analytics logging is enabled.
     */
    requestId?: string;
    /**
     * Additional parameters for the operation
     */
    cpkInfo?: CpkInfo;
    /**
     * Additional parameters for the operation
     */
    leaseAccessConditions?: LeaseAccessConditions;
    /**
     * Additional parameters for the operation
     */
    sequenceNumberAccessConditions?: SequenceNumberAccessConditions;
    /**
     * Additional parameters for the operation
     */
    modifiedAccessConditions?: ModifiedAccessConditions;
    /**
     * Additional parameters for the operation
     */
    sourceModifiedAccessConditions?: SourceModifiedAccessConditions;
}
/**
 * Optional Parameters.
 */
export interface PageBlobGetPageRangesOptionalParams extends coreHttp.RequestOptionsBase {
    /**
     * The snapshot parameter is an opaque DateTime value that, when present, specifies the blob
     * snapshot to retrieve. For more information on working with blob snapshots, see <a
     * href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/creating-a-snapshot-of-a-blob">Creating
     * a Snapshot of a Blob.</a>
     */
    snapshot?: string;
    /**
     * The timeout parameter is expressed in seconds. For more information, see <a
     * href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations">Setting
     * Timeouts for Blob Service Operations.</a>
     */
    timeoutParameter?: number;
    /**
     * Return only the bytes of the blob in the specified range.
     */
    range?: string;
    /**
     * Provides a client-generated, opaque value with a 1 KB character limit that is recorded in the
     * analytics logs when storage analytics logging is enabled.
     */
    requestId?: string;
    /**
     * Additional parameters for the operation
     */
    leaseAccessConditions?: LeaseAccessConditions;
    /**
     * Additional parameters for the operation
     */
    modifiedAccessConditions?: ModifiedAccessConditions;
}
/**
 * Optional Parameters.
 */
export interface PageBlobGetPageRangesDiffOptionalParams extends coreHttp.RequestOptionsBase {
    /**
     * The snapshot parameter is an opaque DateTime value that, when present, specifies the blob
     * snapshot to retrieve. For more information on working with blob snapshots, see <a
     * href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/creating-a-snapshot-of-a-blob">Creating
     * a Snapshot of a Blob.</a>
     */
    snapshot?: string;
    /**
     * The timeout parameter is expressed in seconds. For more information, see <a
     * href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations">Setting
     * Timeouts for Blob Service Operations.</a>
     */
    timeoutParameter?: number;
    /**
     * Optional in version 2015-07-08 and newer. The prevsnapshot parameter is a DateTime value that
     * specifies that the response will contain only pages that were changed between target blob and
     * previous snapshot. Changed pages include both updated and cleared pages. The target blob may
     * be a snapshot, as long as the snapshot specified by prevsnapshot is the older of the two. Note
     * that incremental snapshots are currently supported only for blobs created on or after January
     * 1, 2016.
     */
    prevsnapshot?: string;
    /**
     * Return only the bytes of the blob in the specified range.
     */
    range?: string;
    /**
     * Provides a client-generated, opaque value with a 1 KB character limit that is recorded in the
     * analytics logs when storage analytics logging is enabled.
     */
    requestId?: string;
    /**
     * Additional parameters for the operation
     */
    leaseAccessConditions?: LeaseAccessConditions;
    /**
     * Additional parameters for the operation
     */
    modifiedAccessConditions?: ModifiedAccessConditions;
}
/**
 * Optional Parameters.
 */
export interface PageBlobResizeOptionalParams extends coreHttp.RequestOptionsBase {
    /**
     * The timeout parameter is expressed in seconds. For more information, see <a
     * href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations">Setting
     * Timeouts for Blob Service Operations.</a>
     */
    timeoutParameter?: number;
    /**
     * Provides a client-generated, opaque value with a 1 KB character limit that is recorded in the
     * analytics logs when storage analytics logging is enabled.
     */
    requestId?: string;
    /**
     * Additional parameters for the operation
     */
    leaseAccessConditions?: LeaseAccessConditions;
    /**
     * Additional parameters for the operation
     */
    cpkInfo?: CpkInfo;
    /**
     * Additional parameters for the operation
     */
    modifiedAccessConditions?: ModifiedAccessConditions;
}
/**
 * Optional Parameters.
 */
export interface PageBlobUpdateSequenceNumberOptionalParams extends coreHttp.RequestOptionsBase {
    /**
     * The timeout parameter is expressed in seconds. For more information, see <a
     * href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations">Setting
     * Timeouts for Blob Service Operations.</a>
     */
    timeoutParameter?: number;
    /**
     * Set for page blobs only. The sequence number is a user-controlled value that you can use to
     * track requests. The value of the sequence number must be between 0 and 2^63 - 1. Default
     * value: 0.
     */
    blobSequenceNumber?: number;
    /**
     * Provides a client-generated, opaque value with a 1 KB character limit that is recorded in the
     * analytics logs when storage analytics logging is enabled.
     */
    requestId?: string;
    /**
     * Additional parameters for the operation
     */
    leaseAccessConditions?: LeaseAccessConditions;
    /**
     * Additional parameters for the operation
     */
    modifiedAccessConditions?: ModifiedAccessConditions;
}
/**
 * Optional Parameters.
 */
export interface PageBlobCopyIncrementalOptionalParams extends coreHttp.RequestOptionsBase {
    /**
     * The timeout parameter is expressed in seconds. For more information, see <a
     * href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations">Setting
     * Timeouts for Blob Service Operations.</a>
     */
    timeoutParameter?: number;
    /**
     * Provides a client-generated, opaque value with a 1 KB character limit that is recorded in the
     * analytics logs when storage analytics logging is enabled.
     */
    requestId?: string;
    /**
     * Additional parameters for the operation
     */
    modifiedAccessConditions?: ModifiedAccessConditions;
}
/**
 * Optional Parameters.
 */
export interface AppendBlobCreateOptionalParams extends coreHttp.RequestOptionsBase {
    /**
     * The timeout parameter is expressed in seconds. For more information, see <a
     * href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations">Setting
     * Timeouts for Blob Service Operations.</a>
     */
    timeoutParameter?: number;
    /**
     * Optional. Specifies a user-defined name-value pair associated with the blob. If no name-value
     * pairs are specified, the operation will copy the metadata from the source blob or file to the
     * destination blob. If one or more name-value pairs are specified, the destination blob is
     * created with the specified metadata, and metadata is not copied from the source blob or file.
     * Note that beginning with version 2009-09-19, metadata names must adhere to the naming rules
     * for C# identifiers. See Naming and Referencing Containers, Blobs, and Metadata for more
     * information.
     */
    metadata?: {
        [propertyName: string]: string;
    };
    /**
     * Provides a client-generated, opaque value with a 1 KB character limit that is recorded in the
     * analytics logs when storage analytics logging is enabled.
     */
    requestId?: string;
    /**
     * Additional parameters for the operation
     */
    blobHTTPHeaders?: BlobHTTPHeaders;
    /**
     * Additional parameters for the operation
     */
    leaseAccessConditions?: LeaseAccessConditions;
    /**
     * Additional parameters for the operation
     */
    cpkInfo?: CpkInfo;
    /**
     * Additional parameters for the operation
     */
    modifiedAccessConditions?: ModifiedAccessConditions;
}
/**
 * Optional Parameters.
 */
export interface AppendBlobAppendBlockOptionalParams extends coreHttp.RequestOptionsBase {
    /**
     * The timeout parameter is expressed in seconds. For more information, see <a
     * href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations">Setting
     * Timeouts for Blob Service Operations.</a>
     */
    timeoutParameter?: number;
    /**
     * Specify the transactional md5 for the body, to be validated by the service.
     */
    transactionalContentMD5?: Uint8Array;
    /**
     * Specify the transactional crc64 for the body, to be validated by the service.
     */
    transactionalContentCrc64?: Uint8Array;
    /**
     * Provides a client-generated, opaque value with a 1 KB character limit that is recorded in the
     * analytics logs when storage analytics logging is enabled.
     */
    requestId?: string;
    /**
     * Additional parameters for the operation
     */
    leaseAccessConditions?: LeaseAccessConditions;
    /**
     * Additional parameters for the operation
     */
    appendPositionAccessConditions?: AppendPositionAccessConditions;
    /**
     * Additional parameters for the operation
     */
    cpkInfo?: CpkInfo;
    /**
     * Additional parameters for the operation
     */
    modifiedAccessConditions?: ModifiedAccessConditions;
}
/**
 * Optional Parameters.
 */
export interface AppendBlobAppendBlockFromUrlOptionalParams extends coreHttp.RequestOptionsBase {
    /**
     * Bytes of source data in the specified range.
     */
    sourceRange?: string;
    /**
     * Specify the md5 calculated for the range of bytes that must be read from the copy source.
     */
    sourceContentMD5?: Uint8Array;
    /**
     * Specify the crc64 calculated for the range of bytes that must be read from the copy source.
     */
    sourceContentCrc64?: Uint8Array;
    /**
     * The timeout parameter is expressed in seconds. For more information, see <a
     * href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations">Setting
     * Timeouts for Blob Service Operations.</a>
     */
    timeoutParameter?: number;
    /**
     * Specify the transactional md5 for the body, to be validated by the service.
     */
    transactionalContentMD5?: Uint8Array;
    /**
     * Provides a client-generated, opaque value with a 1 KB character limit that is recorded in the
     * analytics logs when storage analytics logging is enabled.
     */
    requestId?: string;
    /**
     * Additional parameters for the operation
     */
    cpkInfo?: CpkInfo;
    /**
     * Additional parameters for the operation
     */
    leaseAccessConditions?: LeaseAccessConditions;
    /**
     * Additional parameters for the operation
     */
    appendPositionAccessConditions?: AppendPositionAccessConditions;
    /**
     * Additional parameters for the operation
     */
    modifiedAccessConditions?: ModifiedAccessConditions;
    /**
     * Additional parameters for the operation
     */
    sourceModifiedAccessConditions?: SourceModifiedAccessConditions;
}
/**
 * Optional Parameters.
 */
export interface BlockBlobUploadOptionalParams extends coreHttp.RequestOptionsBase {
    /**
     * The timeout parameter is expressed in seconds. For more information, see <a
     * href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations">Setting
     * Timeouts for Blob Service Operations.</a>
     */
    timeoutParameter?: number;
    /**
     * Optional. Specifies a user-defined name-value pair associated with the blob. If no name-value
     * pairs are specified, the operation will copy the metadata from the source blob or file to the
     * destination blob. If one or more name-value pairs are specified, the destination blob is
     * created with the specified metadata, and metadata is not copied from the source blob or file.
     * Note that beginning with version 2009-09-19, metadata names must adhere to the naming rules
     * for C# identifiers. See Naming and Referencing Containers, Blobs, and Metadata for more
     * information.
     */
    metadata?: {
        [propertyName: string]: string;
    };
    /**
     * Optional. Indicates the tier to be set on the blob. Possible values include: 'P4', 'P6',
     * 'P10', 'P15', 'P20', 'P30', 'P40', 'P50', 'P60', 'P70', 'P80', 'Hot', 'Cool', 'Archive'
     */
    tier?: AccessTier;
    /**
     * Provides a client-generated, opaque value with a 1 KB character limit that is recorded in the
     * analytics logs when storage analytics logging is enabled.
     */
    requestId?: string;
    /**
     * Additional parameters for the operation
     */
    blobHTTPHeaders?: BlobHTTPHeaders;
    /**
     * Additional parameters for the operation
     */
    leaseAccessConditions?: LeaseAccessConditions;
    /**
     * Additional parameters for the operation
     */
    cpkInfo?: CpkInfo;
    /**
     * Additional parameters for the operation
     */
    modifiedAccessConditions?: ModifiedAccessConditions;
}
/**
 * Optional Parameters.
 */
export interface BlockBlobStageBlockOptionalParams extends coreHttp.RequestOptionsBase {
    /**
     * Specify the transactional md5 for the body, to be validated by the service.
     */
    transactionalContentMD5?: Uint8Array;
    /**
     * Specify the transactional crc64 for the body, to be validated by the service.
     */
    transactionalContentCrc64?: Uint8Array;
    /**
     * The timeout parameter is expressed in seconds. For more information, see <a
     * href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations">Setting
     * Timeouts for Blob Service Operations.</a>
     */
    timeoutParameter?: number;
    /**
     * Provides a client-generated, opaque value with a 1 KB character limit that is recorded in the
     * analytics logs when storage analytics logging is enabled.
     */
    requestId?: string;
    /**
     * Additional parameters for the operation
     */
    leaseAccessConditions?: LeaseAccessConditions;
    /**
     * Additional parameters for the operation
     */
    cpkInfo?: CpkInfo;
}
/**
 * Optional Parameters.
 */
export interface BlockBlobStageBlockFromURLOptionalParams extends coreHttp.RequestOptionsBase {
    /**
     * Bytes of source data in the specified range.
     */
    sourceRange?: string;
    /**
     * Specify the md5 calculated for the range of bytes that must be read from the copy source.
     */
    sourceContentMD5?: Uint8Array;
    /**
     * Specify the crc64 calculated for the range of bytes that must be read from the copy source.
     */
    sourceContentCrc64?: Uint8Array;
    /**
     * The timeout parameter is expressed in seconds. For more information, see <a
     * href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations">Setting
     * Timeouts for Blob Service Operations.</a>
     */
    timeoutParameter?: number;
    /**
     * Provides a client-generated, opaque value with a 1 KB character limit that is recorded in the
     * analytics logs when storage analytics logging is enabled.
     */
    requestId?: string;
    /**
     * Additional parameters for the operation
     */
    cpkInfo?: CpkInfo;
    /**
     * Additional parameters for the operation
     */
    leaseAccessConditions?: LeaseAccessConditions;
    /**
     * Additional parameters for the operation
     */
    sourceModifiedAccessConditions?: SourceModifiedAccessConditions;
}
/**
 * Optional Parameters.
 */
export interface BlockBlobCommitBlockListOptionalParams extends coreHttp.RequestOptionsBase {
    /**
     * The timeout parameter is expressed in seconds. For more information, see <a
     * href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations">Setting
     * Timeouts for Blob Service Operations.</a>
     */
    timeoutParameter?: number;
    /**
     * Specify the transactional md5 for the body, to be validated by the service.
     */
    transactionalContentMD5?: Uint8Array;
    /**
     * Specify the transactional crc64 for the body, to be validated by the service.
     */
    transactionalContentCrc64?: Uint8Array;
    /**
     * Optional. Specifies a user-defined name-value pair associated with the blob. If no name-value
     * pairs are specified, the operation will copy the metadata from the source blob or file to the
     * destination blob. If one or more name-value pairs are specified, the destination blob is
     * created with the specified metadata, and metadata is not copied from the source blob or file.
     * Note that beginning with version 2009-09-19, metadata names must adhere to the naming rules
     * for C# identifiers. See Naming and Referencing Containers, Blobs, and Metadata for more
     * information.
     */
    metadata?: {
        [propertyName: string]: string;
    };
    /**
     * Optional. Indicates the tier to be set on the blob. Possible values include: 'P4', 'P6',
     * 'P10', 'P15', 'P20', 'P30', 'P40', 'P50', 'P60', 'P70', 'P80', 'Hot', 'Cool', 'Archive'
     */
    tier?: AccessTier;
    /**
     * Provides a client-generated, opaque value with a 1 KB character limit that is recorded in the
     * analytics logs when storage analytics logging is enabled.
     */
    requestId?: string;
    /**
     * Additional parameters for the operation
     */
    blobHTTPHeaders?: BlobHTTPHeaders;
    /**
     * Additional parameters for the operation
     */
    leaseAccessConditions?: LeaseAccessConditions;
    /**
     * Additional parameters for the operation
     */
    cpkInfo?: CpkInfo;
    /**
     * Additional parameters for the operation
     */
    modifiedAccessConditions?: ModifiedAccessConditions;
}
/**
 * Optional Parameters.
 */
export interface BlockBlobGetBlockListOptionalParams extends coreHttp.RequestOptionsBase {
    /**
     * The snapshot parameter is an opaque DateTime value that, when present, specifies the blob
     * snapshot to retrieve. For more information on working with blob snapshots, see <a
     * href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/creating-a-snapshot-of-a-blob">Creating
     * a Snapshot of a Blob.</a>
     */
    snapshot?: string;
    /**
     * The timeout parameter is expressed in seconds. For more information, see <a
     * href="https://docs.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations">Setting
     * Timeouts for Blob Service Operations.</a>
     */
    timeoutParameter?: number;
    /**
     * Provides a client-generated, opaque value with a 1 KB character limit that is recorded in the
     * analytics logs when storage analytics logging is enabled.
     */
    requestId?: string;
    /**
     * Additional parameters for the operation
     */
    leaseAccessConditions?: LeaseAccessConditions;
}
/**
 * Defines headers for SetProperties operation.
 */
export interface ServiceSetPropertiesHeaders {
    /**
     * If a client request id header is sent in the request, this header will be present in the
     * response with the same value.
     */
    clientRequestId?: string;
    /**
     * This header uniquely identifies the request that was made and can be used for troubleshooting
     * the request.
     */
    requestId?: string;
    /**
     * Indicates the version of the Blob service used to execute the request. This header is returned
     * for requests made against version 2009-09-19 and above.
     */
    version?: string;
    errorCode?: string;
}
/**
 * Defines headers for GetProperties operation.
 */
export interface ServiceGetPropertiesHeaders {
    /**
     * If a client request id header is sent in the request, this header will be present in the
     * response with the same value.
     */
    clientRequestId?: string;
    /**
     * This header uniquely identifies the request that was made and can be used for troubleshooting
     * the request.
     */
    requestId?: string;
    /**
     * Indicates the version of the Blob service used to execute the request. This header is returned
     * for requests made against version 2009-09-19 and above.
     */
    version?: string;
    errorCode?: string;
}
/**
 * Defines headers for GetStatistics operation.
 */
export interface ServiceGetStatisticsHeaders {
    /**
     * If a client request id header is sent in the request, this header will be present in the
     * response with the same value.
     */
    clientRequestId?: string;
    /**
     * This header uniquely identifies the request that was made and can be used for troubleshooting
     * the request.
     */
    requestId?: string;
    /**
     * Indicates the version of the Blob service used to execute the request. This header is returned
     * for requests made against version 2009-09-19 and above.
     */
    version?: string;
    /**
     * UTC date/time value generated by the service that indicates the time at which the response was
     * initiated
     */
    date?: Date;
    errorCode?: string;
}
/**
 * Defines headers for ListContainersSegment operation.
 */
export interface ServiceListContainersSegmentHeaders {
    /**
     * If a client request id header is sent in the request, this header will be present in the
     * response with the same value.
     */
    clientRequestId?: string;
    /**
     * This header uniquely identifies the request that was made and can be used for troubleshooting
     * the request.
     */
    requestId?: string;
    /**
     * Indicates the version of the Blob service used to execute the request. This header is returned
     * for requests made against version 2009-09-19 and above.
     */
    version?: string;
    errorCode?: string;
}
/**
 * Defines headers for GetUserDelegationKey operation.
 */
export interface ServiceGetUserDelegationKeyHeaders {
    /**
     * If a client request id header is sent in the request, this header will be present in the
     * response with the same value.
     */
    clientRequestId?: string;
    /**
     * This header uniquely identifies the request that was made and can be used for troubleshooting
     * the request.
     */
    requestId?: string;
    /**
     * Indicates the version of the Blob service used to execute the request. This header is returned
     * for requests made against version 2009-09-19 and above.
     */
    version?: string;
    /**
     * UTC date/time value generated by the service that indicates the time at which the response was
     * initiated
     */
    date?: Date;
    errorCode?: string;
}
/**
 * Defines headers for GetAccountInfo operation.
 */
export interface ServiceGetAccountInfoHeaders {
    /**
     * If a client request id header is sent in the request, this header will be present in the
     * response with the same value.
     */
    clientRequestId?: string;
    /**
     * This header uniquely identifies the request that was made and can be used for troubleshooting
     * the request.
     */
    requestId?: string;
    /**
     * Indicates the version of the Blob service used to execute the request. This header is returned
     * for requests made against version 2009-09-19 and above.
     */
    version?: string;
    /**
     * UTC date/time value generated by the service that indicates the time at which the response was
     * initiated
     */
    date?: Date;
    /**
     * Identifies the sku name of the account. Possible values include: 'Standard_LRS',
     * 'Standard_GRS', 'Standard_RAGRS', 'Standard_ZRS', 'Premium_LRS'
     */
    skuName?: SkuName;
    /**
     * Identifies the account kind. Possible values include: 'Storage', 'BlobStorage', 'StorageV2'
     */
    accountKind?: AccountKind;
    errorCode?: string;
}
/**
 * Defines headers for SubmitBatch operation.
 */
export interface ServiceSubmitBatchHeaders {
    /**
     * If a client request id header is sent in the request, this header will be present in the
     * response with the same value.
     */
    clientRequestId?: string;
    /**
     * The media type of the body of the response. For batch requests, this is multipart/mixed;
     * boundary=batchresponse_GUID
     */
    contentType?: string;
    /**
     * This header uniquely identifies the request that was made and can be used for troubleshooting
     * the request.
     */
    requestId?: string;
    /**
     * Indicates the version of the Blob service used to execute the request. This header is returned
     * for requests made against version 2009-09-19 and above.
     */
    version?: string;
    errorCode?: string;
}
/**
 * Defines headers for Create operation.
 */
export interface ContainerCreateHeaders {
    /**
     * The ETag contains a value that you can use to perform operations conditionally. If the request
     * version is 2011-08-18 or newer, the ETag value will be in quotes.
     */
    eTag?: string;
    /**
     * Returns the date and time the container was last modified. Any operation that modifies the
     * blob, including an update of the blob's metadata or properties, changes the last-modified time
     * of the blob.
     */
    lastModified?: Date;
    /**
     * If a client request id header is sent in the request, this header will be present in the
     * response with the same value.
     */
    clientRequestId?: string;
    /**
     * This header uniquely identifies the request that was made and can be used for troubleshooting
     * the request.
     */
    requestId?: string;
    /**
     * Indicates the version of the Blob service used to execute the request. This header is returned
     * for requests made against version 2009-09-19 and above.
     */
    version?: string;
    /**
     * UTC date/time value generated by the service that indicates the time at which the response was
     * initiated
     */
    date?: Date;
    errorCode?: string;
}
/**
 * Defines headers for GetProperties operation.
 */
export interface ContainerGetPropertiesHeaders {
    metadata?: {
        [propertyName: string]: string;
    };
    /**
     * The ETag contains a value that you can use to perform operations conditionally. If the request
     * version is 2011-08-18 or newer, the ETag value will be in quotes.
     */
    eTag?: string;
    /**
     * Returns the date and time the container was last modified. Any operation that modifies the
     * blob, including an update of the blob's metadata or properties, changes the last-modified time
     * of the blob.
     */
    lastModified?: Date;
    /**
     * When a blob is leased, specifies whether the lease is of infinite or fixed duration. Possible
     * values include: 'infinite', 'fixed'
     */
    leaseDuration?: LeaseDurationType;
    /**
     * Lease state of the blob. Possible values include: 'available', 'leased', 'expired',
     * 'breaking', 'broken'
     */
    leaseState?: LeaseStateType;
    /**
     * The current lease status of the blob. Possible values include: 'locked', 'unlocked'
     */
    leaseStatus?: LeaseStatusType;
    /**
     * If a client request id header is sent in the request, this header will be present in the
     * response with the same value.
     */
    clientRequestId?: string;
    /**
     * This header uniquely identifies the request that was made and can be used for troubleshooting
     * the request.
     */
    requestId?: string;
    /**
     * Indicates the version of the Blob service used to execute the request. This header is returned
     * for requests made against version 2009-09-19 and above.
     */
    version?: string;
    /**
     * UTC date/time value generated by the service that indicates the time at which the response was
     * initiated
     */
    date?: Date;
    /**
     * Indicated whether data in the container may be accessed publicly and the level of access.
     * Possible values include: 'container', 'blob'
     */
    blobPublicAccess?: PublicAccessType;
    /**
     * Indicates whether the container has an immutability policy set on it.
     */
    hasImmutabilityPolicy?: boolean;
    /**
     * Indicates whether the container has a legal hold.
     */
    hasLegalHold?: boolean;
    errorCode?: string;
}
/**
 * Defines headers for Delete operation.
 */
export interface ContainerDeleteHeaders {
    /**
     * If a client request id header is sent in the request, this header will be present in the
     * response with the same value.
     */
    clientRequestId?: string;
    /**
     * This header uniquely identifies the request that was made and can be used for troubleshooting
     * the request.
     */
    requestId?: string;
    /**
     * Indicates the version of the Blob service used to execute the request. This header is returned
     * for requests made against version 2009-09-19 and above.
     */
    version?: string;
    /**
     * UTC date/time value generated by the service that indicates the time at which the response was
     * initiated
     */
    date?: Date;
    errorCode?: string;
}
/**
 * Defines headers for SetMetadata operation.
 */
export interface ContainerSetMetadataHeaders {
    /**
     * The ETag contains a value that you can use to perform operations conditionally. If the request
     * version is 2011-08-18 or newer, the ETag value will be in quotes.
     */
    eTag?: string;
    /**
     * Returns the date and time the container was last modified. Any operation that modifies the
     * blob, including an update of the blob's metadata or properties, changes the last-modified time
     * of the blob.
     */
    lastModified?: Date;
    /**
     * If a client request id header is sent in the request, this header will be present in the
     * response with the same value.
     */
    clientRequestId?: string;
    /**
     * This header uniquely identifies the request that was made and can be used for troubleshooting
     * the request.
     */
    requestId?: string;
    /**
     * Indicates the version of the Blob service used to execute the request. This header is returned
     * for requests made against version 2009-09-19 and above.
     */
    version?: string;
    /**
     * UTC date/time value generated by the service that indicates the time at which the response was
     * initiated
     */
    date?: Date;
    errorCode?: string;
}
/**
 * Defines headers for GetAccessPolicy operation.
 */
export interface ContainerGetAccessPolicyHeaders {
    /**
     * Indicated whether data in the container may be accessed publicly and the level of access.
     * Possible values include: 'container', 'blob'
     */
    blobPublicAccess?: PublicAccessType;
    /**
     * The ETag contains a value that you can use to perform operations conditionally. If the request
     * version is 2011-08-18 or newer, the ETag value will be in quotes.
     */
    eTag?: string;
    /**
     * Returns the date and time the container was last modified. Any operation that modifies the
     * blob, including an update of the blob's metadata or properties, changes the last-modified time
     * of the blob.
     */
    lastModified?: Date;
    /**
     * If a client request id header is sent in the request, this header will be present in the
     * response with the same value.
     */
    clientRequestId?: string;
    /**
     * This header uniquely identifies the request that was made and can be used for troubleshooting
     * the request.
     */
    requestId?: string;
    /**
     * Indicates the version of the Blob service used to execute the request. This header is returned
     * for requests made against version 2009-09-19 and above.
     */
    version?: string;
    /**
     * UTC date/time value generated by the service that indicates the time at which the response was
     * initiated
     */
    date?: Date;
    errorCode?: string;
}
/**
 * Defines headers for SetAccessPolicy operation.
 */
export interface ContainerSetAccessPolicyHeaders {
    /**
     * The ETag contains a value that you can use to perform operations conditionally. If the request
     * version is 2011-08-18 or newer, the ETag value will be in quotes.
     */
    eTag?: string;
    /**
     * Returns the date and time the container was last modified. Any operation that modifies the
     * blob, including an update of the blob's metadata or properties, changes the last-modified time
     * of the blob.
     */
    lastModified?: Date;
    /**
     * If a client request id header is sent in the request, this header will be present in the
     * response with the same value.
     */
    clientRequestId?: string;
    /**
     * This header uniquely identifies the request that was made and can be used for troubleshooting
     * the request.
     */
    requestId?: string;
    /**
     * Indicates the version of the Blob service used to execute the request. This header is returned
     * for requests made against version 2009-09-19 and above.
     */
    version?: string;
    /**
     * UTC date/time value generated by the service that indicates the time at which the response was
     * initiated
     */
    date?: Date;
    errorCode?: string;
}
/**
 * Defines headers for AcquireLease operation.
 */
export interface ContainerAcquireLeaseHeaders {
    /**
     * The ETag contains a value that you can use to perform operations conditionally. If the request
     * version is 2011-08-18 or newer, the ETag value will be in quotes.
     */
    eTag?: string;
    /**
     * Returns the date and time the container was last modified. Any operation that modifies the
     * blob, including an update of the blob's metadata or properties, changes the last-modified time
     * of the blob.
     */
    lastModified?: Date;
    /**
     * Uniquely identifies a container's lease
     */
    leaseId?: string;
    /**
     * If a client request id header is sent in the request, this header will be present in the
     * response with the same value.
     */
    clientRequestId?: string;
    /**
     * This header uniquely identifies the request that was made and can be used for troubleshooting
     * the request.
     */
    requestId?: string;
    /**
     * Indicates the version of the Blob service used to execute the request. This header is returned
     * for requests made against version 2009-09-19 and above.
     */
    version?: string;
    /**
     * UTC date/time value generated by the service that indicates the time at which the response was
     * initiated
     */
    date?: Date;
    errorCode?: string;
}
/**
 * Defines headers for ReleaseLease operation.
 */
export interface ContainerReleaseLeaseHeaders {
    /**
     * The ETag contains a value that you can use to perform operations conditionally. If the request
     * version is 2011-08-18 or newer, the ETag value will be in quotes.
     */
    eTag?: string;
    /**
     * Returns the date and time the container was last modified. Any operation that modifies the
     * blob, including an update of the blob's metadata or properties, changes the last-modified time
     * of the blob.
     */
    lastModified?: Date;
    /**
     * If a client request id header is sent in the request, this header will be present in the
     * response with the same value.
     */
    clientRequestId?: string;
    /**
     * This header uniquely identifies the request that was made and can be used for troubleshooting
     * the request.
     */
    requestId?: string;
    /**
     * Indicates the version of the Blob service used to execute the request. This header is returned
     * for requests made against version 2009-09-19 and above.
     */
    version?: string;
    /**
     * UTC date/time value generated by the service that indicates the time at which the response was
     * initiated
     */
    date?: Date;
    errorCode?: string;
}
/**
 * Defines headers for RenewLease operation.
 */
export interface ContainerRenewLeaseHeaders {
    /**
     * The ETag contains a value that you can use to perform operations conditionally. If the request
     * version is 2011-08-18 or newer, the ETag value will be in quotes.
     */
    eTag?: string;
    /**
     * Returns the date and time the container was last modified. Any operation that modifies the
     * blob, including an update of the blob's metadata or properties, changes the last-modified time
     * of the blob.
     */
    lastModified?: Date;
    /**
     * Uniquely identifies a container's lease
     */
    leaseId?: string;
    /**
     * If a client request id header is sent in the request, this header will be present in the
     * response with the same value.
     */
    clientRequestId?: string;
    /**
     * This header uniquely identifies the request that was made and can be used for troubleshooting
     * the request.
     */
    requestId?: string;
    /**
     * Indicates the version of the Blob service used to execute the request. This header is returned
     * for requests made against version 2009-09-19 and above.
     */
    version?: string;
    /**
     * UTC date/time value generated by the service that indicates the time at which the response was
     * initiated
     */
    date?: Date;
    errorCode?: string;
}
/**
 * Defines headers for BreakLease operation.
 */
export interface ContainerBreakLeaseHeaders {
    /**
     * The ETag contains a value that you can use to perform operations conditionally. If the request
     * version is 2011-08-18 or newer, the ETag value will be in quotes.
     */
    eTag?: string;
    /**
     * Returns the date and time the container was last modified. Any operation that modifies the
     * blob, including an update of the blob's metadata or properties, changes the last-modified time
     * of the blob.
     */
    lastModified?: Date;
    /**
     * Approximate time remaining in the lease period, in seconds.
     */
    leaseTime?: number;
    /**
     * If a client request id header is sent in the request, this header will be present in the
     * response with the same value.
     */
    clientRequestId?: string;
    /**
     * This header uniquely identifies the request that was made and can be used for troubleshooting
     * the request.
     */
    requestId?: string;
    /**
     * Indicates the version of the Blob service used to execute the request. This header is returned
     * for requests made against version 2009-09-19 and above.
     */
    version?: string;
    /**
     * UTC date/time value generated by the service that indicates the time at which the response was
     * initiated
     */
    date?: Date;
    errorCode?: string;
}
/**
 * Defines headers for ChangeLease operation.
 */
export interface ContainerChangeLeaseHeaders {
    /**
     * The ETag contains a value that you can use to perform operations conditionally. If the request
     * version is 2011-08-18 or newer, the ETag value will be in quotes.
     */
    eTag?: string;
    /**
     * Returns the date and time the container was last modified. Any operation that modifies the
     * blob, including an update of the blob's metadata or properties, changes the last-modified time
     * of the blob.
     */
    lastModified?: Date;
    /**
     * Uniquely identifies a container's lease
     */
    leaseId?: string;
    /**
     * If a client request id header is sent in the request, this header will be present in the
     * response with the same value.
     */
    clientRequestId?: string;
    /**
     * This header uniquely identifies the request that was made and can be used for troubleshooting
     * the request.
     */
    requestId?: string;
    /**
     * Indicates the version of the Blob service used to execute the request. This header is returned
     * for requests made against version 2009-09-19 and above.
     */
    version?: string;
    /**
     * UTC date/time value generated by the service that indicates the time at which the response was
     * initiated
     */
    date?: Date;
    errorCode?: string;
}
/**
 * Defines headers for ListBlobFlatSegment operation.
 */
export interface ContainerListBlobFlatSegmentHeaders {
    /**
     * The media type of the body of the response. For List Blobs this is 'application/xml'
     */
    contentType?: string;
    /**
     * If a client request id header is sent in the request, this header will be present in the
     * response with the same value.
     */
    clientRequestId?: string;
    /**
     * This header uniquely identifies the request that was made and can be used for troubleshooting
     * the request.
     */
    requestId?: string;
    /**
     * Indicates the version of the Blob service used to execute the request. This header is returned
     * for requests made against version 2009-09-19 and above.
     */
    version?: string;
    /**
     * UTC date/time value generated by the service that indicates the time at which the response was
     * initiated
     */
    date?: Date;
    errorCode?: string;
}
/**
 * Defines headers for ListBlobHierarchySegment operation.
 */
export interface ContainerListBlobHierarchySegmentHeaders {
    /**
     * The media type of the body of the response. For List Blobs this is 'application/xml'
     */
    contentType?: string;
    /**
     * If a client request id header is sent in the request, this header will be present in the
     * response with the same value.
     */
    clientRequestId?: string;
    /**
     * This header uniquely identifies the request that was made and can be used for troubleshooting
     * the request.
     */
    requestId?: string;
    /**
     * Indicates the version of the Blob service used to execute the request. This header is returned
     * for requests made against version 2009-09-19 and above.
     */
    version?: string;
    /**
     * UTC date/time value generated by the service that indicates the time at which the response was
     * initiated
     */
    date?: Date;
    errorCode?: string;
}
/**
 * Defines headers for GetAccountInfo operation.
 */
export interface ContainerGetAccountInfoHeaders {
    /**
     * If a client request id header is sent in the request, this header will be present in the
     * response with the same value.
     */
    clientRequestId?: string;
    /**
     * This header uniquely identifies the request that was made and can be used for troubleshooting
     * the request.
     */
    requestId?: string;
    /**
     * Indicates the version of the Blob service used to execute the request. This header is returned
     * for requests made against version 2009-09-19 and above.
     */
    version?: string;
    /**
     * UTC date/time value generated by the service that indicates the time at which the response was
     * initiated
     */
    date?: Date;
    /**
     * Identifies the sku name of the account. Possible values include: 'Standard_LRS',
     * 'Standard_GRS', 'Standard_RAGRS', 'Standard_ZRS', 'Premium_LRS'
     */
    skuName?: SkuName;
    /**
     * Identifies the account kind. Possible values include: 'Storage', 'BlobStorage', 'StorageV2'
     */
    accountKind?: AccountKind;
    errorCode?: string;
}
/**
 * Defines headers for Create operation.
 */
export interface DirectoryCreateHeaders {
    /**
     * An HTTP entity tag associated with the file or directory.
     */
    eTag?: string;
    /**
     * The data and time the file or directory was last modified. Write operations on the file or
     * directory update the last modified time.
     */
    lastModified?: Date;
    /**
     * If a client request id header is sent in the request, this header will be present in the
     * response with the same value.
     */
    clientRequestId?: string;
    /**
     * A server-generated UUID recorded in the analytics logs for troubleshooting and correlation.
     */
    requestId?: string;
    /**
     * The version of the REST protocol used to process the request.
     */
    version?: string;
    /**
     * The size of the resource in bytes.
     */
    contentLength?: number;
    /**
     * A UTC date/time value generated by the service that indicates the time at which the response
     * was initiated.
     */
    date?: Date;
}
/**
 * Defines headers for Rename operation.
 */
export interface DirectoryRenameHeaders {
    /**
     * When renaming a directory, the number of paths that are renamed with each invocation is
     * limited. If the number of paths to be renamed exceeds this limit, a continuation token is
     * returned in this response header. When a continuation token is returned in the response, it
     * must be specified in a subsequent invocation of the rename operation to continue renaming the
     * directory.
     */
    marker?: string;
    /**
     * An HTTP entity tag associated with the file or directory.
     */
    eTag?: string;
    /**
     * The data and time the file or directory was last modified. Write operations on the file or
     * directory update the last modified time.
     */
    lastModified?: Date;
    /**
     * If a client request id header is sent in the request, this header will be present in the
     * response with the same value.
     */
    clientRequestId?: string;
    /**
     * A server-generated UUID recorded in the analytics logs for troubleshooting and correlation.
     */
    requestId?: string;
    /**
     * The version of the REST protocol used to process the request.
     */
    version?: string;
    /**
     * The size of the resource in bytes.
     */
    contentLength?: number;
    /**
     * A UTC date/time value generated by the service that indicates the time at which the response
     * was initiated.
     */
    date?: Date;
}
/**
 * Defines headers for Delete operation.
 */
export interface DirectoryDeleteHeaders {
    /**
     * When renaming a directory, the number of paths that are renamed with each invocation is
     * limited. If the number of paths to be renamed exceeds this limit, a continuation token is
     * returned in this response header. When a continuation token is returned in the response, it
     * must be specified in a subsequent invocation of the rename operation to continue renaming the
     * directory.
     */
    marker?: string;
    /**
     * If a client request id header is sent in the request, this header will be present in the
     * response with the same value.
     */
    clientRequestId?: string;
    /**
     * A server-generated UUID recorded in the analytics logs for troubleshooting and correlation.
     */
    requestId?: string;
    /**
     * The version of the REST protocol used to process the request.
     */
    version?: string;
    /**
     * A UTC date/time value generated by the service that indicates the time at which the response
     * was initiated.
     */
    date?: Date;
}
/**
 * Defines headers for SetAccessControl operation.
 */
export interface DirectorySetAccessControlHeaders {
    /**
     * A UTC date/time value generated by the service that indicates the time at which the response
     * was initiated.
     */
    date?: Date;
    /**
     * An HTTP entity tag associated with the file or directory.
     */
    eTag?: string;
    /**
     * The data and time the file or directory was last modified. Write operations on the file or
     * directory update the last modified time.
     */
    lastModified?: Date;
    /**
     * A server-generated UUID recorded in the analytics logs for troubleshooting and correlation.
     */
    requestId?: string;
    /**
     * The version of the REST protocol used to process the request.
     */
    version?: string;
    /**
     * If a client request id header is sent in the request, this header will be present in the
     * response with the same value.
     */
    clientRequestId?: string;
}
/**
 * Defines headers for GetAccessControl operation.
 */
export interface DirectoryGetAccessControlHeaders {
    /**
     * A UTC date/time value generated by the service that indicates the time at which the response
     * was initiated.
     */
    date?: Date;
    /**
     * An HTTP entity tag associated with the file or directory.
     */
    eTag?: string;
    /**
     * The data and time the file or directory was last modified. Write operations on the file or
     * directory update the last modified time.
     */
    lastModified?: Date;
    /**
     * The owner of the file or directory. Included in the response if Hierarchical Namespace is
     * enabled for the account.
     */
    xMsOwner?: string;
    /**
     * The owning group of the file or directory. Included in the response if Hierarchical Namespace
     * is enabled for the account.
     */
    xMsGroup?: string;
    /**
     * The POSIX access permissions for the file owner, the file owning group, and others. Included
     * in the response if Hierarchical Namespace is enabled for the account.
     */
    xMsPermissions?: string;
    /**
     * The POSIX access control list for the file or directory.  Included in the response only if the
     * action is "getAccessControl" and Hierarchical Namespace is enabled for the account.
     */
    xMsAcl?: string;
    /**
     * A server-generated UUID recorded in the analytics logs for troubleshooting and correlation.
     */
    requestId?: string;
    /**
     * The version of the REST protocol used to process the request.
     */
    version?: string;
    /**
     * If a client request id header is sent in the request, this header will be present in the
     * response with the same value.
     */
    clientRequestId?: string;
}
/**
 * Defines headers for Download operation.
 */
export interface BlobDownloadHeaders {
    /**
     * Returns the date and time the container was last modified. Any operation that modifies the
     * blob, including an update of the blob's metadata or properties, changes the last-modified time
     * of the blob.
     */
    lastModified?: Date;
    metadata?: {
        [propertyName: string]: string;
    };
    /**
     * The number of bytes present in the response body.
     */
    contentLength?: number;
    /**
     * The media type of the body of the response. For Download Blob this is
     * 'application/octet-stream'
     */
    contentType?: string;
    /**
     * Indicates the range of bytes returned in the event that the client requested a subset of the
     * blob by setting the 'Range' request header.
     */
    contentRange?: string;
    /**
     * The ETag contains a value that you can use to perform operations conditionally. If the request
     * version is 2011-08-18 or newer, the ETag value will be in quotes.
     */
    eTag?: string;
    /**
     * If the blob has an MD5 hash and this operation is to read the full blob, this response header
     * is returned so that the client can check for message content integrity.
     */
    contentMD5?: Uint8Array;
    /**
     * This header returns the value that was specified for the Content-Encoding request header
     */
    contentEncoding?: string;
    /**
     * This header is returned if it was previously specified for the blob.
     */
    cacheControl?: string;
    /**
     * This header returns the value that was specified for the 'x-ms-blob-content-disposition'
     * header. The Content-Disposition response header field conveys additional information about how
     * to process the response payload, and also can be used to attach additional metadata. For
     * example, if set to attachment, it indicates that the user-agent should not display the
     * response, but instead show a Save As dialog with a filename other than the blob name
     * specified.
     */
    contentDisposition?: string;
    /**
     * This header returns the value that was specified for the Content-Language request header.
     */
    contentLanguage?: string;
    /**
     * The current sequence number for a page blob. This header is not returned for block blobs or
     * append blobs
     */
    blobSequenceNumber?: number;
    /**
     * The blob's type. Possible values include: 'BlockBlob', 'PageBlob', 'AppendBlob'
     */
    blobType?: BlobType;
    /**
     * Conclusion time of the last attempted Copy Blob operation where this blob was the destination
     * blob. This value can specify the time of a completed, aborted, or failed copy attempt. This
     * header does not appear if a copy is pending, if this blob has never been the destination in a
     * Copy Blob operation, or if this blob has been modified after a concluded Copy Blob operation
     * using Set Blob Properties, Put Blob, or Put Block List.
     */
    copyCompletionTime?: Date;
    /**
     * Only appears when x-ms-copy-status is failed or pending. Describes the cause of the last fatal
     * or non-fatal copy operation failure. This header does not appear if this blob has never been
     * the destination in a Copy Blob operation, or if this blob has been modified after a concluded
     * Copy Blob operation using Set Blob Properties, Put Blob, or Put Block List
     */
    copyStatusDescription?: string;
    /**
     * String identifier for this copy operation. Use with Get Blob Properties to check the status of
     * this copy operation, or pass to Abort Copy Blob to abort a pending copy.
     */
    copyId?: string;
    /**
     * Contains the number of bytes copied and the total bytes in the source in the last attempted
     * Copy Blob operation where this blob was the destination blob. Can show between 0 and
     * Content-Length bytes copied. This header does not appear if this blob has never been the
     * destination in a Copy Blob operation, or if this blob has been modified after a concluded Copy
     * Blob operation using Set Blob Properties, Put Blob, or Put Block List
     */
    copyProgress?: string;
    /**
     * URL up to 2 KB in length that specifies the source blob or file used in the last attempted
     * Copy Blob operation where this blob was the destination blob. This header does not appear if
     * this blob has never been the destination in a Copy Blob operation, or if this blob has been
     * modified after a concluded Copy Blob operation using Set Blob Properties, Put Blob, or Put
     * Block List.
     */
    copySource?: string;
    /**
     * State of the copy operation identified by x-ms-copy-id. Possible values include: 'pending',
     * 'success', 'aborted', 'failed'
     */
    copyStatus?: CopyStatusType;
    /**
     * When a blob is leased, specifies whether the lease is of infinite or fixed duration. Possible
     * values include: 'infinite', 'fixed'
     */
    leaseDuration?: LeaseDurationType;
    /**
     * Lease state of the blob. Possible values include: 'available', 'leased', 'expired',
     * 'breaking', 'broken'
     */
    leaseState?: LeaseStateType;
    /**
     * The current lease status of the blob. Possible values include: 'locked', 'unlocked'
     */
    leaseStatus?: LeaseStatusType;
    /**
     * If a client request id header is sent in the request, this header will be present in the
     * response with the same value.
     */
    clientRequestId?: string;
    /**
     * This header uniquely identifies the request that was made and can be used for troubleshooting
     * the request.
     */
    requestId?: string;
    /**
     * Indicates the version of the Blob service used to execute the request. This header is returned
     * for requests made against version 2009-09-19 and above.
     */
    version?: string;
    /**
     * Indicates that the service supports requests for partial blob content.
     */
    acceptRanges?: string;
    /**
     * UTC date/time value generated by the service that indicates the time at which the response was
     * initiated
     */
    date?: Date;
    /**
     * The number of committed blocks present in the blob. This header is returned only for append
     * blobs.
     */
    blobCommittedBlockCount?: number;
    /**
     * The value of this header is set to true if the blob data and application metadata are
     * completely encrypted using the specified algorithm. Otherwise, the value is set to false (when
     * the blob is unencrypted, or if only parts of the blob/application metadata are encrypted).
     */
    isServerEncrypted?: boolean;
    /**
     * The SHA-256 hash of the encryption key used to encrypt the blob. This header is only returned
     * when the blob was encrypted with a customer-provided key.
     */
    encryptionKeySha256?: string;
    /**
     * If the blob has a MD5 hash, and if request contains range header (Range or x-ms-range), this
     * response header is returned with the value of the whole blob's MD5 value. This value may or
     * may not be equal to the value returned in Content-MD5 header, with the latter calculated from
     * the requested range
     */
    blobContentMD5?: Uint8Array;
    /**
     * If the request is to read a specified range and the x-ms-range-get-content-crc64 is set to
     * true, then the request returns a crc64 for the range, as long as the range size is less than
     * or equal to 4 MB. If both x-ms-range-get-content-crc64 & x-ms-range-get-content-md5 is
     * specified in the same request, it will fail with 400(Bad Request)
     */
    contentCrc64?: Uint8Array;
    errorCode?: string;
}
/**
 * Defines headers for GetProperties operation.
 */
export interface BlobGetPropertiesHeaders {
    /**
     * Returns the date and time the blob was last modified. Any operation that modifies the blob,
     * including an update of the blob's metadata or properties, changes the last-modified time of
     * the blob.
     */
    lastModified?: Date;
    /**
     * Returns the date and time the blob was created.
     */
    creationTime?: Date;
    metadata?: {
        [propertyName: string]: string;
    };
    /**
     * The blob's type. Possible values include: 'BlockBlob', 'PageBlob', 'AppendBlob'
     */
    blobType?: BlobType;
    /**
     * Conclusion time of the last attempted Copy Blob operation where this blob was the destination
     * blob. This value can specify the time of a completed, aborted, or failed copy attempt. This
     * header does not appear if a copy is pending, if this blob has never been the destination in a
     * Copy Blob operation, or if this blob has been modified after a concluded Copy Blob operation
     * using Set Blob Properties, Put Blob, or Put Block List.
     */
    copyCompletionTime?: Date;
    /**
     * Only appears when x-ms-copy-status is failed or pending. Describes the cause of the last fatal
     * or non-fatal copy operation failure. This header does not appear if this blob has never been
     * the destination in a Copy Blob operation, or if this blob has been modified after a concluded
     * Copy Blob operation using Set Blob Properties, Put Blob, or Put Block List
     */
    copyStatusDescription?: string;
    /**
     * String identifier for this copy operation. Use with Get Blob Properties to check the status of
     * this copy operation, or pass to Abort Copy Blob to abort a pending copy.
     */
    copyId?: string;
    /**
     * Contains the number of bytes copied and the total bytes in the source in the last attempted
     * Copy Blob operation where this blob was the destination blob. Can show between 0 and
     * Content-Length bytes copied. This header does not appear if this blob has never been the
     * destination in a Copy Blob operation, or if this blob has been modified after a concluded Copy
     * Blob operation using Set Blob Properties, Put Blob, or Put Block List
     */
    copyProgress?: string;
    /**
     * URL up to 2 KB in length that specifies the source blob or file used in the last attempted
     * Copy Blob operation where this blob was the destination blob. This header does not appear if
     * this blob has never been the destination in a Copy Blob operation, or if this blob has been
     * modified after a concluded Copy Blob operation using Set Blob Properties, Put Blob, or Put
     * Block List.
     */
    copySource?: string;
    /**
     * State of the copy operation identified by x-ms-copy-id. Possible values include: 'pending',
     * 'success', 'aborted', 'failed'
     */
    copyStatus?: CopyStatusType;
    /**
     * Included if the blob is incremental copy blob.
     */
    isIncrementalCopy?: boolean;
    /**
     * Included if the blob is incremental copy blob or incremental copy snapshot, if
     * x-ms-copy-status is success. Snapshot time of the last successful incremental copy snapshot
     * for this blob.
     */
    destinationSnapshot?: string;
    /**
     * When a blob is leased, specifies whether the lease is of infinite or fixed duration. Possible
     * values include: 'infinite', 'fixed'
     */
    leaseDuration?: LeaseDurationType;
    /**
     * Lease state of the blob. Possible values include: 'available', 'leased', 'expired',
     * 'breaking', 'broken'
     */
    leaseState?: LeaseStateType;
    /**
     * The current lease status of the blob. Possible values include: 'locked', 'unlocked'
     */
    leaseStatus?: LeaseStatusType;
    /**
     * The number of bytes present in the response body.
     */
    contentLength?: number;
    /**
     * The content type specified for the blob. The default content type is
     * 'application/octet-stream'
     */
    contentType?: string;
    /**
     * The ETag contains a value that you can use to perform operations conditionally. If the request
     * version is 2011-08-18 or newer, the ETag value will be in quotes.
     */
    eTag?: string;
    /**
     * If the blob has an MD5 hash and this operation is to read the full blob, this response header
     * is returned so that the client can check for message content integrity.
     */
    contentMD5?: Uint8Array;
    /**
     * This header returns the value that was specified for the Content-Encoding request header
     */
    contentEncoding?: string;
    /**
     * This header returns the value that was specified for the 'x-ms-blob-content-disposition'
     * header. The Content-Disposition response header field conveys additional information about how
     * to process the response payload, and also can be used to attach additional metadata. For
     * example, if set to attachment, it indicates that the user-agent should not display the
     * response, but instead show a Save As dialog with a filename other than the blob name
     * specified.
     */
    contentDisposition?: string;
    /**
     * This header returns the value that was specified for the Content-Language request header.
     */
    contentLanguage?: string;
    /**
     * This header is returned if it was previously specified for the blob.
     */
    cacheControl?: string;
    /**
     * The current sequence number for a page blob. This header is not returned for block blobs or
     * append blobs
     */
    blobSequenceNumber?: number;
    /**
     * If a client request id header is sent in the request, this header will be present in the
     * response with the same value.
     */
    clientRequestId?: string;
    /**
     * This header uniquely identifies the request that was made and can be used for troubleshooting
     * the request.
     */
    requestId?: string;
    /**
     * Indicates the version of the Blob service used to execute the request. This header is returned
     * for requests made against version 2009-09-19 and above.
     */
    version?: string;
    /**
     * UTC date/time value generated by the service that indicates the time at which the response was
     * initiated
     */
    date?: Date;
    /**
     * Indicates that the service supports requests for partial blob content.
     */
    acceptRanges?: string;
    /**
     * The number of committed blocks present in the blob. This header is returned only for append
     * blobs.
     */
    blobCommittedBlockCount?: number;
    /**
     * The value of this header is set to true if the blob data and application metadata are
     * completely encrypted using the specified algorithm. Otherwise, the value is set to false (when
     * the blob is unencrypted, or if only parts of the blob/application metadata are encrypted).
     */
    isServerEncrypted?: boolean;
    /**
     * The SHA-256 hash of the encryption key used to encrypt the metadata. This header is only
     * returned when the metadata was encrypted with a customer-provided key.
     */
    encryptionKeySha256?: string;
    /**
     * The tier of page blob on a premium storage account or tier of block blob on blob storage LRS
     * accounts. For a list of allowed premium page blob tiers, see
     * https://docs.microsoft.com/en-us/azure/virtual-machines/windows/premium-storage#features. For
     * blob storage LRS accounts, valid values are Hot/Cool/Archive.
     */
    accessTier?: string;
    /**
     * For page blobs on a premium storage account only. If the access tier is not explicitly set on
     * the blob, the tier is inferred based on its content length and this header will be returned
     * with true value.
     */
    accessTierInferred?: boolean;
    /**
     * For blob storage LRS accounts, valid values are
     * rehydrate-pending-to-hot/rehydrate-pending-to-cool. If the blob is being rehydrated and is not
     * complete then this header is returned indicating that rehydrate is pending and also tells the
     * destination tier.
     */
    archiveStatus?: string;
    /**
     * The time the tier was changed on the object. This is only returned if the tier on the block
     * blob was ever set.
     */
    accessTierChangeTime?: Date;
    errorCode?: string;
}
/**
 * Defines headers for Delete operation.
 */
export interface BlobDeleteHeaders {
    /**
     * If a client request id header is sent in the request, this header will be present in the
     * response with the same value.
     */
    clientRequestId?: string;
    /**
     * This header uniquely identifies the request that was made and can be used for troubleshooting
     * the request.
     */
    requestId?: string;
    /**
     * Indicates the version of the Blob service used to execute the request. This header is returned
     * for requests made against version 2009-09-19 and above.
     */
    version?: string;
    /**
     * UTC date/time value generated by the service that indicates the time at which the response was
     * initiated
     */
    date?: Date;
    errorCode?: string;
}
/**
 * Defines headers for SetAccessControl operation.
 */
export interface BlobSetAccessControlHeaders {
    /**
     * A UTC date/time value generated by the service that indicates the time at which the response
     * was initiated.
     */
    date?: Date;
    /**
     * An HTTP entity tag associated with the file or directory.
     */
    eTag?: string;
    /**
     * The data and time the file or directory was last modified. Write operations on the file or
     * directory update the last modified time.
     */
    lastModified?: Date;
    /**
     * A server-generated UUID recorded in the analytics logs for troubleshooting and correlation.
     */
    requestId?: string;
    /**
     * The version of the REST protocol used to process the request.
     */
    version?: string;
    /**
     * If a client request id header is sent in the request, this header will be present in the
     * response with the same value.
     */
    clientRequestId?: string;
}
/**
 * Defines headers for GetAccessControl operation.
 */
export interface BlobGetAccessControlHeaders {
    /**
     * A UTC date/time value generated by the service that indicates the time at which the response
     * was initiated.
     */
    date?: Date;
    /**
     * An HTTP entity tag associated with the file or directory.
     */
    eTag?: string;
    /**
     * The data and time the file or directory was last modified. Write operations on the file or
     * directory update the last modified time.
     */
    lastModified?: Date;
    /**
     * The owner of the file or directory. Included in the response if Hierarchical Namespace is
     * enabled for the account.
     */
    xMsOwner?: string;
    /**
     * The owning group of the file or directory. Included in the response if Hierarchical Namespace
     * is enabled for the account.
     */
    xMsGroup?: string;
    /**
     * The POSIX access permissions for the file owner, the file owning group, and others. Included
     * in the response if Hierarchical Namespace is enabled for the account.
     */
    xMsPermissions?: string;
    /**
     * The POSIX access control list for the file or directory.  Included in the response only if the
     * action is "getAccessControl" and Hierarchical Namespace is enabled for the account.
     */
    xMsAcl?: string;
    /**
     * A server-generated UUID recorded in the analytics logs for troubleshooting and correlation.
     */
    requestId?: string;
    /**
     * The version of the REST protocol used to process the request.
     */
    version?: string;
    /**
     * If a client request id header is sent in the request, this header will be present in the
     * response with the same value.
     */
    clientRequestId?: string;
}
/**
 * Defines headers for Rename operation.
 */
export interface BlobRenameHeaders {
    /**
     * An HTTP entity tag associated with the file or directory.
     */
    eTag?: string;
    /**
     * The data and time the file or directory was last modified.  Write operations on the file or
     * directory update the last modified time.
     */
    lastModified?: Date;
    /**
     * If a client request id header is sent in the request, this header will be present in the
     * response with the same value.
     */
    clientRequestId?: string;
    /**
     * A server-generated UUID recorded in the analytics logs for troubleshooting and correlation.
     */
    requestId?: string;
    /**
     * The version of the REST protocol used to process the request.
     */
    version?: string;
    /**
     * The size of the resource in bytes.
     */
    contentLength?: number;
    /**
     * A UTC date/time value generated by the service that indicates the time at which the response
     * was initiated.
     */
    date?: Date;
}
/**
 * Defines headers for Create operation.
 */
export interface PageBlobCreateHeaders {
    /**
     * The ETag contains a value that you can use to perform operations conditionally. If the request
     * version is 2011-08-18 or newer, the ETag value will be in quotes.
     */
    eTag?: string;
    /**
     * Returns the date and time the container was last modified. Any operation that modifies the
     * blob, including an update of the blob's metadata or properties, changes the last-modified time
     * of the blob.
     */
    lastModified?: Date;
    /**
     * If the blob has an MD5 hash and this operation is to read the full blob, this response header
     * is returned so that the client can check for message content integrity.
     */
    contentMD5?: Uint8Array;
    /**
     * If a client request id header is sent in the request, this header will be present in the
     * response with the same value.
     */
    clientRequestId?: string;
    /**
     * This header uniquely identifies the request that was made and can be used for troubleshooting
     * the request.
     */
    requestId?: string;
    /**
     * Indicates the version of the Blob service used to execute the request. This header is returned
     * for requests made against version 2009-09-19 and above.
     */
    version?: string;
    /**
     * UTC date/time value generated by the service that indicates the time at which the response was
     * initiated
     */
    date?: Date;
    /**
     * The value of this header is set to true if the contents of the request are successfully
     * encrypted using the specified algorithm, and false otherwise.
     */
    isServerEncrypted?: boolean;
    /**
     * The SHA-256 hash of the encryption key used to encrypt the blob. This header is only returned
     * when the blob was encrypted with a customer-provided key.
     */
    encryptionKeySha256?: string;
    errorCode?: string;
}
/**
 * Defines headers for Create operation.
 */
export interface AppendBlobCreateHeaders {
    /**
     * The ETag contains a value that you can use to perform operations conditionally. If the request
     * version is 2011-08-18 or newer, the ETag value will be in quotes.
     */
    eTag?: string;
    /**
     * Returns the date and time the container was last modified. Any operation that modifies the
     * blob, including an update of the blob's metadata or properties, changes the last-modified time
     * of the blob.
     */
    lastModified?: Date;
    /**
     * If the blob has an MD5 hash and this operation is to read the full blob, this response header
     * is returned so that the client can check for message content integrity.
     */
    contentMD5?: Uint8Array;
    /**
     * If a client request id header is sent in the request, this header will be present in the
     * response with the same value.
     */
    clientRequestId?: string;
    /**
     * This header uniquely identifies the request that was made and can be used for troubleshooting
     * the request.
     */
    requestId?: string;
    /**
     * Indicates the version of the Blob service used to execute the request. This header is returned
     * for requests made against version 2009-09-19 and above.
     */
    version?: string;
    /**
     * UTC date/time value generated by the service that indicates the time at which the response was
     * initiated
     */
    date?: Date;
    /**
     * The value of this header is set to true if the contents of the request are successfully
     * encrypted using the specified algorithm, and false otherwise.
     */
    isServerEncrypted?: boolean;
    /**
     * The SHA-256 hash of the encryption key used to encrypt the blob. This header is only returned
     * when the blob was encrypted with a customer-provided key.
     */
    encryptionKeySha256?: string;
    errorCode?: string;
}
/**
 * Defines headers for Upload operation.
 */
export interface BlockBlobUploadHeaders {
    /**
     * The ETag contains a value that you can use to perform operations conditionally. If the request
     * version is 2011-08-18 or newer, the ETag value will be in quotes.
     */
    eTag?: string;
    /**
     * Returns the date and time the container was last modified. Any operation that modifies the
     * blob, including an update of the blob's metadata or properties, changes the last-modified time
     * of the blob.
     */
    lastModified?: Date;
    /**
     * If the blob has an MD5 hash and this operation is to read the full blob, this response header
     * is returned so that the client can check for message content integrity.
     */
    contentMD5?: Uint8Array;
    /**
     * If a client request id header is sent in the request, this header will be present in the
     * response with the same value.
     */
    clientRequestId?: string;
    /**
     * This header uniquely identifies the request that was made and can be used for troubleshooting
     * the request.
     */
    requestId?: string;
    /**
     * Indicates the version of the Blob service used to execute the request. This header is returned
     * for requests made against version 2009-09-19 and above.
     */
    version?: string;
    /**
     * UTC date/time value generated by the service that indicates the time at which the response was
     * initiated
     */
    date?: Date;
    /**
     * The value of this header is set to true if the contents of the request are successfully
     * encrypted using the specified algorithm, and false otherwise.
     */
    isServerEncrypted?: boolean;
    /**
     * The SHA-256 hash of the encryption key used to encrypt the blob. This header is only returned
     * when the blob was encrypted with a customer-provided key.
     */
    encryptionKeySha256?: string;
    errorCode?: string;
}
/**
 * Defines headers for Undelete operation.
 */
export interface BlobUndeleteHeaders {
    /**
     * If a client request id header is sent in the request, this header will be present in the
     * response with the same value.
     */
    clientRequestId?: string;
    /**
     * This header uniquely identifies the request that was made and can be used for troubleshooting
     * the request.
     */
    requestId?: string;
    /**
     * Indicates the version of the Blob service used to execute the request. This header is returned
     * for requests made against version 2009-09-19 and above.
     */
    version?: string;
    /**
     * UTC date/time value generated by the service that indicates the time at which the response was
     * initiated.
     */
    date?: Date;
    errorCode?: string;
}
/**
 * Defines headers for SetHTTPHeaders operation.
 */
export interface BlobSetHTTPHeadersHeaders {
    /**
     * The ETag contains a value that you can use to perform operations conditionally. If the request
     * version is 2011-08-18 or newer, the ETag value will be in quotes.
     */
    eTag?: string;
    /**
     * Returns the date and time the container was last modified. Any operation that modifies the
     * blob, including an update of the blob's metadata or properties, changes the last-modified time
     * of the blob.
     */
    lastModified?: Date;
    /**
     * The current sequence number for a page blob. This header is not returned for block blobs or
     * append blobs
     */
    blobSequenceNumber?: number;
    /**
     * If a client request id header is sent in the request, this header will be present in the
     * response with the same value.
     */
    clientRequestId?: string;
    /**
     * This header uniquely identifies the request that was made and can be used for troubleshooting
     * the request.
     */
    requestId?: string;
    /**
     * Indicates the version of the Blob service used to execute the request. This header is returned
     * for requests made against version 2009-09-19 and above.
     */
    version?: string;
    /**
     * UTC date/time value generated by the service that indicates the time at which the response was
     * initiated
     */
    date?: Date;
    errorCode?: string;
}
/**
 * Defines headers for SetMetadata operation.
 */
export interface BlobSetMetadataHeaders {
    /**
     * The ETag contains a value that you can use to perform operations conditionally. If the request
     * version is 2011-08-18 or newer, the ETag value will be in quotes.
     */
    eTag?: string;
    /**
     * Returns the date and time the container was last modified. Any operation that modifies the
     * blob, including an update of the blob's metadata or properties, changes the last-modified time
     * of the blob.
     */
    lastModified?: Date;
    /**
     * If a client request id header is sent in the request, this header will be present in the
     * response with the same value.
     */
    clientRequestId?: string;
    /**
     * This header uniquely identifies the request that was made and can be used for troubleshooting
     * the request.
     */
    requestId?: string;
    /**
     * Indicates the version of the Blob service used to execute the request. This header is returned
     * for requests made against version 2009-09-19 and above.
     */
    version?: string;
    /**
     * UTC date/time value generated by the service that indicates the time at which the response was
     * initiated
     */
    date?: Date;
    /**
     * The value of this header is set to true if the contents of the request are successfully
     * encrypted using the specified algorithm, and false otherwise.
     */
    isServerEncrypted?: boolean;
    /**
     * The SHA-256 hash of the encryption key used to encrypt the metadata. This header is only
     * returned when the metadata was encrypted with a customer-provided key.
     */
    encryptionKeySha256?: string;
    errorCode?: string;
}
/**
 * Defines headers for AcquireLease operation.
 */
export interface BlobAcquireLeaseHeaders {
    /**
     * The ETag contains a value that you can use to perform operations conditionally. If the request
     * version is 2011-08-18 or newer, the ETag value will be in quotes.
     */
    eTag?: string;
    /**
     * Returns the date and time the blob was last modified. Any operation that modifies the blob,
     * including an update of the blob's metadata or properties, changes the last-modified time of
     * the blob.
     */
    lastModified?: Date;
    /**
     * Uniquely identifies a blobs's lease
     */
    leaseId?: string;
    /**
     * If a client request id header is sent in the request, this header will be present in the
     * response with the same value.
     */
    clientRequestId?: string;
    /**
     * This header uniquely identifies the request that was made and can be used for troubleshooting
     * the request.
     */
    requestId?: string;
    /**
     * Indicates the version of the Blob service used to execute the request. This header is returned
     * for requests made against version 2009-09-19 and above.
     */
    version?: string;
    /**
     * UTC date/time value generated by the service that indicates the time at which the response was
     * initiated
     */
    date?: Date;
    errorCode?: string;
}
/**
 * Defines headers for ReleaseLease operation.
 */
export interface BlobReleaseLeaseHeaders {
    /**
     * The ETag contains a value that you can use to perform operations conditionally. If the request
     * version is 2011-08-18 or newer, the ETag value will be in quotes.
     */
    eTag?: string;
    /**
     * Returns the date and time the blob was last modified. Any operation that modifies the blob,
     * including an update of the blob's metadata or properties, changes the last-modified time of
     * the blob.
     */
    lastModified?: Date;
    /**
     * If a client request id header is sent in the request, this header will be present in the
     * response with the same value.
     */
    clientRequestId?: string;
    /**
     * This header uniquely identifies the request that was made and can be used for troubleshooting
     * the request.
     */
    requestId?: string;
    /**
     * Indicates the version of the Blob service used to execute the request. This header is returned
     * for requests made against version 2009-09-19 and above.
     */
    version?: string;
    /**
     * UTC date/time value generated by the service that indicates the time at which the response was
     * initiated
     */
    date?: Date;
    errorCode?: string;
}
/**
 * Defines headers for RenewLease operation.
 */
export interface BlobRenewLeaseHeaders {
    /**
     * The ETag contains a value that you can use to perform operations conditionally. If the request
     * version is 2011-08-18 or newer, the ETag value will be in quotes.
     */
    eTag?: string;
    /**
     * Returns the date and time the blob was last modified. Any operation that modifies the blob,
     * including an update of the blob's metadata or properties, changes the last-modified time of
     * the blob.
     */
    lastModified?: Date;
    /**
     * Uniquely identifies a blobs's lease
     */
    leaseId?: string;
    /**
     * If a client request id header is sent in the request, this header will be present in the
     * response with the same value.
     */
    clientRequestId?: string;
    /**
     * This header uniquely identifies the request that was made and can be used for troubleshooting
     * the request.
     */
    requestId?: string;
    /**
     * Indicates the version of the Blob service used to execute the request. This header is returned
     * for requests made against version 2009-09-19 and above.
     */
    version?: string;
    /**
     * UTC date/time value generated by the service that indicates the time at which the response was
     * initiated
     */
    date?: Date;
    errorCode?: string;
}
/**
 * Defines headers for ChangeLease operation.
 */
export interface BlobChangeLeaseHeaders {
    /**
     * The ETag contains a value that you can use to perform operations conditionally. If the request
     * version is 2011-08-18 or newer, the ETag value will be in quotes.
     */
    eTag?: string;
    /**
     * Returns the date and time the blob was last modified. Any operation that modifies the blob,
     * including an update of the blob's metadata or properties, changes the last-modified time of
     * the blob.
     */
    lastModified?: Date;
    /**
     * If a client request id header is sent in the request, this header will be present in the
     * response with the same value.
     */
    clientRequestId?: string;
    /**
     * This header uniquely identifies the request that was made and can be used for troubleshooting
     * the request.
     */
    requestId?: string;
    /**
     * Uniquely identifies a blobs's lease
     */
    leaseId?: string;
    /**
     * Indicates the version of the Blob service used to execute the request. This header is returned
     * for requests made against version 2009-09-19 and above.
     */
    version?: string;
    /**
     * UTC date/time value generated by the service that indicates the time at which the response was
     * initiated
     */
    date?: Date;
    errorCode?: string;
}
/**
 * Defines headers for BreakLease operation.
 */
export interface BlobBreakLeaseHeaders {
    /**
     * The ETag contains a value that you can use to perform operations conditionally. If the request
     * version is 2011-08-18 or newer, the ETag value will be in quotes.
     */
    eTag?: string;
    /**
     * Returns the date and time the blob was last modified. Any operation that modifies the blob,
     * including an update of the blob's metadata or properties, changes the last-modified time of
     * the blob.
     */
    lastModified?: Date;
    /**
     * Approximate time remaining in the lease period, in seconds.
     */
    leaseTime?: number;
    /**
     * If a client request id header is sent in the request, this header will be present in the
     * response with the same value.
     */
    clientRequestId?: string;
    /**
     * This header uniquely identifies the request that was made and can be used for troubleshooting
     * the request.
     */
    requestId?: string;
    /**
     * Indicates the version of the Blob service used to execute the request. This header is returned
     * for requests made against version 2009-09-19 and above.
     */
    version?: string;
    /**
     * UTC date/time value generated by the service that indicates the time at which the response was
     * initiated
     */
    date?: Date;
    errorCode?: string;
}
/**
 * Defines headers for CreateSnapshot operation.
 */
export interface BlobCreateSnapshotHeaders {
    /**
     * Uniquely identifies the snapshot and indicates the snapshot version. It may be used in
     * subsequent requests to access the snapshot
     */
    snapshot?: string;
    /**
     * The ETag contains a value that you can use to perform operations conditionally. If the request
     * version is 2011-08-18 or newer, the ETag value will be in quotes.
     */
    eTag?: string;
    /**
     * Returns the date and time the container was last modified. Any operation that modifies the
     * blob, including an update of the blob's metadata or properties, changes the last-modified time
     * of the blob.
     */
    lastModified?: Date;
    /**
     * If a client request id header is sent in the request, this header will be present in the
     * response with the same value.
     */
    clientRequestId?: string;
    /**
     * This header uniquely identifies the request that was made and can be used for troubleshooting
     * the request.
     */
    requestId?: string;
    /**
     * Indicates the version of the Blob service used to execute the request. This header is returned
     * for requests made against version 2009-09-19 and above.
     */
    version?: string;
    /**
     * UTC date/time value generated by the service that indicates the time at which the response was
     * initiated
     */
    date?: Date;
    /**
     * True if the contents of the request are successfully encrypted using the specified algorithm,
     * and false otherwise. For a snapshot request, this header is set to true when metadata was
     * provided in the request and encrypted with a customer-provided key.
     */
    isServerEncrypted?: boolean;
    errorCode?: string;
}
/**
 * Defines headers for StartCopyFromURL operation.
 */
export interface BlobStartCopyFromURLHeaders {
    /**
     * The ETag contains a value that you can use to perform operations conditionally. If the request
     * version is 2011-08-18 or newer, the ETag value will be in quotes.
     */
    eTag?: string;
    /**
     * Returns the date and time the container was last modified. Any operation that modifies the
     * blob, including an update of the blob's metadata or properties, changes the last-modified time
     * of the blob.
     */
    lastModified?: Date;
    /**
     * If a client request id header is sent in the request, this header will be present in the
     * response with the same value.
     */
    clientRequestId?: string;
    /**
     * This header uniquely identifies the request that was made and can be used for troubleshooting
     * the request.
     */
    requestId?: string;
    /**
     * Indicates the version of the Blob service used to execute the request. This header is returned
     * for requests made against version 2009-09-19 and above.
     */
    version?: string;
    /**
     * UTC date/time value generated by the service that indicates the time at which the response was
     * initiated
     */
    date?: Date;
    /**
     * String identifier for this copy operation. Use with Get Blob Properties to check the status of
     * this copy operation, or pass to Abort Copy Blob to abort a pending copy.
     */
    copyId?: string;
    /**
     * State of the copy operation identified by x-ms-copy-id. Possible values include: 'pending',
     * 'success', 'aborted', 'failed'
     */
    copyStatus?: CopyStatusType;
    errorCode?: string;
}
/**
 * Defines headers for CopyFromURL operation.
 */
export interface BlobCopyFromURLHeaders {
    /**
     * The ETag contains a value that you can use to perform operations conditionally. If the request
     * version is 2011-08-18 or newer, the ETag value will be in quotes.
     */
    eTag?: string;
    /**
     * Returns the date and time the container was last modified. Any operation that modifies the
     * blob, including an update of the blob's metadata or properties, changes the last-modified time
     * of the blob.
     */
    lastModified?: Date;
    /**
     * If a client request id header is sent in the request, this header will be present in the
     * response with the same value.
     */
    clientRequestId?: string;
    /**
     * This header uniquely identifies the request that was made and can be used for troubleshooting
     * the request.
     */
    requestId?: string;
    /**
     * Indicates the version of the Blob service used to execute the request. This header is returned
     * for requests made against version 2009-09-19 and above.
     */
    version?: string;
    /**
     * UTC date/time value generated by the service that indicates the time at which the response was
     * initiated
     */
    date?: Date;
    /**
     * String identifier for this copy operation.
     */
    copyId?: string;
    /**
     * State of the copy operation identified by x-ms-copy-id. Possible values include: 'success'
     */
    copyStatus?: SyncCopyStatusType;
    errorCode?: string;
}
/**
 * Defines headers for AbortCopyFromURL operation.
 */
export interface BlobAbortCopyFromURLHeaders {
    /**
     * If a client request id header is sent in the request, this header will be present in the
     * response with the same value.
     */
    clientRequestId?: string;
    /**
     * This header uniquely identifies the request that was made and can be used for troubleshooting
     * the request.
     */
    requestId?: string;
    /**
     * Indicates the version of the Blob service used to execute the request. This header is returned
     * for requests made against version 2009-09-19 and above.
     */
    version?: string;
    /**
     * UTC date/time value generated by the service that indicates the time at which the response was
     * initiated
     */
    date?: Date;
    errorCode?: string;
}
/**
 * Defines headers for SetTier operation.
 */
export interface BlobSetTierHeaders {
    /**
     * If a client request id header is sent in the request, this header will be present in the
     * response with the same value.
     */
    clientRequestId?: string;
    /**
     * This header uniquely identifies the request that was made and can be used for troubleshooting
     * the request.
     */
    requestId?: string;
    /**
     * Indicates the version of the Blob service used to execute the request. This header is returned
     * for requests made against version 2009-09-19 and newer.
     */
    version?: string;
    errorCode?: string;
}
/**
 * Defines headers for GetAccountInfo operation.
 */
export interface BlobGetAccountInfoHeaders {
    /**
     * If a client request id header is sent in the request, this header will be present in the
     * response with the same value.
     */
    clientRequestId?: string;
    /**
     * This header uniquely identifies the request that was made and can be used for troubleshooting
     * the request.
     */
    requestId?: string;
    /**
     * Indicates the version of the Blob service used to execute the request. This header is returned
     * for requests made against version 2009-09-19 and above.
     */
    version?: string;
    /**
     * UTC date/time value generated by the service that indicates the time at which the response was
     * initiated
     */
    date?: Date;
    /**
     * Identifies the sku name of the account. Possible values include: 'Standard_LRS',
     * 'Standard_GRS', 'Standard_RAGRS', 'Standard_ZRS', 'Premium_LRS'
     */
    skuName?: SkuName;
    /**
     * Identifies the account kind. Possible values include: 'Storage', 'BlobStorage', 'StorageV2'
     */
    accountKind?: AccountKind;
    errorCode?: string;
}
/**
 * Defines headers for StageBlock operation.
 */
export interface BlockBlobStageBlockHeaders {
    /**
     * This header is returned so that the client can check for message content integrity. The value
     * of this header is computed by the Blob service; it is not necessarily the same value specified
     * in the request headers.
     */
    contentMD5?: Uint8Array;
    /**
     * If a client request id header is sent in the request, this header will be present in the
     * response with the same value.
     */
    clientRequestId?: string;
    /**
     * This header uniquely identifies the request that was made and can be used for troubleshooting
     * the request.
     */
    requestId?: string;
    /**
     * Indicates the version of the Blob service used to execute the request. This header is returned
     * for requests made against version 2009-09-19 and above.
     */
    version?: string;
    /**
     * UTC date/time value generated by the service that indicates the time at which the response was
     * initiated
     */
    date?: Date;
    /**
     * This header is returned so that the client can check for message content integrity. The value
     * of this header is computed by the Blob service; it is not necessarily the same value specified
     * in the request headers.
     */
    xMsContentCrc64?: Uint8Array;
    /**
     * The value of this header is set to true if the contents of the request are successfully
     * encrypted using the specified algorithm, and false otherwise.
     */
    isServerEncrypted?: boolean;
    /**
     * The SHA-256 hash of the encryption key used to encrypt the block. This header is only returned
     * when the block was encrypted with a customer-provided key.
     */
    encryptionKeySha256?: string;
    errorCode?: string;
}
/**
 * Defines headers for StageBlockFromURL operation.
 */
export interface BlockBlobStageBlockFromURLHeaders {
    /**
     * This header is returned so that the client can check for message content integrity. The value
     * of this header is computed by the Blob service; it is not necessarily the same value specified
     * in the request headers.
     */
    contentMD5?: Uint8Array;
    /**
     * This header is returned so that the client can check for message content integrity. The value
     * of this header is computed by the Blob service; it is not necessarily the same value specified
     * in the request headers.
     */
    xMsContentCrc64?: Uint8Array;
    /**
     * If a client request id header is sent in the request, this header will be present in the
     * response with the same value.
     */
    clientRequestId?: string;
    /**
     * This header uniquely identifies the request that was made and can be used for troubleshooting
     * the request.
     */
    requestId?: string;
    /**
     * Indicates the version of the Blob service used to execute the request. This header is returned
     * for requests made against version 2009-09-19 and above.
     */
    version?: string;
    /**
     * UTC date/time value generated by the service that indicates the time at which the response was
     * initiated
     */
    date?: Date;
    /**
     * The value of this header is set to true if the contents of the request are successfully
     * encrypted using the specified algorithm, and false otherwise.
     */
    isServerEncrypted?: boolean;
    /**
     * The SHA-256 hash of the encryption key used to encrypt the block. This header is only returned
     * when the block was encrypted with a customer-provided key.
     */
    encryptionKeySha256?: string;
    errorCode?: string;
}
/**
 * Defines headers for CommitBlockList operation.
 */
export interface BlockBlobCommitBlockListHeaders {
    /**
     * The ETag contains a value that you can use to perform operations conditionally. If the request
     * version is 2011-08-18 or newer, the ETag value will be in quotes.
     */
    eTag?: string;
    /**
     * Returns the date and time the container was last modified. Any operation that modifies the
     * blob, including an update of the blob's metadata or properties, changes the last-modified time
     * of the blob.
     */
    lastModified?: Date;
    /**
     * This header is returned so that the client can check for message content integrity. This
     * header refers to the content of the request, meaning, in this case, the list of blocks, and
     * not the content of the blob itself.
     */
    contentMD5?: Uint8Array;
    /**
     * This header is returned so that the client can check for message content integrity. This
     * header refers to the content of the request, meaning, in this case, the list of blocks, and
     * not the content of the blob itself.
     */
    xMsContentCrc64?: Uint8Array;
    /**
     * If a client request id header is sent in the request, this header will be present in the
     * response with the same value.
     */
    clientRequestId?: string;
    /**
     * This header uniquely identifies the request that was made and can be used for troubleshooting
     * the request.
     */
    requestId?: string;
    /**
     * Indicates the version of the Blob service used to execute the request. This header is returned
     * for requests made against version 2009-09-19 and above.
     */
    version?: string;
    /**
     * UTC date/time value generated by the service that indicates the time at which the response was
     * initiated
     */
    date?: Date;
    /**
     * The value of this header is set to true if the contents of the request are successfully
     * encrypted using the specified algorithm, and false otherwise.
     */
    isServerEncrypted?: boolean;
    /**
     * The SHA-256 hash of the encryption key used to encrypt the blob. This header is only returned
     * when the blob was encrypted with a customer-provided key.
     */
    encryptionKeySha256?: string;
    errorCode?: string;
}
/**
 * Defines headers for GetBlockList operation.
 */
export interface BlockBlobGetBlockListHeaders {
    /**
     * Returns the date and time the container was last modified. Any operation that modifies the
     * blob, including an update of the blob's metadata or properties, changes the last-modified time
     * of the blob.
     */
    lastModified?: Date;
    /**
     * The ETag contains a value that you can use to perform operations conditionally. If the request
     * version is 2011-08-18 or newer, the ETag value will be in quotes.
     */
    eTag?: string;
    /**
     * The media type of the body of the response. For Get Block List this is 'application/xml'
     */
    contentType?: string;
    /**
     * The size of the blob in bytes.
     */
    blobContentLength?: number;
    /**
     * If a client request id header is sent in the request, this header will be present in the
     * response with the same value.
     */
    clientRequestId?: string;
    /**
     * This header uniquely identifies the request that was made and can be used for troubleshooting
     * the request.
     */
    requestId?: string;
    /**
     * Indicates the version of the Blob service used to execute the request. This header is returned
     * for requests made against version 2009-09-19 and above.
     */
    version?: string;
    /**
     * UTC date/time value generated by the service that indicates the time at which the response was
     * initiated
     */
    date?: Date;
    errorCode?: string;
}
/**
 * Defines headers for UploadPages operation.
 */
export interface PageBlobUploadPagesHeaders {
    /**
     * The ETag contains a value that you can use to perform operations conditionally. If the request
     * version is 2011-08-18 or newer, the ETag value will be in quotes.
     */
    eTag?: string;
    /**
     * Returns the date and time the container was last modified. Any operation that modifies the
     * blob, including an update of the blob's metadata or properties, changes the last-modified time
     * of the blob.
     */
    lastModified?: Date;
    /**
     * If the blob has an MD5 hash and this operation is to read the full blob, this response header
     * is returned so that the client can check for message content integrity.
     */
    contentMD5?: Uint8Array;
    /**
     * This header is returned so that the client can check for message content integrity. The value
     * of this header is computed by the Blob service; it is not necessarily the same value specified
     * in the request headers.
     */
    xMsContentCrc64?: Uint8Array;
    /**
     * The current sequence number for the page blob.
     */
    blobSequenceNumber?: number;
    /**
     * If a client request id header is sent in the request, this header will be present in the
     * response with the same value.
     */
    clientRequestId?: string;
    /**
     * This header uniquely identifies the request that was made and can be used for troubleshooting
     * the request.
     */
    requestId?: string;
    /**
     * Indicates the version of the Blob service used to execute the request. This header is returned
     * for requests made against version 2009-09-19 and above.
     */
    version?: string;
    /**
     * UTC date/time value generated by the service that indicates the time at which the response was
     * initiated
     */
    date?: Date;
    /**
     * The value of this header is set to true if the contents of the request are successfully
     * encrypted using the specified algorithm, and false otherwise.
     */
    isServerEncrypted?: boolean;
    /**
     * The SHA-256 hash of the encryption key used to encrypt the pages. This header is only returned
     * when the pages were encrypted with a customer-provided key.
     */
    encryptionKeySha256?: string;
    errorCode?: string;
}
/**
 * Defines headers for ClearPages operation.
 */
export interface PageBlobClearPagesHeaders {
    /**
     * The ETag contains a value that you can use to perform operations conditionally. If the request
     * version is 2011-08-18 or newer, the ETag value will be in quotes.
     */
    eTag?: string;
    /**
     * Returns the date and time the container was last modified. Any operation that modifies the
     * blob, including an update of the blob's metadata or properties, changes the last-modified time
     * of the blob.
     */
    lastModified?: Date;
    /**
     * If the blob has an MD5 hash and this operation is to read the full blob, this response header
     * is returned so that the client can check for message content integrity.
     */
    contentMD5?: Uint8Array;
    /**
     * This header is returned so that the client can check for message content integrity. The value
     * of this header is computed by the Blob service; it is not necessarily the same value specified
     * in the request headers.
     */
    xMsContentCrc64?: Uint8Array;
    /**
     * The current sequence number for the page blob.
     */
    blobSequenceNumber?: number;
    /**
     * If a client request id header is sent in the request, this header will be present in the
     * response with the same value.
     */
    clientRequestId?: string;
    /**
     * This header uniquely identifies the request that was made and can be used for troubleshooting
     * the request.
     */
    requestId?: string;
    /**
     * Indicates the version of the Blob service used to execute the request. This header is returned
     * for requests made against version 2009-09-19 and above.
     */
    version?: string;
    /**
     * UTC date/time value generated by the service that indicates the time at which the response was
     * initiated
     */
    date?: Date;
    errorCode?: string;
}
/**
 * Defines headers for UploadPagesFromURL operation.
 */
export interface PageBlobUploadPagesFromURLHeaders {
    /**
     * The ETag contains a value that you can use to perform operations conditionally. If the request
     * version is 2011-08-18 or newer, the ETag value will be in quotes.
     */
    eTag?: string;
    /**
     * Returns the date and time the container was last modified. Any operation that modifies the
     * blob, including an update of the blob's metadata or properties, changes the last-modified time
     * of the blob.
     */
    lastModified?: Date;
    /**
     * If the blob has an MD5 hash and this operation is to read the full blob, this response header
     * is returned so that the client can check for message content integrity.
     */
    contentMD5?: Uint8Array;
    /**
     * This header is returned so that the client can check for message content integrity. The value
     * of this header is computed by the Blob service; it is not necessarily the same value specified
     * in the request headers.
     */
    xMsContentCrc64?: Uint8Array;
    /**
     * The current sequence number for the page blob.
     */
    blobSequenceNumber?: number;
    /**
     * This header uniquely identifies the request that was made and can be used for troubleshooting
     * the request.
     */
    requestId?: string;
    /**
     * Indicates the version of the Blob service used to execute the request. This header is returned
     * for requests made against version 2009-09-19 and above.
     */
    version?: string;
    /**
     * UTC date/time value generated by the service that indicates the time at which the response was
     * initiated
     */
    date?: Date;
    /**
     * The value of this header is set to true if the contents of the request are successfully
     * encrypted using the specified algorithm, and false otherwise.
     */
    isServerEncrypted?: boolean;
    /**
     * The SHA-256 hash of the encryption key used to encrypt the pages. This header is only returned
     * when the pages were encrypted with a customer-provided key.
     */
    encryptionKeySha256?: string;
    errorCode?: string;
}
/**
 * Defines headers for GetPageRanges operation.
 */
export interface PageBlobGetPageRangesHeaders {
    /**
     * Returns the date and time the container was last modified. Any operation that modifies the
     * blob, including an update of the blob's metadata or properties, changes the last-modified time
     * of the blob.
     */
    lastModified?: Date;
    /**
     * The ETag contains a value that you can use to perform operations conditionally. If the request
     * version is 2011-08-18 or newer, the ETag value will be in quotes.
     */
    eTag?: string;
    /**
     * The size of the blob in bytes.
     */
    blobContentLength?: number;
    /**
     * If a client request id header is sent in the request, this header will be present in the
     * response with the same value.
     */
    clientRequestId?: string;
    /**
     * This header uniquely identifies the request that was made and can be used for troubleshooting
     * the request.
     */
    requestId?: string;
    /**
     * Indicates the version of the Blob service used to execute the request. This header is returned
     * for requests made against version 2009-09-19 and above.
     */
    version?: string;
    /**
     * UTC date/time value generated by the service that indicates the time at which the response was
     * initiated
     */
    date?: Date;
    errorCode?: string;
}
/**
 * Defines headers for GetPageRangesDiff operation.
 */
export interface PageBlobGetPageRangesDiffHeaders {
    /**
     * Returns the date and time the container was last modified. Any operation that modifies the
     * blob, including an update of the blob's metadata or properties, changes the last-modified time
     * of the blob.
     */
    lastModified?: Date;
    /**
     * The ETag contains a value that you can use to perform operations conditionally. If the request
     * version is 2011-08-18 or newer, the ETag value will be in quotes.
     */
    eTag?: string;
    /**
     * The size of the blob in bytes.
     */
    blobContentLength?: number;
    /**
     * If a client request id header is sent in the request, this header will be present in the
     * response with the same value.
     */
    clientRequestId?: string;
    /**
     * This header uniquely identifies the request that was made and can be used for troubleshooting
     * the request.
     */
    requestId?: string;
    /**
     * Indicates the version of the Blob service used to execute the request. This header is returned
     * for requests made against version 2009-09-19 and above.
     */
    version?: string;
    /**
     * UTC date/time value generated by the service that indicates the time at which the response was
     * initiated
     */
    date?: Date;
    errorCode?: string;
}
/**
 * Defines headers for Resize operation.
 */
export interface PageBlobResizeHeaders {
    /**
     * The ETag contains a value that you can use to perform operations conditionally. If the request
     * version is 2011-08-18 or newer, the ETag value will be in quotes.
     */
    eTag?: string;
    /**
     * Returns the date and time the container was last modified. Any operation that modifies the
     * blob, including an update of the blob's metadata or properties, changes the last-modified time
     * of the blob.
     */
    lastModified?: Date;
    /**
     * The current sequence number for a page blob. This header is not returned for block blobs or
     * append blobs
     */
    blobSequenceNumber?: number;
    /**
     * If a client request id header is sent in the request, this header will be present in the
     * response with the same value.
     */
    clientRequestId?: string;
    /**
     * This header uniquely identifies the request that was made and can be used for troubleshooting
     * the request.
     */
    requestId?: string;
    /**
     * Indicates the version of the Blob service used to execute the request. This header is returned
     * for requests made against version 2009-09-19 and above.
     */
    version?: string;
    /**
     * UTC date/time value generated by the service that indicates the time at which the response was
     * initiated
     */
    date?: Date;
    errorCode?: string;
}
/**
 * Defines headers for UpdateSequenceNumber operation.
 */
export interface PageBlobUpdateSequenceNumberHeaders {
    /**
     * The ETag contains a value that you can use to perform operations conditionally. If the request
     * version is 2011-08-18 or newer, the ETag value will be in quotes.
     */
    eTag?: string;
    /**
     * Returns the date and time the container was last modified. Any operation that modifies the
     * blob, including an update of the blob's metadata or properties, changes the last-modified time
     * of the blob.
     */
    lastModified?: Date;
    /**
     * The current sequence number for a page blob. This header is not returned for block blobs or
     * append blobs
     */
    blobSequenceNumber?: number;
    /**
     * If a client request id header is sent in the request, this header will be present in the
     * response with the same value.
     */
    clientRequestId?: string;
    /**
     * This header uniquely identifies the request that was made and can be used for troubleshooting
     * the request.
     */
    requestId?: string;
    /**
     * Indicates the version of the Blob service used to execute the request. This header is returned
     * for requests made against version 2009-09-19 and above.
     */
    version?: string;
    /**
     * UTC date/time value generated by the service that indicates the time at which the response was
     * initiated
     */
    date?: Date;
    errorCode?: string;
}
/**
 * Defines headers for CopyIncremental operation.
 */
export interface PageBlobCopyIncrementalHeaders {
    /**
     * The ETag contains a value that you can use to perform operations conditionally. If the request
     * version is 2011-08-18 or newer, the ETag value will be in quotes.
     */
    eTag?: string;
    /**
     * Returns the date and time the container was last modified. Any operation that modifies the
     * blob, including an update of the blob's metadata or properties, changes the last-modified time
     * of the blob.
     */
    lastModified?: Date;
    /**
     * If a client request id header is sent in the request, this header will be present in the
     * response with the same value.
     */
    clientRequestId?: string;
    /**
     * This header uniquely identifies the request that was made and can be used for troubleshooting
     * the request.
     */
    requestId?: string;
    /**
     * Indicates the version of the Blob service used to execute the request. This header is returned
     * for requests made against version 2009-09-19 and above.
     */
    version?: string;
    /**
     * UTC date/time value generated by the service that indicates the time at which the response was
     * initiated
     */
    date?: Date;
    /**
     * String identifier for this copy operation. Use with Get Blob Properties to check the status of
     * this copy operation, or pass to Abort Copy Blob to abort a pending copy.
     */
    copyId?: string;
    /**
     * State of the copy operation identified by x-ms-copy-id. Possible values include: 'pending',
     * 'success', 'aborted', 'failed'
     */
    copyStatus?: CopyStatusType;
    errorCode?: string;
}
/**
 * Defines headers for AppendBlock operation.
 */
export interface AppendBlobAppendBlockHeaders {
    /**
     * The ETag contains a value that you can use to perform operations conditionally. If the request
     * version is 2011-08-18 or newer, the ETag value will be in quotes.
     */
    eTag?: string;
    /**
     * Returns the date and time the container was last modified. Any operation that modifies the
     * blob, including an update of the blob's metadata or properties, changes the last-modified time
     * of the blob.
     */
    lastModified?: Date;
    /**
     * If the blob has an MD5 hash and this operation is to read the full blob, this response header
     * is returned so that the client can check for message content integrity.
     */
    contentMD5?: Uint8Array;
    /**
     * This header is returned so that the client can check for message content integrity. The value
     * of this header is computed by the Blob service; it is not necessarily the same value specified
     * in the request headers.
     */
    xMsContentCrc64?: Uint8Array;
    /**
     * If a client request id header is sent in the request, this header will be present in the
     * response with the same value.
     */
    clientRequestId?: string;
    /**
     * This header uniquely identifies the request that was made and can be used for troubleshooting
     * the request.
     */
    requestId?: string;
    /**
     * Indicates the version of the Blob service used to execute the request. This header is returned
     * for requests made against version 2009-09-19 and above.
     */
    version?: string;
    /**
     * UTC date/time value generated by the service that indicates the time at which the response was
     * initiated
     */
    date?: Date;
    /**
     * This response header is returned only for append operations. It returns the offset at which
     * the block was committed, in bytes.
     */
    blobAppendOffset?: string;
    /**
     * The number of committed blocks present in the blob. This header is returned only for append
     * blobs.
     */
    blobCommittedBlockCount?: number;
    /**
     * The value of this header is set to true if the contents of the request are successfully
     * encrypted using the specified algorithm, and false otherwise.
     */
    isServerEncrypted?: boolean;
    /**
     * The SHA-256 hash of the encryption key used to encrypt the block. This header is only returned
     * when the block was encrypted with a customer-provided key.
     */
    encryptionKeySha256?: string;
    errorCode?: string;
}
/**
 * Defines headers for AppendBlockFromUrl operation.
 */
export interface AppendBlobAppendBlockFromUrlHeaders {
    /**
     * The ETag contains a value that you can use to perform operations conditionally. If the request
     * version is 2011-08-18 or newer, the ETag value will be in quotes.
     */
    eTag?: string;
    /**
     * Returns the date and time the container was last modified. Any operation that modifies the
     * blob, including an update of the blob's metadata or properties, changes the last-modified time
     * of the blob.
     */
    lastModified?: Date;
    /**
     * If the blob has an MD5 hash and this operation is to read the full blob, this response header
     * is returned so that the client can check for message content integrity.
     */
    contentMD5?: Uint8Array;
    /**
     * This header is returned so that the client can check for message content integrity. The value
     * of this header is computed by the Blob service; it is not necessarily the same value specified
     * in the request headers.
     */
    xMsContentCrc64?: Uint8Array;
    /**
     * This header uniquely identifies the request that was made and can be used for troubleshooting
     * the request.
     */
    requestId?: string;
    /**
     * Indicates the version of the Blob service used to execute the request. This header is returned
     * for requests made against version 2009-09-19 and above.
     */
    version?: string;
    /**
     * UTC date/time value generated by the service that indicates the time at which the response was
     * initiated
     */
    date?: Date;
    /**
     * This response header is returned only for append operations. It returns the offset at which
     * the block was committed, in bytes.
     */
    blobAppendOffset?: string;
    /**
     * The number of committed blocks present in the blob. This header is returned only for append
     * blobs.
     */
    blobCommittedBlockCount?: number;
    /**
     * The SHA-256 hash of the encryption key used to encrypt the block. This header is only returned
     * when the block was encrypted with a customer-provided key.
     */
    encryptionKeySha256?: string;
    errorCode?: string;
}
/**
 * Defines values for PublicAccessType.
 * Possible values include: 'container', 'blob'
 * @readonly
 * @enum {string}
 */
export declare type PublicAccessType = 'container' | 'blob';
/**
 * Defines values for CopyStatusType.
 * Possible values include: 'pending', 'success', 'aborted', 'failed'
 * @readonly
 * @enum {string}
 */
export declare type CopyStatusType = 'pending' | 'success' | 'aborted' | 'failed';
/**
 * Defines values for LeaseDurationType.
 * Possible values include: 'infinite', 'fixed'
 * @readonly
 * @enum {string}
 */
export declare type LeaseDurationType = 'infinite' | 'fixed';
/**
 * Defines values for LeaseStateType.
 * Possible values include: 'available', 'leased', 'expired', 'breaking', 'broken'
 * @readonly
 * @enum {string}
 */
export declare type LeaseStateType = 'available' | 'leased' | 'expired' | 'breaking' | 'broken';
/**
 * Defines values for LeaseStatusType.
 * Possible values include: 'locked', 'unlocked'
 * @readonly
 * @enum {string}
 */
export declare type LeaseStatusType = 'locked' | 'unlocked';
/**
 * Defines values for AccessTier.
 * Possible values include: 'P4', 'P6', 'P10', 'P15', 'P20', 'P30', 'P40', 'P50', 'P60', 'P70',
 * 'P80', 'Hot', 'Cool', 'Archive'
 * @readonly
 * @enum {string}
 */
export declare type AccessTier = 'P4' | 'P6' | 'P10' | 'P15' | 'P20' | 'P30' | 'P40' | 'P50' | 'P60' | 'P70' | 'P80' | 'Hot' | 'Cool' | 'Archive';
/**
 * Defines values for ArchiveStatus.
 * Possible values include: 'rehydrate-pending-to-hot', 'rehydrate-pending-to-cool'
 * @readonly
 * @enum {string}
 */
export declare type ArchiveStatus = 'rehydrate-pending-to-hot' | 'rehydrate-pending-to-cool';
/**
 * Defines values for BlobType.
 * Possible values include: 'BlockBlob', 'PageBlob', 'AppendBlob'
 * @readonly
 * @enum {string}
 */
export declare type BlobType = 'BlockBlob' | 'PageBlob' | 'AppendBlob';
/**
 * Defines values for StorageErrorCode.
 * Possible values include: 'AccountAlreadyExists', 'AccountBeingCreated', 'AccountIsDisabled',
 * 'AuthenticationFailed', 'AuthorizationFailure', 'ConditionHeadersNotSupported',
 * 'ConditionNotMet', 'EmptyMetadataKey', 'InsufficientAccountPermissions', 'InternalError',
 * 'InvalidAuthenticationInfo', 'InvalidHeaderValue', 'InvalidHttpVerb', 'InvalidInput',
 * 'InvalidMd5', 'InvalidMetadata', 'InvalidQueryParameterValue', 'InvalidRange',
 * 'InvalidResourceName', 'InvalidUri', 'InvalidXmlDocument', 'InvalidXmlNodeValue', 'Md5Mismatch',
 * 'MetadataTooLarge', 'MissingContentLengthHeader', 'MissingRequiredQueryParameter',
 * 'MissingRequiredHeader', 'MissingRequiredXmlNode', 'MultipleConditionHeadersNotSupported',
 * 'OperationTimedOut', 'OutOfRangeInput', 'OutOfRangeQueryParameterValue', 'RequestBodyTooLarge',
 * 'ResourceTypeMismatch', 'RequestUrlFailedToParse', 'ResourceAlreadyExists', 'ResourceNotFound',
 * 'ServerBusy', 'UnsupportedHeader', 'UnsupportedXmlNode', 'UnsupportedQueryParameter',
 * 'UnsupportedHttpVerb', 'AppendPositionConditionNotMet', 'BlobAlreadyExists', 'BlobNotFound',
 * 'BlobOverwritten', 'BlobTierInadequateForContentLength', 'BlockCountExceedsLimit',
 * 'BlockListTooLong', 'CannotChangeToLowerTier', 'CannotVerifyCopySource',
 * 'ContainerAlreadyExists', 'ContainerBeingDeleted', 'ContainerDisabled', 'ContainerNotFound',
 * 'ContentLengthLargerThanTierLimit', 'CopyAcrossAccountsNotSupported', 'CopyIdMismatch',
 * 'FeatureVersionMismatch', 'IncrementalCopyBlobMismatch',
 * 'IncrementalCopyOfEralierVersionSnapshotNotAllowed', 'IncrementalCopySourceMustBeSnapshot',
 * 'InfiniteLeaseDurationRequired', 'InvalidBlobOrBlock', 'InvalidBlobTier', 'InvalidBlobType',
 * 'InvalidBlockId', 'InvalidBlockList', 'InvalidOperation', 'InvalidPageRange',
 * 'InvalidSourceBlobType', 'InvalidSourceBlobUrl', 'InvalidVersionForPageBlobOperation',
 * 'LeaseAlreadyPresent', 'LeaseAlreadyBroken', 'LeaseIdMismatchWithBlobOperation',
 * 'LeaseIdMismatchWithContainerOperation', 'LeaseIdMismatchWithLeaseOperation', 'LeaseIdMissing',
 * 'LeaseIsBreakingAndCannotBeAcquired', 'LeaseIsBreakingAndCannotBeChanged',
 * 'LeaseIsBrokenAndCannotBeRenewed', 'LeaseLost', 'LeaseNotPresentWithBlobOperation',
 * 'LeaseNotPresentWithContainerOperation', 'LeaseNotPresentWithLeaseOperation',
 * 'MaxBlobSizeConditionNotMet', 'NoPendingCopyOperation',
 * 'OperationNotAllowedOnIncrementalCopyBlob', 'PendingCopyOperation',
 * 'PreviousSnapshotCannotBeNewer', 'PreviousSnapshotNotFound',
 * 'PreviousSnapshotOperationNotSupported', 'SequenceNumberConditionNotMet',
 * 'SequenceNumberIncrementTooLarge', 'SnapshotCountExceeded', 'SnaphotOperationRateExceeded',
 * 'SnapshotsPresent', 'SourceConditionNotMet', 'SystemInUse', 'TargetConditionNotMet',
 * 'UnauthorizedBlobOverwrite', 'BlobBeingRehydrated', 'BlobArchived', 'BlobNotArchived'
 * @readonly
 * @enum {string}
 */
export declare type StorageErrorCode = 'AccountAlreadyExists' | 'AccountBeingCreated' | 'AccountIsDisabled' | 'AuthenticationFailed' | 'AuthorizationFailure' | 'ConditionHeadersNotSupported' | 'ConditionNotMet' | 'EmptyMetadataKey' | 'InsufficientAccountPermissions' | 'InternalError' | 'InvalidAuthenticationInfo' | 'InvalidHeaderValue' | 'InvalidHttpVerb' | 'InvalidInput' | 'InvalidMd5' | 'InvalidMetadata' | 'InvalidQueryParameterValue' | 'InvalidRange' | 'InvalidResourceName' | 'InvalidUri' | 'InvalidXmlDocument' | 'InvalidXmlNodeValue' | 'Md5Mismatch' | 'MetadataTooLarge' | 'MissingContentLengthHeader' | 'MissingRequiredQueryParameter' | 'MissingRequiredHeader' | 'MissingRequiredXmlNode' | 'MultipleConditionHeadersNotSupported' | 'OperationTimedOut' | 'OutOfRangeInput' | 'OutOfRangeQueryParameterValue' | 'RequestBodyTooLarge' | 'ResourceTypeMismatch' | 'RequestUrlFailedToParse' | 'ResourceAlreadyExists' | 'ResourceNotFound' | 'ServerBusy' | 'UnsupportedHeader' | 'UnsupportedXmlNode' | 'UnsupportedQueryParameter' | 'UnsupportedHttpVerb' | 'AppendPositionConditionNotMet' | 'BlobAlreadyExists' | 'BlobNotFound' | 'BlobOverwritten' | 'BlobTierInadequateForContentLength' | 'BlockCountExceedsLimit' | 'BlockListTooLong' | 'CannotChangeToLowerTier' | 'CannotVerifyCopySource' | 'ContainerAlreadyExists' | 'ContainerBeingDeleted' | 'ContainerDisabled' | 'ContainerNotFound' | 'ContentLengthLargerThanTierLimit' | 'CopyAcrossAccountsNotSupported' | 'CopyIdMismatch' | 'FeatureVersionMismatch' | 'IncrementalCopyBlobMismatch' | 'IncrementalCopyOfEralierVersionSnapshotNotAllowed' | 'IncrementalCopySourceMustBeSnapshot' | 'InfiniteLeaseDurationRequired' | 'InvalidBlobOrBlock' | 'InvalidBlobTier' | 'InvalidBlobType' | 'InvalidBlockId' | 'InvalidBlockList' | 'InvalidOperation' | 'InvalidPageRange' | 'InvalidSourceBlobType' | 'InvalidSourceBlobUrl' | 'InvalidVersionForPageBlobOperation' | 'LeaseAlreadyPresent' | 'LeaseAlreadyBroken' | 'LeaseIdMismatchWithBlobOperation' | 'LeaseIdMismatchWithContainerOperation' | 'LeaseIdMismatchWithLeaseOperation' | 'LeaseIdMissing' | 'LeaseIsBreakingAndCannotBeAcquired' | 'LeaseIsBreakingAndCannotBeChanged' | 'LeaseIsBrokenAndCannotBeRenewed' | 'LeaseLost' | 'LeaseNotPresentWithBlobOperation' | 'LeaseNotPresentWithContainerOperation' | 'LeaseNotPresentWithLeaseOperation' | 'MaxBlobSizeConditionNotMet' | 'NoPendingCopyOperation' | 'OperationNotAllowedOnIncrementalCopyBlob' | 'PendingCopyOperation' | 'PreviousSnapshotCannotBeNewer' | 'PreviousSnapshotNotFound' | 'PreviousSnapshotOperationNotSupported' | 'SequenceNumberConditionNotMet' | 'SequenceNumberIncrementTooLarge' | 'SnapshotCountExceeded' | 'SnaphotOperationRateExceeded' | 'SnapshotsPresent' | 'SourceConditionNotMet' | 'SystemInUse' | 'TargetConditionNotMet' | 'UnauthorizedBlobOverwrite' | 'BlobBeingRehydrated' | 'BlobArchived' | 'BlobNotArchived';
/**
 * Defines values for GeoReplicationStatusType.
 * Possible values include: 'live', 'bootstrap', 'unavailable'
 * @readonly
 * @enum {string}
 */
export declare type GeoReplicationStatusType = 'live' | 'bootstrap' | 'unavailable';
/**
 * Defines values for RehydratePriority.
 * Possible values include: 'High', 'Standard'
 * @readonly
 * @enum {string}
 */
export declare type RehydratePriority = 'High' | 'Standard';
/**
 * Defines values for BlockListType.
 * Possible values include: 'committed', 'uncommitted', 'all'
 * @readonly
 * @enum {string}
 */
export declare type BlockListType = 'committed' | 'uncommitted' | 'all';
/**
 * Defines values for DeleteSnapshotsOptionType.
 * Possible values include: 'include', 'only'
 * @readonly
 * @enum {string}
 */
export declare type DeleteSnapshotsOptionType = 'include' | 'only';
/**
 * Defines values for EncryptionAlgorithmType.
 * Possible values include: 'AES256'
 * @readonly
 * @enum {string}
 */
export declare type EncryptionAlgorithmType = 'AES256';
/**
 * Defines values for ListBlobsIncludeItem.
 * Possible values include: 'copy', 'deleted', 'metadata', 'snapshots', 'uncommittedblobs'
 * @readonly
 * @enum {string}
 */
export declare type ListBlobsIncludeItem = 'copy' | 'deleted' | 'metadata' | 'snapshots' | 'uncommittedblobs';
/**
 * Defines values for ListContainersIncludeType.
 * Possible values include: 'metadata'
 * @readonly
 * @enum {string}
 */
export declare type ListContainersIncludeType = 'metadata';
/**
 * Defines values for PathRenameMode.
 * Possible values include: 'legacy', 'posix'
 * @readonly
 * @enum {string}
 */
export declare type PathRenameMode = 'legacy' | 'posix';
/**
 * Defines values for SequenceNumberActionType.
 * Possible values include: 'max', 'update', 'increment'
 * @readonly
 * @enum {string}
 */
export declare type SequenceNumberActionType = 'max' | 'update' | 'increment';
/**
 * Defines values for SkuName.
 * Possible values include: 'Standard_LRS', 'Standard_GRS', 'Standard_RAGRS', 'Standard_ZRS',
 * 'Premium_LRS'
 * @readonly
 * @enum {string}
 */
export declare type SkuName = 'Standard_LRS' | 'Standard_GRS' | 'Standard_RAGRS' | 'Standard_ZRS' | 'Premium_LRS';
/**
 * Defines values for AccountKind.
 * Possible values include: 'Storage', 'BlobStorage', 'StorageV2'
 * @readonly
 * @enum {string}
 */
export declare type AccountKind = 'Storage' | 'BlobStorage' | 'StorageV2';
/**
 * Defines values for SyncCopyStatusType.
 * Possible values include: 'success'
 * @readonly
 * @enum {string}
 */
export declare type SyncCopyStatusType = 'success';
/**
 * Contains response data for the setProperties operation.
 */
export declare type ServiceSetPropertiesResponse = ServiceSetPropertiesHeaders & {
    /**
     * The underlying HTTP response.
     */
    _response: coreHttp.HttpResponse & {
        /**
         * The parsed HTTP response headers.
         */
        parsedHeaders: ServiceSetPropertiesHeaders;
    };
};
/**
 * Contains response data for the getProperties operation.
 */
export declare type ServiceGetPropertiesResponse = StorageServiceProperties & ServiceGetPropertiesHeaders & {
    /**
     * The underlying HTTP response.
     */
    _response: coreHttp.HttpResponse & {
        /**
         * The parsed HTTP response headers.
         */
        parsedHeaders: ServiceGetPropertiesHeaders;
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: StorageServiceProperties;
    };
};
/**
 * Contains response data for the getStatistics operation.
 */
export declare type ServiceGetStatisticsResponse = StorageServiceStats & ServiceGetStatisticsHeaders & {
    /**
     * The underlying HTTP response.
     */
    _response: coreHttp.HttpResponse & {
        /**
         * The parsed HTTP response headers.
         */
        parsedHeaders: ServiceGetStatisticsHeaders;
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: StorageServiceStats;
    };
};
/**
 * Contains response data for the listContainersSegment operation.
 */
export declare type ServiceListContainersSegmentResponse = ListContainersSegmentResponse & ServiceListContainersSegmentHeaders & {
    /**
     * The underlying HTTP response.
     */
    _response: coreHttp.HttpResponse & {
        /**
         * The parsed HTTP response headers.
         */
        parsedHeaders: ServiceListContainersSegmentHeaders;
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: ListContainersSegmentResponse;
    };
};
/**
 * Contains response data for the getUserDelegationKey operation.
 */
export declare type ServiceGetUserDelegationKeyResponse = UserDelegationKey & ServiceGetUserDelegationKeyHeaders & {
    /**
     * The underlying HTTP response.
     */
    _response: coreHttp.HttpResponse & {
        /**
         * The parsed HTTP response headers.
         */
        parsedHeaders: ServiceGetUserDelegationKeyHeaders;
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: UserDelegationKey;
    };
};
/**
 * Contains response data for the getAccountInfo operation.
 */
export declare type ServiceGetAccountInfoResponse = ServiceGetAccountInfoHeaders & {
    /**
     * The underlying HTTP response.
     */
    _response: coreHttp.HttpResponse & {
        /**
         * The parsed HTTP response headers.
         */
        parsedHeaders: ServiceGetAccountInfoHeaders;
    };
};
/**
 * Contains response data for the submitBatch operation.
 */
export declare type ServiceSubmitBatchResponse = ServiceSubmitBatchHeaders & {
    /**
     * BROWSER ONLY
     *
     * The response body as a browser Blob.
     * Always undefined in node.js.
     */
    blobBody?: Promise<Blob>;
    /**
     * NODEJS ONLY
     *
     * The response body as a node.js Readable stream.
     * Always undefined in the browser.
     */
    readableStreamBody?: NodeJS.ReadableStream;
    /**
     * The underlying HTTP response.
     */
    _response: coreHttp.HttpResponse & {
        /**
         * The parsed HTTP response headers.
         */
        parsedHeaders: ServiceSubmitBatchHeaders;
    };
};
/**
 * Contains response data for the create operation.
 */
export declare type ContainerCreateResponse = ContainerCreateHeaders & {
    /**
     * The underlying HTTP response.
     */
    _response: coreHttp.HttpResponse & {
        /**
         * The parsed HTTP response headers.
         */
        parsedHeaders: ContainerCreateHeaders;
    };
};
/**
 * Contains response data for the getProperties operation.
 */
export declare type ContainerGetPropertiesResponse = ContainerGetPropertiesHeaders & {
    /**
     * The underlying HTTP response.
     */
    _response: coreHttp.HttpResponse & {
        /**
         * The parsed HTTP response headers.
         */
        parsedHeaders: ContainerGetPropertiesHeaders;
    };
};
/**
 * Contains response data for the deleteMethod operation.
 */
export declare type ContainerDeleteResponse = ContainerDeleteHeaders & {
    /**
     * The underlying HTTP response.
     */
    _response: coreHttp.HttpResponse & {
        /**
         * The parsed HTTP response headers.
         */
        parsedHeaders: ContainerDeleteHeaders;
    };
};
/**
 * Contains response data for the setMetadata operation.
 */
export declare type ContainerSetMetadataResponse = ContainerSetMetadataHeaders & {
    /**
     * The underlying HTTP response.
     */
    _response: coreHttp.HttpResponse & {
        /**
         * The parsed HTTP response headers.
         */
        parsedHeaders: ContainerSetMetadataHeaders;
    };
};
/**
 * Contains response data for the getAccessPolicy operation.
 */
export declare type ContainerGetAccessPolicyResponse = Array<SignedIdentifier> & ContainerGetAccessPolicyHeaders & {
    /**
     * The underlying HTTP response.
     */
    _response: coreHttp.HttpResponse & {
        /**
         * The parsed HTTP response headers.
         */
        parsedHeaders: ContainerGetAccessPolicyHeaders;
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: SignedIdentifier[];
    };
};
/**
 * Contains response data for the setAccessPolicy operation.
 */
export declare type ContainerSetAccessPolicyResponse = ContainerSetAccessPolicyHeaders & {
    /**
     * The underlying HTTP response.
     */
    _response: coreHttp.HttpResponse & {
        /**
         * The parsed HTTP response headers.
         */
        parsedHeaders: ContainerSetAccessPolicyHeaders;
    };
};
/**
 * Contains response data for the acquireLease operation.
 */
export declare type ContainerAcquireLeaseResponse = ContainerAcquireLeaseHeaders & {
    /**
     * The underlying HTTP response.
     */
    _response: coreHttp.HttpResponse & {
        /**
         * The parsed HTTP response headers.
         */
        parsedHeaders: ContainerAcquireLeaseHeaders;
    };
};
/**
 * Contains response data for the releaseLease operation.
 */
export declare type ContainerReleaseLeaseResponse = ContainerReleaseLeaseHeaders & {
    /**
     * The underlying HTTP response.
     */
    _response: coreHttp.HttpResponse & {
        /**
         * The parsed HTTP response headers.
         */
        parsedHeaders: ContainerReleaseLeaseHeaders;
    };
};
/**
 * Contains response data for the renewLease operation.
 */
export declare type ContainerRenewLeaseResponse = ContainerRenewLeaseHeaders & {
    /**
     * The underlying HTTP response.
     */
    _response: coreHttp.HttpResponse & {
        /**
         * The parsed HTTP response headers.
         */
        parsedHeaders: ContainerRenewLeaseHeaders;
    };
};
/**
 * Contains response data for the breakLease operation.
 */
export declare type ContainerBreakLeaseResponse = ContainerBreakLeaseHeaders & {
    /**
     * The underlying HTTP response.
     */
    _response: coreHttp.HttpResponse & {
        /**
         * The parsed HTTP response headers.
         */
        parsedHeaders: ContainerBreakLeaseHeaders;
    };
};
/**
 * Contains response data for the changeLease operation.
 */
export declare type ContainerChangeLeaseResponse = ContainerChangeLeaseHeaders & {
    /**
     * The underlying HTTP response.
     */
    _response: coreHttp.HttpResponse & {
        /**
         * The parsed HTTP response headers.
         */
        parsedHeaders: ContainerChangeLeaseHeaders;
    };
};
/**
 * Contains response data for the listBlobFlatSegment operation.
 */
export declare type ContainerListBlobFlatSegmentResponse = ListBlobsFlatSegmentResponse & ContainerListBlobFlatSegmentHeaders & {
    /**
     * The underlying HTTP response.
     */
    _response: coreHttp.HttpResponse & {
        /**
         * The parsed HTTP response headers.
         */
        parsedHeaders: ContainerListBlobFlatSegmentHeaders;
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: ListBlobsFlatSegmentResponse;
    };
};
/**
 * Contains response data for the listBlobHierarchySegment operation.
 */
export declare type ContainerListBlobHierarchySegmentResponse = ListBlobsHierarchySegmentResponse & ContainerListBlobHierarchySegmentHeaders & {
    /**
     * The underlying HTTP response.
     */
    _response: coreHttp.HttpResponse & {
        /**
         * The parsed HTTP response headers.
         */
        parsedHeaders: ContainerListBlobHierarchySegmentHeaders;
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: ListBlobsHierarchySegmentResponse;
    };
};
/**
 * Contains response data for the getAccountInfo operation.
 */
export declare type ContainerGetAccountInfoResponse = ContainerGetAccountInfoHeaders & {
    /**
     * The underlying HTTP response.
     */
    _response: coreHttp.HttpResponse & {
        /**
         * The parsed HTTP response headers.
         */
        parsedHeaders: ContainerGetAccountInfoHeaders;
    };
};
/**
 * Contains response data for the create operation.
 */
export declare type DirectoryCreateResponse = DirectoryCreateHeaders & {
    /**
     * The underlying HTTP response.
     */
    _response: coreHttp.HttpResponse & {
        /**
         * The parsed HTTP response headers.
         */
        parsedHeaders: DirectoryCreateHeaders;
    };
};
/**
 * Contains response data for the rename operation.
 */
export declare type DirectoryRenameResponse = DirectoryRenameHeaders & {
    /**
     * The underlying HTTP response.
     */
    _response: coreHttp.HttpResponse & {
        /**
         * The parsed HTTP response headers.
         */
        parsedHeaders: DirectoryRenameHeaders;
    };
};
/**
 * Contains response data for the deleteMethod operation.
 */
export declare type DirectoryDeleteResponse = DirectoryDeleteHeaders & {
    /**
     * The underlying HTTP response.
     */
    _response: coreHttp.HttpResponse & {
        /**
         * The parsed HTTP response headers.
         */
        parsedHeaders: DirectoryDeleteHeaders;
    };
};
/**
 * Contains response data for the setAccessControl operation.
 */
export declare type DirectorySetAccessControlResponse = DirectorySetAccessControlHeaders & {
    /**
     * The underlying HTTP response.
     */
    _response: coreHttp.HttpResponse & {
        /**
         * The parsed HTTP response headers.
         */
        parsedHeaders: DirectorySetAccessControlHeaders;
    };
};
/**
 * Contains response data for the getAccessControl operation.
 */
export declare type DirectoryGetAccessControlResponse = DirectoryGetAccessControlHeaders & {
    /**
     * The underlying HTTP response.
     */
    _response: coreHttp.HttpResponse & {
        /**
         * The parsed HTTP response headers.
         */
        parsedHeaders: DirectoryGetAccessControlHeaders;
    };
};
/**
 * Contains response data for the download operation.
 */
export declare type BlobDownloadResponse = BlobDownloadHeaders & {
    /**
     * BROWSER ONLY
     *
     * The response body as a browser Blob.
     * Always undefined in node.js.
     */
    blobBody?: Promise<Blob>;
    /**
     * NODEJS ONLY
     *
     * The response body as a node.js Readable stream.
     * Always undefined in the browser.
     */
    readableStreamBody?: NodeJS.ReadableStream;
    /**
     * The underlying HTTP response.
     */
    _response: coreHttp.HttpResponse & {
        /**
         * The parsed HTTP response headers.
         */
        parsedHeaders: BlobDownloadHeaders;
    };
};
/**
 * Contains response data for the getProperties operation.
 */
export declare type BlobGetPropertiesResponse = BlobGetPropertiesHeaders & {
    /**
     * The underlying HTTP response.
     */
    _response: coreHttp.HttpResponse & {
        /**
         * The parsed HTTP response headers.
         */
        parsedHeaders: BlobGetPropertiesHeaders;
    };
};
/**
 * Contains response data for the deleteMethod operation.
 */
export declare type BlobDeleteResponse = BlobDeleteHeaders & {
    /**
     * The underlying HTTP response.
     */
    _response: coreHttp.HttpResponse & {
        /**
         * The parsed HTTP response headers.
         */
        parsedHeaders: BlobDeleteHeaders;
    };
};
/**
 * Contains response data for the setAccessControl operation.
 */
export declare type BlobSetAccessControlResponse = BlobSetAccessControlHeaders & {
    /**
     * The underlying HTTP response.
     */
    _response: coreHttp.HttpResponse & {
        /**
         * The parsed HTTP response headers.
         */
        parsedHeaders: BlobSetAccessControlHeaders;
    };
};
/**
 * Contains response data for the getAccessControl operation.
 */
export declare type BlobGetAccessControlResponse = BlobGetAccessControlHeaders & {
    /**
     * The underlying HTTP response.
     */
    _response: coreHttp.HttpResponse & {
        /**
         * The parsed HTTP response headers.
         */
        parsedHeaders: BlobGetAccessControlHeaders;
    };
};
/**
 * Contains response data for the rename operation.
 */
export declare type BlobRenameResponse = BlobRenameHeaders & {
    /**
     * The underlying HTTP response.
     */
    _response: coreHttp.HttpResponse & {
        /**
         * The parsed HTTP response headers.
         */
        parsedHeaders: BlobRenameHeaders;
    };
};
/**
 * Contains response data for the undelete operation.
 */
export declare type BlobUndeleteResponse = BlobUndeleteHeaders & {
    /**
     * The underlying HTTP response.
     */
    _response: coreHttp.HttpResponse & {
        /**
         * The parsed HTTP response headers.
         */
        parsedHeaders: BlobUndeleteHeaders;
    };
};
/**
 * Contains response data for the setHTTPHeaders operation.
 */
export declare type BlobSetHTTPHeadersResponse = BlobSetHTTPHeadersHeaders & {
    /**
     * The underlying HTTP response.
     */
    _response: coreHttp.HttpResponse & {
        /**
         * The parsed HTTP response headers.
         */
        parsedHeaders: BlobSetHTTPHeadersHeaders;
    };
};
/**
 * Contains response data for the setMetadata operation.
 */
export declare type BlobSetMetadataResponse = BlobSetMetadataHeaders & {
    /**
     * The underlying HTTP response.
     */
    _response: coreHttp.HttpResponse & {
        /**
         * The parsed HTTP response headers.
         */
        parsedHeaders: BlobSetMetadataHeaders;
    };
};
/**
 * Contains response data for the acquireLease operation.
 */
export declare type BlobAcquireLeaseResponse = BlobAcquireLeaseHeaders & {
    /**
     * The underlying HTTP response.
     */
    _response: coreHttp.HttpResponse & {
        /**
         * The parsed HTTP response headers.
         */
        parsedHeaders: BlobAcquireLeaseHeaders;
    };
};
/**
 * Contains response data for the releaseLease operation.
 */
export declare type BlobReleaseLeaseResponse = BlobReleaseLeaseHeaders & {
    /**
     * The underlying HTTP response.
     */
    _response: coreHttp.HttpResponse & {
        /**
         * The parsed HTTP response headers.
         */
        parsedHeaders: BlobReleaseLeaseHeaders;
    };
};
/**
 * Contains response data for the renewLease operation.
 */
export declare type BlobRenewLeaseResponse = BlobRenewLeaseHeaders & {
    /**
     * The underlying HTTP response.
     */
    _response: coreHttp.HttpResponse & {
        /**
         * The parsed HTTP response headers.
         */
        parsedHeaders: BlobRenewLeaseHeaders;
    };
};
/**
 * Contains response data for the changeLease operation.
 */
export declare type BlobChangeLeaseResponse = BlobChangeLeaseHeaders & {
    /**
     * The underlying HTTP response.
     */
    _response: coreHttp.HttpResponse & {
        /**
         * The parsed HTTP response headers.
         */
        parsedHeaders: BlobChangeLeaseHeaders;
    };
};
/**
 * Contains response data for the breakLease operation.
 */
export declare type BlobBreakLeaseResponse = BlobBreakLeaseHeaders & {
    /**
     * The underlying HTTP response.
     */
    _response: coreHttp.HttpResponse & {
        /**
         * The parsed HTTP response headers.
         */
        parsedHeaders: BlobBreakLeaseHeaders;
    };
};
/**
 * Contains response data for the createSnapshot operation.
 */
export declare type BlobCreateSnapshotResponse = BlobCreateSnapshotHeaders & {
    /**
     * The underlying HTTP response.
     */
    _response: coreHttp.HttpResponse & {
        /**
         * The parsed HTTP response headers.
         */
        parsedHeaders: BlobCreateSnapshotHeaders;
    };
};
/**
 * Contains response data for the startCopyFromURL operation.
 */
export declare type BlobStartCopyFromURLResponse = BlobStartCopyFromURLHeaders & {
    /**
     * The underlying HTTP response.
     */
    _response: coreHttp.HttpResponse & {
        /**
         * The parsed HTTP response headers.
         */
        parsedHeaders: BlobStartCopyFromURLHeaders;
    };
};
/**
 * Contains response data for the copyFromURL operation.
 */
export declare type BlobCopyFromURLResponse = BlobCopyFromURLHeaders & {
    /**
     * The underlying HTTP response.
     */
    _response: coreHttp.HttpResponse & {
        /**
         * The parsed HTTP response headers.
         */
        parsedHeaders: BlobCopyFromURLHeaders;
    };
};
/**
 * Contains response data for the abortCopyFromURL operation.
 */
export declare type BlobAbortCopyFromURLResponse = BlobAbortCopyFromURLHeaders & {
    /**
     * The underlying HTTP response.
     */
    _response: coreHttp.HttpResponse & {
        /**
         * The parsed HTTP response headers.
         */
        parsedHeaders: BlobAbortCopyFromURLHeaders;
    };
};
/**
 * Contains response data for the setTier operation.
 */
export declare type BlobSetTierResponse = BlobSetTierHeaders & {
    /**
     * The underlying HTTP response.
     */
    _response: coreHttp.HttpResponse & {
        /**
         * The parsed HTTP response headers.
         */
        parsedHeaders: BlobSetTierHeaders;
    };
};
/**
 * Contains response data for the getAccountInfo operation.
 */
export declare type BlobGetAccountInfoResponse = BlobGetAccountInfoHeaders & {
    /**
     * The underlying HTTP response.
     */
    _response: coreHttp.HttpResponse & {
        /**
         * The parsed HTTP response headers.
         */
        parsedHeaders: BlobGetAccountInfoHeaders;
    };
};
/**
 * Contains response data for the create operation.
 */
export declare type PageBlobCreateResponse = PageBlobCreateHeaders & {
    /**
     * The underlying HTTP response.
     */
    _response: coreHttp.HttpResponse & {
        /**
         * The parsed HTTP response headers.
         */
        parsedHeaders: PageBlobCreateHeaders;
    };
};
/**
 * Contains response data for the uploadPages operation.
 */
export declare type PageBlobUploadPagesResponse = PageBlobUploadPagesHeaders & {
    /**
     * The underlying HTTP response.
     */
    _response: coreHttp.HttpResponse & {
        /**
         * The parsed HTTP response headers.
         */
        parsedHeaders: PageBlobUploadPagesHeaders;
    };
};
/**
 * Contains response data for the clearPages operation.
 */
export declare type PageBlobClearPagesResponse = PageBlobClearPagesHeaders & {
    /**
     * The underlying HTTP response.
     */
    _response: coreHttp.HttpResponse & {
        /**
         * The parsed HTTP response headers.
         */
        parsedHeaders: PageBlobClearPagesHeaders;
    };
};
/**
 * Contains response data for the uploadPagesFromURL operation.
 */
export declare type PageBlobUploadPagesFromURLResponse = PageBlobUploadPagesFromURLHeaders & {
    /**
     * The underlying HTTP response.
     */
    _response: coreHttp.HttpResponse & {
        /**
         * The parsed HTTP response headers.
         */
        parsedHeaders: PageBlobUploadPagesFromURLHeaders;
    };
};
/**
 * Contains response data for the getPageRanges operation.
 */
export declare type PageBlobGetPageRangesResponse = PageList & PageBlobGetPageRangesHeaders & {
    /**
     * The underlying HTTP response.
     */
    _response: coreHttp.HttpResponse & {
        /**
         * The parsed HTTP response headers.
         */
        parsedHeaders: PageBlobGetPageRangesHeaders;
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: PageList;
    };
};
/**
 * Contains response data for the getPageRangesDiff operation.
 */
export declare type PageBlobGetPageRangesDiffResponse = PageList & PageBlobGetPageRangesDiffHeaders & {
    /**
     * The underlying HTTP response.
     */
    _response: coreHttp.HttpResponse & {
        /**
         * The parsed HTTP response headers.
         */
        parsedHeaders: PageBlobGetPageRangesDiffHeaders;
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: PageList;
    };
};
/**
 * Contains response data for the resize operation.
 */
export declare type PageBlobResizeResponse = PageBlobResizeHeaders & {
    /**
     * The underlying HTTP response.
     */
    _response: coreHttp.HttpResponse & {
        /**
         * The parsed HTTP response headers.
         */
        parsedHeaders: PageBlobResizeHeaders;
    };
};
/**
 * Contains response data for the updateSequenceNumber operation.
 */
export declare type PageBlobUpdateSequenceNumberResponse = PageBlobUpdateSequenceNumberHeaders & {
    /**
     * The underlying HTTP response.
     */
    _response: coreHttp.HttpResponse & {
        /**
         * The parsed HTTP response headers.
         */
        parsedHeaders: PageBlobUpdateSequenceNumberHeaders;
    };
};
/**
 * Contains response data for the copyIncremental operation.
 */
export declare type PageBlobCopyIncrementalResponse = PageBlobCopyIncrementalHeaders & {
    /**
     * The underlying HTTP response.
     */
    _response: coreHttp.HttpResponse & {
        /**
         * The parsed HTTP response headers.
         */
        parsedHeaders: PageBlobCopyIncrementalHeaders;
    };
};
/**
 * Contains response data for the create operation.
 */
export declare type AppendBlobCreateResponse = AppendBlobCreateHeaders & {
    /**
     * The underlying HTTP response.
     */
    _response: coreHttp.HttpResponse & {
        /**
         * The parsed HTTP response headers.
         */
        parsedHeaders: AppendBlobCreateHeaders;
    };
};
/**
 * Contains response data for the appendBlock operation.
 */
export declare type AppendBlobAppendBlockResponse = AppendBlobAppendBlockHeaders & {
    /**
     * The underlying HTTP response.
     */
    _response: coreHttp.HttpResponse & {
        /**
         * The parsed HTTP response headers.
         */
        parsedHeaders: AppendBlobAppendBlockHeaders;
    };
};
/**
 * Contains response data for the appendBlockFromUrl operation.
 */
export declare type AppendBlobAppendBlockFromUrlResponse = AppendBlobAppendBlockFromUrlHeaders & {
    /**
     * The underlying HTTP response.
     */
    _response: coreHttp.HttpResponse & {
        /**
         * The parsed HTTP response headers.
         */
        parsedHeaders: AppendBlobAppendBlockFromUrlHeaders;
    };
};
/**
 * Contains response data for the upload operation.
 */
export declare type BlockBlobUploadResponse = BlockBlobUploadHeaders & {
    /**
     * The underlying HTTP response.
     */
    _response: coreHttp.HttpResponse & {
        /**
         * The parsed HTTP response headers.
         */
        parsedHeaders: BlockBlobUploadHeaders;
    };
};
/**
 * Contains response data for the stageBlock operation.
 */
export declare type BlockBlobStageBlockResponse = BlockBlobStageBlockHeaders & {
    /**
     * The underlying HTTP response.
     */
    _response: coreHttp.HttpResponse & {
        /**
         * The parsed HTTP response headers.
         */
        parsedHeaders: BlockBlobStageBlockHeaders;
    };
};
/**
 * Contains response data for the stageBlockFromURL operation.
 */
export declare type BlockBlobStageBlockFromURLResponse = BlockBlobStageBlockFromURLHeaders & {
    /**
     * The underlying HTTP response.
     */
    _response: coreHttp.HttpResponse & {
        /**
         * The parsed HTTP response headers.
         */
        parsedHeaders: BlockBlobStageBlockFromURLHeaders;
    };
};
/**
 * Contains response data for the commitBlockList operation.
 */
export declare type BlockBlobCommitBlockListResponse = BlockBlobCommitBlockListHeaders & {
    /**
     * The underlying HTTP response.
     */
    _response: coreHttp.HttpResponse & {
        /**
         * The parsed HTTP response headers.
         */
        parsedHeaders: BlockBlobCommitBlockListHeaders;
    };
};
/**
 * Contains response data for the getBlockList operation.
 */
export declare type BlockBlobGetBlockListResponse = BlockList & BlockBlobGetBlockListHeaders & {
    /**
     * The underlying HTTP response.
     */
    _response: coreHttp.HttpResponse & {
        /**
         * The parsed HTTP response headers.
         */
        parsedHeaders: BlockBlobGetBlockListHeaders;
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: BlockList;
    };
};
//# sourceMappingURL=index.d.ts.map