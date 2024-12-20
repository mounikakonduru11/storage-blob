/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * This is a helper class to construct a string representing the permissions granted by a ServiceSAS to a blob. Setting
 * a value to true means that any SAS which uses these permissions will grant permissions for that operation. Once all
 * the values are set, this should be serialized with toString and set as the permissions field on a
 * {@link BlobSASSignatureValues} object. It is possible to construct the permissions string without this class, but
 * the order of the permissions is particular and this class guarantees correctness.
 *
 * @export
 * @class BlobSASPermissions
 */
export declare class BlobSASPermissions {
    /**
     * Creates a {@link BlobSASPermissions} from the specified permissions string. This method will throw an
     * Error if it encounters a character that does not correspond to a valid permission.
     *
     * @static
     * @param {string} permissions
     * @returns {BlobSASPermissions}
     * @memberof BlobSASPermissions
     */
    static parse(permissions: string): BlobSASPermissions;
    /**
     * Specifies Read access granted.
     *
     * @type {boolean}
     * @memberof BlobSASPermissions
     */
    read: boolean;
    /**
     * Specifies Add access granted.
     *
     * @type {boolean}
     * @memberof BlobSASPermissions
     */
    add: boolean;
    /**
     * Specifies Create access granted.
     *
     * @type {boolean}
     * @memberof BlobSASPermissions
     */
    create: boolean;
    /**
     * Specifies Write access granted.
     *
     * @type {boolean}
     * @memberof BlobSASPermissions
     */
    write: boolean;
    /**
     * Specifies Delete access granted.
     *
     * @type {boolean}
     * @memberof BlobSASPermissions
     */
    delete: boolean;
    /**
     * Converts the given permissions to a string. Using this method will guarantee the permissions are in an
     * order accepted by the service.
     *
     * @returns {string} A string which represents the BlobSASPermissions
     * @memberof BlobSASPermissions
     */
    toString(): string;
}
//# sourceMappingURL=BlobSASPermissions.d.ts.map