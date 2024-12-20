// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { EncryptionAlgorithmAES25 } from "./utils/constants";
export var BlockBlobTier;
(function (BlockBlobTier) {
    BlockBlobTier["Hot"] = "Hot";
    BlockBlobTier["Cool"] = "Cool";
    BlockBlobTier["Archive"] = "Archive";
})(BlockBlobTier || (BlockBlobTier = {}));
export var PremiumPageBlobTier;
(function (PremiumPageBlobTier) {
    PremiumPageBlobTier["P4"] = "P4";
    PremiumPageBlobTier["P6"] = "P6";
    PremiumPageBlobTier["P10"] = "P10";
    PremiumPageBlobTier["P15"] = "P15";
    PremiumPageBlobTier["P20"] = "P20";
    PremiumPageBlobTier["P30"] = "P30";
    PremiumPageBlobTier["P40"] = "P40";
    PremiumPageBlobTier["P50"] = "P50";
    PremiumPageBlobTier["P60"] = "P60";
    PremiumPageBlobTier["P70"] = "P70";
    PremiumPageBlobTier["P80"] = "P80";
})(PremiumPageBlobTier || (PremiumPageBlobTier = {}));
export function toAccessTier(tier) {
    if (tier == undefined) {
        return undefined;
    }
    return tier; // No more check if string is a valid AccessTier, and left this to underlay logic to decide(service).
}
export function ensureCpkIfSpecified(cpk, isHttps) {
    if (cpk && !isHttps) {
        throw new RangeError("Customer-provided encryption key must be used over HTTPS.");
    }
    if (cpk && !cpk.encryptionAlgorithm) {
        cpk.encryptionAlgorithm = EncryptionAlgorithmAES25;
    }
}
//# sourceMappingURL=models.js.map