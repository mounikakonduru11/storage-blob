import * as tslib_1 from "tslib";
import { HttpHeaders } from "@azure/core-http";
import { HTTP_VERSION_1_1, HTTP_LINE_ENDING, HeaderConstants, HTTPURLConnection } from "./utils/constants";
import { getBodyAsText } from "./BatchUtils";
var HTTP_HEADER_DELIMITER = ": ";
var SPACE_DELIMITER = " ";
var NOT_FOUND = -1;
/**
 * Util class for parsing batch response.
 */
var BatchResponseParser = /** @class */ (function () {
    function BatchResponseParser(batchResponse, subRequests) {
        if (!batchResponse || !batchResponse.contentType) {
            // In special case(reported), server may return invalid content-type which could not be parsed.
            throw new RangeError("batchResponse is malformed or doesn't contain valid content-type.");
        }
        if (!subRequests || subRequests.size === 0) {
            // This should be prevent during coding.
            throw new RangeError("Invalid state: subRequests is not provided or size is 0.");
        }
        this.batchResponse = batchResponse;
        this.subRequests = subRequests;
        this.responseBatchBoundary = this.batchResponse.contentType.split("=")[1];
        this.perResponsePrefix = "--" + this.responseBatchBoundary + HTTP_LINE_ENDING;
        this.batchResponseEnding = "--" + this.responseBatchBoundary + "--";
    }
    // For example of response, please refer to https://docs.microsoft.com/en-us/rest/api/storageservices/blob-batch#response
    BatchResponseParser.prototype.parseBatchResponse = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var responseBodyAsText, subResponses, subResponseCount, deserializedSubResponses, subResponsesSucceededCount, subResponsesFailedCount, index, subResponse, deserializedSubResponse, responseLines, subRespHeaderStartFound, subRespHeaderEndFound, subRespFailed, contentId, _i, responseLines_1, responseLine, tokens, tokens;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // When logic reach here, suppose batch request has already succeeded with 202, so we can further parse
                        // sub request's response.
                        if (this.batchResponse._response.status != HTTPURLConnection.HTTP_ACCEPTED) {
                            throw new Error("Invalid state: batch request failed with status: '" + this.batchResponse._response.status + "'.");
                        }
                        return [4 /*yield*/, getBodyAsText(this.batchResponse)];
                    case 1:
                        responseBodyAsText = _a.sent();
                        subResponses = responseBodyAsText
                            .split(this.batchResponseEnding)[0] // string after ending is useless
                            .split(this.perResponsePrefix)
                            .slice(1);
                        subResponseCount = subResponses.length;
                        // Defensive coding in case of potential error parsing.
                        // Note: subResponseCount == 1 is special case where sub request is invalid.
                        // We try to prevent such cases through early validation, e.g. validate sub request count >= 1.
                        // While in unexpected sub request invalid case, we allow sub response to be parsed and return to user.
                        if (subResponseCount != this.subRequests.size && subResponseCount != 1) {
                            throw new Error("Invalid state: sub responses' count is not equal to sub requests' count.");
                        }
                        deserializedSubResponses = new Array(subResponseCount);
                        subResponsesSucceededCount = 0;
                        subResponsesFailedCount = 0;
                        // Parse sub subResponses.
                        for (index = 0; index < subResponseCount; index++) {
                            subResponse = subResponses[index];
                            deserializedSubResponses[index] = {};
                            deserializedSubResponse = deserializedSubResponses[index];
                            deserializedSubResponse.headers = new HttpHeaders();
                            responseLines = subResponse.split("" + HTTP_LINE_ENDING);
                            subRespHeaderStartFound = false;
                            subRespHeaderEndFound = false;
                            subRespFailed = false;
                            contentId = NOT_FOUND;
                            for (_i = 0, responseLines_1 = responseLines; _i < responseLines_1.length; _i++) {
                                responseLine = responseLines_1[_i];
                                if (!subRespHeaderStartFound) {
                                    // Convention line to indicate content ID
                                    if (responseLine.startsWith(HeaderConstants.CONTENT_ID)) {
                                        contentId = parseInt(responseLine.split(HTTP_HEADER_DELIMITER)[1]);
                                    }
                                    // Http version line with status code indicates the start of sub request's response.
                                    // Example: HTTP/1.1 202 Accepted
                                    if (responseLine.startsWith(HTTP_VERSION_1_1)) {
                                        subRespHeaderStartFound = true;
                                        tokens = responseLine.split(SPACE_DELIMITER);
                                        deserializedSubResponse.status = parseInt(tokens[1]);
                                        deserializedSubResponse.statusMessage = tokens.slice(2).join(SPACE_DELIMITER);
                                    }
                                    continue; // Skip convention headers not specifically for sub request i.e. Content-Type: application/http and Content-ID: *
                                }
                                if (responseLine.trim() === "") {
                                    // Sub response's header start line already found, and the first empty line indicates header end line found.
                                    if (!subRespHeaderEndFound) {
                                        subRespHeaderEndFound = true;
                                    }
                                    continue; // Skip empty line
                                }
                                // Note: when code reach here, it indicates subRespHeaderStartFound == true
                                if (!subRespHeaderEndFound) {
                                    if (responseLine.indexOf(HTTP_HEADER_DELIMITER) === -1) {
                                        // Defensive coding to prevent from missing valuable lines.
                                        throw new Error("Invalid state: find non-empty line '" + responseLine + "' without HTTP header delimiter '" + HTTP_HEADER_DELIMITER + "'.");
                                    }
                                    tokens = responseLine.split(HTTP_HEADER_DELIMITER);
                                    deserializedSubResponse.headers.set(tokens[0], tokens[1]);
                                    if (tokens[0] === HeaderConstants.X_MS_ERROR_CODE) {
                                        deserializedSubResponse.errorCode = tokens[1];
                                        subRespFailed = true;
                                    }
                                }
                                else {
                                    // Assemble body of sub response.
                                    if (!deserializedSubResponse.bodyAsText) {
                                        deserializedSubResponse.bodyAsText = "";
                                    }
                                    deserializedSubResponse.bodyAsText += responseLine;
                                }
                            } // Inner for end
                            if (contentId != NOT_FOUND) {
                                deserializedSubResponse._request = this.subRequests.get(contentId);
                            }
                            if (subRespFailed) {
                                subResponsesFailedCount++;
                            }
                            else {
                                subResponsesSucceededCount++;
                            }
                        }
                        return [2 /*return*/, {
                                subResponses: deserializedSubResponses,
                                subResponsesSucceededCount: subResponsesSucceededCount,
                                subResponsesFailedCount: subResponsesFailedCount
                            }];
                }
            });
        });
    };
    return BatchResponseParser;
}());
export { BatchResponseParser };
//# sourceMappingURL=BatchResponseParser.js.map