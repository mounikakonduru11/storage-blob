import { BaseRequestPolicy, HttpOperationResponse, RequestPolicy, RequestPolicyOptions, WebResource } from "@azure/core-http";
/**
 * UniqueRequestIDPolicy generates an UUID as x-ms-request-id header value.
 *
 * @class UniqueRequestIDPolicy
 * @extends {BaseRequestPolicy}
 */
export declare class UniqueRequestIDPolicy extends BaseRequestPolicy {
    /**
     * Creates an instance of UniqueRequestIDPolicy.
     * @param {RequestPolicy} nextPolicy
     * @param {RequestPolicyOptions} options
     * @memberof UniqueRequestIDPolicy
     */
    constructor(nextPolicy: RequestPolicy, options: RequestPolicyOptions);
    /**
     * Sends request.
     *
     * @param {WebResource} request
     * @returns {Promise<HttpOperationResponse>}
     * @memberof UniqueRequestIDPolicy
     */
    sendRequest(request: WebResource): Promise<HttpOperationResponse>;
}
//# sourceMappingURL=UniqueRequestIDPolicy.d.ts.map