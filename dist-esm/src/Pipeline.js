// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { BaseRequestPolicy, deserializationPolicy, HttpHeaders, HttpPipelineLogLevel, RequestPolicyOptions, WebResource, proxyPolicy, getDefaultProxySettings, isNode, isTokenCredential, bearerTokenAuthenticationPolicy } from "@azure/core-http";
import { KeepAlivePolicyFactory } from "./KeepAlivePolicyFactory";
import { BrowserPolicyFactory } from "./BrowserPolicyFactory";
import { LoggingPolicyFactory } from "./LoggingPolicyFactory";
import { RetryPolicyFactory } from "./RetryPolicyFactory";
import { TelemetryPolicyFactory } from "./TelemetryPolicyFactory";
import { UniqueRequestIDPolicyFactory } from "./UniqueRequestIDPolicyFactory";
import { DefaultStorageScope } from "./utils/constants";
// Export following interfaces and types for customers who want to implement their
// own RequestPolicy or HTTPClient
export { BaseRequestPolicy, deserializationPolicy, HttpHeaders, HttpPipelineLogLevel, WebResource, RequestPolicyOptions };
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
var Pipeline = /** @class */ (function () {
    /**
     * Creates an instance of Pipeline. Customize HTTPClient by implementing IHttpClient interface.
     *
     * @param {RequestPolicyFactory[]} factories
     * @param {PipelineOptions} [options={}]
     * @memberof Pipeline
     */
    function Pipeline(factories, options) {
        if (options === void 0) { options = {}; }
        this.factories = factories;
        this.options = options;
    }
    /**
     * Transfer Pipeline object to ServiceClientOptions object which required by
     * ServiceClient constructor.
     *
     * @returns {ServiceClientOptions} The ServiceClientOptions object from this Pipeline.
     * @memberof Pipeline
     */
    Pipeline.prototype.toServiceClientOptions = function () {
        return {
            httpClient: this.options.HTTPClient,
            httpPipelineLogger: this.options.logger,
            requestPolicyFactories: this.factories
        };
    };
    return Pipeline;
}());
export { Pipeline };
/**
 * Creates a new Pipeline object with Credential provided.
 *
 * @export
 * @param {SharedKeyCredential | AnonymousCredential | TokenCredential} credential Such as AnonymousCredential, SharedKeyCredential
 *                                                  or a TokenCredential from @azure/identity.
 * @param {NewPipelineOptions} [pipelineOptions] Optional. Options.
 * @returns {Pipeline} A new Pipeline object.
 */
export function newPipeline(credential, pipelineOptions) {
    if (pipelineOptions === void 0) { pipelineOptions = {}; }
    // Order is important. Closer to the API at the top & closer to the network at the bottom.
    // The credential's policy factory must appear close to the wire so it can sign any
    // changes made by other factories (like UniqueRequestIDPolicyFactory)
    var factories = [
        new KeepAlivePolicyFactory(pipelineOptions.keepAliveOptions),
        new TelemetryPolicyFactory(pipelineOptions.telemetry),
        new UniqueRequestIDPolicyFactory(),
        new BrowserPolicyFactory(),
        deserializationPolicy(),
        new RetryPolicyFactory(pipelineOptions.retryOptions),
        new LoggingPolicyFactory()
    ];
    if (isNode) {
        // ProxyPolicy is only avaiable in Node.js runtime, not in browsers
        var proxySettings = void 0;
        if (typeof pipelineOptions.proxy === "string") {
            proxySettings = getDefaultProxySettings(pipelineOptions.proxy);
        }
        else {
            proxySettings = pipelineOptions.proxy;
        }
        factories.push(proxyPolicy(proxySettings));
    }
    factories.push(isTokenCredential(credential)
        ? bearerTokenAuthenticationPolicy(credential, DefaultStorageScope)
        : credential);
    return new Pipeline(factories, {
        HTTPClient: pipelineOptions.httpClient,
        logger: pipelineOptions.logger
    });
}
//# sourceMappingURL=Pipeline.js.map