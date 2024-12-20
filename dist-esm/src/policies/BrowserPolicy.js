// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import * as tslib_1 from "tslib";
import { BaseRequestPolicy, isNode } from "@azure/core-http";
import { HeaderConstants, URLConstants } from "../utils/constants";
import { setURLParameter } from "../utils/utils.common";
/**
 * BrowserPolicy will handle differences between Node.js and browser runtime, including:
 *
 * 1. Browsers cache GET/HEAD requests by adding conditional headers such as 'IF_MODIFIED_SINCE'.
 * BrowserPolicy is a policy used to add a timestamp query to GET/HEAD request URL
 * thus avoid the browser cache.
 *
 * 2. Remove cookie header for security
 *
 * 3. Remove content-length header to avoid browsers warning
 *
 * @class BrowserPolicy
 * @extends {BaseRequestPolicy}
 */
var BrowserPolicy = /** @class */ (function (_super) {
    tslib_1.__extends(BrowserPolicy, _super);
    /**
     * Creates an instance of BrowserPolicy.
     * @param {RequestPolicy} nextPolicy
     * @param {RequestPolicyOptions} options
     * @memberof BrowserPolicy
     */
    function BrowserPolicy(nextPolicy, options) {
        return _super.call(this, nextPolicy, options) || this;
    }
    /**
     * Sends out request.
     *
     * @param {WebResource} request
     * @returns {Promise<HttpOperationResponse>}
     * @memberof BrowserPolicy
     */
    BrowserPolicy.prototype.sendRequest = function (request) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                if (isNode) {
                    return [2 /*return*/, this._nextPolicy.sendRequest(request)];
                }
                if (request.method.toUpperCase() === "GET" || request.method.toUpperCase() === "HEAD") {
                    request.url = setURLParameter(request.url, URLConstants.Parameters.FORCE_BROWSER_NO_CACHE, new Date().getTime().toString());
                }
                request.headers.remove(HeaderConstants.COOKIE);
                // According to XHR standards, content-length should be fully controlled by browsers
                request.headers.remove(HeaderConstants.CONTENT_LENGTH);
                return [2 /*return*/, this._nextPolicy.sendRequest(request)];
            });
        });
    };
    return BrowserPolicy;
}(BaseRequestPolicy));
export { BrowserPolicy };
//# sourceMappingURL=BrowserPolicy.js.map