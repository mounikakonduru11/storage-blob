// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import * as tslib_1 from "tslib";
import { AnonymousCredentialPolicy } from "../policies/AnonymousCredentialPolicy";
import { Credential } from "./Credential";
/**
 * AnonymousCredential provides a credentialPolicyCreator member used to create
 * AnonymousCredentialPolicy objects. AnonymousCredentialPolicy is used with
 * HTTP(S) requests that read public resources or for use with Shared Access
 * Signatures (SAS).
 *
 * @export
 * @class AnonymousCredential
 * @extends {Credential}
 */
var AnonymousCredential = /** @class */ (function (_super) {
    tslib_1.__extends(AnonymousCredential, _super);
    function AnonymousCredential() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Creates an AnonymousCredentialPolicy object.
     *
     * @param {RequestPolicy} nextPolicy
     * @param {RequestPolicyOptions} options
     * @returns {AnonymousCredentialPolicy}
     * @memberof AnonymousCredential
     */
    AnonymousCredential.prototype.create = function (nextPolicy, options) {
        return new AnonymousCredentialPolicy(nextPolicy, options);
    };
    return AnonymousCredential;
}(Credential));
export { AnonymousCredential };
//# sourceMappingURL=AnonymousCredential.js.map