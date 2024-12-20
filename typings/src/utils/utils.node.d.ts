/// <reference types="node" />
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
export declare function streamToBuffer(stream: NodeJS.ReadableStream, buffer: Buffer, offset: number, end: number, encoding?: string): Promise<void>;
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
export declare function streamToBuffer2(stream: NodeJS.ReadableStream, buffer: Buffer, encoding?: string): Promise<number>;
//# sourceMappingURL=utils.node.d.ts.map