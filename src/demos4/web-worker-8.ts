export {};

const worker: Worker = new Worker("/message-channel/worker3.js");
// 创建 32 位缓冲区
const arrayBuffer = new ArrayBuffer(32);
console.log(`page buffer size: ${arrayBuffer.byteLength}`);
// page buffer size: 32

worker.postMessage(arrayBuffer, [arrayBuffer]);

// 如果把 ArrayBufferSize 指定为可转移对象, 那么对缓冲区内存的引用就会从父上下文中抹去, 然后分配给工作者线程
console.log(`page buffer size: ${arrayBuffer.byteLength}`);
// page buffer size: 0

// worker's buffer size is: 32
