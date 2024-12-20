import * as Models from "./generated/src/models";
export interface Metadata {
    [propertyName: string]: string;
}
export interface ContainerAccessConditions {
    modifiedAccessConditions?: Models.ModifiedAccessConditions;
    leaseAccessConditions?: Models.LeaseAccessConditions;
}
export interface BlobAccessConditions {
    modifiedAccessConditions?: Models.ModifiedAccessConditions;
    leaseAccessConditions?: Models.LeaseAccessConditions;
}
export interface PageBlobAccessConditions extends BlobAccessConditions {
    sequenceNumberAccessConditions?: Models.SequenceNumberAccessConditions;
}
export interface AppendBlobAccessConditions extends BlobAccessConditions {
    appendPositionAccessConditions?: Models.AppendPositionAccessConditions;
}
export declare enum BlockBlobTier {
    Hot = "Hot",
    Cool = "Cool",
    Archive = "Archive"
}
export declare enum PremiumPageBlobTier {
    P4 = "P4",
    P6 = "P6",
    P10 = "P10",
    P15 = "P15",
    P20 = "P20",
    P30 = "P30",
    P40 = "P40",
    P50 = "P50",
    P60 = "P60",
    P70 = "P70",
    P80 = "P80"
}
export declare function toAccessTier(tier: BlockBlobTier | PremiumPageBlobTier | string | undefined): Models.AccessTier | undefined;
export declare function ensureCpkIfSpecified(cpk: Models.CpkInfo | undefined, isHttps: boolean): void;
//# sourceMappingURL=models.d.ts.map