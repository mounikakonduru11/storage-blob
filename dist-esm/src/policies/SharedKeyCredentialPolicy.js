// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import * as tslib_1 from "tslib";
import { HeaderConstants } from "../utils/constants";
import { getURLPath, getURLQueries } from "../utils/utils.common";
import { CredentialPolicy } from "./CredentialPolicy";
/**
 * SharedKeyCredentialPolicy is a policy used to sign HTTP request with a shared key.
 *
 * @export
 * @class SharedKeyCredentialPolicy
 * @extends {CredentialPolicy}
 */
var SharedKeyCredentialPolicy = /** @class */ (function (_super) {
    tslib_1.__extends(SharedKeyCredentialPolicy, _super);
    /**
     * Creates an instance of SharedKeyCredentialPolicy.
     * @param {RequestPolicy} nextPolicy
     * @param {RequestPolicyOptions} options
     * @param {SharedKeyCredential} factory
     * @memberof SharedKeyCredentialPolicy
     */
    function SharedKeyCredentialPolicy(nextPolicy, options, factory) {
        var _this = _super.call(this, nextPolicy, options) || this;
        _this.factory = factory;
        return _this;
    }
    /**
     * Signs request.
     *
     * @protected
     * @param {WebResource} request
     * @returns {WebResource}
     * @memberof SharedKeyCredentialPolicy
     */
    SharedKeyCredentialPolicy.prototype.signRequest = function (request) {
        request.headers.set(HeaderConstants.X_MS_DATE, new Date().toUTCString());
        if (request.body && typeof request.body === "string" && request.body.length > 0) {
            request.headers.set(HeaderConstants.CONTENT_LENGTH, Buffer.byteLength(request.body));
        }
        var stringToSign = [
            request.method.toUpperCase(),
            this.getHeaderValueToSign(request, HeaderConstants.CONTENT_LANGUAGE),
            this.getHeaderValueToSign(request, HeaderConstants.CONTENT_ENCODING),
            this.getHeaderValueToSign(request, HeaderConstants.CONTENT_LENGTH),
            this.getHeaderValueToSign(request, HeaderConstants.CONTENT_MD5),
            this.getHeaderValueToSign(request, HeaderConstants.CONTENT_TYPE),
            this.getHeaderValueToSign(request, HeaderConstants.DATE),
            this.getHeaderValueToSign(request, HeaderConstants.IF_MODIFIED_SINCE),
            this.getHeaderValueToSign(request, HeaderConstants.IF_MATCH),
            this.getHeaderValueToSign(request, HeaderConstants.IF_NONE_MATCH),
            this.getHeaderValueToSign(request, HeaderConstants.IF_UNMODIFIED_SINCE),
            this.getHeaderValueToSign(request, HeaderConstants.RANGE)
        ].join("\n") +
            "\n" +
            this.getCanonicalizedHeadersString(request) +
            this.getCanonicalizedResourceString(request);
        var signature = this.factory.computeHMACSHA256(stringToSign);
        request.headers.set(HeaderConstants.AUTHORIZATION, "SharedKey " + this.factory.accountName + ":" + signature);
        // Workaround for https://github.com/axios/axios/issues/2107
        // We should always keep the 'content-length' header once the issue is solved
        // For a better explanation about this workaround, look here: https://github.com/Azure/azure-sdk-for-js/pull/3273
        if (typeof request.body !== "function" && !(request.body && request.onUploadProgress)) {
            request.headers.remove(HeaderConstants.CONTENT_LENGTH);
        }
        // console.log(`[URL]:${request.url}`);
        // console.log(`[HEADERS]:${request.headers.toString()}`);
        // console.log(`[STRING TO SIGN]:${JSON.stringify(stringToSign)}`);
        // console.log(`[KEY]: ${request.headers.get(HeaderConstants.AUTHORIZATION)}`);
        return request;
    };
    /**
     * Retrieve header value according to shared key sign rules.
     * @see https://docs.microsoft.com/en-us/rest/api/storageservices/authenticate-with-shared-key
     *
     * @private
     * @param {WebResource} request
     * @param {string} headerName
     * @returns {string}
     * @memberof SharedKeyCredentialPolicy
     */
    SharedKeyCredentialPolicy.prototype.getHeaderValueToSign = function (request, headerName) {
        var value = request.headers.get(headerName);
        if (!value) {
            return "";
        }
        // When using version 2015-02-21 or later, if Content-Length is zero, then
        // set the Content-Length part of the StringToSign to an empty string.
        // https://docs.microsoft.com/en-us/rest/api/storageservices/authenticate-with-shared-key
        if (headerName === HeaderConstants.CONTENT_LENGTH && value === "0") {
            return "";
        }
        return value;
    };
    /**
     * To construct the CanonicalizedHeaders portion of the signature string, follow these steps:
     * 1. Retrieve all headers for the resource that begin with x-ms-, including the x-ms-date header.
     * 2. Convert each HTTP header name to lowercase.
     * 3. Sort the headers lexicographically by header name, in ascending order.
     *    Each header may appear only once in the string.
     * 4. Replace any linear whitespace in the header value with a single space.
     * 5. Trim any whitespace around the colon in the header.
     * 6. Finally, append a new-line character to each canonicalized header in the resulting list.
     *    Construct the CanonicalizedHeaders string by concatenating all headers in this list into a single string.
     *
     * @private
     * @param {WebResource} request
     * @returns {string}
     * @memberof SharedKeyCredentialPolicy
     */
    SharedKeyCredentialPolicy.prototype.getCanonicalizedHeadersString = function (request) {
        var headersArray = request.headers.headersArray().filter(function (value) {
            return value.name.toLowerCase().startsWith(HeaderConstants.PREFIX_FOR_STORAGE);
        });
        headersArray.sort(function (a, b) {
            return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
        });
        // Remove duplicate headers
        headersArray = headersArray.filter(function (value, index, array) {
            if (index > 0 && value.name.toLowerCase() === array[index - 1].name.toLowerCase()) {
                return false;
            }
            return true;
        });
        var canonicalizedHeadersStringToSign = "";
        headersArray.forEach(function (header) {
            canonicalizedHeadersStringToSign += header.name
                .toLowerCase()
                .trimRight() + ":" + header.value.trimLeft() + "\n";
        });
        return canonicalizedHeadersStringToSign;
    };
    /**
     * Retrieves the webResource canonicalized resource string.
     *
     * @private
     * @param {WebResource} request
     * @returns {string}
     * @memberof SharedKeyCredentialPolicy
     */
    SharedKeyCredentialPolicy.prototype.getCanonicalizedResourceString = function (request) {
        var path = getURLPath(request.url) || "/";
        var canonicalizedResourceString = "";
        canonicalizedResourceString += "/" + this.factory.accountName + path;
        var queries = getURLQueries(request.url);
        var lowercaseQueries = {};
        if (queries) {
            var queryKeys = [];
            for (var key in queries) {
                if (queries.hasOwnProperty(key)) {
                    var lowercaseKey = key.toLowerCase();
                    lowercaseQueries[lowercaseKey] = queries[key];
                    queryKeys.push(lowercaseKey);
                }
            }
            queryKeys.sort();
            for (var _i = 0, queryKeys_1 = queryKeys; _i < queryKeys_1.length; _i++) {
                var key = queryKeys_1[_i];
                canonicalizedResourceString += "\n" + key + ":" + decodeURIComponent(lowercaseQueries[key]);
            }
        }
        return canonicalizedResourceString;
    };
    return SharedKeyCredentialPolicy;
}(CredentialPolicy));
export { SharedKeyCredentialPolicy };
//# sourceMappingURL=SharedKeyCredentialPolicy.js.map