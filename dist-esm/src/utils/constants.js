// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
export var SDK_VERSION = "12.0.0-preview.3";
export var SERVICE_VERSION = "2019-02-02";
export var BLOCK_BLOB_MAX_UPLOAD_BLOB_BYTES = 256 * 1024 * 1024; // 256MB
export var BLOCK_BLOB_MAX_STAGE_BLOCK_BYTES = 100 * 1024 * 1024; // 100MB
export var BLOCK_BLOB_MAX_BLOCKS = 50000;
export var DEFAULT_BLOB_DOWNLOAD_BLOCK_BYTES = 4 * 1024 * 1024; // 4MB
export var DEFAULT_MAX_DOWNLOAD_RETRY_REQUESTS = 5;
export var DefaultStorageScope = "https://storage.azure.com/.default";
export var URLConstants = {
    Parameters: {
        FORCE_BROWSER_NO_CACHE: "_",
        SIGNATURE: "sig",
        SNAPSHOT: "snapshot",
        TIMEOUT: "timeout"
    }
};
export var HTTPURLConnection = {
    HTTP_ACCEPTED: 202,
    HTTP_CONFLICT: 409,
    HTTP_NOT_FOUND: 404,
    HTTP_PRECON_FAILED: 412,
    HTTP_RANGE_NOT_SATISFIABLE: 416
};
export var HeaderConstants = {
    AUTHORIZATION: "Authorization",
    AUTHORIZATION_SCHEME: "Bearer",
    CONTENT_ENCODING: "Content-Encoding",
    CONTENT_ID: "Content-ID",
    CONTENT_LANGUAGE: "Content-Language",
    CONTENT_LENGTH: "Content-Length",
    CONTENT_MD5: "Content-Md5",
    CONTENT_TRANSFER_ENCODING: "Content-Transfer-Encoding",
    CONTENT_TYPE: "Content-Type",
    COOKIE: "Cookie",
    DATE: "date",
    IF_MATCH: "if-match",
    IF_MODIFIED_SINCE: "if-modified-since",
    IF_NONE_MATCH: "if-none-match",
    IF_UNMODIFIED_SINCE: "if-unmodified-since",
    PREFIX_FOR_STORAGE: "x-ms-",
    RANGE: "Range",
    USER_AGENT: "User-Agent",
    X_MS_CLIENT_REQUEST_ID: "x-ms-client-request-id",
    X_MS_COPY_SOURCE: "x-ms-copy-source",
    X_MS_DATE: "x-ms-date",
    X_MS_ERROR_CODE: "x-ms-error-code",
    X_MS_VERSION: "x-ms-version"
};
export var ETagNone = "";
export var ETagAny = "*";
export var SIZE_1_MB = 1 * 1024 * 1024;
export var BATCH_MAX_REQUEST = 256;
export var BATCH_MAX_PAYLOAD_IN_BYTES = 4 * SIZE_1_MB;
export var HTTP_LINE_ENDING = "\r\n";
export var HTTP_VERSION_1_1 = "HTTP/1.1";
export var EncryptionAlgorithmAES25 = "AES256";
//# sourceMappingURL=constants.js.map