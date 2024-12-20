/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * This is a helper class to construct a string representing the permissions granted by an AccountSAS. Setting a value
 * to true means that any SAS which uses these permissions will grant permissions for that operation. Once all the
 * values are set, this should be serialized with toString and set as the permissions field on an
 * {@link AccountSASSignatureValues} object. It is possible to construct the permissions string without this class, but
 * the order of the permissions is particular and this class guarantees correctness.
 *
 * @export
 * @class AccountSASPermissions
 */
export declare class AccountSASPermissions {
    /**
     * Parse initializes the AccountSASPermissions fields from a string.
     *
     * @static
     * @param {string} permissions
     * @returns {AccountSASPermissions}
     * @memberof AccountSASPermissions
     */
    static parse(permissions: string): AccountSASPermissions;
    /**
     * Permission to read resources and list queues and tables granted.
     *
     * @type {boolean}
     * @memberof AccountSASPermissions
     */
    read: boolean;
    /**
     * Permission to write resources granted.
     *
     * @type {boolean}
     * @memberof AccountSASPermissions
     */
    write: boolean;
    /**
     * Permission to create blobs and files granted.
     *
     * @type {boolean}
     * @memberof AccountSASPermissions
     */
    delete: boolean;
    /**
     * Permission to list blob containers, blobs, shares, directories, and files granted.
     *
     * @type {boolean}
     * @memberof AccountSASPermissions
     */
    list: boolean;
    /**
     * Permission to add messages, table entities, and append to blobs granted.
     *
     * @type {boolean}
     * @memberof AccountSASPermissions
     */
    add: boolean;
    /**
     * Permission to create blobs and files granted.
     *
     * @type {boolean}
     * @memberof AccountSASPermissions
     */
    create: boolean;
    /**
     * Permissions to update messages and table entities granted.
     *
     * @type {boolean}
     * @memberof AccountSASPermissions
     */
    update: boolean;
    /**
     * Permission to get and delete messages granted.
     *
     * @type {boolean}
     * @memberof AccountSASPermissions
     */
    process: boolean;
    /**
     * Produces the SAS permissions string for an Azure Storage account.
     * Call this method to set AccountSASSignatureValues Permissions field.
     *
     * Using this method will guarantee the resource types are in
     * an order accepted by the service.
     *
     * @see https://docs.microsoft.com/en-us/rest/api/storageservices/constructing-an-account-sas
     *
     * @returns {string}
     * @memberof AccountSASPermissions
     */
    toString(): string;
}
//# sourceMappingURL=AccountSASPermissions.d.ts.map