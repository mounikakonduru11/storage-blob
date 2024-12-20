import { BaseRequestPolicy, HttpOperationResponse, RequestPolicy, RequestPolicyOptions, WebResource } from "@azure/core-http";
/**
 * TelemetryPolicy is a policy used to tag user-agent header for every requests.
 *
 * @class TelemetryPolicy
 * @extends {BaseRequestPolicy}
 */
export declare class TelemetryPolicy extends BaseRequestPolicy {
    /**
     * Telemetry string.
     *
     * @type {string}
     * @memberof TelemetryPolicy
     */
    readonly telemetry: string;
    /**
     * Creates an instance of TelemetryPolicy.
     * @param {RequestPolicy} nextPolicy
     * @param {RequestPolicyOptions} options
     * @param {TelemetryOptions} [telemetry]
     * @memberof TelemetryPolicy
     */
    constructor(nextPolicy: RequestPolicy, options: RequestPolicyOptions, telemetry: string);
    /**
     * Sends out request.
     *
     * @param {WebResource} request
     * @returns {Promise<HttpOperationResponse>}
     * @memberof TelemetryPolicy
     */
    sendRequest(request: WebResource): Promise<HttpOperationResponse>;
}
//# sourceMappingURL=TelemetryPolicy.d.ts.map