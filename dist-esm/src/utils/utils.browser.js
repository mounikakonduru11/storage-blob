// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import * as tslib_1 from "tslib";
/**
 * Convert a Browser Blob object into ArrayBuffer.
 *
 * @export
 * @param {Blob} blob
 * @returns {Promise<ArrayBuffer>}
 */
export function blobToArrayBuffer(blob) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var fileReader;
        return tslib_1.__generator(this, function (_a) {
            fileReader = new FileReader();
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    fileReader.onloadend = function (ev) {
                        resolve(ev.target.result);
                    };
                    fileReader.onerror = reject;
                    fileReader.readAsArrayBuffer(blob);
                })];
        });
    });
}
/**
 * Convert a Browser Blob object into string.
 *
 * @export
 * @param {Blob} blob
 * @returns {Promise<ArrayBuffer>}
 */
export function blobToString(blob) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var fileReader;
        return tslib_1.__generator(this, function (_a) {
            fileReader = new FileReader();
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    fileReader.onloadend = function (ev) {
                        resolve(ev.target.result);
                    };
                    fileReader.onerror = reject;
                    fileReader.readAsText(blob);
                })];
        });
    });
}
//# sourceMappingURL=utils.browser.js.map