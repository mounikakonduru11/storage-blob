// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { isNode } from "@azure/core-http";
import * as os from "os";
import { TelemetryPolicy } from "./policies/TelemetryPolicy";
import { SDK_VERSION } from "./utils/constants";
/**
 * TelemetryPolicyFactory is a factory class helping generating TelemetryPolicy objects.
 *
 * @export
 * @class TelemetryPolicyFactory
 * @implements {RequestPolicyFactory}
 */
var TelemetryPolicyFactory = /** @class */ (function () {
    /**
     * Creates an instance of TelemetryPolicyFactory.
     * @param {TelemetryOptions} [telemetry]
     * @memberof TelemetryPolicyFactory
     */
    function TelemetryPolicyFactory(telemetry) {
        var userAgentInfo = [];
        if (isNode) {
            if (telemetry) {
                var telemetryString = telemetry.value.replace(" ", "");
                if (telemetryString.length > 0 && userAgentInfo.indexOf(telemetryString) === -1) {
                    userAgentInfo.push(telemetryString);
                }
            }
            // e.g. azsdk-js-storageblob/10.0.0
            var libInfo = "azsdk-js-storageblob/" + SDK_VERSION;
            if (userAgentInfo.indexOf(libInfo) === -1) {
                userAgentInfo.push(libInfo);
            }
            // e.g. (NODE-VERSION 4.9.1; Windows_NT 10.0.16299)
            var runtimeInfo = "(NODE-VERSION " + process.version + "; " + os.type() + " " + os.release() + ")";
            if (userAgentInfo.indexOf(runtimeInfo) === -1) {
                userAgentInfo.push(runtimeInfo);
            }
        }
        this.telemetryString = userAgentInfo.join(" ");
    }
    /**
     * Creates a TelemetryPolicy object.
     *
     * @param {RequestPolicy} nextPolicy
     * @param {RequestPolicyOptions} options
     * @returns {TelemetryPolicy}
     * @memberof TelemetryPolicyFactory
     */
    TelemetryPolicyFactory.prototype.create = function (nextPolicy, options) {
        return new TelemetryPolicy(nextPolicy, options, this.telemetryString);
    };
    return TelemetryPolicyFactory;
}());
export { TelemetryPolicyFactory };
//# sourceMappingURL=TelemetryPolicyFactory.js.map