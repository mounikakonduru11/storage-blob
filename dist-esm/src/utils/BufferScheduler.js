// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import * as tslib_1 from "tslib";
import { EventEmitter } from "events";
/**
 * This class accepts a Node.js Readable stream as input, and keeps reading data
 * from the stream into the internal buffer structure, until it reaches maxBuffers.
 * Every available buffer will try to trigger outgoingHandler.
 *
 * The internal buffer structure includes an incoming buffer array, and a outgoing
 * buffer array. The incoming buffer array includes the "empty" buffers can be filled
 * with new incoming data. The outgoing array includes the filled buffers to be
 * handled by outgoingHandler. Every above buffer size is defined by parameter bufferSize.
 *
 * NUM_OF_ALL_BUFFERS = BUFFERS_IN_INCOMING + BUFFERS_IN_OUTGOING + BUFFERS_UNDER_HANDLING
 *
 * NUM_OF_ALL_BUFFERS <= maxBuffers
 *
 * PERFORMANCE IMPROVEMENT TIPS:
 * 1. Input stream highWaterMark is better to set a same value with bufferSize
 *    parameter, which will avoid Buffer.concat() operations.
 * 2. Parallelism should set a smaller value than maxBuffers, which is helpful to
 *    reduce the possibility when a outgoing handler waits for the stream data.
 *    in this situation, outgoing handlers are blocked.
 *    Outgoing queue shouldn't be empty.
 * @export
 * @class BufferScheduler
 */
var BufferScheduler = /** @class */ (function () {
    /**
     * Creates an instance of BufferScheduler.
     *
     * @param {Readable} readable A Node.js Readable stream
     * @param {number} bufferSize Buffer size of every maintained buffer
     * @param {number} maxBuffers How many buffers can be allocated
     * @param {OutgoingHandler} outgoingHandler An async function scheduled to be
     *                                          triggered when a buffer fully filled
     *                                          with stream data
     * @param {number} parallelism Concurrency of executing outgoingHandlers (>0)
     * @param {string} [encoding] [Optional] Encoding of Readable stream when it's a string stream
     * @memberof BufferScheduler
     */
    function BufferScheduler(readable, bufferSize, maxBuffers, outgoingHandler, parallelism, encoding) {
        /**
         * An internal event emitter.
         *
         * @private
         * @type {EventEmitter}
         * @memberof BufferScheduler
         */
        this.emitter = new EventEmitter();
        /**
         * An internal offset marker to track data offset in bytes of next outgoingHandler.
         *
         * @private
         * @type {number}
         * @memberof BufferScheduler
         */
        this.offset = 0;
        /**
         * An internal marker to track whether stream is end.
         *
         * @private
         * @type {boolean}
         * @memberof BufferScheduler
         */
        this.isStreamEnd = false;
        /**
         * An internal marker to track whether stream or outgoingHandler returns error.
         *
         * @private
         * @type {boolean}
         * @memberof BufferScheduler
         */
        this.isError = false;
        /**
         * How many handlers are executing.
         *
         * @private
         * @type {number}
         * @memberof BufferScheduler
         */
        this.executingOutgoingHandlers = 0;
        /**
         * How many buffers have been allocated.
         *
         * @private
         * @type {number}
         * @memberof BufferScheduler
         */
        this.numBuffers = 0;
        /**
         * Because this class doesn't know how much data every time stream pops, which
         * is defined by highWaterMarker of the stream. So BufferScheduler will cache
         * data received from the stream, when data in unresolvedDataArray exceeds the
         * blockSize defined, it will try to concat a blockSize of buffer, fill into available
         * buffers from incoming and push to outgoing array.
         *
         * @private
         * @type {Buffer[]}
         * @memberof BufferScheduler
         */
        this.unresolvedDataArray = [];
        /**
         * How much data consisted in unresolvedDataArray.
         *
         * @private
         * @type {number}
         * @memberof BufferScheduler
         */
        this.unresolvedLength = 0;
        /**
         * The array includes all the available buffers can be used to fill data from stream.
         *
         * @private
         * @type {Buffer[]}
         * @memberof BufferScheduler
         */
        this.incoming = [];
        /**
         * The array (queue) includes all the buffers filled from stream data.
         *
         * @private
         * @type {Buffer[]}
         * @memberof BufferScheduler
         */
        this.outgoing = [];
        if (bufferSize <= 0) {
            throw new RangeError("bufferSize must be larger than 0, current is " + bufferSize);
        }
        if (maxBuffers <= 0) {
            throw new RangeError("maxBuffers must be larger than 0, current is " + maxBuffers);
        }
        if (parallelism <= 0) {
            throw new RangeError("parallelism must be larger than 0, current is " + parallelism);
        }
        this.bufferSize = bufferSize;
        this.maxBuffers = maxBuffers;
        this.readable = readable;
        this.outgoingHandler = outgoingHandler;
        this.parallelism = parallelism;
        this.encoding = encoding;
    }
    /**
     * Start the scheduler, will return error when stream of any of the outgoingHandlers
     * returns error.
     *
     * @returns {Promise<void>}
     * @memberof BufferScheduler
     */
    BufferScheduler.prototype.do = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this.readable.on("data", function (data) {
                            data = typeof data === "string" ? Buffer.from(data, _this.encoding) : data;
                            _this.appendUnresolvedData(data);
                            if (!_this.resolveData()) {
                                _this.readable.pause();
                            }
                        });
                        _this.readable.on("error", function (err) {
                            _this.emitter.emit("error", err);
                        });
                        _this.readable.on("end", function () {
                            _this.isStreamEnd = true;
                            _this.emitter.emit("checkEnd");
                        });
                        _this.emitter.on("error", function (err) {
                            _this.isError = true;
                            _this.readable.pause();
                            reject(err);
                        });
                        _this.emitter.on("checkEnd", function () {
                            if (_this.outgoing.length > 0) {
                                _this.triggerOutgoingHandlers();
                                return;
                            }
                            if (_this.isStreamEnd && _this.executingOutgoingHandlers === 0) {
                                if (_this.unresolvedLength > 0 && _this.unresolvedLength < _this.bufferSize) {
                                    _this.outgoingHandler(_this.shiftBufferFromUnresolvedDataArray(), _this.offset)
                                        .then(resolve)
                                        .catch(reject);
                                }
                                else if (_this.unresolvedLength >= _this.bufferSize) {
                                    return;
                                }
                                else {
                                    resolve();
                                }
                            }
                        });
                    })];
            });
        });
    };
    /**
     * Insert a new data into unresolved array.
     *
     * @private
     * @param {Buffer} data
     * @memberof BufferScheduler
     */
    BufferScheduler.prototype.appendUnresolvedData = function (data) {
        this.unresolvedDataArray.push(data);
        this.unresolvedLength += data.length;
    };
    /**
     * Try to shift a buffer with size in blockSize. The buffer returned may be less
     * than blockSize when data in unresolvedDataArray is less than bufferSize.
     *
     * @private
     * @returns {Buffer}
     * @memberof BufferScheduler
     */
    BufferScheduler.prototype.shiftBufferFromUnresolvedDataArray = function () {
        if (this.unresolvedLength >= this.bufferSize) {
            if (this.bufferSize === this.unresolvedDataArray[0].length) {
                this.unresolvedLength -= this.bufferSize;
                return this.unresolvedDataArray.shift();
            }
            // Lazy concat because Buffer.concat highly drops performance
            var merged = Buffer.concat(this.unresolvedDataArray, this.unresolvedLength);
            var buffer = merged.slice(0, this.bufferSize);
            merged = merged.slice(this.bufferSize);
            this.unresolvedDataArray = [merged];
            this.unresolvedLength -= buffer.length;
            return buffer;
        }
        else if (this.unresolvedLength > 0) {
            var merged = Buffer.concat(this.unresolvedDataArray, this.unresolvedLength);
            this.unresolvedDataArray = [];
            this.unresolvedLength = 0;
            return merged;
        }
        else {
            return Buffer.allocUnsafe(0);
        }
    };
    /**
     * Resolve data in unresolvedDataArray. For every buffer with size in blockSize
     * shifted, it will try to get (or allocate a buffer) from incoming, and fill it,
     * then push it into outgoing to be handled by outgoing handler.
     *
     * Return false when available buffers in incoming are not enough, else true.
     *
     * @private
     * @returns {boolean} Return false when buffers in incoming are not enough, else true.
     * @memberof BufferScheduler
     */
    BufferScheduler.prototype.resolveData = function () {
        while (this.unresolvedLength >= this.bufferSize) {
            var buffer = void 0;
            if (this.incoming.length > 0) {
                buffer = this.incoming.shift();
            }
            else {
                if (this.numBuffers < this.maxBuffers) {
                    buffer = Buffer.allocUnsafe(this.bufferSize);
                    this.numBuffers++;
                }
                else {
                    // No available buffer, wait for buffer returned
                    return false;
                }
            }
            buffer.fill(this.shiftBufferFromUnresolvedDataArray());
            this.outgoing.push(buffer);
            this.triggerOutgoingHandlers();
        }
        return true;
    };
    /**
     * Try to trigger a outgoing handler for every buffer in outgoing. Stop when
     * parallelism reaches.
     *
     * @private
     * @memberof BufferScheduler
     */
    BufferScheduler.prototype.triggerOutgoingHandlers = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var buffer;
            return tslib_1.__generator(this, function (_a) {
                do {
                    if (this.executingOutgoingHandlers >= this.parallelism) {
                        return [2 /*return*/];
                    }
                    buffer = this.outgoing.shift();
                    if (buffer) {
                        this.triggerOutgoingHandler(buffer);
                    }
                } while (buffer);
                return [2 /*return*/];
            });
        });
    };
    /**
     * Trigger a outgoing handler for a buffer shifted from outgoing.
     *
     * @private
     * @param {Buffer} buffer
     * @returns {Promise<any>}
     * @memberof BufferScheduler
     */
    BufferScheduler.prototype.triggerOutgoingHandler = function (buffer) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var bufferLength, err_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        bufferLength = buffer.length;
                        this.executingOutgoingHandlers++;
                        this.offset += bufferLength;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.outgoingHandler(buffer, this.offset - bufferLength)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        this.emitter.emit("error", err_1);
                        return [2 /*return*/];
                    case 4:
                        this.executingOutgoingHandlers--;
                        this.reuseBuffer(buffer);
                        this.emitter.emit("checkEnd");
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Return buffer used by outgoing handler into incoming.
     *
     * @private
     * @param {Buffer} buffer
     * @memberof BufferScheduler
     */
    BufferScheduler.prototype.reuseBuffer = function (buffer) {
        this.incoming.push(buffer);
        if (!this.isError && this.resolveData() && !this.isStreamEnd) {
            this.readable.resume();
        }
    };
    return BufferScheduler;
}());
export { BufferScheduler };
//# sourceMappingURL=BufferScheduler.js.map