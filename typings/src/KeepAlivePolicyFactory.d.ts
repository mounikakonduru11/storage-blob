import { RequestPolicy, RequestPolicyFactory, RequestPolicyOptions } from "@azure/core-http";
import { KeepAlivePolicy } from "./policies/KeepAlivePolicy";
/**
 * Interface of KeepAlivePolicy options.
 *
 * @export
 * @interface KeepAliveOptions
 */
export interface KeepAliveOptions {
    enable: boolean;
}
/**
 * KeepAlivePolicyFactory is a factory class helping generating KeepAlivePolicy objects.
 *
 * @export
 * @class KeepAlivePolicyFactory
 * @implements {RequestPolicyFactory}
 */
export declare class KeepAlivePolicyFactory implements RequestPolicyFactory {
    private readonly keepAliveOptions;
    /**
     * Creates an instance of KeepAlivePolicyFactory.
     *
     * @param {KeepAliveOptions} [telemetry]
     * @memberof KeepAlivePolicyFactory
     */
    constructor(keepAliveOptions?: KeepAliveOptions);
    create(nextPolicy: RequestPolicy, options: RequestPolicyOptions): KeepAlivePolicy;
}
//# sourceMappingURL=KeepAlivePolicyFactory.d.ts.map