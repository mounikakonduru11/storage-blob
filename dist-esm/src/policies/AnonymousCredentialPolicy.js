// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import * as tslib_1 from "tslib";
import { CredentialPolicy } from "./CredentialPolicy";
/**
 * AnonymousCredentialPolicy is used with HTTP(S) requests that read public resources
 * or for use with Shared Access Signatures (SAS).
 *
 * @export
 * @class AnonymousCredentialPolicy
 * @extends {CredentialPolicy}
 */
var AnonymousCredentialPolicy = /** @class */ (function (_super) {
    tslib_1.__extends(AnonymousCredentialPolicy, _super);
    /**
     * Creates an instance of AnonymousCredentialPolicy.
     * @param {RequestPolicy} nextPolicy
     * @param {RequestPolicyOptions} options
     * @memberof AnonymousCredentialPolicy
     */
    function AnonymousCredentialPolicy(nextPolicy, options) {
        return _super.call(this, nextPolicy, options) || this;
    }
    return AnonymousCredentialPolicy;
}(CredentialPolicy));
export { AnonymousCredentialPolicy };
//# sourceMappingURL=AnonymousCredentialPolicy.js.map