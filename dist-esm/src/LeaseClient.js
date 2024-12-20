// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import * as tslib_1 from "tslib";
import { generateUuid } from "@azure/core-http";
import { ContainerClient } from "./ContainerClient";
import { Blob, Container } from "./generated/src/operations";
import { StorageClientContext } from "./generated/src/storageClient";
/**
 * A client that manages leases for a ContainerClient or a BlobClient.
 *
 * @export
 * @class LeaseClient
 */
var LeaseClient = /** @class */ (function () {
    /**
     * Creates an instance of LeaseClient.
     * @param {(ContainerClient | BlobClient)} client The client to make the lease operation requests.
     * @param {string} leaseId Initial proposed lease id.
     * @memberof LeaseClient
     */
    function LeaseClient(client, leaseId) {
        var clientContext = new StorageClientContext(client.url, client.pipeline.toServiceClientOptions());
        this._url = client.url;
        if (client instanceof ContainerClient) {
            this._containerOrBlobOperation = new Container(clientContext);
        }
        else {
            this._containerOrBlobOperation = new Blob(clientContext);
        }
        if (!leaseId) {
            leaseId = generateUuid();
        }
        this._leaseId = leaseId;
    }
    Object.defineProperty(LeaseClient.prototype, "leaseId", {
        /**
         * Gets the lease Id.
         *
         * @readonly
         * @memberof LeaseClient
         */
        get: function () {
            return this._leaseId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LeaseClient.prototype, "url", {
        /**
         * Gets the url.
         *
         * @readonly
         * @memberof LeaseClient
         */
        get: function () {
            return this._url;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Establishes and manages a lock on a container for delete operations, or on a blob
     * for write and delete operations.
     * The lock duration can be 15 to 60 seconds, or can be infinite.
     * @see https://docs.microsoft.com/en-us/rest/api/storageservices/lease-container
     * and
     * @see https://docs.microsoft.com/en-us/rest/api/storageservices/lease-blob
     *
     * @param {number} duration Must be between 15 to 60 seconds, or infinite (-1)
     * @param {LeaseOperationOptions} [options={}] option to configure lease management operations.
     * @returns {Promise<LeaseOperationResponse>} Response data for acquire lease operation.
     * @memberof LeaseClient
     */
    LeaseClient.prototype.acquireLease = function (duration, options) {
        if (options === void 0) { options = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._containerOrBlobOperation.acquireLease({
                            abortSignal: options.abortSignal,
                            duration: duration,
                            modifiedAccessConditions: options.modifiedAccessConditions,
                            proposedLeaseId: this._leaseId
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * To change the ID of the lease.
     * @see https://docs.microsoft.com/en-us/rest/api/storageservices/lease-container
     * and
     * @see https://docs.microsoft.com/en-us/rest/api/storageservices/lease-blob
     *
     * @param {string} proposedLeaseId the proposed new lease Id.
     * @param {LeaseOperationOptions} [options={}] option to configure lease management operations.
     * @returns {Promise<LeaseOperationResponse>} Response data for change lease operation.
     * @memberof LeaseClient
     */
    LeaseClient.prototype.chanageLease = function (proposedLeaseId, options) {
        if (options === void 0) { options = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var response;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._containerOrBlobOperation.changeLease(this._leaseId, proposedLeaseId, {
                            abortSignal: options.abortSignal,
                            modifiedAccessConditions: options.modifiedAccessConditions
                        })];
                    case 1:
                        response = _a.sent();
                        this._leaseId = proposedLeaseId;
                        return [2 /*return*/, response];
                }
            });
        });
    };
    /**
     * To free the lease if it is no longer needed so that another client may
     * immediately acquire a lease against the container or the blob.
     * @see https://docs.microsoft.com/en-us/rest/api/storageservices/lease-container
     * and
     * @see https://docs.microsoft.com/en-us/rest/api/storageservices/lease-blob
     *
     * @param {LeaseOperationOptions} [options={}] option to configure lease management operations.
     * @returns {Promise<LeaseOperationResponse>} Response data for release lease operation.
     * @memberof LeaseClient
     */
    LeaseClient.prototype.releaseLease = function (options) {
        if (options === void 0) { options = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._containerOrBlobOperation.releaseLease(this._leaseId, {
                            abortSignal: options.abortSignal,
                            modifiedAccessConditions: options.modifiedAccessConditions
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * To renew the lease.
     * @see https://docs.microsoft.com/en-us/rest/api/storageservices/lease-container
     * and
     * @see https://docs.microsoft.com/en-us/rest/api/storageservices/lease-blob
     *
     * @param {LeaseOperationOptions} [options={}] Optional option to configure lease management operations.
     * @returns {Promise<LeaseOperationResponse>} Response data for renew lease operation.
     * @memberof LeaseClient
     */
    LeaseClient.prototype.renewLease = function (options) {
        if (options === void 0) { options = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._containerOrBlobOperation.renewLease(this._leaseId, {
                            abortSignal: options.abortSignal,
                            modifiedAccessConditions: options.modifiedAccessConditions
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * To end the lease but ensure that another client cannot acquire a new lease
     * until the current lease period has expired.
     * @see https://docs.microsoft.com/en-us/rest/api/storageservices/lease-container
     * and
     * @see https://docs.microsoft.com/en-us/rest/api/storageservices/lease-blob
     *
     * @static
     * @param {(ContainerClient | BlobClient)} client
     * @param {number} breakPeriod Break period
     * @param {LeaseOperationOptions} [options={}] Optional options to configure lease management operations.
     * @returns {Promise<LeaseOperationResponse>} Response data for break lease operation.
     * @memberof LeaseClient
     */
    LeaseClient.prototype.breakLease = function (breakPeriod, options) {
        if (options === void 0) { options = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var operationOptions;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        operationOptions = {
                            abortSignal: options.abortSignal,
                            breakPeriod: breakPeriod,
                            modifiedAccessConditions: options.modifiedAccessConditions
                        };
                        return [4 /*yield*/, this._containerOrBlobOperation.breakLease(operationOptions)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return LeaseClient;
}());
export { LeaseClient };
//# sourceMappingURL=LeaseClient.js.map