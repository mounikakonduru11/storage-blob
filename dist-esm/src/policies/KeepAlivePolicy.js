import * as tslib_1 from "tslib";
import { BaseRequestPolicy } from "@azure/core-http";
/**
 * KeepAlivePolicy is a policy used to control keep alive settings for every request.
 *
 * @class KeepAlivePolicy
 * @extends {BaseRequestPolicy}
 */
var KeepAlivePolicy = /** @class */ (function (_super) {
    tslib_1.__extends(KeepAlivePolicy, _super);
    /**
     * Creates an instance of KeepAlivePolicy.
     *
     * @param {RequestPolicy} nextPolicy
     * @param {RequestPolicyOptions} options
     * @param {KeepAliveOptions} [keepAliveOptions]
     * @memberof KeepAlivePolicy
     */
    function KeepAlivePolicy(nextPolicy, options, keepAliveOptions) {
        var _this = _super.call(this, nextPolicy, options) || this;
        _this.keepAliveOptions = keepAliveOptions;
        return _this;
    }
    /**
     * Sends out request.
     *
     * @param {WebResource} request
     * @returns {Promise<HttpOperationResponse>}
     * @memberof KeepAlivePolicy
     */
    KeepAlivePolicy.prototype.sendRequest = function (request) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                request.keepAlive = this.keepAliveOptions.enable;
                return [2 /*return*/, this._nextPolicy.sendRequest(request)];
            });
        });
    };
    return KeepAlivePolicy;
}(BaseRequestPolicy));
export { KeepAlivePolicy };
//# sourceMappingURL=KeepAlivePolicy.js.map