import * as coreHttp from "@azure/core-http";
import * as Models from "./models";
export declare class StorageClientContext extends coreHttp.ServiceClient {
    url: string;
    version: string;
    pathRenameMode?: Models.PathRenameMode;
    /**
     * Initializes a new instance of the StorageClientContext class.
     * @param url The URL of the service account, container, or blob that is the targe of the desired
     * operation.
     * @param [options] The parameter options
     */
    constructor(url: string, options?: Models.StorageClientOptions);
}
//# sourceMappingURL=storageClientContext.d.ts.map