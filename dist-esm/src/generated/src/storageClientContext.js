/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is
 * regenerated.
 */
import * as tslib_1 from "tslib";
import * as coreHttp from "@azure/core-http";
var packageName = "azure-storage-blob";
var packageVersion = "1.0.0";
var StorageClientContext = /** @class */ (function (_super) {
    tslib_1.__extends(StorageClientContext, _super);
    /**
     * Initializes a new instance of the StorageClientContext class.
     * @param url The URL of the service account, container, or blob that is the targe of the desired
     * operation.
     * @param [options] The parameter options
     */
    function StorageClientContext(url, options) {
        var _this = this;
        if (url == undefined) {
            throw new Error("'url' cannot be null.");
        }
        if (!options) {
            options = {};
        }
        if (!options.userAgent) {
            var defaultUserAgent = coreHttp.getDefaultUserAgentValue();
            options.userAgent = packageName + "/" + packageVersion + " " + defaultUserAgent;
        }
        _this = _super.call(this, undefined, options) || this;
        _this.version = '2019-02-02';
        _this.baseUri = "{url}";
        _this.requestContentType = "application/json; charset=utf-8";
        _this.url = url;
        if (options.pathRenameMode !== null && options.pathRenameMode !== undefined) {
            _this.pathRenameMode = options.pathRenameMode;
        }
        return _this;
    }
    return StorageClientContext;
}(coreHttp.ServiceClient));
export { StorageClientContext };
//# sourceMappingURL=storageClientContext.js.map