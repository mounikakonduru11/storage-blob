import { RequestPolicy, RequestPolicyFactory, RequestPolicyOptions } from "@azure/core-http";
import { CredentialPolicy } from "../policies/CredentialPolicy";
/**
 * Credential is an abstract class for Azure Storage HTTP requests signing. This
 * class will host an credentialPolicyCreator factory which generates CredentialPolicy.
 *
 * @export
 * @abstract
 * @class Credential
 */
export declare abstract class Credential implements RequestPolicyFactory {
    /**
     * Creates a RequestPolicy object.
     *
     * @param {RequestPolicy} _nextPolicy
     * @param {RequestPolicyOptions} _options
     * @returns {RequestPolicy}
     * @memberof Credential
     */
    create(_nextPolicy: RequestPolicy, _options: RequestPolicyOptions): RequestPolicy;
}
/**
 * A factory function that creates a new CredentialPolicy that uses the provided nextPolicy.
 */
export declare type CredentialPolicyCreator = (nextPolicy: RequestPolicy, options: RequestPolicyOptions) => CredentialPolicy;
//# sourceMappingURL=Credential.d.ts.map