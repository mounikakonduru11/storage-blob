/// <reference types="node" />
import { TransferProgressEvent } from "@azure/core-http";
import { Readable } from "stream";
import { AbortSignalLike } from "@azure/abort-controller";
export declare type ReadableStreamGetter = (offset: number) => Promise<NodeJS.ReadableStream>;
export interface RetriableReadableStreamOptions {
    /**
     * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
     * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
     *
     * @type {AbortSignalLike}
     * @memberof RetriableReadableStreamOptions
     */
    abortSignal?: AbortSignalLike;
    /**
     * Max retry count (>=0), undefined or invalid value means no retry
     *
     * @type {number}
     * @memberof RetriableReadableStreamOptions
     */
    maxRetryRequests?: number;
    /**
     * Read progress event handler
     *
     * @memberof RetriableReadableStreamOptions
     */
    progress?: (progress: TransferProgressEvent) => void;
    /**
     * Debug purpose only. Used to inject an unexpected end to existing internal stream,
     * to test stream retry works well or not.
     *
     * When assign it to true, for next incoming "data" event of internal stream,
     * RetriableReadableStream will try to emit an "end" event to existing internal
     * stream to force it end and start retry from the breaking point.
     * The value will then update to "undefined", once the injection works.
     *
     * @type {boolean}
     * @memberof RetriableReadableStreamOptions
     */
    doInjectErrorOnce?: boolean;
}
/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * A Node.js ReadableStream will internally retry when internal ReadableStream unexpected ends.
 *
 * @class RetriableReadableStream
 * @extends {Readable}
 */
export declare class RetriableReadableStream extends Readable {
    private aborter;
    private start;
    private offset;
    private end;
    private getter;
    private source;
    private retries;
    private maxRetryRequests;
    private progress?;
    private options;
    private abortHandler;
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
    constructor(source: NodeJS.ReadableStream, getter: ReadableStreamGetter, offset: number, count: number, options?: RetriableReadableStreamOptions);
    _read(): void;
    private setSourceDataHandler;
    private setSourceEndHandler;
    private setSourceErrorHandler;
}
//# sourceMappingURL=RetriableReadableStream.d.ts.map