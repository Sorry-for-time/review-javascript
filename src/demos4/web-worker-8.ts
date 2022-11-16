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

// ========================================================================

// PS: 在其它类型的对象在嵌套可转移对象也没问题, 包装对象会被复制, 而嵌套对象会被转移
const arrayBuffer1: ArrayBuffer = new ArrayBuffer(10);
console.log(`arrayBuffer1.byteLength is ${arrayBuffer1.byteLength}`);
// arrayBuffer1.byteLength is 10
const workerScript = `
self.addEventListener("message", ({ data }) => {
  console.log("worker1's buffer size is:", data.foo.bar.byteLength);
});
`;
const worker1: Worker = new Worker(URL.createObjectURL(new Blob([workerScript])));
worker1.postMessage({ foo: { bar: arrayBuffer1 } }, [arrayBuffer1]);
// worker1's buffer size is: 10
console.log(`arrayBuffer1.byteLength is:  ${arrayBuffer1.byteLength}`);
// arrayBuffer1.byteLength is:  0
