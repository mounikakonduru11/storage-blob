// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { BlobSASPermissions } from "./BlobSASPermissions";
import { ContainerSASPermissions } from "./ContainerSASPermissions";
import { SharedKeyCredential } from "./credentials/SharedKeyCredential";
import { ipRangeToString } from "./IPRange";
import { SASQueryParameters } from "./SASQueryParameters";
import { UserDelegationKeyCredential } from "./credentials/UserDelegationKeyCredential";
import { SERVICE_VERSION } from "./utils/constants";
import { truncatedISO8061Date } from "./utils/utils.common";
export function generateBlobSASQueryParameters(blobSASSignatureValues, sharedKeyCredentialOrUserDelegationKey, accountName) {
    var version = blobSASSignatureValues.version ? blobSASSignatureValues.version : SERVICE_VERSION;
    var sharedKeyCredential = sharedKeyCredentialOrUserDelegationKey instanceof SharedKeyCredential
        ? sharedKeyCredentialOrUserDelegationKey
        : undefined;
    var userDelegationKeyCredential;
    if (sharedKeyCredential === undefined && accountName !== undefined) {
        userDelegationKeyCredential = new UserDelegationKeyCredential(accountName, sharedKeyCredentialOrUserDelegationKey);
    }
    if (sharedKeyCredential === undefined && userDelegationKeyCredential === undefined) {
        throw TypeError("Invalid sharedKeyCredential, userDelegationKey or accountName.");
    }
    // Version 2018-11-09 adds support for the signed resource and signed blob snapshot time fields.
    // https://docs.microsoft.com/en-us/rest/api/storageservices/constructing-a-service-sas#constructing-the-signature-string
    if (version >= "2018-11-09") {
        if (sharedKeyCredential !== undefined) {
            return generateBlobSASQueryParameters20181109(blobSASSignatureValues, sharedKeyCredential);
        }
        else {
            return generateBlobSASQueryParametersUDK20181109(blobSASSignatureValues, userDelegationKeyCredential);
        }
    }
    if (version >= "2015-04-05") {
        if (sharedKeyCredential !== undefined) {
            return generateBlobSASQueryParameters20150405(blobSASSignatureValues, sharedKeyCredential);
        }
        else {
            throw new RangeError("'version' must be >= '2018-11-09' when generating user delegation SAS using user delegation key.");
        }
    }
    throw new RangeError("'version' must be >= '2015-04-05'.");
}
/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 * IMPLEMENTATION FOR API VERSION FROM 2015-04-05 AND BEFORE 2018-11-09.
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
 * @param {BlobSASSignatureValues} blobSASSignatureValues
 * @param {SharedKeyCredential} sharedKeyCredential
 * @returns {SASQueryParameters}
 */
function generateBlobSASQueryParameters20150405(blobSASSignatureValues, sharedKeyCredential) {
    if (!blobSASSignatureValues.identifier &&
        (!blobSASSignatureValues.permissions && !blobSASSignatureValues.expiryTime)) {
        throw new RangeError("Must provide 'permissions' and 'expiryTime' for Blob SAS generation when 'identifier' is not provided.");
    }
    var version = blobSASSignatureValues.version ? blobSASSignatureValues.version : SERVICE_VERSION;
    var resource = "c";
    var verifiedPermissions;
    if (blobSASSignatureValues.snapshotTime) {
        throw RangeError("'version' must be >= '2018-11-09' when provided 'snapshotTime'.");
    }
    // Calling parse and toString guarantees the proper ordering and throws on invalid characters.
    if (blobSASSignatureValues.permissions) {
        if (blobSASSignatureValues.blobName) {
            verifiedPermissions = BlobSASPermissions.parse(blobSASSignatureValues.permissions).toString();
            resource = "b";
        }
        else {
            verifiedPermissions = ContainerSASPermissions.parse(blobSASSignatureValues.permissions).toString();
        }
    }
    // Signature is generated on the un-url-encoded values.
    var stringToSign = [
        verifiedPermissions ? verifiedPermissions : "",
        blobSASSignatureValues.startTime
            ? truncatedISO8061Date(blobSASSignatureValues.startTime, false)
            : "",
        blobSASSignatureValues.expiryTime
            ? truncatedISO8061Date(blobSASSignatureValues.expiryTime, false)
            : "",
        getCanonicalName(sharedKeyCredential.accountName, blobSASSignatureValues.containerName, blobSASSignatureValues.blobName),
        blobSASSignatureValues.identifier,
        blobSASSignatureValues.ipRange ? ipRangeToString(blobSASSignatureValues.ipRange) : "",
        blobSASSignatureValues.protocol ? blobSASSignatureValues.protocol : "",
        version,
        blobSASSignatureValues.cacheControl ? blobSASSignatureValues.cacheControl : "",
        blobSASSignatureValues.contentDisposition ? blobSASSignatureValues.contentDisposition : "",
        blobSASSignatureValues.contentEncoding ? blobSASSignatureValues.contentEncoding : "",
        blobSASSignatureValues.contentLanguage ? blobSASSignatureValues.contentLanguage : "",
        blobSASSignatureValues.contentType ? blobSASSignatureValues.contentType : ""
    ].join("\n");
    var signature = sharedKeyCredential.computeHMACSHA256(stringToSign);
    return new SASQueryParameters(version, signature, verifiedPermissions, undefined, undefined, blobSASSignatureValues.protocol, blobSASSignatureValues.startTime, blobSASSignatureValues.expiryTime, blobSASSignatureValues.ipRange, blobSASSignatureValues.identifier, resource, blobSASSignatureValues.cacheControl, blobSASSignatureValues.contentDisposition, blobSASSignatureValues.contentEncoding, blobSASSignatureValues.contentLanguage, blobSASSignatureValues.contentType);
}
/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 * IMPLEMENTATION FOR API VERSION FROM 2018-11-09.
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
 * @param {BlobSASSignatureValues} blobSASSignatureValues
 * @param {SharedKeyCredential} sharedKeyCredential
 * @returns {SASQueryParameters}
 */
function generateBlobSASQueryParameters20181109(blobSASSignatureValues, sharedKeyCredential) {
    if (!blobSASSignatureValues.identifier &&
        (!blobSASSignatureValues.permissions && !blobSASSignatureValues.expiryTime)) {
        throw new RangeError("Must provide 'permissions' and 'expiryTime' for Blob SAS generation when 'identifier' is not provided.");
    }
    var version = blobSASSignatureValues.version ? blobSASSignatureValues.version : SERVICE_VERSION;
    var resource = "c";
    var verifiedPermissions;
    if (blobSASSignatureValues.blobName === undefined && blobSASSignatureValues.snapshotTime) {
        throw RangeError("Must provide 'blobName' when provided 'snapshotTime'.");
    }
    // Calling parse and toString guarantees the proper ordering and throws on invalid characters.
    if (blobSASSignatureValues.permissions) {
        if (blobSASSignatureValues.blobName) {
            verifiedPermissions = BlobSASPermissions.parse(blobSASSignatureValues.permissions).toString();
            resource = "b";
            if (blobSASSignatureValues.snapshotTime) {
                resource = "bs";
            }
        }
        else {
            verifiedPermissions = ContainerSASPermissions.parse(blobSASSignatureValues.permissions).toString();
        }
    }
    // Signature is generated on the un-url-encoded values.
    var stringToSign = [
        verifiedPermissions ? verifiedPermissions : "",
        blobSASSignatureValues.startTime
            ? truncatedISO8061Date(blobSASSignatureValues.startTime, false)
            : "",
        blobSASSignatureValues.expiryTime
            ? truncatedISO8061Date(blobSASSignatureValues.expiryTime, false)
            : "",
        getCanonicalName(sharedKeyCredential.accountName, blobSASSignatureValues.containerName, blobSASSignatureValues.blobName),
        blobSASSignatureValues.identifier,
        blobSASSignatureValues.ipRange ? ipRangeToString(blobSASSignatureValues.ipRange) : "",
        blobSASSignatureValues.protocol ? blobSASSignatureValues.protocol : "",
        version,
        resource,
        blobSASSignatureValues.snapshotTime,
        blobSASSignatureValues.cacheControl ? blobSASSignatureValues.cacheControl : "",
        blobSASSignatureValues.contentDisposition ? blobSASSignatureValues.contentDisposition : "",
        blobSASSignatureValues.contentEncoding ? blobSASSignatureValues.contentEncoding : "",
        blobSASSignatureValues.contentLanguage ? blobSASSignatureValues.contentLanguage : "",
        blobSASSignatureValues.contentType ? blobSASSignatureValues.contentType : ""
    ].join("\n");
    var signature = sharedKeyCredential.computeHMACSHA256(stringToSign);
    return new SASQueryParameters(version, signature, verifiedPermissions, undefined, undefined, blobSASSignatureValues.protocol, blobSASSignatureValues.startTime, blobSASSignatureValues.expiryTime, blobSASSignatureValues.ipRange, blobSASSignatureValues.identifier, resource, blobSASSignatureValues.cacheControl, blobSASSignatureValues.contentDisposition, blobSASSignatureValues.contentEncoding, blobSASSignatureValues.contentLanguage, blobSASSignatureValues.contentType);
}
/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 * IMPLEMENTATION FOR API VERSION FROM 2018-11-09.
 *
 * Creates an instance of SASQueryParameters.
 *
 * Only accepts required settings needed to create a SAS. For optional settings please
 * set corresponding properties directly, such as permissions, startTime and identifier.
 *
 * WARNING: identifier will be ignored, permissions and expiryTime are required.
 *
 * @param {BlobSASSignatureValues} blobSASSignatureValues
 * @param {UserDelegationKeyCredential} userDelegationKeyCredential
 * @returns {SASQueryParameters}
 */
function generateBlobSASQueryParametersUDK20181109(blobSASSignatureValues, userDelegationKeyCredential) {
    if (!blobSASSignatureValues.permissions || !blobSASSignatureValues.expiryTime) {
        throw new RangeError("Must provide 'permissions' and 'expiryTime' for Blob SAS generation when generating user delegation SAS.");
    }
    var version = blobSASSignatureValues.version ? blobSASSignatureValues.version : SERVICE_VERSION;
    var resource = "c";
    var verifiedPermissions;
    if (blobSASSignatureValues.blobName === undefined && blobSASSignatureValues.snapshotTime) {
        throw RangeError("Must provide 'blobName' when provided 'snapshotTime'.");
    }
    // Calling parse and toString guarantees the proper ordering and throws on invalid characters.
    if (blobSASSignatureValues.permissions) {
        if (blobSASSignatureValues.blobName) {
            verifiedPermissions = BlobSASPermissions.parse(blobSASSignatureValues.permissions).toString();
            resource = "b";
            if (blobSASSignatureValues.snapshotTime) {
                resource = "bs";
            }
        }
        else {
            verifiedPermissions = ContainerSASPermissions.parse(blobSASSignatureValues.permissions).toString();
        }
    }
    // Signature is generated on the un-url-encoded values.
    var stringToSign = [
        verifiedPermissions ? verifiedPermissions : "",
        blobSASSignatureValues.startTime
            ? truncatedISO8061Date(blobSASSignatureValues.startTime, false)
            : "",
        blobSASSignatureValues.expiryTime
            ? truncatedISO8061Date(blobSASSignatureValues.expiryTime, false)
            : "",
        getCanonicalName(userDelegationKeyCredential.accountName, blobSASSignatureValues.containerName, blobSASSignatureValues.blobName),
        userDelegationKeyCredential.userDelegationKey.signedOid,
        userDelegationKeyCredential.userDelegationKey.signedTid,
        userDelegationKeyCredential.userDelegationKey.signedStart
            ? truncatedISO8061Date(userDelegationKeyCredential.userDelegationKey.signedStart, false)
            : "",
        userDelegationKeyCredential.userDelegationKey.signedExpiry
            ? truncatedISO8061Date(userDelegationKeyCredential.userDelegationKey.signedExpiry, false)
            : "",
        userDelegationKeyCredential.userDelegationKey.signedService,
        userDelegationKeyCredential.userDelegationKey.signedVersion,
        blobSASSignatureValues.ipRange ? ipRangeToString(blobSASSignatureValues.ipRange) : "",
        blobSASSignatureValues.protocol ? blobSASSignatureValues.protocol : "",
        version,
        resource,
        blobSASSignatureValues.snapshotTime,
        blobSASSignatureValues.cacheControl,
        blobSASSignatureValues.contentDisposition,
        blobSASSignatureValues.contentEncoding,
        blobSASSignatureValues.contentLanguage,
        blobSASSignatureValues.contentType
    ].join("\n");
    var signature = userDelegationKeyCredential.computeHMACSHA256(stringToSign);
    return new SASQueryParameters(version, signature, verifiedPermissions, undefined, undefined, blobSASSignatureValues.protocol, blobSASSignatureValues.startTime, blobSASSignatureValues.expiryTime, blobSASSignatureValues.ipRange, blobSASSignatureValues.identifier, resource, blobSASSignatureValues.cacheControl, blobSASSignatureValues.contentDisposition, blobSASSignatureValues.contentEncoding, blobSASSignatureValues.contentLanguage, blobSASSignatureValues.contentType, userDelegationKeyCredential.userDelegationKey);
}
function getCanonicalName(accountName, containerName, blobName) {
    // Container: "/blob/account/containerName"
    // Blob:      "/blob/account/containerName/blobName"
    var elements = ["/blob/" + accountName + "/" + containerName];
    if (blobName) {
        elements.push("/" + blobName);
    }
    return elements.join("");
}
//# sourceMappingURL=BlobSASSignatureValues.js.map