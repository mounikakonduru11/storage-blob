// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import * as tslib_1 from "tslib";
/**
 * Reads a readable stream into buffer. Fill the buffer from offset to end.
 *
 * @export
 * @param {NodeJS.ReadableStream} stream A Node.js Readable stream
 * @param {Buffer} buffer Buffer to be filled, length must >= offset
 * @param {number} offset From which position in the buffer to be filled, inclusive
 * @param {number} end To which position in the buffer to be filled, exclusive
 * @param {string} [encoding] Encoding of the Readable stream
 * @returns {Promise<void>}
 */
export function streamToBuffer(stream, buffer, offset, end, encoding) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var pos, count;
        return tslib_1.__generator(this, function (_a) {
            pos = 0;
            count = end - offset;
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    stream.on("readable", function () {
                        if (pos >= count) {
                            resolve();
                            return;
                        }
                        var chunk = stream.read();
                        if (!chunk) {
                            return;
                        }
                        if (typeof chunk === "string") {
                            chunk = Buffer.from(chunk, encoding);
                        }
                        // How much data needed in this chunk
                        var chunkLength = pos + chunk.length > count ? count - pos : chunk.length;
                        buffer.fill(chunk.slice(0, chunkLength), offset + pos, offset + pos + chunkLength);
                        pos += chunkLength;
                    });
                    stream.on("end", function () {
                        if (pos < count) {
                            reject(new Error("Stream drains before getting enough data needed. Data read: " + pos + ", data need: " + count));
                        }
                        resolve();
                    });
                    stream.on("error", reject);
                })];
        });
    });
}
/**
 * Reads a readable stream into buffer entirely.
 *
 * @export
 * @param {NodeJS.ReadableStream} stream A Node.js Readable stream
 * @param {Buffer} buffer Buffer to be filled, length must >= offset
 * @param {string} [encoding] Encoding of the Readable stream
 * @returns {Promise<number>} with the count of bytes read.
 * @throws {RangeError} If buffer size is not big enough.
 */
export function streamToBuffer2(stream, buffer, encoding) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var pos, bufferSize;
        return tslib_1.__generator(this, function (_a) {
            pos = 0;
            bufferSize = buffer.length;
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    stream.on("readable", function () {
                        if (pos >= bufferSize) {
                            reject(new Error("Stream exceeds buffer size. Buffer size: " + bufferSize));
                            return;
                        }
                        var chunk = stream.read();
                        if (!chunk) {
                            return;
                        }
                        if (typeof chunk === "string") {
                            chunk = Buffer.from(chunk, encoding);
                        }
                        // How much data needed in this chunk
                        var chunkLength = pos + chunk.length > bufferSize ? bufferSize - pos : chunk.length;
                        buffer.fill(chunk.slice(0, chunkLength), pos, pos + chunkLength);
                        pos += chunkLength;
                    });
                    stream.on("end", function () {
                        resolve(pos);
                    });
                    stream.on("error", reject);
                })];
        });
    });
}
//# sourceMappingURL=utils.node.js.map