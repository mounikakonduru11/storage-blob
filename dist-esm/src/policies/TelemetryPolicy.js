// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import * as tslib_1 from "tslib";
import { BaseRequestPolicy, HttpHeaders, isNode } from "@azure/core-http";
import { HeaderConstants } from "../utils/constants";
/**
 * TelemetryPolicy is a policy used to tag user-agent header for every requests.
 *
 * @class TelemetryPolicy
 * @extends {BaseRequestPolicy}
 */
var TelemetryPolicy = /** @class */ (function (_super) {
    tslib_1.__extends(TelemetryPolicy, _super);
    /**
     * Creates an instance of TelemetryPolicy.
     * @param {RequestPolicy} nextPolicy
     * @param {RequestPolicyOptions} options
     * @param {TelemetryOptions} [telemetry]
     * @memberof TelemetryPolicy
     */
    function TelemetryPolicy(nextPolicy, options, telemetry) {
        var _this = _super.call(this, nextPolicy, options) || this;
        _this.telemetry = telemetry;
        return _this;
    }
    /**
     * Sends out request.
     *
     * @param {WebResource} request
     * @returns {Promise<HttpOperationResponse>}
     * @memberof TelemetryPolicy
     */
    TelemetryPolicy.prototype.sendRequest = function (request) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                if (isNode) {
                    if (!request.headers) {
                        request.headers = new HttpHeaders();
                    }
                    if (!request.headers.get(HeaderConstants.USER_AGENT)) {
                        request.headers.set(HeaderConstants.USER_AGENT, this.telemetry);
                    }
                }
                return [2 /*return*/, this._nextPolicy.sendRequest(request)];
            });
        });
    };
    return TelemetryPolicy;
}(BaseRequestPolicy));
export { TelemetryPolicy };
//# sourceMappingURL=TelemetryPolicy.js.map