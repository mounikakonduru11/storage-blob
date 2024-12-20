// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import * as tslib_1 from "tslib";
// In browser, during webpack or browserify bundling, this module will be replaced by 'events'
// https://github.com/Gozala/events
import { EventEmitter } from "events";
/**
 * States for Batch.
 *
 * @enum {number}
 */
var BatchStates;
(function (BatchStates) {
    BatchStates[BatchStates["Good"] = 0] = "Good";
    BatchStates[BatchStates["Error"] = 1] = "Error";
})(BatchStates || (BatchStates = {}));
/**
 * Batch provides basic parallel execution with concurrency limits.
 * Will stop execute left operations when one of the executed operation throws an error.
 * But Batch cannot cancel ongoing operations, you need to cancel them by yourself.
 *
 * @export
 * @class Batch
 */
var Batch = /** @class */ (function () {
    /**
     * Creates an instance of Batch.
     * @param {number} [concurrency=5]
     * @memberof Batch
     */
    function Batch(concurrency) {
        if (concurrency === void 0) { concurrency = 5; }
        /**
         * Number of active operations under execution.
         *
         * @private
         * @type {number}
         * @memberof Batch
         */
        this.actives = 0;
        /**
         * Number of completed operations under execution.
         *
         * @private
         * @type {number}
         * @memberof Batch
         */
        this.completed = 0;
        /**
         * Offset of next operation to be executed.
         *
         * @private
         * @type {number}
         * @memberof Batch
         */
        this.offset = 0;
        /**
         * Operation array to be executed.
         *
         * @private
         * @type {Operation[]}
         * @memberof Batch
         */
        this.operations = [];
        /**
         * States of Batch. When an error happens, state will turn into error.
         * Batch will stop execute left operations.
         *
         * @private
         * @type {BatchStates}
         * @memberof Batch
         */
        this.state = BatchStates.Good;
        if (concurrency < 1) {
            throw new RangeError("concurrency must be larger than 0");
        }
        this.concurrency = concurrency;
        this.emitter = new EventEmitter();
    }
    /**
     * Add a operation into queue.
     *
     * @param {Operation} operation
     * @memberof Batch
     */
    Batch.prototype.addOperation = function (operation) {
        var _this = this;
        this.operations.push(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.actives++;
                        return [4 /*yield*/, operation()];
                    case 1:
                        _a.sent();
                        this.actives--;
                        this.completed++;
                        this.parallelExecute();
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        this.emitter.emit("error", error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    /**
     * Start execute operations in the queue.
     *
     * @returns {Promise<void>}
     * @memberof Batch
     */
    Batch.prototype.do = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                this.parallelExecute();
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this.emitter.on("finish", resolve);
                        _this.emitter.on("error", function (error) {
                            _this.state = BatchStates.Error;
                            reject(error);
                        });
                    })];
            });
        });
    };
    /**
     * Get next operation to be executed. Return null when reaching ends.
     *
     * @private
     * @returns {(Operation | null)}
     * @memberof Batch
     */
    Batch.prototype.nextOperation = function () {
        if (this.offset < this.operations.length) {
            return this.operations[this.offset++];
        }
        return null;
    };
    /**
     * Start execute operations. One one the most important difference between
     * this method with do() is that do() wraps as an sync method.
     *
     * @private
     * @returns {void}
     * @memberof Batch
     */
    Batch.prototype.parallelExecute = function () {
        if (this.state === BatchStates.Error) {
            return;
        }
        if (this.completed >= this.operations.length) {
            this.emitter.emit("finish");
            return;
        }
        while (this.actives < this.concurrency) {
            var operation = this.nextOperation();
            if (operation) {
                operation();
            }
            else {
                return;
            }
        }
    };
    return Batch;
}());
export { Batch };
//# sourceMappingURL=Batch.js.map