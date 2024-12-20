// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { LoggingPolicy } from "./policies/LoggingPolicy";
/**
 * LoggingPolicyFactory is a factory class helping generating LoggingPolicy objects.
 *
 * @export
 * @class LoggingPolicyFactory
 * @implements {RequestPolicyFactory}
 */
var LoggingPolicyFactory = /** @class */ (function () {
    function LoggingPolicyFactory(loggingOptions) {
        this.loggingOptions = loggingOptions;
    }
    LoggingPolicyFactory.prototype.create = function (nextPolicy, options) {
        return new LoggingPolicy(nextPolicy, options, this.loggingOptions);
    };
    return LoggingPolicyFactory;
}());
export { LoggingPolicyFactory };
//# sourceMappingURL=LoggingPolicyFactory.js.map