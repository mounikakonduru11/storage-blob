// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import * as tslib_1 from "tslib";
import { BaseRequestPolicy } from "@azure/core-http";
/**
 * Credential policy used to sign HTTP(S) requests before sending. This is an
 * abstract class.
 *
 * @export
 * @abstract
 * @class CredentialPolicy
 * @extends {BaseRequestPolicy}
 */
var CredentialPolicy = /** @class */ (function (_super) {
    tslib_1.__extends(CredentialPolicy, _super);
    function CredentialPolicy() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Sends out request.
     *
     * @param {WebResource} request
     * @returns {Promise<HttpOperationResponse>}
     * @memberof CredentialPolicy
     */
    CredentialPolicy.prototype.sendRequest = function (request) {
        return this._nextPolicy.sendRequest(this.signRequest(request));
    };
    /**
     * Child classes must implement this method with request signing. This method
     * will be executed in sendRequest().
     *
     * @protected
     * @abstract
     * @param {WebResource} request
     * @returns {WebResource}
     * @memberof CredentialPolicy
     */
    CredentialPolicy.prototype.signRequest = function (request) {
        // Child classes must override this method with request signing. This method
        // will be executed in sendRequest().
        return request;
    };
    return CredentialPolicy;
}(BaseRequestPolicy));
export { CredentialPolicy };
//# sourceMappingURL=CredentialPolicy.js.map