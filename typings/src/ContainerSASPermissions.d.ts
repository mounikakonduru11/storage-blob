/**
 * This is a helper class to construct a string representing the permissions granted by a ServiceSAS to a container.
 * Setting a value to true means that any SAS which uses these permissions will grant permissions for that operation.
 * Once all the values are set, this should be serialized with toString and set as the permissions field on a
 * {@link BlobSASSignatureValues} object. It is possible to construct the permissions string without this class, but
 * the order of the permissions is particular and this class guarantees correctness.
 *
 * @export
 * @class ContainerSASPermissions
 */
export declare class ContainerSASPermissions {
    /**
     * Creates an {@link ContainerSASPermissions} from the specified permissions string. This method will throw an
     * Error if it encounters a character that does not correspond to a valid permission.
     *
     * @static
     * @param {string} permissions
     * @returns
     * @memberof ContainerSASPermissions
     */
    static parse(permissions: string): ContainerSASPermissions;
    /**
     * Specifies Read access granted.
     *
     * @type {boolean}
     * @memberof ContainerSASPermissions
     */
    read: boolean;
    /**
     * Specifies Add access granted.
     *
     * @type {boolean}
     * @memberof ContainerSASPermissions
     */
    add: boolean;
    /**
     * Specifies Create access granted.
     *
     * @type {boolean}
     * @memberof ContainerSASPermissions
     */
    create: boolean;
    /**
     * Specifies Write access granted.
     *
     * @type {boolean}
     * @memberof ContainerSASPermissions
     */
    write: boolean;
    /**
     * Specifies Delete access granted.
     *
     * @type {boolean}
     * @memberof ContainerSASPermissions
     */
    delete: boolean;
    /**
     * Specifies List access granted.
     *
     * @type {boolean}
     * @memberof ContainerSASPermissions
     */
    list: boolean;
    /**
     * Converts the given permissions to a string. Using this method will guarantee the permissions are in an
     * order accepted by the service.
     *
     * The order of the characters should be as specified here to ensure correctness.
     * @see https://docs.microsoft.com/en-us/rest/api/storageservices/constructing-a-service-sas
     *
     * @returns {string}
     * @memberof ContainerSASPermissions
     */
    toString(): string;
}
//# sourceMappingURL=ContainerSASPermissions.d.ts.map