// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import * as tslib_1 from "tslib";
import { BaseRequestPolicy, HttpPipelineLogLevel, RestError } from "@azure/core-http";
import { HTTPURLConnection } from "../utils/constants";
import { sanitizeHeaders, sanitizeURL } from "../utils/utils.common";
// Default values of RetryOptions
var DEFAULT_REQUEST_LOG_OPTIONS = {
    logWarningIfTryOverThreshold: 3000
};
/**
 * LoggingPolicy is a policy used to log requests.
 *
 * @class LoggingPolicy
 * @extends {BaseRequestPolicy}
 */
var LoggingPolicy = /** @class */ (function (_super) {
    tslib_1.__extends(LoggingPolicy, _super);
    /**
     * Creates an instance of LoggingPolicy.
     * @param {RequestPolicy} nextPolicy
     * @param {RequestPolicyOptions} options
     * @param {RequestLogOptions} [loggingOptions=DEFAULT_REQUEST_LOG_OPTIONS]
     * @memberof LoggingPolicy
     */
    function LoggingPolicy(nextPolicy, options, loggingOptions) {
        if (loggingOptions === void 0) { loggingOptions = DEFAULT_REQUEST_LOG_OPTIONS; }
        var _this = _super.call(this, nextPolicy, options) || this;
        _this.tryCount = 0;
        _this.operationStartTime = new Date();
        _this.requestStartTime = new Date();
        _this.loggingOptions = loggingOptions;
        return _this;
    }
    /**
     * Sends out request.
     *
     * @param {WebResource} request
     * @returns {Promise<HttpOperationResponse>}
     * @memberof LoggingPolicy
     */
    LoggingPolicy.prototype.sendRequest = function (request) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var response, requestEndTime, requestCompletionTime, operationDuration, currentLevel, logMessage, errorString, messageInfo, err_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.tryCount++;
                        this.requestStartTime = new Date();
                        if (this.tryCount === 1) {
                            this.operationStartTime = this.requestStartTime;
                        }
                        this.log(HttpPipelineLogLevel.INFO, "==> OUTGOING REQUEST (Try number=" + this.tryCount + "):");
                        this.log(HttpPipelineLogLevel.INFO, "  " + request.method + ": " + sanitizeURL(request.url));
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this._nextPolicy.sendRequest(request)];
                    case 2:
                        response = _a.sent();
                        requestEndTime = new Date();
                        requestCompletionTime = requestEndTime.getTime() - this.requestStartTime.getTime();
                        operationDuration = requestEndTime.getTime() - this.operationStartTime.getTime();
                        currentLevel = HttpPipelineLogLevel.INFO;
                        logMessage = "";
                        if (this.shouldLog(HttpPipelineLogLevel.INFO)) {
                            // Assume success and default to informational logging.
                            logMessage = "Successfully Received Response. ";
                        }
                        // If the response took too long, we'll upgrade to warning.
                        if (requestCompletionTime >= this.loggingOptions.logWarningIfTryOverThreshold) {
                            // Log a warning if the try duration exceeded the specified threshold.
                            if (this.shouldLog(HttpPipelineLogLevel.WARNING)) {
                                currentLevel = HttpPipelineLogLevel.WARNING;
                                logMessage = "SLOW OPERATION. Duration > " + this.loggingOptions.logWarningIfTryOverThreshold + " ms. ";
                            }
                        }
                        if ((response.status >= 400 &&
                            response.status <= 499 &&
                            (response.status !== HTTPURLConnection.HTTP_NOT_FOUND &&
                                response.status !== HTTPURLConnection.HTTP_CONFLICT &&
                                response.status !== HTTPURLConnection.HTTP_PRECON_FAILED &&
                                response.status !== HTTPURLConnection.HTTP_RANGE_NOT_SATISFIABLE)) ||
                            (response.status >= 500 && response.status <= 509)) {
                            errorString = "REQUEST ERROR: HTTP request failed with status code: " + response.status + ". ";
                            logMessage = errorString;
                            currentLevel = HttpPipelineLogLevel.ERROR;
                        }
                        messageInfo = "Request try:" + this.tryCount + ", status:" + response.status + " request duration:" + requestCompletionTime + " ms, operation duration:" + operationDuration + " ms\n";
                        this.log(currentLevel, logMessage + messageInfo);
                        this.log(HttpPipelineLogLevel.INFO, "  request headers: " + JSON.stringify(sanitizeHeaders(response.request.headers), null, 2));
                        this.log(HttpPipelineLogLevel.INFO, "  response headers: " + JSON.stringify(sanitizeHeaders(response.headers), null, 2));
                        return [2 /*return*/, response];
                    case 3:
                        err_1 = _a.sent();
                        if (err_1 instanceof RestError && err_1.request) {
                            this.log(HttpPipelineLogLevel.INFO, "  request headers: " + JSON.stringify(sanitizeHeaders(err_1.request.headers), null, 2));
                        }
                        this.log(HttpPipelineLogLevel.ERROR, "Unexpected failure attempting to make request. Error message: " + err_1.message);
                        throw err_1;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return LoggingPolicy;
}(BaseRequestPolicy));
export { LoggingPolicy };
//# sourceMappingURL=LoggingPolicy.js.map