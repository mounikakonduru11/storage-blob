import * as Models from "./models";
import * as Mappers from "./models/mappers";
import * as operations from "./operations";
import { StorageClientContext } from "./storageClientContext";
declare class StorageClient extends StorageClientContext {
    service: operations.Service;
    container: operations.Container;
    directory: operations.Directory;
    blob: operations.Blob;
    pageBlob: operations.PageBlob;
    appendBlob: operations.AppendBlob;
    blockBlob: operations.BlockBlob;
    /**
     * Initializes a new instance of the StorageClient class.
     * @param url The URL of the service account, container, or blob that is the targe of the desired
     * operation.
     * @param [options] The parameter options
     */
    constructor(url: string, options?: Models.StorageClientOptions);
}
export { StorageClient, StorageClientContext, Models as StorageModels, Mappers as StorageMappers };
export * from "./operations";
//# sourceMappingURL=storageClient.d.ts.map