import { BaseRequestPolicy, HttpOperationResponse, RequestPolicy, RequestPolicyOptions, WebResource } from "@azure/core-http";
import { KeepAliveOptions } from "../KeepAlivePolicyFactory";
/**
 * KeepAlivePolicy is a policy used to control keep alive settings for every request.
 *
 * @class KeepAlivePolicy
 * @extends {BaseRequestPolicy}
 */
export declare class KeepAlivePolicy extends BaseRequestPolicy {
    private readonly keepAliveOptions;
    /**
     * Creates an instance of KeepAlivePolicy.
     *
     * @param {RequestPolicy} nextPolicy
     * @param {RequestPolicyOptions} options
     * @param {KeepAliveOptions} [keepAliveOptions]
     * @memberof KeepAlivePolicy
     */
    constructor(nextPolicy: RequestPolicy, options: RequestPolicyOptions, keepAliveOptions: KeepAliveOptions);
    /**
     * Sends out request.
     *
     * @param {WebResource} request
     * @returns {Promise<HttpOperationResponse>}
     * @memberof KeepAlivePolicy
     */
    sendRequest(request: WebResource): Promise<HttpOperationResponse>;
}
//# sourceMappingURL=KeepAlivePolicy.d.ts.map