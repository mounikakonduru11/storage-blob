import { RequestPolicy, RequestPolicyOptions, WebResource } from "@azure/core-http";
import { SharedKeyCredential } from "../credentials/SharedKeyCredential";
import { CredentialPolicy } from "./CredentialPolicy";
/**
 * SharedKeyCredentialPolicy is a policy used to sign HTTP request with a shared key.
 *
 * @export
 * @class SharedKeyCredentialPolicy
 * @extends {CredentialPolicy}
 */
export declare class SharedKeyCredentialPolicy extends CredentialPolicy {
    /**
     * Reference to SharedKeyCredential which generates SharedKeyCredentialPolicy
     *
     * @type {SharedKeyCredential}
     * @memberof SharedKeyCredentialPolicy
     */
    private readonly factory;
    /**
     * Creates an instance of SharedKeyCredentialPolicy.
     * @param {RequestPolicy} nextPolicy
     * @param {RequestPolicyOptions} options
     * @param {SharedKeyCredential} factory
     * @memberof SharedKeyCredentialPolicy
     */
    constructor(nextPolicy: RequestPolicy, options: RequestPolicyOptions, factory: SharedKeyCredential);
    /**
     * Signs request.
     *
     * @protected
     * @param {WebResource} request
     * @returns {WebResource}
     * @memberof SharedKeyCredentialPolicy
     */
    protected signRequest(request: WebResource): WebResource;
    /**
     * Retrieve header value according to shared key sign rules.
     * @see https://docs.microsoft.com/en-us/rest/api/storageservices/authenticate-with-shared-key
     *
     * @private
     * @param {WebResource} request
     * @param {string} headerName
     * @returns {string}
     * @memberof SharedKeyCredentialPolicy
     */
    private getHeaderValueToSign;
    /**
     * To construct the CanonicalizedHeaders portion of the signature string, follow these steps:
     * 1. Retrieve all headers for the resource that begin with x-ms-, including the x-ms-date header.
     * 2. Convert each HTTP header name to lowercase.
     * 3. Sort the headers lexicographically by header name, in ascending order.
     *    Each header may appear only once in the string.
     * 4. Replace any linear whitespace in the header value with a single space.
     * 5. Trim any whitespace around the colon in the header.
     * 6. Finally, append a new-line character to each canonicalized header in the resulting list.
     *    Construct the CanonicalizedHeaders string by concatenating all headers in this list into a single string.
     *
     * @private
     * @param {WebResource} request
     * @returns {string}
     * @memberof SharedKeyCredentialPolicy
     */
    private getCanonicalizedHeadersString;
    /**
     * Retrieves the webResource canonicalized resource string.
     *
     * @private
     * @param {WebResource} request
     * @returns {string}
     * @memberof SharedKeyCredentialPolicy
     */
    private getCanonicalizedResourceString;
}
//# sourceMappingURL=SharedKeyCredentialPolicy.d.ts.map