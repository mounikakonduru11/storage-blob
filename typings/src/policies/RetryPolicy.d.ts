import { BaseRequestPolicy, HttpOperationResponse, RequestPolicy, RequestPolicyFactory, RequestPolicyOptions, RestError, WebResource } from "@azure/core-http";
import { RetryOptions } from "../RetryPolicyFactory";
/**
 * A factory method used to generated a RetryPolicy factory.
 *
 * @export
 * @param {RetryOptions} retryOptions
 * @returns
 */
export declare function NewRetryPolicyFactory(retryOptions?: RetryOptions): RequestPolicyFactory;
/**
 * RetryPolicy types.
 *
 * @export
 * @enum {number}
 */
export declare enum RetryPolicyType {
    /**
     * Exponential retry. Retry time delay grows exponentially.
     */
    EXPONENTIAL = 0,
    /**
     * Linear retry. Retry time delay grows linearly.
     */
    FIXED = 1
}
/**
 * Retry policy with exponential retry and linear retry implemented.
 *
 * @class RetryPolicy
 * @extends {BaseRequestPolicy}
 */
export declare class RetryPolicy extends BaseRequestPolicy {
    /**
     * RetryOptions.
     *
     * @private
     * @type {RetryOptions}
     * @memberof RetryPolicy
     */
    private readonly retryOptions;
    /**
     * Creates an instance of RetryPolicy.
     *
     * @param {RequestPolicy} nextPolicy
     * @param {RequestPolicyOptions} options
     * @param {RetryOptions} [retryOptions=DEFAULT_RETRY_OPTIONS]
     * @memberof RetryPolicy
     */
    constructor(nextPolicy: RequestPolicy, options: RequestPolicyOptions, retryOptions?: RetryOptions);
    /**
     * Sends request.
     *
     * @param {WebResource} request
     * @returns {Promise<HttpOperationResponse>}
     * @memberof RetryPolicy
     */
    sendRequest(request: WebResource): Promise<HttpOperationResponse>;
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
    protected attemptSendRequest(request: WebResource, secondaryHas404: boolean, attempt: number): Promise<HttpOperationResponse>;
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
    protected shouldRetry(isPrimaryRetry: boolean, attempt: number, response?: HttpOperationResponse, err?: RestError): boolean;
    /**
     * This is to log for debugging purposes only.
     * Comment/uncomment as necessary for releasing/debugging.
     *
     * @private
     * @param {HttpPipelineLogLevel} level
     * @param {string} message
     * @memberof RetryPolicy
     */
    private logf;
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
    private delay;
}
//# sourceMappingURL=RetryPolicy.d.ts.map