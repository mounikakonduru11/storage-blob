import { SharedKeyCredential } from "./credentials/SharedKeyCredential";
import { IPRange } from "./IPRange";
import { SASProtocol } from "./SASQueryParameters";
import { SASQueryParameters } from "./SASQueryParameters";
import { UserDelegationKey } from "./BlobServiceClient";
/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * BlobSASSignatureValues is used to help generating Blob service SAS tokens for containers or blobs.
 *
 * @export
 * @class BlobSASSignatureValues
 */
export interface BlobSASSignatureValues {
    /**
     * The version of the service this SAS will target. If not specified, it will default to the version targeted by the
     * library.
     *
     * @type {string}
     * @memberof BlobSASSignatureValues
     */
    version?: string;
    /**
     * Optional. SAS protocols, HTTPS only or HTTPSandHTTP
     *
     * @type {SASProtocol}
     * @memberof BlobSASSignatureValues
     */
    protocol?: SASProtocol;
    /**
     * Optional. When the SAS will take effect.
     *
     * @type {Date}
     * @memberof BlobSASSignatureValues
     */
    startTime?: Date;
    /**
     * Optional only when identifier is provided. The time after which the SAS will no longer work.
     *
     * @type {Date}
     * @memberof BlobSASSignatureValues
     */
    expiryTime?: Date;
    /**
     * Optional only when identifier is provided.
     * Please refer to either {@link ContainerSASPermissions} or {@link BlobSASPermissions} depending on the resource
     * being accessed for help constructing the permissions string.
     *
     * @type {string}
     * @memberof BlobSASSignatureValues
     */
    permissions?: string;
    /**
     * Optional. IP ranges allowed in this SAS.
     *
     * @type {IPRange}
     * @memberof BlobSASSignatureValues
     */
    ipRange?: IPRange;
    /**
     * The name of the container the SAS user may access.
     *
     * @type {string}
     * @memberof BlobSASSignatureValues
     */
    containerName: string;
    /**
     * Optional. The blob name of the SAS user may access. Required if snapshotTime is provided.
     *
     * @type {string}
     * @memberof BlobSASSignatureValues
     */
    blobName?: string;
    /**
     * Optional. Snapshot timestamp string the SAS user may access. Only supported from API version 2018-11-09.
     *
     * @type {string}
     * @memberof IBlobSASSignatureValues
     */
    snapshotTime?: string;
    /**
     * Optional. The name of the access policy on the container this SAS references if any.
     *
     * @see https://docs.microsoft.com/en-us/rest/api/storageservices/establishing-a-stored-access-policy
     *
     * @type {string}
     * @memberof BlobSASSignatureValues
     */
    identifier?: string;
    /**
     * Optional. The cache-control header for the SAS.
     *
     * @type {string}
     * @memberof BlobSASSignatureValues
     */
    cacheControl?: string;
    /**
     * Optional. The content-disposition header for the SAS.
     *
     * @type {string}
     * @memberof BlobSASSignatureValues
     */
    contentDisposition?: string;
    /**
     * Optional. The content-encoding header for the SAS.
     *
     * @type {string}
     * @memberof BlobSASSignatureValues
     */
    contentEncoding?: string;
    /**
     * Optional. The content-language header for the SAS.
     *
     * @type {string}
     * @memberof BlobSASSignatureValues
     */
    contentLanguage?: string;
    /**
     * Optional. The content-type header for the SAS.
     *
     * @type {string}
     * @memberof BlobSASSignatureValues
     */
    contentType?: string;
}
/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * Creates an instance of SASQueryParameters.
 *
 * Only accepts required settings needed to create a SAS. For optional settings please
 * set corresponding properties directly, such as permissions, startTime and identifier.
 *
 * WARNING: When identifier is not provided, permissions and expiryTime are required.
 * You MUST assign value to identifier or expiryTime & permissions manually if you initial with
 * this constructor.
 *
 * @example
 * // Generate service level SAS for a container
 * const containerSAS = generateBlobSASQueryParameters({
 *     containerName, // Required
 *     permissions: ContainerSASPermissions.parse("racwdl").toString(), // Required
 *     startTime: new Date(), // Required
 *     expiryTime: tmr, // Optional. Date type
 *     ipRange: { start: "0.0.0.0", end: "255.255.255.255" }, // Optional
 *     protocol: SASProtocol.HTTPSandHTTP, // Optional
 *     version: "2016-05-31" // Optional
 *   },
 *   sharedKeyCredential // SharedKeyCredential
 * ).toString();
 *
 * @example
 * // Generate service level SAS for a container with identifier
 * // startTime & permissions are optional when identifier is provided
 * const identifier = "unique-id";
 * await containerClient.setAccessPolicy(undefined, [
 *   {
 *     accessPolicy: {
 *       expiry: tmr, // Date type
 *       permission: ContainerSASPermissions.parse("racwdl").toString(),
 *       start: now // Date type
 *     },
 *     id: identifier
 *   }
 * ]);
 *
 * const containerSAS = generateBlobSASQueryParameters(
 *   {
 *     containerName, // Required
 *     identifier // Required
 *   },
 *   sharedKeyCredential // SharedKeyCredential
 * ).toString();
 *
 * @example
 * // Generate service level SAS for a blob
 * const blobSAS = generateBlobSASQueryParameters({
 *     containerName, // Required
 *     blobName, // Required
 *     permissions: BlobSASPermissions.parse("racwd").toString(), // Required
 *     startTime: new Date(), // Required
 *     expiryTime: tmr, // Optional. Date type
 *     cacheControl: "cache-control-override", // Optional
 *     contentDisposition: "content-disposition-override", // Optional
 *     contentEncoding: "content-encoding-override", // Optional
 *     contentLanguage: "content-language-override", // Optional
 *     contentType: "content-type-override", // Optional
 *     ipRange: { start: "0.0.0.0", end: "255.255.255.255" }, // Optional
 *     protocol: SASProtocol.HTTPSandHTTP, // Optional
 *     version: "2016-05-31" // Optional
 *   },
 *   sharedKeyCredential // SharedKeyCredential
 * ).toString();
 *
 * @export
 * @param {BlobSASSignatureValues} blobSASSignatureValues
 * @param {SharedKeyCredential} sharedKeyCredential
 * @returns {SASQueryParameters}
 */
export declare function generateBlobSASQueryParameters(blobSASSignatureValues: BlobSASSignatureValues, sharedKeyCredential: SharedKeyCredential): SASQueryParameters;
/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * Creates an instance of SASQueryParameters.
 * WARNING: identifier will be ignored when generating user delegation SAS, permissions and expiryTime are required.
 *
 * @example
 * // Generate user delegation SAS for a container
 * const userDelegationKey = await blobServiceClient.getUserDelegationKey(aborter, startTime, expiryTime);
 * const containerSAS = generateBlobSASQueryParameters({
 *     containerName, // Required
 *     permissions: ContainerSASPermissions.parse("racwdl").toString(), // Required
 *     startTime, // Required. Date type
 *     expiryTime, // Optional. Date type
 *     ipRange: { start: "0.0.0.0", end: "255.255.255.255" }, // Optional
 *     protocol: SASProtocol.HTTPSandHTTP, // Optional
 *     version: "2018-11-09" // Must >= 2018-11-09 to generate user delegation SAS
 *   },
 *   userDelegationKey, // UserDelegationKey
 *   accountName
 * ).toString();
 *
 * @export
 * @param {BlobSASSignatureValues} blobSASSignatureValues
 * @param {UserDelegationKey} userDelegationKey Return value of `blobServiceClient.getUserDelegationKey()`
 * @param {string} accountName
 * @returns {SASQueryParameters}
 */
export declare function generateBlobSASQueryParameters(blobSASSignatureValues: BlobSASSignatureValues, userDelegationKey: UserDelegationKey, accountName: string): SASQueryParameters;
//# sourceMappingURL=BlobSASSignatureValues.d.ts.map