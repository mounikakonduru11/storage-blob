/// <reference types="node" />
import { AbortSignalLike } from "@azure/abort-controller";
import { HttpHeaders } from "@azure/core-http";
/**
 * Reserved URL characters must be properly escaped for Storage services like Blob or File.
 *
 * ## URL encode and escape strategy for JS SDKs
 *
 * When customers pass a URL string into XxxClient classes constrcutor, the URL string may already be URL encoded or not.
 * But before sending to Azure Storage server, the URL must be encoded. However, it's hard for a SDK to guess whether the URL
 * string has been encoded or not. We have 2 potential strategies, and chose strategy two for the XxxClient constructors.
 *
 * ### Strategy One: Assume the customer URL string is not encoded, and always encode URL string in SDK.
 *
 * This is what legacy V2 SDK does, simple and works for most of the cases.
 * - When customer URL string is "http://account.blob.core.windows.net/con/b:",
 *   SDK will encode it to "http://account.blob.core.windows.net/con/b%3A" and send to server. A blob named "b:" will be created.
 * - When customer URL string is "http://account.blob.core.windows.net/con/b%3A",
 *   SDK will encode it to "http://account.blob.core.windows.net/con/b%253A" and send to server. A blob named "b%3A" will be created.
 *
 * But this strategy will make it not possible to create a blob with "?" in it's name. Because when customer URL string is
 * "http://account.blob.core.windows.net/con/blob?name", the "?name" will be treated as URL paramter instead of blob name.
 * If customer URL string is "http://account.blob.core.windows.net/con/blob%3Fname", a blob named "blob%3Fname" will be created.
 * V2 SDK doesn't have this issue because it doesn't allow customer pass in a full URL, it accepts a separate blob name and encodeURIComponent for it.
 * We cannot accept a SDK cannot create a blob name with "?". So we implement strategy two:
 *
 * ### Strategy Two: SDK doesn't assume the URL has been encoded or not. It will just escape the special characters.
 *
 * This is what V10 Blob Go SDK does. It accepts a URL type in Go, and call url.EscapedPath() to escape the special chars unescaped.
 * - When customer URL string is "http://account.blob.core.windows.net/con/b:",
 *   SDK will escape ":" like "http://account.blob.core.windows.net/con/b%3A" and send to server. A blob named "b:" will be created.
 * - When customer URL string is "http://account.blob.core.windows.net/con/b%3A",
 *   There is no special characters, so send "http://account.blob.core.windows.net/con/b%3A" to server. A blob named "b:" will be created.
 * - When customer URL string is "http://account.blob.core.windows.net/con/b%253A",
 *   There is no special characters, so send "http://account.blob.core.windows.net/con/b%253A" to server. A blob named "b%3A" will be created.
 *
 * This strategy gives us flexibility to create with any special characters. But "%" will be treated as a special characters, if the URL string
 * is not encoded, there shouldn't a "%" in the URL string, otherwise the URL is not a valid URL.
 * If customer needs to create a blob with "%" in it's blob name, use "%25" insead of "%". Just like above 3rd sample.
 * And following URL strings are invalid:
 * - "http://account.blob.core.windows.net/con/b%"
 * - "http://account.blob.core.windows.net/con/b%2"
 * - "http://account.blob.core.windows.net/con/b%G"
 *
 * Another special character is "?", use "%2F" to represent a blob name with "?" in a URL string.
 *
 * ### Strategy for containerName, blobName or other specific XXXName parameters in methods such as `containerClient.getBlobClient(blobName)`
 *
 * We will apply strategy one, and call encodeURIComponent for these parameters like blobName. Because what customers passes in is a plain name instead of a URL.
 *
 * @see https://docs.microsoft.com/en-us/rest/api/storageservices/naming-and-referencing-containers--blobs--and-metadata
 * @see https://docs.microsoft.com/en-us/rest/api/storageservices/naming-and-referencing-shares--directories--files--and-metadata
 *
 * @export
 * @param {string} url
 * @returns {string}
 */
export declare function escapeURLPath(url: string): string;
/**
 * Extracts the parts of an Azure Storage account connection string.
 *
 * @export
 * @param {string} connectionString Connection string.
 * @returns {{ kind: "AccountConnString" | "SASConnString", url: string, [key: string]: any }} String key value pairs of the storage account's url and credentials.
 */
export declare function extractConnectionStringParts(connectionString: string): {
    kind: "AccountConnString" | "SASConnString";
    url: string;
    [key: string]: any;
};
/**
 * Append a string to URL path. Will remove duplicated "/" in front of the string
 * when URL path ends with a "/".
 *
 * @export
 * @param {string} url Source URL string
 * @param {string} name String to be appended to URL
 * @returns {string} An updated URL string
 */
export declare function appendToURLPath(url: string, name: string): string;
/**
 * Set URL parameter name and value. If name exists in URL parameters, old value
 * will be replaced by name key. If not provide value, the parameter will be deleted.
 *
 * @export
 * @param {string} url Source URL string
 * @param {string} name Parameter name
 * @param {string} [value] Parameter value
 * @returns {string} An updated URL string
 */
export declare function setURLParameter(url: string, name: string, value?: string): string;
/**
 * Get URL parameter by name.
 *
 * @export
 * @param {string} url
 * @param {string} name
 * @returns {(string | string[] | undefined)}
 */
export declare function getURLParameter(url: string, name: string): string | string[] | undefined;
/**
 * Set URL host.
 *
 * @export
 * @param {string} url Source URL string
 * @param {string} host New host string
 * @returns An updated URL string
 */
export declare function setURLHost(url: string, host: string): string;
/**
 * Get URL path from an URL string.
 *
 * @export
 * @param {string} url Source URL string
 * @returns {(string | undefined)}
 */
export declare function getURLPath(url: string): string | undefined;
/**
 * Get URL scheme from an URL string.
 *
 * @export
 * @param {string} url Source URL string
 * @returns {(string | undefined)}
 */
export declare function getURLScheme(url: string): string | undefined;
/**
 * Get URL path and query from an URL string.
 *
 * @export
 * @param {string} url Source URL string
 * @returns {(string | undefined)}
 */
export declare function getURLPathAndQuery(url: string): string | undefined;
/**
 * Get URL query key value pairs from an URL string.
 *
 * @export
 * @param {string} url
 * @returns {{[key: string]: string}}
 */
export declare function getURLQueries(url: string): {
    [key: string]: string;
};
/**
 * Rounds a date off to seconds.
 *
 * @export
 * @param {Date} date
 * @param {boolean} [withMilliseconds=true] If true, YYYY-MM-DDThh:mm:ss.fffffffZ will be returned;
 *                                          If false, YYYY-MM-DDThh:mm:ssZ will be returned.
 * @returns {string} Date string in ISO8061 format, with or without 7 milliseconds component
 */
export declare function truncatedISO8061Date(date: Date, withMilliseconds?: boolean): string;
/**
 * Base64 encode.
 *
 * @export
 * @param {string} content
 * @returns {string}
 */
export declare function base64encode(content: string): string;
/**
 * Base64 decode.
 *
 * @export
 * @param {string} encodedString
 * @returns {string}
 */
export declare function base64decode(encodedString: string): string;
/**
 * Generate a 64 bytes base64 block ID string.
 *
 * @export
 * @param {number} blockIndex
 * @returns {string}
 */
export declare function generateBlockID(blockIDPrefix: string, blockIndex: number): string;
/**
 * Delay specified time interval.
 *
 * @export
 * @param {number} timeInMs
 * @param {AbortSignalLike} [aborter]
 * @param {Error} [abortError]
 */
export declare function delay(timeInMs: number, aborter?: AbortSignalLike, abortError?: Error): Promise<unknown>;
/**
 * String.prototype.padStart()
 *
 * @export
 * @param {string} currentString
 * @param {number} targetLength
 * @param {string} [padString=" "]
 * @returns {string}
 */
export declare function padStart(currentString: string, targetLength: number, padString?: string): string;
export declare function sanitizeURL(url: string): string;
export declare function sanitizeHeaders(originalHeader: HttpHeaders): HttpHeaders;
/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * Writes the content of a readstream to a local file. Returns a Promise which is completed after the file handle is closed.
 * If Promise is rejected, the reason will be set to the first error raised by either the
 * ReadableStream or the fs.WriteStream.
 *
 * @export
 * @param {NodeJS.ReadableStream} rs The read stream.
 * @param {string} file Destination file path.
 * @returns {Promise<void>}
 */
export declare function readStreamToLocalFile(rs: NodeJS.ReadableStream, file: string): Promise<void>;
/**
 * If two strings are equal when compared case insensitive.
 *
 * @export
 * @param {string} str1
 * @param {string} str2
 * @returns {boolean}
 */
export declare function iEqual(str1: string, str2: string): boolean;
//# sourceMappingURL=utils.common.d.ts.map