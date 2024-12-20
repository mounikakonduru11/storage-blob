// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * This is a helper class to construct a string representing the resources accessible by an AccountSAS. Setting a value
 * to true means that any SAS which uses these permissions will grant access to that resource type. Once all the
 * values are set, this should be serialized with toString and set as the resources field on an
 * {@link AccountSASSignatureValues} object. It is possible to construct the resources string without this class, but
 * the order of the resources is particular and this class guarantees correctness.
 *
 * @export
 * @class AccountSASResourceTypes
 */
var AccountSASResourceTypes = /** @class */ (function () {
    function AccountSASResourceTypes() {
        /**
         * Permission to access service level APIs granted.
         *
         * @type {boolean}
         * @memberof AccountSASResourceTypes
         */
        this.service = false;
        /**
         * Permission to access container level APIs (Blob Containers, Tables, Queues, File Shares) granted.
         *
         * @type {boolean}
         * @memberof AccountSASResourceTypes
         */
        this.container = false;
        /**
         * Permission to access object level APIs (Blobs, Table Entities, Queue Messages, Files) granted.
         *
         * @type {boolean}
         * @memberof AccountSASResourceTypes
         */
        this.object = false;
    }
    /**
     * Creates an {@link AccountSASResourceTypes} from the specified resource types string. This method will throw an
     * Error if it encounters a character that does not correspond to a valid resource type.
     *
     * @static
     * @param {string} resourceTypes
     * @returns {AccountSASResourceTypes}
     * @memberof AccountSASResourceTypes
     */
    AccountSASResourceTypes.parse = function (resourceTypes) {
        var accountSASResourceTypes = new AccountSASResourceTypes();
        for (var _i = 0, resourceTypes_1 = resourceTypes; _i < resourceTypes_1.length; _i++) {
            var c = resourceTypes_1[_i];
            switch (c) {
                case "s":
                    accountSASResourceTypes.service = true;
                    break;
                case "c":
                    accountSASResourceTypes.container = true;
                    break;
                case "o":
                    accountSASResourceTypes.object = true;
                    break;
                default:
                    throw new RangeError("Invalid resource type: " + c);
            }
        }
        return accountSASResourceTypes;
    };
    /**
     * Converts the given resource types to a string.
     *
     * @see https://docs.microsoft.com/en-us/rest/api/storageservices/constructing-an-account-sas
     *
     * @returns {string}
     * @memberof AccountSASResourceTypes
     */
    AccountSASResourceTypes.prototype.toString = function () {
        var resourceTypes = [];
        if (this.service) {
            resourceTypes.push("s");
        }
        if (this.container) {
            resourceTypes.push("c");
        }
        if (this.object) {
            resourceTypes.push("o");
        }
        return resourceTypes.join("");
    };
    return AccountSASResourceTypes;
}());
export { AccountSASResourceTypes };
//# sourceMappingURL=AccountSASResourceTypes.js.map