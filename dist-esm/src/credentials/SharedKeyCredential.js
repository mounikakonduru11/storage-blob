// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import * as tslib_1 from "tslib";
import * as Crypto from "crypto";
import { SharedKeyCredentialPolicy } from "../policies/SharedKeyCredentialPolicy";
import { Credential } from "./Credential";
/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * SharedKeyCredential for account key authorization of Azure Storage service.
 *
 * @export
 * @class SharedKeyCredential
 * @extends {Credential}
 */
var SharedKeyCredential = /** @class */ (function (_super) {
    tslib_1.__extends(SharedKeyCredential, _super);
    /**
     * Creates an instance of SharedKeyCredential.
     * @param {string} accountName
     * @param {string} accountKey
     * @memberof SharedKeyCredential
     */
    function SharedKeyCredential(accountName, accountKey) {
        var _this = _super.call(this) || this;
        _this.accountName = accountName;
        _this.accountKey = Buffer.from(accountKey, "base64");
        return _this;
    }
    /**
     * Creates a SharedKeyCredentialPolicy object.
     *
     * @param {RequestPolicy} nextPolicy
     * @param {RequestPolicyOptions} options
     * @returns {SharedKeyCredentialPolicy}
     * @memberof SharedKeyCredential
     */
    SharedKeyCredential.prototype.create = function (nextPolicy, options) {
        return new SharedKeyCredentialPolicy(nextPolicy, options, this);
    };
    /**
     * Generates a hash signature for an HTTP request or for a SAS.
     *
     * @param {string} stringToSign
     * @returns {string}
     * @memberof SharedKeyCredential
     */
    SharedKeyCredential.prototype.computeHMACSHA256 = function (stringToSign) {
        return Crypto.createHmac("sha256", this.accountKey)
            .update(stringToSign, "utf8")
            .digest("base64");
    };
    return SharedKeyCredential;
}(Credential));
export { SharedKeyCredential };
//# sourceMappingURL=SharedKeyCredential.js.map