import { BaseRequestPolicy, deserializationPolicy, HttpClient as IHttpClient, HttpHeaders, HttpOperationResponse, HttpPipelineLogger as IHttpPipelineLogger, HttpPipelineLogLevel, HttpRequestBody, RequestPolicy, RequestPolicyFactory, RequestPolicyOptions, ServiceClientOptions, WebResource, TokenCredential, ProxySettings } from "@azure/core-http";
import { KeepAliveOptions } from "./KeepAlivePolicyFactory";
import { RetryOptions } from "./RetryPolicyFactory";
import { TelemetryOptions } from "./TelemetryPolicyFactory";
import { SharedKeyCredential } from "./credentials/SharedKeyCredential";
import { AnonymousCredential } from "./credentials/AnonymousCredential";
export { BaseRequestPolicy, deserializationPolicy, IHttpClient, IHttpPipelineLogger, HttpHeaders, HttpPipelineLogLevel, HttpRequestBody, HttpOperationResponse, WebResource, RequestPolicyFactory, RequestPolicy, RequestPolicyOptions };
/**
 * Option interface for Pipeline constructor.
 *
 * @export
 * @interface PipelineOptions
 */
export interface PipelineOptions {
    /**
     * Optional. Configures the HTTP pipeline logger.
     *
     * @type {IHttpPipelineLogger}
     * @memberof PipelineOptions
     */
    logger?: IHttpPipelineLogger;
    /**
     * Optional. Configures the HTTP client to send requests and receive responses.
     *
     * @type {IHttpClient}
     * @memberof PipelineOptions
     */
    HTTPClient?: IHttpClient;
}
/**
 * A Pipeline class containing HTTP request policies.
 * You can create a default Pipeline by calling newPipeline().
 * Or you can create a Pipeline with your own policies by the constructor of Pipeline.
 * Refer to newPipeline() and provided policies as reference before
 * implementing your customized Pipeline.
 *
 * @export
 * @class Pipeline
 */
export declare class Pipeline {
    /**
     * A list of chained request policy factories.
     *
     * @type {RequestPolicyFactory[]}
     * @memberof Pipeline
     */
    readonly factories: RequestPolicyFactory[];
    /**
     * Configures pipeline logger and HTTP client.
     *
     * @type {PipelineOptions}
     * @memberof Pipeline
     */
    readonly options: PipelineOptions;
    /**
     * Creates an instance of Pipeline. Customize HTTPClient by implementing IHttpClient interface.
     *
     * @param {RequestPolicyFactory[]} factories
     * @param {PipelineOptions} [options={}]
     * @memberof Pipeline
     */
    constructor(factories: RequestPolicyFactory[], options?: PipelineOptions);
    /**
     * Transfer Pipeline object to ServiceClientOptions object which required by
     * ServiceClient constructor.
     *
     * @returns {ServiceClientOptions} The ServiceClientOptions object from this Pipeline.
     * @memberof Pipeline
     */
    toServiceClientOptions(): ServiceClientOptions;
}
/**
 * Option interface for newPipeline() method.
 *
 * @export
 * @interface NewPipelineOptions
 */
export interface NewPipelineOptions {
    proxy?: ProxySettings | string;
    /**
     * Telemetry configures the built-in telemetry policy behavior.
     *
     * @type {TelemetryOptions}
     * @memberof NewPipelineOptions
     */
    telemetry?: TelemetryOptions;
    /**
     * Configures the built-in retry policy behavior.
     *
     * @type {RetryOptions}
     * @memberof NewPipelineOptions
     */
    retryOptions?: RetryOptions;
    /**
     * Keep alive configurations. Default keep-alive is enabled.
     *
     * @type {KeepAliveOptions}
     * @memberof NewPipelineOptions
     */
    keepAliveOptions?: KeepAliveOptions;
    /**
     * Configures the HTTP pipeline logger.
     *
     * @type {IHttpPipelineLogger}
     * @memberof NewPipelineOptions
     */
    logger?: IHttpPipelineLogger;
    /**
     * Configures the HTTP client to send requests and receive responses.
     *
     * @type {IHttpClient}
     * @memberof NewPipelineOptions
     */
    httpClient?: IHttpClient;
}
/**
 * Creates a new Pipeline object with Credential provided.
 *
 * @export
 * @param {SharedKeyCredential | AnonymousCredential | TokenCredential} credential Such as AnonymousCredential, SharedKeyCredential
 *                                                  or a TokenCredential from @azure/identity.
 * @param {NewPipelineOptions} [pipelineOptions] Optional. Options.
 * @returns {Pipeline} A new Pipeline object.
 */
export declare function newPipeline(credential: SharedKeyCredential | AnonymousCredential | TokenCredential, pipelineOptions?: NewPipelineOptions): Pipeline;
//# sourceMappingURL=Pipeline.d.ts.map