// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import * as tslib_1 from "tslib";
import { BaseRequestPolicy, HttpPipelineLogLevel, RestError } from "@azure/core-http";
import { URLConstants } from "../utils/constants";
import { delay, setURLHost, setURLParameter } from "../utils/utils.common";
/**
 * A factory method used to generated a RetryPolicy factory.
 *
 * @export
 * @param {RetryOptions} retryOptions
 * @returns
 */
export function NewRetryPolicyFactory(retryOptions) {
    return {
        create: function (nextPolicy, options) {
            return new RetryPolicy(nextPolicy, options, retryOptions);
        }
    };
}
/**
 * RetryPolicy types.
 *
 * @export
 * @enum {number}
 */
export var RetryPolicyType;
(function (RetryPolicyType) {
    /**
     * Exponential retry. Retry time delay grows exponentially.
     */
    RetryPolicyType[RetryPolicyType["EXPONENTIAL"] = 0] = "EXPONENTIAL";
    /**
     * Linear retry. Retry time delay grows linearly.
     */
    RetryPolicyType[RetryPolicyType["FIXED"] = 1] = "FIXED";
})(RetryPolicyType || (RetryPolicyType = {}));
// Default values of RetryOptions
var DEFAULT_RETRY_OPTIONS = {
    maxRetryDelayInMs: 120 * 1000,
    maxTries: 4,
    retryDelayInMs: 4 * 1000,
    retryPolicyType: RetryPolicyType.EXPONENTIAL,
    secondaryHost: "",
    tryTimeoutInMs: undefined // Use server side default timeout strategy
};
var RETRY_ABORT_ERROR = new RestError("The request was aborted", RestError.REQUEST_ABORTED_ERROR);
/**
 * Retry policy with exponential retry and linear retry implemented.
 *
 * @class RetryPolicy
 * @extends {BaseRequestPolicy}
 */
var RetryPolicy = /** @class */ (function (_super) {
    tslib_1.__extends(RetryPolicy, _super);
    /**
     * Creates an instance of RetryPolicy.
     *
     * @param {RequestPolicy} nextPolicy
     * @param {RequestPolicyOptions} options
     * @param {RetryOptions} [retryOptions=DEFAULT_RETRY_OPTIONS]
     * @memberof RetryPolicy
     */
    function RetryPolicy(nextPolicy, options, retryOptions) {
        if (retryOptions === void 0) { retryOptions = DEFAULT_RETRY_OPTIONS; }
        var _this = _super.call(this, nextPolicy, options) || this;
        // Initialize retry options
        _this.retryOptions = {
            retryPolicyType: retryOptions.retryPolicyType
                ? retryOptions.retryPolicyType
                : DEFAULT_RETRY_OPTIONS.retryPolicyType,
            maxTries: retryOptions.maxTries && retryOptions.maxTries >= 1
                ? Math.floor(retryOptions.maxTries)
                : DEFAULT_RETRY_OPTIONS.maxTries,
            tryTimeoutInMs: retryOptions.tryTimeoutInMs && retryOptions.tryTimeoutInMs >= 0
                ? retryOptions.tryTimeoutInMs
                : DEFAULT_RETRY_OPTIONS.tryTimeoutInMs,
            retryDelayInMs: retryOptions.retryDelayInMs && retryOptions.retryDelayInMs >= 0
                ? Math.min(retryOptions.retryDelayInMs, retryOptions.maxRetryDelayInMs
                    ? retryOptions.maxRetryDelayInMs
                    : DEFAULT_RETRY_OPTIONS.maxRetryDelayInMs)
                : DEFAULT_RETRY_OPTIONS.retryDelayInMs,
            maxRetryDelayInMs: retryOptions.maxRetryDelayInMs && retryOptions.maxRetryDelayInMs >= 0
                ? retryOptions.maxRetryDelayInMs
                : DEFAULT_RETRY_OPTIONS.maxRetryDelayInMs,
            secondaryHost: retryOptions.secondaryHost
                ? retryOptions.secondaryHost
                : DEFAULT_RETRY_OPTIONS.secondaryHost
        };
        return _this;
    }
    /**
     * Sends request.
     *
     * @param {WebResource} request
     * @returns {Promise<HttpOperationResponse>}
     * @memberof RetryPolicy
     */
    RetryPolicy.prototype.sendRequest = function (request) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.attemptSendRequest(request, false, 1)];
            });
        });
    };
    /**
     * Decide and perform next retry. Won't mutate request parameter.
     *
     * @protected
     * @param {WebResource} request
     * @param {HttpOperationResponse} response
     * @param {boolean} secondaryHas404  If attempt was against the secondary & it returned a StatusNotFound (404), then
     *                                   the resource was not found. This may be due to replication delay. So, in this
     *                                   case, we'll never try the secondary again for this operation.
     * @param {number} attempt           How many retries has been attempted to performed, starting from 1, which includes
     *                                   the attempt will be performed by this method call.
     * @returns {Promise<HttpOperationResponse>}
     * @memberof RetryPolicy
     */
    RetryPolicy.prototype.attemptSendRequest = function (request, secondaryHas404, attempt) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var newRequest, isPrimaryRetry, response, err_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        newRequest = request.clone();
                        isPrimaryRetry = secondaryHas404 ||
                            !this.retryOptions.secondaryHost ||
                            !(request.method === "GET" || request.method === "HEAD" || request.method === "OPTIONS") ||
                            attempt % 2 === 1;
                        if (!isPrimaryRetry) {
                            newRequest.url = setURLHost(newRequest.url, this.retryOptions.secondaryHost);
                        }
                        // Set the server-side timeout query parameter "timeout=[seconds]"
                        if (this.retryOptions.tryTimeoutInMs) {
                            newRequest.url = setURLParameter(newRequest.url, URLConstants.Parameters.TIMEOUT, Math.floor(this.retryOptions.tryTimeoutInMs / 1000).toString());
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        this.logf(HttpPipelineLogLevel.INFO, "RetryPolicy: =====> Try=" + attempt + " " + (isPrimaryRetry ? "Primary" : "Secondary"));
                        return [4 /*yield*/, this._nextPolicy.sendRequest(newRequest)];
                    case 2:
                        response = _a.sent();
                        if (!this.shouldRetry(isPrimaryRetry, attempt, response)) {
                            return [2 /*return*/, response];
                        }
                        secondaryHas404 = secondaryHas404 || (!isPrimaryRetry && response.status === 404);
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        this.logf(HttpPipelineLogLevel.ERROR, "RetryPolicy: Caught error, message: " + err_1.message + ", code: " + err_1.code);
                        if (!this.shouldRetry(isPrimaryRetry, attempt, response, err_1)) {
                            throw err_1;
                        }
                        return [3 /*break*/, 4];
                    case 4: return [4 /*yield*/, this.delay(isPrimaryRetry, attempt, request.abortSignal)];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, this.attemptSendRequest(request, secondaryHas404, ++attempt)];
                    case 6: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Decide whether to retry according to last HTTP response and retry counters.
     *
     * @protected
     * @param {boolean} isPrimaryRetry
     * @param {number} attempt
     * @param {HttpOperationResponse} [response]
     * @param {RestError} [err]
     * @returns {boolean}
     * @memberof RetryPolicy
     */
    RetryPolicy.prototype.shouldRetry = function (isPrimaryRetry, attempt, response, err) {
        if (attempt >= this.retryOptions.maxTries) {
            this.logf(HttpPipelineLogLevel.INFO, "RetryPolicy: Attempt(s) " + attempt + " >= maxTries " + this.retryOptions
                .maxTries + ", no further try.");
            return false;
        }
        // Handle network failures, you may need to customize the list when you implement
        // your own http client
        var retriableErrors = [
            "ETIMEDOUT",
            "ESOCKETTIMEDOUT",
            "ECONNREFUSED",
            "ECONNRESET",
            "ENOENT",
            "ENOTFOUND",
            "TIMEOUT",
            "REQUEST_SEND_ERROR" // For default xhr based http client provided in ms-rest-js
        ];
        if (err) {
            for (var _i = 0, retriableErrors_1 = retriableErrors; _i < retriableErrors_1.length; _i++) {
                var retriableError = retriableErrors_1[_i];
                if (err.name.toUpperCase().includes(retriableError) ||
                    err.message.toUpperCase().includes(retriableError) ||
                    (err.code && err.code.toString().toUpperCase().includes(retriableError))) {
                    this.logf(HttpPipelineLogLevel.INFO, "RetryPolicy: Network error " + retriableError + " found, will retry.");
                    return true;
                }
            }
        }
        // If attempt was against the secondary & it returned a StatusNotFound (404), then
        // the resource was not found. This may be due to replication delay. So, in this
        // case, we'll never try the secondary again for this operation.
        if (response || err) {
            var statusCode = response ? response.status : err ? err.statusCode : 0;
            if (!isPrimaryRetry && statusCode === 404) {
                this.logf(HttpPipelineLogLevel.INFO, "RetryPolicy: Secondary access with 404, will retry.");
                return true;
            }
            // Server internal error or server timeout
            if (statusCode === 503 || statusCode === 500) {
                this.logf(HttpPipelineLogLevel.INFO, "RetryPolicy: Will retry for status code " + statusCode + ".");
                return true;
            }
        }
        return false;
    };
    /**
     * This is to log for debugging purposes only.
     * Comment/uncomment as necessary for releasing/debugging.
     *
     * @private
     * @param {HttpPipelineLogLevel} level
     * @param {string} message
     * @memberof RetryPolicy
     */
    // tslint:disable-next-line:variable-name
    RetryPolicy.prototype.logf = function (_level, _message) {
        // this.log(_level, _message);
    };
    /**
     * Delay a calculated time between retries.
     *
     * @private
     * @param {boolean} isPrimaryRetry
     * @param {number} attempt
     * @param {AbortSignalLike} [abortSignal]
     * @returns
     * @memberof RetryPolicy
     */
    RetryPolicy.prototype.delay = function (isPrimaryRetry, attempt, abortSignal) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var delayTimeInMs;
            return tslib_1.__generator(this, function (_a) {
                delayTimeInMs = 0;
                if (isPrimaryRetry) {
                    switch (this.retryOptions.retryPolicyType) {
                        case RetryPolicyType.EXPONENTIAL:
                            delayTimeInMs = Math.min((Math.pow(2, attempt - 1) - 1) * this.retryOptions.retryDelayInMs, this.retryOptions.maxRetryDelayInMs);
                            break;
                        case RetryPolicyType.FIXED:
                            delayTimeInMs = this.retryOptions.retryDelayInMs;
                            break;
                    }
                }
                else {
                    delayTimeInMs = Math.random() * 1000;
                }
                this.logf(HttpPipelineLogLevel.INFO, "RetryPolicy: Delay for " + delayTimeInMs + "ms");
                return [2 /*return*/, delay(delayTimeInMs, abortSignal, RETRY_ABORT_ERROR)];
            });
        });
    };
    return RetryPolicy;
}(BaseRequestPolicy));
export { RetryPolicy };
//# sourceMappingURL=RetryPolicy.js.map