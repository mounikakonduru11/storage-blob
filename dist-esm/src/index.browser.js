// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { RestError } from "@azure/core-http";
import * as Models from "./generated/src/models";
export * from "./BlobServiceClient";
export * from "./ContainerClient";
// ordering of these clients is important as there are circular dependencies
export * from "./BlobClient";
export * from "./AppendBlobClient";
export * from "./BlockBlobClient";
export * from "./PageBlobClient";
export * from "./BatchRequest";
export * from "./BrowserPolicyFactory";
export * from "./credentials/AnonymousCredential";
export * from "./credentials/Credential";
export * from "./LeaseClient";
export { BlockBlobTier, PremiumPageBlobTier } from "./models";
export * from "./Pipeline";
export * from "./policies/AnonymousCredentialPolicy";
export * from "./policies/CredentialPolicy";
export * from "./RetryPolicyFactory";
export * from "./LoggingPolicyFactory";
export * from "./TelemetryPolicyFactory";
export * from "./UniqueRequestIDPolicyFactory";
export { Models, RestError };
//# sourceMappingURL=index.browser.js.map