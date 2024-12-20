import { BaseRequestPolicy, HttpOperationResponse, WebResource } from "@azure/core-http";
/**
 * Credential policy used to sign HTTP(S) requests before sending. This is an
 * abstract class.
 *
 * @export
 * @abstract
 * @class CredentialPolicy
 * @extends {BaseRequestPolicy}
 */
export declare abstract class CredentialPolicy extends BaseRequestPolicy {
    /**
     * Sends out request.
     *
     * @param {WebResource} request
     * @returns {Promise<HttpOperationResponse>}
     * @memberof CredentialPolicy
     */
    sendRequest(request: WebResource): Promise<HttpOperationResponse>;
    /**
     * Child classes must implement this method with request signing. This method
     * will be executed in sendRequest().
     *
     * @protected
     * @abstract
     * @param {WebResource} request
     * @returns {WebResource}
     * @memberof CredentialPolicy
     */
    protected signRequest(request: WebResource): WebResource;
}
//# sourceMappingURL=CredentialPolicy.d.ts.map