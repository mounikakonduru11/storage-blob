import * as coreHttp from "@azure/core-http";
import * as Models from "../models";
import { StorageClientContext } from "../storageClientContext";
/** Class representing a Directory. */
export declare class Directory {
    private readonly client;
    /**
     * Create a Directory.
     * @param {StorageClientContext} client Reference to the service client.
     */
    constructor(client: StorageClientContext);
    /**
     * Create a directory. By default, the destination is overwritten and if the destination already
     * exists and has a lease the lease is broken. This operation supports conditional HTTP requests.
     * For more information, see [Specifying Conditional Headers for Blob Service
     * Operations](https://docs.microsoft.com/en-us/rest/api/storageservices/specifying-conditional-headers-for-blob-service-operations).
     * To fail if the destination already exists, use a conditional request with If-None-Match: "*".
     * @param [options] The optional parameters
     * @returns Promise<Models.DirectoryCreateResponse>
     */
    create(options?: Models.DirectoryCreateOptionalParams): Promise<Models.DirectoryCreateResponse>;
    /**
     * @param callback The callback
     */
    create(callback: coreHttp.ServiceCallback<void>): void;
    /**
     * @param options The optional parameters
     * @param callback The callback
     */
    create(options: Models.DirectoryCreateOptionalParams, callback: coreHttp.ServiceCallback<void>): void;
    /**
     * Rename a directory. By default, the destination is overwritten and if the destination already
     * exists and has a lease the lease is broken. This operation supports conditional HTTP requests.
     * For more information, see [Specifying Conditional Headers for Blob Service
     * Operations](https://docs.microsoft.com/en-us/rest/api/storageservices/specifying-conditional-headers-for-blob-service-operations).
     * To fail if the destination already exists, use a conditional request with If-None-Match: "*".
     * @param renameSource The file or directory to be renamed. The value must have the following
     * format: "/{filesysystem}/{path}".  If "x-ms-properties" is specified, the properties will
     * overwrite the existing properties; otherwise, the existing properties will be preserved.
     * @param [options] The optional parameters
     * @returns Promise<Models.DirectoryRenameResponse>
     */
    rename(renameSource: string, options?: Models.DirectoryRenameOptionalParams): Promise<Models.DirectoryRenameResponse>;
    /**
     * @param renameSource The file or directory to be renamed. The value must have the following
     * format: "/{filesysystem}/{path}".  If "x-ms-properties" is specified, the properties will
     * overwrite the existing properties; otherwise, the existing properties will be preserved.
     * @param callback The callback
     */
    rename(renameSource: string, callback: coreHttp.ServiceCallback<void>): void;
    /**
     * @param renameSource The file or directory to be renamed. The value must have the following
     * format: "/{filesysystem}/{path}".  If "x-ms-properties" is specified, the properties will
     * overwrite the existing properties; otherwise, the existing properties will be preserved.
     * @param options The optional parameters
     * @param callback The callback
     */
    rename(renameSource: string, options: Models.DirectoryRenameOptionalParams, callback: coreHttp.ServiceCallback<void>): void;
    /**
     * Deletes the directory
     * @param recursiveDirectoryDelete If "true", all paths beneath the directory will be deleted. If
     * "false" and the directory is non-empty, an error occurs.
     * @param [options] The optional parameters
     * @returns Promise<Models.DirectoryDeleteResponse>
     */
    deleteMethod(recursiveDirectoryDelete: boolean, options?: Models.DirectoryDeleteMethodOptionalParams): Promise<Models.DirectoryDeleteResponse>;
    /**
     * @param recursiveDirectoryDelete If "true", all paths beneath the directory will be deleted. If
     * "false" and the directory is non-empty, an error occurs.
     * @param callback The callback
     */
    deleteMethod(recursiveDirectoryDelete: boolean, callback: coreHttp.ServiceCallback<void>): void;
    /**
     * @param recursiveDirectoryDelete If "true", all paths beneath the directory will be deleted. If
     * "false" and the directory is non-empty, an error occurs.
     * @param options The optional parameters
     * @param callback The callback
     */
    deleteMethod(recursiveDirectoryDelete: boolean, options: Models.DirectoryDeleteMethodOptionalParams, callback: coreHttp.ServiceCallback<void>): void;
    /**
     * Set the owner, group, permissions, or access control list for a directory.
     * @param [options] The optional parameters
     * @returns Promise<Models.DirectorySetAccessControlResponse>
     */
    setAccessControl(options?: Models.DirectorySetAccessControlOptionalParams): Promise<Models.DirectorySetAccessControlResponse>;
    /**
     * @param callback The callback
     */
    setAccessControl(callback: coreHttp.ServiceCallback<void>): void;
    /**
     * @param options The optional parameters
     * @param callback The callback
     */
    setAccessControl(options: Models.DirectorySetAccessControlOptionalParams, callback: coreHttp.ServiceCallback<void>): void;
    /**
     * Get the owner, group, permissions, or access control list for a directory.
     * @param [options] The optional parameters
     * @returns Promise<Models.DirectoryGetAccessControlResponse>
     */
    getAccessControl(options?: Models.DirectoryGetAccessControlOptionalParams): Promise<Models.DirectoryGetAccessControlResponse>;
    /**
     * @param callback The callback
     */
    getAccessControl(callback: coreHttp.ServiceCallback<void>): void;
    /**
     * @param options The optional parameters
     * @param callback The callback
     */
    getAccessControl(options: Models.DirectoryGetAccessControlOptionalParams, callback: coreHttp.ServiceCallback<void>): void;
}
//# sourceMappingURL=directory.d.ts.map