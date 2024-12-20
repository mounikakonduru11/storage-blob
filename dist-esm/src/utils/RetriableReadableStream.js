// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import * as tslib_1 from "tslib";
import { RestError } from "@azure/core-http";
import { Readable } from "stream";
import { AbortSignal } from "@azure/abort-controller";
var ABORT_ERROR = new RestError("The request was aborted", RestError.REQUEST_ABORTED_ERROR);
/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * A Node.js ReadableStream will internally retry when internal ReadableStream unexpected ends.
 *
 * @class RetriableReadableStream
 * @extends {Readable}
 */
var RetriableReadableStream = /** @class */ (function (_super) {
    tslib_1.__extends(RetriableReadableStream, _super);
    /**
     * Creates an instance of RetriableReadableStream.
     *
     * @param {NodeJS.ReadableStream} source The current ReadableStream returned from getter
     * @param {ReadableStreamGetter} getter A method calling downloading request returning
     *                                      a new ReadableStream from specified offset
     * @param {number} offset Offset position in original data source to read
     * @param {number} count How much data in original data source to read
     * @param {RetriableReadableStreamOptions} [options={}]
     * @memberof RetriableReadableStream
     */
    function RetriableReadableStream(source, getter, offset, count, options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this) || this;
        _this.retries = 0;
        _this.abortHandler = function () {
            _this.source.pause();
            _this.emit("error", ABORT_ERROR);
        };
        _this.aborter = options.abortSignal || AbortSignal.none;
        _this.getter = getter;
        _this.source = source;
        _this.start = offset;
        _this.offset = offset;
        _this.end = offset + count - 1;
        _this.maxRetryRequests =
            options.maxRetryRequests && options.maxRetryRequests >= 0 ? options.maxRetryRequests : 0;
        _this.progress = options.progress;
        _this.options = options;
        _this.aborter.addEventListener("abort", _this.abortHandler);
        _this.setSourceDataHandler();
        _this.setSourceEndHandler();
        _this.setSourceErrorHandler();
        return _this;
    }
    RetriableReadableStream.prototype._read = function () {
        if (!this.aborter.aborted) {
            this.source.resume();
        }
    };
    RetriableReadableStream.prototype.setSourceDataHandler = function () {
        var _this = this;
        this.source.on("data", function (data) {
            if (_this.options.doInjectErrorOnce) {
                _this.options.doInjectErrorOnce = undefined;
                _this.source.pause();
                _this.source.removeAllListeners("data");
                _this.source.emit("end");
                return;
            }
            // console.log(
            //   `Offset: ${this.offset}, Received ${data.length} from internal stream`
            // );
            _this.offset += data.length;
            if (_this.progress) {
                _this.progress({ loadedBytes: _this.offset - _this.start });
            }
            if (!_this.push(data)) {
                _this.source.pause();
            }
        });
    };
    RetriableReadableStream.prototype.setSourceEndHandler = function () {
        var _this = this;
        this.source.on("end", function () {
            // console.log(
            //   `Source stream emits end, offset: ${
            //     this.offset
            //   }, dest end : ${this.end}`
            // );
            if (_this.offset - 1 === _this.end) {
                _this.aborter.removeEventListener("abort", _this.abortHandler);
                _this.push(null);
            }
            else if (_this.offset <= _this.end) {
                // console.log(
                //   `retries: ${this.retries}, max retries: ${this.maxRetries}`
                // );
                if (_this.retries < _this.maxRetryRequests) {
                    _this.retries += 1;
                    _this.getter(_this.offset)
                        .then(function (newSource) {
                        _this.source = newSource;
                        _this.setSourceDataHandler();
                        _this.setSourceEndHandler();
                        _this.setSourceErrorHandler();
                    })
                        .catch(function (error) {
                        _this.emit("error", error);
                    });
                }
                else {
                    _this.emit("error", new Error(
                    // tslint:disable-next-line:max-line-length
                    "Data corruption failure: received less data than required and reached maxRetires limitation. Received data offset: " + (_this
                        .offset - 1) + ", data needed offset: " + _this.end + ", retries: " + _this.retries + ", max retries: " + _this.maxRetryRequests));
                }
            }
            else {
                _this.emit("error", new Error("Data corruption failure: Received more data than original request, data needed offset is " + _this.end + ", received offset: " + (_this.offset - 1)));
            }
        });
    };
    RetriableReadableStream.prototype.setSourceErrorHandler = function () {
        var _this = this;
        this.source.on("error", function (error) {
            _this.emit("error", error);
        });
    };
    return RetriableReadableStream;
}(Readable));
export { RetriableReadableStream };
//# sourceMappingURL=RetriableReadableStream.js.map