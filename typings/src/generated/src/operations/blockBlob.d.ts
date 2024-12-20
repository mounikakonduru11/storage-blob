import * as coreHttp from "@azure/core-http";
import * as Models from "../models";
import { StorageClientContext } from "../storageClientContext";
/** Class representing a BlockBlob. */
export declare class BlockBlob {
    private readonly client;
    /**
     * Create a BlockBlob.
     * @param {StorageClientContext} client Reference to the service client.
     */
    constructor(client: StorageClientContext);
    /**
     * The Upload Block Blob operation updates the content of an existing block blob. Updating an
     * existing block blob overwrites any existing metadata on the blob. Partial updates are not
     * supported with Put Blob; the content of the existing blob is overwritten with the content of the
     * new blob. To perform a partial update of the content of a block blob, use the Put Block List
     * operation.
     * @param body Initial data
     * @param contentLength The length of the request.
     * @param [options] The optional parameters
     * @returns Promise<Models.BlockBlobUploadResponse>
     */
    upload(body: coreHttp.HttpRequestBody, contentLength: number, options?: Models.BlockBlobUploadOptionalParams): Promise<Models.BlockBlobUploadResponse>;
    /**
     * @param body Initial data
     * @param contentLength The length of the request.
     * @param callback The callback
     */
    upload(body: coreHttp.HttpRequestBody, contentLength: number, callback: coreHttp.ServiceCallback<void>): void;
    /**
     * @param body Initial data
     * @param contentLength The length of the request.
     * @param options The optional parameters
     * @param callback The callback
     */
    upload(body: coreHttp.HttpRequestBody, contentLength: number, options: Models.BlockBlobUploadOptionalParams, callback: coreHttp.ServiceCallback<void>): void;
    /**
     * The Stage Block operation creates a new block to be committed as part of a blob
     * @param blockId A valid Base64 string value that identifies the block. Prior to encoding, the
     * string must be less than or equal to 64 bytes in size. For a given blob, the length of the value
     * specified for the blockid parameter must be the same size for each block.
     * @param contentLength The length of the request.
     * @param body Initial data
     * @param [options] The optional parameters
     * @returns Promise<Models.BlockBlobStageBlockResponse>
     */
    stageBlock(blockId: string, contentLength: number, body: coreHttp.HttpRequestBody, options?: Models.BlockBlobStageBlockOptionalParams): Promise<Models.BlockBlobStageBlockResponse>;
    /**
     * @param blockId A valid Base64 string value that identifies the block. Prior to encoding, the
     * string must be less than or equal to 64 bytes in size. For a given blob, the length of the value
     * specified for the blockid parameter must be the same size for each block.
     * @param contentLength The length of the request.
     * @param body Initial data
     * @param callback The callback
     */
    stageBlock(blockId: string, contentLength: number, body: coreHttp.HttpRequestBody, callback: coreHttp.ServiceCallback<void>): void;
    /**
     * @param blockId A valid Base64 string value that identifies the block. Prior to encoding, the
     * string must be less than or equal to 64 bytes in size. For a given blob, the length of the value
     * specified for the blockid parameter must be the same size for each block.
     * @param contentLength The length of the request.
     * @param body Initial data
     * @param options The optional parameters
     * @param callback The callback
     */
    stageBlock(blockId: string, contentLength: number, body: coreHttp.HttpRequestBody, options: Models.BlockBlobStageBlockOptionalParams, callback: coreHttp.ServiceCallback<void>): void;
    /**
     * The Stage Block operation creates a new block to be committed as part of a blob where the
     * contents are read from a URL.
     * @param blockId A valid Base64 string value that identifies the block. Prior to encoding, the
     * string must be less than or equal to 64 bytes in size. For a given blob, the length of the value
     * specified for the blockid parameter must be the same size for each block.
     * @param contentLength The length of the request.
     * @param sourceUrl Specify a URL to the copy source.
     * @param [options] The optional parameters
     * @returns Promise<Models.BlockBlobStageBlockFromURLResponse>
     */
    stageBlockFromURL(blockId: string, contentLength: number, sourceUrl: string, options?: Models.BlockBlobStageBlockFromURLOptionalParams): Promise<Models.BlockBlobStageBlockFromURLResponse>;
    /**
     * @param blockId A valid Base64 string value that identifies the block. Prior to encoding, the
     * string must be less than or equal to 64 bytes in size. For a given blob, the length of the value
     * specified for the blockid parameter must be the same size for each block.
     * @param contentLength The length of the request.
     * @param sourceUrl Specify a URL to the copy source.
     * @param callback The callback
     */
    stageBlockFromURL(blockId: string, contentLength: number, sourceUrl: string, callback: coreHttp.ServiceCallback<void>): void;
    /**
     * @param blockId A valid Base64 string value that identifies the block. Prior to encoding, the
     * string must be less than or equal to 64 bytes in size. For a given blob, the length of the value
     * specified for the blockid parameter must be the same size for each block.
     * @param contentLength The length of the request.
     * @param sourceUrl Specify a URL to the copy source.
     * @param options The optional parameters
     * @param callback The callback
     */
    stageBlockFromURL(blockId: string, contentLength: number, sourceUrl: string, options: Models.BlockBlobStageBlockFromURLOptionalParams, callback: coreHttp.ServiceCallback<void>): void;
    /**
     * The Commit Block List operation writes a blob by specifying the list of block IDs that make up
     * the blob. In order to be written as part of a blob, a block must have been successfully written
     * to the server in a prior Put Block operation. You can call Put Block List to update a blob by
     * uploading only those blocks that have changed, then committing the new and existing blocks
     * together. You can do this by specifying whether to commit a block from the committed block list
     * or from the uncommitted block list, or to commit the most recently uploaded version of the
     * block, whichever list it may belong to.
     * @param blocks
     * @param [options] The optional parameters
     * @returns Promise<Models.BlockBlobCommitBlockListResponse>
     */
    commitBlockList(blocks: Models.BlockLookupList, options?: Models.BlockBlobCommitBlockListOptionalParams): Promise<Models.BlockBlobCommitBlockListResponse>;
    /**
     * @param blocks
     * @param callback The callback
     */
    commitBlockList(blocks: Models.BlockLookupList, callback: coreHttp.ServiceCallback<void>): void;
    /**
     * @param blocks
     * @param options The optional parameters
     * @param callback The callback
     */
    commitBlockList(blocks: Models.BlockLookupList, options: Models.BlockBlobCommitBlockListOptionalParams, callback: coreHttp.ServiceCallback<void>): void;
    /**
     * The Get Block List operation retrieves the list of blocks that have been uploaded as part of a
     * block blob
     * @param listType Specifies whether to return the list of committed blocks, the list of
     * uncommitted blocks, or both lists together. Possible values include: 'committed', 'uncommitted',
     * 'all'
     * @param [options] The optional parameters
     * @returns Promise<Models.BlockBlobGetBlockListResponse>
     */
    getBlockList(listType: Models.BlockListType, options?: Models.BlockBlobGetBlockListOptionalParams): Promise<Models.BlockBlobGetBlockListResponse>;
    /**
     * @param listType Specifies whether to return the list of committed blocks, the list of
     * uncommitted blocks, or both lists together. Possible values include: 'committed', 'uncommitted',
     * 'all'
     * @param callback The callback
     */
    getBlockList(listType: Models.BlockListType, callback: coreHttp.ServiceCallback<Models.BlockList>): void;
    /**
     * @param listType Specifies whether to return the list of committed blocks, the list of
     * uncommitted blocks, or both lists together. Possible values include: 'committed', 'uncommitted',
     * 'all'
     * @param options The optional parameters
     * @param callback The callback
     */
    getBlockList(listType: Models.BlockListType, options: Models.BlockBlobGetBlockListOptionalParams, callback: coreHttp.ServiceCallback<Models.BlockList>): void;
}
//# sourceMappingURL=blockBlob.d.ts.map