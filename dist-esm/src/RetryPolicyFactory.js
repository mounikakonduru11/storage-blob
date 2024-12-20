// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { RetryPolicy } from "./policies/RetryPolicy";
export { RetryPolicyType } from "./policies/RetryPolicy";
/**
 * RetryPolicyFactory is a factory class helping generating RetryPolicy objects.
 *
 * @export
 * @class RetryPolicyFactory
 * @implements {RequestPolicyFactory}
 */
var RetryPolicyFactory = /** @class */ (function () {
    /**
     * Creates an instance of RetryPolicyFactory.
     * @param {RetryOptions} [retryOptions]
     * @memberof RetryPolicyFactory
     */
    function RetryPolicyFactory(retryOptions) {
        this.retryOptions = retryOptions;
    }
    RetryPolicyFactory.prototype.create = function (nextPolicy, options) {
        return new RetryPolicy(nextPolicy, options, this.retryOptions);
    };
    return RetryPolicyFactory;
}());
export { RetryPolicyFactory };
//# sourceMappingURL=RetryPolicyFactory.js.map