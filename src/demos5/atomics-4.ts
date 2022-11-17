export {};

// 使用 load() 和 store() 本地重排
const sharedArrayBuffer: SharedArrayBuffer = new SharedArrayBuffer(4);
const view: Uint32Array = new Uint32Array(sharedArrayBuffer);

// 非原子写
view[0] = 1;

// 非原子写操作可与保证在这个读操作之前完成, 所以一定是 1
console.log(Atomics.load(view, 0)); // 1

Atomics.store(view, 0, 2);
// 非原子读可可以保证这个操作在原子写完成后发生, 所以一定为2
console.log(view[0]); // 2
