import { UserDelegationKey } from "../BlobServiceClient";
/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * UserDelegationKeyCredential is only used for generation of user delegation SAS.
 * @see https://docs.microsoft.com/en-us/rest/api/storageservices/create-user-delegation-sas
 *
 * @export
 * @class UserDelegationKeyCredential
 */
export declare class UserDelegationKeyCredential {
    /**
     * Azure Storage account name; readonly.
     *
     * @type {string}
     * @memberof UserDelegationKeyCredential
     */
    readonly accountName: string;
    /**
     * Azure Storage user delegation key; readonly.
     *
     * @type {UserDelegationKey}
     * @memberof UserDelegationKeyCredential
     */
    readonly userDelegationKey: UserDelegationKey;
    /**
     * Key value in Buffer type.
     *
     * @private
     * @type {Buffer}
     * @memberof UserDelegationKeyCredential
     */
    private readonly key;
    /**
     * Creates an instance of UserDelegationKeyCredential.
     * @param {string} accountName
     * @param {UserDelegationKey} userDelegationKey
     * @memberof UserDelegationKeyCredential
     */
    constructor(accountName: string, userDelegationKey: UserDelegationKey);
    /**
     * Generates a hash signature for an HTTP request or for a SAS.
     *
     * @param {string} stringToSign
     * @returns {string}
     * @memberof UserDelegationKeyCredential
     */
    computeHMACSHA256(stringToSign: string): string;
}
//# sourceMappingURL=UserDelegationKeyCredential.d.ts.map