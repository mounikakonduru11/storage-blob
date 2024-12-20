/**
 * Allowed IP range for a SAS.
 *
 * @export
 * @interface IPRange
 */
export interface IPRange {
    /**
     * Starting IP address in the IP range.
     * If end IP doesn't provide, start IP will the only IP allowed.
     *
     * @type {string}
     * @memberof IPRange
     */
    start: string;
    /**
     * Optional. IP address that ends the IP range.
     * If not provided, start IP will the only IP allowed.
     *
     * @type {string}
     * @memberof IPRange
     */
    end?: string;
}
/**
 * Generate IPRange format string. For example:
 *
 * "8.8.8.8" or "1.1.1.1-255.255.255.255"
 *
 * @export
 * @param {IPRange} ipRange
 * @returns {string}
 */
export declare function ipRangeToString(ipRange: IPRange): string;
//# sourceMappingURL=IPRange.d.ts.map