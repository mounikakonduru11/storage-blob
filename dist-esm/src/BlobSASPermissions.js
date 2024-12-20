// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
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
var BlobSASPermissions = /** @class */ (function () {
    function BlobSASPermissions() {
        /**
         * Specifies Read access granted.
         *
         * @type {boolean}
         * @memberof BlobSASPermissions
         */
        this.read = false;
        /**
         * Specifies Add access granted.
         *
         * @type {boolean}
         * @memberof BlobSASPermissions
         */
        this.add = false;
        /**
         * Specifies Create access granted.
         *
         * @type {boolean}
         * @memberof BlobSASPermissions
         */
        this.create = false;
        /**
         * Specifies Write access granted.
         *
         * @type {boolean}
         * @memberof BlobSASPermissions
         */
        this.write = false;
        /**
         * Specifies Delete access granted.
         *
         * @type {boolean}
         * @memberof BlobSASPermissions
         */
        this.delete = false;
    }
    /**
     * Creates a {@link BlobSASPermissions} from the specified permissions string. This method will throw an
     * Error if it encounters a character that does not correspond to a valid permission.
     *
     * @static
     * @param {string} permissions
     * @returns {BlobSASPermissions}
     * @memberof BlobSASPermissions
     */
    BlobSASPermissions.parse = function (permissions) {
        var blobSASPermissions = new BlobSASPermissions();
        for (var _i = 0, permissions_1 = permissions; _i < permissions_1.length; _i++) {
            var char = permissions_1[_i];
            switch (char) {
                case "r":
                    blobSASPermissions.read = true;
                    break;
                case "a":
                    blobSASPermissions.add = true;
                    break;
                case "c":
                    blobSASPermissions.create = true;
                    break;
                case "w":
                    blobSASPermissions.write = true;
                    break;
                case "d":
                    blobSASPermissions.delete = true;
                    break;
                default:
                    throw new RangeError("Invalid permission: " + char);
            }
        }
        return blobSASPermissions;
    };
    /**
     * Converts the given permissions to a string. Using this method will guarantee the permissions are in an
     * order accepted by the service.
     *
     * @returns {string} A string which represents the BlobSASPermissions
     * @memberof BlobSASPermissions
     */
    BlobSASPermissions.prototype.toString = function () {
        var permissions = [];
        if (this.read) {
            permissions.push("r");
        }
        if (this.add) {
            permissions.push("a");
        }
        if (this.create) {
            permissions.push("c");
        }
        if (this.write) {
            permissions.push("w");
        }
        if (this.delete) {
            permissions.push("d");
        }
        return permissions.join("");
    };
    return BlobSASPermissions;
}());
export { BlobSASPermissions };
//# sourceMappingURL=BlobSASPermissions.js.map