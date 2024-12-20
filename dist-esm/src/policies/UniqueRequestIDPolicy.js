// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import * as tslib_1 from "tslib";
import { BaseRequestPolicy, generateUuid } from "@azure/core-http";
import { HeaderConstants } from "../utils/constants";
/**
 * UniqueRequestIDPolicy generates an UUID as x-ms-request-id header value.
 *
 * @class UniqueRequestIDPolicy
 * @extends {BaseRequestPolicy}
 */
var UniqueRequestIDPolicy = /** @class */ (function (_super) {
    tslib_1.__extends(UniqueRequestIDPolicy, _super);
    /**
     * Creates an instance of UniqueRequestIDPolicy.
     * @param {RequestPolicy} nextPolicy
     * @param {RequestPolicyOptions} options
     * @memberof UniqueRequestIDPolicy
     */
    function UniqueRequestIDPolicy(nextPolicy, options) {
        return _super.call(this, nextPolicy, options) || this;
    }
    /**
     * Sends request.
     *
     * @param {WebResource} request
     * @returns {Promise<HttpOperationResponse>}
     * @memberof UniqueRequestIDPolicy
     */
    UniqueRequestIDPolicy.prototype.sendRequest = function (request) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                if (!request.headers.contains(HeaderConstants.X_MS_CLIENT_REQUEST_ID)) {
                    request.headers.set(HeaderConstants.X_MS_CLIENT_REQUEST_ID, generateUuid());
                }
                return [2 /*return*/, this._nextPolicy.sendRequest(request)];
            });
        });
    };
    return UniqueRequestIDPolicy;
}(BaseRequestPolicy));
export { UniqueRequestIDPolicy };
//# sourceMappingURL=UniqueRequestIDPolicy.js.map