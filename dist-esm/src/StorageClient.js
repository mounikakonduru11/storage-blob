// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { StorageClientContext } from "./generated/src/storageClientContext";
import { escapeURLPath, getURLScheme, iEqual } from "./utils/utils.common";
import { AnonymousCredential } from "./credentials/AnonymousCredential";
import { SharedKeyCredential } from "./credentials/SharedKeyCredential";
import { isTokenCredential, isNode } from "@azure/core-http";
/**
 * A StorageClient represents a based URL class for BlobServiceClient, ContainerClient and etc.
 *
 * @export
 * @class StorageClient
 */
var StorageClient = /** @class */ (function () {
    /**
     * Creates an instance of StorageClient.
     * @param {string} url url to resource
     * @param {Pipeline} pipeline request policy pipeline.
     * @memberof StorageClient
     */
    function StorageClient(url, pipeline) {
        // URL should be encoded and only once, protocol layer shouldn't encode URL again
        this.url = escapeURLPath(url);
        this.pipeline = pipeline;
        this.storageClientContext = new StorageClientContext(this.url, pipeline.toServiceClientOptions());
        this.isHttps = iEqual(getURLScheme(this.url) || "", "https");
        this.credential = new AnonymousCredential();
        for (var _i = 0, _a = this.pipeline.factories; _i < _a.length; _i++) {
            var factory = _a[_i];
            if ((isNode && factory instanceof SharedKeyCredential) ||
                factory instanceof AnonymousCredential ||
                isTokenCredential(factory)) {
                this.credential = factory;
            }
        }
        // Override protocol layer's default content-type
        var storageClientContext = this.storageClientContext;
        storageClientContext.requestContentType = undefined;
    }
    return StorageClient;
}());
export { StorageClient };
//# sourceMappingURL=StorageClient.js.map