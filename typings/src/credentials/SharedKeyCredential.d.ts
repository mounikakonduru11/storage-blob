import { RequestPolicy, RequestPolicyOptions } from "@azure/core-http";
import { SharedKeyCredentialPolicy } from "../policies/SharedKeyCredentialPolicy";
import { Credential } from "./Credential";
/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * SharedKeyCredential for account key authorization of Azure Storage service.
 *
 * @export
 * @class SharedKeyCredential
 * @extends {Credential}
 */
export declare class SharedKeyCredential extends Credential {
    /**
     * Azure Storage account name; readonly.
     *
     * @type {string}
     * @memberof SharedKeyCredential
     */
    readonly accountName: string;
    /**
     * Azure Storage account key; readonly.
     *
     * @type {Buffer}
     * @memberof SharedKeyCredential
     */
    private readonly accountKey;
    /**
     * Creates an instance of SharedKeyCredential.
     * @param {string} accountName
     * @param {string} accountKey
     * @memberof SharedKeyCredential
     */
    constructor(accountName: string, accountKey: string);
    /**
     * Creates a SharedKeyCredentialPolicy object.
     *
     * @param {RequestPolicy} nextPolicy
     * @param {RequestPolicyOptions} options
     * @returns {SharedKeyCredentialPolicy}
     * @memberof SharedKeyCredential
     */
    create(nextPolicy: RequestPolicy, options: RequestPolicyOptions): SharedKeyCredentialPolicy;
    /**
     * Generates a hash signature for an HTTP request or for a SAS.
     *
     * @param {string} stringToSign
     * @returns {string}
     * @memberof SharedKeyCredential
     */
    computeHMACSHA256(stringToSign: string): string;
}
//# sourceMappingURL=SharedKeyCredential.d.ts.map