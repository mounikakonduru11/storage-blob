// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { AccountSASPermissions } from "./AccountSASPermissions";
import { AccountSASResourceTypes } from "./AccountSASResourceTypes";
import { AccountSASServices } from "./AccountSASServices";
import { ipRangeToString } from "./IPRange";
import { SASQueryParameters } from "./SASQueryParameters";
import { SERVICE_VERSION } from "./utils/constants";
import { truncatedISO8061Date } from "./utils/utils.common";
/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * Generates a {@link SASQueryParameters} object which contains all SAS query parameters needed to make an actual
 * REST request.
 *
 * @see https://docs.microsoft.com/en-us/rest/api/storageservices/constructing-an-account-sas
 *
 * @param {SharedKeyCredential} sharedKeyCredential
 * @returns {SASQueryParameters}
 * @memberof AccountSASSignatureValues
 */
export function generateAccountSASQueryParameters(accountSASSignatureValues, sharedKeyCredential) {
    var version = accountSASSignatureValues.version
        ? accountSASSignatureValues.version
        : SERVICE_VERSION;
    var parsedPermissions = AccountSASPermissions.parse(accountSASSignatureValues.permissions).toString();
    var parsedServices = AccountSASServices.parse(accountSASSignatureValues.services).toString();
    var parsedResourceTypes = AccountSASResourceTypes.parse(accountSASSignatureValues.resourceTypes).toString();
    var stringToSign = [
        sharedKeyCredential.accountName,
        parsedPermissions,
        parsedServices,
        parsedResourceTypes,
        accountSASSignatureValues.startTime
            ? truncatedISO8061Date(accountSASSignatureValues.startTime, false)
            : "",
        truncatedISO8061Date(accountSASSignatureValues.expiryTime, false),
        accountSASSignatureValues.ipRange ? ipRangeToString(accountSASSignatureValues.ipRange) : "",
        accountSASSignatureValues.protocol ? accountSASSignatureValues.protocol : "",
        version,
        "" // Account SAS requires an additional newline character
    ].join("\n");
    var signature = sharedKeyCredential.computeHMACSHA256(stringToSign);
    return new SASQueryParameters(version, signature, parsedPermissions, parsedServices, parsedResourceTypes, accountSASSignatureValues.protocol, accountSASSignatureValues.startTime, accountSASSignatureValues.expiryTime, accountSASSignatureValues.ipRange);
}
//# sourceMappingURL=AccountSASSignatureValues.js.map