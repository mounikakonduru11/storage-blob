import { KeepAlivePolicy } from "./policies/KeepAlivePolicy";
/**
 * KeepAlivePolicyFactory is a factory class helping generating KeepAlivePolicy objects.
 *
 * @export
 * @class KeepAlivePolicyFactory
 * @implements {RequestPolicyFactory}
 */
var KeepAlivePolicyFactory = /** @class */ (function () {
    /**
     * Creates an instance of KeepAlivePolicyFactory.
     *
     * @param {KeepAliveOptions} [telemetry]
     * @memberof KeepAlivePolicyFactory
     */
    function KeepAlivePolicyFactory(keepAliveOptions) {
        if (keepAliveOptions === void 0) { keepAliveOptions = { enable: true }; }
        this.keepAliveOptions = keepAliveOptions;
    }
    KeepAlivePolicyFactory.prototype.create = function (nextPolicy, options) {
        return new KeepAlivePolicy(nextPolicy, options, this.keepAliveOptions);
    };
    return KeepAlivePolicyFactory;
}());
export { KeepAlivePolicyFactory };
//# sourceMappingURL=KeepAlivePolicyFactory.js.map