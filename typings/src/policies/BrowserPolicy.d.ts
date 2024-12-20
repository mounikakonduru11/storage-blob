import { BaseRequestPolicy, HttpOperationResponse, RequestPolicy, RequestPolicyOptions, WebResource } from "@azure/core-http";
/**
 * BrowserPolicy will handle differences between Node.js and browser runtime, including:
 *
 * 1. Browsers cache GET/HEAD requests by adding conditional headers such as 'IF_MODIFIED_SINCE'.
 * BrowserPolicy is a policy used to add a timestamp query to GET/HEAD request URL
 * thus avoid the browser cache.
 *
 * 2. Remove cookie header for security
 *
 * 3. Remove content-length header to avoid browsers warning
 *
 * @class BrowserPolicy
 * @extends {BaseRequestPolicy}
 */
export declare class BrowserPolicy extends BaseRequestPolicy {
    /**
     * Creates an instance of BrowserPolicy.
     * @param {RequestPolicy} nextPolicy
     * @param {RequestPolicyOptions} options
     * @memberof BrowserPolicy
     */
    constructor(nextPolicy: RequestPolicy, options: RequestPolicyOptions);
    /**
     * Sends out request.
     *
     * @param {WebResource} request
     * @returns {Promise<HttpOperationResponse>}
     * @memberof BrowserPolicy
     */
    sendRequest(request: WebResource): Promise<HttpOperationResponse>;
}
//# sourceMappingURL=BrowserPolicy.d.ts.map